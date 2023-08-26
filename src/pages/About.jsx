import React from "react";
import './about.css'
import Contact from "./Contact";
const About = () => {
  
  return (
    <div>
    <section className="about-us">
      <h2>About Us</h2>
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
    Anupam is a passionate web developer with a knack for transforming
    intricate concepts into elegant and user-centric applications. He
    specializes in crafting captivating user interfaces and creating
    interactive web experiences. Anupam's unwavering dedication to coding and
    problem-solving fuels our projects with innovation and creativity.
  </p>
</div>
<div className="developer">
  <h3>
    <a
      href="https://www.linkedin.com/in/tanmay-roy/"
      target="_blank"
      rel="noopener noreferrer"
      className="developer-link"
    >
      Tanmay Roy
    </a>
  </h3>
  <p className="position">Full-stack Web Developer</p>
  <p>
    Tanmay is an accomplished web developer who thrives on building ingenious
    web solutions that deliver seamless and intuitive experiences. With a
    robust background in both front-end and back-end development, Tanmay brings
    a well-rounded perspective to our projects. His meticulous attention to
    detail and unwavering commitment to excellence resonate in every line of
    code he crafts.
  </p>
</div>

      </div>
      <p className="project-description">
      We are enthusiastic web developers, driven by our passion to build applications that bring real-world solutions to life. Our project, the "LeetCode Rating Predictor," reflects our dedication to crafting tools that provide genuine value to users.
      In our journey, we extend heartfelt appreciation to our beloved college senior , Arindam Halder Da ❤. His invaluable guidance and unwavering support have been instrumental in molding our skills and shaping our path in the world of development.
      We're genuinely thankful for Arindam's mentorship, which has been a guiding light throughout our growth. His belief in our potential has inspired us to create innovative solutions, contributing positively not only to the tech realm but also to the wider community.
      </p>
    </section>
    <div className="contact-container">
      <Contact />
    </div>

    </div>
  );
};

export default About;
