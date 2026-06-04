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
**Primary Languages/Tech:** C++ (OTA firmware), Python (chatbots, automation), Rust (CLI tooling)

- Contributed to OTA (Over-the-Air update) firmware in **C++**, helping fix OTA bugs and improve the reliability of the firmware update pipeline for Figure's humanoid robots.
- Built internal chatbots in **Python** — including a Slack-Jira integration bot that auto-creates Jira tickets from Slack threads, attaches logs, and triggers an agent to open a fix PR.
- Created a CLI tool in **Rust** to support internal workflows and tooling for the firmware team.
- Scaled OTA and HIL connectivity test automation, reducing OTA-related failures by 99%.
- Improved HIL reporting pipelines and test infrastructure for embedded connectivity validation.
- **Used three languages across this internship:** C++ for OTA firmware, Python for chatbot/automation tooling, and Rust for CLI development.

### Tesla — Software Engineering Intern
**Dates:** Jan 2025 – May 2025
**Location:** Palo Alto, CA
**Primary Languages/Tech:** Python (SIL tests), C/C++ (firmware), HIL/SIL frameworks, automotive test tooling

- Improved HIL (Hardware-in-the-Loop) infrastructure by bringing up an RPM counter for the HIL setup, enabling ground-truth RPM measurement for all motors used in thermal system HIL tests across all vehicle models.
- Helped develop firmware as part of the HIL infrastructure work, bridging the test tooling layer with the embedded firmware layer.
- Wrote and brought up all SIL (Software-in-the-Loop) tests for next-gen Model Y in **Python**, migrating and expanding the test suite to cover critical firmware paths.
- Achieved ±2% motor RPM accuracy through the HIL RPM counter and **Python**-based SIL test automation.
- Designed thermal safety SIL tests in **Python** covering cabin temperature control across vehicle states (running, parked, powered-off), verifying Dog Mode and Child Mode behavior.
- **Python was the primary language** for all SIL tests; firmware and HIL infrastructure work involved C/C++.

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
- **Rust** — systems software, memory-safe tooling; built a production CLI at Figure AI
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

## Strengths

- Deep systems thinking — I naturally reason about performance, memory, latency, and hardware constraints, not just application logic.
- Strong Python automation skills — test harnesses, scripting, AI tooling, and infrastructure automation across three consecutive internships.
- Cross-layer experience — I have shipped code at every level: Verilog/FPGA, C/C++ firmware, Python automation, and React/JS web.
- Fast ramp-up — I joined three companies in three different domains (robotics, automotive, test & measurement) and contributed production code within the first weeks.
- Clear communicator — I built a Slack-Jira bot at Figure specifically to improve how the firmware team communicated issues.

---

## Areas for Growth / Weaknesses

- **Frontend / web development** — My focus has been systems, embedded, and backend. I'm less experienced in large-scale frontend engineering (complex UI state, design systems, accessibility at scale). I built this portfolio in React but haven't worked on production-scale frontend teams.
- **Large distributed systems in production** — I've studied distributed systems academically at Georgia Tech and understand the theory, but I haven't yet shipped a high-scale distributed backend in production. It's something I'm actively working to gain more hands-on experience with.
- **Mobile development depth** — I have one internship (Citadel) in Flutter/Dart mobile development. It's not a primary focus area compared to systems and embedded work.
- **Product / business domain knowledge** — As an engineering-first student, I think more in terms of system behavior and correctness than user experience or product strategy. I'm aware of this and actively try to understand the end-user impact of technical decisions.
- **Breadth across all languages** — I'm strongest in Python, C, and C++. Languages I know but have less production depth in: Rust (personal projects), Swift (coursework), SQL (mostly academic).

---

## Frequently Asked Questions

**Q: What is your most-used programming language?**
A: Python, by far. I used Python at Figure, Tesla, and Tektronix for test automation, scripting, CAN bus tooling, Slack/Jira bots, MCP servers, and AI agents. It's my primary language for systems automation work.

**Q: Where have you used Python?**
A: Python was central at three of my four internships. At Tesla I wrote all the SIL tests for next-gen Model Y in Python. At Figure I built the internal chatbots and Slack-Jira automation bot in Python. At Tektronix I used Python for MCP servers and AI agent tooling. Citadel used Dart/Flutter instead.

**Q: What languages did you use at Figure?**
A: Three languages — C++ for OTA firmware work (fixing bugs, improving the update pipeline), Python for building internal chatbots and the Slack-Jira bot, and Rust for a CLI tool I built for the firmware team.

**Q: What languages did you use at Tesla?**
A: Python for all SIL (Software-in-the-Loop) tests for next-gen Model Y, and C/C++ for HIL infrastructure and firmware work. I brought up an RPM counter in the HIL setup to enable ground-truth motor measurement across all thermal system tests.

**Q: What firmware work did you do?**
A: At Tesla I helped develop firmware as part of improving the HIL infrastructure — specifically bringing up an RPM counter that enabled ground-truth RPM measurement for all motors used in thermal system HIL tests. At Figure I contributed to OTA firmware in C++, fixing bugs in the over-the-air update pipeline for Figure's robots.

**Q: What did you build at Figure?**
A: Three main things — OTA firmware contributions in C++ (fixing OTA bugs and improving update reliability), internal chatbots in Python including a Slack-Jira integration bot that auto-triages firmware issues, and a CLI tool in Rust for internal team workflows. I also scaled HIL connectivity test automation, reducing OTA failures by 99%.

**Q: What is your most fun internship experience?**
A: Tektronix was uniquely exciting — I built AI agents in Python that could interpret natural-language test goals and automatically control oscilloscopes and other instruments via SCPI/VISA. It felt like the frontier of AI-meets-hardware. Figure was also thrilling because scaling OTA automation to 99% failure reduction on physical robots had real stakes.

**Q: What kind of role are you looking for after graduation?**
A: Firmware or embedded systems engineering, systems software, or AI/automation engineering. I want roles where software directly interacts with hardware — robotics, automotive, test & measurement, or similar domains.

**Q: Do you have any weaknesses or areas for growth?**
A: Honestly, my main gaps are frontend/web engineering at scale, production distributed systems (I know the theory well from Georgia Tech but haven't shipped a large-scale distributed backend), and mobile development depth beyond one internship. I'm very systems-focused, which means I sometimes have to consciously zoom out to think about the product experience, not just the technical correctness.

**Q: What are your strengths?**
A: I'm strongest at the intersection of software and hardware — test automation, firmware validation, embedded scripting, and building AI tooling. I ramp up quickly in new technical domains (three back-to-back internships in robotics, automotive, and test & measurement) and I think in terms of system performance and correctness instinctively.

**Q: How do you handle working in a new codebase or tech stack?**
A: I lean into reading code and writing small experiments first. At Tesla I migrated 1000+ SIL tests in a large unfamiliar codebase early in my internship. At Tektronix I had to quickly understand SCPI/VISA instrument protocols I'd never used before. Comfort with ambiguity is something I've built across every internship.

**Q: What makes you different from other candidates?**
A: Most engineers specialize in either software or hardware. I've operated at both layers — writing firmware-adjacent test suites, building AI agents that control physical instruments, and deploying automation that runs on real robots. That cross-layer depth is uncommon for a student.

**Q: What is your GPA and academic standing?**
A: I have a 3.7 GPA at Georgia Tech and have been on the Dean's List every semester. My concentrations are Distributed Systems & Software Design and Computing Hardware & Emerging Architecture.

**Q: Have you ever failed at something or made a mistake at work?**
A: Definitely. Early at Tesla I made assumptions about test scope that caused a delay — I learned to over-communicate and verify assumptions explicitly before diving into implementation. At Figure, my first version of the OTA automation had edge cases that slipped through; I went back and added a more systematic scenario mapping to close them. Failure is how I've learned to write more robust test infrastructure.

**Q: What do you do outside of work or school?**
A: I spend a lot of time on side projects at the intersection of AI and hardware — this portfolio itself is one of them. I also follow robotics and embedded systems research closely, particularly in the open-source RISC-V and autonomous systems communities.
