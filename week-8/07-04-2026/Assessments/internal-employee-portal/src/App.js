import './App.css';
import DashboardPanel from './components/DashboardPanel';
import EmployeeManager from './components/EmployeeManager';
import LoginPanel from './components/LoginPanel';
import TopBar from './components/TopBar';
import { AppProviders } from './contexts/AppProviders';
import { useAuth } from './contexts/AuthContext';

function PortalContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="portal-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      {!isAuthenticated ? (
        <LoginPanel />
      ) : (
        <main className="portal-main">
          <TopBar />
          <DashboardPanel />
          <EmployeeManager />
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProviders>
      <PortalContent />
    </AppProviders>
  );
}

export default App;
