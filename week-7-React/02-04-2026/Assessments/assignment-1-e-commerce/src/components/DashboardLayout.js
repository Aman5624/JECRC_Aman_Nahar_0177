import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div>
      <header style={styles.header}>
        <h2 style={styles.logo}>ShopCo Dashboard</h2>
        <div style={styles.headerRight}>
          <span style={{ color: '#94a3b8', marginRight: '16px' }}>
            Welcome, {user?.username}
          </span>
          <button onClick={handleLogout} style={styles.btn}>Logout</button>
        </div>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          <NavLink to="/dashboard" end style={sideStyle}>Home</NavLink>
          <NavLink to="/dashboard/analytics" style={sideStyle}>Analytics</NavLink>
          <NavLink to="/dashboard/settings" style={sideStyle}>Settings</NavLink>
          <hr style={{ margin: '16px 0' }} />
          <NavLink to="/" style={sideStyle}>Back to Site</NavLink>
        </aside>
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const sideStyle = ({ isActive }) => ({
  display: 'block',
  padding: '10px 16px',
  marginBottom: '4px',
  textDecoration: 'none',
  borderRadius: '4px',
  color: isActive ? 'white' : '#1e293b',
  backgroundColor: isActive ? '#1e293b' : 'transparent',
  fontWeight: 'bold',
});

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    backgroundColor: '#0f172a',
    color: 'white',
  },
  logo: { margin: 0, color: 'white' },
  headerRight: { display: 'flex', alignItems: 'center' },
  body: { display: 'flex', minHeight: 'calc(100vh - 58px)' },
  sidebar: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
  },
  main: { flex: 1, padding: '30px', backgroundColor: '#ffffff' },
  btn: {
    padding: '6px 14px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default DashboardLayout;
