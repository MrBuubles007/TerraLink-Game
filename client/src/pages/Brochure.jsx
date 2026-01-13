import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Brochure = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden p-6 md:p-12 relative flex flex-col items-center">
            {/* Background Grid & Glows - Cyberpunk Atmosphere - ENHANCED VISIBILITY */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Adjusted grid to be more visible (higher opacity, slightly lighter color) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40"></div>
                {/* Radial vignette for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl w-full z-10 space-y-32 mb-20">

                {/* HERO SECTION */}
                <section className="text-center py-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block border-2 border-cyan-400 bg-black/60 backdrop-blur-md px-12 py-6 mb-8 shadow-[0_0_20px_rgba(34,211,238,0.3)] transform -skew-x-12"
                    >
                        <h1 className="text-5xl md:text-8xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 transform skew-x-12 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                            Terralink
                        </h1>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-light tracking-[0.3em] text-gray-300 uppercase border-b-2 border-pink-500/50 pb-4 inline-block"
                    >
                        Classified Dossier
                    </motion.h2>
                </section>

                {/* MISSION SECTION - Globalization & World Map */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 bg-black/70 border border-green-500/30 p-10 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.15)] relative overflow-hidden group backdrop-blur-sm"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 shadow-[0_0_15px_#22c55e]"></div>
                        <h3 className="text-4xl font-bold text-green-400 uppercase tracking-wider mb-6 flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full border border-green-400 flex items-center justify-center text-base">01</span>
                            Global Connection
                        </h3>

                        <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                            <p>
                                <strong className="text-white">Die Reise eines T-Shirts:</strong> Unsere moderne Welt ist ein extrem verflochtenes Netzwerk, in dem Produkte oft tausende Kilometer zurücklegen. Baumwolle aus den USA wird in Indien gesponnen, in Bangladesch genäht und in Europa verkauft. Diese globalen Produktionsketten schaffen zwar Effizienz und Wohlstand für einige, führen aber auch zu einer massiven kulturellen Uniformierung.
                            </p>
                            <p>
                                <strong className="text-white">Das Amazon-Phänomen:</strong> Riesige globale Player üben immensen Druck auf lokale Märkte aus. Dies visualisieren wir auf unserer Karte: <strong>Regionale Verkäufer (<span className="text-green-400">Grüne Schilder</span>)</strong> kämpfen als kulturelle Gegenpole gegen die globale Vereinheitlichung, während Orte der wichtigen kulturellen Bewahrung mit <strong><span className="text-yellow-400">Gelben Karos</span></strong> markiert sind. Es ist ein Kamp um Identität in einer grenzenlosen Welt.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group perspective cursor-pointer"
                        onClick={() => setSelectedImage("/assets/brochure/world_map_placeholder.png")}
                    >
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-black/80 px-4 py-2 text-white border border-white/50 rounded backdrop-blur">VERGRÖSSERN</span>
                            </div>
                            <img
                                src="/assets/brochure/world_map_placeholder.png"
                                alt="World Map Globalization"
                                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition duration-500 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-green-500/30 flex justify-between text-xs font-mono text-green-400">
                                <span>SYS.MAP.V4.0 // CLICK TO EXPAND</span>
                                <span>STATUS: ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* MECHANICS SECTION - Capital/CO2 & Gameplay */}
                <section className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 bg-black/70 border border-orange-500/30 p-10 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.15)] relative overflow-hidden md:order-2 backdrop-blur-sm"
                    >
                        <div className="absolute top-0 right-0 w-1 h-full bg-orange-500/50 shadow-[0_0_15px_#f97316]"></div>
                        <h3 className="text-4xl font-bold text-orange-400 uppercase tracking-wider mb-6 flex items-center justify-end gap-4 text-right">
                            Simulation Intent
                            <span className="w-10 h-10 rounded-full border border-orange-400 flex items-center justify-center text-base">02</span>
                        </h3>

                        <div className="space-y-4 text-gray-300 text-lg leading-relaxed text-right">
                            <p>
                                <strong className="text-white">TerraLink</strong> ist mehr als nur ein Spiel. Es ist eine interaktive Simulation der realen geopolitischen Konflikte. Wir wollten das Dilemma von politischen Entscheidungsträgern erlebbar machen.
                            </p>
                            <p>
                                Die Währungen sind hart: <span className="text-orange-400 font-semibold">Kapital</span> und <span className="text-red-400 font-semibold">CO₂-Emissionen</span>. Das Interface zeigt gnadenlos, dass Wachstum fast immer auf Kosten der Umwelt geht. Die Spieler müssen entscheiden: Opfern sie ihren wirtschaftlichen Vorteil für die Zukunft des Planeten? Oder setzen sie auf kurzfristigen Profit und riskieren den Kollaps? Es gibt keine einfachen Lösungen, nur Konsequenzen.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group md:order-1 cursor-pointer"
                        onClick={() => setSelectedImage("/assets/brochure/gameplay_placeholder.png")}
                    >
                        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-black/80 px-4 py-2 text-white border border-white/50 rounded backdrop-blur">VERGRÖSSERN</span>
                            </div>
                            <img
                                src="/assets/brochure/gameplay_placeholder.png"
                                alt="Gameplay Simulation"
                                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition duration-500"
                            />
                            <div className="absolute top-0 left-0 p-2 bg-red-600/20 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Simulation Running
                            </div>
                            <div className="absolute bottom-4 right-4 text-orange-400 font-mono text-xs tracking-widest">
                                CLICK TO ANALYZE
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ANALYSIS SECTION - Survey Stats & Poster */}
                <section className="grid md:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group flex justify-center cursor-pointer"
                        onClick={() => setSelectedImage("/assets/brochure/poster_placeholder.png")}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative rounded-sm overflow-hidden border-4 border-pink-500/20 bg-black max-w-md w-full shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-black/80 px-4 py-2 text-white border border-white/50 rounded backdrop-blur">VERGRÖSSERN</span>
                            </div>
                            <img
                                src="/assets/brochure/poster_placeholder.png"
                                alt="Analysis Poster"
                                className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition duration-500 grayscale-[20%] group-hover:grayscale-0"
                            />
                            <div className="absolute bottom-4 right-4 text-pink-500 font-mono text-sm tracking-widest bg-black px-2 py-1">
                                FIG. 3900 // TAP
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="bg-black/60 border-l-4 border-pink-500 pl-8 py-4 backdrop-blur-sm">
                            <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase tracking-widest leading-tight">
                                The Paradox
                            </h3>
                            <p className="text-pink-400 font-mono text-sm mt-2 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                                ONLINE SURVEY DATA // GLOBAL REACH
                            </p>
                        </div>

                        <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Wir haben eine umfassende <strong>Online-Umfrage</strong> durchgeführt, an der über <strong>3800 Menschen</strong> aus der ganzen Welt teilgenommen haben. Diese Ergebnisse repräsentieren ein weltweites Stimmungsbild und zeigen, dass Globalisierung als tiefes Paradoxon empfunden wird.
                            </p>

                            <div className="grid grid-cols-1 gap-5">
                                <div className="bg-white/5 border border-white/10 p-5 rounded flex items-center gap-6 hover:bg-white/10 transition group">
                                    <div className="text-5xl font-bold text-cyan-400 w-28 text-right group-hover:scale-110 transition">69%</div>
                                    <div className="border-l border-white/20 pl-6">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Approval</p>
                                        <p className="font-semibold text-white">Feiern die verbesserte weltweite Kommunikation als größten Vorteil.</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-5 rounded flex items-center gap-6 hover:bg-white/10 transition group">
                                    <div className="text-5xl font-bold text-pink-500 w-28 text-right group-hover:scale-110 transition">44%</div>
                                    <div className="border-l border-white/20 pl-6">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Identity Crisis</p>
                                        <p className="font-semibold text-white">Empfinden eine deutliche Schwächung ihrer lokalen kulturellen Identität.</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-5 rounded flex items-center gap-6 hover:bg-white/10 transition group">
                                    <div className="text-5xl font-bold text-orange-400 w-28 text-right group-hover:scale-110 transition">57%</div>
                                    <div className="border-l border-white/20 pl-6">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Inequality</p>
                                        <p className="font-semibold text-white">Kritisieren scharf, dass primär reiche Länder profitieren.</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-5 rounded flex items-center gap-6 hover:bg-white/10 transition group">
                                    <div className="text-5xl font-bold text-red-500 w-28 text-right group-hover:scale-110 transition">80%</div>
                                    <div className="border-l border-white/20 pl-6">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Call to Action</p>
                                        <p className="font-semibold text-white">Fordern deswegen strengere staatliche und globale Regulierungen.</p>
                                    </div>
                                </div>
                            </div>

                            <p className="border-t border-gray-700 pt-6 italic text-gray-400">
                                *Zusammenfassung der Kernergebnisse aus unserem Mehrfach-Fragen-Katalog.
                            </p>
                        </div>
                    </motion.div>
                </section>

            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            src={selectedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-full object-contain border-2 border-white/20 rounded shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                        />
                        <button className="absolute top-8 right-8 text-white text-xl border border-white/30 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/20 transition">
                            ✕
                        </button>
                        <div className="absolute bottom-8 text-gray-400 font-mono text-sm tracking-widest">
                            CLICK ANYWHERE TO CLOSE
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Brochure;
