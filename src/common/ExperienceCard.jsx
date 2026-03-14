import { motion } from 'framer-motion';
import { staggerItem } from '../animations/variants';

/**
 * ExperienceCard — timeline card showing a single work experience.
 * Used by the Experience section.
 */
const badgeMap = {
    'Full-time': 'bg-[#203F9A]/10 text-[#203F9A]',
    'Freelance': 'bg-[#E84797]/10 text-[#E84797]',
    'Internship': 'bg-[#94C2DA]/30 text-[#4E7CB2]',
};

const ExperienceCard = ({ exp }) => {
    const isBlue = exp.color === 'blue';

    return (
        <div
            className={`
        flex-1 rounded-2xl p-6 transition-all duration-300
        ${exp.noShadow ? '' : 'bg-white dark:bg-slate-800/50 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1'}
        ${isBlue
                    ? 'hover:border-[#203F9A]/30 dark:hover:border-[#94C2DA]/30'
                    : 'hover:border-[#E84797]/30 dark:hover:border-[#E7A0CC]/30'
                }
      `}
        >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                    <h3 className="font-bold text-lg text-[#203F9A] dark:text-white font-display">{exp.role}</h3>
                    <p className="text-[#4E7CB2] dark:text-[#94C2DA] font-semibold text-sm">{exp.company}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badgeMap[exp.type]} dark:bg-slate-700 dark:text-gray-300`}>
                    {exp.type}
                </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E84797] inline-block" />
                    {exp.period}
                </span>
                <span>{exp.location}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>

            {/* Achievements */}
            <ul className="space-y-2">
                {exp.achievements.map((ach) => (
                    <li key={ach} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isBlue ? 'bg-[#203F9A] dark:bg-[#94C2DA]' : 'bg-[#E84797] dark:bg-[#E7A0CC]'}`} />
                        {ach}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceCard;
