import { useState } from 'react';
import { ChevronLeft, Users, GraduationCap, Heart, Baby, Stethoscope, BookOpen, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import type { CaregiverType, ExplanationLevel } from '@/app/App';

interface SelectionStepProps {
  fileName: string;
  onComplete: (caregiverType: CaregiverType, explanationLevel: ExplanationLevel) => void;
  onBack: () => void;
}

export function SelectionStep({ fileName, onComplete, onBack }: SelectionStepProps) {
  const [caregiverType, setCaregiverType] = useState<CaregiverType | null>(null);
  const [explanationLevel, setExplanationLevel] = useState<ExplanationLevel | null>(null);

  const handleSubmit = () => {
    if (caregiverType && explanationLevel) {
      onComplete(caregiverType, explanationLevel);
    }
  };

  const caregiverOptions: { 
    value: CaregiverType; 
    label: string; 
    description: string;
    icon: typeof Baby;
    gradient: string;
  }[] = [
    { 
      value: 'parent', 
      label: 'Parent', 
      description: 'Caring for a child',
      icon: Baby,
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      value: 'spouse', 
      label: 'Spouse/Partner', 
      description: 'Caring for a partner',
      icon: Heart,
      gradient: 'from-red-500 to-pink-500'
    },
    { 
      value: 'home-nurse', 
      label: 'Home Nurse', 
      description: 'Professional caregiver',
      icon: Stethoscope,
      gradient: 'from-blue-500 to-cyan-500'
    },
  ];

  const levelOptions: { 
    value: ExplanationLevel; 
    label: string; 
    description: string;
    icon: typeof BookOpen;
    gradient: string;
  }[] = [
    { 
      value: 'simple', 
      label: 'Simple', 
      description: 'Easy-to-understand basics',
      icon: BookOpen,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      value: 'detailed', 
      label: 'Detailed', 
      description: 'Comprehensive medical info',
      icon: Zap,
      gradient: 'from-indigo-500 to-purple-500'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5 group-hover:animate-pulse" />
        Back to upload
      </motion.button>

      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Users className="w-4 h-4" />
          Personalization
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Customize Your Summary
        </h2>
        <p className="text-gray-600 text-lg">
          Help us tailor the explanation to your needs
        </p>
        <motion.p 
          className="text-sm text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Analyzing: <span className="font-medium text-gray-700">{fileName}</span>
        </motion.p>
      </motion.div>

      <div className="space-y-8">
        {/* Caregiver Type Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-teal-100/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Who is the caregiver?</h3>
                <p className="text-sm text-gray-600">This helps us adjust the language and focus</p>
              </div>
            </div>

            <div className="grid gap-4 relative">
              {caregiverOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = caregiverType === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setCaregiverType(option.value)}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="caregiver-selected"
                        className={`absolute -inset-0.5 bg-gradient-to-r ${option.gradient} rounded-2xl blur opacity-50`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-transparent bg-white shadow-lg'
                        : 'border-gray-200 bg-white/50 hover:border-gray-300 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-lg">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Explanation Level Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-teal-100/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center shadow-lg shadow-cyan-500/25"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Explanation level</h3>
                <p className="text-sm text-gray-600">Choose how detailed you want the information</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              {levelOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = explanationLevel === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setExplanationLevel(option.value)}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="level-selected"
                        className={`absolute -inset-0.5 bg-gradient-to-r ${option.gradient} rounded-2xl blur opacity-50`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-transparent bg-white shadow-lg'
                        : 'border-gray-200 bg-white/50 hover:border-gray-300 hover:bg-white'
                    }`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-md mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-semibold text-gray-900 text-lg mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!caregiverType || !explanationLevel}
          className={`relative w-full px-8 py-4 rounded-2xl font-semibold text-lg transition-all overflow-hidden ${
            caregiverType && explanationLevel
              ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 text-white shadow-2xl shadow-teal-500/40'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={caregiverType && explanationLevel ? { scale: 1.02 } : {}}
          whileTap={caregiverType && explanationLevel ? { scale: 0.98 } : {}}
        >
          {caregiverType && explanationLevel && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ opacity: 0.3 }}
            />
          )}
          <span className="relative z-10">Generate Summary ✨</span>
        </motion.button>
      </div>
    </div>
  );
}
