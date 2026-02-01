import { useState } from 'react';
import { useTheme } from 'next-themes';
import { UploadStep } from '@/app/components/upload-step';
import { SelectionStep } from '@/app/components/selection-step';
import { ResultsStep } from '@/app/components/results-step';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CaregiverType = 'parent' | 'spouse' | 'home-nurse';
export type ExplanationLevel = 'simple' | 'detailed';
export type Language = 'en' | 'es' | 'zh' | 'ar' | 'fr';

export interface FormData {
  file: File | null;
  caregiverType: CaregiverType | null;
  explanationLevel: ExplanationLevel | null;
  language: Language;
}

export interface AIResults {
  summary: string;
  checklist: string[];
  warnings: string[];
  questions: string[];
}

const API_URL = 'http://localhost:3001';

function App() {
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState<'upload' | 'selection' | 'results'>('upload');
  const [formData, setFormData] = useState<FormData>({
    file: null,
    caregiverType: null,
    explanationLevel: null,
    language: 'en',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleFileUpload = (file: File) => {
    setFormData({ ...formData, file });
    setError(null);
    setStep('selection');
  };

  const handleSelectionComplete = async (caregiverType: CaregiverType, explanationLevel: ExplanationLevel, language: Language) => {
    setFormData({ ...formData, caregiverType, explanationLevel, language });
    setIsProcessing(true);
    setError(null);

    try {
      // Create form data for API request
      const apiFormData = new window.FormData();
      apiFormData.append('file', formData.file!);
      apiFormData.append('caregiverType', caregiverType);
      apiFormData.append('explanationLevel', explanationLevel);
      apiFormData.append('language', language);

      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: apiFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const results: AIResults = await response.json();
      setAiResults(results);
      setStep('results');
    } catch (err) {
      console.error('Error analyzing document:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartOver = () => {
    setFormData({
      file: null,
      caregiverType: null,
      explanationLevel: null,
      language: 'en',
    });
    setAiResults(null);
    setError(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Lightweight CSS-animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Static gradient orbs with subtle CSS animation */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-cyan-300/10 dark:from-teal-600/10 dark:to-cyan-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-sky-400/15 to-blue-300/10 dark:from-sky-600/10 dark:to-blue-500/5 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-400/15 to-teal-300/10 dark:from-emerald-600/10 dark:to-teal-500/5 rounded-full blur-3xl animate-[pulse_9s_ease-in-out_infinite_2s]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 128 128) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-teal-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-5">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-7 h-7 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white/20"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  MediClarify
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare documents, simplified</p>
              </div>
            </div>
            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`relative z-10 ${step === 'upload' ? 'w-full max-w-none px-6 py-10' : 'max-w-6xl mx-auto px-6 py-16'}`}
      >
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <p className="font-medium text-red-900">Error processing document</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={handleStartOver}
                  className="mt-3 text-sm font-medium text-red-700 hover:text-red-900 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[500px]"
            >
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  {/* Simple CSS spinner */}
                  <div className="absolute inset-0 rounded-full border-4 border-teal-100 border-t-teal-500 animate-spin" />
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 animate-pulse" />
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-white z-10" />
                </div>
                <motion.h3
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Analyzing your document...
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Our AI is reading and simplifying the medical information
                </motion.p>
                <div className="mt-8 flex gap-2 justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {step === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <UploadStep onFileUpload={handleFileUpload} />
                </motion.div>
              )}
              {step === 'selection' && (
                <motion.div
                  key="selection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <SelectionStep
                    fileName={formData.file?.name || ''}
                    onComplete={handleSelectionComplete}
                    onBack={() => setStep('upload')}
                  />
                </motion.div>
              )}
              {step === 'results' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ResultsStep
                    formData={formData}
                    results={aiResults!}
                    onStartOver={handleStartOver}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 pb-8 text-center text-sm text-gray-500 dark:text-gray-400 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AI-powered analysis for educational purposes. Not for actual medical decisions.
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
