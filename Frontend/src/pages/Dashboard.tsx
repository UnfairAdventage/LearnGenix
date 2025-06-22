import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { TrendingUp, BookOpen, Trophy, Clock, ArrowRight, Target, Zap, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { icon: Trophy, label: 'Ejercicios completados', value: '47', color: 'text-green-neon', bgColor: 'bg-green-neon/10' },
    { icon: Target, label: 'Racha actual', value: '7 días', color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { icon: Clock, label: 'Tiempo promedio', value: '3.2 min', color: 'text-primary-neon', bgColor: 'bg-primary-neon/10' },
    { icon: TrendingUp, label: 'Progreso semanal', value: '+15%', color: 'text-pink-neon', bgColor: 'bg-pink-neon/10' },
  ];

  const quickActions = [
    { icon: Zap, label: 'Ejercicio rápido', description: 'Resuelve un ejercicio aleatorio', to: '/exercise', gradient: 'from-primary to-primary-neon' },
    { icon: BookOpen, label: 'Explorar áreas', description: 'Ve todas las materias disponibles', to: '/areas', gradient: 'from-secondary to-green-neon' },
    { icon: TrendingUp, label: 'Ver progreso', description: 'Revisa tu rendimiento', to: '/progress', gradient: 'from-pink-neon to-primary-neon' },
  ];

  const recentActivities = [
    { subject: 'Matemáticas', exercise: 'Ecuaciones lineales', score: 95, time: '2 min', color: 'text-green-neon' },
    { subject: 'Física', exercise: 'Movimiento uniforme', score: 88, time: '4 min', color: 'text-secondary' },
    { subject: 'Química', exercise: 'Tabla periódica', score: 92, time: '3 min', color: 'text-primary-neon' },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            ¡Hola, <span className="bg-gradient-to-r from-primary-neon to-secondary bg-clip-text text-transparent">{user?.name}</span>! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            {user?.role === 'teacher' 
              ? 'Revisa el progreso de tus estudiantes y crea nuevos ejercicios'
              : 'Continúa tu aprendizaje donde lo dejaste'
            }
          </p>
        </div>

        {/* Stats cards */}
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
          {/* Quick actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Acciones rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.to}
                    className="group bg-surface rounded-2xl border border-border p-6 hover:border-primary-neon/50 hover:shadow-neon-sm transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{action.label}</h3>
                    <p className="text-text-secondary text-sm mb-4">{action.description}</p>
                    <div className="flex items-center text-primary-neon group-hover:text-secondary transition-colors">
                      <span className="text-sm font-medium">Comenzar</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recent activities */}
            <h2 className="text-2xl font-bold text-text-primary mb-6">Actividad reciente</h2>
            <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{activity.exercise}</h4>
                      <p className="text-sm text-text-secondary">{activity.subject}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${activity.color}`}>{activity.score}%</p>
                        <p className="text-xs text-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/progress" 
                className="block text-center text-secondary hover:text-primary-neon font-medium mt-4 transition-colors"
              >
                Ver todo el historial
              </Link>
            </div>
          </div>

          {/* Progress sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Tu progreso</h2>
            <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-border"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.72)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#7B61FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-text-primary">72%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-text-primary">Progreso general</h3>
                <p className="text-sm text-text-secondary">¡Vas muy bien!</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-primary">Matemáticas</span>
                    <span className="text-green-neon font-medium">85%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-primary-neon h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-primary">Física</span>
                    <span className="text-secondary font-medium">70%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-secondary to-green-neon h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-primary">Química</span>
                    <span className="text-pink-neon font-medium">60%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-neon to-primary-neon h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">Logros recientes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-neon/10 border border-green-neon/30">
                  <div className="w-10 h-10 bg-green-neon/20 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-green-neon" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Racha de 7 días</p>
                    <p className="text-xs text-text-secondary">¡Sigue así!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/10 border border-secondary/30">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">50 ejercicios</p>
                    <p className="text-xs text-text-secondary">¡Medio centenar!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;