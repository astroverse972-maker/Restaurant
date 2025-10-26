import React from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChefHat, Anchor, Gem } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';

const ParallaxImage: React.FC<{ src: string, alt: string, yOffset?: number }> = ({ src, alt, yOffset = 100 }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

    return (
        <motion.div className="overflow-hidden rounded-2xl shadow-xl" style={{ y }}>
            <LazyImage src={src} alt={alt} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
        </motion.div>
    );
};

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-5xl md:text-7xl font-serif text-center mb-12 text-deep-navy"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Our Voyage
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <FloatingCard>
                    <h2 className="text-3xl font-serif text-azure mb-4">From a Dream to the Deep</h2>
                    <p className="text-deep-navy/80 leading-relaxed">
                        AquaGrill was born from a singular vision: to create a dining experience that transcends the ordinary, plunging our guests into a world of culinary wonder and subaquatic beauty. Our founder, a marine biologist turned chef, dreamed of a place where the mysteries of the ocean could be celebrated on a plate, surrounded by the very environment that inspires our menu.
                    </p>
                </FloatingCard>
                <ParallaxImage src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1761462428/sea_food_restaurant_zlusig.jpg" alt="AquaGrill restaurant interior" />
            </div>

            <div className="text-center mb-20">
                <h2 className="text-4xl font-serif text-deep-navy mb-8">Our Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FloatingCard delay={0.2}>
                        <Gem className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Purity</h3>
                        <p className="text-deep-navy/70">Sourcing the freshest, most sustainable ingredients from the world's oceans.</p>
                    </FloatingCard>
                     <FloatingCard delay={0.4}>
                        <Anchor className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Respect</h3>
                        <p className="text-deep-navy/70">Honoring the sea by practicing and promoting marine conservation efforts.</p>
                    </FloatingCard>
                     <FloatingCard delay={0.6}>
                        <ChefHat className="mx-auto mb-4 text-azure" size={48} />
                        <h3 className="text-2xl font-serif text-deep-navy mb-2">Artistry</h3>
                        <p className="text-deep-navy/70">Transforming exceptional ingredients into unforgettable culinary masterpieces.</p>
                    </FloatingCard>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <ParallaxImage src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1761462431/chef_zjbxcg.jpg" alt="Head Chef Marina Atlantis" yOffset={-100} />
                 <FloatingCard>
                    <h2 className="text-3xl font-serif text-azure mb-4">Meet the Captain</h2>
                    <p className="text-deep-navy/80 leading-relaxed mb-4">
                        Head Chef Marina Atlantis has sailed the seven seas, drawing inspiration from coastal cuisines around the globe. Her innovative approach combines traditional techniques with modern flair, resulting in dishes that are both comforting and surprising.
                    </p>
                    <p className="text-deep-navy/80 leading-relaxed">
                        "Every dish tells a story," says Chef Atlantis. "Here at AquaGrill, we're narrating the epic tale of the ocean."
                    </p>
                </FloatingCard>
            </div>
        </div>
    );
};

export default AboutPage;