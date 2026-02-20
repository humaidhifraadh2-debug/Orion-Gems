import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Diamond, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setIsAiMode(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-xl flex flex-col items-center justify-start pt-32 px-6"
        >
          {/* Background Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <Diamond size={600} strokeWidth={0.5} />
          </div>

          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/60 hover:text-white flex items-center gap-2 group transition-colors"
          >
            <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
            <div className="border border-white/20 rounded-full p-2 group-hover:border-white transition-colors">
              <X size={24} />
            </div>
          </button>

          <div className="w-full max-w-3xl relative z-10">
            {/* AI Toggle */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setIsAiMode(!isAiMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  isAiMode 
                    ? 'bg-gold text-midnight shadow-[0_0_20px_rgba(197,160,89,0.3)]' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <Sparkles size={14} />
                <span>{isAiMode ? 'AI Smart Search Active' : 'Enable AI Smart Search'}</span>
              </button>
            </div>

            <div className="relative mb-16 group">
              <input
                type="text"
                placeholder={isAiMode ? "Ask Orion: 'Find me a gold necklace for a wedding'..." : "Type to search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-5xl font-serif text-white placeholder-white/20 outline-none focus:border-gold transition-colors text-center"
                autoFocus
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors">
                <ArrowRight size={32} />
              </button>
            </div>

            {!searchTerm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-gold text-xs uppercase tracking-widest mb-6 font-medium">Trending Now</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Diamond Rings', 'Gold Chains', 'Pearl Earrings', 'Bridal Sets'].map((term) => (
                      <button 
                        key={term}
                        className="px-6 py-2 border border-white/10 rounded-full text-white/60 hover:border-gold hover:text-gold transition-all text-sm font-serif italic"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gold text-xs uppercase tracking-widest mb-6 font-medium">Collections</h3>
                  <ul className="space-y-4">
                    {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((collection) => (
                      <li key={collection}>
                        <Link to={`/shop?category=${collection}`} onClick={onClose} className="text-2xl font-serif text-white/40 hover:text-white transition-colors flex items-center gap-4 group">
                          <span className="w-12 h-[1px] bg-white/10 group-hover:bg-gold transition-colors" />
                          {collection}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {searchTerm && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[1, 2, 3].map((i) => (
                  <Link to={`/product/${i}`} key={i} onClick={onClose} className="group bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-colors">
                    <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop`} alt="Result" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="text-white font-serif mb-1">Ethereal Diamond Ring</h4>
                    <p className="text-white/50 text-sm">$4,500</p>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
