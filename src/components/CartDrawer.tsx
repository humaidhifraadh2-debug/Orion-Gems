import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../utils';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-midnight/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-midnight" />
                <h2 className="text-2xl font-serif text-midnight">Your Bag ({items.length})</h2>
              </div>
              <button onClick={toggleCart} className="text-gray-400 hover:text-midnight transition-colors p-2 hover:bg-gray-50 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-gray-500 mb-6 font-medium">Your shopping bag is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-midnight border-b border-midnight hover:text-gold hover:border-gold transition-colors pb-1 uppercase tracking-widest text-xs"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg leading-tight text-midnight">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-midnight transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="mx-3 text-sm w-4 text-center font-medium text-midnight">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-midnight transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-medium text-midnight">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="text-2xl font-serif text-midnight">{formatPrice(subtotal())}</span>
                </div>
                <p className="text-xs text-gray-400 mb-8 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link 
                  to="/checkout" 
                  onClick={toggleCart}
                  className="block w-full bg-midnight text-white text-center py-4 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-gold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
