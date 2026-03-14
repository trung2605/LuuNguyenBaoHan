import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Star } from 'lucide-react';
import { education } from '../../data';
import { Section, SectionHeader, SpotlightCard } from '../../common';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';

const EducationPage = () => {
    const { setActiveSection } = useApp();
    useEffect(() => { setActiveSection('education'); }, [setActiveSection]);

    return (
        <Section id="education" bg="beige" className="pt-28">
            <SectionHeader
                eyebrow="Background"
                title="Education"
                subtitle="A solid academic foundation in media and communications, complemented by professional creative training."
            />

            <motion.div
                variants={staggerContainer(0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-4xl mx-auto space-y-6"
            >
                {education.map((edu, i) => {
                    const isBlue = i % 2 === 0;
                    return (
                        <motion.div key={edu.id} variants={staggerItem}>
                            <SpotlightCard
                                spotlightColor={isBlue ? 'rgba(32, 63, 154, 0.12)' : 'rgba(232, 71, 151, 0.12)'}
                            >
                                <div className={`p-6 md:p-8 flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-800/80`}>
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${isBlue ? 'bg-[#203F9A]' : 'bg-[#E84797]'}`}>
                                        <GraduationCap className="w-7 h-7 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                            <div>
                                                <h3 className="font-bold text-xl text-[#203F9A] dark:text-white font-display">{edu.degree}</h3>
                                                <p className={`font-semibold mt-1 ${isBlue ? 'text-[#4E7CB2] dark:text-[#94C2DA]' : 'text-[#E84797] dark:text-[#E7A0CC]'}`}>{edu.institution}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-full block mb-1">
                                                    {edu.period}
                                                </span>
                                                <div className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full ${isBlue ? 'bg-[#203F9A]/10 dark:bg-[#203F9A]/20 text-[#203F9A] dark:text-[#94C2DA]' : 'bg-[#E84797]/10 dark:bg-[#E84797]/20 text-[#E84797] dark:text-[#E7A0CC]'
                                                    }`}>
                                                    <Award className="w-3 h-3" />
                                                    {edu.grade}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{edu.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.highlights.map((h) => (
                                                <span
                                                    key={h}
                                                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${isBlue ? 'bg-[#94C2DA]/25 dark:bg-[#94C2DA]/10 text-[#203F9A] dark:text-[#94C2DA]' : 'bg-[#E7A0CC]/30 dark:bg-[#E7A0CC]/10 text-[#E84797] dark:text-[#E7A0CC]'
                                                        }`}
                                                >
                                                    <Star className="w-3 h-3" />
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
};

export default EducationPage;
