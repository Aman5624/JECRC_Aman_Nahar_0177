import { useAuth } from "../context/AuthContext";
import { DeptBadge } from "../components/Navbar";

export default function Dashboard({ setPage }) {
  const { employees, currentUser } = useAuth();

  // Aggregate counts used in the summary cards.
  const total   = employees.length;
  const admins  = employees.filter(e => e.role === "admin").length;
  const emps    = employees.filter(e => e.role === "employee").length;
  const depts   = [...new Set(employees.map(e => e.dept))].length;

  const stats = [
    { label: "Total Employees", value: total,  icon: "👥", color: "#4f9eff" },
    { label: "Departments",     value: depts,  icon: "🏬", color: "#b06aff" },
    { label: "Admins",          value: admins, icon: "🛡️", color: "#e8c97a" },
    { label: "Staff",           value: emps,   icon: "💼", color: "#4bdfb0" },
  ];

  // Show the most recently added users first.
  const recentEmps = [...employees].slice(-4).reverse();

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Welcome */}
      <div style={{ marginBottom: "36px" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", margin: "0 0 6px" }}>
          Welcome back,
        </p>
        <h1 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, margin: 0 }}>
          {currentUser.name} <span style={{ fontSize: "22px" }}>👋</span>
        </h1>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "24px", borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${s.color}22`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -10, right: -10,
              fontSize: "52px", opacity: 0.07,
            }}>{s.icon}</div>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
            <div style={{ color: s.color, fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", marginTop: "6px", letterSpacing: "0.05em" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Employees */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, margin: 0 }}>Recent Employees</h3>
            <button onClick={() => setPage("employees")} style={{
              color: "#4f9eff", background: "none", border: "none",
              fontFamily: "'Epilogue', sans-serif", fontSize: "12px", cursor: "pointer", fontWeight: 600,
            }}>View all →</button>
          </div>
          {recentEmps.map(emp => (
            <div key={emp.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "13px",
                }}>{emp.name.charAt(0)}</div>
                <div>
                  <div style={{ color: "#fff", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", fontWeight: 600 }}>{emp.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Epilogue', sans-serif", fontSize: "11px" }}>{emp.email}</div>
                </div>
              </div>
              <DeptBadge dept={emp.dept} />
            </div>
          ))}
        </div>

        {/* Dept Breakdown */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, margin: "0 0 20px" }}>
            Department Breakdown
          </h3>
          {[...new Set(employees.map(e => e.dept))].map(dept => {
            const count = employees.filter(e => e.dept === dept).length;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={dept} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px" }}>{dept}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px" }}>{count} ({pct}%)</span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "4px" }}>
                  <div style={{ height: "100%", width: `${pct}%`, borderRadius: "4px", background: "linear-gradient(90deg,#4f9eff,#7b5fe8)", transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}