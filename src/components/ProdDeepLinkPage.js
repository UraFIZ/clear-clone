import Logo from "./Logo";
import "./ProdDeepLinkPage.css";
import { useEffect, useState } from "react";

function ProdDeepLinkPage() {
  // ---------------------------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------------------------

  // 2. SCENARIO: ThedaCare App
  // Package: com.thedacare.v2.staging
  // Valid Domain: ripple.staging.icanbwell.com
  const THEDACARE_CONFIG = {
    name: "ThedaCare App",
    pkg: "com.thedacare.v2.staging",
    domain: "ripple.staging.icanbwell.com",
    path: "#/register-ial2-callback/",
    fallbackPath: "", // Root
  };

  // ---------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // ---------------------------------------------------------------------------

  const generateHttpsUrl = (config) => {
    // Mimics: https://ripple.staging.icanbwell.com/#/.../?status=success
    return `https://${config.domain}/${config.path}?status=success`;
  };

  const generateIntentUrl = (config, mode = "standard") => {
    // -------------------------------------------------------------------------
    // INTENT CONSTRUCTION DEBUGGING
    // -------------------------------------------------------------------------

    // Base components
    const host = config.domain;
    let path = config.path; // e.g., "#/register-ial2-callback/"

    // 1. STANDARD: As written "intent://host/path#Intent..."
    // This puts a '#' before the '#Intent' if the path has a hash.
    // Chrome handles this by looking for "#Intent;" specifically, usually.

    // 2. ENCODED: Replace '#' in path with '%23'
    // "intent://host/%23/register...#Intent..."
    if (mode === "encoded" && path.includes("#")) {
      path = path.replace("#", "%23");
    }

    // 3. ROOT: Ignore path, just try to open app at root
    // "intent://host/#Intent..." (trailing slash maybe)
    if (mode === "root") {
      path = "";
    }

    const intentPath = `${host}/${path}`;
    // Fallback: redirects to google to clearly see if Intent FAILED to resolve vs STAYED on page
    const fallbackUrl = "https://www.google.com/search?q=fallback+triggered";

    // Construct query params
    // Note: If using a hash router, params usually go INSIDE the hash logic or weirdly placed
    // For intent, we usually append them to the path part before the fragment
    const query = "?status=success";

    // Final Assembly
    // Note: "end" must be the absolute last token
    return `intent://${intentPath}${query}#Intent;scheme=https;package=${
      config.pkg
    };S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  };

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  // Modified to accept 'mode' for intent debugging
  const handleUsingHref = (config, type, mode = "standard") => {
    const url =
      type === "https"
        ? generateHttpsUrl(config)
        : generateIntentUrl(config, mode);

    console.log(`[HREF][${config.name}] Redirecting to: ${url}`);

    // Use a slight delay to allow console log to appear? No, direct is better for touch handling
    window.location.href = url;
  };

  // ... (Auto handlers follow similar pattern if needed, but focus on click first)

  // ---------------------------------------------------------------------------
  // AUTOMATED FLOWS
  // ---------------------------------------------------------------------------
  // State to track which auto-test is running
  const [autoTestConfig, setAutoTestConfig] = useState(null); // { config, type, mode }

  useEffect(() => {
    if (!autoTestConfig) return;
    const { config, type, mode } = autoTestConfig;
    const url =
      type === "https"
        ? generateHttpsUrl(config)
        : generateIntentUrl(config, mode || "standard");

    console.log(`[AUTO] Timer started for ${type} (${mode}) on ${config.name}`);

    const timer = setTimeout(() => {
      console.log(`[REPLACE] Redirecting to: ${url}`);
      try {
        window.location.replace(url);
      } catch (e) {
        window.location.href = url;
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoTestConfig]);

  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verification successful</h1>
        <p className="success-message">
          We've successfully verified your identity.
        </p>

        {/* THEDACARE SECTION */}
        <div
          style={{
            margin: "20px 0",
            border: "2px solid #007bff",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f8ff",
          }}
        >
          <h3 style={{ marginTop: 0 }}>ThedaCare App (Ripple)</h3>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Package: {THEDACARE_CONFIG.pkg}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* STANDARD HTTPS */}
            <button
              onClick={() => handleUsingHref(THEDACARE_CONFIG, "https")}
              className="continue-button"
              style={{ background: "#6c757d" }}
            >
              1. Test HTTPS Link (Known Working?)
            </button>

            {/* INTENT VARIATIONS */}
            <strong>Intent Debugging (Click):</strong>
            <button
              onClick={() =>
                handleUsingHref(THEDACARE_CONFIG, "intent", "standard")
              }
              className="continue-button"
            >
              2. Intent: Standard (Has #)
            </button>
            <button
              onClick={() =>
                handleUsingHref(THEDACARE_CONFIG, "intent", "encoded")
              }
              className="continue-button"
            >
              3. Intent: Encoded Hash (%23)
            </button>
            <button
              onClick={() =>
                handleUsingHref(THEDACARE_CONFIG, "intent", "root")
              }
              className="continue-button"
            >
              4. Intent: Root Only (No path)
            </button>

            {/* AUTO REDIRECT */}
            <strong>Auto Redirect (5s Delay):</strong>
            <button
              onClick={() =>
                setAutoTestConfig({
                  config: THEDACARE_CONFIG,
                  type: "intent",
                  mode: "encoded",
                })
              }
              className="continue-button"
              style={{ background: "#d63384" }}
            >
              5. Auto Redirect (Intent+Encoded)
            </button>

            {autoTestConfig?.config === THEDACARE_CONFIG && (
              <div style={{ color: "#d63384", fontWeight: "bold" }}>
                ⏳ Waiting 5s...
              </div>
            )}
          </div>
        </div>

        {/* CLEAR DEBUG BUTTONS */}
        <button
          onClick={() => window.location.reload()}
          className="continue-button"
          style={{
            marginTop: "20px",
            background: "transparent",
            color: "#333",
            border: "1px solid #ccc",
          }}
        >
          Reset Page
        </button>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
