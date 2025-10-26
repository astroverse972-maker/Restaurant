import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { RippleButton } from '../components/RippleButton';
import { specialItems } from '../constants';
import { FloatingCard } from '../components/FloatingCard';
import { Fish, Calendar, UtensilsCrossed } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
                <motion.h1 
                    className="text-6xl md:text-8xl font-serif text-deep-navy mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    AquaGrill
                </motion.h1>
                <motion.p 
                    className="text-xl md:text-2xl text-deep-navy/80 mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    An Underwater Culinary Voyage
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <NavLink to="/reservations">
                        <RippleButton>Book Your Table</RippleButton>
                    </NavLink>
                </motion.div>
            </section>

            {/* Introduction Section */}
            <section className="my-20">
                <FloatingCard>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-serif text-azure mb-4">Dive Into a World of Flavor</h2>
                        <p className="text-deep-navy/80 leading-relaxed">
                            Welcome to AquaGrill, where the finest treasures of the deep are transformed into culinary masterpieces. Our restaurant offers a unique subaquatic dining experience, immersing you in a serene, otherworldly atmosphere while you savor the freshest seafood and artisanal creations.
                        </p>
                    </div>
                </FloatingCard>
            </section>

            {/* Chef's Specials Preview */}
            <section className="my-20">
                <h2 className="text-4xl font-serif text-center text-deep-navy mb-12">Featured Specials</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {specialItems.slice(0, 3).map((item, index) => (
                        <FloatingCard key={item.id} delay={index * 0.2}>
                            <LazyImage src={item.image} alt={item.name} className="w-48 h-48 mx-auto object-contain fade-edges mb-4"/>
                            <h3 className="text-2xl font-serif text-azure">{item.name}</h3>
                            <p className="italic text-deep-navy/60 mb-2">"{item.tagline}"</p>
                            <p className="text-deep-navy/70 text-sm">{item.description}</p>
                        </FloatingCard>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="my-20">
                 <div className="grid md:grid-cols-3 gap-8 text-center">
                    <FloatingCard delay={0}>
                         <UtensilsCrossed className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Explore the Menu</h3>
                        <p className="text-deep-navy/70 mb-4">Discover our full range of oceanic delicacies.</p>
                        <NavLink to="/menu"><RippleButton className="py-2 px-4 text-sm">View Menu</RippleButton></NavLink>
                    </FloatingCard>
                    <FloatingCard delay={0.2}>
                        <Calendar className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Make a Reservation</h3>
                        <p className="text-deep-navy/70 mb-4">Secure your spot for an unforgettable night.</p>
                        <NavLink to="/reservations"><RippleButton className="py-2 px-4 text-sm">Reserve Now</RippleButton></NavLink>
                    </FloatingCard>
                    <FloatingCard delay={0.4}>
                        <Fish className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Chef's Specials</h3>
                        <p className="text-deep-navy/70 mb-4">See what treasures our chef has curated.</p>
                        <NavLink to="/specials"><RippleButton className="py-2 px-4 text-sm">See Specials</RippleButton></NavLink>
                    </FloatingCard>
                </div>
            </section>
        </div>
    );
};

export default HomePage;