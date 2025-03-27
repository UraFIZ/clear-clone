// VerificationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './VerificationPage.css';

function VerificationPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle auto-test mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const autoTest = params.get('autoTest');
    
    if (autoTest === 'true') {
      console.log('Auto test mode detected');
      // Automatically fill in the code
      setCode('111111');
      
      // Submit after a short delay
      const timer = setTimeout(() => {
        navigate('/success');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '111111') {
      navigate('/success');
    }
  };

  return (
    <div className="verification-container">
      <Logo />
      <div className="verification-content">
        <h1>Enter your hot code</h1>
        <p>Please enter the one-time use code we sent to you at xxx-xxx-1111.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
          />
          
          <div className="resend-code">
            <button type="button" className="resend-button">Resend Code</button>
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={code.length === 0}
          >
            Continue
          </button>
        </form>
      </div>
      
      <div className="language-selector">
        <span>🌐 English (US) ▼</span>
      </div>
    </div>
  );
}

export default VerificationPage;