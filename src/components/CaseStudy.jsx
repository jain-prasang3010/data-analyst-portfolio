import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, Terminal, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';

const CodeBlock = ({ title, code, language = "sql" }) => (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden my-6">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={12} /> {title}
            </span>
            <span className="text-[10px] text-slate-600 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-slate-300">
            <code>{code}</code>
        </pre>
    </div>
);

const CaseStudy = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020617] overflow-y-auto"
        >
            {/* Navigation Header */}
            <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Back to Portfolio</span>
                    </button>
                    <div className="hidden md:block">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Deep Dive // Operations Performance</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* Header Section */}
                <header className="mb-16">
                    <div className="flex items-center gap-3 text-primary mb-4 font-mono text-xs font-bold tracking-widest uppercase">
                        <BarChart2 size={16} /> Data Analytics Case Study
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Case Study: Operations <br />
                        <span className="text-primary italic">Performance Dashboard</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                        A focused reporting initiative to standardize supply chain visibility and KPI tracking for retail operations.
                    </p>
                </header>

                {/* Executive Summary Grid */}
                <section className="grid md:grid-cols-2 gap-8 mb-20 bg-slate-900/20 border border-slate-800/50 p-8 rounded-3xl">
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">The Problem</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Operational data was siloed across multiple CSVs and legacy systems. Stakeholders lacked real-time visibility into fulfillment bottlenecks, leading to a 12% increase in delayed deliveries over Q3.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">The Impact</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Standardized city-level reporting across branches, improving visibility into fulfillment bottlenecks and supporting more informed resource allocation decisions.
                        </p>
                    </div>
                </section>

                {/* Methodology: Data Cleaning */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary">
                            <CheckCircle2 size={18} />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Phase 1: Data Preparation & Consolidation</h2>
                    </div>
                    <p className="text-slate-400 mb-6 italic border-l-2 border-primary/30 pl-6">
                        "Raw data is rarely ready for decision-making. I used Python to handle nulls and standardize dimensions."
                    </p>
                    <CodeBlock
                        title="Python Preprocessing Snippet"
                        language="python"
                        code={`import pandas as pd

def clean_ops_data(df):
    # Handle missing fulfillment timestamps
    df['ship_date'] = pd.to_datetime(df['ship_date'])
    df['delivery_date'] = df['delivery_date'].fillna(df['ship_date'] + pd.Timedelta(days=3))
    
    # Calculate Lead Time KPI
    df['lead_time_days'] = (df['delivery_date'] - df['order_date']).dt.days
    
    # Standardize Regional Tags
    region_map = {'NYC': 'North East', 'LAX': 'West Coast', 'CHI': 'Midwest'}
    df['region'] = df['warehouse_id'].map(region_map)
    
    return df`}
                    />
                </section>

                {/* Methodology: SQL Logic */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary">
                            <Database size={18} />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Phase 2: Reporting Aggregation Logic</h2>
                    </div>
                    <p className="text-slate-400 mb-6">
                        Created complex views to aggregate performance across different warehouse tiers for high-level executive reporting.
                    </p>
                    <CodeBlock
                        title="KPI Calculation Query"
                        code={`WITH DeliveryPerformance AS (
  SELECT 
    warehouse_region,
    COUNT(order_id) as total_orders,
    AVG(lead_time_days) as avg_fulfillment_speed,
    SUM(CASE WHEN status = 'delayed' THEN 1 ELSE 0 END) as delayed_count
  FROM operations_master
  GROUP BY warehouse_region
)
SELECT 
  *,
  ROUND((delayed_count * 100.0 / total_orders), 2) as delay_rate_percentage
FROM DeliveryPerformance
ORDER BY delay_rate_percentage DESC;`}
                    />
                </section>

                {/* Insights & Results */}
                <section className="mb-20 pt-12 border-t border-slate-800/50">
                    <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Business Interpretation & Outcome</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                            <AlertCircle className="text-primary mb-4" size={24} />
                            <h4 className="text-white font-bold mb-2">Key Finding</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                The Midwest hub was identified as a performance outlier due to specific software compatibility issues, rather than operational staff performance.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                            <BarChart2 className="text-primary mb-4" size={24} />
                            <h4 className="text-white font-bold mb-2">KPI Targeted</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Focused on fulfillment speed trends to identify the baseline for regional staffing standards.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                            <CheckCircle2 className="text-primary mb-4" size={24} />
                            <h4 className="text-white font-bold mb-2">Final Result</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Dashboard integrated into monthly regional audits to review operational efficiency and KPI targets.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <footer className="text-center pt-12 mt-20 border-t border-slate-800/50">
                    <p className="text-slate-500 text-sm mb-6">Interested in more technical deep dives?</p>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
                    >
                        Reach Out to Discuss My Work
                    </button>
                </footer>
            </main>
        </motion.div>
    );
};

export default CaseStudy;
