import { AuthProvider } from './AuthContext';
import { EmployeeProvider } from './EmployeeContext';
import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>{children}</EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
