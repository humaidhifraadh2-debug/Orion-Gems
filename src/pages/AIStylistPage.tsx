import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ChevronLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the occasion?",
    options: ["Everyday Wear", "Special Event", "Gift", "Engagement"],
  },
  {
    id: 2,
    question: "Which metal do you prefer?",
    options: ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"],
  },
  {
    id: 3,
    question: "What is your style?",
    options: ["Classic & Timeless", "Modern & Bold", "Vintage & Romantic", "Minimalist"],
  },
];

export default function AIStylistPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {!showResults && !isAnalyzing && (
          <>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
                <Sparkles size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-midnight mb-4">Orion AI Stylist</h1>
              <p className="text-gray-500">Let us curate a personalized selection just for you.</p>
            </div>

            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                <motion.div 
                  className="h-full bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-serif text-midnight text-center">
                    {QUESTIONS[step].question}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUESTIONS[step].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-300 flex justify-between items-center group ${
                          answers[step] === option
                            ? 'border-midnight bg-midnight text-white'
                            : 'border-gray-100 hover:border-gold/50 hover:bg-gold/5'
                        }`}
                      >
                        <span className="font-medium tracking-wide">{option}</span>
                        {answers[step] === option && <Check size={20} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex justify-between items-center">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className={`flex items-center gap-2 text-sm uppercase tracking-widest transition-colors ${
                    step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-midnight'
                  }`}
                >
                  <ChevronLeft size={16} /> Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[step]}
                  className="bg-midnight text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {step === QUESTIONS.length - 1 ? 'Reveal My Edit' : 'Next Step'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-gray-100 border-t-gold rounded-full mb-8"
            />
            <h2 className="text-2xl font-serif text-midnight mb-2">Analyzing your preferences...</h2>
            <p className="text-gray-500">Our AI is selecting pieces that match your unique style.</p>
          </div>
        )}

        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-serif text-midnight mb-4">Your Curated Edit</h2>
            <p className="text-gray-500 mb-12">Based on your preferences for {answers[0]}, {answers[1]}, and {answers[2]} style.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Recommendation 1" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-midnight text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-full">
                    98% Match
                  </div>
                </div>
                <h3 className="font-serif text-xl text-midnight">Ethereal Diamond Ring</h3>
                <p className="text-gold font-medium">$4,500</p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop" 
                    alt="Recommendation 2" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-midnight text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-full">
                    95% Match
                  </div>
                </div>
                <h3 className="font-serif text-xl text-midnight">Celestial Gold Necklace</h3>
                <p className="text-gold font-medium">$2,800</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => { setShowResults(false); setStep(0); setAnswers({}); }} className="px-8 py-3 border border-gray-200 rounded-full uppercase tracking-widest text-xs hover:border-midnight transition-colors">
                Start Over
              </button>
              <Link to="/shop" className="px-8 py-3 bg-midnight text-white rounded-full uppercase tracking-widest text-xs hover:bg-gold transition-colors">
                View All Collection
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
