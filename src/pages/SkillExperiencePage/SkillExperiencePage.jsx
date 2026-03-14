import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Monitor, Star, Briefcase } from 'lucide-react';
import { skillCategories, experiences } from '../../data';
import { Section, SectionHeader, ExperienceCard, SpotlightCard } from '../../common';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';

const iconMap = { Camera, Film, Monitor, Star };

const tagPalette = {
    blue: [
        'bg-[#94C2DA]/30 text-[#203F9A] hover:bg-[#203F9A] hover:text-white dark:bg-[#94C2DA]/10 dark:text-[#94C2DA] dark:hover:bg-[#94C2DA] dark:hover:text-white',
        'bg-[#203F9A]/10 text-[#4E7CB2] hover:bg-[#4E7CB2] hover:text-white dark:bg-[#203F9A]/20 dark:text-[#94C2DA] dark:hover:bg-[#4E7CB2] dark:hover:text-white',
        'bg-[#E7A0CC]/20 text-[#203F9A] hover:bg-[#203F9A] hover:text-white dark:bg-[#E7A0CC]/10 dark:text-[#94C2DA] dark:hover:bg-[#203F9A] dark:hover:text-white',
    ],
    pink: [
        'bg-[#E7A0CC]/30 text-[#E84797] hover:bg-[#E84797] hover:text-white dark:bg-[#E7A0CC]/10 dark:text-[#E7A0CC] dark:hover:bg-[#E84797] dark:hover:text-white',
        'bg-[#E84797]/10 text-[#E84797] hover:bg-[#E84797] hover:text-white dark:bg-[#E84797]/20 dark:text-[#E7A0CC] dark:hover:bg-[#E84797] dark:hover:text-white',
        'bg-[#94C2DA]/20 text-[#4E7CB2] hover:bg-[#4E7CB2] hover:text-white dark:bg-[#94C2DA]/10 dark:text-[#94C2DA] dark:hover:bg-[#4E7CB2] dark:hover:text-white',
    ],
};

const SkillExperiencePage = () => {
    const { setActiveSection } = useApp();
    useEffect(() => { setActiveSection('experience'); }, [setActiveSection]);

    return (
        <div className="pt-28 pb-16">
            <SectionHeader
                eyebrow="Expertise"
                title="Skill & Experience"
                subtitle="A blend of technical prowess and professional journey in the world of media and photography."
                centered
            />

            {/* ── SKILLS SECTION ── */}
            <Section id="skills-section" className="py-12">
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-2">My Skills</h3>
                    <div className="w-20 h-1 bg-[#E84797] mx-auto rounded-full"></div>
                </div>

                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6"
                >
                    {skillCategories.map((cat) => {
                        const Icon = iconMap[cat.icon] || Star;
                        const isBlue = cat.palette === 'blue';
                        const styles = tagPalette[cat.palette];

                        return (
                            <motion.div key={cat.title} variants={staggerItem}>
                                <SpotlightCard
                                    spotlightColor={isBlue ? 'rgba(32, 63, 154, 0.12)' : 'rgba(232, 71, 151, 0.12)'}
                                    className="h-full"
                                >
                                    <div className="p-6 h-full bg-white dark:bg-slate-800/80">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBlue ? 'bg-[#203F9A]' : 'bg-[#E84797]'}`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className={`font-bold text-lg ${isBlue ? 'text-[#203F9A] dark:text-[#94C2DA]' : 'text-[#E84797] dark:text-[#E7A0CC]'}`}>
                                                {cat.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((skill, i) => (
                                                <span
                                                    key={skill}
                                                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                                    transition-all duration-300 hover:scale-105 cursor-default ${styles[i % styles.length]}`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Section>

            {/* ── EXPERIENCE SECTION ── */}
            <Section id="experience" className="py-12">
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-2">Work Experience</h3>
                    <div className="w-20 h-1 bg-[#203F9A] mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative px-6">
                    {/* Vertical line */}
                    <div className="absolute left-[2.75rem] md:left-[2.75rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#203F9A] via-[#94C2DA] to-transparent dark:from-[#94C2DA] dark:via-[#203F9A] dark:to-transparent" />

                    <motion.div
                        variants={staggerContainer(0.15)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {experiences.map((exp) => (
                            <motion.div key={exp.id} variants={staggerItem} className="relative flex gap-6 mb-10 pl-4 md:pl-0">
                                {/* Timeline dot */}
                                <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 40 }}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 ${exp.color === 'blue' ? 'bg-[#203F9A]' : 'bg-[#E84797]'
                                        }`}>
                                        <Briefcase className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <SpotlightCard
                                    className="flex-1"
                                    spotlightColor={exp.color === 'blue' ? 'rgba(32, 63, 154, 0.15)' : 'rgba(232, 71, 151, 0.15)'}
                                >
                                    <div className="bg-white dark:bg-slate-800/80 rounded-xl">
                                        <ExperienceCard exp={{ ...exp, noShadow: true }} />
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>
        </div>
    );
};

export default SkillExperiencePage;
