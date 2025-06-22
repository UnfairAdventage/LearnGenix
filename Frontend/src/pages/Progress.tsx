import React from 'react';
import Navbar from '../components/Navbar';
import { TrendingUp, Trophy, Clock, Target, Calendar, BookOpen } from 'lucide-react';

const Progress: React.FC = () => {
  const overallStats = [
    { icon: Trophy, label: 'Ejercicios completados', value: '147', change: '+12', color: 'text-green-neon', bgColor: 'bg-green-neon/10' },
    { icon: Target, label: 'Precisión promedio', value: '87%', change: '+3%', color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { icon: Clock, label: 'Tiempo promedio', value: '3.2 min', change: '-0.5 min', color: 'text-primary-neon', bgColor: 'bg-primary-neon/10' },
    { icon: Calendar, label: 'Racha actual', value: '7 días', change: '+2 días', color: 'text-pink-neon', bgColor: 'bg-pink-neon/10' },
  ];

  const subjectProgress = [
    { name: 'Matemáticas', completed: 45, total: 60, accuracy: 92, timeSpent: '4.2h', gradient: 'from-primary to-primary-neon' },
    { name: 'Física', completed: 32, total: 45, accuracy: 88, timeSpent: '3.1h', gradient: 'from-secondary to-green-neon' },
    { name: 'Química', completed: 28, total: 40, accuracy: 85, timeSpent: '2.8h', gradient: 'from-pink-neon to-primary-neon' },
    { name: 'Lengua', completed: 38, total: 50, accuracy: 90, timeSpent: '3.5h', gradient: 'from-green-neon to-secondary' },
    { name: 'Informática', completed: 42, total: 45, accuracy: 95, timeSpent: '4.0h', gradient: 'from-primary-neon to-pink-neon' },
  ];

  const recentActivity = [
    { date: '2024-01-15', subject: 'Matemáticas', exercise: 'Ecuaciones cuadráticas', score: 95, time: '3:24', color: 'text-green-neon' },
    { date: '2024-01-15', subject: 'Física', exercise: 'Leyes de Newton', score: 88, time: '4:12', color: 'text-secondary' },
    { date: '2024-01-14', subject: 'Química', exercise: 'Enlaces químicos', score: 92, time: '2:58', color: 'text-primary-neon' },
    { date: '2024-01-14', subject: 'Matemáticas', exercise: 'Funciones trigonométricas', score: 87, time: '5:03', color: 'text-green-neon' },
    { date: '2024-01-13', subject: 'Lengua', exercise: 'Análisis sintáctico', score: 94, time: '3:45', color: 'text-pink-neon' },
    { date: '2024-01-13', subject: 'Informática', exercise: 'Algoritmos de ordenamiento', score: 96, time: '4:21', color: 'text-secondary' },
  ];

  const achievements = [
    { title: 'Racha de 7 días', description: '¡Una semana completa!', icon: '🔥', date: 'Hoy', color: 'border-green-neon/30 bg-green-neon/10' },
    { title: '50 ejercicios completados', description: 'Medio centenar conseguido', icon: '🎯', date: 'Ayer', color: 'border-secondary/30 bg-secondary/10' },
    { title: 'Maestro en Matemáticas', description: '90% de precisión', icon: '🧮', date: '2 días', color: 'border-primary-neon/30 bg-primary-neon/10' },
    { title: 'Estudiante dedicado', description: '5 horas de estudio', icon: '📚', date: '3 días', color: 'border-pink-neon/30 bg-pink-neon/10' },
  ];

  const weeklyData = [
    { day: 'Lun', exercises: 8, time: 45 },
    { day: 'Mar', exercises: 12, time: 62 },
    { day: 'Mié', exercises: 6, time: 28 },
    { day: 'Jue', exercises: 15, time: 78 },
    { day: 'Vie', exercises: 10, time: 52 },
    { day: 'Sáb', exercises: 7, time: 35 },
    { day: 'Dom', exercises: 9, time: 48 },
  ];

  const maxExercises = Math.max(...weeklyData.map(d => d.exercises));

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Tu progreso</h1>
          <p className="text-text-secondary text-lg">
            Revisa tu rendimiento y ve cómo has mejorado con el tiempo
          </p>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <div key={index} className="bg-surface rounded-2xl border border-border p-6 hover:border-primary-neon/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
                    isPositive ? 'text-green-neon bg-green-neon/10' : 'text-pink-neon bg-pink-neon/10'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject progress and weekly chart */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject progress */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Progreso por materia</h2>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => {
                  const completionRate = (subject.completed / subject.total) * 100;
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary">{subject.name}</h3>
                        <span className="text-sm text-text-secondary">
                          {subject.completed}/{subject.total} ejercicios
                        </span>
                      </div>
                      <div className="w-full bg-border rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-300`}
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>Precisión: <span className="text-green-neon font-medium">{subject.accuracy}%</span></span>
                        <span>Tiempo total: <span className="text-primary-neon font-medium">{subject.timeSpent}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly activity chart */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Actividad semanal</h2>
              <div className="flex items-end justify-between h-48 space-x-2">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-border rounded-t-lg relative mb-2" style={{ height: '140px' }}>
                      <div 
                        className="bg-gradient-to-t from-primary to-primary-neon rounded-t-lg w-full absolute bottom-0 flex items-end justify-center pb-2 transition-all duration-300 hover:shadow-neon-sm"
                        style={{ height: `${(day.exercises / maxExercises) * 100}%` }}
                      >
                        <span className="text-white text-xs font-medium">{day.exercises}</span>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-primary-neon rounded mr-2"></div>
                    <span>Ejercicios completados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with achievements and recent activity */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Logros recientes</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${achievement.color}`}>
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary text-sm">{achievement.title}</h4>
                      <p className="text-xs text-text-secondary">{achievement.description}</p>
                      <p className="text-xs text-text-secondary mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Estadísticas rápidas</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Mejor materia</span>
                  <span className="font-semibold text-green-neon">Informática</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Ejercicio más rápido</span>
                  <span className="font-semibold text-secondary">1:23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Racha máxima</span>
                  <span className="font-semibold text-primary-neon">12 días</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Tiempo total</span>
                  <span className="font-semibold text-pink-neon">18.2 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-8 bg-surface rounded-2xl border border-border p-6">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Actividad reciente</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-text-secondary pb-3">Fecha</th>
                  <th className="text-left text-sm font-medium text-text-secondary pb-3">Materia</th>
                  <th className="text-left text-sm font-medium text-text-secondary pb-3">Ejercicio</th>
                  <th className="text-left text-sm font-medium text-text-secondary pb-3">Puntuación</th>
                  <th className="text-left text-sm font-medium text-text-secondary pb-3">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0 hover:bg-base-light/50 transition-colors">
                    <td className="py-3 text-sm text-text-secondary">
                      {new Date(activity.date).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="py-3 text-sm text-text-primary font-medium">{activity.subject}</td>
                    <td className="py-3 text-sm text-text-primary">{activity.exercise}</td>
                    <td className="py-3">
                      <span className={`text-sm font-medium ${activity.color}`}>
                        {activity.score}%
                      </span>
                    </td>
                    <td className="py-3 text-sm text-text-secondary">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;