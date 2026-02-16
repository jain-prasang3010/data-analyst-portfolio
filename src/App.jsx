import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, FileText, BarChart2, Database, Briefcase, Sparkles, Mail, Linkedin, Github } from 'lucide-react';
import blinkitImg from './assets/projects/blinkit-dashboard.png';
import customerIntellImg from './assets/projects/customer-intelligence-dashboard.png';
import netflixImg from './assets/projects/netflix-dashboard.png';
import profileImg from './assets/profile.png';
import resumePDF from './assets/resume.pdf';

const DotGridCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });

    const spacing = 18;
    const dotRadius = 0.8;

    const renderStaticGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(71, 85, 105, 0.25)';

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    window.addEventListener('resize', renderStaticGrid);
    renderStaticGrid();

    return () => {
      window.removeEventListener('resize', renderStaticGrid);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

const SectionHeader = ({ index, title, watermark }) => (
  <Motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative mb-12 group"
  >
    {/* Watermark Text */}
    <div className="absolute -top-8 -left-2 text-7xl md:text-8xl font-black text-white/[0.03] select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap group-hover:text-white/[0.05] transition-colors duration-500">
      {watermark}
    </div>

    {/* Foreground Header */}
    <div className="relative flex items-end gap-6">
      <div className="flex flex-col">
        <span className="text-primary font-mono text-xs tracking-widest mb-2 font-bold">{index} //</span>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">
          {title}
        </h2>
      </div>
      <div className="flex-grow h-[2px] bg-gradient-to-r from-primary/40 to-transparent mb-1 hidden lg:block opacity-50"></div>
    </div>
  </Motion.div>
);

const SideExplorer = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'skills', 'about', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Use a more predictable threshold for active section detection
          if (rect.top <= 250) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: '🏠' },
    { name: 'XP', href: '#experience', id: 'experience', icon: '💼' },
    { name: 'Works', href: '#projects', id: 'projects', icon: '🚀' },
    { name: 'Skills', href: '#skills', id: 'skills', icon: '🛠️' },
    { name: 'Profile', href: '#about', id: 'about', icon: '👤' },
    { name: 'Connect', href: '#contact', id: 'contact', icon: '✉️' }
  ];

  return (
    <Motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-20 md:w-24 z-50 bg-[#020617]/80 backdrop-blur-xl border-r border-slate-800/50 flex flex-col items-center py-12 gap-10 hidden md:flex"
    >
      {/* Navigation Tabs */}

      {/* Navigation Tabs */}
      <div className="flex flex-col gap-2 w-full px-2">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`relative flex flex-col items-center justify-center py-4 rounded-xl transition-all group ${activeSection === link.id ? 'bg-primary/10 text-primary shadow-lg shadow-primary/5' : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <span className="text-lg mb-1">{link.icon}</span>
            <span className="text-[9px] uppercase tracking-widest font-bold font-mono">{link.name}</span>

            {/* Active Indicator */}
            {activeSection === link.id && (
              <Motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Tooltip on hover */}
            <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest whitespace-nowrap z-50 shadow-xl border border-slate-700">
              {link.id}
            </div>
          </a>
        ))}
      </div>

      {/* Social Shortcut Footer */}
      <div className="mt-auto flex flex-col gap-6 text-slate-500 pb-4">
        <a href="https://linkedin.com/in/prasangjain31" target="_blank" className="hover:text-primary transition-colors hover:scale-110"><Linkedin size={20} /></a>
        <a href="https://github.com/jain-prasang3010" target="_blank" className="hover:text-primary transition-colors hover:scale-110"><Github size={20} /></a>
      </div>
    </Motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] selection:bg-slate-700 selection:text-white relative overflow-x-hidden text-slate-300">

      {/* Side Explorer Navigation */}
      <SideExplorer />

      {/* Optimized Canvas Background */}
      <DotGridCanvas />

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] neon-bg-glow rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] neon-bg-glow rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content with Sidebar Offset */}
      <main className="md:pl-24 lg:pl-32">
        {/* Landing / Hero Section */}
        <section id="home" className="pt-24 pb-12 px-8 md:px-16 max-w-6xl mx-auto relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tagline / Subtitle */}
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl text-slate-400 font-light tracking-tight">
                Hi, I'm <span className="text-white font-medium underline decoration-slate-700 underline-offset-8">Prasang Jain</span>
              </h2>
            </div>

            {/* Big Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 neon-glow max-w-4xl">
              Data Analyst <br />
              <span className="text-primary font-medium block mt-2 text-2xl md:text-3xl tracking-widest uppercase">SQL • Python • Machine Learning • Power BI</span>
            </h1>

            {/* Impact Statement Tagline */}
            <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mb-10 leading-relaxed italic border-l-2 border-primary/30 pl-6">
              Turning complex data into measurable business impact through analytics and predictive modeling.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center cursor-default">
              <a
                href="#projects"
                className="px-8 py-3 bg-slate-800/40 text-white border border-slate-700 rounded-lg font-bold hover:bg-slate-700/60 transition-all shadow-lg shadow-black/20 flex items-center gap-2 group text-sm"
              >
                <BarChart2 size={18} className="group-hover:scale-110 transition-transform text-primary" />
                View My Projects
              </a>
              <a
                href={resumePDF}
                download="Prasang_Jain_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-slate-800/40 text-white border border-slate-700 rounded-lg font-bold hover:bg-slate-700/60 transition-all flex items-center gap-2 group shadow-lg shadow-black/20 text-sm"
              >
                <FileText size={18} className="group-hover:translate-y-[-2px] transition-transform text-primary" />
                Download Resume
              </a>
            </div>

            {/* Key Achievements Bar */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
            >
              {[
                { label: "Deloitte Experience", val: "Internship 2025", sub: "Data Analyst Role" },
                { label: "ML Model Precision", val: "15% Error Reduction", sub: "ARIMA Demand Forecasting" },
                { label: "Enterprise BI", val: "8,000+ Data Points", sub: "Blinkit Performance Monitoring" }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800/40 p-4 rounded-xl flex flex-col justify-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">{stat.val}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{stat.sub}</p>
                </div>
              ))}
            </Motion.div>
          </Motion.div>
        </section>

        {/* SECTION 1 — EXPERIENCE */}
        <section id="experience" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <SectionHeader index="01" title="Professional" watermark="EXPERIENCE" />

          <div className="space-y-12">
            {/* Deloitte Entry */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-slate-800 hover:border-primary/50 transition-colors"
            >
              <div className="absolute -left-[11px] top-0 w-5 h-5 bg-slate-950 border-2 border-primary rounded-full z-10"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Briefcase size={20} className="text-primary" />
                    Data Analyst Intern
                  </h3>
                  <p className="text-primary font-medium">Deloitte</p>
                </div>
                <div className="text-slate-500 text-sm font-medium bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                  June 2025 – July 2025
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-slate-700"></span> Responsibilities
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2 text-slate-300">
                      <span className="text-primary mt-1">•</span>
                      <span className="font-medium">Data Automation:</span> Automated SQL-based reporting workflows, reducing manual analysis time by 25%.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="font-medium">SQL Optimization:</span> Engineered complex analytical queries to retrieve and aggregate large datasets across multiple business units.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="font-medium">Python Preprocessing:</span> Developed scalable cleaning scripts using Pandas/NumPy to ensure data integrity for internal reporting.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="font-medium">BI Dashboarding:</span> Designed and maintained interactive KPI tracking solutions for cross-functional stakeholders.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-slate-700"></span> Impact & Achievements
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-slate-200">Improved reporting efficiency</span> by streamlining data extraction processes and reducing manual overhead.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-slate-200">Supported data-driven strategy</span> for leadership by identifying performance trends and bottleneck areas.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-slate-200">Stakeholder Communication:</span> Presented analytical findings to cross-functional teams to influence monitoring strategies.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-slate-200">Data Accuracy:</span> Enhanced validation techniques to reduce preprocessing errors and ensure reliable KPIs.
                    </li>
                  </ul>
                </div>
              </div>
            </Motion.div>

            {/* Independent Projects Summary */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative pl-8 border-l-2 border-slate-800 hover:border-primary/50 transition-colors"
            >
              <div className="absolute -left-[11px] top-0 w-5 h-5 bg-slate-950 border-2 border-primary rounded-full z-10"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-primary" />
                    Data Analytics & Machine Learning Projects
                  </h3>
                  <p className="text-primary font-medium">Independent Projects</p>
                </div>
                <div className="text-slate-500 text-sm font-medium bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                  2024 – Present
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-400 leading-relaxed grid gap-4 max-w-4xl">
                <p>Built a <strong>Sales Demand Forecasting</strong> model using time-series analysis (ARIMA, ML models) to predict future sales trends.</p>
                <p>Conducted <strong>Customer Intelligence Analysis</strong> using RFM and K-Means clustering for customer segmentation.</p>
                <p>Developed a <strong>Retail Sales Analysis</strong> system using SQL to evaluate revenue trends and product performance.</p>
                <p>Designed an interactive <strong>Netflix Dashboard</strong> using Power BI with DAX-based KPIs and data modeling.</p>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* SECTION 2 — PROJECTS */}
        <section id="projects" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <SectionHeader index="02" title="Featured" watermark="PROJECTS" />

          <div className="space-y-8">
            {/* Row 1: Interactive Dashboards (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card: Customer Intelligence Analysis */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-xl shadow-black/40"
              >
                <div className="aspect-video bg-slate-950 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
                  <img
                    src={customerIntellImg}
                    alt="Customer Intelligence Dashboard"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">ML Clustering & Churn</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Customer Intelligence</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Implemented RFM segmentation and K-Means clustering to analyze customer behavior. <span className="text-white">Identified 4 high-value segments contributing to 60% of total revenue</span> and developed churn modeling strategies.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Python", "Power BI", "K-Means", "RFM", "Churn Modeling"].map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="https://github.com/jain-prasang3010/customer-intelligence-analysis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-primary transition-colors">
                    View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Motion.div>

              {/* Project Card: Blinkit Sales & Analysis */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-xl shadow-black/40"
              >
                <div className="aspect-video bg-slate-950 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
                  <img
                    src={blinkitImg}
                    alt="Blinkit Dashboard"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">Power BI Dashboard</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Blinkit Sales Analysis</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Developed a comprehensive Power BI dashboard to analyze sales performance and outlet efficiency. <span className="text-white">Enabled instant visibility into 8,000+ data points</span> across different regions and outlet tiers.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Power BI", "DAX", "Data Modeling", "ETL", "Dashboarding"].map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="https://github.com/jain-prasang3010/blinkitAnalysis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-primary transition-colors">
                    View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Motion.div>

              {/* Project Card: Netflix Movies & TV Shows Dashboard */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-xl shadow-black/40"
              >
                <div className="aspect-video bg-slate-950 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
                  <img
                    src={netflixImg}
                    alt="Netflix Dashboard"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">Content Visualization</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Netflix Content Dashboard</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Developed an interactive Power BI dashboard to <span className="text-white">analyze 8,800+ titles</span>, exploring genre distribution and regional availability across 19 categories for content strategy.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Power BI", "DAX", "Data Modeling", "Visualization", "Business Intelligence"].map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="https://github.com/jain-prasang3010/Netflix-Movies-and-TV-Shows-Dashboard-Public" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-primary transition-colors">
                    View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Motion.div>
            </div>

            {/* Row 2: Technical & Predictive Projects (2 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project Card: Sales Demand Forecasting */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-xl shadow-black/40 flex flex-col justify-center"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart2 size={24} className="text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Sales Demand Forecasting</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Developed a predictive framework using <strong>ARIMA (5,1,0)</strong> to forecast daily demand. <span className="text-white">Achieved a 15% reduction in prediction error (MAE: 503.49)</span> and optimized inventory planning by identifying seasonal decomposition patterns.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Python", "Pandas", "ARIMA", "Scikit-learn", "EDA"].map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="https://github.com/jain-prasang3010/sales-demand-forecasting" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-primary transition-colors">
                    View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Motion.div>

              {/* Project Card: Retail Sales Analysis Using SQL */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-xl shadow-black/40 flex flex-col justify-center"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Database size={24} className="text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Retail Sales Analysis (SQL)</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Leveraged advanced SQL Window Functions to extract KPIs from 2,000+ transactions. <span className="text-white">Reduced manual reporting time by 25%</span> by optimizing complex joins and analytical query workflows.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["SQL", "MySQL", "Data Cleaning", "Aggregations", "Query Optimization"].map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="https://github.com/jain-prasang3010/Retail-Sales-Analysis-Using-SQL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-primary transition-colors">
                    View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SKILLS & TOOLS */}
        <section id="skills" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <SectionHeader index="03" title="Expertise" watermark="SKILLS" />

          {/* Tiered Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {/* Core Analytics */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-primary/40 transition-all group shadow-xl shadow-black/20"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Core Analytics</h3>
              <ul className="space-y-3">
                {[
                  { label: "SQL", detail: "Joins, CTEs, Window Functions" },
                  { label: "Python", detail: "Pandas, NumPy, Analysis" },
                  { label: "Power BI", detail: "DAX, Data Modeling" }
                ].map((skill, i) => (
                  <li key={i} className="group/item">
                    <p className="text-sm font-bold text-slate-200 group-hover/item:text-primary transition-colors">{skill.label}</p>
                    <p className="text-xs text-slate-500">{skill.detail}</p>
                  </li>
                ))}
              </ul>
            </Motion.div>

            {/* Machine Learning */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-primary/40 transition-all group shadow-xl shadow-black/20"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Machine Learning</h3>
              <ul className="space-y-3">
                {[
                  "Regression & Classification",
                  "Random Forest & Boosting",
                  "Model Evaluation (ROC-AUC)",
                  "Cross-validation & Tuning"
                ].map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </Motion.div>

            {/* Data Engineering Basics */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-primary/40 transition-all group shadow-xl shadow-black/20"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Data Engineering</h3>
              <ul className="space-y-3">
                {[
                  "Automated Data ETL",
                  "Feature Engineering",
                  "Data Cleaning & Validation",
                  "Pipeline Architecture"
                ].map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </Motion.div>
          </div>

          {/* Tools & Platforms cloud */}
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["Git & GitHub", "VS Code", "Jupyter Notebook", "Power BI Desktop", "Excel (VLOOKUP, Pivot Tables)"].map((tool, i) => (
              <span key={i} className="px-5 py-2 bg-slate-800/30 border border-slate-700/50 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:border-primary/50 transition-all">
                {tool}
              </span>
            ))}
          </Motion.div>
        </section>

        {/* SECTION 4 — ABOUT ME */}
        <section id="about" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left Side: Short Bio */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-12 xl:col-span-7"
            >
              <SectionHeader index="04" title="About Me" watermark="PROFILE" />

              <p className="text-xl md:text-2xl font-light text-white leading-snug mb-6">
                I specialize in <span className="text-primary font-medium">analyzing structured datasets</span>, building predictive models, and designing dashboards that <span className="text-primary font-medium">improve reporting efficiency</span> and enable data-driven strategy.
              </p>

              <p className="text-base text-slate-400 leading-relaxed mb-6">
                I enjoy working with structured and unstructured data to uncover patterns, trends, and insights that support strategic decision-making. Through hands-on projects, I have developed practical experience in <span className="text-white">SQL, Python, and Power BI</span> to analyze data and build meaningful dashboards.
              </p>
            </Motion.div>

            {/* Right Side: Profile Image & What I Do */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-12 xl:col-span-5 flex flex-col items-center xl:items-start"
            >
              {/* Profile Image Container */}
              <div className="relative mt-8 mb-12 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-slate-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl flex items-center justify-center">
                  <img
                    src={profileImg}
                    alt="Prasang Jain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-[1.02] group-hover:scale-105 transition-transform"
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center p-6 text-center bg-slate-900">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                      <Briefcase size={24} className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Profile Photo</p>
                    <p className="text-[10px] text-slate-600 mt-2">Profile image linked from src/assets/profile.png</p>
                  </div>
                  {/* Glass Overlay on Image Bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <div className="w-full h-[1px] bg-primary/30"></div>
                  </div>
                </div>

                {/* Decorative Elements around image */}
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/20 rounded-bl-lg"></div>
              </div>

              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(226,232,240,0.5)]"></div>
                What I Do:
              </h3>

              <ul className="space-y-4 w-full">
                {[
                  "Analyze large datasets for insights",
                  "Write optimized SQL queries",
                  "Python data transformation",
                  "Build Power BI dashboards",
                  "Data-driven business solutions"
                ].map((skill, index) => (
                  <li key={index} className="flex gap-3 group items-center">
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center border border-slate-700/50 rounded text-[10px] text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                      {skill}
                    </p>
                  </li>
                ))}
              </ul>
            </Motion.div>

          </div>
        </section>

        {/* SECTION 5 — ANALYTICAL APPROACH */}
        <section id="methodology" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <SectionHeader index="05" title="Methodology" watermark="APPROACH" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white leading-tight">
                Data is just noise without a <span className="text-primary italic">structured methodology.</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                My approach focuses on the intersection of business logic and statistical rigor. I don't just build models; I solve business problems by following an end-to-end analytical lifecycle.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Define", desc: "Aligning analytical goals with business KPIs." },
                { title: "Extract", desc: "SQL-driven data retrieval and ETL workflows." },
                { title: "Analyze", desc: "Statistical modeling and predictive insights." },
                { title: "Deploy", desc: "Interactive BI solutions for stakeholders." }
              ].map((step, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-tighter mb-1">{step.title}</p>
                  <p className="text-xs text-slate-500 leading-snug">{step.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 6 — CONTACT */}
        <section id="contact" className="py-16 px-8 md:px-16 max-w-6xl mx-auto relative z-10 border-t border-slate-800/30">
          <SectionHeader index="06" title="Connect" watermark="CONTACT" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Contact Information */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Turning Data Into <br />
                  <span className="text-primary italic">Business Impact.</span>
                </h3>
                <p className="text-slate-400 max-w-md leading-relaxed">
                  I’m open to data analytics opportunities, collaborations, and meaningful conversations. Feel free to reach out.
                </p>
              </div>

              <div className="space-y-6">
                <a href="mailto:mejainprasang43@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-primary/50 transition-all shadow-lg">
                    <Mail size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">mejainprasang43@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/prasang-jain-17a378212/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-primary/50 transition-all shadow-lg">
                    <Linkedin size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">LinkedIn</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">linkedin.com/in/prasang-jain-17a378212/</p>
                  </div>
                </a>

                <a href="https://github.com/jain-prasang3010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-primary/50 transition-all shadow-lg">
                    <Github size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">GitHub</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">github.com/jain-prasang3010</p>
                  </div>
                </a>
              </div>

              <div className="pt-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    Currently open to full-time Data Analyst roles
                  </span>
                </div>
              </div>
            </Motion.div>

            {/* Right: Contact Form */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 border border-slate-800/50 p-8 md:p-10 rounded-3xl backdrop-blur-sm relative shadow-2xl shadow-black"
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Collaboration"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Let's talk about..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors duration-300 shadow-lg shadow-primary/20 uppercase tracking-widest text-xs mt-4"
                >
                  Send Message
                </button>
              </form>

              {/* Subtle glow effect */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
            </Motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-2 px-8 text-center border-t border-slate-800/30 relative z-10 transition-colors">
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">
            © {new Date().getFullYear()} Prasang Jain • Crafted with React & Tailwind
          </p>
        </footer>
      </main>
    </div>
  );
}
