import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import PlacesPage from './PlacesPage';
import { useAuth } from '../../hooks';
import { LogOut, Mail, PenSquare, Text, User, Sparkles } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/');
    } else {
      toast.error(response.message);
    }
  };

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 animate-gradient"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '0s' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></motion.div>

      <div className="relative z-10">
        <AccountNav />
        {subpage === 'profile' && (
          <motion.div 
            className="m-4 flex flex-col items-center gap-8 rounded-3xl glass p-8 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20 shadow-2xl animate-pulse-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar */}
            <motion.div 
              className="flex h-40 w-40 justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-2 sm:h-72 sm:w-72 md:h-96 md:w-96 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="h-full w-full rounded-full bg-white p-2">
                <Avatar className="h-full w-full">
                  {user.picture ? (
                    <AvatarImage src={user.picture} className="object-cover" />
                  ) : (
                    <AvatarImage src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png" className="object-cover"/>
                  )}
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-4xl font-bold">
                    {user.name.slice([0], [1])}
                  </AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
              {/* User Details */}
              <motion.div 
                className="flex flex-col items-center gap-6 sm:items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl">
                    <span className="font-semibold text-gray-700">Name: </span>
                    <span className="gradient-text font-bold">{user.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl">
                    <span className="font-semibold text-gray-700">Email: </span>
                    <span className="gradient-text font-bold">{user.email}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                className="flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <EditProfileDialog />

                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
        {subpage === 'places' && <PlacesPage />}
      </div>
    </div>
  );
};

export default ProfilePage;
