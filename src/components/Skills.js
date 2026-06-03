import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";

const skills = [
  { title: "Full-Stack Web Development", icon: meter1, alt: "Full-stack web development" },
  { title: "Embedded System Design", icon: meter3, alt: "Embedded system design" },
  { title: "High Performance Computing", icon: meter2, alt: "High performance computing" },
  { title: "Digital Design & Hardware Architecture", icon: meter3, alt: "Digital design and hardware architecture" },
  { title: "Machine Learning/AI Fundamentals", icon: meter2, alt: "Machine learning and AI" },
  { title: "IoT and Real-Time Systems", icon: meter1, alt: "IoT and real-time systems" },
  { title: "AI & Agent Engineering", icon: meter2, alt: "AI and agent engineering" },
  { title: "Embedded Systems & Firmware", icon: meter3, alt: "Embedded systems and firmware" },
  { title: "Test & Automation Engineering", icon: meter1, alt: "Test and automation engineering" },
  { title: "Systems & GPU Programming", icon: meter2, alt: "Systems and GPU programming" },
  { title: "System Design & Architecture", icon: meter3, alt: "System design and architecture" },
];

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                My expertise includes building scalable web platforms, designing
                IoT-integrated solutions, and optimizing algorithms for GPU and
                high-performance systems.
                <br />
                <br />
                Through roles at Figure, Tesla, Tektronix, and Citadel — plus
                coursework in computer architecture — I’ve also applied AI/MCP
                tooling, firmware and HIL/SIL automation, and end-to-end system
                design. I thrive on innovative, efficient solutions to hard
                engineering problems.
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {skills.map((skill) => (
                  <div className="item" key={skill.title}>
                    <img src={skill.icon} alt={skill.alt} />
                    <h5>{skill.title}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img
        className="background-image-left"
        src={colorSharp}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};
