import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContestPage from './pages/ContestPage';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/contest/:contestName' element={<ContestPage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
