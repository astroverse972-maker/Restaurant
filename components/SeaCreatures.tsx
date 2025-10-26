import React, { useRef, useEffect, useMemo } from 'react';
import { useAnimationFrame } from 'framer-motion';

// --- NEW, RECOGNIZABLE SVG ICONS ---
const FishIcon = () => (
    <svg viewBox="0 0 50 25" className="w-full h-full">
        <path d="M 0 12.5 C 10 0, 30 0, 40 12.5 C 30 25, 10 25, 0 12.5 Z M 40 12.5 L 50 0 L 50 25 L 40 12.5 Z" fill="currentColor" />
    </svg>
);

const LobsterIcon = () => (
    <svg viewBox="0 0 60 40" className="w-full h-full" transform="rotate(180)">
        {/* Tail */}
        <path d="M 0 20 L 10 10 L 10 30 Z" fill="currentColor" />
        <path d="M 10 15 H 30 V 25 H 10 Z" fill="currentColor" />
        {/* Claws */}
        <path d="M 30 15 L 40 5 L 50 5 L 40 15 Z" fill="currentColor" />
        <path d="M 30 25 L 40 35 L 50 35 L 40 25 Z" fill="currentColor" />
         {/* Head */}
        <path d="M30 18 H 35 V 22 H 30Z" fill="currentColor" />
    </svg>
);


const CrabIcon = () => (
    <svg viewBox="0 0 50 40" className="w-full h-full">
        {/* Body */}
        <path d="M 10 20 C 10 10, 40 10, 40 20 C 40 30, 10 30, 10 20 Z" fill="currentColor"/>
        {/* Claws */}
        <path d="M 10 15 L 0 5 L 5 0 Z" fill="currentColor" />
        <path d="M 40 15 L 50 5 L 45 0 Z" fill="currentColor" />
        {/* Legs */}
        <path d="M 10 25 L 5 35" stroke="currentColor" strokeWidth="2" />
        <path d="M 15 30 L 10 40" stroke="currentColor" strokeWidth="2" />
        <path d="M 40 25 L 45 35" stroke="currentColor" strokeWidth="2" />
        <path d="M 35 30 L 40 40" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const CuttlefishIcon = () => { // Sipi
    return (
    <svg viewBox="0 0 40 50" className="w-full h-full">
        {/* Body */}
        <path d="M 5 0 C 0 10, 0 30, 5 40 H 35 C 40 30, 40 10, 35 0 Z" fill="currentColor"/>
        {/* Tentacles */}
        <path d="M 10 40 V 50" stroke="currentColor" strokeWidth="3" />
        <path d="M 20 40 V 50" stroke="currentColor" strokeWidth="3" />
        <path d="M 30 40 V 50" stroke="currentColor" strokeWidth="3" />
    </svg>
)};


const creatureTypes = [
    { type: 'fish', component: FishIcon, aspectRatio: 2 / 1 },
    { type: 'lobster', component: LobsterIcon, aspectRatio: 60 / 40 },
    { type: 'crab', component: CrabIcon, aspectRatio: 50 / 40 },
    { type: 'cuttlefish', component: CuttlefishIcon, aspectRatio: 40 / 50 },
];

const useMousePosition = () => {    
    const [mousePosition, setMousePosition] = React.useState<{x: number | null, y: number | null}>({ x: null, y: null });
    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};

const SeaCreature: React.FC<{ creature: any }> = ({ creature }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouse = useMousePosition();

    const pos = useRef({ x: creature.x, y: creature.y });
    const vel = useRef({ x: creature.vx, y: creature.vy });
    const angle = useRef(Math.atan2(creature.vy, creature.vx));

    useAnimationFrame((_, delta) => {
        if (!ref.current) return;
        
        const fleeDistance = 150;
        const fleeDistanceSq = fleeDistance * fleeDistance; // Pre-calculate squared distance
        const fleeStrength = 1.5;
        const maxSpeed = 4;
        const damping = 0.94;

        // Flee from cursor
        if (mouse.x !== null && mouse.y !== null) {
            const dx = pos.current.x - mouse.x;
            const dy = pos.current.y - mouse.y;
            const distanceSq = dx * dx + dy * dy;

            // Use squared distance for check to avoid expensive sqrt
            if (distanceSq < fleeDistanceSq) {
                const angleToMouse = Math.atan2(dy, dx);
                vel.current.x += Math.cos(angleToMouse) * fleeStrength;
                vel.current.y += Math.sin(angleToMouse) * fleeStrength;
            }
        }
        
        // Clamp speed
        const speed = Math.sqrt(vel.current.x**2 + vel.current.y**2);
        if (speed > maxSpeed) {
            vel.current.x = (vel.current.x / speed) * maxSpeed;
            vel.current.y = (vel.current.y / speed) * maxSpeed;
        }

        // Apply velocity and damping
        pos.current.x += vel.current.x * (delta / 16.67);
        pos.current.y += vel.current.y * (delta / 16.67);
        vel.current.x *= damping;
        vel.current.y *= damping;

        // Add back base velocity if slowed down
        if (speed < 0.2) {
            vel.current.x += creature.vx * 0.05;
            vel.current.y += creature.vy * 0.05;
        }

        // Screen wrapping
        if (pos.current.x > window.innerWidth + creature.size) pos.current.x = -creature.size;
        if (pos.current.x < -creature.size) pos.current.x = window.innerWidth + creature.size;
        if (pos.current.y > window.innerHeight + creature.size) pos.current.y = -creature.size;
        if (pos.current.y < -creature.size) pos.current.y = window.innerHeight + creature.size;
        
        // Update angle for rotation
        if (speed > 0.1) {
            angle.current = Math.atan2(vel.current.y, vel.current.x);
        }
        
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
    const creatures = useMemo(() => Array.from({ length: 15 }).map((_, i) => { // Reduced from 25 to 15
        const type = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
        const size = Math.random() * 60 + 30;
        return {
            id: i,
            ...type,
            size: size,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.4 + 0.3,
            blur: Math.random() * 1.5,
            seed: Math.random() * 3, // Random delay for CSS animation
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