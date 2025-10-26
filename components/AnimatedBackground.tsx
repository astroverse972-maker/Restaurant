import React from 'react';

export const AnimatedBackground: React.FC = () => {
    // The mousemove effect was removed to improve performance and reduce lag.
    // The background animation is now purely CSS-driven and less computationally expensive.
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen scale-105 -z-10 bg-gradient-to-br from-cyan-300 via-teal-200 to-white caustics-filter"></div>
            <svg className="absolute w-0 h-0">
                <filter id="caustics">
                    <feTurbulence 
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