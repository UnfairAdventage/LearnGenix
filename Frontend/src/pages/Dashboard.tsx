import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { TrendingUp, BookOpen, Trophy, Clock, ArrowRight, Target, Zap, Users } from 'lucide-react';
import { apiService } from '../services/api';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const data = await apiService.getDashboardSummary();
        setSummary(data);
      } catch (e) {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // Stats cards
  const stats = summary ? [
    { icon: Trophy, label: 'Ejercicios completados', value: summary.stats?.completed_exercises ?? 0, color: 'text-green-neon', bgColor: 'bg-green-neon/10' },
    { icon: Target, label: 'Racha actual', value: summary.stats?.current_streak ? `${summary.stats.current_streak} días` : '0 días', color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { icon: Clock, label: 'Tiempo promedio', value: summary.stats?.total_time ? `${(summary.stats.total_time / Math.max(summary.stats.completed_exercises || 1, 1)).toFixed(1)} min` : '0 min', color: 'text-primary-neon', bgColor: 'bg-primary-neon/10' },
    { icon: TrendingUp, label: 'Progreso semanal', value: '+0%', color: 'text-pink-neon', bgColor: 'bg-pink-neon/10' },
  ] : [];

  // Quick actions (sin cambios)
  const quickActions = [
    { icon: Zap, label: 'Ejercicio rápido', description: 'Resuelve un ejercicio aleatorio', to: '/exercise', gradient: 'from-primary to-primary-neon' },
    { icon: BookOpen, label: 'Explorar áreas', description: 'Ve todas las materias disponibles', to: '/areas', gradient: 'from-secondary to-green-neon' },
    { icon: TrendingUp, label: 'Ver progreso', description: 'Revisa tu rendimiento', to: '/progress', gradient: 'from-pink-neon to-primary-neon' },
  ];

  // Actividad reciente
  const recentActivities = summary?.recent_activity?.map((a: any) => ({
    subject: a.subject_id || '',
    exercise: a.exercise_title || '',
    score: a.score ?? 0,
    time: a.time_spent ? `${a.time_spent} seg` : '',
    color: a.is_correct ? 'text-green-neon' : 'text-pink-neon',
  })) || [];

  // Progreso general
  const progressGeneral = summary?.progress?.general ?? 0;
  // Progreso por materia (mock si no hay datos)
  const progressBySubject = summary?.progress?.by_subject || {
    Matemáticas: 85,
    Física: 70,
    Química: 60,
  };

  // Logros recientes
  const achievements = summary?.achievements || [];

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-neon mx-auto"></div>
          <p className="mt-4 text-text-secondary">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            ¡Hola, <span className="bg-gradient-to-r from-primary-neon to-secondary bg-clip-text text-transparent">{summary?.user?.name || user?.name}</span>! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            {summary?.user?.role === 'teacher' 
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
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressGeneral / 100)}`}
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
                    <span className="text-3xl font-bold text-text-primary">{progressGeneral}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-text-primary">Progreso general</h3>
                <p className="text-sm text-text-secondary">¡Vas muy bien!</p>
              </div>
              {/* Progreso por materia */}
              <div className="space-y-4">
                {Object.entries(progressBySubject).map(([subject, percent]: any, idx) => (
                  <div key={subject}>
                  <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-primary">{subject}</span>
                      <span className={idx === 0 ? 'text-green-neon font-medium' : idx === 1 ? 'text-secondary font-medium' : 'text-pink-neon font-medium'}>{percent}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                      <div className={
                        idx === 0
                          ? 'bg-gradient-to-r from-primary to-primary-neon'
                          : idx === 1
                          ? 'bg-gradient-to-r from-secondary to-green-neon'
                          : 'bg-gradient-to-r from-pink-neon to-primary-neon'
                      } style={{ width: `${percent}%` }}></div>
                </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">Logros recientes</h3>
              <div className="space-y-3">
                {achievements.length === 0 && (
                  <p className="text-text-secondary text-sm">Aún no tienes logros recientes.</p>
                )}
                {achievements.map((a: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-green-neon/10 border border-green-neon/30">
                  <div className="w-10 h-10 bg-green-neon/20 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-green-neon" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-text-primary">{a.name}</p>
                      <p className="text-xs text-text-secondary">{a.description}</p>
                </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;