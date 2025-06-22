import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const CreateExercise: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    question: '',
    type: 'text' as 'text' | 'multiple-choice',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    correctAnswer: '',
    explanation: '',
    options: ['', '', '', '']
  });

  const subjects = [
    { value: 'mathematics', label: 'Matemáticas' },
    { value: 'physics', label: 'Física' },
    { value: 'chemistry', label: 'Química' },
    { value: 'geography', label: 'Geografía' },
    { value: 'language', label: 'Lengua y Literatura' },
    { value: 'arts', label: 'Artes' },
    { value: 'music', label: 'Música' },
    { value: 'computer', label: 'Informática' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Exercise created:', formData);
    
    // Show success message and redirect
    alert('Ejercicio creado exitosamente');
    navigate('/admin');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Crear nuevo ejercicio</h1>
            <p className="text-text-secondary text-lg">Diseña un ejercicio para tus estudiantes</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic info */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Información básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Título del ejercicio
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="Ej: Ecuaciones lineales básicas"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Materia
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary"
                  required
                >
                  <option value="">Seleccionar materia</option>
                  {subjects.map(subject => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tipo de ejercicio
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary"
                >
                  <option value="text">Respuesta de texto</option>
                  <option value="multiple-choice">Opción múltiple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Dificultad
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary"
                >
                  <option value="easy">Fácil</option>
                  <option value="medium">Medio</option>
                  <option value="hard">Difícil</option>
                </select>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Pregunta</h2>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Enunciado del ejercicio
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                rows={4}
                className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 resize-none text-text-primary placeholder-text-secondary"
                placeholder="Escribe aquí la pregunta o problema que los estudiantes deben resolver..."
                required
              />
            </div>
          </div>

          {/* Answer options */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Respuestas</h2>
            
            {formData.type === 'multiple-choice' ? (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary mb-4">
                  Agrega las opciones de respuesta. Marca cuál es la correcta.
                </p>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={option}
                      checked={formData.correctAnswer === option}
                      onChange={(e) => handleInputChange('correctAnswer', e.target.value)}
                      className="text-primary-neon"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                      placeholder={`Opción ${index + 1}`}
                      required
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-pink-neon hover:text-pink-neon/80 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                {formData.options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="flex items-center space-x-2 text-secondary hover:text-primary-neon font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar opción</span>
                  </button>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Respuesta correcta
                </label>
                <input
                  type="text"
                  value={formData.correctAnswer}
                  onChange={(e) => handleInputChange('correctAnswer', e.target.value)}
                  className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                  placeholder="Escribe la respuesta exacta que esperás"
                  required
                />
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Explicación</h2>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Explicación de la respuesta
              </label>
              <textarea
                value={formData.explanation}
                onChange={(e) => handleInputChange('explanation', e.target.value)}
                rows={4}
                className="w-full p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 resize-none text-text-primary placeholder-text-secondary"
                placeholder="Explica cómo se llega a la respuesta correcta. Esta explicación se mostrará a los estudiantes después de responder."
                required
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="bg-surface border border-border hover:border-text-secondary text-text-primary py-3 px-6 rounded-xl font-semibold transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary-neon hover:shadow-neon text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Crear ejercicio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExercise;