import { NavLink } from 'react-router-dom';
import { Camera, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data';
import appConfig from '../../config/appConfig';

const { sections } = appConfig.navigation;

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative bg-[#203F9A] text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#E84797] flex items-center justify-center">
                                <Camera className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl">{personalInfo.nameVi}</span>
                        </div>
                        <p className="text-[#94C2DA] text-sm max-w-xs">{personalInfo.tagline}</p>
                    </div>

                    {/* Nav Links */}
                    <nav aria-label="Footer navigation">
                        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <NavLink
                                        to={section.path}
                                        className="text-[#94C2DA] text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {section.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Scroll to top */}
                    <button
                        id="footer-scroll-top"
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E84797]
                       flex items-center justify-center transition-colors duration-300"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[#94C2DA]/70 text-sm">
                        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                    </p>
                    <p className="text-[#94C2DA]/60 text-sm flex items-center gap-1.5">
                        Made with <Heart className="w-3.5 h-3.5 text-[#E84797] fill-current" /> and creativity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
