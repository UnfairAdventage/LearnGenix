import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Home, TrendingUp, HelpCircle, LogOut, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Inicio' },
    { path: '/areas', icon: BookOpen, label: 'Áreas' },
    { path: '/progress', icon: TrendingUp, label: 'Progreso' },
    { path: '/help', icon: HelpCircle, label: 'Ayuda' },
  ];

  if (user?.role === 'teacher') {
    navigationItems.push({ path: '/admin', icon: Users, label: 'Admin' });
  }

  return (
    <nav className="bg-surface border-b border-border shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary-neon group-hover:shadow-neon transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-neon to-secondary bg-clip-text text-transparent">
              LearnGenix
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-neon-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-border'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-pink-neon hover:bg-border rounded-xl transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline font-medium">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;