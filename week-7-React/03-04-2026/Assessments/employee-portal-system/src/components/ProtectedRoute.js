import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser } = useAuth();

  // Redirect unauthenticated users to the login screen.
  if (!currentUser) return <Login />;

  // Guard admin-only screens from employee users.
  if (adminOnly && currentUser.role !== "admin") {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "60vh", gap: "16px",
      }}>
        <div style={{ fontSize: "48px" }}>🚫</div>
        <h2 style={{ color: "#e05c5c", fontFamily: "'Syne', sans-serif", fontSize: "24px" }}>
          Access Restricted
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Epilogue', sans-serif" }}>
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
}