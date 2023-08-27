import React from "react";
import "./about.css";
import Contact from "./Contact";
const About = () => {
  return (
    <div>
      <section className="about-us">
        {/* <h2>About Us</h2> */}
        <div className="developers-container">
          <div className="developer">
            <h3>
              <a
                href="https://www.linkedin.com/in/anupam--ghosh/"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Anupam Ghosh
              </a>
            </h3>
            <p className="position">Front-end Web Developer</p>
            <p>
              Anupam is a talented web developer who turns complicated ideas
              into user-friendly applications. He's great at making attractive
              interfaces and interactive web experiences, bringing innovation
              and creativity to our projects.
            </p>
          </div>
          <div className="developer">
            <h3>
              <a
                href="https://www.linkedin.com/in/roytanmay/"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Tanmay Roy
              </a>
            </h3>
            <p className="position">Full-stack Web Developer</p>
            <p>
              Tanmay is a skilled web developer known for creating user-friendly
              and seamless web solutions. With expertise in both front-end and
              back-end development, Tanmay brings a well-rounded perspective to
              our projects.
            </p>
          </div>
        </div>
        <p className="special-mention">
          We're enthusiastic web developers focused on building useful
          applications, like the "LeetCode Rating Predictor." We're grateful to
          our college senior, Arindam Halder Da ❤, for guiding us and inspiring
          innovative solutions that benefit both tech and the community.
        </p>
      </section>
      <div className="contact-container">
        <Contact />
      </div>
    </div>
  );
};

export default About;
