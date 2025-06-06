// ProdDeepLinkPage.js
import React from "react";
import Logo from "./Logo";
import "./ProdDeepLinkPage.css";

function ProdDeepLinkPage() {
  const handleVerifyClick = () => {
    window.location.href = "https://ripple.thedacare.org/";
  };

  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verify Prod deep-linking</h1>
        <button onClick={handleVerifyClick} className="verify-button">
          Verify Prod deep-linking
        </button>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
