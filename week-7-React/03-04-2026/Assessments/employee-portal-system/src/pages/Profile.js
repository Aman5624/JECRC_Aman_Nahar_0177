import { useAuth } from "../context/AuthContext";
import { DeptBadge, RoleBadge } from "../components/Navbar";

// Reusable key-value row for profile details.
function InfoRow({ label, value, accent }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ color: accent || "#fff", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

export default function Profile() {
  const { currentUser } = useAuth();
  // Local alias to keep JSX concise.
  const u = currentUser;

  return (
    <div style={{ padding: "32px 0", maxWidth: "700px", margin: "0 auto" }}>
      {/* Avatar Card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(79,158,255,0.08), rgba(123,95,232,0.08))",
        border: "1px solid rgba(79,158,255,0.15)",
        borderRadius: "12px", padding: "36px", marginBottom: "24px",
        display: "flex", alignItems: "center", gap: "28px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,158,255,0.1), transparent 70%)",
        }} />
        <div style={{
          width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "30px",
          boxShadow: "0 8px 24px rgba(79,158,255,0.4)",
        }}>
          {u.name.charAt(0)}
        </div>
        <div>
          <h2 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", margin: "0 0 8px" }}>
            {u.name}
          </h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <RoleBadge role={u.role} />
            <DeptBadge dept={u.dept} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", margin: "10px 0 0" }}>
            @{u.username} · Joined {u.joined}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px", padding: "24px 28px",
      }}>
        <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, margin: "0 0 4px" }}>
          Personal Information
        </h3>
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", margin: "0 0 20px" }}>
          Your profile data as stored in the system.
        </p>
        <InfoRow label="Full Name"       value={u.name} />
        <InfoRow label="Email Address"   value={u.email} accent="#4f9eff" />
        <InfoRow label="Phone"           value={u.phone} />
        <InfoRow label="Department"      value={u.dept} accent="#b06aff" />
        <InfoRow label="Annual CTC"      value={u.salary} accent="#4bdfb0" />
        <InfoRow label="Date of Joining" value={u.joined} />
        <InfoRow label="Employee ID"     value={`EMP-${String(u.id).padStart(4, "0")}`} accent="#e8c97a" />
      </div>

      {/* Note for employee */}
      {currentUser.role === "employee" && (
        <div style={{
          marginTop: "16px", padding: "14px 18px", borderRadius: "8px",
          background: "rgba(79,158,255,0.06)", border: "1px solid rgba(79,158,255,0.15)",
          color: "rgba(255,255,255,0.45)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px",
        }}>
          ℹ️ &nbsp;To update your information, please contact your HR administrator.
        </div>
      )}
    </div>
  );
}