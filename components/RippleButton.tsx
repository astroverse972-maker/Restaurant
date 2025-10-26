import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
    x: number;
    y: number;
    id: number;
    size: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const RippleButton: React.FC<RippleButtonProps> = ({ children, className = '', ...props }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple: Ripple = { x, y, id: Date.now(), size };
        setRipples(prevRipples => [...prevRipples, newRipple]);

        setTimeout(() => {
            setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
        }, 600);
        
        props.onClick?.(event);
    };

    return (
        <div style={{ perspective: '800px' }} className="inline-block">
             <motion.button
                {...props}
                className={`relative overflow-hidden bg-white/20 backdrop-blur-md border border-white/40 text-deep-navy font-bold py-3 px-8 rounded-lg shadow-lg shadow-black/10 focus:outline-none focus:ring-2 focus:ring-azure ${className}`}
                onClick={createRipple}
                whileTap={{ scale: 0.95 }}
                 whileHover={{ 
                    y: -8, 
                    rotateX: 10,
                    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 255, 0.7)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <span className="relative z-10">{children}</span>
                <AnimatePresence>
                    {ripples.map(({ x, y, id, size }) => (
                        <motion.span
                            key={id}
                            className="absolute bg-white/60 rounded-full pointer-events-none"
                            style={{ left: x, top: y, width: size, height: size }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                    ))}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};