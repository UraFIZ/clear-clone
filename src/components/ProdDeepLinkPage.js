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

  const handleAltruaStagingVerifyClick = () => {
    window.location.href = "https://altrua.staging.icanbwell.com";
  };
  const handleBwellStagingVerifyClick = () => {
    window.location.href = "https://portal.staging.icanbwell.com";
  };
  const handleMedstarStagingVerifyClick = () => {
    window.location.href = "https://medstar.staging.icanbwell.com";
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
            className="verify-button staging alt"
          >
            Verify Staging deep-linking
          </button>
          <button
            onClick={handleAltruaStagingVerifyClick}
            className="verify-button staging-button"
          >
            Verify Staging Altrua staging deep-linking
          </button>
          <button
            onClick={handleBwellStagingVerifyClick}
            className="verify-button staging-button"
          >
            Verify bwell staging deep-linking
          </button>
          <button
            onClick={handleMedstarStagingVerifyClick}
            className="verify-button staging-button"
          >
            Verify medstar staging deep-linking
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
