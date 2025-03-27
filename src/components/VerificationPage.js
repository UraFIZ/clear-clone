// VerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './VerificationPage.css';

function VerificationPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();


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