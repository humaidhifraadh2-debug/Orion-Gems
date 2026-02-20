import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils';
import { motion } from 'motion/react';
import { Gem, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Column: Form */}
      <div className="flex-1 lg:w-[55%] px-6 lg:px-24 pt-32 pb-12 border-r border-gray-100">
        <div className="max-w-xl mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 mb-12 group">
            <div className="flex items-center gap-2">
              <Gem size={20} strokeWidth={1} className="text-midnight" />
              <span className="text-lg font-serif tracking-[0.2em] font-bold text-midnight">ORION</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Fine Jewellery</span>
          </Link>

          {/* Breadcrumbs */}
          <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
            <span className="text-midnight">Cart</span>
            <ChevronRight size={10} />
            <span className={step >= 1 ? 'text-midnight' : ''}>Information</span>
            <ChevronRight size={10} />
            <span className={step >= 2 ? 'text-midnight' : ''}>Shipping</span>
            <ChevronRight size={10} />
            <span className={step >= 3 ? 'text-midnight' : ''}>Payment</span>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-lg text-midnight">Contact</h2>
                <Link to="/login" className="text-[10px] uppercase tracking-widest underline text-gold hover:text-midnight transition-colors">Log in</Link>
              </div>
              <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
              <div className="flex items-center mt-3">
                <input type="checkbox" id="newsletter" className="mr-2 accent-midnight w-3 h-3" />
                <label htmlFor="newsletter" className="text-xs text-gray-500">Email me with news and offers</label>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-lg text-midnight mb-4">Shipping address</h2>
              <div className="space-y-3">
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight bg-white">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="First name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                  <input type="text" placeholder="Last name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                </div>
                <input type="text" placeholder="Address" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder="City" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                  <input type="text" placeholder="State" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                  <input type="text" placeholder="ZIP code" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
                </div>
                <input type="tel" placeholder="Phone" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all placeholder:text-xs" />
              </div>
            </section>

            <div className="pt-6 flex justify-between items-center">
              <Link to="/cart" className="text-xs text-gray-500 hover:text-midnight flex items-center transition-colors">
                <ChevronRight size={12} className="rotate-180 mr-1" /> Return to cart
              </Link>
              <button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-midnight text-white px-8 py-3 rounded-lg font-medium text-xs uppercase tracking-widest hover:bg-gold transition-colors shadow-lg"
              >
                Continue to shipping
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Right Column: Summary */}
      <div className="flex-1 lg:w-[45%] bg-gray-50 px-6 lg:px-24 pt-32 pb-12 border-l border-gray-100">
        <div className="max-w-md">
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-14 h-14 bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-midnight">{item.name}</h4>
                  <p className="text-[10px] uppercase tracking-wide text-gray-500">{item.category}</p>
                </div>
                <p className="font-medium text-sm text-midnight">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-8">
            <input type="text" placeholder="Discount code" className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-midnight bg-white placeholder:text-xs" />
            <button className="bg-gray-200 text-gray-500 px-6 py-2.5 rounded-lg font-medium text-xs uppercase tracking-widest hover:bg-gray-300 transition-colors">Apply</button>
          </div>
          
          <div className="space-y-3 border-t border-gray-200 pt-6 text-sm">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-midnight">{formatPrice(subtotal())}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1">Shipping <div className="w-3 h-3 bg-gray-200 rounded-full text-[8px] flex items-center justify-center text-gray-500">?</div></span>
              <span className="font-medium text-midnight">Free</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Estimated taxes</span>
              <span className="font-medium text-midnight">{formatPrice(subtotal() * 0.08)}</span>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-4">
              <span className="text-base text-midnight">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 text-[10px]">USD</span>
                <span className="text-2xl font-serif text-midnight">{formatPrice(subtotal() * 1.08)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
