"""Unit tests for retrieval_pipeline.py

All external calls (OpenAI, ChromaDB) are mocked — no network, no disk.
"""

import os
import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))


# ── Fixture: fully-mocked RAGPipeline ─────────────────────────────────────────

def _make_doc(text: str):
    from langchain_core.documents import Document
    return Document(page_content=text, metadata={})


def _build_pipeline():
    """Return a RAGPipeline instance with all external deps mocked out."""
    with (
        patch("retrieval_pipeline.OpenAIEmbeddings"),
        patch("retrieval_pipeline.Chroma"),
        patch("retrieval_pipeline.ChatOpenAI"),
    ):
        from retrieval_pipeline import RAGPipeline

        pipeline = RAGPipeline.__new__(RAGPipeline)
        pipeline.retriever = MagicMock()
        pipeline.llm = MagicMock()
        pipeline.chain = MagicMock()
        return pipeline


# ── Initialisation ─────────────────────────────────────────────────────────────

class TestRAGPipelineInit:
    def test_raises_without_api_key(self, monkeypatch):
        """Constructor raises ValueError when no API key is available."""
        monkeypatch.delenv("OPENAI_API_KEY", raising=False)
        with (
            patch("retrieval_pipeline.OpenAIEmbeddings"),
            patch("retrieval_pipeline.Chroma"),
            patch("retrieval_pipeline.ChatOpenAI"),
        ):
            from retrieval_pipeline import RAGPipeline
            with pytest.raises(ValueError, match="OPENAI_API_KEY"):
                RAGPipeline(openai_api_key=None)

    def test_accepts_explicit_api_key(self):
        """Constructor succeeds when an explicit key is provided."""
        with (
            patch("retrieval_pipeline.OpenAIEmbeddings"),
            patch("retrieval_pipeline.Chroma"),
            patch("retrieval_pipeline.ChatOpenAI"),
        ):
            from retrieval_pipeline import RAGPipeline
            p = RAGPipeline(openai_api_key="sk-test-key")
            assert p is not None

    def test_accepts_env_api_key(self, monkeypatch):
        """Constructor reads OPENAI_API_KEY from environment."""
        monkeypatch.setenv("OPENAI_API_KEY", "sk-env-key")
        with (
            patch("retrieval_pipeline.OpenAIEmbeddings"),
            patch("retrieval_pipeline.Chroma"),
            patch("retrieval_pipeline.ChatOpenAI"),
        ):
            from retrieval_pipeline import RAGPipeline
            p = RAGPipeline()
            assert p is not None


# ── _format_docs ───────────────────────────────────────────────────────────────

class TestFormatDocs:
    def test_joins_multiple_docs_with_separator(self):
        from retrieval_pipeline import RAGPipeline
        docs = [_make_doc("Tesla firmware"), _make_doc("Figure OTA")]
        result = RAGPipeline._format_docs(docs)
        assert "Tesla firmware" in result
        assert "Figure OTA" in result
        assert "---" in result

    def test_single_doc_no_separator(self):
        from retrieval_pipeline import RAGPipeline
        docs = [_make_doc("Georgia Tech 3.7 GPA")]
        result = RAGPipeline._format_docs(docs)
        assert result == "Georgia Tech 3.7 GPA"

    def test_empty_list_returns_empty_string(self):
        from retrieval_pipeline import RAGPipeline
        assert RAGPipeline._format_docs([]) == ""

    def test_preserves_exact_text(self):
        from retrieval_pipeline import RAGPipeline
        text = "Cache simulator: L1, victim cache, L2 — built in C."
        result = RAGPipeline._format_docs([_make_doc(text)])
        assert text in result


# ── retrieve ───────────────────────────────────────────────────────────────────

class TestRetrieve:
    def test_returns_list_of_strings(self):
        pipeline = _build_pipeline()
        pipeline.retriever.invoke.return_value = [
            _make_doc("Georgia Tech Computer Engineering"),
            _make_doc("3.7 GPA, Dean's List"),
        ]
        results = pipeline.retrieve("Where do you go to school?")
        assert isinstance(results, list)
        assert all(isinstance(r, str) for r in results)

    def test_returns_correct_number_of_chunks(self):
        from retrieval_pipeline import TOP_K
        pipeline = _build_pipeline()
        pipeline.retriever.invoke.return_value = [_make_doc(f"chunk {i}") for i in range(TOP_K)]
        results = pipeline.retrieve("anything")
        assert len(results) == TOP_K

    def test_passes_query_to_retriever(self):
        pipeline = _build_pipeline()
        pipeline.retriever.invoke.return_value = []
        pipeline.retrieve("Tell me about Figure")
        pipeline.retriever.invoke.assert_called_once_with("Tell me about Figure")

    def test_empty_retriever_returns_empty_list(self):
        pipeline = _build_pipeline()
        pipeline.retriever.invoke.return_value = []
        assert pipeline.retrieve("anything") == []

    def test_text_content_extracted_from_docs(self):
        pipeline = _build_pipeline()
        pipeline.retriever.invoke.return_value = [
            _make_doc("CUDA GPU engine"),
            _make_doc("Custom memory allocator"),
        ]
        results = pipeline.retrieve("projects")
        assert "CUDA GPU engine" in results
        assert "Custom memory allocator" in results


# ── answer ─────────────────────────────────────────────────────────────────────

class TestAnswer:
    def test_returns_non_empty_string(self):
        pipeline = _build_pipeline()
        pipeline.chain.invoke.return_value = "I worked at Tesla on firmware validation."
        result = pipeline.answer("What did you do at Tesla?")
        assert isinstance(result, str) and len(result) > 0

    def test_delegates_to_chain(self):
        pipeline = _build_pipeline()
        pipeline.chain.invoke.return_value = "some answer"
        pipeline.answer("my question")
        pipeline.chain.invoke.assert_called_once_with("my question")

    def test_off_topic_refusal_propagated(self):
        """Pipeline transparently returns the LLM's refusal for off-topic queries."""
        pipeline = _build_pipeline()
        refusal = "I can only answer questions about Samiur Rahman."
        pipeline.chain.invoke.return_value = refusal
        result = pipeline.answer("What is the weather today?")
        assert "Samiur" in result or "only answer" in result.lower()

    def test_answer_reflects_internship_context(self):
        pipeline = _build_pipeline()
        pipeline.chain.invoke.return_value = (
            "At Figure I scaled OTA and HIL test automation."
        )
        result = pipeline.answer("Tell me about Figure")
        assert "Figure" in result or "OTA" in result

    def test_chain_called_exactly_once_per_question(self):
        pipeline = _build_pipeline()
        pipeline.chain.invoke.return_value = "answer"
        pipeline.answer("question 1")
        pipeline.answer("question 2")
        assert pipeline.chain.invoke.call_count == 2


# ── Integration smoke test (skipped in CI without key) ─────────────────────────

@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY") or not (Path(__file__).parent.parent / "chroma_db").exists(),
    reason="Requires OPENAI_API_KEY and a populated ChromaDB (run ingestion first)",
)
class TestIntegration:
    """Live end-to-end tests — only run locally after ingestion_pipeline.py."""

    @pytest.fixture(scope="class")
    def pipeline(self):
        from retrieval_pipeline import RAGPipeline
        return RAGPipeline()

    def test_retrieve_returns_resume_content(self, pipeline):
        chunks = pipeline.retrieve("Tesla internship")
        combined = " ".join(chunks).lower()
        assert any(kw in combined for kw in ["tesla", "firmware", "sil", "hil", "powertrain"])

    def test_answer_is_coherent_string(self, pipeline):
        answer = pipeline.answer("Where do you go to school?")
        assert isinstance(answer, str) and len(answer) > 20

    def test_answer_about_figure_mentions_figure(self, pipeline):
        answer = pipeline.answer("What did you do at Figure AI?")
        assert "figure" in answer.lower() or "ota" in answer.lower()

    def test_off_topic_returns_refusal(self, pipeline):
        answer = pipeline.answer("What is 2 + 2?")
        assert "only answer" in answer.lower() or "samiur" in answer.lower()
