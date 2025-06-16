import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Nutrição & Dietética</Link>
        <nav className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-sm">Bem-vindo, {user.name}</span>
              <Link to="/" className="hover:underline">Pacientes</Link>
              {user.role === 'admin' && (
                <Link to="/users" className="hover:underline">Usuários</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;