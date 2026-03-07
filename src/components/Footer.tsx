import React from 'react';
import { Heart, Github, Linkedin, Mail, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">
              🟣 DestinAI
            </h3>
            <p className="text-gray-400">
              Smart Travel Recommendations Powered by AI
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="#" 
              className="w-12 h-12 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-24 h-1 bg-purple-600 rounded-full mx-auto mb-8"></div>

          {/* Made with */}
          <div className="text-center text-gray-400 mb-4">
            <div className="mb-2">
              <span>Made by</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-white font-semibold">
              <span className="hover:text-purple-400 transition-colors cursor-pointer">Pranav</span>
              <span className="text-purple-400">•</span>
              <span className="hover:text-purple-400 transition-colors cursor-pointer">Praveen</span>
              <span className="text-purple-400">•</span>
              <span className="hover:text-purple-400 transition-colors cursor-pointer">Rajesh</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2025 DestinAI. Built for educational purposes as a Machine Learning project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;