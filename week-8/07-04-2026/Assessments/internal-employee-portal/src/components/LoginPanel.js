import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const defaultCredentials = {
  name: '',
  role: '',
};

export default function LoginPanel() {
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasLoggedIn = login(credentials);

    if (!hasLoggedIn) {
      setError('Enter both name and role to continue.');
      return;
    }

    setError('');
    setCredentials(defaultCredentials);
  };

  return (
    <section className="login-panel">
      <div className="glass-card login-card">
        <h1>Internal Employee Portal</h1>
        <p>
          Secure access to employee management, analytics, and workspace
          settings.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Employee Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={credentials.name}
            onChange={handleChange}
            placeholder="e.g. Aman Nahar"
          />

          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            value={credentials.role}
            onChange={handleChange}
            placeholder="e.g. HR Manager"
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
