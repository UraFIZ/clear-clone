import Logo from "./Logo";
import "./ProdDeepLinkPage.css";
import { useEffect, useState } from "react";

function ProdDeepLinkPage() {
  // Detect if user is on an Android browser environment
  // const isAndroidBrowser = () => {
  //   return /Android/i.test(navigator.userAgent);
  // };

  // Generate appropriate deep link based on browser
  const generateDeepLink = () => {
    // const httpsUrl =
    //   "https://ripple.staging.icanbwell.com/#/register-ial2-callback/?status=success";
    const packageName = "com.thedacare.v2.staging"; // Replace with your actual package name
    const browserFallbackUrl =
      "https://ripple.staging.icanbwell.com/#/register-ial2-callback/?status=success";

    // if (isAndroidBrowser()) {
    //   alert("Android browser detected, using intent URL");
    //   // Use intent:// URL for Android browsers to maximize deep-link compatibility
    //   const intentPath =
    //     "ripple.staging.icanbwell.com/#/register-ial2-callback/?status=success";
    //   return `intent://${intentPath}#Intent;scheme=https;package=${packageName};S.browser_fallback_url=${encodeURIComponent(
    //     browserFallbackUrl
    //   )};end`;
    // }
    const intentPath =
      "ripple.staging.icanbwell.com/#/register-ial2-callback/?status=success";
    // Standard HTTPS URL for other browsers (App Links)
    return `intent://${intentPath}#Intent;scheme=https;package=${packageName};S.browser_fallback_url=${encodeURIComponent(
      browserFallbackUrl
    )};end`;
  };

  const handleContinueClick = () => {
    const deepLink = generateDeepLink();
    window.location.href = deepLink;
  };
  const handleContinueClickOld = () => {
    window.location.href = "https://ripple.staging.icanbwell.com/";
  };
  const handleContinueClickDemo = () => {
    window.location.href =
      "intent://app.staging.icanbwell.com/bwell_demo/#/create-account/ial2-callback#Intent;scheme=https;package=com.icanbwell.bwelldemo.staging;S.browser_fallback_url=https%3A%2F%2Fapp.staging.icanbwell.com%2Fbwell_demo;end?status=success";
  };

  // State to trigger verification intent flow
  const [startIntentVerification, setStartIntentVerification] = useState(false);
  // State to trigger verification https flow
  const [startHttpsVerification, setStartHttpsVerification] = useState(false);

  // When startIntentVerification becomes true, wait 5s then replace the URL
  useEffect(() => {
    if (!startIntentVerification) return;

    const intentUrl =
      "intent://app.staging.icanbwell.com/bwell_demo/#/create-account/ial2-callback#Intent;scheme=https;package=com.icanbwell.bwelldemo.staging;S.browser_fallback_url=https%3A%2F%2Fapp.staging.icanbwell.com%2Fbwell_demo;end?status=success";

    const timer = setTimeout(() => {
      // Use replace so history isn't polluted
      window.location.replace(intentUrl);
    }, 5000);

    return () => clearTimeout(timer);
  }, [startIntentVerification]);

  // When startHttpsVerification becomes true, wait 5s then replace the URL with https
  useEffect(() => {
    if (!startHttpsVerification) return;

    const httpsUrl =
      "https://app.staging.icanbwell.com/bwell_demo/#/create-account/ial2-callback?status=success";

    const timer = setTimeout(() => {
      window.location.replace(httpsUrl);
    }, 5000);

    return () => clearTimeout(timer);
  }, [startHttpsVerification]);
  const handleContinueClickDemoOld = () => {
    window.location.href = "https://app.staging.icanbwell.com/bwell_demo/";
  };
  const stagingRippleClick = () => {
    window.location.href =
      "intent://ripple.staging.icanbwell.com/#/register-ial2-callback?status=success#Intent;scheme=https;package=com.thedacare.v2.staging;S.browser_fallback_url=https%3A%2F%2Fripple.staging.icanbwell.com;end";
  };

  return (
    <div className="prod-deeplink-container">
      <Logo />
      <div className="prod-deeplink-content">
        <h1>Verification successful</h1>
        <p className="success-message">
          We've successfully verified your identity.
        </p>
        <button onClick={handleContinueClickDemo} className="continue-button">
          Continue to the demo staging app
        </button>
        <button
          onClick={() => setStartIntentVerification(true)}
          className="continue-button"
        >
          Verification with intent
        </button>
        <button
          onClick={() => setStartHttpsVerification(true)}
          className="continue-button"
        >
          Verification with https
        </button>
        <button
          onClick={handleContinueClickDemoOld}
          className="continue-button"
        >
          Continue to the demo staging app old approach
        </button>
        <button onClick={handleContinueClick} className="continue-button">
          Continue to the app
        </button>
        <button onClick={handleContinueClickOld} className="continue-button">
          Continue with old approach
        </button>
        <button onClick={stagingRippleClick} className="continue-button">
          Continue with staging ripple
        </button>
      </div>

      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default ProdDeepLinkPage;
