import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

/**
 * SectionHeader — reusable heading block used by every page/section.
 * Props:
 *   eyebrow  — small coloured label above the title (e.g. "My Journey")
 *   title    — main h2 heading
 *   subtitle — optional description paragraph
 *   centered — whether to center-align text (default: true)
 */
const SectionHeader = ({
    eyebrow,
    title,
    subtitle,
    centered = true,
    className = '',
}) => {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}
        >
            {eyebrow && (
                <p className="text-[#E84797] font-semibold text-sm uppercase tracking-widest mb-3">
                    {eyebrow}
                </p>
            )}

            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#203F9A] mb-4 leading-tight">
                {title}
            </h2>

            {/* Decorative accent line */}
            <div className={`flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}>
                <div className="h-1 w-10 rounded-full bg-[#203F9A]" />
                <div className="h-1 w-5 rounded-full bg-[#E84797]" />
                <div className="h-1 w-2.5 rounded-full bg-[#94C2DA]" />
            </div>

            {subtitle && (
                <p className={`text-gray-500 text-base md:text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeader;
