import { motion } from 'framer-motion';

/**
 * Section — layout wrapper for every major section on the page.
 * Handles: id anchor, background alternation, vertical padding, fade-in animation.
 *
 * Props:
 *   id         — HTML id for anchor navigation
 *   bg         — 'white' | 'beige' | 'blue-light' | 'pink-light' (default: 'white')
 *   fullHeight — whether minHeight: 100vh (default: false)
 *   className  — additional Tailwind classes
 */
const bgMap = {
    white: 'bg-transparent',
    beige: 'bg-transparent',
    'blue-light': 'bg-transparent',
    'pink-light': 'bg-transparent',
    transparent: 'bg-transparent',
};

const Section = ({
    id,
    bg = 'transparent',
    fullHeight = false,
    children,
    className = '',
    animate = true,
}) => {
    const bgClass = bgMap[bg] ?? bgMap.transparent;

    const wrapper = (
        <section
            id={id}
            className={`
        relative overflow-hidden
        ${bgClass}
        ${fullHeight ? 'min-h-screen' : ''}
        px-6 py-16 md:px-12 lg:px-24 lg:py-24
        ${className}
      `}
        >
            <div className="relative z-10 max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );

    if (!animate) return wrapper;

    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`
        relative overflow-hidden
        ${bgClass}
        ${fullHeight ? 'min-h-screen' : ''}
        px-6 py-16 md:px-12 lg:px-24 lg:py-24
        ${className}
      `}
        >
            <div className="relative z-10 max-w-7xl mx-auto">
                {children}
            </div>
        </motion.section>
    );
};

export default Section;
