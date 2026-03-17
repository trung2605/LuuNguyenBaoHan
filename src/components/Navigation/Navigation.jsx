import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Menu, X, Sun, Moon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useCustomTheme } from '../../contexts/ThemeContext';
import appConfig from '../../config/appConfig';

const { sections } = appConfig.navigation;

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { menuOpen, toggleMenu, closeMenu } = useApp();
    const { isDarkMode, toggleTheme } = useCustomTheme();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { closeMenu(); }, [location.pathname, closeMenu]);

    const handleNavClick = (path) => {
        if (path.startsWith('/#')) {
            const id = path.split('#')[1];
            if (location.pathname === '/') {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white dark:bg-[#0f172a] shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* ── Logo ── */}
                <NavLink to="/" className="flex items-center gap-3 group" aria-label="Home">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="relative w-11 h-11 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[#203F9A]/10 dark:bg-[#94C2DA]/10 rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
                        <img
                            src="/camera.svg"
                            alt="Logo"
                            className="w-9 h-9 relative z-10"
                        />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-[#203F9A] dark:text-white text-lg leading-tight group-hover:text-[#E84797] transition-colors">
                            Bảo Hân
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#E84797] uppercase leading-none opacity-80">
                            Portfolio
                        </span>
                    </div>
                </NavLink>

                {/* ── Desktop Links ── */}
                <ul className="hidden md:flex items-center gap-1">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <NavLink
                                to={section.path}
                                end={section.path === '/'}
                                onClick={() => handleNavClick(section.path)}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${(isActive && !section.path.includes('#')) || (section.path.includes('#') && location.hash === section.hash)
                                        ? 'text-[#203F9A] dark:text-white bg-[#94C2DA]/25 dark:bg-[#94C2DA]/20'
                                        : 'text-gray-600 dark:text-white hover:text-[#203F9A] dark:hover:text-white hover:bg-[#94C2DA]/15 dark:hover:bg-white/5'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {section.label}
                                        {((isActive && !section.path.includes('#')) || (section.path.includes('#') && location.hash === section.hash)) && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E84797]"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* ── CTA (Desktop) & Theme Toggle ── */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EFE8E0] text-[#203F9A] hover:bg-[#94C2DA]/30 transition-colors dark:bg-[#1e293b] dark:text-[#E7A0CC]"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => handleNavClick('/#contact-section')}
                        className="inline-flex items-center gap-2 bg-[#203F9A] text-white
                         px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                         hover:bg-[#E84797] hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        Hire Me
                    </button>
                </div>

                {/* ── Mobile Hamburger ── */}
                <button
                    id="navbar-menu-toggle"
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation menu"
                    className="md:hidden w-10 h-10 rounded-full flex items-center justify-center
                     text-[#203F9A] hover:bg-[#94C2DA]/30 transition-colors duration-200"
                >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden fixed inset-x-4 top-20 z-40 overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl"
                    >
                        <div className="px-5 py-6 space-y-2">
                            {sections.map((section) => (
                                <NavLink
                                    key={section.id}
                                    to={section.path}
                                    onClick={() => handleNavClick(section.path)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${isActive
                                            ? 'text-[#203F9A] dark:text-white bg-[#94C2DA]/20 dark:bg-white/10'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`
                                    }
                                >
                                    <span>{section.label}</span>
                                </NavLink>
                            ))}

                            <div className="pt-4 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => {
                                        toggleTheme();
                                    }}
                                    className="flex items-center justify-center bg-gray-100 dark:bg-white/5 text-[#203F9A] dark:text-[#E7A0CC]
                                     py-3.5 rounded-2xl text-sm font-bold active:scale-95 transition-transform"
                                >
                                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleNavClick('/#contact-section');
                                    }}
                                    className="flex items-center justify-center bg-[#203F9A] text-white
                                     py-3.5 rounded-2xl text-sm font-bold active:scale-95 transition-transform shadow-lg shadow-[#203F9A]/20"
                                >
                                    Hire Me
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
