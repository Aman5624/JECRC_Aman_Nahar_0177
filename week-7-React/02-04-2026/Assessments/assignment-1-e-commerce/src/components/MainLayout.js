import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div>
      <header style={styles.header}>
        <h2 style={styles.logo}>ShopCo</h2>
        <nav style={styles.nav}>
          <NavLink to="/" end style={navStyle}>Home</NavLink>
          <NavLink to="/about" style={navStyle}>About</NavLink>
          <NavLink to="/contact" style={navStyle}>Contact</NavLink>
          <NavLink to="/products" style={navStyle}>Products</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" style={navStyle}>Dashboard</NavLink>
              <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" style={navStyle}>Login</NavLink>
          )}
        </nav>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          <h4 style={{ margin: '0 0 12px' }}>Quick Links</h4>
          <NavLink to="/" end style={sideStyle}>Home</NavLink>
          <NavLink to="/about" style={sideStyle}>About</NavLink>
          <NavLink to="/contact" style={sideStyle}>Contact</NavLink>
          <NavLink to="/products" style={sideStyle}>Products</NavLink>
        </aside>
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2026 ShopCo. All rights reserved.</p>
      </footer>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  margin: '0 10px',
  textDecoration: 'none',
  color: isActive ? '#38bdf8' : 'white',
  fontWeight: 'bold',
});

const sideStyle = ({ isActive }) => ({
  display: 'block',
  padding: '6px 0',
  textDecoration: 'none',
  color: isActive ? '#38bdf8' : '#1e293b',
  fontWeight: isActive ? 'bold' : 'normal',
});

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    backgroundColor: '#1e293b',
    color: 'white',
  },
  logo: { margin: 0, color: 'white' },
  nav: { display: 'flex', alignItems: 'center' },
  body: { display: 'flex', minHeight: 'calc(100vh - 110px)' },
  sidebar: {
    width: '180px',
    padding: '20px',
    backgroundColor: '#f1f5f9',
    borderRight: '1px solid #e2e8f0',
  },
  main: { flex: 1, padding: '30px' },
  footer: {
    textAlign: 'center',
    padding: '14px',
    backgroundColor: '#1e293b',
    color: '#94a3b8',
  },
  btn: {
    marginLeft: '10px',
    padding: '4px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default MainLayout;
