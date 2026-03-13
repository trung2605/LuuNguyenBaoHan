import { motion } from 'framer-motion';
import { hoverScale } from '../animations/variants';

/**
 * AnimatedButton — primary reusable button component.
 *
 * Props:
 *   variant    — 'primary' | 'outline' | 'ghost' (default: 'primary')
 *   size       — 'sm' | 'md' | 'lg' (default: 'md')
 *   loading    — shows a spinner when true
 *   fullWidth  — stretches to full container width
 *   onClick    — click handler
 *   href       — if provided, renders as <a> tag
 *   children   — button content
 */
const variants = {
    primary: `bg-[#203F9A] text-white hover:bg-[#E84797] shadow-md hover:shadow-lg`,
    outline: `border-2 border-[#203F9A] text-[#203F9A] hover:bg-[#203F9A] hover:text-white`,
    ghost: `text-[#203F9A] hover:bg-[#94C2DA]/20`,
};

const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
};

const AnimatedButton = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    onClick,
    href,
    children,
    className = '',
    type = 'button',
    disabled = false,
    ...rest
}) => {
    const base = `
    inline-flex items-center justify-center rounded-full font-semibold
    transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[#203F9A] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

    const content = loading ? (
        <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
        </span>
    ) : (
        children
    );

    if (href) {
        return (
            <motion.a
                href={href}
                variants={hoverScale}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className={base}
                {...rest}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            variants={hoverScale}
            initial="rest"
            whileHover={!disabled && !loading ? 'hover' : undefined}
            whileTap={!disabled && !loading ? 'tap' : undefined}
            className={base}
            {...rest}
        >
            {content}
        </motion.button>
    );
};

export default AnimatedButton;
