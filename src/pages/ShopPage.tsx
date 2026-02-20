import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatPrice } from '../utils';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { productService } from '../services/api';

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getByCategory(selectedCategory);
        setProducts(data as any[]);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-midnight">Shop Collection</h1>
          <p className="text-gray-500 max-w-md">Discover our latest arrivals, crafted with precision and passion for the modern connoisseur.</p>
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-midnight pb-1 mt-8 md:mt-0 hover:text-gold hover:border-gold transition-colors"
        >
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0, height: isFilterOpen ? 'auto' : 0 }}
          className={`overflow-hidden md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'}`}
        >
          <div className="space-y-12 sticky top-32">
            <div>
              <h3 className="font-serif text-lg mb-6 text-midnight flex items-center justify-between">
                Categories <ChevronDown size={14} />
              </h3>
              <ul className="space-y-4 text-sm text-gray-500">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategoryChange(cat)}
                      className={`hover:text-gold transition-colors flex items-center space-x-2 ${selectedCategory === cat ? 'text-midnight font-medium' : ''}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-gold' : 'bg-transparent'}`} />
                      <span>{cat}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-6 text-midnight flex items-center justify-between">
                Price Range <ChevronDown size={14} />
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>$0</span>
                  <span>$10,000+</span>
                </div>
                <input type="range" min="0" max="10000" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-midnight" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-6 text-midnight flex items-center justify-between">
                Material <ChevronDown size={14} />
              </h3>
              <div className="space-y-3 text-sm text-gray-500">
                <label className="flex items-center space-x-3 cursor-pointer hover:text-midnight">
                  <input type="checkbox" className="rounded border-gray-300 text-midnight focus:ring-midnight" />
                  <span>18k Gold</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:text-midnight">
                  <input type="checkbox" className="rounded border-gray-300 text-midnight focus:ring-midnight" />
                  <span>White Gold</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:text-midnight">
                  <input type="checkbox" className="rounded border-gray-300 text-midnight focus:ring-midnight" />
                  <span>Rose Gold</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:text-midnight">
                  <input type="checkbox" className="rounded border-gray-300 text-midnight focus:ring-midnight" />
                  <span>Platinum</span>
                </label>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <div className="flex-1 min-h-[50vh]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gold" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-6 rounded-2xl">
                    <img 
                      src={product.images[0].src} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Quick Add Button */}
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-midnight px-6 py-3 rounded-full text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-midnight hover:text-white shadow-lg whitespace-nowrap">
                      Quick View
                    </button>
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl mb-2 text-midnight group-hover:text-gold transition-colors duration-300">{product.name}</h3>
                    <p className="text-gray-500 text-sm font-medium">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
