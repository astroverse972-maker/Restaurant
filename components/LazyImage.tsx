import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '1200px 0px 1200px 0px' } // Load 1200px before it enters viewport vertically
        );

        const currentRef = placeholderRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    if (!isLoaded) {
        return (
            <div 
                ref={placeholderRef}
                className={`${className} bg-white/20 caustics-filter animate-pulse`} 
            />
        );
    }

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            {...props}
        />
    );
};
