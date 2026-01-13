import React, { useEffect } from "react";
import Logo from "./Logo";
import "./SuccessPage.css";

function SuccessPage() {
  useEffect(() => {
    // Redirect to ripa.com/success after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://ripple.staging.icanbwell.com/";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-container">
      <Logo />
      <div className="success-content">
        <div className="check-icon">
          <svg viewBox="0 0 24 24" width="40" height="40">
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            />
          </svg>
        </div>

        <h1>Thanks for verifying with CLEAR</h1>
        <p>We're returning you to b.well.</p>

        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default SuccessPage;
