import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import appConfig from '../../config/appConfig';

const { sections } = appConfig.navigation;

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { menuOpen, toggleMenu, closeMenu } = useApp();
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
                ? 'bg-[#fff]/95 backdrop-blur-md shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* ── Logo ── */}
                <NavLink to="/" className="flex items-center gap-2 group" aria-label="Home">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="w-9 h-9 rounded-full bg-[#203F9A] flex items-center justify-center
                       group-hover:bg-[#E84797] transition-colors duration-300"
                    >
                        <Camera className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="font-display font-bold text-[#203F9A] text-lg hidden sm:block
                           group-hover:text-[#E84797] transition-colors duration-300">
                        Bảo Hân
                    </span>
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
                                        ? 'text-[#203F9A] bg-[#94C2DA]/25'
                                        : 'text-gray-600 hover:text-[#203F9A] hover:bg-[#94C2DA]/15'
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

                {/* ── CTA (Desktop) ── */}
                <button
                    onClick={() => handleNavClick('/#contact-section')}
                    className="hidden md:inline-flex items-center gap-2 bg-[#203F9A] text-white
                     px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                     hover:bg-[#E84797] hover:scale-105 hover:shadow-lg active:scale-95"
                >
                    Hire Me
                </button>

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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-[#EFE8E0]/98 backdrop-blur-md border-t border-[#94C2DA]/30"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {sections.map((section) => (
                                <NavLink
                                    key={section.id}
                                    to={section.path}
                                    onClick={() => handleNavClick(section.path)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-[#203F9A] bg-[#94C2DA]/25' : 'text-gray-600 hover:text-[#203F9A] hover:bg-[#94C2DA]/15'
                                        }`
                                    }
                                >
                                    {section.label}
                                </NavLink>
                            ))}
                            <div className="pt-2">
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleNavClick('/#contact-section');
                                    }}
                                    className="flex justify-center w-full bg-[#203F9A] text-white
                             px-5 py-3 rounded-full text-sm font-semibold
                             hover:bg-[#E84797] transition-colors duration-300"
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
