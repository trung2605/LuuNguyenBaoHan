import { useCustomTheme } from '../contexts/ThemeContext';

/**
 * ShinyText - Text with a moving shimmer mask, inspired by ReactBits
 */
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    const { isDarkMode } = useCustomTheme();
    const animationDuration = `${speed}s`;

    // Shimmer color based on theme
    const shimmerColor = isDarkMode ? 'rgba(231, 160, 204, 0.8)' : 'rgba(32, 63, 154, 0.8)';

    return (
        <div
            className={`text-transparent bg-clip-text inline-block ${disabled ? '' : 'animate-shiny-text'} ${className}`}
            style={{
                backgroundImage: `linear-gradient(120deg, rgba(32,63,154,0) 40%, ${shimmerColor} 50%, rgba(32,63,154,0) 60%)`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: animationDuration,
            }}
        >
            {text}
        </div>
    );
};

export default ShinyText;
