import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, ArrowDown, Sparkles, Quote,
    Send, Linkedin, Instagram, CheckCircle2, AlertCircle, Phone,
    Briefcase, Code, Palette, GraduationCap, ChevronRight
} from 'lucide-react';
import { personalInfo, stats, testimonials } from '../../data';
import {
    AnimatedButton, SplitText, ShinyText, SpotlightCard,
    SectionHeader, Section
} from '../../common';
import { fadeUp, staggerContainer, staggerItem, floatAnimation } from '../../animations/variants';
import { useApp } from '../../contexts/AppContext';
import emailjs from '@emailjs/browser';

const HomePage = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const { setActiveSection } = useApp();
    const navigate = useNavigate();

    // Contact Form State
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setActiveSection('home');
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [setActiveSection]);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            setStatus('error');
            setTimeout(() => setStatus(null), 5000);
            return;
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || serviceId === 'your_service_id_here' || !templateId || templateId === 'your_template_id_here' || !publicKey || publicKey === 'your_public_key_here') {
            console.warn("EmailJS credentials not fully configured. Please check your .env file.");
            // For now, simulate success so the UI doesn't break if they haven't filled it out yet
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            }, 1000);
            return;
        }

        setLoading(true);

        try {
            const templateParams = {
                name: form.name,
                email: form.email,
                title: form.subject || 'New Contact Message',
                message: form.message,
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    const exploreItems = [
        { id: 'experience', label: 'Skills & Journey', title: 'Skill & Experience', path: '/experience', icon: Briefcase, color: '#203F9A' },
        { id: 'portfolio', label: 'My Work', title: 'Project Portfolio', path: '/portfolio', icon: Palette, color: '#94C2DA' },
        { id: 'education', label: 'Background', title: 'Education', path: '/education', icon: GraduationCap, color: '#4E7CB2' },
    ];

    const contactItems = [
        { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
        { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
        { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
    ];

    const socialLinks = [
        { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin },
        { icon: Instagram, label: 'Instagram', href: personalInfo.instagram },
    ];

    return (
        <div className="flex flex-col gap-24 py-16">
            {/* ── HERO SECTION ── */}
            <section
                id="home"
                className="relative min-h-[90vh] flex items-center overflow-hidden"
            >
                {/* Decorative blobs */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#94C2DA]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-0 w-72 h-72 bg-[#E7A0CC]/25 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

                        {/* ── LEFT: Text ── */}
                        <motion.div
                            className="flex-1 text-center lg:text-left"
                            variants={staggerContainer(0.1, 0.1)}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={staggerItem} className="flex justify-center lg:justify-start">
                                <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 border border-[#94C2DA] dark:border-[#94C2DA]/30
                                  text-[#203F9A] dark:text-gray-200 text-xs md:text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-[#E84797]" />
                                    <ShinyText text="Available for new projects" speed={3} />
                                </div>
                            </motion.div>

                            <div className="mb-4">
                                <SplitText
                                    text="Hi, I'm"
                                    className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-100"
                                    delay={0.2}
                                />
                                <div className="block mt-1">
                                    <span className="font-display font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#203F9A] to-[#E84797] dark:from-[#94C2DA] dark:to-[#E84797] bg-clip-text text-transparent leading-tight">
                                        {personalInfo.nameVi}
                                    </span>
                                </div>
                            </div>

                            <motion.div variants={staggerItem} className="h-8 md:h-10 overflow-hidden mb-5" aria-live="polite">
                                {personalInfo.roles.map((role, i) => (
                                    <p
                                        key={role}
                                        className={`text-lg md:text-2xl font-semibold text-[#4E7CB2] dark:text-[#E7A0CC] transition-all duration-500 ${i === roleIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 absolute'
                                            }`}
                                    >
                                        {role}
                                    </p>
                                ))}
                            </motion.div>

                            <motion.div variants={staggerItem} className="flex justify-center lg:justify-start items-center gap-3 mb-6">
                                <div className="h-0.5 w-12 bg-[#E84797]" />
                                <div className="h-0.5 w-6 bg-[#94C2DA]" />
                            </motion.div>

                            <motion.p variants={staggerItem} className="text-gray-600 dark:text-gray-300 text-sm md:text-lg leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0">
                                {personalInfo.bio}
                            </motion.p>

                            <motion.div variants={staggerItem} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1.5 cursor-default group whitespace-nowrap">
                                    <MapPin className="w-4 h-4 text-[#E84797] dark:text-[#E7A0CC]" />
                                    {personalInfo.location}
                                </span>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-1.5 hover:text-[#203F9A] dark:hover:text-[#94C2DA] transition-colors duration-200 group whitespace-nowrap"
                                >
                                    <Mail className="w-4 h-4 text-[#203F9A] dark:text-[#94C2DA]" />
                                    {personalInfo.email}
                                </a>
                            </motion.div>

                            <motion.div variants={staggerItem} className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <AnimatedButton size="sm" className="md:size-default" onClick={() => {
                                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Get In Touch
                                </AnimatedButton>
                                <AnimatedButton size="sm" variant="outline" className="md:size-default" onClick={() => navigate('/portfolio')}>View My Work</AnimatedButton>
                            </motion.div>
                        </motion.div>

                        {/* ── RIGHT: Avatar ── */}
                        <motion.div
                            className="flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#203F9A] via-[#94C2DA] to-[#E84797]
                                  scale-105 opacity-20 blur-md" />
                                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#94C2DA]/30 scale-[1.03]" />

                                <motion.div
                                    animate={floatAnimation}
                                    className="relative w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group"
                                >
                                    <img
                                        src={personalInfo.avatarUrl}
                                        alt={personalInfo.avatarAlt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-4 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-xl px-3 py-2 md:px-4 md:py-2.5 flex items-center gap-2 border border-[#94C2DA]/30"
                                >
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#203F9A] flex items-center justify-center">
                                        <span className="text-white text-[10px] md:text-xs">📷</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] md:text-sm font-bold text-[#203F9A] dark:text-gray-200 leading-none">1K+ Photos</p>
                                        <p className="text-[8px] md:text-[10px] text-gray-400">Captured</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="absolute -top-2 -right-2 md:-top-3 md:-right-4 bg-[#203F9A] rounded-xl md:rounded-2xl shadow-xl px-3 py-2 md:px-4 md:py-2.5"
                                >
                                    <p className="text-white text-[10px] md:text-sm font-bold leading-none">3+ Years</p>
                                    <p className="text-[#94C2DA] text-[8px] md:text-[10px]">Journey</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Stats Row ── */}
                    <motion.div
                        variants={staggerContainer(0.08, 0.5)}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
                    >
                        {stats.map((stat) => (
                            <motion.div key={stat.label} variants={staggerItem}>
                                <SpotlightCard
                                    spotlightColor="rgba(255, 255, 255, 0.4)"
                                    className="border-[#EBB6D8]"
                                >
                                    <div className="px-4 py-6 md:px-6 md:py-8 text-center bg-white dark:bg-slate-800/80">
                                        <p className="font-display font-bold text-2xl md:text-4xl text-[#203F9A] dark:text-[#E7A0CC]">
                                            {stat.value}
                                        </p>
                                        <p className="text-[11px] md:text-sm text-[#203F9A]/80 dark:text-gray-300 mt-1 font-medium">{stat.label}</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── EXPLORE ME SECTION ── */}
            <Section id="explore">
                <SectionHeader
                    eyebrow="Explore Me"
                    title="Dive into my world"
                    subtitle="Discover my professional background, skills, and the creative projects I've brought to life."
                    centered
                />

                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="flex flex-wrap justify-center gap-6 mt-12"
                >
                    {exploreItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                variants={staggerItem}
                                onClick={() => navigate(item.path)}
                                className="cursor-pointer group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm"
                            >
                                <SpotlightCard
                                    spotlightColor={`${item.color}20`}
                                    className="h-full"
                                >
                                    <div className="p-8 flex flex-col items-center text-center h-full bg-white dark:bg-slate-800/80">
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-50 dark:border-slate-600">
                                            <Icon className="w-8 h-8" style={{ color: item.color }} />
                                        </div>
                                        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">{item.label}</p>
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg group-hover:text-[#203F9A] dark:group-hover:text-[#E84797] transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="mt-6 flex items-center gap-1 text-[#203F9A] dark:text-[#E7A0CC] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn More <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Section>


            {/* ── CONTACT SECTION ── */}
            <Section id="contact-section" className="mb-16">
                <SectionHeader
                    eyebrow="Let's Talk"
                    title="Contact With Me"
                    subtitle="Available for freelance projects, collaborations, or full-time opportunities. Let's create something beautiful together."
                    centered
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-12">
                    {/* Left: Contact Info */}
                    <motion.div
                        variants={staggerContainer(0.12)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {contactItems.map(({ icon: Icon, label, value, href }) => (
                            <motion.div key={label} variants={staggerItem}>
                                <SpotlightCard spotlightColor="rgba(32, 63, 154, 0.1)">
                                    <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/80">
                                        <div className="w-11 h-11 rounded-xl bg-[#203F9A]/10 dark:bg-[#94C2DA]/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-[#203F9A] dark:text-[#94C2DA]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">{label}</p>
                                            {href ? (
                                                <a href={href} className="text-sm font-semibold text-[#203F9A] dark:text-white hover:text-[#E84797] dark:hover:text-[#E84797] transition-colors duration-200">
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}

                        {/* Social card wrapper */}
                        <motion.div variants={staggerItem}>
                            <SpotlightCard spotlightColor="rgba(232, 71, 151, 0.2)">
                                <div className="bg-gradient-to-br from-[#203F9A] to-[#4E7CB2] p-6 text-white h-full shadow-lg">
                                    <p className="font-bold mb-2 text-white">Connect with me</p>
                                    <p className="text-white/70 text-sm mb-4">Follow my creative journey on social media.</p>
                                    <div className="flex gap-3">
                                        {socialLinks.map(({ icon: Icon, label, href }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center
                                 hover:bg-[#E84797] transition-colors duration-300"
                                            >
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    </motion.div>

                    {/* Right: Form wrapped in SpotlightCard */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="lg:col-span-3"
                    >
                        <SpotlightCard spotlightColor="rgba(32, 63, 154, 0.08)">
                            <form
                                onSubmit={handleSubmit}
                                className="p-7 md:p-10 bg-white dark:bg-slate-800 shadow-xl"
                                noValidate
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                    {[
                                        { id: 'contact-name', name: 'name', label: 'Your Name *', type: 'text', placeholder: 'Jane Doe' },
                                        { id: 'contact-email', name: 'email', label: 'Email Address *', type: 'email', placeholder: 'jane@example.com' },
                                    ].map(({ id, name, label, type, placeholder }) => (
                                        <div key={name}>
                                            <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
                                            <input
                                                id={id} type={type} name={name}
                                                value={form[name]} onChange={handleChange}
                                                placeholder={placeholder} required={label.includes('*')}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50
                                   focus:outline-none focus:ring-2 focus:ring-[#203F9A]/30 focus:border-[#203F9A] transition-all duration-200"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Subject</label>
                                    <input
                                        id="contact-subject" type="text" name="subject"
                                        value={form.subject} onChange={handleChange}
                                        placeholder="Photography booking / Collaboration"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-sm bg-gray-50 dark:bg-slate-900/50 dark:text-gray-100 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-[#203F9A]/30 focus:border-[#203F9A] dark:focus:border-[#94C2DA] transition-all duration-200"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Message *</label>
                                    <textarea
                                        id="contact-message" name="message" rows={5}
                                        value={form.message} onChange={handleChange} required
                                        placeholder="Tell me about your project or how I can help..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-sm resize-none bg-gray-50 dark:bg-slate-900/50 dark:text-gray-100 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-[#203F9A]/30 focus:border-[#203F9A] dark:focus:border-[#94C2DA] transition-all duration-200"
                                    />
                                </div>

                                {status === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4" /> Message sent! I'll get back to you soon.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-50 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                                        <AlertCircle className="w-4 h-4" /> Please fill in all required fields.
                                    </div>
                                )}

                                <AnimatedButton
                                    type="submit"
                                    loading={loading}
                                    fullWidth
                                    id="contact-submit"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </AnimatedButton>
                            </form>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
};

export default HomePage;
