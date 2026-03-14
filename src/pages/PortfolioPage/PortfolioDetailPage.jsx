import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Calendar, ExternalLink } from 'lucide-react';
import { portfolioItems } from '../../data';
import { Section, SpotlightCard } from '../../common';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';

const PortfolioDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const found = portfolioItems.find((p) => p.id === parseInt(id));
        if (found) {
            setProject(found);
        } else {
            navigate('/portfolio');
        }
    }, [id, navigate]);

    // Handle Lightbox
    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(project.images[index]);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (currentIndex + 1) % project.images.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(project.images[nextIdx]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIdx);
        setSelectedImage(project.images[prevIdx]);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage(e);
            if (e.key === 'ArrowLeft') prevImage(e);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    // Body scroll lock
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    if (!project) return null;

    return (
        <Section id="portfolio-detail" bg="white" className="pt-28 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#E84797] dark:hover:text-[#E7A0CC] transition-colors mb-6 group text-sm font-semibold"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#E84797]/10 dark:group-hover:bg-[#E7A0CC]/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to Portfolio
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-slate-700">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-block px-3 py-1 bg-[#203F9A]/10 dark:bg-[#94C2DA]/10 text-[#203F9A] dark:text-[#94C2DA] text-xs font-bold tracking-widest uppercase rounded-full">
                                    {project.category}
                                </span>
                                {project.period && (
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {project.period}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#E84797] hover:text-[#203F9A] dark:text-[#E7A0CC] dark:hover:text-[#94C2DA] font-bold text-sm transition-colors group"
                                >
                                    View Project <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-slate-800 rounded-lg">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Masonry Gallery ── */}
                {project.images && project.images.length > 0 ? (
                    <motion.div
                        variants={staggerContainer(0.05)}
                        initial="hidden"
                        animate="visible"
                        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                    >
                        {project.images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                variants={staggerItem}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => openLightbox(idx)}
                            >
                                <SpotlightCard spotlightColor="rgba(232, 71, 151, 0.2)" className="hover:-translate-y-1 transition-transform p-3">
                                    <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 group-hover:shadow-md transition-shadow">
                                        <img
                                            src={img}
                                            alt={`${project.title} ${idx + 1}`}
                                            className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                            loading="lazy"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-[#203F9A]/0 group-hover:bg-[#203F9A]/20 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#E84797] dark:text-[#E7A0CC]">
                                                <ZoomIn className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Small elegant border bottom (Polaroid vibe) */}
                                    <div className="flex justify-between items-center px-1 pt-3 pb-1">
                                        <div className="w-8 h-[2px] bg-[#E84797]/30 dark:bg-[#E7A0CC]/30 rounded-full" />
                                        <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500">0{idx + 1}</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <p>No images available for this project.</p>
                    </div>
                )}
            </div>

            {/* ── Lightbox Modal ── */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl overflow-y-auto"
                        onClick={closeLightbox}
                    >
                        {/* Close button - Fixed position so it's always accessible */}
                        <button
                            className="fixed top-6 right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#E84797] rounded-full text-white transition-all duration-300 group shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        </button>

                        {/* Navigation Arrows - Fixed position */}
                        {project.images.length > 1 && (
                            <>
                                <button
                                    className="fixed left-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 hidden md:flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full text-white transition-all group"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                >
                                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button
                                    className="fixed right-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 hidden md:flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full text-white transition-all group"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                >
                                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        )}

                        {/* Image Container with Scrolling Capability */}
                        <div className="min-h-screen py-20 px-4 md:px-20 flex items-center justify-center">
                            <motion.div
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="relative max-w-6xl w-full flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Fullscreen Portfolio"
                                    className="max-w-full h-auto rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/5 mx-auto"
                                    style={{ maxHeight: 'none' }} // Ensure no height constraint
                                />

                                {/* Image Counter - Floating below image or fixed at bottom */}
                                <div className="mt-8 text-white/90 text-xs font-bold tracking-[0.3em] bg-white/10 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/5 uppercase">
                                    {currentIndex + 1} / {project.images.length}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </Section>
    );
};

export default PortfolioDetailPage;
