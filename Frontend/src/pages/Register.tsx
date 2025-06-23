import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Mail, Lock, User, Users, GraduationCap, Loader2 } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/email-confirmation', { 
        state: { email, message: 'Cuenta creada exitosamente. Por favor, confirma tu email para continuar.' }
      });
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-light">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-neon shadow-neon">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-neon to-secondary bg-clip-text text-transparent mb-2">
            LearnGenix
          </h1>
          <p className="text-text-secondary">Crear tu cuenta</p>
        </div>

        {/* Form */}
        <div className="bg-surface rounded-2xl border border-border p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-pink-neon/10 border border-pink-neon/30 text-pink-neon px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="Tu nombre completo"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Tipo de cuenta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  disabled={isLoading}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                    role === 'student'
                      ? 'border-secondary bg-secondary/10 text-secondary shadow-cyan-neon'
                      : 'border-border bg-base-light text-text-secondary hover:bg-border'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Estudiante</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  disabled={isLoading}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                    role === 'teacher'
                      ? 'border-green-neon bg-green-neon/10 text-green-neon shadow-green-neon'
                      : 'border-border bg-base-light text-text-secondary hover:bg-border'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium">Profesor</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="Repite tu contraseña"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon disabled:opacity-50 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <span>Crear cuenta</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-secondary hover:text-primary-neon font-medium transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;