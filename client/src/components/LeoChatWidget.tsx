import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  emotion?: 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited';
}

export default function LeoChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState<'happy' | 'thinking' | 'surprised' | 'confused' | 'excited'>('happy');
  const [showBadge, setShowBadge] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.leo.chat.useMutation();

  // Charger l'historique depuis localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const saved = localStorage.getItem('leo_widget_messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
      
      // Vérifier si le badge a déjà été affiché
      const badgeShown = localStorage.getItem('leo_badge_shown');
      if (!badgeShown) {
        // Afficher le badge après 5 secondes
        const timer = setTimeout(() => {
          setShowBadge(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Failed to load messages:', e);
    }
  }, []);

  // Sauvegarder l'historique
  useEffect(() => {
    if (messages.length > 0) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('leo_widget_messages', JSON.stringify(messages));
        }
      } catch (e) {
        console.error('Failed to save messages:', e);
      }
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText]);

  // Détecter l'émotion depuis le texte
  const detectEmotion = (text: string): 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited' => {
    const lower = text.toLowerCase();
    if (/(exciting|amazing|excellent|fantastic|great)/i.test(lower)) return 'excited';
    if (/(happy|glad|pleased|wonderful)/i.test(lower)) return 'happy';
    if (/(interesting|consider|think|analyze)/i.test(lower)) return 'thinking';
    if (/(wow|incredible|remarkable|impressive)/i.test(lower)) return 'surprised';
    if (/(complex|challenging|difficult|unclear)/i.test(lower)) return 'confused';
    return 'happy';
  };

  // Effet de typing
  const typeMessage = (text: string, emotion: 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited') => {
    setIsTyping(true);
    setCurrentEmotion(emotion);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTypingText('');
        setMessages(prev => [...prev, { role: 'assistant', content: text, emotion }]);
      }
    }, 30);
  };

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await chatMutation.mutateAsync({
        messages: [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user' as const, content: userMessage }
        ]
      });

      const contentText = typeof response.content === 'string' ? response.content : '';
      const emotion = detectEmotion(contentText);
      typeMessage(contentText, emotion);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        emotion: 'confused'
      }]);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setTypingText('');
    setIsTyping(false);
    localStorage.removeItem('leo_widget_messages');
  };

  const getAvatarSrc = () => {
    if (isTyping) return '/leo-avatar-thinking.webp';
    return `/leo-avatar-${currentEmotion}.webp`;
  };

  const getAnimationClass = () => {
    switch (currentEmotion) {
      case 'happy': return 'animate-leo-happy';
      case 'thinking': return 'animate-leo-thinking';
      case 'surprised': return 'animate-leo-surprised';
      case 'confused': return 'animate-leo-confused';
      case 'excited': return 'animate-leo-excited';
      default: return 'animate-leo-happy';
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              setIsOpen(true);
              setShowBadge(false);
              try {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('leo_badge_shown', 'true');
                }
              } catch (e) {
                console.warn('Failed to save badge state:', e);
              }
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#523DCB] via-pink-500 to-cyan-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat with LEO"
          >
            <img
              src="/leo-avatar-happy.webp"
              alt="LEO - AI Assistant Avatar"
              width="48"
              height="48"
              fetchPriority="high"
              loading="eager"
              className="w-12 h-12 rounded-full animate-pulse-subtle"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Badge de notification */}
            {showBadge && (
              <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                1
              </div>
            )}
          </button>
          
          {/* Message d'accueil */}
          {showBadge && (
            <div className="absolute bottom-20 right-0 bg-white text-gray-800 rounded-2xl shadow-2xl p-4 max-w-[280px] animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-start gap-3">
                <img
                  src="/leo-avatar-happy.webp"
                  alt="LEO - AI Assistant Avatar"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div>
                  <p className="font-bold text-sm mb-1">👋 Hi! I'm LEO</p>
                  <p className="text-xs text-gray-600">Need help with AI transformation? I'm here to assist you!</p>
                </div>
                <button
                  onClick={() => {
                    setShowBadge(false);
                    try {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('leo_badge_shown', 'true');
                }
              } catch (e) {
                console.warn('Failed to save badge state:', e);
              }
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px] z-50 w-auto max-w-[400px] h-[min(600px,90vh)] max-h-[90vh] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#523DCB]/20 via-pink-500/20 to-cyan-400/20 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={getAvatarSrc()}
                alt="LEO - AI Assistant Avatar"
                width="40"
                height="40"
                className={`w-10 h-10 rounded-full ${getAnimationClass()} transition-all duration-300`}
              />
              <div>
                <h3 className="text-white font-bold">LEO</h3>
                <p className="text-white/60 text-xs">Your AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="text-white/60 hover:text-white transition-colors text-xs px-2 py-1 rounded hover:bg-white/10"
                title="New Chat"
              >
                New
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-white/60 mt-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#523DCB]" />
                <p className="text-sm">Hi! I'm LEO, your AI assistant.</p>
                <p className="text-xs mt-2">How can I help you today?</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'assistant' && (
                  <img
                    src={msg.emotion ? `/leo-avatar-${msg.emotion}.webp` : '/leo-avatar-happy.webp'}
                    alt="LEO - AI Assistant Avatar"
                    width="32"
                    height="32"
                    loading="lazy"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#523DCB] to-pink-500 text-white'
                      : 'bg-white/10 text-white/90'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && typingText && (
              <div className="flex gap-3">
                <img
                  src="/leo-avatar-thinking.webp"
                  alt="LEO - AI Assistant Avatar"
                  width="32"
                  height="32"
                  loading="lazy"
                  className="w-8 h-8 rounded-full flex-shrink-0 animate-leo-thinking"
                />
                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-white/10 text-white/90">
                  <p className="text-sm whitespace-pre-wrap">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-[#523DCB] ml-1 animate-blink"></span>
                  </p>
                </div>
              </div>
            )}

            {chatMutation.isPending && !isTyping && (
              <div className="flex gap-3">
                <img
                  src="/leo-avatar-thinking.webp"
                  alt="LEO - AI Assistant Avatar"
                  width="32"
                  height="32"
                  loading="lazy"
                  className="w-8 h-8 rounded-full flex-shrink-0 animate-leo-thinking"
                />
                <div className="flex items-center gap-1 bg-white/10 rounded-2xl px-4 py-3">
                  <div className="w-2 h-2 bg-[#523DCB] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#523DCB]"
                disabled={chatMutation.isPending}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || chatMutation.isPending}
                className="bg-gradient-to-r from-[#523DCB] to-pink-500 text-white rounded-xl px-4 py-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
