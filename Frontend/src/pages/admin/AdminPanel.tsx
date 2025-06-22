import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Plus, Users, BookOpen, TrendingUp, FileText, Eye, Edit, Trash2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Estudiantes activos', value: '42', color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { icon: BookOpen, label: 'Ejercicios creados', value: '187', color: 'text-green-neon', bgColor: 'bg-green-neon/10' },
    { icon: TrendingUp, label: 'Promedio de precisión', value: '86%', color: 'text-primary-neon', bgColor: 'bg-primary-neon/10' },
    { icon: FileText, label: 'Feedback pendiente', value: '7', color: 'text-pink-neon', bgColor: 'bg-pink-neon/10' },
  ];

  const recentExercises = [
    { id: '1', title: 'Ecuaciones cuadráticas', subject: 'Matemáticas', difficulty: 'medium', responses: 23, avgScore: 87 },
    { id: '2', title: 'Leyes de Newton', subject: 'Física', difficulty: 'hard', responses: 15, avgScore: 78 },
    { id: '3', title: 'Tabla periódica', subject: 'Química', difficulty: 'easy', responses: 31, avgScore: 92 },
    { id: '4', title: 'Análisis sintáctico', subject: 'Lengua', difficulty: 'medium', responses: 18, avgScore: 84 },
  ];

  const studentActivity = [
    { name: 'Ana García', email: 'ana@estudiante.com', lastActivity: '2 min', exercisesToday: 5, avgScore: 92 },
    { name: 'Carlos López', email: 'carlos@estudiante.com', lastActivity: '15 min', exercisesToday: 3, avgScore: 87 },
    { name: 'María González', email: 'maria@estudiante.com', lastActivity: '1h', exercisesToday: 7, avgScore: 94 },
    { name: 'Juan Martínez', email: 'juan@estudiante.com', lastActivity: '3h', exercisesToday: 2, avgScore: 79 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-neon bg-green-neon/10 border-green-neon/30';
      case 'medium': return 'text-secondary bg-secondary/10 border-secondary/30';
      case 'hard': return 'text-pink-neon bg-pink-neon/10 border-pink-neon/30';
      default: return 'text-text-secondary bg-border';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Panel de administración</h1>
            <p className="text-text-secondary text-lg">Gestiona ejercicios y supervisa el progreso de los estudiantes</p>
          </div>
          <Link
            to="/admin/exercise/create"
            className="bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Crear ejercicio</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-surface rounded-2xl border border-border p-6 hover:border-primary-neon/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent exercises */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl border border-border p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Ejercicios recientes</h2>
                <Link to="/admin/exercise/create" className="text-secondary hover:text-primary-neon font-medium transition-colors">
                  Ver todos
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Ejercicio</th>
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Materia</th>
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Dificultad</th>
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Respuestas</th>
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Promedio</th>
                      <th className="text-left text-sm font-medium text-text-secondary pb-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentExercises.map((exercise) => (
                      <tr key={exercise.id} className="border-b border-border last:border-b-0 hover:bg-base-light/50 transition-colors">
                        <td className="py-3 text-sm font-medium text-text-primary">{exercise.title}</td>
                        <td className="py-3 text-sm text-text-secondary">{exercise.subject}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty === 'easy' ? 'Fácil' : 
                             exercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-text-secondary">{exercise.responses}</td>
                        <td className="py-3 text-sm font-medium text-green-neon">{exercise.avgScore}%</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="text-secondary hover:text-primary-neon transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <Link 
                              to={`/admin/exercise/edit/${exercise.id}`}
                              className="text-text-secondary hover:text-text-primary transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button className="text-pink-neon hover:text-pink-neon/80 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Student activity */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Actividad de estudiantes</h2>
              <div className="space-y-4">
                {studentActivity.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-base-light/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-neon rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{student.name}</h4>
                        <p className="text-sm text-text-secondary">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-text-secondary">Última actividad: </span>
                          <span className="font-medium text-text-primary">{student.lastActivity}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Hoy: </span>
                          <span className="font-medium text-secondary">{student.exercisesToday} ejercicios</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Promedio: </span>
                          <span className="font-medium text-green-neon">{student.avgScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-primary mb-4">Acciones rápidas</h3>
              <div className="space-y-3">
                <Link
                  to="/admin/exercise/create"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary-neon transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Crear ejercicio</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all duration-300">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Ver estudiantes</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-green-neon/10 hover:text-green-neon transition-all duration-300">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Estadísticas detalladas</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-neon/10 hover:text-pink-neon transition-all duration-300">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Generar reporte</span>
                </button>
              </div>
            </div>

            {/* Recent feedback */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-primary mb-4">Feedback pendiente</h3>
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-xl bg-base-light">
                  <p className="text-sm font-medium text-text-primary">Ana García</p>
                  <p className="text-xs text-text-secondary">Pregunta sobre ecuaciones cuadráticas</p>
                  <p className="text-xs text-text-secondary mt-1">Hace 2 horas</p>
                </div>
                <div className="p-3 border border-border rounded-xl bg-base-light">
                  <p className="text-sm font-medium text-text-primary">Carlos López</p>
                  <p className="text-xs text-text-secondary">Duda en ejercicio de física</p>
                  <p className="text-xs text-text-secondary mt-1">Hace 4 horas</p>
                </div>
                <div className="p-3 border border-border rounded-xl bg-base-light">
                  <p className="text-sm font-medium text-text-primary">María González</p>
                  <p className="text-xs text-text-secondary">Solicita ejercicios adicionales</p>
                  <p className="text-xs text-text-secondary mt-1">Hace 6 horas</p>
                </div>
              </div>
              <button className="w-full mt-4 text-secondary hover:text-primary-neon font-medium text-sm transition-colors">
                Ver todo el feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;