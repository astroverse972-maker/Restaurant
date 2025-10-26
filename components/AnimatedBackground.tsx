import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX } = e;
            const scale = 50 + (clientX / window.innerWidth) * 50;
            if (displacementRef.current) {
                displacementRef.current.setAttribute('scale', `${scale}`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen scale-105 -z-10 bg-gradient-to-br from-cyan-300 via-teal-200 to-white caustics-filter"></div>
            <svg className="absolute w-0 h-0">
                <filter id="caustics">
                    <feTurbulence 
                        ref={turbulenceRef}
                        type="fractalNoise" 
                        baseFrequency="0.005" 
                        numOctaves="4" 
                        result="turbulence"
                    >
                         <animate 
                            attributeName="baseFrequency" 
                            dur="20s" 
                            values="0.005;0.008;0.005" 
                            repeatCount="indefinite" 
                        />
                    </feTurbulence>
                    <feDisplacementMap 
                        ref={displacementRef}
                        in="SourceGraphic" 
                        in2="turbulence" 
                        scale="50" 
                        xChannelSelector="R" 
                        yChannelSelector="G"
                    />
                </filter>
            </svg>
        </>
    );
};