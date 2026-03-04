import { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

interface Question {
  id: string;
  question: string;
  type: 'text' | 'select' | 'multiselect';
  options?: string[];
  field: 'email' | 'companyName' | 'agencySize' | 'techNeeds' | 'budget' | 'urgency';
}

const questions: Question[] = [
  {
    id: '1',
    question: "Hi! 👋 I'm here to help you discover how Nukleo can transform your agency. What's your email?",
    type: 'text',
    field: 'email',
  },
  {
    id: '2',
    question: "Great! What's your agency name?",
    type: 'text',
    field: 'companyName',
  },
  {
    id: '3',
    question: "How many people work at your agency?",
    type: 'select',
    options: ['1-5', '6-20', '21-50', '50+'],
    field: 'agencySize',
  },
  {
    id: '4',
    question: "What technical services are you most interested in? (Select all that apply)",
    type: 'multiselect',
    options: ['AI & Machine Learning', 'Web & Mobile Apps', 'Cloud & DevOps', 'Data & Automation'],
    field: 'techNeeds',
  },
  {
    id: '5',
    question: "What's your typical project budget range?",
    type: 'select',
    options: ['<10k', '10-50k', '50-100k', '100k+'],
    field: 'budget',
  },
  {
    id: '6',
    question: "When are you looking to start a project?",
    type: 'select',
    options: ['Immediate', '1-3 months', '3-6 months', 'Just exploring'],
    field: 'urgency',
  },
];

export default function AgencyQualificationBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const saveLead = trpc.agencies.saveLead.useMutation();

  // Auto-open after 10 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && !hasInteracted && !localStorage.getItem('agencyBotCompleted')) {
          setIsOpen(true);
        }
      } catch (error) {
        // localStorage may not be available
        console.warn('Failed to check agencyBotCompleted:', error);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = async () => {
    if (currentQuestion.type === 'text' && !inputValue.trim()) return;
    if (currentQuestion.type === 'multiselect' && selectedOptions.length === 0) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.field]: currentQuestion.type === 'multiselect' ? selectedOptions : inputValue,
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue('');
      setSelectedOptions([]);
    } else {
      // Submit the lead
      try {
        await saveLead.mutateAsync({
          email: newAnswers.email,
          companyName: newAnswers.companyName,
          agencySize: newAnswers.agencySize,
          techNeeds: newAnswers.techNeeds,
          budget: newAnswers.budget,
          urgency: newAnswers.urgency,
        });
        setIsCompleted(true);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('agencyBotCompleted', 'true');
          }
        } catch (error) {
          console.warn('Failed to save agencyBotCompleted:', error);
        }
      } catch (error) {
        console.error('Error saving lead:', error);
      }
    }
  };

  const handleSelectOption = (option: string) => {
    if (currentQuestion.type === 'multiselect') {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setInputValue(option);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setHasInteracted(true);
        }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-[#523DCB] hover:from-cyan-600 hover:to-[#4630b0] text-white shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-[oklch(0.15_0.05_320)] border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-[#523DCB] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Agency Partner Bot</h3>
            <p className="text-xs text-white/80">Let's find the perfect fit</p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 h-96 overflow-y-auto">
        {!isCompleted ? (
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-[#523DCB] transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/60">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>

            {/* Question */}
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-cyan-500">
              <p className="text-white">{currentQuestion.question}</p>
            </div>

            {/* Input based on type */}
            {currentQuestion.type === 'text' && (
              <div className="space-y-2">
                <input
                  type={currentQuestion.field === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
              </div>
            )}

            {currentQuestion.type === 'select' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                      inputValue === option
                        ? 'border-cyan-500 bg-cyan-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiselect' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                      selectedOptions.includes(option)
                        ? 'border-cyan-500 bg-cyan-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedOptions.includes(option) ? 'border-cyan-500 bg-cyan-500' : 'border-white/40'
                    }`}>
                      {selectedOptions.includes(option) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Next button */}
            <Button
              onClick={handleNext}
              disabled={
                (currentQuestion.type === 'text' && !inputValue.trim()) ||
                (currentQuestion.type === 'select' && !inputValue) ||
                (currentQuestion.type === 'multiselect' && selectedOptions.length === 0) ||
                saveLead.isPending
              }
              className="w-full bg-gradient-to-r from-cyan-500 to-[#523DCB] hover:from-cyan-600 hover:to-[#4630b0] text-white"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Thank You! 🎉</h3>
            <p className="text-white/70">
              We've received your information. Our team will reach out within 24 hours to discuss how we can help your agency grow.
            </p>
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-cyan-500 to-[#523DCB] hover:from-cyan-600 hover:to-[#4630b0] text-white"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
