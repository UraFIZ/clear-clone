import './Logo.css';

function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" width="48" height="48">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#102a63" strokeWidth="2" />
          <circle cx="50" cy="25" r="4" fill="#102a63" />
          <circle cx="65" cy="28" r="4" fill="#102a63" />
          <circle cx="77" cy="38" r="4" fill="#102a63" />
          <circle cx="82" cy="50" r="4" fill="#102a63" />
          <circle cx="77" cy="62" r="4" fill="#102a63" />
          <circle cx="65" cy="72" r="4" fill="#102a63" />
          <circle cx="50" cy="75" r="4" fill="#102a63" />
          <circle cx="35" cy="72" r="4" fill="#102a63" />
          <circle cx="23" cy="62" r="4" fill="#102a63" />
          <circle cx="18" cy="50" r="4" fill="#102a63" />
          <circle cx="23" cy="38" r="4" fill="#102a63" />
          <circle cx="35" cy="28" r="4" fill="#102a63" />
        </svg>
      </div>
      <div className="logo-text">CLEAR</div>
    </div>
  );
}

export default Logo;
