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
    <div className="relative w-full min-h-screen font-['Work_Sans']">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-32 left-[-5%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.2),_transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(15,118,110,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            className="pt-4 lg:pt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100/80 dark:bg-teal-900/40 rounded-full text-teal-800 dark:text-teal-100 text-sm font-medium mb-6 border border-teal-200/70 dark:border-teal-800/60"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Clarity Engine • Medical PDF
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-5 tracking-tight font-['Space_Grotesk']">
              Transform Medical Jargon into
              <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Clear Instructions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl">
              Upload your discharge summary or treatment plan and get a clean, step-by-step care guide you can act on today.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Plain-language summary', detail: 'Key outcomes, medications, and goals.' },
                { title: 'Daily care checklist', detail: 'Easy routines, tracked in order.' },
                { title: 'Red-flag alerts', detail: 'What requires immediate attention.' },
                { title: 'Doctor questions', detail: 'Bring the right topics to visits.' }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-teal-100/80 dark:border-teal-900/60 bg-white/70 dark:bg-slate-900/50 px-4 py-4 backdrop-blur-sm shadow-sm"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300 font-semibold mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['No account needed', 'PDF only', 'Takes ~30s'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-1 text-sm text-slate-700 dark:text-slate-200"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-teal-100/60 dark:border-teal-900/50 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />

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
                      className={`relative border-2 border-dashed rounded-2xl p-14 text-center transition-all duration-300 ${
                        dragActive
                          ? 'border-teal-500 bg-teal-50/60 scale-[1.02]'
                          : 'border-gray-300/70 hover:border-teal-400 hover:bg-teal-50/40'
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

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-['Space_Grotesk']">
                        Drop your PDF here or click to browse
                      </h3>
                      <p className="text-gray-500 dark:text-gray-300 mb-8">
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
                      <div className="relative flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-900">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/25"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <FileText className="w-7 h-7 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0 pt-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white truncate text-lg mb-1">
                            {selectedFile.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                          </p>
                        </div>
                        <motion.button
                          onClick={() => setSelectedFile(null)}
                          className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors group/button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-5 h-5 text-gray-400 group-hover/button:text-red-600 transition-colors" />
                        </motion.button>
                      </div>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        onClick={() => setSelectedFile(null)}
                        className="flex-1 px-6 py-3.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-white rounded-xl font-medium transition-all"
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
      </div>
    </div>
  );
}
