

import React from 'react';
import { specialItems } from '../constants';
import { motion } from 'framer-motion';
import { FloatingCard } from '../components/FloatingCard';
import { LazyImage } from '../components/LazyImage';


const SpecialsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Chef’s Specials
            </motion.h1>

            <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
                {specialItems.map((item, index) => (
                    <FloatingCard key={item.id} delay={index * 0.2}>
                       <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="flex items-center justify-center">
                               <LazyImage src={item.image} alt={item.name} className="w-full h-64 object-contain fade-edges" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-serif text-azure mb-2">{item.name}</h3>
                                <p className="text-lg font-bold text-deep-navy mb-4">{item.price}</p>
                                <p className="italic text-deep-navy/70 mb-4">"{item.tagline}"</p>
                                <p className="text-deep-navy/80">{item.description}</p>
                            </div>
                       </div>
                    </FloatingCard>
                ))}
            </div>
        </div>
    );
};

export default SpecialsPage;