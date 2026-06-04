"""
retrieval_pipeline.py
─────────────────────
LangChain RAG pipeline backed by ChromaDB + OpenAI text-embedding-3-small.

Usage (standalone)
------------------
  cd <project-root>
  python RAG/retrieval_pipeline.py "What did you do at Tesla?"

The pipeline assumes ingestion_pipeline.py has already been run to populate
the ChromaDB at RAG/chroma_db/.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# ── Constants ─────────────────────────────────────────────────────────────────

EMBEDDING_MODEL = "text-embedding-3-small"
CHAT_MODEL = "gpt-4o-mini"
TOP_K = 5

_ROOT = Path(__file__).parent.parent
DEFAULT_CHROMA_DIR = Path(__file__).parent / "chroma_db"

SYSTEM_PROMPT = """\
You are a portfolio assistant for Samiur Rahman. Answer questions strictly based
on the resume excerpts provided in {context}.

Rules you must follow:
1. Only answer questions about Samiur — his education, internships, projects,
   skills, career goals, and contact info.
2. If the question is not about Samiur, reply exactly:
   "I can only answer questions about Samiur Rahman. Try asking about his
   internships, projects, or skills."
3. Answer in first person as if you are Samiur speaking directly.
4. Be concise — 2 to 4 sentences maximum. No bullet points, no headers.
5. If the context does not contain enough information to answer, say so briefly
   rather than fabricating details.
6. Questions about future plans, career goals, or desired roles are valid.
"""

PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_PROMPT),
        ("human", "{question}"),
    ]
)


# ── Pipeline class ────────────────────────────────────────────────────────────

class RAGPipeline:
    """
    Retrieval-Augmented Generation pipeline over Samiur's resume.

    Parameters
    ----------
    openai_api_key : str | None
        If None, falls back to the OPENAI_API_KEY environment variable.
    chroma_dir : Path | str
        Directory where ChromaDB was persisted by ingestion_pipeline.py.
    top_k : int
        Number of chunks to retrieve per query (default: TOP_K module constant).
    """

    def __init__(
        self,
        openai_api_key: str | None = None,
        chroma_dir: Path | str = DEFAULT_CHROMA_DIR,
        top_k: int = TOP_K,
    ):
        load_dotenv(Path(__file__).parent / ".env")
        api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError(
                "OPENAI_API_KEY is required. Set it in RAG/.env or pass it explicitly."
            )

        embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL, api_key=api_key)

        db = Chroma(
            persist_directory=str(chroma_dir),
            embedding_function=embeddings,
            collection_name="resume",
        )
        self.retriever = db.as_retriever(search_kwargs={"k": top_k})

        self.llm = ChatOpenAI(model=CHAT_MODEL, temperature=0.2, api_key=api_key)

        # LCEL chain: question → retrieve → format → prompt → llm → string
        self.chain = (
            {
                "context": self.retriever | self._format_docs,
                "question": RunnablePassthrough(),
            }
            | PROMPT_TEMPLATE
            | self.llm
            | StrOutputParser()
        )

    # ── Public API ────────────────────────────────────────────────────────────

    def retrieve(self, query: str) -> list[str]:
        """
        Return the top-k most relevant resume chunks for *query*.

        Returns
        -------
        list[str]
            Raw text of each retrieved chunk (up to TOP_K items).
        """
        docs = self.retriever.invoke(query)
        return [doc.page_content for doc in docs]

    def answer(self, question: str) -> str:
        """
        Run the full RAG chain and return a grounded answer.

        The chain embeds *question*, retrieves relevant chunks, and asks
        gpt-4o-mini to answer in first person using only that context.

        Returns
        -------
        str
        """
        return self.chain.invoke(question)

    # ── Helper ────────────────────────────────────────────────────────────────

    @staticmethod
    def _format_docs(docs) -> str:
        """Join retrieved Documents into a single context string."""
        return "\n---\n".join(doc.page_content for doc in docs)


# ── CLI entry-point ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python RAG/retrieval_pipeline.py \"<question>\"")
        sys.exit(1)

    question = " ".join(sys.argv[1:])
    try:
        pipeline = RAGPipeline()
        print("\nRetrieved chunks:")
        for i, chunk in enumerate(pipeline.retrieve(question), 1):
            print(f"  [{i}] {chunk[:120].strip()}…")
        print(f"\nAnswer:\n{pipeline.answer(question)}\n")
    except (ValueError, Exception) as exc:
        print(f"\n✗ {exc}", file=sys.stderr)
        sys.exit(1)
