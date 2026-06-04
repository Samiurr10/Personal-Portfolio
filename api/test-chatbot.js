#!/usr/bin/env node
/**
 * Chatbot validation test suite.
 * Usage:
 *   node api/test-chatbot.js                        # test localhost:3000
 *   node api/test-chatbot.js https://www.samiur.dev # test production
 */

const BASE = process.argv[2] || "http://localhost:3000";
const URL = `${BASE}/api/search`;

const PASS = "\x1b[32m✓\x1b[0m";
const FAIL = "\x1b[31m✗\x1b[0m";
const INFO = "\x1b[33m→\x1b[0m";

let passed = 0;
let failed = 0;

async function ask(query) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

function check(label, data, assertions) {
  const errors = [];

  if (assertions.sourceShouldBe && data.source !== assertions.sourceShouldBe) {
    errors.push(`source="${data.source}" expected="${assertions.sourceShouldBe}"`);
  }
  if (assertions.shouldContain) {
    const lower = (data.response || "").toLowerCase();
    for (const term of assertions.shouldContain) {
      if (!lower.includes(term.toLowerCase())) {
        errors.push(`response missing "${term}"`);
      }
    }
  }
  if (assertions.shouldNotContain) {
    const lower = (data.response || "").toLowerCase();
    for (const term of assertions.shouldNotContain) {
      if (lower.includes(term.toLowerCase())) {
        errors.push(`response should not contain "${term}"`);
      }
    }
  }
  if (assertions.shouldRefuse) {
    const lower = (data.response || "").toLowerCase();
    if (!lower.includes("only answer") && !lower.includes("not related") && !lower.includes("can only")) {
      errors.push(`expected refusal but got: "${data.response?.slice(0, 80)}"`);
    }
  }

  if (errors.length === 0) {
    console.log(`  ${PASS} ${label}`);
    if (data.source) console.log(`      ${INFO} source=${data.source} | "${data.response?.slice(0, 90)}..."`);
    passed++;
  } else {
    console.log(`  ${FAIL} ${label}`);
    for (const e of errors) console.log(`      ${INFO} ${e}`);
    console.log(`      ${INFO} full response: "${data.response?.slice(0, 120)}"`);
    if (data.llmError) console.log(`      ${INFO} llmError: ${data.llmError}`);
    failed++;
  }
}

async function debug() {
  const data = await ask("__debug");
  if (data.hasKey !== undefined) {
    console.log(`\n${INFO} Debug info: hasKey=${data.hasKey}, keyLength=${data.keyLength}, model=${data.model}`);
    return data.hasKey;
  }
  console.log(`\n${INFO} Debug endpoint not yet deployed (old build running)`);
  return null;
}

async function run() {
  console.log(`\nTesting chatbot at: ${URL}\n`);

  const hasKey = await debug();

  if (hasKey === false) {
    console.log(`\x1b[31m⚠ OPENAI_API_KEY is not loaded in the function — LLM path will not activate\x1b[0m\n`);
  } else if (hasKey === true) {
    console.log(`\x1b[32m✓ OPENAI_API_KEY is loaded\x1b[0m\n`);
  }

  console.log("── Internship questions ──────────────────────────────────────");
  let d;

  d = await ask("what did you do at Tesla?");
  check("Tesla internship", d, { shouldContain: ["tesla", "firmware"] });

  d = await ask("tell me about your Figure internship");
  check("Figure internship", d, { shouldContain: ["figure", "ota"] });

  d = await ask("what was your role at Tektronix?");
  check("Tektronix internship", d, { shouldContain: ["tektronix"] });

  d = await ask("describe your Citadel internship");
  check("Citadel internship", d, { shouldContain: ["citadel", "flutter"] });

  d = await ask("what is your most fun internship experience?");
  check("Open-ended internship question (requires LLM)", d, {
    shouldNotContain: ["computer architecture", "cache simulator"],
  });

  console.log("\n── Education questions ───────────────────────────────────────");

  d = await ask("where do you go to school?");
  check("Education", d, { shouldContain: ["georgia"] });

  d = await ask("what is your GPA?");
  check("GPA", d, { shouldContain: ["3.7"] });

  d = await ask("when do you graduate?");
  check("Graduation date", d, { shouldContain: ["2026"] });

  console.log("\n── Project questions ─────────────────────────────────────────");

  d = await ask("tell me about your GPU project");
  check("GPU project", d, { shouldContain: ["cuda"] });

  d = await ask("what is the cache simulator?");
  check("Cache simulator", d, { shouldContain: ["cache"] });

  console.log("\n── Skills questions ──────────────────────────────────────────");

  d = await ask("what programming languages do you know?");
  check("Programming languages", d, { shouldContain: ["python"] });

  d = await ask("what are your embedded systems skills?");
  check("Embedded skills", d, { shouldNotContain: ["weather", "I can only"] });

  console.log("\n── Off-topic guard ───────────────────────────────────────────");

  d = await ask("what is the weather today?");
  check("Weather (off-topic)", d, { shouldRefuse: true });

  d = await ask("write me a Python script to sort a list");
  check("Code request (off-topic)", d, { shouldRefuse: true });

  d = await ask("who is Elon Musk?");
  check("Random person (off-topic)", d, { shouldRefuse: true });

  d = await ask("what is 2 + 2?");
  check("Math question (off-topic)", d, { shouldRefuse: true });

  console.log("\n── Contact & misc ────────────────────────────────────────────");

  d = await ask("how can I contact you?");
  check("Contact info", d, { shouldContain: ["srahman96"] });

  d = await ask("what are your career goals?");
  check("Career goals", d, { shouldNotContain: ["I can only"] });

  console.log(`\n${"─".repeat(55)}`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Test runner error:", err.message);
  process.exit(1);
});
