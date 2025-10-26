import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        transform: 'translateY(50%) skewY(10deg)',
        transformOrigin: 'top center',
    },
    in: {
        opacity: 1,
        transform: 'translateY(0%) skewY(0deg)',
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
        }
    },
    out: {
        opacity: 0,
        transform: 'translateY(-50%) skewY(-10deg)',
        transformOrigin: 'bottom center',
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        }
    }
};

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
};