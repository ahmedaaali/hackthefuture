import { useRef, useState } from 'react';
import { Upload, FileText, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadStepProps {
  onFileUpload: (file: File) => void;
}

export function UploadStep({ onFileUpload }: UploadStepProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Document Analysis
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Transform Medical Jargon into
          <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
            Clear Instructions
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your hospital discharge summary or treatment plan, and we'll provide you with easy-to-understand care instructions
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-teal-100/50 p-10 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50/50 scale-[1.02]'
                      : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleChange}
                  />

                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Drop your PDF here or click to browse
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Supports PDF files up to 10MB
                  </p>

                  <motion.button
                    onClick={() => inputRef.current?.click()}
                    className="group relative px-8 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-medium shadow-lg shadow-teal-500/25 transition-all overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Select File</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      layoutId="buttonBackground"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <motion.div
                  className="relative group"
                  layoutId="file-card"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative flex items-start gap-4 p-6 bg-white rounded-2xl border border-teal-200">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/25"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="font-semibold text-gray-900 truncate text-lg mb-1">
                        {selectedFile.name}
                      </h4>
                      <p className="text-gray-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setSelectedFile(null)}
                      className="p-2.5 hover:bg-red-50 rounded-xl transition-colors group/button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover/button:text-red-600 transition-colors" />
                    </motion.button>
                  </div>
                </motion.div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setSelectedFile(null)}
                    className="flex-1 px-6 py-3.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choose Different File
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-medium shadow-lg shadow-teal-500/25 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
