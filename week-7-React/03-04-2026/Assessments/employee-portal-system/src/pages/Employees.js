import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DeptBadge, RoleBadge } from "../components/Navbar";

const DEPTS = ["Engineering", "Design", "Marketing", "Finance", "Human Resources"];

const EMPTY_FORM = { name: "", email: "", phone: "", dept: "Engineering", salary: "", joined: "" };

const inputStyle = (err) => ({
  width: "100%", padding: "9px 12px", borderRadius: "6px",
  border: `1px solid ${err ? "rgba(224,92,92,0.5)" : "rgba(255,255,255,0.1)"}`,
  background: "rgba(255,255,255,0.04)", color: "#fff",
  fontFamily: "'Epilogue', sans-serif", fontSize: "13px",
  outline: "none", boxSizing: "border-box",
});

function EmployeeModal({ emp, onClose, onSave }) {
  const isEdit = !!emp?.id;
  const [form, setForm]     = useState(isEdit ? { name: emp.name, email: emp.email, phone: emp.phone, dept: emp.dept, salary: emp.salary, joined: emp.joined } : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Validate required fields before allowing add/edit save.
  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required.";
    if (!form.phone.trim())  e.phone  = "Phone is required.";
    if (!form.salary.trim()) e.salary = "Salary is required.";
    if (!form.joined)        e.joined = "Join date is required.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#0f1221", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px", padding: "36px", width: "500px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
      }} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", margin: "0 0 28px" }}>
          {isEdit ? "✏️ Edit Employee" : "➕ Add Employee"}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { key: "name",   label: "Full Name",   placeholder: "John Doe",           type: "text" },
            { key: "email",  label: "Email",        placeholder: "john@corpex.io",     type: "email" },
            { key: "phone",  label: "Phone",        placeholder: "+91-9XXXXXXXXX",     type: "text" },
            { key: "salary", label: "Salary (CTC)", placeholder: "₹8,00,000",          type: "text" },
            { key: "joined", label: "Joining Date", placeholder: "",                    type: "date" },
          ].map(f => (
            <div key={f.key} style={f.key === "name" || f.key === "email" ? { gridColumn: "span 2" } : {}}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'Epilogue', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>
                {f.label}
              </label>
              <input
                type={f.type} placeholder={f.placeholder} value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={inputStyle(errors[f.key])}
              />
              {errors[f.key] && <p style={{ color: "#e05c5c", fontSize: "11px", margin: "4px 0 0", fontFamily: "'Epilogue', sans-serif" }}>{errors[f.key]}</p>}
            </div>
          ))}

          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'Epilogue', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>
              Department
            </label>
            <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}
              style={{ ...inputStyle(false), appearance: "none" }}>
              {DEPTS.map(d => <option key={d} value={d} style={{ background: "#0f1221" }}>{d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "28px" }}>
          <button onClick={onClose} style={{
            padding: "10px 22px", borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.12)", background: "transparent",
            color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSubmit} style={{
            padding: "10px 24px", borderRadius: "6px", border: "none",
            background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
            color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(79,158,255,0.3)",
          }}>
            {isEdit ? "Save Changes" : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ name, onConfirm, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#0f1221", border: "1px solid rgba(224,92,92,0.3)",
        borderRadius: "12px", padding: "36px", width: "380px", textAlign: "center",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🗑️</div>
        <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "18px", margin: "0 0 10px" }}>Delete Employee?</h3>
        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", margin: "0 0 28px" }}>
          This will permanently remove <strong style={{ color: "#fff" }}>{name}</strong> from the system.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={onClose} style={{
            padding: "10px 22px", borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.12)", background: "transparent",
            color: "rgba(255,255,255,0.6)", fontFamily: "'Epilogue', sans-serif", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "10px 22px", borderRadius: "6px", border: "none",
            background: "#e05c5c", color: "#fff",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useAuth();
  const [modal,   setModal]   = useState(null); // null | 'add' | emp object
  const [confirm, setConfirm] = useState(null); // emp to delete
  const [search,  setSearch]  = useState("");

  // Client-side search by multiple fields for quick filtering.
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  // Save action switches between create and update based on modal mode.
  const handleSave = (data) => {
    if (modal === "add") addEmployee(data);
    else updateEmployee(modal.id, data);
    setModal(null);
  };

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "26px", margin: "0 0 4px" }}>
            Employee Records
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", margin: 0 }}>
            {employees.length} total employees
          </p>
        </div>
        <button onClick={() => setModal("add")} style={{
          padding: "11px 22px", borderRadius: "6px", border: "none",
          background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
          color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: "13px", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(79,158,255,0.3)",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          ＋ Add Employee
        </button>
      </div>

      {/* Search */}
      <input
        type="text" placeholder="🔍  Search by name, email or department…"
        value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "11px 16px", marginBottom: "20px",
          borderRadius: "8px", border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.03)", color: "#fff",
          fontFamily: "'Epilogue', sans-serif", fontSize: "13px",
          outline: "none", boxSizing: "border-box",
        }}
      />

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
        {/* Table Head */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.2fr 1fr 1fr",
          padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
        }}>
          {["Employee", "Email", "Department", "Salary", "Role", "Actions"].map(h => (
            <span key={h} style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Epilogue', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontFamily: "'Epilogue', sans-serif" }}>
            No employees found.
          </div>
        )}

        {filtered.map((emp, i) => (
          <div key={emp.id} style={{
            display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.2fr 1fr 1fr",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            transition: "background 0.15s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
            onMouseOut={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg,#4f9eff,#7b5fe8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "13px", flexShrink: 0,
              }}>{emp.name.charAt(0)}</div>
              <div>
                <div style={{ color: "#fff", fontFamily: "'Epilogue', sans-serif", fontSize: "13px", fontWeight: 600 }}>{emp.name}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{emp.phone}</div>
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Epilogue', sans-serif", fontSize: "12px" }}>{emp.email}</span>
            <DeptBadge dept={emp.dept} />
            <span style={{ color: "#4bdfb0", fontFamily: "'Epilogue', sans-serif", fontSize: "12px", fontWeight: 600 }}>{emp.salary}</span>
            <RoleBadge role={emp.role} />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setModal(emp)} style={{
                padding: "5px 12px", borderRadius: "5px", border: "1px solid rgba(79,158,255,0.3)",
                background: "rgba(79,158,255,0.08)", color: "#4f9eff",
                fontFamily: "'Epilogue', sans-serif", fontSize: "11px", fontWeight: 600, cursor: "pointer",
              }}>Edit</button>
              <button onClick={() => setConfirm(emp)} style={{
                padding: "5px 12px", borderRadius: "5px", border: "1px solid rgba(224,92,92,0.3)",
                background: "rgba(224,92,92,0.08)", color: "#e05c5c",
                fontFamily: "'Epilogue', sans-serif", fontSize: "11px", fontWeight: 600, cursor: "pointer",
              }}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {modal && (
        <EmployeeModal
          emp={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {confirm && (
        <ConfirmModal
          name={confirm.name}
          onConfirm={() => { deleteEmployee(confirm.id); setConfirm(null); }}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}