
import React from 'react';
import { Instagram, MessageCircle, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl py-12 mt-auto">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10">

                    {/* Left Side: Logo & Quote */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 transition-all duration-300 group-hover:scale-110">
                                <img
                                    src="/favicon.png"
                                    alt="QRNest Logo"
                                    className="w-full h-full object-contain grayscale brightness-0 dark:invert transition-all duration-500"
                                />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
                                QR<span className="text-indigo-600">Nest</span>
                            </h2>
                        </div>

                        <div className="space-y-1 text-center md:text-left">
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-tight">
                                "The best code is the code that goes unnoticed ,<br />
                                because it works so flawlessly."
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Chat with Developer */}
                    <div className="flex flex-col gap-4 items-center md:items-end w-full md:w-auto">
                        <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Chat with Developer
                        </h3>

                        <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
                            <a
                                href="https://www.instagram.com/mr_khalifa_imran/?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-indigo-500/10"
                                title="Instagram"
                            >
                                <Instagram size={18} className="sm:w-[20px] sm:h-[20px]" />
                                <span className="text-sm font-bold">Instagram</span>
                            </a>

                            <a
                                href="https://wa.me/+919363001680"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-indigo-500/10"
                                title="WhatsApp"
                            >
                                <MessageCircle size={18} className="sm:w-[20px] sm:h-[20px]" />
                                <span className="text-sm font-bold">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 text-center">
                        © {new Date().getFullYear()} LayoutLab. Built with passion.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
