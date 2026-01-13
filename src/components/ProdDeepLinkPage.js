/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ProdDeepLinkPage.css";
import clearLogo from "./clear-logo.png";
import { useEffect, useState } from "react";

function ProdDeepLinkPage() {
  // --- CONFIGURATION ---
  const BWELL_CONFIG = {
    name: "BWell Demo App",
    pkg: "com.icanbwell.bwelldemo.staging",
    domain: "app.staging.icanbwell.com",
    path: "bwell_demo/#/create-account/ial2-callback",
    fallbackPath: "bwell_demo",
  };

  const THEDACARE_CONFIG = {
    name: "ThedaCare App",
    pkg: "com.thedacare.v2.staging",
    domain: "ripple.staging.icanbwell.com",
    path: "#/register-ial2-callback/",
    fallbackPath: "", // Root
  };

  // --- HELPER: GENERATE INTENT URL ---
  const generateIntentUrl = (config) => {
    const host = config.domain;
    let path = config.path;
    // WINNING LOGIC: Encode # to %23 for Chrome Intent parsing
    if (path.includes("#")) {
      path = path.replace("#", "%23");
    }
    const intentPath = `${host}/${path}`;
    const fallbackUrl = `https://${config.domain}/${config.fallbackPath}`;

    // Ensure ?status=success is BEFORE #Intent
    return `intent://${intentPath}?status=success#Intent;scheme=https;package=${
      config.pkg
    };S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  };

  // --- HELPER: GENERATE HTTPS URL (Standard) ---
  const generateHttpsUrl = (config) => {
    return `https://${config.domain}/${config.path}?status=success`;
  };

  // --- STATE ---
  const [step, setStep] = useState(1); // 1 = Verify, 2 = Success/Redirect
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [redirectMethod, setRedirectMethod] = useState("intent"); // "intent" or "https"

  // --- HANDLER: Start Verification ---
  const handleStartVerification = (config, method) => {
    setSelectedConfig(config);
    setRedirectMethod(method);
    setStep(2);
  };

  // --- EFFECT: Handle Auto-Redirect on Step 2 ---
  useEffect(() => {
    if (step !== 2 || !selectedConfig) return;

    console.log(
      `[AUTO] Preparing redirect to ${selectedConfig.name} via ${redirectMethod}...`
    );

    let targetUrl;
    if (redirectMethod === "intent") {
      targetUrl = generateIntentUrl(selectedConfig);
    } else {
      targetUrl = generateHttpsUrl(selectedConfig);
    }

    const timer = setTimeout(() => {
      console.log(`[EXECUTE] Redirecting to: ${targetUrl}`);
      window.location.href = targetUrl;
    }, 5000);

    return () => clearTimeout(timer);
  }, [step, selectedConfig, redirectMethod]);

  // --- RENDER SCREEN 1: VERIFY ---
  if (step === 1) {
    return (
      <div className="prod-deeplink-container">
        <div className="clear-header">
          <img
            src={clearLogo}
            alt="CLEAR"
            className="clear-logo"
            style={{ height: "30px" }}
          />
        </div>

        <div className="prod-deeplink-content">
          <h1 className="verify-title">Verify your identity with CLEAR</h1>

          <p className="verify-desc">
            Enjoy extra peace of mind with the trusted security used at airports
            to keep your health information safe.{" "}
            <a href="#" style={{ color: "#4169ed" }}>
              Learn more
            </a>
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div className="feature-text">
                <h4>Top-tier security</h4>
                <p>
                  Join thousands who rely on CLEAR to protect their information
                  with confidence.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <div className="feature-text">
                <h4>Match with confidence</h4>
                <p>
                  Trust that the health records we gather truly belong to you.
                </p>
              </div>
            </div>
          </div>

          <div className="action-box">
            <button
              onClick={() =>
                handleStartVerification(THEDACARE_CONFIG, "intent")
              }
              className="clear-button"
            >
              Start Verification (ThedaCare - Intent)
            </button>
            <button
              onClick={() => handleStartVerification(BWELL_CONFIG, "intent")}
              className="clear-button"
            >
              Start Verification (BWell - Intent)
            </button>

            <button
              onClick={() => handleStartVerification(THEDACARE_CONFIG, "https")}
              className="clear-button secondary"
              style={{
                border: "1px solid #ccc",
                color: "#666",
                marginTop: "10px",
              }}
            >
              Start Verification (ThedaCare - HTTPS)
            </button>
            <button
              onClick={() => handleStartVerification(BWELL_CONFIG, "https")}
              className="clear-button secondary"
              style={{ border: "1px solid #ccc", color: "#666" }}
            >
              Start Verification (BWell - HTTPS)
            </button>
          </div>
          <div style={{ marginTop: "16px", fontSize: "12px", color: "#999" }}>
            Takes around 5 mins to complete
          </div>
        </div>

        <div className="footer-lang">
          <span>English (US) ▼</span>
          <span>CLEAR Privacy Policy</span>
        </div>
      </div>
    );
  }

  // --- RENDER SCREEN 2: SUCCESS/REDIRECT ---
  return (
    <div className="prod-deeplink-container">
      <div className="clear-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={clearLogo}
            alt="CLEAR"
            className="clear-logo"
            style={{ height: "24px" }}
          />
          <span style={{ color: "#ccc" }}>|</span>
          <span
            style={{ fontWeight: "bold", fontSize: "20px", color: "#303ab2" }}
          >
            b.well
          </span>
        </div>
      </div>

      <div className="prod-deeplink-content">
        <div className="spinner-container">
          <div className="simple-spinner"></div>
        </div>

        <h2 className="success-title">Thank you for using CLEAR</h2>
        <p className="success-sub">We're returning you to b.well</p>

        <div
          style={{
            marginTop: "50px",
            padding: "10px",
            background: "#f9f9f9",
            borderRadius: "8px",
            fontSize: "12px",
            maxWidth: "300px",
            color: "#666",
            textAlign: "left",
          }}
        >
          <strong>Debug Info:</strong>
          <br />
          Redirecting to: {selectedConfig?.name}
          <br />
          Method: {redirectMethod}
          <br />
          Auto-redirect in 5s...
        </div>
      </div>

      <div className="footer-lang">
        <span>English (PL) ▼</span>
        <span>CLEAR Privacy Policy</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
