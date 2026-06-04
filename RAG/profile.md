# Samiur Rahman — Detailed Profile

This document is the authoritative source for the portfolio chatbot. It provides
rich, explicitly-linked context for every internship, project, skill, and personal
detail so that retrieval-augmented answers are accurate and specific.

---

## Identity & Education

- **Name:** Samiur Rahman
- **School:** Georgia Institute of Technology (Georgia Tech / GT)
- **Degree:** Bachelor of Science in Computer Engineering
- **GPA:** 3.7 — Dean's List every semester
- **Expected Graduation:** December 2026
- **Concentrations:** (1) Distributed Systems & Software Design; (2) Computing Hardware & Emerging Architecture
- **Relevant Coursework:** Computer Architecture, Embedded Systems, Operating Systems, Machine Learning, GPU Programming, Computer Networking, Digital Design, Data Structures & Algorithms

---

## Internship Experience

### Figure AI — Embedded Automation Intern
**Dates:** Jan 2026 – May 2026 (listed as May 2025–Aug 2025 on earlier resume version)
**Location:** San Jose, CA
**Primary Languages/Tech:** Python, Bash, Slack API, Jira API, pytest, HIL/OTA test frameworks

- Scaled OTA (Over-the-Air update) and HIL (Hardware-in-the-Loop) connectivity test automation from zero to full scenario coverage, reducing OTA-related failures by 99%.
- Built a Slack-Jira integration bot in **Python** that auto-creates Jira tickets from Slack threads, attaches logs, and triggers an agent to open a fix PR — dramatically reducing manual triage time.
- Improved HIL reporting pipelines and test infrastructure in **Python** for embedded connectivity validation of robot modules.
- Developed and maintained test harnesses for hardware-in-the-loop (HIL) validation of robot connectivity systems.
- **Python was the primary language** used throughout this internship for automation scripts, test harnesses, and the Slack/Jira bot.

### Tesla — Software Engineering Intern
**Dates:** Jan 2025 – May 2025
**Location:** Palo Alto, CA
**Primary Languages/Tech:** Python, C++, CAN bus, SIL/HIL frameworks, pytest, automotive test tooling

- Migrated 1000+ SIL (Software-in-the-Loop) tests for next-gen Tesla Model Y firmware in **Python**, uncovering and resolving 10+ critical bugs.
- Achieved ±2% motor RPM accuracy through CAN bus motor monitoring and **Python**-based closed-loop test automation.
- Designed and executed thermal safety validation tests in **Python**, including Dog Mode and Child Mode edge-case scenarios, verifying correct cabin temperature control.
- Contributed to automated regression pipelines in **Python** that reduced manual firmware verification time.
- **Python was the primary language** used throughout this internship for SIL test migration, CAN bus monitoring, and safety validation automation.

### Tektronix — Performance Applications Engineering Intern
**Dates:** May 2024 – Aug 2024
**Location:** Beaverton, OR
**Primary Languages/Tech:** Python, JSON-RPC 2.0, SCPI/VISA, MCP (Model Context Protocol), LangChain, OpenAI API

- Built standalone MCP servers in **Python** with JSON-RPC 2.0 compliance, UDP discovery, and SCPI/VISA integration, enabling multi-instrument control and improving test throughput by 35%.
- Developed an AI agent in **Python** that translates natural-language test goals into automated instrument measurement workflows, bridging LLM-based reasoning with hardware test equipment.
- Designed tooling in **Python** to bridge LLM reasoning with hardware test equipment over standard instrument protocols (SCPI, VISA).
- **Python was the primary language** used throughout this internship for MCP servers, AI agents, and instrument control scripts.

### Citadel Technologies — Software Development Intern
**Dates:** Aug 2023 – Dec 2023
**Location:** Atlanta, GA
**Primary Languages/Tech:** Flutter, Dart, WebSockets, Firebase, REST APIs, Provider, IoT (not Python)

- Built a Flutter IoT garage control application in **Dart/Flutter** with real-time WebSocket-based device communication.
- Integrated Firebase Cloud Messaging push notifications and REST APIs for secure remote access and event alerting.
- Implemented multi-garage and home view support using Provider and RESTful APIs, reducing setup time by 40%.
- Improved app load times and user retention through performance optimizations.
- **Note:** This internship used Flutter/Dart, NOT Python. It was the only internship not primarily using Python.

---

## Technical Skills

### Programming Languages
- **Python** — used extensively at Figure, Tesla, and Tektronix for test automation, scripting, AI agents, and backend tooling. Most-used language across all internships.
- **C / C++** — systems programming, cache simulator, GPU image filter engine, firmware-adjacent tooling at Tesla
- **Rust** — systems software, memory-safe tooling
- **CUDA** — GPU parallel computing, image filter engine (10,000+ threads)
- **Dart / Flutter** — mobile IoT app at Citadel Technologies
- **JavaScript / TypeScript / React** — this portfolio website (samiur.dev)
- **Verilog / SystemVerilog** — FPGA binary arcade game
- **Swift** — iOS / Apple platform development

### Embedded & Hardware
- Firmware validation (SIL/HIL at Tesla and Figure)
- CAN bus monitoring and motor control (Tesla)
- OTA (Over-the-Air) update testing (Figure)
- SCPI/VISA instrument protocols (Tektronix)
- I2C, SPI, UART — standard embedded communication protocols
- ARM microcontrollers
- FPGA (Verilog/SystemVerilog)

### AI & Machine Learning
- LangChain (RAG pipelines, chat chains, LCEL)
- OpenAI API (gpt-4o-mini, text-embedding-3-small)
- ChromaDB vector database
- MCP (Model Context Protocol) servers — built at Tektronix
- Pinecone vector database
- AI agents that translate natural language to instrument workflows (Tektronix)

### Systems & Performance
- CUDA / GPU programming (custom image filter engine)
- Memory management (custom heap allocator — first-fit, best-fit, coalescing)
- Computer architecture (cache simulator — L1, victim cache, L2, AMAT)
- OS internals, distributed systems (Georgia Tech coursework + projects)

### DevOps & Tooling
- Git, GitHub, CI/CD pipelines
- Vercel (hosting this portfolio)
- Firebase (Citadel internship)
- Docker
- Jira, Slack API (Figure internship — built a Slack/Jira bot in Python)
- pytest, test automation frameworks

---

## Projects

### Cache Simulator (C)
- Configurable L1, victim cache, and L2 cache model
- Trace-driven simulation computing hit/miss rates and AMAT (Average Memory Access Time)
- Supports multiple replacement policies (LRU, FIFO) and write policies (write-back, write-through)
- Built in C; studied cache hierarchy performance trade-offs

### GPU Image Filter Engine (C++/CUDA)
- Parallel image convolution pipeline applying kernels across 10,000+ CUDA threads
- ECE 4122 (Georgia Tech) final project
- Explores GPU memory hierarchies (global, shared, local) and thread block optimization
- Built in C++ and CUDA

### Custom Memory Allocator (C)
- Heap allocator implementing first-fit and best-fit allocation strategies
- Block coalescing to reduce fragmentation
- Deepens understanding of OS-level dynamic memory management
- Built in C

### Binary Arcade Game (Verilog/SystemVerilog)
- Embedded arcade game on FPGA hardware with VGA display output
- Real-time input handling, display timing, finite state machine design
- Built in Verilog/SystemVerilog

### Personal Portfolio — samiur.dev (React/JavaScript)
- This portfolio website
- React frontend deployed on Vercel
- Serverless API backend with RAG-powered chatbot (LangChain + ChromaDB + OpenAI)
- Responsive design, contact form (Resend email API), experience and project sections

---

## Career Goals & Future Plans

- Graduating December 2026; seeking full-time roles starting early 2027
- Target roles: embedded systems engineer, firmware engineer, systems software engineer, or AI/automation engineer
- Strongest at the intersection of software and hardware — firmware validation, embedded automation, test infrastructure, and performance tooling
- Interested in companies working on robotics, automotive systems, test & measurement, or AI-powered developer tools
- Open to new grad / entry-level positions

---

## Contact Information

- **Email:** srahman96@gatech.edu
- **Portfolio:** https://www.samiur.dev
- **GitHub:** https://github.com/Samiurr10
- **LinkedIn:** https://www.linkedin.com/in/samiur-rahman-1a09b6271/

---

## Frequently Asked Questions

**Q: What is your most-used programming language?**
A: Python, by far. I used Python at Figure, Tesla, and Tektronix for test automation, scripting, CAN bus tooling, Slack/Jira bots, MCP servers, and AI agents. It's my primary language for systems automation work.

**Q: Where have you used Python?**
A: Python was the primary language at three of my four internships — Figure (OTA/HIL test automation, Slack-Jira bot), Tesla (SIL test migration, CAN bus monitoring, thermal safety validation), and Tektronix (MCP servers, AI agent tooling). Citadel used Dart/Flutter instead.

**Q: What is your most fun internship experience?**
A: Tektronix was uniquely exciting — I built AI agents in Python that could interpret natural-language test goals and automatically control oscilloscopes and other instruments via SCPI/VISA. It felt like the frontier of AI-meets-hardware. Figure was also thrilling because scaling OTA automation to 99% failure reduction on physical robots had real stakes.

**Q: What kind of role are you looking for after graduation?**
A: Firmware or embedded systems engineering, systems software, or AI/automation engineering. I want roles where software directly interacts with hardware — robotics, automotive, test & measurement, or similar domains.
