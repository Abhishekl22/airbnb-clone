import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogOut, User } from 'lucide-react';

import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = auth;

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    if (location.pathname === '/') {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <header
      className={`fixed top-0 z-50 flex w-screen justify-center py-4 transition-all duration-300 ${
        hasShadow ? 'shadow-2xl' : ''
      } glass`}
    >
      <div
        className={`flex ${
          showSearchBar ? 'justify-around' : 'justify-between px-6'
        } w-full max-w-screen-xl items-center`}
      >
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110"
              src="https://cdn-icons-png.flaticon.com/512/2111/2111320.png"
              alt="Airbnb Logo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="hidden sm:block text-xl sm:text-2xl font-bold gradient-text md:block">
            airbnb
          </span>
        </a>

        {showSearchBar && <SearchBar />}

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/account"
                className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <Link
                to="/account"
                className="flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white/80 py-2 px-2 sm:px-3 hover:border-purple-500 hover:shadow-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                <div className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] overflow-hidden rounded-full border-2 border-purple-300">
                  <Avatar>
                    {user?.picture ? (
                      <AvatarImage src={user.picture} className="h-full w-full object-cover" />
                    ) : (
                      <AvatarImage
                        src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 sm:gap-3 rounded-full border-2 border-purple-300 bg-white/80 py-2 px-3 sm:px-4 hover:border-purple-500 hover:shadow-lg transition-all duration-300"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              <div className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] overflow-hidden rounded-full border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
