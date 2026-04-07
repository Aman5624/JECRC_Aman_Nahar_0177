import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function TopBar() {
  const { user, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <header className="top-bar glass-card">
      <div>
        <p className="eyebrow">Welcome back</p>
        <h2>{user?.name}</h2>
        <p className="meta">{user?.role}</p>
      </div>

      <div className="top-bar-actions">
        <button type="button" className="ghost-btn" onClick={toggleTheme}>
          {isDarkTheme ? 'Switch to Light' : 'Switch to Dark'}
        </button>
        <button type="button" className="danger-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
