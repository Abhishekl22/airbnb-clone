import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, MapPin, Sparkles, Briefcase } from 'lucide-react';

import AccountNav from '@/components/ui/AccountNav';
import PlaceImg from '@/components/ui/PlaceImg';
import BookingDates from '@/components/ui/BookingDates';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get('/bookings');
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 animate-gradient"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-40 left-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '0s' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-40 right-20 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <AccountNav />
        
        {/* Section Header */}
        <motion.div 
          className="flex items-center gap-3 mb-8 px-4 mt-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Briefcase className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            My Bookings
          </h2>
          <Sparkles className="w-8 h-8 text-pink-600 animate-pulse" />
        </motion.div>

        <div className="w-full max-w-5xl px-4">
          {bookings?.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/account/bookings/${booking._id}`}
                    className="block group"
                  >
                    <div className="glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover-lift animate-pulse-glow">
                      <div className="flex h-32 gap-4 md:h-48">
                        <div className="w-2/6 md:w-1/4 overflow-hidden">
                          {booking?.place?.photos[0] && (
                            <PlaceImg
                              place={booking?.place}
                              className={'h-full w-full object-cover group-hover:scale-110 transition-transform duration-500'}
                            />
                          )}
                        </div>
                        <div className="flex grow flex-col justify-center py-4 pr-6">
                          <h2 className="text-xl md:text-3xl font-bold gradient-text mb-3">
                            {booking?.place?.title}
                          </h2>
                          
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            <span className="text-sm md:text-base">{booking?.place?.address}</span>
                          </div>

                          <div className="hidden md:flex items-center gap-2 text-gray-600 mb-3">
                            <Calendar className="w-5 h-5 text-pink-600" />
                            <BookingDates
                              booking={booking}
                              className="text-sm"
                            />
                          </div>

                          <div className="flex items-center gap-2 mt-auto">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg md:text-2xl font-bold gradient-text">
                              ₹{booking.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="glass rounded-3xl p-16 text-center shadow-2xl animate-pulse-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold gradient-text mb-4">
                No trips booked... yet!
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto mb-8">
                Time to dust off your bags and start planning your next adventure
              </p>
              <Link to="/">
                <motion.button 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-8 py-4 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-gradient"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Start Searching
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
