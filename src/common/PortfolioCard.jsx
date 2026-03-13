import { motion } from 'framer-motion';
import { staggerItem } from '../animations/variants';

/**
 * PortfolioCard — card for a single portfolio item.
 */
const categoryColors = {
    Photography: { bg: 'bg-[#94C2DA]/20', text: 'text-[#4E7CB2]' },
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
    const colors = categoryColors[item.category] ?? categoryColors.Photography;
    const gradient = gradients[index % gradients.length];

    return (
        <div
            className={`group h-full flex flex-col transition-all duration-300 ${noShadow ? '' : 'rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2'
                }`}
        >
            {/* Visual */}
            <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="z-10 text-center text-white px-4">
                    <div className="text-4xl mb-1.5 opacity-80">{emojis[index % emojis.length]}</div>
                    <p className="text-sm font-medium opacity-90">{item.category}</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-lg">
                        →
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 bg-white">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${colors.bg} ${colors.text}`}>
                    {item.category}
                </span>
                <h3 className="font-bold text-[#203F9A] text-lg mb-2 font-display group-hover:text-[#E84797] transition-colors duration-300">
                    {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#EFE8E0] text-gray-500 px-3 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;
