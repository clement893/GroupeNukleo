// Leo.tsx
import { useState, useRef, useEffect } from 'react';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { logger } from '@/lib/logger';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import PageLayout from '@/components/PageLayout';

const HERO_GRADIENT = 'linear-gradient(to right, #6B1817, #5636AD)';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isEmailForm?: boolean;
}

export default function Leo() {
  const { t } = useLanguage();
  
  // Get localized path function with safe fallback
  const getLocalizedPathHook = useLocalizedPath();
  const safeGetLocalizedPath = typeof getLocalizedPathHook === 'function' 
    ? getLocalizedPathHook 
    : ((path: string) => path); // Fallback function that returns path as-is
  const welcomeMessage = t('leo.welcomeMessage') || "I'm here to help architect your AI transformation. To begin, what should I call you?";
  
  // Load messages from localStorage on mount
  const loadMessages = (): Message[] => {
    try {
      const saved = localStorage.getItem('leo-chat-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure parsed is an array before mapping
        if (!Array.isArray(parsed)) {
          return [
            {
              role: 'assistant',
              content: welcomeMessage,
              timestamp: new Date(),
            },
          ];
        }
        // Convert timestamp strings back to Date objects and update welcome message if it's the default English one
        return parsed.map((msg: any) => {
          const message = {
            ...msg,
            timestamp: new Date(msg.timestamp),
          };
          // If this is the default welcome message (in English), replace it with translated version
          if (msg.role === 'assistant' && 
              msg.content === "I'm here to help architect your AI transformation. To begin, what should I call you?") {
            message.content = welcomeMessage;
          }
          return message;
        });
      }
    } catch (error) {
      logger.tagged('Leo').error('Error loading chat history:', error);
    }
    // Return default welcome message if no history
    return [
      {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  
  // Ensure messages is always an array to prevent .map() errors
  const safeMessages = Array.isArray(messages) ? messages : [];
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited'>('default');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);

  // Detect emotion from message content
  const detectEmotion = (content: string): 'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited' => {
    const lowerContent = content.toLowerCase();
    
    // Excited: achievements, success, great results
    if (lowerContent.match(/(excellent|amazing|fantastic|great|perfect|wonderful|awesome|brilliant)/)) {
      return 'excited';
    }
    
    // Happy: positive outcomes, solutions
    if (lowerContent.match(/(yes|sure|happy|glad|pleased|delighted|good|nice)/)) {
      return 'happy';
    }
    
    // Surprised: unexpected info, interesting facts
    if (lowerContent.match(/(wow|really|interesting|surprising|unexpected|actually|indeed)/)) {
      return 'surprised';
    }
    
    // Confused: questions, uncertainties
    if (lowerContent.match(/(\?|confused|unclear|not sure|maybe|perhaps|possibly|hmm)/)) {
      return 'confused';
    }
    
    // Thinking: analysis, consideration, complex topics
    if (lowerContent.match(/(consider|analyze|think|evaluate|assess|review|examine|let me|let's)/)) {
      return 'thinking';
    }
    
    return 'default';
  };

  // Avatar mapping - using optimized WebP images with fallback
  const getAvatarSrc = (emotion: typeof currentEmotion): { webp: string; fallback: string } => {
    switch (emotion) {
      case 'happy': return { webp: '/leo-avatar-happy.webp', fallback: '/leo-avatar-happy.png' };
      case 'thinking': return { webp: '/leo-avatar-thinking.webp', fallback: '/leo-avatar-thinking.png' };
      case 'surprised': return { webp: '/leo-avatar-surprised.webp', fallback: '/leo-avatar-surprised.png' };
      case 'confused': return { webp: '/leo-avatar-confused.webp', fallback: '/leo-avatar-confused.png' };
      case 'excited': return { webp: '/leo-avatar-excited.webp', fallback: '/leo-avatar-excited.png' };
      default: return { webp: '/leo-avatar.webp', fallback: '/leo-avatar.png' };
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatMutation = trpc.leo.chat.useMutation();
  const saveContactMutation = trpc.leo.saveContact.useMutation();

  // Contextual suggestion categories
  const suggestionCategories = {
    initial: (t('leo.suggestions.initial') as string[]) || [
      "How can AI transform my business operations?",
      "What's the ROI timeline for AI implementation?",
      "Help me build an AI strategy roadmap",
      "What are the best AI use cases for my industry?",
    ],
    strategy: (t('leo.suggestions.strategy') as string[]) || [
      "How do I create a phased AI implementation plan?",
      "What are the key success factors for AI transformation?",
      "How should I structure my AI team?",
      "What's the typical timeline for AI adoption?",
    ],
    implementation: (t('leo.suggestions.implementation') as string[]) || [
      "What technology stack should I choose for AI?",
      "How do I ensure data quality for AI models?",
      "What are common pitfalls in AI implementation?",
      "How do I integrate AI with existing systems?",
    ],
    roi: (t('leo.suggestions.roi') as string[]) || [
      "How long until I see ROI from AI investments?",
      "What metrics should I track for AI success?",
      "How do I calculate the business value of AI?",
      "What are realistic cost expectations for AI projects?",
    ],
    team: (t('leo.suggestions.team') as string[]) || [
      "What skills do I need to hire for AI projects?",
      "How do I upskill my existing team for AI?",
      "Should I build in-house or partner for AI?",
      "How do I create an AI-first culture?",
    ],
  };

  // Determine context based on conversation
  const getContextualSuggestions = (): string[] => {
    if (messages.length <= 1) return suggestionCategories.initial;

    const lastMessages = safeMessages.slice(-3).map(m => m.content.toLowerCase()).join(' ');

    if (lastMessages.includes('roi') || lastMessages.includes('cost') || lastMessages.includes('budget') || lastMessages.includes('value')) {
      return suggestionCategories.roi;
    }
    if (lastMessages.includes('team') || lastMessages.includes('hire') || lastMessages.includes('skill') || lastMessages.includes('people')) {
      return suggestionCategories.team;
    }
    if (lastMessages.includes('implement') || lastMessages.includes('build') || lastMessages.includes('develop') || lastMessages.includes('technology')) {
      return suggestionCategories.implementation;
    }
    if (lastMessages.includes('strategy') || lastMessages.includes('plan') || lastMessages.includes('roadmap') || lastMessages.includes('approach')) {
      return suggestionCategories.strategy;
    }

    return suggestionCategories.initial;
  };

  // Load expert mode preference from localStorage
  const [isExpertMode, setIsExpertMode] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      const saved = localStorage.getItem('leo-expert-mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Save expert mode preference
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('leo-expert-mode', String(isExpertMode));
      }
    } catch (error) {
      logger.tagged('Leo').error('Error saving expert mode preference:', error);
    }
  }, [isExpertMode]);

  // Expert mode suggestion categories (more technical)
  const expertSuggestionCategories = {
    initial: (t('leo.expertSuggestions.initial') as string[]) || [
      "What's your approach to MLOps and model governance?",
      "How do you architect multi-agent AI systems?",
      "What's your framework for AI risk assessment and mitigation?",
      "How do you handle data drift and model retraining pipelines?",
    ],
    strategy: (t('leo.expertSuggestions.strategy') as string[]) || [
      "What's your methodology for AI maturity assessment?",
      "How do you design federated learning architectures?",
      "What's your approach to AI ethics frameworks and bias detection?",
      "How do you structure center of excellence for AI?",
    ],
    implementation: (t('leo.expertSuggestions.implementation') as string[]) || [
      "What's your tech stack for real-time inference at scale?",
      "How do you implement model versioning and A/B testing?",
      "What's your approach to feature engineering automation?",
      "How do you handle model explainability and interpretability?",
    ],
    roi: (t('leo.expertSuggestions.roi') as string[]) || [
      "How do you calculate TCO for AI infrastructure?",
      "What metrics do you use for model performance vs business KPIs?",
      "How do you quantify the value of data quality improvements?",
      "What's your framework for AI investment portfolio optimization?",
    ],
    team: (t('leo.expertSuggestions.team') as string[]) || [
      "What's your hiring framework for ML engineers vs data scientists?",
      "How do you structure AI teams (centralized vs embedded)?",
      "What certifications and skills matter for AI practitioners?",
      "How do you build internal AI communities of practice?",
    ],
  };

  const getContextualSuggestionsForMode = (expertMode: boolean): string[] => {
    const categories = expertMode ? expertSuggestionCategories : suggestionCategories;
    
    if (safeMessages.length <= 1) return categories.initial;

    const lastMessages = safeMessages.slice(-3).map(m => m.content.toLowerCase()).join(' ');

    if (lastMessages.includes('roi') || lastMessages.includes('cost') || lastMessages.includes('budget') || lastMessages.includes('value')) {
      return categories.roi;
    }
    if (lastMessages.includes('team') || lastMessages.includes('hire') || lastMessages.includes('skill') || lastMessages.includes('people')) {
      return categories.team;
    }
    if (lastMessages.includes('implement') || lastMessages.includes('build') || lastMessages.includes('develop') || lastMessages.includes('technology')) {
      return categories.implementation;
    }
    if (lastMessages.includes('strategy') || lastMessages.includes('plan') || lastMessages.includes('roadmap') || lastMessages.includes('approach')) {
      return categories.strategy;
    }

    return categories.initial;
  };

  const [suggestions, setSuggestions] = useState<string[]>(getContextualSuggestionsForMode(isExpertMode));
  
  // Ensure suggestions is always an array to prevent .map() errors
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  // Update suggestions when messages or expert mode change
  useEffect(() => {
    const newSuggestions = getContextualSuggestionsForMode(isExpertMode);
    setSuggestions(newSuggestions);
  }, [messages, isExpertMode]);

  // Update welcome message if it's the default English one
  useEffect(() => {
    if (messages.length > 0 && messages[0].role === 'assistant') {
      const firstMessage = messages[0];
      const englishWelcome = "I'm here to help architect your AI transformation. To begin, what should I call you?";
      if (firstMessage.content === englishWelcome) {
        setMessages(prev => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            content: welcomeMessage,
          };
          return updated;
        });
      }
    }
  }, [welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('leo-chat-history', JSON.stringify(messages));
      }
    } catch (error) {
      logger.tagged('Leo').error('Error saving chat history:', error);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText, showEmailForm]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Don't hide suggestions, let them update contextually
  };

  const handleNewChat = () => {
    const defaultMessages: Message[] = [
      {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMessages);
    setShowSuggestions(true);
    setInput('');
    setIsLoading(false);
    setIsTyping(false);
    setTypingText('');
    setShowEmailForm(false);
    setEmailSaved(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Temporarily hide suggestions while loading
    setShowSuggestions(false);

    try {
      const response = await chatMutation.mutateAsync({
        messages: [...safeMessages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const fullText = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
      
      // Detect emotion from response
      const detectedEmotion = detectEmotion(fullText);
      setCurrentEmotion(detectedEmotion);
      
      // Simulate typing effect
      setIsTyping(true);
      setTypingText('');
      
      // Clear any existing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      
      let currentIndex = 0;
      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypingText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
          
          const assistantMessage: Message = {
            role: 'assistant',
            content: fullText,
            timestamp: new Date(),
          };
          
          // Check if we should show email form - only after first complete exchange
          // Welcome message (1) + user message (2) = 2 messages before adding assistant
          const emailAlreadySaved = typeof window !== 'undefined' ? localStorage.getItem('leo-email-saved') : null;
          
          setMessages((prev) => {
            const updated = [...prev, assistantMessage];
            // Show email form after first complete exchange (welcome + user + assistant = 3 messages)
            // Check if we have exactly 2 messages before adding assistant (welcome + user)
            if (!emailAlreadySaved && !emailSaved && prev.length === 2 && !showEmailForm) {
              updated.push({
                role: 'system',
                content: t('leo.emailPrompt') || "Before we continue, I'd love to send you personalized insights! Could you share your email?",
                timestamp: new Date(),
                isEmailForm: true,
              });
              setShowEmailForm(true);
            }
            return updated;
          });
          
          setTypingText('');
          // Show suggestions again after response is complete
          setShowSuggestions(true);
        }
      }, 5); // 5ms per character for fast typing speed
    } catch (error) {
      logger.tagged('Leo').error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: t('leo.errorMessage') || "Sorry, I'm having trouble connecting right now. Please try again! 🔄",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) return;

    try {
      const lastMessage = messages[messages.length - 2]; // Get last real message before form
      await saveContactMutation.mutateAsync({
        email: emailInput,
        name: nameInput || undefined,
        conversationContext: lastMessage ? lastMessage.content.substring(0, 500) : undefined,
      });
      
      setEmailSaved(true);
      setShowEmailForm(false);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('leo-email-saved', 'true');
        }
      } catch (error) {
        logger.tagged('Leo').warn('Failed to save email state:', error);
      }
      
      // Remove email form message and add confirmation
      const messagesWithoutForm = messages.filter(m => !m.isEmailForm);
      const successMessage = (t('leo.emailSuccess') || "Perfect! Thanks {{name}}! 🎉 I'll send personalized insights to {{email}}. Now, let's continue our conversation!")
        .replace('{{name}}', nameInput || t('leo.youLabel') || 'there')
        .replace('{{email}}', emailInput);
      setMessages([...messagesWithoutForm, {
        role: 'assistant',
        content: successMessage,
        timestamp: new Date(),
      }]);
      
      // Clear inputs
      setEmailInput('');
      setNameInput('');
    } catch (error) {
      logger.tagged('Leo').error('Error saving email:', error);
    }
  };

  const handleSkipEmail = () => {
    setShowEmailForm(false);
    // Remove email form message and add skip confirmation
    const messagesWithoutForm = messages.filter(m => !m.isEmailForm);
    setMessages([...messagesWithoutForm, {
      role: 'assistant',
      content: t('leo.emailSkip') || "No problem! Let's continue our conversation. 😊",
      timestamp: new Date(),
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showEmailForm) {
        handleEmailSubmit();
      } else {
        handleSend();
      }
    }
  };

  return (
    <PageLayout>
      <SEO
        title={t('leo.seoTitle') || "Chat with LEO - AI Assistant | Get Instant AI Consultation"}
        description={t('leo.seoDescription') || "Talk to LEO, Nukleo Digital's AI assistant. Get instant answers about AI transformation, strategy, and implementation for your business. Free AI consultation chatbot."}
        keywords={t('leo.seoKeywords') || "AI chatbot, AI assistant, AI consultation, AI strategy, AI transformation help, AI implementation guide, free AI consultation, AI advisor"}
        ogImage="https://nukleodigital-production.up.railway.app/og-image.jpg"
      />
      <div className="min-h-screen flex flex-col" style={{ background: 'transparent', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Toolbar */}
      <div className="fixed top-20 sm:top-24 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-2">
        <div className="container">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() => setIsExpertMode(!isExpertMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              title={isExpertMode ? t('leo.switchToStandard') : t('leo.switchToExpert')}
            >
              {isExpertMode ? `🔬 ${t('leo.expertMode')}` : `💡 ${t('leo.standardMode')}`}
            </button>
            <Button
              onClick={handleNewChat}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t('leo.newChat')}
            </Button>
          </div>
        </div>
      </div>

      {/* Hero title + status */}
      <div className="container pt-32 sm:pt-36 pb-2">
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: '0 0 0.5rem 0',
            background: HERO_GRADIENT,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          {t('nav.leo') || 'LEO'}
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{t('leo.aiOnline')}</span>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden container bg-gray-50/50"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
        <div className="max-w-3xl mx-auto space-y-8 py-4 pb-36">
          {safeMessages.map((message, index) => (
            <div key={index}>
              {message.isEmailForm ? (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0">
                      <OptimizedImage 
                        src={getAvatarSrc('happy').fallback}
                        webpSrc={getAvatarSrc('happy').webp}
                        alt="Leo" 
                        width={48}
                        height={48}
                        loading="lazy"
                        className="w-12 h-12 object-contain bg-transparent avatar-happy"
                      />
                  </div>
                  <div className="flex flex-col items-start max-w-[70%]">
                    <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">{t('leo.leoLabel')}</span>
                    <div className="px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <p className="text-base leading-relaxed mb-4 text-gray-800">{message.content}</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder={t('leo.namePlaceholder')}
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5A1E29] focus:ring-1 focus:ring-[#5A1E29]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                        <input
                          type="email"
                          placeholder={t('leo.emailPlaceholder')}
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5A1E29] focus:ring-1 focus:ring-[#5A1E29]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={handleSkipEmail}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {t('leo.skip')}
                          </Button>
                          <Button
                            type="button"
                            onClick={handleEmailSubmit}
                            disabled={!emailInput.trim() || saveContactMutation.isPending}
                            size="sm"
                            className="flex-1 text-white hover:opacity-90 disabled:opacity-50 text-xs font-medium"
                            style={{ background: HERO_GRADIENT, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {saveContactMutation.isPending ? t('leo.saving') : t('leo.send')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <OptimizedImage 
                        src={getAvatarSrc(index === messages.length - 1 ? currentEmotion : 'default').fallback}
                        webpSrc={getAvatarSrc(index === messages.length - 1 ? currentEmotion : 'default').webp}
                        alt="Leo" 
                        width={48}
                        height={48}
                        loading="lazy"
                        className={`w-12 h-12 object-contain bg-transparent transition-all duration-300 ${
                          index === messages.length - 1 ? `avatar-${currentEmotion}` : 'avatar-default'
                        }`}
                      />
                    </div>
                  )}

                  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
                      {message.role === 'assistant' ? t('leo.leoLabel') : t('leo.youLabel')}
                    </span>
                    <div
                      className={`px-6 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'text-white'
                          : 'bg-white border border-gray-200 shadow-sm text-gray-900'
                      }`}
                      style={message.role === 'user' ? { background: HERO_GRADIENT } : undefined}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-lg">👤</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && !isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <OptimizedImage 
                  src={getAvatarSrc('thinking').fallback}
                  webpSrc={getAvatarSrc('thinking').webp}
                  alt="Leo" 
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-12 h-12 object-contain bg-transparent avatar-thinking transition-all duration-300"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Typing effect */}
          {isTyping && typingText && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <OptimizedImage 
                  src={getAvatarSrc(currentEmotion).fallback}
                  webpSrc={getAvatarSrc(currentEmotion).webp}
                  alt="Leo" 
                  width={48}
                  height={48}
                  loading="lazy"
                  className={`w-12 h-12 object-contain bg-transparent transition-all duration-300 avatar-${currentEmotion}`}
                />
              </div>
              <div className="flex flex-col items-start max-w-[70%]">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-900">
                  <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-gray-500 ml-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length <= 3 && (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-500 text-center font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t('leo.suggestionsPrompt')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safeSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-6 py-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left text-gray-700 hover:text-gray-900 text-sm font-medium group"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <span className="block group-hover:translate-x-1 transition-transform">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        </div>
      </div>

      {/* Input fixed at bottom - z-index so it stays visible when clicking/focusing */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 pt-4 pb-6 safe-area-pb" style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-center bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              {showEmailForm ? (
                <p className="flex-1 text-sm text-gray-500 py-2 px-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {t('leo.emailFormHint') || 'Complétez le formulaire ci-dessus pour continuer.'}
                </p>
              ) : (
                <>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('leo.inputPlaceholder')}
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base min-w-0"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shrink-0 flex-shrink-0"
                style={{ background: HERO_GRADIENT }}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 text-xs text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Link href={safeGetLocalizedPath('/privacy')} className="hover:text-gray-700 transition-colors uppercase tracking-wider font-medium">
                {t('leo.privacyPolicy')}
              </Link>
              <a href="mailto:hello@nukleo.com" className="hover:text-gray-700 transition-colors uppercase tracking-wider font-medium">
                hello@nukleo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
