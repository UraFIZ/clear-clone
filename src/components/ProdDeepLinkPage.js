import Logo from "./Logo";
import "./ProdDeepLinkPage.css";
import { useEffect, useState } from "react";

function ProdDeepLinkPage() {
  // ---------------------------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------------------------

  // 1. SCENARIO: BWell Demo App
  const BWELL_DEMO_CONFIG = {
    name: "BWell Demo App",
    pkg: "com.icanbwell.bwelldemo.staging",
    domain: "app.staging.icanbwell.com",
    path: "bwell_demo/#/create-account/ial2-callback",
    fallbackPath: "bwell_demo",
  };

  // 2. SCENARIO: ThedaCare App
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

  const generateIntentUrl = (config) => {
    // WINNING LOGIC:
    // 1. Use intent:// scheme
    // 2. Encode the "#" in the path to "%23" to prevent Chrome parsing errors
    // 3. Place ?status=success BEFORE the #Intent fragment
    
    const host = config.domain;
    let path = config.path; 

    // Encode "#" to safely pass it inside the intent path
    if (path.includes("#")) {
        path = path.replace("#", "%23");
    }

    const intentPath = `${host}/${path}`;
    const fallbackUrl = `https://${config.domain}/${config.fallbackPath}`;
    
    return `intent://${intentPath}?status=success#Intent;scheme=https;package=${config.pkg};S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  };

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  const handleContinueClick = (config) => {
    const url = generateIntentUrl(config);
    console.log(`Redirecting to: ${url}`);
    window.location.href = url;
  };

  const [autoRedirectConfig, setAutoRedirectConfig] = useState(null);

  useEffect(() => {
    if (!autoRedirectConfig) return;
    
    // Generate the URL
    const url = generateIntentUrl(autoRedirectConfig);
    console.log(`[AUTO] Scheduled redirect for ${autoRedirectConfig.name}`);

    // Wait 5s then redirect
    const timer = setTimeout(() => {
       console.log(`[EXECUTE] Replacing location with: ${url}`);
       try {
         window.location.replace(url);
       } catch (e) {
         window.location.href = url;
       }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoRedirectConfig]);


  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verification successful</h1>
        <p className="success-message">
          We successfully verified your identity.
        </p>

        {/* THEDACARE SECTION */}
        <div className="config-box" style={{marginBottom: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px"}}>
            <h3>ThedaCare (Ripple)</h3>
            <button onClick={() => handleContinueClick(THEDACARE_CONFIG)} className="continue-button">
            Continue to App (Manual)
            </button>
            <button onClick={() => setAutoRedirectConfig(THEDACARE_CONFIG)} className="continue-button" style={{background: "#666"}}>
            Simulate Auto-Redirect (5s)
            </button>
        </div>

        {/* BWELL DEMO SECTION */}
        <div className="config-box" style={{marginBottom: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px"}}>
            <h3>BWell Demo App</h3>
            <button onClick={() => handleContinueClick(BWELL_DEMO_CONFIG)} className="continue-button">
            Continue to App (Manual)
            </button>
             <button onClick={() => setAutoRedirectConfig(BWELL_DEMO_CONFIG)} className="continue-button" style={{background: "#666"}}>
            Simulate Auto-Redirect (5s)
            </button>
        </div>

        {autoRedirectConfig && (
            <div style={{color: "green", fontWeight: "bold"}}>
                🔄 Auto-redirecting to {autoRedirectConfig.name} in 5 seconds...
            </div>
        )}

      </div>
       <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
