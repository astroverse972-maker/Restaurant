
import React from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { RippleButton } from '../components/RippleButton';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

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

const ContactPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Dive In & Reach Out
            </motion.h1>

            <div className="grid lg:grid-cols-2 gap-12">
                <FloatingCard>
                    <h2 className="text-3xl font-serif text-azure mb-6">Send a Message in a Bottle</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-deep-navy/80 mb-2">Name</label>
                            <motion.input 
                                id="name" type="text" 
                                className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none placeholder:text-deep-navy/50" 
                                whileFocus="focus"
                                variants={formInputVariants}
                            />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-deep-navy/80 mb-2">Email</label>
                            <motion.input 
                                id="email" type="email" 
                                className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none placeholder:text-deep-navy/50" 
                                whileFocus="focus"
                                variants={formInputVariants}
                            />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-deep-navy/80 mb-2">Message</label>
                            <motion.textarea 
                                id="message" rows={5} 
                                className="w-full bg-white/30 border border-white/40 rounded-lg p-3 text-deep-navy focus:outline-none placeholder:text-deep-navy/50"
                                whileFocus="focus"
                                variants={formInputVariants}
                            ></motion.textarea>
                        </div>
                        <div className="text-center">
                            <RippleButton type="submit" className="w-full">Send Message</RippleButton>
                        </div>
                    </form>
                </FloatingCard>
                <div className="space-y-8">
                     <FloatingCard delay={0.2}>
                        <h2 className="text-3xl font-serif text-azure mb-6">Our Coordinates</h2>
                        <div className="space-y-4 text-deep-navy">
                            <div className="flex items-center gap-4">
                                <MapPin className="text-azure" size={24}/>
                                <span>123 Ocean Avenue, Mariana Trench</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-azure" size={24}/>
                                <span>(123) 456-7890</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-azure" size={24}/>
                                <span>reservations@aquagrill.com</span>
                            </div>
                        </div>
                     </FloatingCard>
                      <FloatingCard delay={0.4}>
                        <h2 className="text-3xl font-serif text-azure mb-6">Hours of Operation</h2>
                        <div className="space-y-2 text-deep-navy">
                            <p><span className="font-bold text-azure">Dinner:</span> Tuesday - Sunday, 5:00 PM - 11:00 PM</p>
                            <p><span className="font-bold text-azure">Bar:</span> Tuesday - Sunday, 4:00 PM - 12:00 AM</p>
                            <p><span className="font-bold text-deep-navy/50">Closed Mondays</span> (for deep sea exploration)</p>
                        </div>
                     </FloatingCard>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;