import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // fungsi logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      className="text-slate-600 hover:text-primary-600 font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  );

  return (
    <nav className="top-navbar fixed top-0 w-full z-50 glass bg-blue-900/40 border-b border-white/10">
      <div className="nav-wrapper container mx-auto px-4">
        <div className="navbar-content flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="logo-section flex items-center gap-2">
             <h1 className="text-xl font-bold text-white">
              Lumixor Studio
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="nav-links hidden md:flex items-center space-x-6">
            <Link to="/" className="text-blue-100 hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/items" className="text-blue-100 hover:text-white font-medium transition-colors">Equipment</Link>

            {isAuthenticated() ? (
              <>
                {isAdmin() ? (
                  <Link to="/admin" className="text-blue-100 hover:text-white font-medium transition-colors">Admin Dashboard</Link>
                ) : (
                  <Link to="/dashboard" className="text-blue-100 hover:text-white font-medium transition-colors">My Loans</Link>
                )}
                
                <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-white">
                      {user?.name}
                    </span>
                    <span className="text-xs text-blue-200 font-medium">
                      {isAdmin() ? 'Administrator' : 'Employee'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors border border-white/10"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-900 rounded font-bold hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
