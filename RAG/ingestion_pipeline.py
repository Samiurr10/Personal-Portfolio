"""
ingestion_pipeline.py
─────────────────────
Loads public/Samiur_Rahman_Resume.pdf, splits it into chunks, embeds each chunk
with OpenAI text-embedding-3-small, persists the vectors to a local ChromaDB, and
exports a vectorstore.json file that the Vercel Node.js API can load at runtime
without needing a Python process.

Usage
-----
  cd <project-root>
  python RAG/ingestion_pipeline.py                    # defaults
  python RAG/ingestion_pipeline.py --no-export        # ChromaDB only
  python RAG/ingestion_pipeline.py --pdf path/to.pdf  # custom PDF
"""

import argparse
import json
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# ── Constants ─────────────────────────────────────────────────────────────────

EMBEDDING_MODEL = "text-embedding-3-small"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

_ROOT = Path(__file__).parent.parent
DEFAULT_PDF_PATH = _ROOT / "public" / "Samiur_Rahman_Resume.pdf"
DEFAULT_CHROMA_DIR = Path(__file__).parent / "chroma_db"
DEFAULT_EXPORT_PATH = _ROOT / "api" / "vectorstore.json"


# ── Core class ────────────────────────────────────────────────────────────────

class IngestionPipeline:
    """
    End-to-end ingestion: PDF → chunks → ChromaDB + optional JSON export.

    Parameters
    ----------
    openai_api_key : str | None
        If None, falls back to the OPENAI_API_KEY environment variable.
    pdf_path : Path | str
        Path to the PDF to ingest.
    chroma_dir : Path | str
        Directory where ChromaDB will persist its data.
    """

    def __init__(
        self,
        openai_api_key: str | None = None,
        pdf_path: Path | str = DEFAULT_PDF_PATH,
        chroma_dir: Path | str = DEFAULT_CHROMA_DIR,
    ):
        load_dotenv(Path(__file__).parent / ".env")
        api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError(
                "OPENAI_API_KEY is required. Set it in RAG/.env or pass it explicitly."
            )

        self.pdf_path = Path(pdf_path)
        self.chroma_dir = Path(chroma_dir)
        self.embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL, api_key=api_key)

    # ── Pipeline steps ────────────────────────────────────────────────────────

    def load_and_split(self) -> list:
        """
        Load the PDF and split it into overlapping text chunks.

        Returns
        -------
        list[Document]
            LangChain Documents with page_content and metadata (source, page).
        """
        if not self.pdf_path.exists():
            raise FileNotFoundError(f"PDF not found: {self.pdf_path}")

        loader = PyPDFLoader(str(self.pdf_path))
        pages = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=["\n\n", "\n", " ", ""],
        )
        chunks = splitter.split_documents(pages)
        return chunks

    def build_vectorstore(self, chunks: list) -> Chroma:
        """
        Embed all chunks and persist to ChromaDB.

        Parameters
        ----------
        chunks : list[Document]

        Returns
        -------
        Chroma
            The populated vectorstore client.
        """
        self.chroma_dir.mkdir(parents=True, exist_ok=True)

        db = Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            persist_directory=str(self.chroma_dir),
            collection_name="resume",
        )
        return db

    def export_json(
        self,
        chunks: list,
        export_path: Path | str = DEFAULT_EXPORT_PATH,
    ) -> int:
        """
        Embed all chunk texts and write them to a JSON file that the Vercel
        Node.js API can load for cosine-similarity retrieval without Python.

        Schema: [ { "text": str, "embedding": list[float], "metadata": dict } ]

        Parameters
        ----------
        chunks : list[Document]
        export_path : Path | str

        Returns
        -------
        int
            Number of chunks exported.
        """
        export_path = Path(export_path)
        export_path.parent.mkdir(parents=True, exist_ok=True)

        texts = [c.page_content for c in chunks]

        # Batch embed — text-embedding-3-small returns 1536-dim vectors
        print(f"  Embedding {len(texts)} chunks via OpenAI ({EMBEDDING_MODEL})…")
        vectors = self.embeddings.embed_documents(texts)

        records = [
            {
                "text": text,
                "embedding": vector,
                "metadata": chunk.metadata,
            }
            for text, vector, chunk in zip(texts, vectors, chunks)
        ]

        with open(export_path, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False)

        return len(records)

    def run(self, export_json: bool = True, export_path: Path | str = DEFAULT_EXPORT_PATH) -> Chroma:
        """
        Execute the full ingestion pipeline.

        Returns
        -------
        Chroma
            The populated vectorstore.
        """
        print(f"\n[1/3] Loading & splitting {self.pdf_path.name}…")
        chunks = self.load_and_split()
        print(f"      → {len(chunks)} chunks (size≤{CHUNK_SIZE}, overlap={CHUNK_OVERLAP})")

        print(f"\n[2/3] Building ChromaDB at {self.chroma_dir}…")
        db = self.build_vectorstore(chunks)
        print(f"      → {db._collection.count()} vectors stored")

        if export_json:
            print(f"\n[3/3] Exporting vectorstore.json to {export_path}…")
            count = self.export_json(chunks, export_path)
            print(f"      → {count} records written")
        else:
            print("\n[3/3] Skipping JSON export (--no-export)")

        print("\n✓ Ingestion complete.\n")
        return db


# ── CLI entry-point ───────────────────────────────────────────────────────────

def _parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Ingest resume PDF into ChromaDB.")
    p.add_argument("--pdf", default=str(DEFAULT_PDF_PATH), help="Path to PDF")
    p.add_argument("--chroma-dir", default=str(DEFAULT_CHROMA_DIR), help="ChromaDB directory")
    p.add_argument("--export-path", default=str(DEFAULT_EXPORT_PATH), help="vectorstore.json path")
    p.add_argument("--no-export", action="store_true", help="Skip vectorstore.json export")
    return p.parse_args()


if __name__ == "__main__":
    args = _parse_args()
    try:
        pipeline = IngestionPipeline(pdf_path=args.pdf, chroma_dir=args.chroma_dir)
        pipeline.run(export_json=not args.no_export, export_path=args.export_path)
    except (ValueError, FileNotFoundError) as exc:
        print(f"\n✗ {exc}", file=sys.stderr)
        sys.exit(1)
