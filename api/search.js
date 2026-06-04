// ─── Full resume context injected into the LLM system prompt ────────────────
const PROFILE_CONTEXT = `
EDUCATION
- Georgia Institute of Technology, B.S. Computer Engineering (expected Dec 2026)
- GPA: 3.7 | Dean's List
- Concentrations: Distributed Systems & Software Design; Computing Hardware & Emerging Architecture
- Relevant coursework: Computer Architecture, Embedded Systems, Operating Systems, Machine Learning, Digital Design, Data Structures & Algorithms

EXPERIENCE

Figure AI — Embedded Automation Intern (May 2025 – Aug 2025, San Jose CA)
- Scaled OTA and HIL connectivity test automation, significantly growing automated OTA coverage and reducing OTA-related failures.
- Built a Slack-Jira integration bot to automate issue triaging and status syncing across the firmware team's workflow.
- Improved HIL reporting pipelines and test infrastructure for embedded connectivity validation of robot modules.
- Developed and maintained test harnesses for hardware-in-the-loop validation of robot connectivity systems.

Tesla — Software Engineering Intern (Jan 2025 – May 2025, Palo Alto CA)
- Developed SIL/HIL firmware validation test suites for next-gen Model Y powertrain systems.
- Achieved ±2% motor RPM accuracy through CAN bus motor monitoring and closed-loop test automation.
- Designed and executed thermal safety validation tests including Dog Mode and Child Mode edge-case scenarios.
- Contributed to automated regression pipelines reducing manual firmware verification time.

Tektronix — Performance Applications Engineering Intern (May 2024 – Aug 2024, Beaverton OR)
- Built MCP servers with JSON-RPC and SCPI/VISA integration for programmatic instrument control.
- Developed an AI agent that translates natural-language test goals into automated instrument measurement workflows.
- Bridged LLM-based reasoning with hardware test equipment over standard instrument protocols.

Citadel Technologies — Software Development Intern (Aug 2023 – Dec 2023, Atlanta GA)
- Built a Flutter IoT garage control application with real-time WebSocket-based device communication.
- Integrated Firebase push notifications and REST APIs for secure remote access and event alerting.
- Improved app load times and user retention through performance optimizations and UX enhancements.

PROJECTS
- Cache Simulator: Configurable L1, victim cache, and L2 cache model with trace-driven hit/miss rates and AMAT statistics. Built in C.
- GPU Image Filter Engine: Parallel image convolution with 10,000+ CUDA threads. ECE 4122 final project. Built in C++/CUDA.
- Custom Memory Allocator: Heap allocator implementing first-fit and best-fit strategies with coalescing. Built in C.
- Binary Arcade Game: Embedded arcade game on FPGA hardware with VGA output. Built in Verilog/SystemVerilog.
- Personal Portfolio (samiur.dev): This portfolio site — React, Vercel serverless API, AI-powered chat, responsive design.

SKILLS
Languages: C, C++, Python, Rust, CUDA, Swift, Dart/Flutter, JavaScript/TypeScript, React, Verilog
Embedded & Hardware: Firmware validation, HIL/SIL testing, CAN bus, SCPI/VISA, I2C, SPI, UART, ARM microcontrollers, FPGA
Systems & Performance: CUDA/GPU programming, memory management, OS internals, computer architecture, distributed systems
AI & Tooling: LangChain, OpenAI API, MCP servers, Pinecone, AI agents, test automation frameworks
DevOps: Git, Vercel, Firebase, Docker, CI/CD pipelines, Jira, Slack API

CONTACT
Email: srahman96@gatech.edu
Portfolio: https://www.samiur.dev
GitHub: https://github.com/Samiurr10
LinkedIn: https://www.linkedin.com/in/samiur-rahman-1a09b6271/
`.trim();

const SYSTEM_PROMPT = `You are a portfolio assistant for Samiur Rahman.

Rules you must follow without exception:
1. Only answer questions about Samiur Rahman — his education, internships, projects, skills, and contact info.
2. If the question is not about Samiur, reply exactly: "I can only answer questions about Samiur Rahman. Try asking about his internships, projects, or skills."
3. Answer in first person as if you are Samiur speaking directly.
4. Be concise — 2 to 4 sentences maximum. No bullet points, no headers.
5. Never fabricate facts not listed in the resume below. If something isn't covered, say so briefly.
6. Do not discuss other people, companies in general, or topics unrelated to Samiur's profile.

Resume data:
${PROFILE_CONTEXT}`;

// ─── Keyword router — fallback when no API key or OpenAI is unreachable ──────
const KNOWLEDGE_BASE = [
  {
    topics: ["figure", "ota", "connectivity", "slack", "jira", "robot", "hil automation", "embedded automation"],
    answer: "At Figure I scaled OTA and HIL connectivity test automation, growing automated OTA coverage and significantly reducing OTA-related failures. I also built a Slack-Jira integration bot to automate issue triaging and status syncing across the firmware team, and improved HIL reporting pipelines for robot connectivity validation.",
  },
  {
    topics: ["tesla", "sil", "model y", "can bus", "rpm", "dog mode", "child mode", "thermal", "powertrain"],
    answer: "At Tesla I developed SIL/HIL firmware validation test suites for next-gen Model Y powertrain systems. I achieved ±2% motor RPM accuracy through CAN bus monitoring and closed-loop automation, and designed thermal safety tests covering edge cases like Dog Mode and Child Mode.",
  },
  {
    topics: ["tektronix", "scpi", "visa", "instrument", "oscilloscope", "measurement", "json-rpc", "mcp server"],
    answer: "At Tektronix I built MCP servers with JSON-RPC and SCPI/VISA integration for programmatic instrument control. I also developed an AI agent that translates natural-language test goals into automated measurement workflows, bridging LLM reasoning with hardware test equipment.",
  },
  {
    topics: ["citadel", "flutter", "dart", "garage", "websocket", "firebase", "iot app"],
    answer: "At Citadel Technologies I built a Flutter IoT garage control app with real-time WebSocket communication, Firebase push notifications, and REST APIs for secure remote access. I improved app load times and user retention through performance optimizations.",
  },
  {
    topics: ["cache", "l1", "l2", "victim cache", "amat", "hit rate", "miss rate", "cache simulator"],
    answer: "My Cache Simulator models configurable L1, victim, and L2 caches with trace-driven hit/miss rate analysis and AMAT statistics — built in C. It supports multiple replacement and write policies and was designed to study cache hierarchy performance.",
  },
  {
    topics: ["gpu", "cuda", "image filter", "convolution", "parallel", "thread", "ece 4122"],
    answer: "My GPU Image Filter Engine applies convolution filters in parallel using 10,000+ CUDA threads — built in C++/CUDA for ECE 4122. The project explores GPU memory hierarchies and thread block optimization for image processing workloads.",
  },
  {
    topics: ["memory allocator", "malloc", "heap", "free", "coalescing", "first-fit", "best-fit"],
    answer: "I built a custom heap memory allocator in C implementing first-fit and best-fit allocation strategies with block coalescing. The project deepened my understanding of dynamic memory management and OS-level memory layout.",
  },
  {
    topics: ["arcade", "fpga", "vga", "binary game", "verilog", "systemverilog", "embedded game"],
    answer: "I built a binary arcade game on FPGA hardware with VGA display output, written in Verilog/SystemVerilog. It involved real-time input handling, display timing, and finite state machine design at the hardware level.",
  },
  {
    topics: ["portfolio", "samiur.dev", "website", "this site", "react", "vercel", "chat"],
    answer: "I built this portfolio site using React and deployed it on Vercel with a serverless API backend. It includes this AI-powered chat, a responsive design, and sections for my experience, projects, and skills.",
  },
  {
    topics: ["georgia tech", "gatech", "gt", "gpa", "degree", "computer engineering", "dean's list", "graduation", "concentration", "major", "coursework"],
    answer: "I'm studying Computer Engineering at Georgia Tech with a 3.7 GPA and Dean's List recognition, graduating in December 2026. My concentrations are Distributed Systems & Software Design and Computing Hardware & Emerging Architecture.",
  },
  {
    topics: ["python", "c++", "rust", "swift", "javascript", "typescript", "languages", "programming language"],
    answer: "My primary languages are C, C++, Python, and Rust for systems work, plus CUDA for GPU programming, Dart/Flutter for mobile, and JavaScript/TypeScript/React for web. I pick the right tool for the problem.",
  },
  {
    topics: ["embedded", "firmware", "rtos", "i2c", "spi", "uart", "arm", "microcontroller", "hardware"],
    answer: "I have hands-on embedded systems experience from coursework and internships at Figure and Tesla — firmware validation, HIL/SIL testing, CAN bus, SCPI/VISA, and low-level hardware protocols including I2C, SPI, and UART on ARM platforms.",
  },
  {
    topics: ["systems", "os", "kernel", "operating system", "architecture", "distributed", "performance"],
    answer: "My systems background spans computer architecture, OS internals, memory management, and distributed systems — both through GT coursework and projects like my cache simulator, memory allocator, and GPU engine.",
  },
  {
    topics: ["ai", "machine learning", "ml", "langchain", "openai", "agent", "mcp", "pinecone", "llm", "rag"],
    answer: "I've built AI agents and MCP tooling at Tektronix, worked with LangChain, OpenAI, and Pinecone, and built this portfolio's chat backend. My interest is in grounded, task-specific AI systems rather than general-purpose chatbots.",
  },
  {
    topics: ["automation", "test automation", "ci", "pytest", "regression", "pipeline", "testing"],
    answer: "Test and automation engineering is a through-line across my internships — OTA/HIL automation at Figure, SIL/HIL firmware regression at Tesla, and AI-driven instrument automation at Tektronix. I'm comfortable designing and owning full test infrastructure.",
  },
  {
    topics: ["contact", "email", "reach", "hire", "get in touch", "linkedin", "github", "recruiter"],
    answer: "You can reach me at srahman96@gatech.edu or connect on LinkedIn at linkedin.com/in/samiur-rahman-1a09b6271. My GitHub is github.com/Samiurr10 and my full portfolio and resume are at samiur.dev.",
  },
  {
    topics: ["goal", "future", "career", "looking for", "next role", "interest", "after graduation", "full time", "new grad"],
    answer: "I'm graduating in December 2026 and looking for full-time roles in embedded systems, firmware, systems software, or AI/automation engineering. I thrive where software, hardware, and performance intersect.",
  },
  {
    topics: ["who", "about", "introduce", "summary", "background", "tell me", "samiur", "yourself"],
    answer: "I'm Samiur Rahman, a Computer Engineering student at Georgia Tech (GPA 3.7, Dean's List, Dec 2026) with internships at Figure, Tesla, Tektronix, and Citadel. I build across firmware validation, embedded automation, AI tooling, and systems software.",
  },
];

const ALL_SIGNAL_WORDS = [
  ...new Set(KNOWLEDGE_BASE.flatMap((e) => e.topics)),
  "skill", "project", "intern", "work", "experience", "hire", "background",
  "what", "how", "when", "where", "why", "did you", "have you", "can you",
];

function scoreEntry(query, entry) {
  return entry.topics.filter((t) => query.includes(t)).length;
}

function isOffTopic(query) {
  return !ALL_SIGNAL_WORDS.some((w) => query.includes(w));
}

function keywordFallback(query) {
  if (isOffTopic(query)) {
    return "I can only answer questions about Samiur Rahman. Try asking about his internships, projects, or skills.";
  }

  let best = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreEntry(query, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best
    ? best.answer
    : "I'm Samiur Rahman — Computer Engineering @ Georgia Tech, with internships at Figure, Tesla, Tektronix, and Citadel. Ask me about a specific role, project, or skill, or reach me at srahman96@gatech.edu.";
}

// ─── Vercel serverless handler ────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, response: "Method not allowed" });
  }

  const { query } = req.body || {};
  const trimmed = String(query || "").trim();
  if (!trimmed) {
    return res.status(400).json({ status: 400, response: "Please enter a question." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // ── LLM path ────────────────────────────────────────────────────────────────
  if (apiKey) {
    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: trimmed },
          ],
          max_tokens: 180,
          temperature: 0.2,
        }),
      });

      const data = await openaiRes.json();

      if (openaiRes.ok) {
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) {
          return res.status(200).json({ status: 200, response: text });
        }
      }
    } catch {
      // fall through to keyword router
    }
  }

  // ── Keyword fallback ─────────────────────────────────────────────────────────
  return res.status(200).json({
    status: 200,
    response: keywordFallback(trimmed.toLowerCase()),
  });
};
