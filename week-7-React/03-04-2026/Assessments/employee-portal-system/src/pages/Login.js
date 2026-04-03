import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const inputStyle = (err) => ({
  width: "100%", padding: "11px 14px", borderRadius: "6px",
  border: `1px solid ${err ? "rgba(224,92,92,0.6)" : "rgba(255,255,255,0.1)"}`,
  background: "rgba(255,255,255,0.04)", color: "#fff",
  fontFamily: "'Epilogue', sans-serif", fontSize: "14px", outline: "none",
  transition: "border 0.2s", boxSizing: "border-box",
});

export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm]     = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState("");

  // Basic client-side validation to avoid submitting empty fields.
  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required.";
    if (!form.password.trim()) e.password = "Password is required.";
    else if (form.password.length < 4) e.password = "Min 4 characters.";
    return e;
  };

  // Handles submit -> validate -> authenticate -> show server error if failed.
  const handle = async (ev) => {
    ev.preventDefault();
    setServerErr("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    try {
      await login(form.username, form.password);
    } catch {
      setServerErr("Invalid username or password. Please try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#090b14", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,158,255,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,95,232,0.12), transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: "400px", padding: "44px 40px",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px", backdropFilter: "blur(20px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "12px",
            background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", margin: "0 auto 14px",
          }}>🏢</div>
          <h1 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", margin: 0 }}>
            Corp<span style={{ color: "#4f9eff" }}>Ex</span> Portal
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", margin: "6px 0 0" }}>
            Internal Employee Management System
          </p>
        </div>

        {serverErr && (
          <div style={{
            padding: "10px 14px", borderRadius: "6px", marginBottom: "20px",
            background: "rgba(224,92,92,0.1)", border: "1px solid rgba(224,92,92,0.3)",
            color: "#e05c5c", fontFamily: "'Epilogue', sans-serif", fontSize: "13px",
          }}>{serverErr}</div>
        )}

        <form onSubmit={handle} noValidate>
          {/* Username */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "7px" }}>
              Username
            </label>
            <input
              type="text" placeholder="e.g. admin"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              style={inputStyle(errors.username)}
              onFocus={e => e.target.style.borderColor = "#4f9eff"}
              onBlur={e => e.target.style.borderColor = errors.username ? "rgba(224,92,92,0.6)" : "rgba(255,255,255,0.1)"}
            />
            {errors.username && <p style={{ color: "#e05c5c", fontSize: "11px", marginTop: "5px", fontFamily: "'Epilogue', sans-serif" }}>{errors.username}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "7px" }}>
              Password
            </label>
            <input
              type="password" placeholder="Enter password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={inputStyle(errors.password)}
              onFocus={e => e.target.style.borderColor = "#4f9eff"}
              onBlur={e => e.target.style.borderColor = errors.password ? "rgba(224,92,92,0.6)" : "rgba(255,255,255,0.1)"}
            />
            {errors.password && <p style={{ color: "#e05c5c", fontSize: "11px", marginTop: "5px", fontFamily: "'Epilogue', sans-serif" }}>{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "13px",
            background: loading ? "rgba(79,158,255,0.4)" : "linear-gradient(135deg,#4f9eff,#7b5fe8)",
            border: "none", borderRadius: "6px", color: "#fff",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 6px 24px rgba(79,158,255,0.35)",
            transition: "all 0.2s",
          }}>
            {loading ? "Authenticating…" : "Sign In"}
          </button>
        </form>

        {/* Hint */}
        <div style={{
          marginTop: "28px", padding: "14px", borderRadius: "8px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "11px", margin: "0 0 8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Demo Credentials
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", margin: "0 0 4px" }}>
            <span style={{ color: "#e8c97a" }}>Admin:</span> admin / admin123
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", margin: 0 }}>
            <span style={{ color: "#4f9eff" }}>Employee:</span> emp1 / emp123
          </p>
        </div>
      </div>
    </div>
  );
}