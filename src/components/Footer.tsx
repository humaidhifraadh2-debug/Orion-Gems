import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col items-start gap-1 mb-6 group">
              <span className="text-xl font-serif tracking-[0.2em] font-bold text-gold">ORION</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Fine Jewellery</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting timeless elegance with the world's finest gemstones. 
              Experience the pinnacle of luxury and artistry.
            </p>
          </div>

          <div>
            <h4 className="text-gold font-serif mb-6">Collections</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">High Jewelry</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Bridal</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Watches</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Gifts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-serif mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/care" className="hover:text-white transition-colors">Jewelry Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-serif mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex border-b border-gray-600 pb-2">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
              />
              <button className="text-gold uppercase text-xs tracking-widest hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Orion Gems. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
