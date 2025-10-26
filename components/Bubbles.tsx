
import React from 'react';
import { motion } from 'framer-motion';

const Bubble: React.FC<{ size: number; x: number; delay: number; duration: number }> = ({ size, x, delay, duration }) => {
    return (
        <motion.div
            className="absolute bottom-[-10vh] rounded-full bg-aquamarine/20"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: '-120vh', opacity: [1, 1, 0] }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "linear",
                repeat: Infinity,
                repeatType: 'loop'
            }}
        />
    );
};

export const Bubbles: React.FC = () => {
    const bubbles = React.useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        size: Math.random() * 30 + 10,
        x: Math.random() * 100,
        delay: Math.random() * 25,
        duration: Math.random() * 15 + 10,
    })), []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
            {bubbles.map(bubble => (
                <Bubble key={bubble.id} {...bubble} />
            ))}
        </div>
    );
};
