"""Unit tests for ingestion_pipeline.py

All external calls (OpenAI, ChromaDB, filesystem reads) are mocked — no
network, no disk writes required to run the suite.
"""

import json
import sys
from pathlib import Path
from unittest.mock import MagicMock, call, mock_open, patch

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))


# ── Helpers ───────────────────────────────────────────────────────────────────

def _make_doc(text: str, page: int = 0):
    from langchain_core.documents import Document
    return Document(page_content=text, metadata={"source": "resume.pdf", "page": page})


def _make_pipeline(api_key: str = "sk-test", pdf_path=None, chroma_dir=None):
    """Return an IngestionPipeline with all external deps mocked out."""
    import ingestion_pipeline as ip
    kwargs = {"openai_api_key": api_key}
    if pdf_path:
        kwargs["pdf_path"] = pdf_path
    if chroma_dir:
        kwargs["chroma_dir"] = chroma_dir

    with (
        patch.object(ip, "OpenAIEmbeddings", return_value=MagicMock()),
        patch("pathlib.Path.exists", return_value=True),
    ):
        from ingestion_pipeline import IngestionPipeline
        return IngestionPipeline(**kwargs)


# ── Initialisation ────────────────────────────────────────────────────────────

class TestIngestionPipelineInit:
    def test_raises_without_api_key(self, monkeypatch):
        """Constructor raises ValueError when no API key is set."""
        monkeypatch.delenv("OPENAI_API_KEY", raising=False)
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            with pytest.raises(ValueError, match="OPENAI_API_KEY"):
                IngestionPipeline(openai_api_key=None)

    def test_accepts_explicit_api_key(self):
        """Constructor succeeds when an explicit API key is supplied."""
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-explicit")
            assert p is not None

    def test_accepts_env_api_key(self, monkeypatch):
        """Constructor reads OPENAI_API_KEY from environment."""
        monkeypatch.setenv("OPENAI_API_KEY", "sk-env-test")
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline()
            assert p is not None

    def test_uses_correct_embedding_model(self):
        """OpenAIEmbeddings is initialised with text-embedding-3-small."""
        from ingestion_pipeline import EMBEDDING_MODEL
        mock_emb_cls = MagicMock()
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", mock_emb_cls),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            IngestionPipeline(openai_api_key="sk-test")
        mock_emb_cls.assert_called_once()
        _, kwargs = mock_emb_cls.call_args
        assert kwargs.get("model") == EMBEDDING_MODEL

    def test_custom_pdf_path_stored(self, tmp_path):
        """Custom pdf_path is stored on the instance."""
        custom_pdf = tmp_path / "my_resume.pdf"
        custom_pdf.touch()
        with patch("ingestion_pipeline.OpenAIEmbeddings"):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=custom_pdf)
        assert p.pdf_path == custom_pdf

    def test_custom_chroma_dir_stored(self, tmp_path):
        """Custom chroma_dir is stored on the instance."""
        custom_dir = tmp_path / "my_chroma"
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", chroma_dir=custom_dir)
        assert p.chroma_dir == custom_dir


# ── load_and_split ────────────────────────────────────────────────────────────

class TestLoadAndSplit:
    def test_raises_if_pdf_missing(self, tmp_path):
        """FileNotFoundError raised when PDF does not exist."""
        missing = tmp_path / "missing.pdf"
        with patch("ingestion_pipeline.OpenAIEmbeddings"):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=missing)
        with pytest.raises(FileNotFoundError):
            p.load_and_split()

    def test_returns_non_empty_list(self, tmp_path):
        """load_and_split returns at least one chunk for a non-trivial PDF."""
        fake_pdf = tmp_path / "resume.pdf"
        fake_pdf.touch()
        mock_loader = MagicMock()
        mock_loader.load.return_value = [
            _make_doc("Georgia Tech Computer Engineering GPA 3.7"),
            _make_doc("Tesla SIL/HIL firmware validation"),
        ]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.PyPDFLoader", return_value=mock_loader),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=fake_pdf)
            chunks = p.load_and_split()
        assert len(chunks) > 0

    def test_chunk_size_respected(self, tmp_path):
        """Every chunk is at most CHUNK_SIZE characters long."""
        from ingestion_pipeline import CHUNK_SIZE
        fake_pdf = tmp_path / "resume.pdf"
        fake_pdf.touch()
        long_text = "x " * 2000  # 4000 chars
        mock_loader = MagicMock()
        mock_loader.load.return_value = [_make_doc(long_text)]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.PyPDFLoader", return_value=mock_loader),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=fake_pdf)
            chunks = p.load_and_split()
        assert all(len(c.page_content) <= CHUNK_SIZE for c in chunks)

    def test_chunks_have_page_content(self, tmp_path):
        """Each chunk has a non-empty page_content string."""
        fake_pdf = tmp_path / "resume.pdf"
        fake_pdf.touch()
        mock_loader = MagicMock()
        mock_loader.load.return_value = [_make_doc("Figure OTA automation HIL connectivity")]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.PyPDFLoader", return_value=mock_loader),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=fake_pdf)
            chunks = p.load_and_split()
        assert all(isinstance(c.page_content, str) and c.page_content.strip() for c in chunks)

    def test_uses_pdfloader_with_correct_path(self, tmp_path):
        """PyPDFLoader is instantiated with the configured pdf_path."""
        fake_pdf = tmp_path / "resume.pdf"
        fake_pdf.touch()
        mock_loader_cls = MagicMock()
        mock_loader_cls.return_value.load.return_value = [_make_doc("content")]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.PyPDFLoader", mock_loader_cls),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", pdf_path=fake_pdf)
            p.load_and_split()
        mock_loader_cls.assert_called_once_with(str(fake_pdf))


# ── build_vectorstore ─────────────────────────────────────────────────────────

class TestBuildVectorstore:
    def test_returns_chroma_instance(self, tmp_path):
        """build_vectorstore returns the Chroma object created by from_documents."""
        chunks = [_make_doc("Tesla firmware validation")]
        mock_chroma = MagicMock()
        mock_chroma._collection.count.return_value = 1
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.Chroma") as mock_cls,
            patch("pathlib.Path.exists", return_value=True),
        ):
            mock_cls.from_documents.return_value = mock_chroma
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", chroma_dir=tmp_path / "db")
            result = p.build_vectorstore(chunks)
        assert result is mock_chroma

    def test_passes_chunks_and_embeddings_to_chroma(self, tmp_path):
        """from_documents is called with all provided chunks."""
        chunks = [_make_doc("chunk A"), _make_doc("chunk B")]
        mock_chroma = MagicMock()
        mock_chroma._collection.count.return_value = 2
        mock_emb = MagicMock()
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("ingestion_pipeline.Chroma") as mock_cls,
            patch("pathlib.Path.exists", return_value=True),
        ):
            mock_cls.from_documents.return_value = mock_chroma
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", chroma_dir=tmp_path / "db")
            p.build_vectorstore(chunks)
        call_kwargs = mock_cls.from_documents.call_args
        assert call_kwargs[1]["documents"] == chunks or call_kwargs[0][0] == chunks

    def test_creates_chroma_dir(self, tmp_path):
        """chroma_dir is created if it does not exist."""
        new_dir = tmp_path / "new_chroma"
        assert not new_dir.exists()
        mock_chroma = MagicMock()
        mock_chroma._collection.count.return_value = 0
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings"),
            patch("ingestion_pipeline.Chroma") as mock_cls,
            patch("pathlib.Path.exists", return_value=True),
        ):
            mock_cls.from_documents.return_value = mock_chroma
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test", chroma_dir=new_dir)
            p.build_vectorstore([_make_doc("text")])
        assert new_dir.exists()


# ── export_json ───────────────────────────────────────────────────────────────

class TestExportJson:
    def test_file_is_created(self, tmp_path):
        """export_json writes a file to the specified path."""
        out = tmp_path / "vectorstore.json"
        chunks = [_make_doc("Georgia Tech GPA 3.7")]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.1] * 1536]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            p.export_json(chunks, out)
        assert out.exists()

    def test_output_is_valid_json_list(self, tmp_path):
        """The exported file contains a JSON array."""
        out = tmp_path / "vs.json"
        chunks = [_make_doc("Figure OTA HIL"), _make_doc("Tesla CAN bus")]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.0] * 1536, [0.1] * 1536]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            p.export_json(chunks, out)
        data = json.loads(out.read_text())
        assert isinstance(data, list)

    def test_record_count_matches_chunks(self, tmp_path):
        """One record is exported per chunk."""
        out = tmp_path / "vs.json"
        n = 4
        chunks = [_make_doc(f"chunk {i}") for i in range(n)]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[float(i)] * 1536 for i in range(n)]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            count = p.export_json(chunks, out)
        assert count == n

    def test_each_record_has_required_keys(self, tmp_path):
        """Every record in vectorstore.json has 'text', 'embedding', 'metadata'."""
        out = tmp_path / "vs.json"
        chunks = [_make_doc("Tektronix SCPI instrument")]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.5] * 1536]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            p.export_json(chunks, out)
        data = json.loads(out.read_text())
        for record in data:
            assert "text" in record
            assert "embedding" in record
            assert "metadata" in record

    def test_embedding_dimension_matches_model(self, tmp_path):
        """Each embedding vector has 1536 dimensions (text-embedding-3-small)."""
        out = tmp_path / "vs.json"
        chunks = [_make_doc("Citadel Flutter IoT WebSocket")]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.42] * 1536]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            p.export_json(chunks, out)
        data = json.loads(out.read_text())
        assert len(data[0]["embedding"]) == 1536

    def test_text_content_preserved(self, tmp_path):
        """The exported 'text' field matches the original chunk content."""
        out = tmp_path / "vs.json"
        text = "Cache Simulator L1 victim cache L2 AMAT"
        chunks = [_make_doc(text)]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.1] * 1536]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            p.export_json(chunks, out)
        data = json.loads(out.read_text())
        assert data[0]["text"] == text

    def test_returns_correct_count(self, tmp_path):
        """export_json return value equals the number of chunks."""
        out = tmp_path / "vs.json"
        chunks = [_make_doc(f"doc {i}") for i in range(6)]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.0] * 1536 for _ in chunks]
        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb
            result = p.export_json(chunks, out)
        assert result == 6


# ── run (integration) ─────────────────────────────────────────────────────────

class TestRun:
    def _patched_run(self, tmp_path):
        """Helper: returns (pipeline, db_mock) with everything mocked."""
        chunks = [_make_doc("Georgia Tech"), _make_doc("Tesla firmware")]
        mock_emb = MagicMock()
        mock_emb.embed_documents.return_value = [[0.1] * 1536, [0.2] * 1536]
        mock_db = MagicMock()
        mock_db._collection.count.return_value = 2

        with (
            patch("ingestion_pipeline.OpenAIEmbeddings", return_value=mock_emb),
            patch("pathlib.Path.exists", return_value=True),
        ):
            from ingestion_pipeline import IngestionPipeline
            p = IngestionPipeline(openai_api_key="sk-test")
            p.embeddings = mock_emb

        return p, mock_db, chunks

    def test_run_calls_load_split(self, tmp_path):
        """run() calls load_and_split exactly once."""
        p, mock_db, chunks = self._patched_run(tmp_path)
        with (
            patch.object(p, "load_and_split", return_value=chunks) as mock_ls,
            patch.object(p, "build_vectorstore", return_value=mock_db),
            patch.object(p, "export_json", return_value=2),
        ):
            p.run(export_json=True, export_path=tmp_path / "vs.json")
        mock_ls.assert_called_once()

    def test_run_calls_build_vectorstore(self, tmp_path):
        """run() calls build_vectorstore with the chunks from load_and_split."""
        p, mock_db, chunks = self._patched_run(tmp_path)
        with (
            patch.object(p, "load_and_split", return_value=chunks),
            patch.object(p, "build_vectorstore", return_value=mock_db) as mock_bv,
            patch.object(p, "export_json", return_value=2),
        ):
            p.run(export_json=True, export_path=tmp_path / "vs.json")
        mock_bv.assert_called_once_with(chunks)

    def test_run_calls_export_json_when_enabled(self, tmp_path):
        """run() calls export_json when export_json=True."""
        p, mock_db, chunks = self._patched_run(tmp_path)
        out = tmp_path / "vs.json"
        with (
            patch.object(p, "load_and_split", return_value=chunks),
            patch.object(p, "build_vectorstore", return_value=mock_db),
            patch.object(p, "export_json", return_value=2) as mock_ej,
        ):
            p.run(export_json=True, export_path=out)
        mock_ej.assert_called_once()

    def test_run_skips_export_when_disabled(self, tmp_path):
        """run() does NOT call export_json when export_json=False."""
        p, mock_db, chunks = self._patched_run(tmp_path)
        with (
            patch.object(p, "load_and_split", return_value=chunks),
            patch.object(p, "build_vectorstore", return_value=mock_db),
            patch.object(p, "export_json", return_value=0) as mock_ej,
        ):
            p.run(export_json=False)
        mock_ej.assert_not_called()

    def test_run_returns_vectorstore(self, tmp_path):
        """run() returns the Chroma vectorstore produced by build_vectorstore."""
        p, mock_db, chunks = self._patched_run(tmp_path)
        with (
            patch.object(p, "load_and_split", return_value=chunks),
            patch.object(p, "build_vectorstore", return_value=mock_db),
            patch.object(p, "export_json", return_value=2),
        ):
            result = p.run(export_json=True, export_path=tmp_path / "vs.json")
        assert result is mock_db
