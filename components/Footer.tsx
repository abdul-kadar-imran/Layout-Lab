import React from 'react';
import { IconInstagram, IconWhatsApp, IconQR } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#020617] border-t border-slate-900 px-8 py-12 md:py-16 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">

                {/* Top Section */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">

                    {/* Brand & Quote */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-lg">
                        <div className="flex items-center gap-3 group transition-transform duration-300">
                            <div className="p-2 transition-colors">
                                <img className="w-10 h-10" src="favicon.png" alt="png" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                                Layout<span className="text-indigo-500">Lab</span>
                            </span>
                        </div>

                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic opacity-80 mt-2">
                            "The Best Code is the Code that goes Unnoticed, because it works so flawlessly."
                        </p>
                    </div>

                    {/* Socials & Chat */}
                    <div className="flex flex-col items-center md:items-end gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">
                            Chat with Developer
                        </span>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://www.instagram.com/mr_khalifa_imran/?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-300 group shadow-xl"
                            >
                                <div className="p-1 rounded-md bg-gradient-to-tr from-orange-500 via-pink-500 to-violet-500">
                                    <IconInstagram className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Instagram</span>
                            </a>

                            <a
                                href="https://wa.me/+919363001680"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/60 hover:border-emerald-500/50 transition-all duration-300 group shadow-xl"
                            >
                                <div className="p-1 rounded-md bg-emerald-500">
                                    <IconWhatsApp className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] text-center">
                        © {new Date().getFullYear()} LayoutLab. Built with passion.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
