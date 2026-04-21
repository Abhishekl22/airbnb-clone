import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920')] bg-cover bg-center opacity-20"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: '0s' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></motion.div>

      <div className="relative z-10 flex w-full justify-center pb-8 pt-12">
        <div className="flex w-full max-w-screen-xl flex-col items-center px-6">
          {/* Grid for links */}
          <motion.div 
            className="grid w-full grid-cols-1 gap-8 py-8 text-sm md:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Support Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  💬
                </span>
                Support
              </h3>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Help Center
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Safety Information
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  AirCover
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Anti-discrimination
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Disability Support
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Cancellation Options
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Report Neighborhood Concern
                </span>
              </p>
            </div>

            {/* Hosting Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🏠
                </span>
                Hosting
              </h3>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Airbnb Your Home
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  AirCover for Hosts
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Hosting Resources
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Community Forum
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Hosting Responsibly
                </span>
              </p>
            </div>

            {/* Airbnb Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ✨
                </span>
                Airbnb
              </h3>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Newsroom
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  New Features
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Careers
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Investors
                </span>
              </p>
              <p>
                <span className="cursor-pointer font-normal text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  Airbnb.org Emergency Stays
                </span>
              </p>
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <div className="my-6 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Bottom Section */}
          <motion.div 
            className="flex w-full flex-col items-center justify-between gap-6 md:gap-0 lg:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Language & Currency */}
            <div className="mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto">
              <div className="flex items-center gap-3 text-sm font-semibold text-white glass px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                <Globe className="w-5 h-5" />
                <span>English(IN)</span>
                <span className="mx-2">|</span>
                <span>₹ INR</span>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                <motion.a 
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a 
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a 
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>

            {/* Copyright & Links */}
            <div className="flex w-full flex-col gap-4 px-1 font-normal text-white/90 md:w-auto md:flex-row md:items-center md:gap-8">
              <p className="text-sm flex items-center gap-2">
                &copy; 2024 Airbnb Clone. Made with 
                <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
              </p>
              <div>
                <ul className="flex gap-6 text-sm text-white/90">
                  <li className="cursor-pointer hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                    Privacy
                  </li>
                  <li className="cursor-pointer hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                    Terms
                  </li>
                  <li className="cursor-pointer hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                    Sitemap
                  </li>
                  <li className="cursor-pointer hover:text-white hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                    Company Details
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
