import { useAuth } from "../context/AuthContext";

// Consistent department colors reused in badges across pages.
const DEPT_COLORS = {
  Engineering: "#4f9eff",
  Design: "#b06aff",
  Marketing: "#ff8c4b",
  Finance: "#4bdfb0",
  "Human Resources": "#e8c97a",
};

export function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return (
    <span style={{
      padding: "2px 10px", borderRadius: "20px", fontSize: "10px",
      fontFamily: "'Epilogue', sans-serif", fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      background: isAdmin ? "rgba(232,201,122,0.15)" : "rgba(79,158,255,0.12)",
      color: isAdmin ? "#e8c97a" : "#4f9eff",
      border: `1px solid ${isAdmin ? "rgba(232,201,122,0.3)" : "rgba(79,158,255,0.25)"}`,
    }}>
      {role}
    </span>
  );
}

export function DeptBadge({ dept }) {
  const color = DEPT_COLORS[dept] || "#aaa";
  return (
    <span style={{
      padding: "2px 10px", borderRadius: "20px", fontSize: "11px",
      fontFamily: "'Epilogue', sans-serif", fontWeight: 600,
      background: `${color}18`, color, border: `1px solid ${color}33`,
    }}>
      {dept}
    </span>
  );
}

export default function Navbar({ page, setPage }) {
  const { currentUser, logout } = useAuth();
  if (!currentUser) return null;

  const isAdmin = currentUser.role === "admin";
  // Admin sees dashboard + employee pages; employee only sees profile.
  const navItems = isAdmin
    ? [{ key: "dashboard", label: "Dashboard" }, { key: "employees", label: "Employees" }, { key: "profile", label: "My Profile" }]
    : [{ key: "profile", label: "My Profile" }];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "64px", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 32px",
      background: "rgba(9,11,20,0.9)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "8px",
          background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
        }}>🏢</div>
        <span style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px", letterSpacing: "-0.01em" }}>
          Corp<span style={{ color: "#4f9eff" }}>Ex</span>
        </span>
      </div>

      {/* Nav Items */}
      <div style={{ display: "flex", gap: "4px" }}>
        {navItems.map(item => (
          <button key={item.key} onClick={() => setPage(item.key)} style={{
            padding: "7px 18px", borderRadius: "6px", border: "none",
            background: page === item.key ? "rgba(79,158,255,0.15)" : "transparent",
            color: page === item.key ? "#4f9eff" : "rgba(255,255,255,0.5)",
            fontFamily: "'Epilogue', sans-serif", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", transition: "all 0.2s",
            borderBottom: page === item.key ? "2px solid #4f9eff" : "2px solid transparent",
          }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700 }}>
            {currentUser.name}
          </div>
          <RoleBadge role={currentUser.role} />
        </div>
        <button onClick={logout} style={{
          padding: "7px 16px", borderRadius: "6px",
          border: "1px solid rgba(224,92,92,0.35)",
          background: "rgba(224,92,92,0.08)", color: "#e05c5c",
          fontFamily: "'Epilogue', sans-serif", fontSize: "12px", fontWeight: 600,
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(224,92,92,0.18)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(224,92,92,0.08)"}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}