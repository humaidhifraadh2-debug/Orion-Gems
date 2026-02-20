import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, Heart, MapPin, LogOut, Sparkles, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'orders', label: 'My Order', icon: Package },
    { id: 'address', label: 'Saved Address', icon: MapPin },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-midnight mb-4">Please Log In</h2>
          <p className="text-gray-500 mb-8">You need to be logged in to view your dashboard.</p>
          <Link to="/login" className="bg-midnight text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-gold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-midnight">Welcome, {user.firstName}</h1>
        <p className="text-gray-500">Manage your account and view your orders.</p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-midnight text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium bg-white text-gray-500 hover:bg-red-50 hover:text-red-500 border border-gray-200 transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto">
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* AI Stylist Banner */}
            <div className="bg-gradient-to-r from-midnight to-gray-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <Sparkles size={20} />
                    <span className="text-xs uppercase tracking-widest font-medium">New Feature</span>
                  </div>
                  <h2 className="text-3xl font-serif mb-4">Orion AI Stylist</h2>
                  <p className="text-gray-300 max-w-md">Get personalized jewelry recommendations based on your unique style and upcoming occasions.</p>
                </div>
                <Link to="/stylist" className="bg-white text-midnight px-8 py-3 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-gold hover:text-white transition-all shadow-lg whitespace-nowrap">
                  Start Consultation
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-midnight/5 rounded-full flex items-center justify-center mx-auto mb-4 text-midnight">
                  <Package size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Total Orders</h3>
                <p className="text-4xl font-serif text-midnight">12</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Loyalty Tier</h3>
                <p className="text-4xl font-serif text-midnight">Platinum</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                  <Heart size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Wishlist Items</h3>
                <p className="text-4xl font-serif text-midnight">4</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-serif text-xl text-midnight">Recent Orders</h3>
                <button className="text-xs uppercase tracking-widest text-gold hover:text-midnight transition-colors">View All</button>
              </div>
              <div>
                {[1, 2, 3].map((order, idx) => (
                  <div key={order} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                         <img src={`https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop`} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-midnight">Order #LE-SGJTQZ</p>
                        <p className="text-sm text-gray-500">Feb {19 - idx}, 2026</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-midnight">$3,450.00</p>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] uppercase tracking-widest rounded mt-1">
                        Processing
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl mb-8 text-midnight">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">First Name</label>
                <input type="text" defaultValue={user.firstName} className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Last Name</label>
                <input type="text" defaultValue={user.lastName} className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Email Address</label>
                <input type="email" defaultValue={user.email} className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-midnight focus:ring-1 focus:ring-midnight transition-all" />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button className="bg-midnight text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-gold transition-colors">
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
