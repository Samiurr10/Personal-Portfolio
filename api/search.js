const PROFILE_CONTEXT = `
You are Samiur Rahman, a Computer Engineering student at Georgia Tech (GPA 3.7, Dean's List).
Concentrations: Distributed Systems & Software Design, Computing Hardware & Emerging Architecture.

Experience:
- Figure (Embedded Automation Intern): OTA/HIL automation, connectivity validation, Slack-Jira bot, test infrastructure.
- Tesla (Software Engineering Intern): SIL/HIL firmware validation, motor RPM accuracy, thermal safety tests.
- Tektronix (Performance Applications Engineering Intern): MCP servers, SCPI/VISA, AI measurement workflows.
- Citadel Technologies (Software Development Intern): Flutter IoT garage app, WebSockets, Firebase.

Projects: Cache Simulator (L1/L2/victim cache), GPU Image Filter Engine (CUDA), Memory Allocator, Binary Arcade Game.
Skills: C, C++, Python, Rust, CUDA, Swift, embedded systems, systems programming.
Contact: srahman96@gatech.edu | https://www.samiur.dev | GitHub: Samiurr10
`.trim();

function fallbackAnswer(query) {
  const q = query.toLowerCase();

  if (q.includes("tesla")) {
    return "At Tesla I worked on SIL/HIL firmware validation for next-gen Model Y, motor RPM accuracy (±2%), CAN motor monitoring, and thermal safety tests including Dog Mode and Child Mode.";
  }
  if (q.includes("figure")) {
    return "At Figure I scaled connectivity/OTA test automation, built Slack-Jira tooling, and improved HIL reporting—growing automated OTA coverage and reducing OTA-related failures significantly.";
  }
  if (q.includes("tektronix")) {
    return "At Tektronix I built MCP servers with JSON-RPC and SCPI/VISA integration, plus an AI agent that turns natural-language test goals into automated instrument workflows.";
  }
  if (q.includes("citadel") || q.includes("flutter")) {
    return "At Citadel Technologies I developed a Flutter IoT garage control app with WebSockets, Firebase alerts, and REST APIs—improving load times and user retention.";
  }
  if (q.includes("cache")) {
    return "My Cache Simulator models configurable L1, victim, and L2 caches with trace-driven hit/miss rates and AMAT statistics. See github.com/Samiurr10/Cache-Simulator.";
  }
  if (q.includes("gpu") || q.includes("cuda")) {
    return "My GPU Image Filter Engine applies convolution filters in parallel with 10,000+ CUDA threads. See github.com/Samiurr10/ECE-4122-final-project.";
  }
  if (q.includes("education") || q.includes("georgia") || q.includes("gt")) {
    return "I'm studying Computer Engineering at Georgia Tech (expected Dec 2026), Dean's List, GPA 3.7, with focus on distributed systems and computer architecture.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can reach me at srahman96@gatech.edu or visit https://www.samiur.dev for my portfolio and resume.";
  }
  if (q.includes("project")) {
    return "Featured projects include a multi-level cache simulator, CUDA image filter engine, custom memory allocator, embedded arcade game, and this portfolio site at samiur.dev.";
  }

  return "I'm Samiur Rahman — Computer Engineering @ Georgia Tech, with internship experience at Figure, Tesla, Tektronix, and Citadel. I build systems software, embedded automation, and performance tooling. Ask about a specific role, project, or skill, or email me at srahman96@gatech.edu.";
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, response: "Method not allowed" });
  }

  const { query } = req.body || {};
  if (!query || !String(query).trim()) {
    return res.status(400).json({ status: 400, response: "Query cannot be empty" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ status: 200, response: fallbackAnswer(query) });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Pretend you are Samiur Rahman. Answer professionally in a few short sentences using this background:\n${PROFILE_CONTEXT}`,
          },
          { role: "user", content: String(query).trim() },
        ],
        max_tokens: 350,
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      throw new Error(data.error?.message || "OpenAI request failed");
    }

    const text = data.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({
      status: 200,
      response: text || fallbackAnswer(query),
    });
  } catch {
    return res.status(200).json({ status: 200, response: fallbackAnswer(query) });
  }
};
