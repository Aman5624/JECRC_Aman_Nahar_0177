import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, logoutUser } from './features/auth/authSlice';
import {
  clearEmployeeError,
  deleteEmployeeAsync,
  saveEmployeeAsync,
} from './features/employees/employeesSlice';
import { toggleTheme } from './features/ui/uiSlice';
import './App.css';

const emptyEmployee = {
  id: '',
  name: '',
  department: '',
  role: '',
  email: '',
};

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const employees = useSelector((state) => state.employees.list);
  const employeeError = useSelector((state) => state.employees.error);
  const theme = useSelector((state) => state.ui.theme);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);

  const themeClass = theme === 'dark' ? 'theme-dark' : 'theme-light';
  const isEditing = Boolean(employeeForm.id);

  const sortedEmployees = useMemo(
    () => [...employees].sort((a, b) => a.name.localeCompare(b.name)),
    [employees]
  );

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUserAsync(loginForm));
  };

  const handleEmployeeSubmit = async (event) => {
    event.preventDefault();
    await dispatch(saveEmployeeAsync(employeeForm));
    setEmployeeForm(emptyEmployee);
  };

  const handleEmployeeEdit = (employee) => {
    dispatch(clearEmployeeError());
    setEmployeeForm(employee);
  };

  const handleEmployeeDelete = async (id) => {
    await dispatch(deleteEmployeeAsync(id));
  };

  const resetEmployeeForm = () => {
    dispatch(clearEmployeeError());
    setEmployeeForm(emptyEmployee);
  };

  return (
    <div className={`app-shell ${themeClass}`}>
      <div className="background-blur" />
      <main className="app-container">
        <header className="app-header">
          <div>
            <h1>Employee Management Dashboard</h1>
            <p>Redux Toolkit + React-Redux enterprise state architecture</p>
          </div>
          <button
            type="button"
            className="btn ghost"
            onClick={() => dispatch(toggleTheme())}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </header>

        {isLoading && (
          <div className="loading-strip" role="status">
            <span className="spinner" /> Processing request...
          </div>
        )}

        {!auth.isAuthenticated ? (
          <section className="panel auth-panel">
            <h2>Login</h2>
            <p>Use any username and password to sign in.</p>
            <form onSubmit={handleLoginSubmit} className="form-grid">
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
              <button type="submit" className="btn primary">
                Login
              </button>
            </form>
            {auth.error && <p className="error-text">{auth.error}</p>}
          </section>
        ) : (
          <>
            <section className="panel welcome-panel">
              <div>
                <h2>Welcome, {auth.currentUser.username}</h2>
                <p>
                  Role: <strong>{auth.currentUser.role}</strong>
                </p>
              </div>
              <button
                type="button"
                className="btn danger"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </section>

            <section className="panel">
              <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
              <form className="form-grid employee-form" onSubmit={handleEmployeeSubmit}>
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={employeeForm.name}
                  onChange={(event) =>
                    setEmployeeForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={employeeForm.department}
                  onChange={(event) =>
                    setEmployeeForm((prev) => ({
                      ...prev,
                      department: event.target.value,
                    }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={employeeForm.role}
                  onChange={(event) =>
                    setEmployeeForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={employeeForm.email}
                  onChange={(event) =>
                    setEmployeeForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="btn primary">
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                  </button>
                  {isEditing && (
                    <button type="button" className="btn ghost" onClick={resetEmployeeForm}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
              {employeeError && <p className="error-text">{employeeError}</p>}
            </section>

            <section className="panel">
              <h2>Employees ({sortedEmployees.length})</h2>
              {sortedEmployees.length === 0 ? (
                <p className="empty-text">No employees found.</p>
              ) : (
                <div className="employee-list">
                  {sortedEmployees.map((employee) => (
                    <article className="employee-card" key={employee.id}>
                      <h3>{employee.name}</h3>
                      <p>{employee.department}</p>
                      <p>{employee.role}</p>
                      <p>{employee.email}</p>
                      <div className="card-actions">
                        <button
                          type="button"
                          className="btn ghost"
                          onClick={() => handleEmployeeEdit(employee)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn danger"
                          onClick={() => handleEmployeeDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
