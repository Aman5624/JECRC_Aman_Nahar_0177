import { createContext, useContext, useState } from "react";

// ─── Seed Users ───────────────────────────────────────────────────────────────
const SEED_USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin",  name: "Alexandra Reid",    dept: "Human Resources",  email: "admin@corpex.io",   phone: "+91-9800001111", joined: "2019-03-15", salary: "₹18,00,000" },
  { id: 2, username: "emp1",  password: "emp123",   role: "employee", name: "Rohan Mehta",      dept: "Engineering",      email: "rohan@corpex.io",   phone: "+91-9800002222", joined: "2021-06-01", salary: "₹9,00,000"  },
  { id: 3, username: "emp2",  password: "emp123",   role: "employee", name: "Priya Sharma",     dept: "Design",           email: "priya@corpex.io",   phone: "+91-9800003333", joined: "2022-01-10", salary: "₹8,50,000"  },
  { id: 4, username: "emp3",  password: "emp123",   role: "employee", name: "Karan Patel",      dept: "Marketing",        email: "karan@corpex.io",   phone: "+91-9800004444", joined: "2020-11-20", salary: "₹7,80,000"  },
  { id: 5, username: "emp4",  password: "emp123",   role: "employee", name: "Sneha Iyer",       dept: "Finance",          email: "sneha@corpex.io",   phone: "+91-9800005555", joined: "2023-02-28", salary: "₹8,20,000"  },
];

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Central state container for auth/session and employee CRUD actions.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees]     = useState(SEED_USERS);
  const [loading, setLoading]         = useState(false);
  const [alert, setAlert]             = useState(null); // { type: 'success'|'error'|'info', msg }

  // ── Alert helper ────────────────────────────────────────────────────────────
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  };

  // ── Auth ─────────────────────────────────────────────────────────────────────
  const login = (username, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      // Simulate network latency to mimic real authentication behavior.
      setTimeout(() => {
        const user = employees.find(u => u.username === username && u.password === password);
        setLoading(false);
        if (user) { setCurrentUser(user); resolve(user); }
        else reject(new Error("Invalid credentials"));
      }, 900);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    showAlert("info", "You have been logged out.");
  };

  // ── CRUD (Admin only – enforced at UI, but also guarded here) ─────────────
  const addEmployee = (data) => {
    if (currentUser?.role !== "admin") return;
    const newEmp = {
      ...data,
      id: Date.now(),
      role: "employee",
      password: "emp123",
      username: data.email.split("@")[0],
    };
    setEmployees(prev => [...prev, newEmp]);
    showAlert("success", `Employee "${data.name}" added successfully.`);
  };

  const updateEmployee = (id, data) => {
    if (currentUser?.role !== "admin") return;
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
    showAlert("success", "Employee record updated.");
  };

  const deleteEmployee = (id) => {
    if (currentUser?.role !== "admin") return;
    const emp = employees.find(e => e.id === id);
    setEmployees(prev => prev.filter(e => e.id !== id));
    showAlert("success", `Employee "${emp?.name}" removed.`);
  };

  return (
    <AuthContext.Provider value={{
      currentUser, loading, alert, showAlert,
      login, logout,
      employees,
      addEmployee, updateEmployee, deleteEmployee,
    }}>
      {children}
    </AuthContext.Provider>
  );
}