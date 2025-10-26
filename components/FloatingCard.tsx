import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            style={{ perspective: '1000px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <motion.div
                className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl shadow-black/10 p-6 text-deep-navy ${className}`}
                whileHover={{ 
                    y: -10, 
                    rotateX: 10,
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 255, 0.6)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};