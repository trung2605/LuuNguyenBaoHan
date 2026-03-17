import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Squares } from '../../common';
import { useCustomTheme } from '../../contexts/ThemeContext';
import { pageTransition } from '../../animations/variants';

const MainLayout = () => {
    const { isDarkMode } = useCustomTheme();
    const location = useLocation();

    return (
        <div className="min-h-screen font-sans selection:bg-[#94C2DA]/40 overflow-x-hidden transition-colors duration-500 dark:bg-slate-950">

            {/* ── Global Background Effects ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Interactive Grid Squares */}
                <div className="absolute inset-0 opacity-[0.3] md:opacity-[0.4]">
                    <Squares
                        borderColor={isDarkMode ? "#ffffff10" : "#94C2DA25"}
                        squareSize={40}
                        hoverFillColor={isDarkMode ? "#94C2DA" : "#203F9A"}
                        speed={0.4}
                        direction="diagonal"
                    />
                </div>

                {/* Dot grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]" />

                {/* Ambient Blobs for depth - Enhanced movement */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.15, 0.25, 0.15],
                        x: [-20, 20, -20],
                        y: [-30, 30, -30]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[10%] top-[-5%] h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-[#94C2DA] blur-[100px] md:blur-[160px]"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: isDarkMode ? [0.08, 0.15, 0.08] : [0.1, 0.2, 0.1],
                        x: [20, -20, 20],
                        y: [40, -40, 40]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-[-5%] top-[15%] h-[250px] w-[250px] md:h-[500px] md:w-[500px] rounded-full bg-[#E7A0CC] blur-[90px] md:blur-[140px]"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: isDarkMode ? [0.05, 0.1, 0.05] : [0.08, 0.18, 0.08],
                        y: [0, -60, 0],
                        x: [-30, 30, -30]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[-10%] bottom-[5%] h-[400px] w-[400px] rounded-full bg-[#203F9A] blur-[110px] md:blur-[180px]"
                />

                {/* Additional floating particles for mobile 'alive' feel */}
                <motion.div
                    animate={{
                        y: [0, -1000],
                        opacity: [0, 0.5, 0],
                        x: [0, 50, -50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-[-100px] left-[20%] w-1 h-1 bg-[#E84797] rounded-full blur-[1px]"
                />
                <motion.div
                    animate={{
                        y: [0, -1200],
                        opacity: [0, 0.4, 0],
                        x: [0, -40, 40, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 5 }}
                    className="absolute bottom-[-100px] right-[30%] w-1.5 h-1.5 bg-[#94C2DA] rounded-full blur-[1px]"
                />
            </div>

            {/* ── Navigation ── */}
            <Navigation />

            {/* ── Page Content with Premium Transitions ── */}
            <main className="relative z-10">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={location.pathname}
                        variants={pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* ── Footer ── */}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
