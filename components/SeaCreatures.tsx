import React, { useRef, useMemo } from 'react';
import { useAnimationFrame } from 'framer-motion';

// --- SVG ICONS ---
const FishIcon = () => (
    <svg viewBox="0 0 50 25" className="w-full h-full">
        <path d="M 0 12.5 C 10 0, 30 0, 40 12.5 C 30 25, 10 25, 0 12.5 Z M 40 12.5 L 50 0 L 50 25 L 40 12.5 Z" fill="currentColor" />
    </svg>
);

const LobsterIcon = () => (
    <svg viewBox="0 0 60 40" className="w-full h-full" transform="rotate(180)">
        <path d="M 0 20 L 10 10 L 10 30 Z" fill="currentColor" />
        <path d="M 10 15 H 30 V 25 H 10 Z" fill="currentColor" />
        <path d="M 30 15 L 40 5 L 50 5 L 40 15 Z" fill="currentColor" />
        <path d="M 30 25 L 40 35 L 50 35 L 40 25 Z" fill="currentColor" />
        <path d="M30 18 H 35 V 22 H 30Z" fill="currentColor" />
    </svg>
);

const CrabIcon = () => (
    <svg viewBox="0 0 50 40" className="w-full h-full">
        <path d="M 10 20 C 10 10, 40 10, 40 20 C 40 30, 10 30, 10 20 Z" fill="currentColor"/>
        <path d="M 10 15 L 0 5 L 5 0 Z" fill="currentColor" />
        <path d="M 40 15 L 50 5 L 45 0 Z" fill="currentColor" />
        <path d="M 10 25 L 5 35" stroke="currentColor" strokeWidth="2" />
        <path d="M 15 30 L 10 40" stroke="currentColor" strokeWidth="2" />
        <path d="M 40 25 L 45 35" stroke="currentColor" strokeWidth="2" />
        <path d="M 35 30 L 40 40" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const CuttlefishIcon = () => (
    <svg viewBox="0 0 40 50" className="w-full h-full">
        <path d="M 5 0 C 0 10, 0 30, 5 40 H 35 C 40 30, 40 10, 35 0 Z" fill="currentColor"/>
        <path d="M 10 40 V 50" stroke="currentColor" strokeWidth="3" />
        <path d="M 20 40 V 50" stroke="currentColor" strokeWidth="3" />
        <path d="M 30 40 V 50" stroke="currentColor" strokeWidth="3" />
    </svg>
);

const creatureTypes = [
    { type: 'fish', component: FishIcon, aspectRatio: 2 / 1 },
    { type: 'lobster', component: LobsterIcon, aspectRatio: 60 / 40 },
    { type: 'crab', component: CrabIcon, aspectRatio: 50 / 40 },
    { type: 'cuttlefish', component: CuttlefishIcon, aspectRatio: 40 / 50 },
];

const SeaCreature: React.FC<{ creature: any }> = ({ creature }) => {
    const ref = useRef<HTMLDivElement>(null);

    const pos = useRef({ x: creature.x, y: creature.y });
    const angle = useRef(Math.atan2(creature.vy, creature.vx));
    const time = useRef(creature.seed * 100);

    useAnimationFrame((_, delta) => {
        if (!ref.current) return;
        
        time.current += delta / 1000;

        // Efficient, organic drift using sine waves instead of heavy physics
        const driftX = Math.sin(time.current * creature.turnSpeed) * creature.turnAmount;
        const driftY = Math.cos(time.current * creature.turnSpeed) * creature.turnAmount;

        const currentVx = creature.vx + driftX;
        const currentVy = creature.vy + driftY;

        pos.current.x += currentVx * (delta / 16.67);
        pos.current.y += currentVy * (delta / 16.67);

        // Screen wrapping
        if (pos.current.x > window.innerWidth + creature.size) pos.current.x = -creature.size;
        if (pos.current.x < -creature.size) pos.current.x = window.innerWidth + creature.size;
        if (pos.current.y > window.innerHeight + creature.size) pos.current.y = -creature.size;
        if (pos.current.y < -creature.size) pos.current.y = window.innerHeight + creature.size;
        
        angle.current = Math.atan2(currentVy, currentVx);
        
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}rad)`;
    });

    const CreatureComponent = creature.component;

    return (
        <div 
            ref={ref} 
            className="absolute top-0 left-0"
            style={{
                width: creature.size,
                height: creature.size / creature.aspectRatio,
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: creature.opacity,
                filter: `blur(${creature.blur}px)`,
                willChange: 'transform'
            }}
        >
            <div 
                className="animate-creature-bob w-full h-full"
                style={{ animationDelay: `${creature.seed}s`}}
            >
                <CreatureComponent />
            </div>
        </div>
    );
};

export const SeaCreatures: React.FC = () => {
    const creatures = useMemo(() => Array.from({ length: 25 }).map((_, i) => { // Increased count to 25
        const type = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
        const size = Math.random() * 60 + 30;
        return {
            id: i,
            ...type,
            size: size,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.8, // Base speed
            vy: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.4 + 0.3,
            blur: Math.random() * 1.5,
            seed: Math.random() * 3,
            turnSpeed: Math.random() * 0.5 + 0.3, // How fast it turns
            turnAmount: (Math.random() - 0.5) * 0.5, // How much it turns
        };
    }), []);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-20 overflow-hidden pointer-events-none">
            {creatures.map(creature => (
                <SeaCreature key={creature.id} creature={creature} />
            ))}
        </div>
    );
};