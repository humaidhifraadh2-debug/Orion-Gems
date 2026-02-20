import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Gem } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'motion/react';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, items } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  
  // Only transparent on homepage
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isHome && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-midnight';
  const bgClass = isHome && !isScrolled ? 'bg-transparent' : 'bg-white shadow-sm';
  const paddingClass = isScrolled ? 'py-5' : 'py-8';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} ${paddingClass}`}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Navigation */}
          <div className={`hidden md:flex items-center space-x-10 text-xs font-medium uppercase tracking-[0.15em] ${textColorClass}`}>
            <Link to="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
            <Link to="/shop?category=New" className="hover:opacity-70 transition-opacity">New Arrivals</Link>
            <Link to="/shop" className="hover:opacity-70 transition-opacity">Collections</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${textColorClass}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Center Logo */}
          <Link to="/" className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group ${textColorClass}`}>
            <div className="flex items-center gap-3">
              <Gem size={22} strokeWidth={1} />
              <span className="text-2xl font-serif tracking-[0.25em] font-bold">ORION</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-70">Fine Jewellery</span>
          </Link>

          {/* Right Navigation & Icons */}
          <div className={`flex items-center space-x-8 ${textColorClass}`}>
            <div className="hidden md:flex items-center space-x-10 text-xs font-medium uppercase tracking-[0.15em]">
              <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
              <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-70 transition-opacity"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <Link 
                to={isAuthenticated ? "/dashboard" : "/login"} 
                className="hidden md:block hover:opacity-70 transition-opacity"
              >
                <User size={22} strokeWidth={1.5} />
              </Link>
              <button 
                className="hover:opacity-70 transition-opacity relative"
                onClick={toggleCart}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full ${isHome && !isScrolled ? 'bg-white text-midnight' : 'bg-midnight text-white'}`}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 bg-white z-50 flex flex-col p-8 md:hidden text-midnight"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-serif font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col space-y-6 text-xl font-serif">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/shop?category=New" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setIsMobileMenuOpen(false)}>
                  {isAuthenticated ? "My Account" : "Sign In"}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
