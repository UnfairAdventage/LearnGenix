import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle, XCircle, ArrowRight, Clock, Target, HelpCircle } from 'lucide-react';
import { apiService } from '../services/api';

interface ExerciseData {
  id: string;
  subject: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'math';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Exercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<ExerciseData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject');
  const difficulty = 'medium'; // Puedes ajustar esto según la UI

  // Cargar ejercicio inicial desde backend
  useEffect(() => {
    fetchNextExercise();
    // eslint-disable-next-line
  }, [subject]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const fetchNextExercise = async () => {
    setLoading(true);
    setShowFeedback(false);
    setIsCorrect(false);
    setUserAnswer('');
    try {
      // Llama al backend para obtener un ejercicio personalizado
      const result = await apiService.getNextExercise(subject || '', difficulty);
      // Adaptar el resultado del backend al formato local si es necesario
      setCurrentExercise({
        id: result.id,
        subject: result.subject_id || '',
        question: result.title || result.content || '',
        type: result.type === 'multiple_choice' ? 'multiple-choice' : 'text',
        options: result.options ? Object.values(result.options) : undefined,
        correctAnswer: result.correct_answer || '',
        explanation: result.explanation || '',
        difficulty: result.difficulty || 'medium',
      });
      setStartTime(Date.now());
      setTimeSpent(0);
    } catch (error) {
      setCurrentExercise(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!currentExercise || !userAnswer.trim()) return;
    const correct = userAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNextExercise = () => {
    fetchNextExercise();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-neon bg-green-neon/10 border-green-neon/30';
      case 'medium': return 'text-secondary bg-secondary/10 border-secondary/30';
      case 'hard': return 'text-pink-neon bg-pink-neon/10 border-pink-neon/30';
      default: return 'text-text-secondary bg-border';
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subjects: Record<string, string> = {
      mathematics: 'Matemáticas',
      physics: 'Física',
      chemistry: 'Química',
      geography: 'Geografía',
      language: 'Lengua y Literatura',
      arts: 'Artes',
      music: 'Música',
      computer: 'Informática'
    };
    return subjects[subjectId] || 'Ejercicio';
  };

  if (!currentExercise) {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-neon mx-auto"></div>
            <p className="mt-4 text-text-secondary">Cargando ejercicio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                {getSubjectName(currentExercise.subject)}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-xl text-xs font-medium border ${getDifficultyColor(currentExercise.difficulty)}`}>
                  {currentExercise.difficulty === 'easy' ? 'Fácil' : 
                   currentExercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                </span>
                <div className="flex items-center text-text-secondary">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formatTime(timeSpent)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/areas')}
              className="text-text-secondary hover:text-secondary transition-colors"
            >
              Cambiar área
            </button>
          </div>
        </div>

        {/* Exercise card */}
        <div className="bg-surface rounded-2xl border border-border p-8 mb-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              {currentExercise.question}
            </h2>

            {/* Answer input */}
            {currentExercise.type === 'multiple-choice' && currentExercise.options ? (
              <div className="space-y-3">
                {currentExercise.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      userAnswer === option
                        ? 'border-primary-neon bg-primary-neon/10 shadow-neon-sm'
                        : 'border-border hover:border-primary-neon/50 bg-base-light'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswer === option}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="sr-only"
                      disabled={showFeedback}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                      userAnswer === option ? 'border-primary-neon' : 'border-text-secondary'
                    }`}>
                      {userAnswer === option && (
                        <div className="w-2 h-2 rounded-full bg-primary-neon"></div>
                      )}
                    </div>
                    <span className="text-text-primary">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  disabled={showFeedback}
                  className="w-full p-4 bg-base-light border-2 border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 resize-none text-text-primary placeholder-text-secondary"
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          {!showFeedback ? (
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon disabled:opacity-50 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <Target className="h-5 w-5" />
                <span>Verificar respuesta</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Feedback */}
              <div className={`p-6 rounded-xl mb-6 border-2 ${
                isCorrect 
                  ? 'bg-green-neon/10 border-green-neon/30' 
                  : 'bg-pink-neon/10 border-pink-neon/30'
              }`}>
                <div className="flex items-center mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-neon mr-2" />
                  ) : (
                    <XCircle className="h-6 w-6 text-pink-neon mr-2" />
                  )}
                  <span className={`font-semibold text-lg ${isCorrect ? 'text-green-neon' : 'text-pink-neon'}`}>
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </span>
                </div>
                <p className="text-text-primary mb-3">
                  {currentExercise.explanation}
                </p>
                {!isCorrect && (
                  <p className="text-text-primary">
                    <strong className="text-green-neon">Respuesta correcta:</strong> {currentExercise.correctAnswer}
                  </p>
                )}
              </div>

              {/* Next exercise buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleNextExercise}
                  className="bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span>Siguiente ejercicio</span>
                </button>
                <button
                  onClick={() => navigate('/progress')}
                  className="bg-surface border border-border hover:border-secondary text-text-primary py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                >
                  Ver progreso
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help widget */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => navigate('/help')}
            className="bg-gradient-to-r from-secondary to-green-neon hover:shadow-cyan-neon text-white p-4 rounded-full shadow-lg transition-all duration-300"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;