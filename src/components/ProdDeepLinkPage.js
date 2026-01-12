import Logo from "./Logo";
import "./ProdDeepLinkPage.css";
import { useEffect, useState } from "react";

function ProdDeepLinkPage() {
  // ---------------------------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------------------------

  // 1. SCENARIO: BWell Demo App
  // Package: com.icanbwell.bwelldemo.staging
  // Valid Domain: app.staging.icanbwell.com
  const BWELL_DEMO_CONFIG = {
    name: "BWell Demo App",
    pkg: "com.icanbwell.bwelldemo.staging",
    domain: "app.staging.icanbwell.com",
    path: "bwell_demo/#/create-account/ial2-callback",
    fallbackPath: "bwell_demo",
  };

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

  const generateIntentUrl = (config) => {
    // 1. The core scheme path (without https://)
    const intentPath = `${config.domain}/${config.path}`;
    // 2. The Browser Fallback (where to go if app not installed)
    const fallbackUrl = `https://${config.domain}/${config.fallbackPath}`;
    // 3. Assemble
    return `intent://${intentPath}?status=success#Intent;scheme=https;package=${
      config.pkg
    };S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  };

  // ---------------------------------------------------------------------------
  // HANDLERS (Direct Click -> window.location.href)
  // ---------------------------------------------------------------------------

  const handleUsingHref = (config, type) => {
    const url =
      type === "https" ? generateHttpsUrl(config) : generateIntentUrl(config);
    console.log(`[HREF] Redirecting to: ${url}`);
    window.location.href = url;
  };

  // ---------------------------------------------------------------------------
  // AUTOMATED FLOWS (Delayed -> window.location.replace)
  // ---------------------------------------------------------------------------

  // State to track which auto-test is running
  const [autoTestConfig, setAutoTestConfig] = useState(null); // { config: ..., type: 'https'|'intent' }

  useEffect(() => {
    if (!autoTestConfig) return;

    const { config, type } = autoTestConfig;
    const url =
      type === "https" ? generateHttpsUrl(config) : generateIntentUrl(config);

    console.log(`[AUTO] Timer started for ${type} on ${config.name}`);

    const timer = setTimeout(() => {
      console.log(`[REPLACE] Redirecting to: ${url}`);
      try {
        window.location.replace(url);
      } catch (e) {
        console.error("Redirect failed", e);
        // Fallback if replace fails
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

        {/* THEDACARE SECTION (RIPPLE) */}
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
            Domain: {THEDACARE_CONFIG.domain}
            <br />
            Package: {THEDACARE_CONFIG.pkg}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong>Method 1: Direct Click (window.location.href)</strong>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleUsingHref(THEDACARE_CONFIG, "https")}
                className="continue-button"
                style={{ flex: 1 }}
              >
                HTTPS (href)
              </button>
              <button
                onClick={() => handleUsingHref(THEDACARE_CONFIG, "intent")}
                className="continue-button"
                style={{ flex: 1 }}
              >
                Intent (href)
              </button>
            </div>

            <strong>Method 2: Auto delayed 5s (window.location.replace)</strong>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() =>
                  setAutoTestConfig({ config: THEDACARE_CONFIG, type: "https" })
                }
                className="continue-button"
                style={{ flex: 1 }}
              >
                HTTPS (replace)
              </button>
              <button
                onClick={() =>
                  setAutoTestConfig({
                    config: THEDACARE_CONFIG,
                    type: "intent",
                  })
                }
                className="continue-button"
                style={{ flex: 1 }}
              >
                Intent (replace)
              </button>
            </div>
            {autoTestConfig?.config === THEDACARE_CONFIG && (
              <div style={{ color: "#d63384", fontWeight: "bold" }}>
                ⏳ Waiting 5s to trigger {autoTestConfig.type} replace...
              </div>
            )}
          </div>
        </div>

        {/* BWELL DEMO SECTION */}
        <div
          style={{
            margin: "20px 0",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>BWell Demo App</h3>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Domain: {BWELL_DEMO_CONFIG.domain}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleUsingHref(BWELL_DEMO_CONFIG, "https")}
                className="continue-button"
                style={{ flex: 1 }}
              >
                HTTPS (href)
              </button>
              <button
                onClick={() =>
                  setAutoTestConfig({
                    config: BWELL_DEMO_CONFIG,
                    type: "https",
                  })
                }
                className="continue-button"
                style={{ flex: 1 }}
              >
                HTTPS (replace)
              </button>
            </div>
            {autoTestConfig?.config === BWELL_DEMO_CONFIG && (
              <div style={{ color: "#d63384", fontWeight: "bold" }}>
                ⏳ Waiting 5s to trigger {autoTestConfig.type} replace...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
