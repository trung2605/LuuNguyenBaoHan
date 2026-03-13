import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from '../../data';
import { Section, SectionHeader, ExperienceCard, SpotlightCard } from '../../common';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';

const ExperiencePage = () => {
    const { setActiveSection } = useApp();
    useEffect(() => { setActiveSection('experience'); }, [setActiveSection]);

    return (
        <Section id="experience" bg="white" className="pt-28">
            <SectionHeader
                eyebrow="My Journey"
                title="Work Experience"
                subtitle="A track record of delivering creative excellence across media, photography, and digital content."
            />

            {/* Timeline */}
            <div className="max-w-4xl mx-auto relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#203F9A] via-[#94C2DA] to-transparent" />

                <motion.div
                    variants={staggerContainer(0.15)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {experiences.map((exp) => (
                        <motion.div key={exp.id} variants={staggerItem} className="relative flex gap-6 mb-10">
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
                                <ExperienceCard exp={{ ...exp, noShadow: true }} />
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default ExperiencePage;
