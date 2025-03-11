
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserListPage from './components/UserList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardPage from './pages/DashboardPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={<RegistrationPage />}/>
          <Route path='/dashboard' element={<DashboardPage />}/>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
