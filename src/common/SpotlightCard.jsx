import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SpotlightCard - Interactive card with mouse hover glow, inspired by ReactBits
 */
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(148, 194, 218, 0.25)', borderOpacity = '0.3' }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full overflow-hidden rounded-2xl border border-inherit bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 ${className}`}
        >
            <div
                className='pointer-events-none absolute -inset-px z-0 transition duration-300'
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
