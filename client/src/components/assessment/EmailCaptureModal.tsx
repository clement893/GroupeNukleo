import { useState } from 'react';
import { X, Mail, Building, User, Phone, Briefcase } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface EmailCaptureModalProps {
  onSubmit: (data: EmailCaptureData) => void;
  onClose: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
}

export interface EmailCaptureData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  companySize?: string;
  industry?: string;
  consent: boolean;
}

export default function EmailCaptureModal({ onSubmit, onClose, onSkip, showSkip = false }: EmailCaptureModalProps) {
  const { playClick } = useSound();
  const [formData, setFormData] = useState<EmailCaptureData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    industry: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EmailCaptureData, string>>>({});

  const handleChange = (field: keyof EmailCaptureData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EmailCaptureData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.consent) newErrors.consent = 'You must consent to receive the report';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-[#523DCB]/50 border border-white/10 rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Get Your Full AI Readiness Report
          </h2>
          <p className="text-white/70">
            {showSkip 
              ? 'Enter your details to unlock your personalized AI Readiness Report with detailed recommendations, implementation roadmap, and downloadable PDF.'
              : 'Enter your details below to receive your comprehensive assessment report with personalized recommendations.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors`}
                  placeholder="John"
                />
              </div>
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors`}
                  placeholder="Doe"
                />
              </div>
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors`}
                placeholder="john.doe@company.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Company *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors`}
                placeholder="Acme Inc."
              />
            </div>
            {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
          </div>

          {/* Job Title & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Job Title
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="CTO"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Company Size & Industry */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Company Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => handleChange('companySize', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">+1000 employees</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select industry</option>
                <option value="ecommerce-retail">E-commerce & Retail</option>
                <option value="financial-services">Services financiers</option>
                <option value="healthcare-pharma">Santé & Pharma</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="professional-services">Services professionnels</option>
                <option value="saas-tech">Technologie SaaS</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className={`text-sm ${errors.consent ? 'text-red-400' : 'text-white/70'} group-hover:text-white/90 transition-colors`}>
                I consent to receive my AI Readiness Report and agree to be contacted by Nukleo Digital regarding AI transformation services. *
              </span>
            </label>
            {errors.consent && <p className="text-red-400 text-sm mt-1">{errors.consent}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#523DCB] to-rose-500 text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(82,61,203,0.5)] transition-all duration-300"
          >
            Get My Full Report
          </button>

          {showSkip && onSkip && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onSkip();
              }}
              className="w-full py-3 text-white/60 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Skip and view results
            </button>
          )}

          <p className="text-center text-white/40 text-sm">
            * Required fields
          </p>
        </form>
      </div>
    </div>
  );
}
