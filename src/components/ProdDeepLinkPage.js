// ProdDeepLinkPage.js
import React from "react";
import Logo from "./Logo";
import "./ProdDeepLinkPage.css";

function ProdDeepLinkPage() {
  const handleProdVerifyClick = () => {
    window.location.href = "https://ripple.thedacare.org/";
  };

  const handleStagingVerifyClick = () => {
    window.location.href = "https://ripple.staging.icanbwell.com";
  };

  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verify Deep-linking</h1>
        <div className="button-group">
          <button
            onClick={handleProdVerifyClick}
            className="verify-button prod-button"
          >
            Verify Prod deep-linking
          </button>
          <button
            onClick={handleStagingVerifyClick}
            className="verify-button staging-button"
          >
            Verify Staging deep-linking
          </button>
        </div>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
