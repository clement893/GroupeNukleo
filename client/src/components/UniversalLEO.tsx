import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { logger } from '@/lib/logger';

// Generate a simple UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

type PageContext = 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default';
type Emotion = 'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isEmailForm?: boolean;
}

interface UniversalLEOProps {
  pageContext?: PageContext;
}

// Prompts d'accueil personnalisés par page
const welcomeMessages: Record<PageContext, string> = {
  home: "👋 Hi! I'm LEO, Nukleo's AI assistant. I'm here to help you explore how AI can transform your business. What brings you here today?",
  agencies: "👋 Welcome! I'm LEO. Looking to scale your agency with Nukleo's nearshore team? I can help you understand our partnership model. What's your biggest challenge right now?",
  services: "👋 Hi! I'm LEO. Interested in our services? Whether it's AI Lab, Strategic Bureau, or Creative Studio, I can help you find the right fit. What are you looking to achieve?",
  contact: "👋 Hi! I'm LEO. Ready to connect with our team? Tell me a bit about your project and I'll make sure you get the right help.",
  projects: "👋 Hi! I'm LEO. Inspired by our work? I'd love to hear about your project vision. What kind of transformation are you considering?",
  about: "👋 Hi! I'm LEO. Want to know more about Nukleo? Ask me anything about our team, culture, or approach!",
  default: "👋 Hi! I'm LEO, your AI assistant at Nukleo. How can I help you today?",
};

export default function UniversalLEO({ pageContext = 'default' }: UniversalLEOProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Ensure messages is always an array to prevent .map() errors
  const safeMessages = Array.isArray(messages) ? messages : [];
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [sessionId] = useState(() => generateUUID());
  const [sessionStartTime] = useState(() => Date.now());
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('default');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const chatMutation = trpc.leo.chat.useMutation();
  const saveLeoContact = trpc.leo.saveContact.useMutation();
  const saveAgencyLead = trpc.agencies.saveLead.useMutation();
  const createSessionMutation = trpc.leo.createSession.useMutation();
  const updateSessionMutation = trpc.leo.updateSession.useMutation();
  
  // Detect emotion from message content
  const detectEmotion = (content: string): Emotion => {
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

  // Avatar mapping - using optimized WebP images
  const getAvatarSrc = (emotion: Emotion): string => {
    switch (emotion) {
      case 'happy': return '/leo-avatar-happy.webp';
      case 'thinking': return '/leo-avatar-thinking.webp';
      case 'surprised': return '/leo-avatar-surprised.webp';
      case 'confused': return '/leo-avatar-confused.webp';
      case 'excited': return '/leo-avatar-excited.webp';
      default: return '/leo-avatar.webp';
    }
  };
  
  // Track session creation - create when chat opens
  useEffect(() => {
    if (isOpen && sessionId && !createSessionMutation.isSuccess && !createSessionMutation.isPending) {
      // Create session when chat opens
      createSessionMutation.mutate({
        sessionId,
        pageContext: pageContext || 'default',
      });
    }
  }, [isOpen, sessionId, pageContext]);
  
  // Update session on message count change
  useEffect(() => {
    if (safeMessages.length > 0 && sessionId) {
      const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
      updateSessionMutation.mutate({
        sessionId,
        messageCount: safeMessages.length,
        conversationDuration,
      });
    }
  }, [safeMessages.length, sessionId, sessionStartTime]);

  const storageKey = `leo-${pageContext}-interacted`;

  // Auto-open disabled - Leo will only open when user clicks the button
  useEffect(() => {
    try {
      const hasSeenBefore = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      if (hasSeenBefore) {
        setHasInteracted(true);
        return;
      }
    } catch (error) {
      // localStorage may not be available (private mode, SSR)
      logger.tagged('UniversalLEO').warn('localStorage not available:', error);
    }

    // Auto-open functionality disabled
    // const timer = setTimeout(() => {
    //   if (!hasInteracted) {
    //     setIsOpen(true);
    //     // Add welcome message
    //     setMessages([{
    //       role: 'assistant',
    //       content: welcomeMessages[pageContext],
    //     }]);
    //   }
    // }, 10000);

    // return () => clearTimeout(timer);
  }, [hasInteracted, pageContext, storageKey]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText, showEmailForm]);

  // Extract email from text using regex
  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  // Extract structured data from conversation
  const extractDataFromConversation = (messages: Message[]): Record<string, any> => {
    const data: Record<string, any> = {};
    const safeMessagesArray = Array.isArray(messages) ? messages : [];
    const fullConversation = safeMessagesArray.map(m => m.content).join(' ');

    // Extract email
    const email = extractEmail(fullConversation);
    if (email) data.email = email;

    // Extract name (simple heuristic: "I'm X" or "My name is X")
    const nameMatch = fullConversation.match(/(?:I'm|I am|my name is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) data.name = nameMatch[1];

    // For agencies context, extract additional data
    if (pageContext === 'agencies') {
      // Extract company name
      const companyMatch = fullConversation.match(/(?:work at|from|company is|agency is)\s+([A-Z][a-zA-Z\s&]+)/);
      if (companyMatch) data.companyName = companyMatch[1].trim();

      // Extract budget mentions
      if (/100k\+|100,000|six figures/i.test(fullConversation)) data.budget = '100k+';
      else if (/50-100k|50k-100k|50,000-100,000/i.test(fullConversation)) data.budget = '50-100k';
      else if (/10-50k|10k-50k|10,000-50,000/i.test(fullConversation)) data.budget = '10-50k';
      else if (/<10k|under 10k|less than 10,000/i.test(fullConversation)) data.budget = '<10k';

      // Extract urgency
      if (/immediate|urgent|asap|right away|now/i.test(fullConversation)) data.urgency = 'Immediate';
      else if (/1-3 months|next quarter|soon/i.test(fullConversation)) data.urgency = '1-3 months';
      else if (/3-6 months|later this year/i.test(fullConversation)) data.urgency = '3-6 months';
      else if (/exploring|just looking|researching/i.test(fullConversation)) data.urgency = 'Just exploring';

      // Extract agency size
      if (/50\+|more than 50|over 50/i.test(fullConversation)) data.agencySize = '50+';
      else if (/21-50|20-50/i.test(fullConversation)) data.agencySize = '21-50';
      else if (/6-20|10-20/i.test(fullConversation)) data.agencySize = '6-20';
      else if (/1-5|small team|few people/i.test(fullConversation)) data.agencySize = '1-5';
    }

    return data;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
    };

    const newMessages = [...safeMessages, userMessage];
    setMessages(newMessages);
    setInputValue('');

    try {
      // Call AI chat
      const response = await chatMutation.mutateAsync({
        messages: newMessages,
      });

      const fullText = typeof response.content === 'string' ? response.content : '';
      
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
      
      // Store interval in ref for cleanup
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
          };
          
          const updatedMessages = [...newMessages, assistantMessage];
          setMessages(updatedMessages);
          setTypingText('');

          // Show email form inline after first exchange (2 messages: user + assistant)
          if (!emailCaptured && updatedMessages.length >= 2 && !showEmailForm) {
            setShowEmailForm(true);
            // Add email form message
            setMessages([...updatedMessages, {
              role: 'system',
              content: "Before we continue, I'd love to send you personalized insights! Could you share your email?",
              isEmailForm: true,
            }]);
          }

          // Try to extract and save data if email is found
          if (!emailCaptured) {
            const extractedData = extractDataFromConversation(updatedMessages);
            
            if (extractedData.email) {
              setEmailCaptured(true);
              
              // Update session with email capture
              const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
              updateSessionMutation.mutate({
                sessionId,
                emailCaptured: 1,
                capturedEmail: extractedData.email,
                conversationDuration,
                completedAt: new Date(),
              });
              
              // Save based on context
              if (pageContext === 'agencies' && extractedData.companyName) {
                saveAgencyLead.mutateAsync({
                  email: extractedData.email,
                  companyName: extractedData.companyName,
                  agencySize: extractedData.agencySize,
                  budget: extractedData.budget,
                  urgency: extractedData.urgency,
                  techNeeds: undefined,
                }).catch(err => logger.tagged('UniversalLEO').error('Failed to save agency lead:', err));
              } else {
                // Save as LEO contact
                saveLeoContact.mutateAsync({
                  email: extractedData.email,
                  name: extractedData.name || '',
                  conversationContext: JSON.stringify({
                    pageContext,
                    messages: updatedMessages.slice(0, 10),
                    extractedData,
                  }),
                }).catch(err => logger.tagged('UniversalLEO').error('Failed to save contact:', err));
              }
            }
          }
        }
      }, 5);
    } catch (error) {
      logger.tagged('UniversalLEO').error('Chat error:', error);
      // Clear typing interval on error
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setIsTyping(false);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Could you try again?",
        },
      ]);
    }
  };

  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) return;

    setEmailCaptured(true);
    setShowEmailForm(false);
    
    // Remove email form message and add confirmation
    const messagesWithoutForm = safeMessages.filter(m => !m.isEmailForm);
    setMessages([...messagesWithoutForm, {
      role: 'assistant',
      content: `Perfect! Thanks ${nameInput || 'there'}! 🎉 I'll send personalized insights to ${emailInput}. Now, let's continue our conversation!`,
    }]);
    
    // Update session
    const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
    updateSessionMutation.mutate({
      sessionId,
      emailCaptured: 1,
      capturedEmail: emailInput,
      conversationDuration,
      completedAt: new Date(),
    });
    
    // Save contact
    if (pageContext === 'agencies') {
      await saveAgencyLead.mutateAsync({
        email: emailInput,
        companyName: nameInput || undefined,
        agencySize: undefined,
        budget: undefined,
        urgency: undefined,
        techNeeds: undefined,
      }).catch(err => logger.tagged('UniversalLEO').error('Failed to save agency lead:', err));
    } else {
      await saveLeoContact.mutateAsync({
        email: emailInput,
        name: nameInput,
        conversationContext: JSON.stringify({
          pageContext,
          messages: safeMessages.slice(0, 10),
        }),
      }).catch(err => logger.tagged('UniversalLEO').error('Failed to save contact:', err));
    }
    
    // Clear inputs
    setEmailInput('');
    setNameInput('');
  };

  const handleSkipEmail = () => {
    setShowEmailForm(false);
    // Remove email form message and add skip confirmation
    const messagesWithoutForm = safeMessages.filter(m => !m.isEmailForm);
    setMessages([...messagesWithoutForm, {
      role: 'assistant',
      content: "No problem! Let's continue our conversation. 😊",
    }]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, 'true');
      }
    } catch (error) {
      // localStorage may not be available (private mode)
      logger.tagged('UniversalLEO').warn('Failed to save interaction state:', error);
    }
    
    // Add welcome message if no messages yet
    if (safeMessages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: welcomeMessages[pageContext],
      }]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showEmailForm) {
        handleEmailSubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 z-50 group opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Open LEO chat"
        >
          <div className="relative">
            {/* Main button with LEO avatar - subtle, no pulse */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20">
              <img 
                src={getAvatarSrc(currentEmotion)} 
                alt="LEO - AI Assistant" 
                width="40"
                height="40"
                fetchPriority="high"
                className={`w-8 h-8 rounded-full object-cover avatar-${currentEmotion}`}
              />
            </div>

            {/* Online indicator - static, no pulse */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-gradient-to-br from-[oklch(0.35_0.15_300)] via-[oklch(0.40_0.15_320)] to-[oklch(0.35_0.15_340)] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}>
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src={getAvatarSrc(currentEmotion)} 
                alt="LEO - AI Assistant Avatar" 
                width="40"
                height="40"
                className={`w-10 h-10 rounded-full object-cover avatar-${currentEmotion}`}
              />
              <div>
                <h3 className="font-bold text-white">LEO</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-white/60">AI Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {safeMessages.map((message, index) => (
              <div key={index}>
                {message.isEmailForm ? (
                  // Inline Email Form
                  <div className="flex gap-3 justify-start">
                    <img 
                      src={getAvatarSrc('happy')} 
                      alt="LEO - AI Assistant Avatar" 
                      width="32"
                      height="32"
                      loading="lazy"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="max-w-[85%] rounded-2xl px-4 py-4 bg-white/10 backdrop-blur-md text-white border border-cyan-500/30">
                      <p className="text-sm mb-3">{message.content}</p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Your name (optional)"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSkipEmail}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs"
                          >
                            Skip
                          </Button>
                          <Button
                            onClick={handleEmailSubmit}
                            disabled={!emailInput.trim()}
                            size="sm"
                            className="flex-1 bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50 text-xs"
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Message
                  <div
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <img 
                        src={getAvatarSrc(currentEmotion)} 
                        alt="LEO - AI Assistant Avatar" 
                        width="32"
                        height="32"
                        loading="lazy"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-white text-purple-900'
                          : 'bg-white/10 backdrop-blur-md text-white border border-white/10'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <img 
                  src={getAvatarSrc(currentEmotion)} 
                  alt="LEO - AI Assistant Avatar" 
                  width="32"
                  height="32"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/10">
                  <p className="text-sm whitespace-pre-wrap">{typingText}</p>
                </div>
              </div>
            )}
            
            {chatMutation.isPending && !isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white/10 backdrop-blur-md border-t border-white/10 p-4 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                disabled={chatMutation.isPending || showEmailForm}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || chatMutation.isPending || showEmailForm}
                className="bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {emailCaptured && (
              <p className="text-xs text-green-400 mt-2 text-center">
                ✓ Thanks! We'll be in touch soon.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
