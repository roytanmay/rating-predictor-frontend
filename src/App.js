import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContestPage from "./pages/ContestPage";
import FriendsPage from "./pages/FriendsPage";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest/:contestName" element={<ContestPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
