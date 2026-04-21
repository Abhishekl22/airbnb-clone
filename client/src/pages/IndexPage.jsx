import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaces } from "../../hooks";
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import Carousel from "@/components/ui/Carousel";

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
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
    >
      <div className="mx-auto max-w-7xl py-8">
        {/* 🔹 Carousel Section with animation */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel images={carouselImages} interval={5000} />
        </motion.div>

        {/* 🔹 Animated Places Grid */}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 justify-items-center gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
          <div className="col-span-full flex flex-col items-center p-10 text-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800">
              No places found 🏡
            </h1>
            <p className="mt-3 text-lg font-medium text-gray-600">
              Be the <span className="text-primary font-semibold">first</span> to
              list your property and get noticed!
            </p>

            {/* Call to Action */}
            <button className="mt-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-medium shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1">
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
                className="h-5 w-5"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go Back
            </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IndexPage;
