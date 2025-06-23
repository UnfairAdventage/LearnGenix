import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { MailCheck, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const EmailConfirmation: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resendConfirmation } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    // Mostrar un mensaje inicial si se redirige desde el registro
    if (location.state?.message) {
        setMessage(location.state.message);
    }
  }, [location.state]);

  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        setError('Por favor, introduce tu email.');
        return;
    }
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await resendConfirmation(email);
      setMessage('Email de confirmación reenviado. Revisa tu bandeja de entrada (y la carpeta de spam).');
    } catch (err: any) {
      setError(err.message || 'Error al reenviar el email de confirmación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-light">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-neon shadow-neon mb-6">
                <MailCheck className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
                Confirma tu Email
            </h1>
            <p className="text-text-secondary">
                Revisa tu bandeja de entrada para activar tu cuenta.
            </p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-8 shadow-xl">
            {message && (
              <div className="flex items-start space-x-3 bg-green-neon/10 border border-green-neon/30 text-green-neon px-4 py-3 rounded-xl mb-6">
                <CheckCircle className="h-5 w-5 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="flex items-start space-x-3 bg-pink-neon/10 border border-pink-neon/30 text-pink-neon px-4 py-3 rounded-xl mb-6">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="text-center mb-6">
                <p className="text-text-primary">
                    Hemos enviado un enlace de activación a <strong className="text-primary-neon">{email || 'tu correo'}</strong>.
                </p>
            </div>

            <div className="border-t border-border pt-6">
                <h3 className="text-md font-semibold text-text-secondary text-center mb-4">
                    ¿No recibiste el email?
                </h3>
                <form onSubmit={handleResendConfirmation} className="space-y-4">
                    <div>
                        <label htmlFor="email-resend" className="sr-only">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email-resend"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                            placeholder="Introduce tu email aquí"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon disabled:opacity-50 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Reenviando...</span>
                            </>
                        ) : (
                            <span>Reenviar Email</span>
                        )}
                    </button>
                </form>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate('/login')}
                    className="text-secondary hover:text-primary-neon font-medium transition-colors"
                >
                    Volver a Iniciar Sesión
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation; 