import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { formatPrice } from '../utils';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const allProducts = await productService.getAll();
      setFeaturedProducts((allProducts as any[]).slice(0, 4));
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="border border-white/40 rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                Collection 2025
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-8xl lg:text-9xl font-serif mb-12 tracking-tight italic font-light leading-none"
            >
              Ethereal <br /> Elegance
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6"
            >
              <Link 
                to="/shop" 
                className="bg-white text-midnight px-10 py-4 min-w-[160px] uppercase tracking-widest text-xs font-medium hover:bg-gray-100 transition-colors"
              >
                Explore
              </Link>
              <Link 
                to="/about" 
                className="border border-white text-white px-10 py-4 min-w-[160px] uppercase tracking-widest text-xs font-medium hover:bg-white hover:text-midnight transition-colors"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-[10px] uppercase tracking-[0.3em]"
        >
          Scroll to Discover
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-3 text-midnight">Shop By Category</h2>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto mt-4" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" },
            { title: "Necklaces", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop" },
            { title: "Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop" }
          ].map((collection, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="group relative h-[500px] overflow-hidden rounded-xl"
            >
              <Link to={`/shop?category=${collection.title}`} className="block w-full h-full">
                <img 
                  src={collection.img} 
                  alt={collection.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <h3 className="text-2xl font-serif mb-3 italic">{collection.title}</h3>
                  <span className="inline-flex items-center text-[10px] uppercase tracking-widest border-b border-white/50 pb-1 text-white/80 group-hover:text-white group-hover:border-white transition-colors duration-300">
                    View Collection
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Arrivals */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-gray-50/30 rounded-[2rem] mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-end mb-12 px-4"
        >
          <div>
            <span className="text-gold uppercase tracking-widest text-[10px] font-medium mb-3 block">New In</span>
            <h2 className="text-3xl md:text-4xl font-serif text-midnight">Featured Arrivals</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-xs uppercase tracking-widest text-midnight hover:text-gold transition-colors mt-6 md:mt-0">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
                  <img 
                    src={product.images[0].src} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-lg text-midnight mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-xs tracking-wide">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Storytelling Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=2070&auto=format&fit=crop" 
              alt="Craftsmanship" 
              className="w-full h-[500px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:pl-8 text-center md:text-left"
          >
            <motion.span variants={fadeInUp} className="text-gold uppercase tracking-widest text-[10px] font-medium mb-4 block">Our Heritage</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif mb-6 leading-tight text-midnight">Crafted for the <br/> Modern Muse</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 mb-8 leading-relaxed text-sm font-light max-w-md mx-auto md:mx-0">
              At Orion Gems, we believe that jewelry is more than just adornment—it is a personal signature. 
              Each piece is meticulously handcrafted by master artisans using only the rarest ethically sourced gemstones.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/about" className="inline-block border-b border-midnight text-midnight pb-1 uppercase tracking-widest text-[10px] hover:text-gold hover:border-gold transition-colors">
                Read Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
