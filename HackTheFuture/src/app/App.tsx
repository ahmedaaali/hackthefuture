import { useState } from 'react';
import { UploadStep } from '@/app/components/upload-step';
import { SelectionStep } from '@/app/components/selection-step';
import { ResultsStep } from '@/app/components/results-step';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CaregiverType = 'parent' | 'spouse' | 'home-nurse';
export type ExplanationLevel = 'simple' | 'detailed';

export interface FormData {
  file: File | null;
  caregiverType: CaregiverType | null;
  explanationLevel: ExplanationLevel | null;
}

export interface AIResults {
  summary: string;
  checklist: string[];
  warnings: string[];
  questions: string[];
}

function App() {
  const [step, setStep] = useState<'upload' | 'selection' | 'results'>('upload');
  const [formData, setFormData] = useState<FormData>({
    file: null,
    caregiverType: null,
    explanationLevel: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (file: File) => {
    setFormData({ ...formData, file });
    setStep('selection');
  };

  const handleSelectionComplete = (caregiverType: CaregiverType, explanationLevel: ExplanationLevel) => {
    setFormData({ ...formData, caregiverType, explanationLevel });
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('results');
    }, 2500);
  };

  const handleStartOver = () => {
    setFormData({
      file: null,
      caregiverType: null,
      explanationLevel: null,
    });
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0"
                whileHover={{ opacity: 0.3 }}
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MediClarify
              </h1>
              <p className="text-sm text-gray-600">Healthcare documents, simplified</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 relative z-10">
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
                <motion.div
                  className="relative w-24 h-24 mx-auto mb-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse" />
                  <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-white" />
                </motion.div>
                <motion.h3
                  className="text-2xl font-semibold text-gray-900 mb-2"
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
                <motion.div
                  className="mt-8 flex gap-2 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-600"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
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
                    onStartOver={handleStartOver}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 pb-8 text-center text-sm text-gray-500 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This is a demo with mock AI responses. Not for actual medical use.
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
