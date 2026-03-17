import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerItem } from '../animations/variants';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

/**
 * PortfolioCard — card for a single portfolio item.
 */
const categoryColors = {
    Photography: { bg: 'bg-[#94C2DA]/20', text: 'text-[#4E7CB2]' },
    'Photography & Culture': { bg: 'bg-[#94C2DA]/20', text: 'text-[#4E7CB2]' },
    'Creative Photography': { bg: 'bg-[#E7A0CC]/20', text: 'text-[#E84797]' },
    'Editorial Photography': { bg: 'bg-[#94C2DA]/20', text: 'text-[#4E7CB2]' },
    'Portraiture & Lifestyle': { bg: 'bg-[#E7A0CC]/20', text: 'text-[#E84797]' },
    Media: { bg: 'bg-[#E7A0CC]/20', text: 'text-[#E84797]' },
    'Photography & Video': { bg: 'bg-[#203F9A]/10', text: 'text-[#203F9A]' },
    'Social Media': { bg: 'bg-[#E84797]/10', text: 'text-[#E84797]' },
};

const gradients = [
    'from-[#94C2DA] to-[#203F9A]',
    'from-[#E7A0CC] to-[#E84797]',
    'from-[#203F9A] to-[#4E7CB2]',
    'from-[#E84797] to-[#E7A0CC]',
    'from-[#4E7CB2] to-[#94C2DA]',
    'from-[#E7A0CC] to-[#203F9A]',
];

const emojis = ['📷', '🌅', '☕', '💍', '📱', '📦'];

const PortfolioCard = ({ item, index, noShadow = false }) => {
    const navigate = useNavigate();
    const colors = categoryColors[item.category] ?? categoryColors.Photography;
    const gradient = gradients[index % gradients.length];

    const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <div
            onClick={() => navigate(`/portfolio/${item.id}`)}
            className={`cursor-pointer group h-full flex flex-col transition-all duration-300 ${noShadow ? '' : 'rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2'
                }`}
        >
            {/* Visual */}
            <div className={`relative h-56 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center overflow-hidden bg-gray-100 dark:bg-slate-900`}>
                {firstImage ? (
                    <img
                        src={firstImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        loading="lazy"
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                        <div className="z-10 text-center text-white px-4">
                            <div className="text-4xl mb-1.5 opacity-80">{emojis[index % emojis.length]}</div>
                            <p className="text-sm font-medium opacity-90">{item.category}</p>
                        </div>
                    </>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-lg backdrop-blur-sm shadow-xl">
                            →
                        </div>
                        {item.images && item.images.length > 1 && (
                            <p className="text-white mt-3 font-semibold text-sm tracking-widest">{item.images.length} PHOTOS</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 bg-white dark:bg-slate-800/80 rounded-b-2xl">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${colors.bg} ${colors.text}`}>
                    {item.category}
                </span>
                <h3 className="font-bold text-[#203F9A] dark:text-gray-100 text-lg mb-2 font-display group-hover:text-[#E84797] dark:group-hover:text-[#E7A0CC] transition-colors duration-300">
                    {item.title}
                </h3>
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none mb-4">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {item.description}
                    </ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#EFE8E0] dark:bg-slate-700 text-gray-500 dark:text-gray-300 px-3 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;
