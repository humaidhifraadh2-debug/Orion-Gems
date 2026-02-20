import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Share2, ChevronRight, Star, Loader2, Ruler, Diamond } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils';
import { productService } from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('18k Gold');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await productService.getById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images[0].src,
        category: product.categories[0].name,
        quantity: quantity,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest mb-8">
        <span>Home</span>
        <ChevronRight size={12} />
        <span>Shop</span>
        <ChevronRight size={12} />
        <span>{product.categories[0].name}</span>
        <ChevronRight size={12} />
        <span className="text-midnight font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {product.images.map((img: any, idx: number) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-midnight' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img.src} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={selectedImage}
            className="flex-1 aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden relative"
          >
            <img src={product.images[selectedImage].src} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur text-midnight text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Try Something New
              </span>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-8 sticky top-32 h-fit">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium text-gold uppercase tracking-widest border border-gold px-2 py-1 rounded mb-3 inline-block">
                {product.categories[0].name}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-midnight mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">(24 Reviews)</span>
              </div>
              <p className="text-2xl font-medium text-midnight">{formatPrice(product.price)}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 rounded-full border border-gray-200 hover:border-gold hover:text-gold transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-3 rounded-full border border-gray-200 hover:border-red-400 hover:text-red-400 transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>

          <div className="prose prose-sm text-gray-500 border-l-2 border-gold pl-4 italic">
            <p>{product.description}</p>
          </div>

          {/* Material Selection */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-midnight mb-3">Material</h3>
            <div className="flex flex-wrap gap-3">
              {['18k Gold', 'White Gold', 'Rose Gold', 'Platinum'].map((material) => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedMaterial === material 
                      ? 'bg-midnight text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-midnight'
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm uppercase tracking-widest text-midnight">Size</h3>
              <button className="text-xs text-gray-400 underline hover:text-midnight flex items-center gap-1">
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['4', '5', '6', '7', '8', '9'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                    selectedSize === size 
                      ? 'bg-midnight text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-midnight'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 px-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-gold">-</button>
              <span className="mx-4 w-4 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-gold">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-midnight text-white py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-gold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Add to Bag
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-[10px] uppercase tracking-widest text-gray-400 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-midnight">
                <Diamond size={14} />
              </div>
              <span>Authentic</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-midnight">
                <Share2 size={14} />
              </div>
              <span>Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-midnight">
                <Star size={14} />
              </div>
              <span>Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
