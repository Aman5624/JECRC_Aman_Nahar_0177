import { useAuth } from '../context/AuthContext';

function Settings() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Settings</h1>
      <div style={styles.row}>
        <span style={styles.label}>Username</span>
        <span>{user?.username}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Role</span>
        <span>Admin</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Theme</span>
        <span>Light</span>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    gap: '20px',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
    maxWidth: '400px',
  },
  label: { fontWeight: 'bold', width: '120px', color: '#64748b' },
};

export default Settings;
