import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaces } from "../../hooks";
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import Carousel from "@/components/ui/Carousel";
import { Sparkles, Home, MapPin } from 'lucide-react';

const IndexPage = () => {
  const { places, loading } = usePlaces();

  // Sample images for carousel
  const carouselImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200",
    "https://images.unsplash.com/photo-1520250497591-112a5c8e1e9e?w=1200",
  ];

  if (loading) {
    return <Spinner />;
  }

  // Animation variants for the cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: 180,
      scale: 0.8
    },
    show: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  // Background animation
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 animate-gradient"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-40 left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '0s' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-40 right-20 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '3s' }}
      ></motion.div>

      <div className="relative z-10 mx-auto max-w-7xl pt-20 sm:pt-24 pb-8 px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text">Discover Amazing Places</h1>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect getaway from our curated collection of stunning properties worldwide
          </p>
        </motion.div>

        {/* Carousel Section with animation */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="glass rounded-3xl overflow-hidden shadow-2xl animate-pulse-glow">
            <Carousel images={carouselImages} interval={5000} />
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div 
          className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Home className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Featured Properties
          </h2>
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
        </motion.div>

        {/* Animated Places Grid */}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 justify-items-center gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {places.length > 0 ? (
              places.map((place, index) => (
                <motion.div
                  key={place._id}
                  className="w-full"
                  variants={item}
                  whileHover="hover"
                  custom={index}
                >
                  <PlaceCard place={place} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full flex flex-col items-center p-8 sm:p-16 text-center glass rounded-3xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-pulse-glow">
                  <Home className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text mb-4">
                  No places found 🏡
                </h1>
                <p className="mt-3 text-base sm:text-lg md:text-xl font-medium text-gray-600 max-w-lg">
                  Be the <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-bold">first</span> to
                  list your property and get noticed!
                </p>

                {/* Call to Action */}
                <motion.button 
                  className="mt-6 sm:mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-6 py-3 sm:px-8 sm:py-4 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-gradient text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Start Exploring
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IndexPage;
