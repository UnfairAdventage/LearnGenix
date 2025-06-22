import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-light">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-neon shadow-neon">
            <BookOpen className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* 404 illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary-neon to-secondary bg-clip-text text-transparent mb-4">404</h1>
          <div className="text-6xl mb-4">🤔</div>
        </div>

        {/* Error message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-text-secondary mb-6 text-lg">
            La página que buscas no existe o ha sido movida. 
            No te preocupes, ¡sigamos aprendiendo!
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="w-full bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Ir al inicio</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-surface border border-border hover:border-secondary text-text-primary py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver atrás</span>
          </button>
        </div>

        {/* Help text */}
        <div className="mt-8 p-4 bg-surface border border-border rounded-xl">
          <p className="text-sm text-text-secondary">
            ¿Necesitas ayuda? Visita nuestro{' '}
            <Link to="/help" className="text-secondary hover:text-primary-neon font-medium transition-colors">
              centro de ayuda
            </Link>
            {' '}o contacta a tu profesor.
          </p>
        </div>

        {/* Fun fact */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <p className="text-sm text-primary-neon">
            <strong>💡 Dato curioso:</strong> El error 404 significa "No encontrado" 
            y es uno de los códigos de estado HTTP más conocidos en internet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;