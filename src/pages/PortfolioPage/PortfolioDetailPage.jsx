import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
                        className="flex items-center gap-2 text-gray-500 hover:text-[#E84797] transition-colors mb-6 group text-sm font-semibold"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#E84797]/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to Portfolio
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
                        <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-[#203F9A]/10 text-[#203F9A] text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">{project.title}</h1>
                            <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 font-medium">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-gray-50 rounded-lg">#{tag}</span>
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
                                    <div className="relative overflow-hidden rounded-xl bg-gray-100 group-hover:shadow-md transition-shadow">
                                        <img
                                            src={img}
                                            alt={`${project.title} ${idx + 1}`}
                                            className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                            loading="lazy"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-[#203F9A]/0 group-hover:bg-[#203F9A]/20 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#E84797]">
                                                <ZoomIn className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Small elegant border bottom (Polaroid vibe) */}
                                    <div className="flex justify-between items-center px-1 pt-3 pb-1">
                                        <div className="w-8 h-[2px] bg-[#E84797]/30 rounded-full" />
                                        <p className="text-[10px] font-medium text-gray-400">0{idx + 1}</p>
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors"
                            onClick={closeLightbox}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Arrows */}
                        {project.images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-6 z-50 w-12 h-12 hidden md:flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    className="absolute right-6 z-50 w-12 h-12 hidden md:flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Current Image */}
                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            src={selectedImage}
                            alt="Fullscreen Portfolio"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                            {currentIndex + 1} / {project.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </Section>
    );
};

export default PortfolioDetailPage;
