import { useMemo, useState } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';

const defaultForm = {
  name: '',
  role: '',
  department: '',
  email: '',
  status: 'Active',
};

export default function EmployeeManager() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [formState, setFormState] = useState(defaultForm);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState('');

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter((employee) =>
      [employee.name, employee.role, employee.department, employee.email]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [employees, search]);

  const resetForm = () => {
    setFormState(defaultForm);
    setEditingId('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.role.trim() ||
      !formState.department.trim() ||
      !formState.email.trim()
    ) {
      return;
    }

    if (editingId) {
      updateEmployee({
        ...formState,
        id: editingId,
      });
    } else {
      addEmployee(formState);
    }

    resetForm();
  };

  const startEditing = (employee) => {
    setEditingId(employee.id);
    setFormState({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      status: employee.status,
    });
  };

  return (
    <section className="glass-card employee-panel">
      <div className="employee-panel-header">
        <h3>Employee Records</h3>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, role, department"
        />
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="role"
          value={formState.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          name="department"
          value={formState.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <select name="status" value={formState.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Update' : 'Add'} Employee</button>
          {editingId ? (
            <button type="button" className="ghost-btn" onClick={resetForm}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="employee-table-wrap">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>
                  <span className={`status-pill ${employee.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="table-actions">
                  <button type="button" className="ghost-btn" onClick={() => startEditing(employee)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
