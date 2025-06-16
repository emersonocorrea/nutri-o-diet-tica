import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import Header from './components/Header.jsx';

function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;