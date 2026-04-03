import { useAuth } from "../context/AuthContext";

// Visual variants for global alert states.
const STYLES = {
  success: { bg: "rgba(75,223,176,0.1)", border: "rgba(75,223,176,0.3)", color: "#4bdfb0", icon: "✓" },
  error:   { bg: "rgba(224,92,92,0.1)",  border: "rgba(224,92,92,0.3)",  color: "#e05c5c", icon: "✕" },
  info:    { bg: "rgba(79,158,255,0.1)", border: "rgba(79,158,255,0.3)", color: "#4f9eff", icon: "ℹ" },
};

export default function AlertBanner() {
  const { alert } = useAuth();
  // Hide the banner when there is no active alert.
  if (!alert) return null;
  const s = STYLES[alert.type] || STYLES.info;
  return (
    <div style={{
      position: "fixed", top: "76px", left: "50%", transform: "translateX(-50%)",
      zIndex: 999, display: "flex", alignItems: "center", gap: "10px",
      padding: "12px 24px", borderRadius: "8px", minWidth: "320px",
      background: s.bg, border: `1px solid ${s.border}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      fontFamily: "'Epilogue', sans-serif", fontSize: "13px", color: s.color,
      animation: "slideDown 0.3s ease",
    }}>
      <span style={{ fontWeight: 800, fontSize: "15px" }}>{s.icon}</span>
      <span>{alert.msg}</span>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-10px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }`}</style>
    </div>
  );
}