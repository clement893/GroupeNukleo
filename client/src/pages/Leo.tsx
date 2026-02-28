// Leo.tsx
import { useState, useRef, useEffect } from 'react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import OptimizedImage from '@/components/OptimizedImage';
import { Send, Mic, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { logger } from '@/lib/logger';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { ChatMessage, isValidChatMessage } from '@/types/localStorage';
import PageLayout from '@/components/PageLayout';

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
      <div className="min-h-screen bg-gradient-to-br from-[oklch(0.35_0.15_300)] via-[oklch(0.40_0.15_320)] to-[oklch(0.35_0.15_340)] flex flex-col overflow-hidden">
      {/* Toolbar with Leo-specific actions - positioned below header */}
      <div className="fixed top-20 sm:top-24 left-0 right-0 z-40 bg-gradient-to-br from-[oklch(0.35_0.15_300)] via-[oklch(0.40_0.15_320)] to-[oklch(0.35_0.15_340)] backdrop-blur-md border-b border-white/10 px-4 py-2">
        <div className="container">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left side - Expert Mode Toggle */}
            <button
              onClick={() => setIsExpertMode(!isExpertMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              title={isExpertMode ? t('leo.switchToStandard') : t('leo.switchToExpert')}
            >
              <span className="text-xs font-medium">
                {isExpertMode ? `🔬 ${t('leo.expertMode')}` : `💡 ${t('leo.standardMode')}`}
              </span>
            </button>
            
            {/* Right side - New Chat button */}
            <Button
              onClick={handleNewChat}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              {t('leo.newChat')}
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container pt-32 sm:pt-36 pb-4">
        <Breadcrumb items={[{ name: t('nav.leo') || 'LEO AI Assistant', url: '/leo' }]} />
      </div>

      {/* Status indicator */}
      <div className="container pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/60 uppercase tracking-wider">{t('leo.aiOnline')}</span>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 container pb-32 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 200px)', WebkitOverflowScrolling: 'touch' }}>
        <div className="max-w-3xl mx-auto space-y-8 py-4">
          {safeMessages.map((message, index) => (
            <div key={index}>
              {message.isEmailForm ? (
                // Inline Email Form
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
                    <span className="text-xs text-white/40 uppercase tracking-wider mb-2">{t('leo.leoLabel')}</span>
                    <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white">
                      <p className="text-base leading-relaxed mb-4">{message.content}</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder={t('leo.namePlaceholder')}
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="email"
                          placeholder={t('leo.emailPlaceholder')}
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSkipEmail}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs"
                          >
                            {t('leo.skip')}
                          </Button>
                          <Button
                            onClick={handleEmailSubmit}
                            disabled={!emailInput.trim() || saveContactMutation.isPending}
                            size="sm"
                            className="flex-1 bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50 text-xs"
                          >
                            {saveContactMutation.isPending ? t('leo.saving') : t('leo.send')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Message
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
                    <span className="text-xs text-white/40 uppercase tracking-wider mb-2">
                      {message.role === 'assistant' ? t('leo.leoLabel') : t('leo.youLabel')}
                    </span>
                    <div
                      className={`px-6 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-[oklch(0.85_0.15_300)] to-[oklch(0.85_0.15_340)] text-white'
                          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-white/30 mt-2">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">👤</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator while loading */}
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
                <span className="text-xs text-white/40 uppercase tracking-wider mb-2">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
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
                <span className="text-xs text-white/40 uppercase tracking-wider mb-2">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-white/60 ml-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions - Show when there are 2 or fewer messages, or when user hasn't interacted much */}
          {showSuggestions && messages.length <= 3 && (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-white/60 text-center">{t('leo.suggestionsPrompt')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safeSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left text-white/80 hover:text-white text-sm group"
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

      {/* Input fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.35_0.15_300)] via-[oklch(0.35_0.15_300)] to-transparent pt-8 pb-6">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <span className="text-white/40 text-lg">›</span>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('leo.inputPlaceholder')}
                disabled={isLoading || showEmailForm}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || showEmailForm}
                className="text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
              {/* Voice input - Coming soon */}
              {/* <button 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Voice input (coming soon)"
                disabled
                title="Voice input coming soon"
              >
                <Mic className="w-5 h-5 opacity-50" />
              </button> */}
            </div>

            {/* Footer links */}
            <div className="flex items-center justify-between mt-4 text-xs text-white/40">
              <Link href={safeGetLocalizedPath('/privacy')} className="hover:text-white/60 transition-colors uppercase tracking-wider">
                {t('leo.privacyPolicy')}
              </Link>
              <a href="mailto:hello@nukleo.com" className="hover:text-white/60 transition-colors uppercase tracking-wider">
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
