import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Squares } from '../../common';

const MainLayout = () => {
    return (
        <div className="min-h-screen font-sans selection:bg-[#94C2DA]/40 overflow-x-hidden">

            {/* ── Global Background Effects ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Interactive Grid Squares */}
                <div className="absolute inset-0 opacity-[0.4]">
                    <Squares
                        borderColor="#94C2DA20"
                        squareSize={50}
                        hoverFillColor="#203F9A"
                        speed={0.3}
                        direction="diagonal"
                    />
                </div>

                {/* Dot grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px]" />

                {/* Ambient Blobs for depth */}
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[30%] top-[-100px] h-[500px] w-[500px] rounded-full bg-[#94C2DA] blur-[140px]"
                />

                <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1], x: [0, 40, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-[-100px] top-[20%] h-[400px] w-[400px] rounded-full bg-[#E7A0CC] blur-[120px]"
                />

                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[-50px] bottom-[10%] h-[350px] w-[350px] rounded-full bg-[#203F9A] blur-[110px]"
                />
            </div>

            {/* ── Navigation ── */}
            <Navigation />

            {/* ── Page Content ── */}
            <main className="relative z-10">
                <Outlet />
            </main>

            {/* ── Footer ── */}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
