# Samiur Rahman - Personal Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and experiences across web development, embedded systems, and computer architecture.

## Live Demo

Visit the live site: **[samiur.dev](https://samiur.dev)**

## Features

- **Interactive UI** - Smooth animations and modern design with React Bootstrap
- **Project Showcase** - Organized by category (Web/App Development, Embedded Systems, Computer Architecture)
- **AI Chat Assistant** - Powered by LangChain and OpenAI to answer questions about my background
- **Responsive Design** - Optimized for all device sizes
- **Contact Form** - Easy way to get in touch

## Projects Highlighted

### Web/App Development
- **Spreeha BUET-88 Foundation** - Non-profit website for alumni organization
- **Business Startup Template** - React template design

### Embedded Systems
- **Arithmetic Training Game** - Interactive game on uLCD display to improve arithmetic skills
- **Portable Proximity Sensor** - Compact proximity detection device with real-time feedback

### Computer Architecture
- **Cache Simulator** - Multi-level L1/L2 cache simulator with victim cache support

## Tech Stack

| Frontend | Backend | Tools |
|----------|---------|-------|
| React.js | FastAPI | Git |
| Bootstrap | LangChain | Vercel |
| CSS3 | Pinecone | npm |
| Animate.css | OpenAI API | |

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python 3.8+ (for backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/Samiurr10/Personal-Portfolio.git
cd Personal-Portfolio

# Install frontend dependencies
npm install

# Start the development server
npm start
```

### Backend Setup (Optional - for AI Chat)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API keys
echo "OPENAI_API_KEY=your-openai-key" > .env
echo "PINECONE_API_KEY=your-pinecone-key" >> .env

# Run the backend
uvicorn main:app --reload
```

## Project Structure

```
Personal-Portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and fonts
│   ├── components/      # React components
│   │   ├── Banner.js    # Hero section
│   │   ├── Chat.js      # AI chat assistant
│   │   ├── NavBar.js    # Navigation
│   │   ├── Projects.js  # Project showcase
│   │   ├── Skills.js    # Skills section
│   │   └── Footer.js    # Footer
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── backend/
│   └── main.py          # FastAPI backend
└── package.json
```

## Contact

- **GitHub**: [@Samiurr10](https://github.com/Samiurr10)
- **LinkedIn**: [Samiur Rahman](https://www.linkedin.com/in/samiur-rahman-1a09b6271/)
- **Website**: [samiur.dev](https://samiur.dev)

## License

This project is open source and available under the [MIT License](LICENSE).
