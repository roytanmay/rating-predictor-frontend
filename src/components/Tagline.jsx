import { useState, useEffect } from "react";
import "./tagline.css";

const Tagline = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const textLoad = () => {
      setTimeout(() => {
        setText("Dominance!");
      }, 0);
      setTimeout(() => {
        setText("Rank!");
      }, 5000);
      setTimeout(() => {
        setText("New Rating!");
      }, 10000);
    };

    textLoad();
    const interval = setInterval(textLoad, 15000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div class="container">
      <span class="text first-text">Predict Your LeetCode </span>
      <span class="text sec-text">{text}</span>
    </div>
  );
};

export default Tagline;
