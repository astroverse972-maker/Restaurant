import React, { useRef, useMemo, useEffect } from 'react';
import { useAnimationFrame } from 'framer-motion';

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
    { type: 'fish', component: FishIcon, aspectRatio: 2 / 1 },
    { type: 'crab', component: CrabIcon, aspectRatio: 50 / 40 },
];

const layerConfigs = {
  background: {
    zIndex: 20,
    minSize: 30, maxSize: 50,
    minSpeed: 0.2, maxSpeed: 0.4,
    minOpacity: 0.2, maxOpacity: 0.4,
    repulsionRadius: 75,
    repulsionStrength: 1,
  },
  midground: {
    zIndex: 21,
    minSize: 50, maxSize: 80,
    minSpeed: 0.4, maxSpeed: 0.8,
    minOpacity: 0.4, maxOpacity: 0.6,
    repulsionRadius: 150,
    repulsionStrength: 3,
  },
  foreground: {
    zIndex: 22,
    minSize: 80, maxSize: 120,
    minSpeed: 0.8, maxSpeed: 1.2,
    minOpacity: 0.7, maxOpacity: 0.9,
    repulsionRadius: 200,
    repulsionStrength: 6,
  },
};

const SeaCreature: React.FC<{ creature: any; interactionPoint: React.MutableRefObject<{ x: number; y: number } | null> }> = ({ creature, interactionPoint }) => {
    const ref = useRef<HTMLDivElement>(null);

    const pos = useRef({ x: creature.x, y: creature.y });
    const vel = useRef({ x: creature.vx, y: creature.vy });
    const angle = useRef(Math.atan2(creature.vy, creature.vx));

    useAnimationFrame((_, delta) => {
        if (!ref.current) return;
        
        const REPULSION_RADIUS = creature.repulsionRadius;
        const REPULSION_STRENGTH = creature.repulsionStrength;
        const MAX_SPEED = creature.baseSpeed * 2.5;
        const DAMPING = 0.98;

        const interaction = interactionPoint.current;
        if (interaction && REPULSION_STRENGTH > 0) {
            const dx = pos.current.x - interaction.x;
            const dy = pos.current.y - interaction.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REPULSION_RADIUS) {
                const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
                const forceX = (dx / dist) * force;
                const forceY = (dy / dist) * force;
                
                vel.current.x += forceX;
                vel.current.y += forceY;
            }
        }
        
        // Removed wandering logic to create more stable movement
        const baseAngle = Math.atan2(vel.current.y, vel.current.x);
        const steerX = Math.cos(baseAngle) * creature.baseSpeed;
        const steerY = Math.sin(baseAngle) * creature.baseSpeed;

        vel.current.x += (steerX - vel.current.x) * 0.02;
        vel.current.y += (steerY - vel.current.y) * 0.02;

        const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y);
        if (speed > MAX_SPEED) {
            vel.current.x = (vel.current.x / speed) * MAX_SPEED;
            vel.current.y = (vel.current.y / speed) * MAX_SPEED;
        }

        vel.current.x *= DAMPING;
        vel.current.y *= DAMPING;

        const dt = delta / 16.67;
        pos.current.x += vel.current.x * dt;
        pos.current.y += vel.current.y * dt;

        if (pos.current.x > window.innerWidth + creature.size) pos.current.x = -creature.size;
        if (pos.current.x < -creature.size) pos.current.x = window.innerWidth + creature.size;
        if (pos.current.y > window.innerHeight + creature.size) pos.current.y = -creature.size;
        if (pos.current.y < -creature.size) pos.current.y = window.innerHeight + creature.size;
        
        if (speed > 0.01) {
            const targetAngle = Math.atan2(vel.current.y, vel.current.x);
            
            // Normalize angle difference for smooth interpolation
            let angleDiff = targetAngle - angle.current;
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

            // Apply smoothing (lerp) for graceful turning
            angle.current += angleDiff * 0.05;
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
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: creature.opacity,
                zIndex: creature.zIndex,
                filter: 'drop-shadow(0 0 8px #00FFFF)',
                willChange: 'transform'
            }}
        >
            <div className="w-full h-full">
                <CreatureComponent />
            </div>
        </div>
    );
};

export const SeaCreatures: React.FC = () => {
    const interactionPoint = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleInteraction = (x: number, y: number) => {
            interactionPoint.current = { x, y };
        };

        const handleMouseMove = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const handleInteractionEnd = () => {
            interactionPoint.current = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseleave', handleInteractionEnd);
        window.addEventListener('touchend', handleInteractionEnd);
        window.addEventListener('touchcancel', handleInteractionEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseleave', handleInteractionEnd);
            window.removeEventListener('touchend', handleInteractionEnd);
            window.removeEventListener('touchcancel', handleInteractionEnd);
        };
    }, []);

    const creatures = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
        const layerRoll = Math.random();
        let layerName: keyof typeof layerConfigs;

        if (layerRoll < 0.15) layerName = 'foreground';      // 15% chance
        else if (layerRoll < 0.75) layerName = 'midground'; // 60% chance
        else layerName = 'background';                     // 25% chance
        
        const config = layerConfigs[layerName];
        const type = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
        
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        const baseSpeed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
        const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
        const initialAngle = Math.random() * 2 * Math.PI;

        return {
            id: i,
            ...type,
            ...config,
            size,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: Math.cos(initialAngle) * baseSpeed,
            vy: Math.sin(initialAngle) * baseSpeed,
            baseSpeed,
            opacity,
            seed: Math.random() * 3,
        };
    }), []);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-20 overflow-hidden pointer-events-none">
            {creatures.map(creature => (
                <SeaCreature key={creature.id} creature={creature} interactionPoint={interactionPoint} />
            ))}
        </div>
    );
};