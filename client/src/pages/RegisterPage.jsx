import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

import { useAuth } from '../../hooks';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.register(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 opacity-90 animate-gradient"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520250497591-112a5c8e1e9e?w=1920')] bg-cover bg-center opacity-30"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: '0s' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 bg-blue-300/30 rounded-full blur-xl animate-float"
        style={{ animationDelay: '1s' }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-300/30 rounded-full blur-xl animate-float"
        style={{ animationDelay: '2s' }}
      ></motion.div>

      {/* Register Card */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="glass rounded-3xl p-8 shadow-2xl animate-pulse-glow">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full mb-4 shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Create Account</h1>
            <p className="text-gray-600">Join us and start your journey</p>
          </motion.div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleFormData}
                  className="pl-12"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleFormData}
                  className="pl-12"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleFormData}
                  className="pl-12"
                />
              </div>
            </motion.div>

            <motion.button 
              className="primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div 
            className="flex items-center gap-4 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <span className="text-gray-500 text-sm font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          </motion.div>

          {/* Google Login */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              text="continue_with"
              width="350"
            />
          </motion.div>

          {/* Login Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-gray-600">
              Already a member?{' '}
              <Link 
                to={'/login'} 
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent hover:underline"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
