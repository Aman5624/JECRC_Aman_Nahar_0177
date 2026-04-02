import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.brand}>ShopCo</h2>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '360px',
  },
  brand: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#1e293b',
  },
};

export default AuthLayout;
