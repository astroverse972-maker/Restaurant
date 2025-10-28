import React from 'react';

export const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen scale-105 -z-10 bg-gradient-to-br from-cyan-300 via-teal-200 to-white bg-[size:200%_200%] animate-gradient-flow"></div>
    );
};
