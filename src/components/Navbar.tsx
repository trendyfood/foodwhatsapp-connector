
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Popular', href: '#popular' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled 
          ? 'py-3 glass-morphism' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold flex items-center text-food-dark">
          <span className="text-food-primary">Food</span>
          <span className="text-food-secondary">Order</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-food-text hover:text-food-primary transition-colors duration-200 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="relative p-2 text-food-dark hover:text-food-primary transition-colors duration-200"
          aria-label="Open shopping cart"
        >
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="quantity-badge">{totalItems}</span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-food-dark"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out transform',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-20 px-8 pb-6">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-medium text-food-text hover:text-food-primary transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
