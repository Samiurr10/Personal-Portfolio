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
    date: "May 2025 – Aug 2025",
    location: "San Jose, CA",
    bullets: [
      "Scaled OTA and HIL connectivity test automation, significantly growing automated OTA coverage and reducing OTA-related failures.",
      "Built a Slack-Jira integration bot to automate issue triaging and status syncing across the firmware team's workflow.",
      "Improved HIL reporting pipelines and test infrastructure for embedded connectivity validation.",
      "Developed and maintained test harnesses for hardware-in-the-loop validation of robot connectivity modules.",
    ],
    tags: ["Python", "HIL/OTA", "Slack API", "Jira", "Embedded Systems", "Test Automation"],
  },
  {
    company: "Tesla",
    logo: logoTesla,
    logoBg: "#ffffff",
    role: "Software Engineering Intern",
    date: "Jan 2025 – May 2025",
    location: "Palo Alto, CA",
    bullets: [
      "Developed SIL/HIL firmware validation test suites for next-gen Model Y powertrain systems.",
      "Achieved ±2% motor RPM accuracy through CAN bus motor monitoring and closed-loop test automation.",
      "Designed and executed thermal safety validation tests including Dog Mode and Child Mode edge-case scenarios.",
      "Contributed to automated regression pipelines that reduced manual firmware verification time.",
    ],
    tags: ["C++", "Python", "CAN Bus", "SIL/HIL", "Firmware Validation", "Automotive"],
  },
  {
    company: "Tektronix",
    logo: logoTektronix,
    logoBg: "#ffffff",
    role: "Performance Applications Engineering Intern",
    date: "May 2024 – Aug 2024",
    location: "Beaverton, OR",
    bullets: [
      "Built MCP servers with JSON-RPC and SCPI/VISA integration for programmatic instrument control.",
      "Developed an AI agent that translates natural-language test goals into automated instrument measurement workflows.",
      "Designed tooling to bridge LLM-based reasoning with hardware test equipment over standard instrument protocols.",
      "Improved test setup time and repeatability for performance measurement workflows.",
    ],
    tags: ["Python", "MCP", "SCPI/VISA", "AI Agents", "JSON-RPC", "Test Equipment"],
  },
  {
    company: "Citadel Technologies",
    logo: logoCitadel,
    logoBg: "#ffffff",
    role: "Software Development Intern",
    date: "Aug 2023 – Dec 2023",
    location: "Atlanta, GA",
    bullets: [
      "Built a Flutter IoT garage control application with real-time WebSocket-based device communication.",
      "Integrated Firebase push notifications and REST APIs for secure remote access and event alerting.",
      "Improved app load times and user retention through performance optimizations and UX enhancements.",
      "Delivered end-to-end feature development from embedded hardware interface to mobile front-end.",
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
