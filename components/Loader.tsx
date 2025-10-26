import React from 'react';
import { motion } from 'framer-motion';

export const Loader: React.FC = () => (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <motion.div
            className="w-16 h-16 border-4 border-azure border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    </div>
);
