import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText - Animated text reveal from ReactBits
 */
const SplitText = ({
    text = '',
    className = '',
    delay = 0,
    animationFrom = { opacity: 0, y: 40 },
    animationTo = { opacity: 1, y: 0 },
    easing = [0.22, 1, 0.36, 1],
    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    const words = text.split(' ').map(word => word.split(''));
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);
    const letterCount = text.replace(/\s/g, '').length;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <p
            ref={ref}
            className={`inline-block overflow-hidden ${className}`}
            style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <motion.span
                                key={index}
                                initial={animationFrom}
                                animate={inView ? animationTo : animationFrom}
                                transition={{
                                    duration: 0.6,
                                    delay: delay + index * 0.03,
                                    ease: easing,
                                }}
                                onAnimationComplete={() => {
                                    animatedCount.current += 1;
                                    if (animatedCount.current === letterCount && onLetterAnimationComplete) {
                                        onLetterAnimationComplete();
                                    }
                                }}
                                style={{ display: 'inline-block' }}
                            >
                                {letter}
                            </motion.span>
                        );
                    })}
                    <span style={{ display: 'inline-block' }}>&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;
