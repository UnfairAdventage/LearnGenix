import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MessageCircle, Send, HelpCircle, BookOpen, Video, FileText, Search } from 'lucide-react';

const Help: React.FC = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: '¡Hola! Soy tu asistente de LearnGenix. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: '¿Cómo puedo mejorar mi puntuación?',
      answer: 'Para mejorar tu puntuación, te recomendamos practicar regularmente, revisar las explicaciones de los ejercicios incorrectos y enfocarte en las áreas donde tengas menor rendimiento.'
    },
    {
      question: '¿Cada cuánto debo estudiar?',
      answer: 'Lo ideal es estudiar de 15-30 minutos diarios. La constancia es más importante que la duración de las sesiones.'
    },
    {
      question: '¿Cómo funciona el sistema de progreso?',
      answer: 'Tu progreso se calcula basándose en los ejercicios completados, la precisión de tus respuestas y el tiempo que tardas en resolverlos.'
    },
    {
      question: '¿Puedo cambiar mi área de estudio?',
      answer: 'Sí, puedes cambiar entre diferentes áreas de estudio en cualquier momento desde la sección "Áreas" o durante los ejercicios.'
    },
    {
      question: '¿Qué hago si encuentro un error?',
      answer: 'Si encuentras un error en un ejercicio o en la plataforma, puedes reportarlo usando el chat de ayuda o contactando a tu profesor.'
    }
  ];

  const helpResources = [
    {
      icon: Video,
      title: 'Videos tutoriales',
      description: 'Aprende a usar la plataforma con nuestros videos explicativos',
      link: '#',
      gradient: 'from-primary to-primary-neon'
    },
    {
      icon: FileText,
      title: 'Guías de estudio',
      description: 'Descarga guías detalladas para cada materia',
      link: '#',
      gradient: 'from-secondary to-green-neon'
    },
    {
      icon: BookOpen,
      title: 'Documentación',
      description: 'Consulta nuestra documentación completa',
      link: '#',
      gradient: 'from-pink-neon to-primary-neon'
    }
  ];

  const quickHelp = [
    '¿Cómo cambio de materia?',
    '¿Dónde veo mi progreso?',
    '¿Cómo funcionan las rachas?',
    '¿Puedo repetir ejercicios?'
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: 'Gracias por tu pregunta. Un profesor revisará tu consulta y te responderá pronto. Mientras tanto, puedes revisar nuestra sección de preguntas frecuentes.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setNewMessage('');
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Centro de ayuda</h1>
          <p className="text-text-secondary text-lg">
            Encuentra respuestas a tus preguntas o chatea con nuestro asistente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ and Resources */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar en preguntas frecuentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Preguntas frecuentes</h2>
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <details key={index} className="group border border-border rounded-xl bg-base-light">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-border rounded-xl transition-colors">
                      <span className="font-medium text-text-primary">{item.question}</span>
                      <HelpCircle className="h-5 w-5 text-text-secondary group-open:text-primary-neon transition-colors" />
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-text-secondary">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Help Resources */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Recursos adicionales</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {helpResources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className="group flex flex-col items-center text-center p-4 border border-border rounded-xl hover:border-primary-neon/50 hover:bg-base-light transition-all duration-300"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${resource.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2">{resource.title}</h3>
                      <p className="text-sm text-text-secondary">{resource.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat sidebar */}
          <div className="space-y-6">
            {/* Quick help */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-primary mb-4">Ayuda rápida</h3>
              <div className="space-y-2">
                {quickHelp.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(question)}
                    className="w-full text-left text-sm text-secondary hover:text-primary-neon hover:bg-base-light p-2 rounded-lg transition-all duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-green-neon rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-text-primary">Chat de ayuda</h3>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-primary to-primary-neon text-white'
                          : 'bg-base-light border border-border text-text-primary'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-text-secondary'
                      }`}>
                        {message.timestamp.toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 p-3 bg-base-light border border-border rounded-xl focus:ring-2 focus:ring-primary-neon focus:border-primary-neon transition-all duration-300 text-text-primary placeholder-text-secondary"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-secondary to-green-neon hover:shadow-cyan-neon text-white p-3 rounded-xl transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;