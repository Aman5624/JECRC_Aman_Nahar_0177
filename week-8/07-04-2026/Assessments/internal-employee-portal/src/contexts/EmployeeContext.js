import { createContext, useContext, useMemo, useReducer } from 'react';

const EmployeeContext = createContext(null);

const initialEmployees = [
  {
    id: 'E-1001',
    name: 'Aarav Mehta',
    role: 'Frontend Engineer',
    department: 'Engineering',
    email: 'aarav.mehta@company.com',
    status: 'Active',
  },
  {
    id: 'E-1002',
    name: 'Riya Sharma',
    role: 'Product Manager',
    department: 'Product',
    email: 'riya.sharma@company.com',
    status: 'Active',
  },
  {
    id: 'E-1003',
    name: 'Kabir Singh',
    role: 'Data Analyst',
    department: 'Analytics',
    email: 'kabir.singh@company.com',
    status: 'On Leave',
  },
];

function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return [...state, action.payload];
    case 'UPDATE_EMPLOYEE':
      return state.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    case 'DELETE_EMPLOYEE':
      return state.filter((employee) => employee.id !== action.payload);
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [employees, dispatch] = useReducer(employeeReducer, initialEmployees);

  const addEmployee = (employee) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `E-${Date.now()}`;

    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: {
        ...employee,
        id,
      },
    });
  };

  const updateEmployee = (employee) => {
    dispatch({
      type: 'UPDATE_EMPLOYEE',
      payload: employee,
    });
  };

  const deleteEmployee = (employeeId) => {
    dispatch({
      type: 'DELETE_EMPLOYEE',
      payload: employeeId,
    });
  };

  const value = useMemo(
    () => ({
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [employees]
  );

  return (
    <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }

  return context;
}
