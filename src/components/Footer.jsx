import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <hr></hr>
      <div className=".copyright">
        <p>
          &copy; {new Date().getFullYear()} Leetcode Rating Predictor. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
