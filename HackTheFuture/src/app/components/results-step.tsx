import { FileText, CheckCircle2, AlertTriangle, HelpCircle, RotateCcw, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { FormData } from '@/app/App';
import { getMockResults } from '@/app/utils/mock-data';

interface ResultsStepProps {
  formData: FormData;
  onStartOver: () => void;
}

export function ResultsStep({ formData, onStartOver }: ResultsStepProps) {
  const results = getMockResults(formData.caregiverType!, formData.explanationLevel!);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Success Header */}
      <motion.div variants={itemVariants}>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative">
            <div className="flex items-start gap-5">
              <motion.div 
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              >
                <CheckCircle2 className="w-9 h-9 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Summary Generated Successfully! 
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Document: <span className="font-semibold text-gray-900">{formData.file?.name}</span>
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    {formData.caregiverType?.replace('-', ' ').split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    {formData.explanationLevel?.charAt(0).toUpperCase() + formData.explanationLevel?.slice(1)} Mode
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => window.print()}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                title="Print"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                onClick={onStartOver}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                title="Start over"
                whileHover={{ scale: 1.1, rotate: -180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Section */}
      <motion.div variants={itemVariants}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Plain-English Summary</h3>
          </div>
          <motion.div 
            className="prose prose-gray max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{results.summary}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Daily Care Checklist */}
      <motion.div variants={itemVariants}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Daily Care Checklist</h3>
          </div>
          <div className="space-y-3 relative">
            {results.checklist.map((item, index) => (
              <motion.div
                key={index}
                className="group flex gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <motion.div 
                  className="w-6 h-6 rounded-lg border-2 border-gray-300 group-hover:border-green-500 flex-shrink-0 mt-0.5 transition-colors"
                  whileHover={{ scale: 1.1 }}
                />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Warning Signs */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-amber-200 p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">What to Watch Out For</h3>
          </div>
          <div className="space-y-3 relative">
            {results.warnings.map((warning, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-amber-200 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02, borderColor: 'rgb(251 146 60)' }}
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800 leading-relaxed font-medium">{warning}</span>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-6 p-5 bg-red-100 border-2 border-red-300 rounded-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-red-900 leading-relaxed">
              <strong className="font-bold text-base">⚠️ Emergency:</strong> If you notice any of these warning signs, contact your healthcare provider immediately or call 911.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Questions for Doctor */}
      <motion.div variants={itemVariants}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Questions to Ask the Doctor</h3>
          </div>
          <div className="space-y-3 relative">
            {results.questions.map((question, index) => (
              <motion.div
                key={index}
                className="group flex gap-4 p-4 rounded-xl hover:bg-purple-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {index + 1}
                </motion.div>
                <span className="text-gray-700 leading-relaxed pt-0.5">{question}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex gap-4"
        variants={itemVariants}
      >
        <motion.button
          onClick={onStartOver}
          className="flex-1 px-8 py-4 border-2 border-gray-300 hover:border-gray-400 hover:bg-white/80 text-gray-700 rounded-2xl font-semibold transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Process Another Document
        </motion.button>
        <motion.button
          onClick={() => window.print()}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-xl shadow-indigo-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Print Summary
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
