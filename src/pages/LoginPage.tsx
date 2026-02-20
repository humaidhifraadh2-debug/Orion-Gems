import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Gem, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-midnight/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex flex-col items-center gap-1 mb-8 group">
            <div className="flex items-center gap-2">
              <Gem size={24} strokeWidth={1} className="text-midnight" />
              <span className="text-2xl font-serif tracking-[0.2em] font-bold text-midnight">ORION</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Fine Jewellery</span>
          </Link>
          <h1 className="text-3xl font-serif text-midnight mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to access your exclusive benefits.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-200 py-3 outline-none focus:border-midnight bg-transparent transition-colors text-midnight placeholder-gray-300"
              placeholder="name@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">Password</label>
              <a href="#" className="text-xs text-gold hover:text-midnight transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-200 py-3 outline-none focus:border-midnight bg-transparent transition-colors text-midnight placeholder-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-midnight text-white py-4 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-gold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Not a member yet?{' '}
            <Link to="/register" className="text-midnight font-medium hover:text-gold transition-colors underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
