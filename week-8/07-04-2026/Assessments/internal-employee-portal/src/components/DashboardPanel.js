import { useMemo, useState } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardPanel() {
  const { employees } = useEmployees();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const analytics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(
      (employee) => employee.status === 'Active'
    ).length;
    const onLeave = employees.filter(
      (employee) => employee.status === 'On Leave'
    ).length;
    const departments = new Set(
      employees.map((employee) => employee.department)
    ).size;

    return [
      { label: 'Total Employees', value: total },
      { label: 'Active Employees', value: active },
      { label: 'On Leave', value: onLeave },
      { label: 'Departments', value: departments },
    ];
  }, [employees]);

  return (
    <section className="dashboard-grid">
      <article className="glass-card">
        <h3>Analytics</h3>
        <div className="analytics-cards">
          {analytics.map((item) => (
            <div key={item.label} className="analytic-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className="glass-card">
        <h3>Settings</h3>
        <div className="settings-list">
          <label className="toggle-row" htmlFor="toggle-theme">
            Theme Preference
            <button id="toggle-theme" type="button" onClick={toggleTheme}>
              {isDarkTheme ? 'Dark' : 'Light'}
            </button>
          </label>

          <label className="toggle-row" htmlFor="toggle-alerts">
            Email Alerts
            <input
              id="toggle-alerts"
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts((current) => !current)}
            />
          </label>

          <label className="toggle-row" htmlFor="toggle-compact">
            Compact Table View
            <input
              id="toggle-compact"
              type="checkbox"
              checked={compactMode}
              onChange={() => setCompactMode((current) => !current)}
            />
          </label>
        </div>
      </article>
    </section>
  );
}
