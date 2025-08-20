import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Upload from "./pages/Upload";
import VideoBackground from './components/background/VideoBackground';

function App() {
    return (
        <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            <VideoBackground />
        </Router>
    );
}

export default App;
