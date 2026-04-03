import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AlertBanner from "./components/AlertBanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";

// Main authenticated shell: decides which page to render after login.
function Portal() {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(currentUser?.role === "admin" ? "dashboard" : "profile");

  // Reset to correct default when user changes
  const handleSetPage = (p) => setPage(p);

  if (!currentUser) return <Login />;

  const renderPage = () => {
    if (page === "dashboard") return (
      <ProtectedRoute adminOnly>
        <Dashboard setPage={handleSetPage} />
      </ProtectedRoute>
    );
    if (page === "employees") return (
      <ProtectedRoute adminOnly>
        <Employees />
      </ProtectedRoute>
    );
    return <Profile />;
  };

  return (
    <>
      <Navbar page={page} setPage={handleSetPage} />
      <AlertBanner />
      <main style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "88px 32px 48px",
        minHeight: "100vh",
      }}>
        {renderPage()}
      </main>
    </>
  );
}

export default function App() {
  return (
    // AuthProvider exposes login/session/employee state to the whole app.
    <AuthProvider>
      <div style={{ background: "#090b14", minHeight: "100vh" }}>
        {/* Global style overrides used by inline-styled components. */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Epilogue:wght@400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #090b14; }
          input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
          select option { background: #0f1221; color: #fff; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #090b14; }
          ::-webkit-scrollbar-thumb { background: rgba(79,158,255,0.25); border-radius: 3px; }
        `}</style>
        <Portal />
      </div>
    </AuthProvider>
  );
}