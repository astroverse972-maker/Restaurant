

import React, { useState, useMemo } from 'react';
import { menuItems } from '../constants';
import { CartItem, MenuItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingCard } from '../components/FloatingCard';
import { RippleButton } from '../components/RippleButton';
import { PlusCircle, MinusCircle, Trash2, ShoppingCart } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';

const OrderPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [lastAction, setLastAction] = useState<'add' | 'remove' | null>(null);

    const addToCart = (item: MenuItem) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return currentCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...currentCart, { ...item, quantity: 1 }];
        });
        setLastAction('add');
    };

    const removeFromCart = (itemId: number) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return currentCart.map(cartItem =>
                    cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                );
            }
            return currentCart.filter(cartItem => cartItem.id !== itemId);
        });
        setLastAction('remove');
    };
    
    const deleteFromCart = (itemId: number) => {
        setCart(cart => cart.filter(item => item.id !== itemId));
    };

    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
    const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0), [cart]);
    const fillPercentage = useMemo(() => Math.min(100, totalItems * 10), [totalItems]);
    
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Order Online
            </motion.h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {menuItems.map(item => (
                        <FloatingCard key={item.id} className="flex items-center justify-between !p-4">
                           <div className="flex items-center gap-4">
                             <LazyImage src={item.image} alt={item.name} className="w-20 h-20 object-contain fade-edges" />
                             <div>
                               <h3 className="text-xl font-serif text-azure">{item.name}</h3>
                               <p className="text-deep-navy/70">{item.price}</p>
                             </div>
                           </div>
                           <RippleButton onClick={() => addToCart(item)} className="px-6 py-2">
                                Add
                           </RippleButton>
                        </FloatingCard>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <FloatingCard className="sticky top-28">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-serif text-azure">Your Order</h2>
                            <div className="relative">
                                <ShoppingCart size={32} className="text-azure"/>
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 bg-azure/50 rounded-b-lg"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${fillPercentage}%` }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                />
                                <AnimatePresence>
                                {lastAction && (
                                     <motion.div
                                        key={Date.now()}
                                        className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-azure"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.5, 0] }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        onAnimationComplete={() => setLastAction(null)}
                                    />
                                )}
                                </AnimatePresence>
                                {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>}
                            </div>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                             <AnimatePresence>
                                {cart.length === 0 && <p className="text-deep-navy/60 text-center py-8">Your cart is empty.</p>}
                                {cart.map(item => (
                                    <motion.div 
                                      key={item.id} 
                                      layout
                                      initial={{ opacity: 0, x: 50 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -50 }}
                                      className="flex justify-between items-center bg-white/30 p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-bold text-deep-navy">{item.name}</p>
                                            <p className="text-sm text-deep-navy/70">{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => removeFromCart(item.id)}><MinusCircle className="text-azure hover:text-azure/80" size={20}/></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item)}><PlusCircle className="text-azure hover:text-azure/80" size={20}/></button>
                                            <button onClick={() => deleteFromCart(item.id)} className="ml-2"><Trash2 className="text-red-500 hover:text-red-400" size={20}/></button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        {cart.length > 0 && (
                            <div className="mt-6 border-t border-white/30 pt-4">
                                <div className="flex justify-between text-xl font-bold">
                                    <span className="text-deep-navy">Total:</span>
                                    <span className="text-azure">${totalPrice.toFixed(2)}</span>
                                </div>
                                <RippleButton className="w-full mt-6">Checkout</RippleButton>
                            </div>
                        )}
                    </FloatingCard>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;