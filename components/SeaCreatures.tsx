import React, { useMemo } from 'react';

// --- SVG ICONS ---
const FishIcon = () => (
    <svg viewBox="0 0 50 25" className="w-full h-full">
        <path d="M 0 12.5 C 10 0, 30 0, 40 12.5 C 30 25, 10 25, 0 12.5 Z M 40 12.5 L 50 0 L 50 25 L 40 12.5 Z" fill="currentColor" />
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

const creatureTypes = [
    { type: 'fish' as const, component: FishIcon, aspectRatio: 2 / 1 },
    { type: 'crab' as const, component: CrabIcon, aspectRatio: 50 / 40 },
];

// Define animations available in index.html
const animations = {
    fish: ['swim-across', 'swim-across-flip'],
    crab: ['crab-walk'],
};

export const SeaCreatures: React.FC = () => {
    const creatures = useMemo(() => Array.from({ length: 8 }).map((_, i) => { // Reduced from 15
        const typeInfo = creatureTypes[Math.random() < 0.8 ? 0 : 1]; // 80% fish, 20% crab
        const animationName = animations[typeInfo.type][Math.floor(Math.random() * animations[typeInfo.type].length)];
        
        const isCrab = typeInfo.type === 'crab';
        const size = isCrab ? (Math.random() * 30 + 40) : (Math.random() * 50 + 50); // Crabs smaller
        const opacity = Math.random() * 0.3 + 0.3; // Range 0.3 to 0.6
        const duration = Math.random() * 15 + 20; // 20s to 35s duration
        const delay = Math.random() * duration;

        return {
            id: i,
            ...typeInfo,
            size,
            y: isCrab ? (90 + Math.random() * 5) : (Math.random() * 85), // Crabs at the bottom
            opacity,
            animationName,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
            zIndex: 20 + Math.floor(opacity * 5), // Layer based on opacity
        };
    }), []);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-20 overflow-hidden pointer-events-none">
            {creatures.map(creature => {
                const CreatureComponent = creature.component;
                const style: React.CSSProperties = {
                    position: 'absolute',
                    top: `${creature.y}vh`,
                    left: 0,
                    width: creature.size,
                    height: creature.size / creature.aspectRatio,
                    color: 'rgba(255, 255, 255, 0.7)',
                    opacity: creature.opacity,
                    zIndex: creature.zIndex,
                    willChange: 'transform',
                    animationName: creature.animationName,
                    animationDuration: creature.animationDuration,
                    animationDelay: creature.animationDelay,
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                };
                
                return (
                    <div key={creature.id} style={style}>
                        <CreatureComponent />
                    </div>
                );
            })}
        </div>
    );
};
