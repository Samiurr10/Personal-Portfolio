import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import logoTesla from "../assets/img/logo-tesla.png";
import logoCitadel from "../assets/img/logo-citadel.png";
import logoFigure from "../assets/img/logo-figure.png";
import logoTektronix from "../assets/img/logo-tektronix.png";

const experiences = [
  {
    company: "Figure",
    logo: logoFigure,
    logoBg: "transparent",
    role: "Embedded Automation Intern",
    date: "Jan 2026 – May 2026",
    location: "San Jose, CA",
    bullets: [
      "Scaled connectivity test infrastructure from basic speed tests to full interface validation (priority arbitration, service allowlisting, Wi-Fi stability, AP testing, mid-OTA network switching), increasing automated coverage by 40%.",
      "Debugged and fixed 25+ OTA bugs, authored regression tests for each, and grew the OTA automated test suite from 0 to full scenario coverage, reducing OTA-related failures by 99%.",
      "Built a Slack-Jira bot that auto-creates tickets from threads, attaches logs, and triggers an agent to open a fix PR.",
      "Deployed a nightly HIL summary bot that surfaces root causes, links relevant merged PRs, and tags owners.",
      "Improved test results website by adding an interactive AI agent and optimized DB read/write latency by 40%.",
    ],
    tags: ["Python", "C++", "Rust", "HIL/OTA", "Slack API", "Jira", "Embedded Systems", "Test Automation"],
  },
  {
    company: "Tesla",
    logo: logoTesla,
    logoBg: "#ffffff",
    role: "Software Engineering Intern",
    date: "Aug 2025 – Dec 2025",
    location: "Palo Alto, CA",
    bullets: [
      "Migrated 1000+ SIL tests for next-gen Tesla Model Y firmware, uncovering and resolving 10+ critical bugs.",
      "Ensured ±2% motor RPM accuracy and safety cut-off behavior by validating hall-sensor feedback.",
      "Expanded firmware validation coverage across 500+ automated HIL tests by bringing up CAN Motor Monitor signal integration for real-time motor performance monitoring.",
      "Strengthened thermal safety validation by authoring SIL tests for cabin temperature control across vehicle states (running, parked, powered-off), verifying correct Dog Mode and Child Mode behavior.",
    ],
    tags: ["C++", "Python", "CAN Bus", "SIL/HIL", "Firmware Validation", "Automotive"],
  },
  {
    company: "Tektronix",
    logo: logoTektronix,
    logoBg: "#ffffff",
    role: "Performance Applications Engineering Intern",
    date: "May 2025 – Aug 2025",
    location: "Beaverton, OR",
    bullets: [
      "Developed an AI-driven agent to translate natural language measurement goals into automated test workflows, integrating SCPI/VISA commands for Tektronix devices, reducing manual setup time by 60%.",
      "Built standalone MCP servers with JSON-RPC 2.0 compliance, UDP discovery, and SCPI/VISA integration, enabling seamless multi-instrument control and improving test throughput by 35%.",
      "Delivered demos and training on developed AI tools for application engineers, increasing productivity by 50%.",
    ],
    tags: ["Python", "MCP", "SCPI/VISA", "AI Agents", "JSON-RPC", "Test Equipment"],
  },
  {
    company: "Citadel Technologies",
    logo: logoCitadel,
    logoBg: "#ffffff",
    role: "Software Development Intern",
    date: "May 2024 – Aug 2024",
    location: "Atlanta, GA",
    bullets: [
      "Developed a Flutter mobile app for remote garage control using WebSocket APIs, achieving 95% user satisfaction.",
      "Implemented multi-garage and home view support using Provider and RESTful APIs, reducing setup time by 40%.",
      "Integrated IoT sensors and Firebase Cloud Messaging for real-time alerts, increasing response times by 30%.",
      "Optimized app performance and network payload, reducing load times by 35% and boosting user retention by 20%.",
    ],
    tags: ["Flutter", "Dart", "WebSockets", "Firebase", "REST APIs", "IoT"],
  },
];

export const Experience = () => {
  return (
    <section className="experience" id="experience">
      <Container>
        <Row>
          <Col xs={12}>
            <div>
                  <h2>Experience</h2>
                  <p>
                    Internship experience spanning firmware validation, embedded
                    automation, AI tooling, and mobile development at leading
                    companies across the industry.
                  </p>
                  <div className="exp-timeline">
                    {experiences.map((exp) => (
                      <div className="exp-card" key={exp.company}>
                        <div className="exp-card-header">
                          <div
                            className="exp-logo-wrap"
                            style={{ background: exp.logoBg }}
                          >
                            <img
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                            />
                          </div>
                          <div className="exp-header-text">
                            <h3>{exp.company}</h3>
                            <div className="exp-meta">
                              <span className="exp-role">{exp.role}</span>
                              <span className="exp-date">{exp.date}</span>
                            </div>
                            <span className="exp-location">
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <ul className="exp-bullets">
                          {exp.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <div className="exp-tags">
                          {exp.tags.map((t) => (
                            <span className="exp-tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
            </div>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-left"
        src={colorSharp}
        alt=""
        aria-hidden="true"
      />
      <img
        className="background-image-right"
        src={colorSharp2}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};
