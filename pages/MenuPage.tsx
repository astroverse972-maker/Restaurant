import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { menuItems } from '../constants';
import { MenuItem } from '../types';
import { FloatingCard } from '../components/FloatingCard';
import { LazyImage } from '../components/LazyImage';
import { X } from 'lucide-react';

// Component for the expanded modal view, rendered in a portal
const ExpandedModal: React.FC<{ item: MenuItem; onClose: () => void }> = ({ item, onClose }) => {
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-deep-navy/50 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
                layoutId={`card-container-${item.id}`}
                className="relative z-10 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card itself
            >
                <FloatingCard className="!p-0 cursor-default max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-6">
                        <motion.div layoutId={`image-container-${item.id}`} className="rounded-lg overflow-hidden mb-4">
                             <div className="fade-edges bg-white/20">
                                <LazyImage src={item.image} alt={item.name} className="w-full h-64 object-contain"/>
                            </div>
                        </motion.div>
                        <div className="flex justify-between items-start mb-4">
                            <motion.h3 layoutId={`title-${item.id}`} className="text-3xl font-serif text-deep-navy font-bold">{item.name}</motion.h3>
                            <motion.p layoutId={`price-${item.id}`} className="text-xl text-deep-navy font-bold whitespace-nowrap ml-4">{item.price}</motion.p>
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
                            <h4 className="text-lg font-bold text-azure mb-2">Ingredients:</h4>
                            <ul className="list-disc list-inside text-deep-navy/70 grid sm:grid-cols-2 gap-x-4">
                                {item.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                            </ul>
                        </motion.div>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 text-deep-navy hover:text-azure transition-colors">
                        <X size={28} />
                    </button>
                </FloatingCard>
            </motion.div>
        </motion.div>,
        document.body
    );
};

// Component for a single menu item card
const MenuItemCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
    };
    
    return (
        <motion.div variants={cardVariants} className="h-full">
            <FloatingCard className="cursor-pointer !p-0 overflow-hidden h-full">
                <motion.div layoutId={`card-container-${item.id}`} onClick={onClick} className="flex flex-col h-full p-6">
                    <motion.div layoutId={`image-container-${item.id}`} className="rounded-lg overflow-hidden mb-4">
                        <div className="fade-edges bg-white/20">
                            <LazyImage src={item.image} alt={item.name} className="w-full h-48 object-contain"/>
                        </div>
                    </motion.div>
                    <div className="flex flex-col flex-grow">
                        <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-serif text-azure">{item.name}</motion.h3>
                        <motion.p layoutId={`price-${item.id}`} className="text-deep-navy font-bold">{item.price}</motion.p>
                        <p className="text-deep-navy/70 mt-2 flex-grow">{item.description}</p>
                    </div>
                </motion.div>
            </FloatingCard>
        </motion.div>
    );
};

// The main MenuPage component
const MenuPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    // Effect to lock body scroll when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedItem]);

    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <LayoutGroup>
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
                    <section key={category} className="mb-16">
                        <h2 className="text-4xl font-serif text-deep-navy mb-8 border-b-2 border-deep-navy/20 pb-2">{category}</h2>
                        <motion.div 
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={gridContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {menuItems.filter(item => item.category === category).map(item => (
                                <MenuItemCard 
                                    key={item.id} 
                                    item={item} 
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))}
                        </motion.div>
                    </section>
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ExpandedModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};

export default MenuPage;
