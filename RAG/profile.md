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

### Figure — Embedded Automation Intern
**Dates:** Jan 2026 – May 2026
**Location:** San Jose, CA
**Primary Languages/Tech:** Python, C++, Rust, HIL/OTA, Slack API, Jira, Embedded Systems, Test Automation

- Scaled connectivity test infrastructure from basic speed tests to full interface validation (priority arbitration, service allowlisting, Wi-Fi stability, AP testing, mid-OTA network switching), increasing automated coverage by 40%.
- Debugged and fixed 25+ OTA bugs, authored regression tests for each, and grew the OTA automated test suite from 0 to full scenario coverage, reducing OTA-related failures by 99%.
- Built a Slack-Jira bot that auto-creates tickets from threads, attaches logs, and triggers an agent to open a fix PR.
- Deployed a nightly HIL summary bot that surfaces root causes, links relevant merged PRs, and tags owners.
- Improved test results website by adding an interactive AI agent and optimized DB read/write latency by 40%.

### Tesla — Software Engineering Intern
**Dates:** Aug 2025 – Dec 2025
**Location:** Palo Alto, CA
**Primary Languages/Tech:** C++, Python, CAN Bus, SIL/HIL, Firmware Validation, Automotive

- Migrated 1000+ SIL tests for next-gen Tesla Model Y firmware, uncovering and resolving 10+ critical bugs.
- Ensured ±2% motor RPM accuracy and safety cut-off behavior by validating hall-sensor feedback.
- Expanded firmware validation coverage across 500+ automated HIL tests by bringing up CAN Motor Monitor signal integration for real-time motor performance monitoring.
- Strengthened thermal safety validation by authoring SIL tests for cabin temperature control across vehicle states (running, parked, powered-off), verifying correct Dog Mode and Child Mode behavior.

### Tektronix — Performance Applications Engineering Intern
**Dates:** May 2025 – Aug 2025
**Location:** Beaverton, OR
**Primary Languages/Tech:** Python, MCP, SCPI/VISA, AI Agents, JSON-RPC, Test Equipment

- Developed an AI-driven agent to translate natural language measurement goals into automated test workflows, integrating SCPI/VISA commands for Tektronix devices, reducing manual setup time by 60%.
- Built standalone MCP servers with JSON-RPC 2.0 compliance, UDP discovery, and SCPI/VISA integration, enabling seamless multi-instrument control and improving test throughput by 35%.
- Delivered demos and training on developed AI tools for application engineers, increasing productivity by 50%.

### Citadel Technologies — Software Development Intern
**Dates:** May 2024 – Aug 2024
**Location:** Atlanta, GA
**Primary Languages/Tech:** Flutter, Dart, WebSockets, Firebase, REST APIs, IoT

- Developed a Flutter mobile app for remote garage control using WebSocket APIs, achieving 95% user satisfaction.
- Implemented multi-garage and home view support using Provider and RESTful APIs, reducing setup time by 40%.
- Integrated IoT sensors and Firebase Cloud Messaging for real-time alerts, increasing response times by 30%.
- Optimized app performance and network payload, reducing load times by 35% and boosting user retention by 20%.

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

I believe I am a fast learner. If I focus on anything long enough, I no longer have it as a weakness — that's genuinely how I approach gaps in my knowledge. Every internship put me in a new domain (mobile IoT, test & measurement, automotive firmware, robotics) and I contributed production-level work in each one within weeks.

Current areas I'm actively growing in:
- **Frontend / web engineering at scale** — I've built this portfolio in React but haven't worked on a large production frontend team. I'm learning but it's not my primary focus.
- **Large distributed systems in production** — I understand the theory deeply from Georgia Tech coursework, and it's a concentration of mine. Hands-on production experience at scale is something I'll close quickly once in the right role.
- **Mobile development depth** — One internship (Citadel, Flutter/Dart). Not a primary area, but I can pick it up fast when needed.

The honest answer is: weaknesses are temporary for me. I identify the gap, focus on it, and close it.

---

## Frequently Asked Questions

**Q: What is your most-used programming language?**
A: Python, by far. I used Python at Figure, Tesla, and Tektronix for test automation, scripting, CAN bus tooling, Slack/Jira bots, MCP servers, and AI agents. It's my primary language for systems automation work.

**Q: Where have you used Python?**
A: Python was central at three of my four internships. At Tesla I wrote all the SIL tests for next-gen Model Y in Python. At Figure I built the internal chatbots and Slack-Jira automation bot in Python. At Tektronix I used Python for MCP servers and AI agent tooling. Citadel used Dart/Flutter instead.

**Q: What languages did you use at Figure?**
A: Three languages — C++ for OTA firmware work (debugging 25+ OTA bugs and improving the update pipeline), Python for building the Slack-Jira bot, nightly HIL summary bot, and an AI agent for the test results website, and Rust for a CLI tool I built for the firmware team.

**Q: What languages did you use at Tesla?**
A: Python for all 1000+ SIL tests for next-gen Model Y (including hall-sensor validation and thermal safety tests), and C/C++ for HIL infrastructure — specifically bringing up CAN Motor Monitor signal integration that expanded HIL validation coverage to 500+ automated tests.

**Q: What firmware work did you do?**
A: At Tesla I brought up CAN Motor Monitor signal integration in C++ as part of the HIL infrastructure, enabling real-time motor performance monitoring and expanding HIL test coverage to 500+ tests. At Figure I contributed to OTA firmware in C++, debugging and fixing 25+ OTA bugs and authoring regression tests to prevent recurrence.

**Q: What did you build at Figure?**
A: Several things — OTA firmware work in C++ (fixing 25+ bugs, writing regression tests, scaling the test suite from 0 to full scenario coverage), a Slack-Jira bot and nightly HIL summary bot in Python, an AI agent for the test results website in Python that also cut DB read/write latency by 40%, and a CLI tool in Rust. The combined impact: OTA-related failures reduced by 99% and automated connectivity coverage increased by 40%.

**Q: What is your most fun internship experience?**
A: Tektronix was uniquely exciting — I built AI agents in Python that could interpret natural-language test goals and automatically control oscilloscopes and other instruments via SCPI/VISA. It felt like the frontier of AI-meets-hardware. Figure was also thrilling because scaling OTA automation to 99% failure reduction on physical robots had real stakes.

**Q: What kind of role are you looking for after graduation?**
A: Firmware or embedded systems engineering, systems software, or AI/automation engineering. I want roles where software directly interacts with hardware — robotics, automotive, test & measurement, or similar domains.

**Q: Do you have any weaknesses or areas for growth?**
A: I believe I'm a fast learner — if I focus on anything long enough, I no longer have it as a weakness. That's not just something I say; every internship dropped me into a brand new domain and I was shipping production work within weeks each time. There are things I haven't done at scale yet (large frontend teams, production distributed backends), but those are temporary gaps, not permanent weaknesses.

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
