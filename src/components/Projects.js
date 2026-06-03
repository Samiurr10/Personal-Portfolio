import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import spreehaImg from "../assets/img/spreeha-buet88.png";
import appleGadgetsImg from "../assets/img/apple-gadgets-bd.png";
import embeddedImg1 from "../assets/img/embedded-img1.png";
import embeddedImg2 from "../assets/img/embedded-img2.png";
import cacheSimImg from "../assets/img/cache-simulator.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Spreeha BUET-88 Foundation",
      description: "Non-Profit Website",
      imgUrl: spreehaImg,
      url: "https://www.spreeha-buet88.com/",
    },
    {
      title: "Tech Website",
      description: "Apple Gadgets BD — e-commerce",
      imgUrl: appleGadgetsImg,
      url: "https://www.applegadgetsbd.com/",
    },
  ];

  const embeddedProjects = [
    {
      title: "Arithmetic Training Game",
      description: "Interactive game on uLCD display to improve arithmetic skills",
      imgUrl: embeddedImg1,
    },
    {
      title: "Portable Proximity Sensor",
      description: "Compact proximity detection device with real-time feedback",
      imgUrl: embeddedImg2,
    },
  ];

  const compArchProjects = [
    {
      title: "Cache Simulator",
      description: "Multi-level L1/L2 cache simulator with victim cache support",
      imgUrl: cacheSimImg,
      url: "https://github.com/Samiurr10/Cache-Simulator",
    },
    {
      title: "GPU Image Filter Engine",
      description: "CUDA convolution pipeline across 10,000+ GPU threads",
      imgUrl: cacheSimImg,
      url: "https://github.com/Samiurr10/ECE-4122-final-project",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Projects</h2>
                  <p>
                    A showcase of my technical expertise across web/app
                    development, embedded systems, and computer architecture.
                    Each project reflects my ability to innovate, solve
                    real-world problems, and deliver impactful solutions.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          Web/App Development
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Embedded Systems</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          Computer Architecture
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <p>
                          Designed and developed scalable web and mobile
                          applications using modern frameworks like React.js,
                          Flutter, and Firebase. Projects include platforms with
                          optimized performance and real-time functionality
                          tailored to user needs.
                        </p>

                        <Row className="justify-content-center">
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>
                          Developed IoT-enabled devices and real-time systems
                          integrating hardware and software seamlessly.
                          Highlights include creating robotics algorithms and
                          handheld gaming systems on Mbed, Arduino and
                         Rasberry Pi platforms.
                        </p>
                        <Row className="justify-content-center">
                          {embeddedProjects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>
                          Engineered efficient systems and optimized hardware
                          designs. Key projects involve desgining pipelined
                          proccessor, motor control peripherals and
                          GPU-accelerated algorithms for high-performance
                          computing tasks.
                        </p>
                        <Row className="justify-content-center">
                          {compArchProjects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
