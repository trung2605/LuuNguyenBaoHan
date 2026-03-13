import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Monitor, Star } from 'lucide-react';
import { skillCategories } from '../../data';
import { Section, SectionHeader, SpotlightCard } from '../../common';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';

const iconMap = { Camera, Film, Monitor, Star };

const tagPalette = {
    blue: [
        'bg-[#94C2DA]/30 text-[#203F9A] hover:bg-[#203F9A] hover:text-white',
        'bg-[#203F9A]/10 text-[#4E7CB2] hover:bg-[#4E7CB2] hover:text-white',
        'bg-[#E7A0CC]/20 text-[#203F9A] hover:bg-[#203F9A] hover:text-white',
    ],
    pink: [
        'bg-[#E7A0CC]/30 text-[#E84797] hover:bg-[#E84797] hover:text-white',
        'bg-[#E84797]/10 text-[#E84797] hover:bg-[#E84797] hover:text-white',
        'bg-[#94C2DA]/20 text-[#4E7CB2] hover:bg-[#4E7CB2] hover:text-white',
    ],
};

const SkillsPage = () => {
    const { setActiveSection } = useApp();
    useEffect(() => { setActiveSection('skills'); }, [setActiveSection]);

    return (
        <Section id="skills" bg="beige" className="pt-28">
            <SectionHeader
                eyebrow="What I Do"
                title="Skills & Expertise"
                subtitle="A versatile toolkit built through years of hands-on creative work and continuous learning."
            />

            <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
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
                                <div className="p-6 h-full">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBlue ? 'bg-[#203F9A]' : 'bg-[#E84797]'}`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className={`font-bold text-lg ${isBlue ? 'text-[#203F9A]' : 'text-[#E84797]'}`}>
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
    );
};

export default SkillsPage;
