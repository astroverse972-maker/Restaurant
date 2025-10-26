

import React from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { RippleButton } from '../components/RippleButton';
import { motion } from 'framer-motion';

const formInputVariants = {
  focus: { 
    y: -3,
    borderColor: '#007FFF',
    boxShadow: '0 0 10px rgba(0, 127, 255, 0.5)',
    transition: { type: 'spring', stiffness: 300 }
  },
  blur: { 
    y: 0,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 0 0 rgba(0, 127, 255, 0)',
  }
};

const FormInput: React.FC<{ id: string, label: string, type?: string }> = ({ id, label, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-deep-navy/80 mb-2">{label}</label>
        <motion.input 
            id={id} type={type} required
            className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none placeholder:text-deep-navy/50" 
            whileFocus="focus"
            variants={formInputVariants}
        />
    </div>
);

const ReservationsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <div className="w-full max-w-2xl">
                 <motion.h1 
                    className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Book Your Dive
                </motion.h1>

                <FloatingCard>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormInput id="name" label="Full Name" />
                            <FormInput id="phone" label="Phone Number" type="tel" />
                        </div>
                        <FormInput id="email" label="Email Address" type="email" />
                        <div className="grid md:grid-cols-3 gap-6">
                            <FormInput id="date" label="Date" type="date" />
                            <FormInput id="time" label="Time" type="time" />
                            <div>
                               <label htmlFor="guests" className="block text-deep-navy/80 mb-2">Number of Guests</label>
                               <motion.select 
                                   id="guests" required
                                   className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none appearance-none"
                                   whileFocus="focus"
                                   variants={formInputVariants}
                               >
                                    {[...Array(8)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>)}
                               </motion.select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="requests" className="block text-deep-navy/80 mb-2">Special Requests (optional)</label>
                            <motion.textarea 
                                id="requests" rows={4} 
                                className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none placeholder:text-deep-navy/50"
                                whileFocus="focus"
                                variants={formInputVariants}
                            ></motion.textarea>
                        </div>
                        <div className="text-center pt-4">
                            <RippleButton type="submit" className="w-full md:w-auto">Confirm Reservation</RippleButton>
                        </div>
                    </form>
                </FloatingCard>
            </div>
        </div>
    );
};

export default ReservationsPage;