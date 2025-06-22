import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Calculator, Beaker, Atom, Globe, Palette, BookOpen, Music, Laptop } from 'lucide-react';

const Areas: React.FC = () => {
  const subjects = [
    {
      id: 'mathematics',
      name: 'Matemáticas',
      description: 'Álgebra, geometría, cálculo y más',
      icon: Calculator,
      gradient: 'from-primary to-primary-neon',
      progress: 85,
      exercises: 127
    },
    {
      id: 'physics',
      name: 'Física',
      description: 'Mecánica, termodinámica, óptica',
      icon: Atom,
      gradient: 'from-secondary to-green-neon',
      progress: 70,
      exercises: 89
    },
    {
      id: 'chemistry',
      name: 'Química',
      description: 'Química orgánica, inorgánica y analítica',
      icon: Beaker,
      gradient: 'from-pink-neon to-primary-neon',
      progress: 60,
      exercises: 94
    },
    {
      id: 'geography',
      name: 'Geografía',
      description: 'Geografia física y humana',
      icon: Globe,
      gradient: 'from-green-neon to-secondary',
      progress: 45,
      exercises: 76
    },
    {
      id: 'language',
      name: 'Lengua y Literatura',
      description: 'Gramática, ortografía y comprensión',
      icon: BookOpen,
      gradient: 'from-primary-neon to-pink-neon',
      progress: 75,
      exercises: 112
    },
    {
      id: 'arts',
      name: 'Artes',
      description: 'Historia del arte y técnicas creativas',
      icon: Palette,
      gradient: 'from-pink-neon to-secondary',
      progress: 55,
      exercises: 58
    },
    {
      id: 'music',
      name: 'Música',
      description: 'Teoría musical y apreciación',
      icon: Music,
      gradient: 'from-primary to-green-neon',
      progress: 40,
      exercises: 42
    },
    {
      id: 'computer',
      name: 'Informática',
      description: 'Programación y tecnología',
      icon: Laptop,
      gradient: 'from-secondary to-primary-neon',
      progress: 90,
      exercises: 134
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Áreas de estudio</h1>
          <p className="text-text-secondary text-lg">
            Explora todas las materias disponibles y continúa tu aprendizaje
          </p>
        </div>

        {/* Subject grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link
                key={subject.id}
                to={`/exercise?subject=${subject.id}`}
                className="group bg-surface rounded-2xl border border-border p-6 hover:border-primary-neon/50 hover:shadow-neon-sm transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon and progress */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${subject.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-text-primary">{subject.progress}%</div>
                    <div className="text-xs text-text-secondary">completado</div>
                  </div>
                </div>

                {/* Subject info */}
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary-neon transition-colors">
                  {subject.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {subject.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${subject.gradient} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Exercise count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {subject.exercises} ejercicios
                  </span>
                  <span className="text-secondary group-hover:text-primary-neon text-sm font-medium transition-colors">
                    Practicar →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Study tips */}
        <div className="mt-12 bg-surface rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">💡 Consejos para estudiar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Enfócate en una materia</h3>
              <p className="text-sm text-text-secondary">
                Dedica tiempo concentrado a una sola área para mejores resultados
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-neon/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Práctica diaria</h3>
              <p className="text-sm text-text-secondary">
                15-20 minutos diarios son más efectivos que sesiones largas esporádicas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Revisa tu progreso</h3>
              <p className="text-sm text-text-secondary">
                Usa la sección de progreso para identificar áreas de mejora
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Areas;