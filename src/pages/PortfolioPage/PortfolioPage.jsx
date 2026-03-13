import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioItems } from '../../data';
import { Section, SectionHeader, PortfolioCard, SpotlightCard } from '../../common';
import { staggerContainer } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';

const PortfolioPage = () => {
    const { setActiveSection } = useApp();
    useEffect(() => { setActiveSection('portfolio'); }, [setActiveSection]);

    return (
        <Section id="portfolio" bg="white" className="pt-28">
            <SectionHeader
                eyebrow="My Work"
                title="Portfolio"
                subtitle="A selection of projects showcasing my creative range across photography, media production, and digital content."
            />

            <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {portfolioItems.map((item, i) => (
                    <SpotlightCard
                        key={item.id}
                        spotlightColor={i % 2 === 0 ? 'rgba(32, 63, 154, 0.15)' : 'rgba(232, 71, 151, 0.15)'}
                    >
                        <PortfolioCard item={item} index={i} noShadow />
                    </SpotlightCard>
                ))}
            </motion.div>
        </Section>
    );
};

export default PortfolioPage;
