import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import GroomPage from "./pages/GroomPage";
import BridePage from "./pages/BridePage";
import ThankYou from "./pages/ThankYou";
import NoiseOverlay from "./components/NoiseOverlay";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groom" element={<GroomPage />} />
                    <Route path="/bride" element={<BridePage />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                </Routes>
            </BrowserRouter>
            <NoiseOverlay />
            <Toaster
                theme="dark"
                position="top-center"
                toastOptions={{
                    style: {
                        background: "#0b2b26",
                        color: "#FDFBF7",
                        border: "1px solid rgba(212,175,55,0.35)",
                        fontFamily: "Lato, sans-serif",
                    },
                }}
            />
        </div>
    );
}

export default App;
