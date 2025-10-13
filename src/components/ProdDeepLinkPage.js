// ProdDeepLinkPage.js
import React from "react";
import Logo from "./Logo";
import "./ProdDeepLinkPage.css";

function ProdDeepLinkPage() {
  // Detect if user is on Samsung Internet browser
  const isSamsungBrowser = () => {
    return /SamsungBrowser/i.test(navigator.userAgent);
  };

  // Generate appropriate deep link based on browser
  const generateDeepLink = () => {
    const httpsUrl = "https://ripple.staging.icanbwell.com";
    const packageName = "com.thedacare.v2.staging"; // Replace with your actual package name
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}`;

    if (isSamsungBrowser()) {
      console.log("Samsung Internet browser detected");
      // Use intent:// URL for Samsung Internet
      const intentPath = "ripple.staging.icanbwell.com";
      return `intent://${intentPath}#Intent;scheme=https;package=${packageName};S.browser_fallback_url=${encodeURIComponent(
        playStoreUrl
      )};end`;
    }

    // Standard HTTPS URL for other browsers (App Links)
    return httpsUrl;
  };

  const handleContinueClick = () => {
    const deepLink = generateDeepLink();
    window.location.href = deepLink;
  };

  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verification successful</h1>
        <p className="success-message">
          We've successfully verified your identity.
        </p>
        <button onClick={handleContinueClick} className="continue-button">
          Continue
        </button>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
