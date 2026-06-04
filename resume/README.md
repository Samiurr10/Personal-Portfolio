# Resume

LaTeX source for Samiur Rahman's resume.

Based on [jakegut/resume](https://github.com/jakegut/resume) (MIT License).

## Editing

Edit `resume.tex` directly in this repo, then compile to PDF:

### Option 1 — Overleaf (easiest)
Upload `resume.tex` to [overleaf.com](https://www.overleaf.com) and compile online.

### Option 2 — Local (macOS)
```bash
brew install --cask mactex
cd resume
pdflatex resume.tex
```

### Option 3 — Docker
```bash
docker run --rm -v "$PWD":/workdir texlive/texlive pdflatex /workdir/resume.tex
```

After compiling, copy the output `resume.pdf` to `public/Samiur_Rahman_Resume.pdf` and
re-run the RAG ingestion pipeline to keep the chatbot in sync:

```bash
cp resume.pdf ../public/Samiur_Rahman_Resume.pdf
cd ../RAG && source venv/bin/activate && python ingestion_pipeline.py
```
