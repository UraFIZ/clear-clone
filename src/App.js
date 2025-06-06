import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdDeepLinkPage from "./components/ProdDeepLinkPage";
import VerificationPage from "./components/VerificationPage";
import SuccessPage from "./components/SuccessPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProdDeepLinkPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
