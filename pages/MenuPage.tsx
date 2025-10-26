import React, { useState, MouseEvent, memo, useCallback, useEffect } from 'react';
import { menuItems } from '../constants';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingCard } from '../components/FloatingCard';
import { LazyImage } from '../components/LazyImage';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const MenuCard: React.FC<{ item: MenuItem; onExpand: (item: MenuItem) => void; isExpanded: boolean; index: number }> = memo(({ item, onExpand, isExpanded, index }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const size = card.offsetWidth;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple: Ripple = { x, y, id: Date.now() };

        setRipples([...ripples, newRipple]);

        setTimeout(() => {
            setRipples((prevRipples) => prevRipples.filter(r => r.id !== newRipple.id));
        }, 600);
        
        onExpand(item);
    };

    return (
        <FloatingCard className="cursor-pointer !p-0 overflow-hidden" delay={index * 0.05}>
            <motion.div layout onClick={createRipple} className="relative p-6">
                <motion.div layoutId={`image-${item.id}`} className="rounded-lg overflow-hidden mb-4">
                    <div className="fade-edges bg-white/20">
                         <LazyImage src={item.image} alt={item.name} className="w-full h-48 object-contain"/>
                    </div>
                </motion.div>
                <motion.h3 className="text-2xl font-serif text-azure" layoutId={`title-${item.id}`}>{item.name}</motion.h3>
                <motion.p className="text-deep-navy font-bold" layoutId={`price-${item.id}`}>{item.price}</motion.p>
                <AnimatePresence>
                    {!isExpanded && (
                        <motion.p 
                            className="text-deep-navy/70 mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {item.description}
                        </motion.p>
                    )}
                </AnimatePresence>
                 {ripples.map(ripple => (
                    <motion.span
                    key={ripple.id}
                    className="absolute bg-white/50 rounded-full pointer-events-none"
                    style={{ left: ripple.x, top: ripple.y, width: '200%', paddingTop: '200%' }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                ))}
            </motion.div>
        </FloatingCard>
    );
});

const ExpandedMenuCard: React.FC<{ item: MenuItem; onCollapse: () => void }> = ({ item, onCollapse }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pb-4 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute inset-0 bg-deep-navy/50 backdrop-blur-sm" onClick={onCollapse}></div>
            <motion.div className="relative z-10 w-full max-w-2xl">
                 <FloatingCard className="cursor-default max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <motion.div layoutId={`image-${item.id}`} className="rounded-lg overflow-hidden mb-4">
                        <div className="fade-edges bg-white/20">
                            <LazyImage src={item.image} alt={item.name} className="w-full h-64 object-contain"/>
                        </div>
                    </motion.div>
                    <div className="flex justify-between items-start">
                        <motion.h3 className="text-3xl font-serif text-deep-navy font-bold" layoutId={`title-${item.id}`}>{item.name}</motion.h3>
                        <motion.p className="text-xl text-deep-navy font-bold" layoutId={`price-${item.id}`}>{item.price}</motion.p>
                    </div>
                    <motion.p 
                        className="text-deep-navy/80 my-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    >
                        {item.description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-lg font-bold text-azure/80 mb-2">Ingredients:</h4>
                        <ul className="list-disc list-inside text-deep-navy/70">
                            {item.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                        </ul>
                    </motion.div>
                    <button onClick={onCollapse} className="absolute top-4 right-4 text-deep-navy hover:text-black text-2xl leading-none">&times;</button>
                </FloatingCard>
            </motion.div>
        </motion.div>
    );
}

const MenuPage: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<MenuItem | null>(null);

    useEffect(() => {
        if (expandedItem) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [expandedItem]);

    const categories = ['Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
    
    const handleExpand = useCallback((item: MenuItem) => {
        window.scrollTo(0, 0);
        setExpandedItem(item);
    }, []);

    const handleCollapse = useCallback(() => {
        setExpandedItem(null);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Our Menu
            </motion.h1>

            {categories.map(category => (
                <div key={category} className="mb-16">
                    <h2 className="text-4xl font-serif text-deep-navy mb-8 border-b-2 border-deep-navy/20 pb-2">{category}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menuItems.filter(item => item.category === category).map((item, index) => (
                            <MenuCard 
                                key={item.id} 
                                item={item}
                                onExpand={handleExpand}
                                isExpanded={!!expandedItem && expandedItem.id === item.id}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            ))}
            
            <AnimatePresence>
                {expandedItem && (
                    <ExpandedMenuCard item={expandedItem} onCollapse={handleCollapse} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuPage;