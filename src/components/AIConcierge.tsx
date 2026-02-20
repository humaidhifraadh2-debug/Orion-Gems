import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Search } from 'lucide-react';

export default function AIConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: 'Welcome to Orion Gems. I am your personal AI concierge. How may I assist you in finding the perfect piece today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: 'I understand you are looking for something special. Based on your preference for vintage styles, might I suggest our new Art Deco collection?' }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-charcoal text-white p-4 rounded-full shadow-xl hover:bg-gold transition-colors z-40"
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100"
          >
            <div className="bg-charcoal text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sparkles size={18} className="text-gold" />
                <span className="font-serif">Orion Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-gold">
                <X size={18} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-charcoal text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about gifts, sizing, or styles..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gold"
              />
              <button 
                onClick={handleSend}
                className="bg-gold text-white p-2 rounded-full hover:bg-charcoal transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
