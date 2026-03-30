import React, { useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isDark ? "#121212" : "#f5f5f5",
    color: isDark ? "#ffffff" : "#000000",
    transition: "0.3s ease"
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: isDark ? "#ffffff" : "#333",
    color: isDark ? "#000" : "#fff"
  };

  return (
    <div style={containerStyle}>
      <h2>Mode: {isDark ? "Dark" : "Light"}</h2>

      <button style={buttonStyle} onClick={toggleTheme}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default ThemeToggle;