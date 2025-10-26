
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeLinkClass = "bg-azure text-white";
    const inactiveLinkClass = "text-deep-navy";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg border-b border-white/30">
            <nav className="container mx-auto px-4 flex items-center h-20">
                <NavLink to="/" className="text-3xl font-serif text-deep-navy font-bold mr-auto flex-shrink-0">
                    AquaGrill
                </NavLink>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
                    {navLinks.map((link) => (
                         <li key={link.path} style={{ perspective: '500px' }}>
                            <motion.div
                                whileHover={{ y: -5, rotateX: 15 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block px-3 lg:px-4 py-2 rounded-full transition-colors duration-300 text-sm lg:text-base whitespace-nowrap ${isActive ? activeLinkClass : inactiveLinkClass} hover:text-white hover:bg-azure/80`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </motion.div>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-deep-navy focus:outline-none">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-20 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/30 overflow-hidden"
                    >
                        <ul className="flex flex-col items-center p-8 space-y-6">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 text-2xl font-serif ${isActive ? 'text-azure font-bold' : 'text-deep-navy'}`
                                        }
                                    >
                                        <link.icon size={24} />
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
