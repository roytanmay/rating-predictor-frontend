import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <hr></hr>
      <div className=".copyright">
        <p>{new Date().getFullYear()} Leetcode Rating Predictor.</p>
        <p>Share and Enjoy.</p>
      </div>
    </footer>
  );
};

export default Footer;
