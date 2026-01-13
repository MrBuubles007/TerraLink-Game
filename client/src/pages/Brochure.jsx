import React from 'react';
import { motion } from 'framer-motion';

const Brochure = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden p-6 md:p-12 relative flex flex-col items-center">
            {/* Background Grid & Glows - Cyberpunk Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl w-full z-10 space-y-24">

                {/* HERO SECTION */}
                <section className="text-center py-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block border-2 border-cyan-400 bg-black/40 backdrop-blur-md px-8 py-4 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.3)] transform -skew-x-12"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 transform skew-x-12 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                            Terralink
                        </h1>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-light tracking-[0.2em] text-gray-300 uppercase border-b border-pink-500/50 pb-4 inline-block"
                    >
                        Classified Dossier
                    </motion.h2>
                </section>

                {/* MISSION SECTION - Globalization & World Map */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 bg-black/50 border border-green-500/30 p-8 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-green-500/50 shadow-[0_0_15px_#22c55e]"></div>
                        <h3 className="text-3xl font-bold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center text-sm">01</span>
                            Global Connection
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Unsere Welt ist ein einziges großes Netzwerk. Ein T-Shirt reist oft um den halben Globus: Baumwolle aus den USA, Spinnen in Indien, Nähen in Bangladesch. Diese <span className="text-green-400 font-semibold">globalen Produktionsketten</span> verbinden uns, führen aber auch zu einer kulturellen Vereinheitlichung.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Riesen wie <span className="text-yellow-400 font-semibold">Amazon</span> verstärken diesen Effekt, während kleine Läden als kulturelle Anker fungieren. Auf der Karte markieren <span className="text-green-400 font-bold border-b border-green-400">grüne Schilder</span> regionale Angebote, die gegen den Strom schwimmen, während <span className="text-yellow-400 font-bold border-b border-yellow-400">gelbe Karos</span> Orte der kulturellen Bewahrung kennzeichnen.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group perspective"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img
                                src="/assets/brochure/world_map_placeholder.png"
                                alt="World Map Globalization"
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition duration-500 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-green-500/30 flex justify-between text-xs font-mono text-green-400">
                                <span>SYS.MAP.V4.0</span>
                                <span>STATUS: ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* MECHANICS SECTION - Capital/CO2 & Gameplay */}
                <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 bg-black/50 border border-orange-500/30 p-8 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.1)] relative overflow-hidden md:order-2"
                    >
                        <div className="absolute top-0 right-0 w-2 h-full bg-orange-500/50 shadow-[0_0_15px_#f97316]"></div>
                        <h3 className="text-3xl font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center justify-end gap-3 text-right">
                            System Mechanics
                            <span className="w-8 h-8 rounded-full border border-orange-400 flex items-center justify-center text-sm">02</span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-lg text-right">
                            In der Simulation ist nichts umsonst. <span className="text-orange-400 font-semibold">Kapital</span> und <span className="text-red-400 font-semibold">CO₂-Emissionen</span> sind die Währungen der Zukunft. Jede Entscheidung hat ihren Preis.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-lg text-right">
                            Investierst du in Wachstum oder Nachhaltigkeit? Das Interface visualisiert diese Balance in Echtzeit. Ein hoher Kontostand nützt nichts in einer unbewohnbaren Welt. Spürst du den Druck der Verantwortung?
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group md:order-1"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img
                                src="/assets/brochure/gameplay_placeholder.png"
                                alt="Gameplay Simulation"
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                            />
                            <div className="absolute top-0 left-0 p-2 bg-red-600/20 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Simulation Running
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ANALYSIS SECTION - Survey Stats & Poster */}
                <section className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group flex justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative rounded-sm overflow-hidden border-4 border-pink-500/20 bg-black max-w-sm w-full shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                            <img
                                src="/assets/brochure/poster_placeholder.png"
                                alt="Analysis Poster"
                                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition duration-500 grayscale-[20%] group-hover:grayscale-0"
                            />
                            <div className="absolute bottom-4 right-4 text-pink-500 font-mono text-sm tracking-widest bg-black px-2 py-1">
                                FIG. 3900
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-black/50 border-l-4 border-pink-500 pl-6 py-2">
                            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase tracking-widest leading-tight">
                                The Paradox
                            </h3>
                            <p className="text-pink-400 font-mono text-sm mt-1">DATA ANALYSIS // N=3900</p>
                        </div>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Unsere Umfrage enthüllt ein tiefes Dilemma. Globalisierung wird gleichzeitig als Chance und Bedrohung wahrgenommen.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 border border-white/10 p-4 rounded flex items-center gap-4 hover:bg-white/10 transition">
                                    <div className="text-4xl font-bold text-cyan-400 w-24 text-right">69%</div>
                                    <div className="border-l border-white/20 pl-4">
                                        <p className="text-sm text-gray-400 uppercase">Approval</p>
                                        <p className="font-semibold">Feiern die verbesserte weltweite Kommunikation. </p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4 rounded flex items-center gap-4 hover:bg-white/10 transition">
                                    <div className="text-4xl font-bold text-pink-500 w-24 text-right">44%</div>
                                    <div className="border-l border-white/20 pl-4">
                                        <p className="text-sm text-gray-400 uppercase">Warning</p>
                                        <p className="font-semibold">Empfinden eine Schwächung ihrer kulturellen Identität.</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4 rounded flex items-center gap-4 hover:bg-white/10 transition">
                                    <div className="text-4xl font-bold text-orange-400 w-24 text-right">57%</div>
                                    <div className="border-l border-white/20 pl-4">
                                        <p className="text-sm text-gray-400 uppercase">Inequality</p>
                                        <p className="font-semibold">Kritisieren, dass primär reiche Länder profitieren.</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4 rounded flex items-center gap-4 hover:bg-white/10 transition">
                                    <div className="text-4xl font-bold text-red-500 w-24 text-right">80%</div>
                                    <div className="border-l border-white/20 pl-4">
                                        <p className="text-sm text-gray-400 uppercase">Demand</p>
                                        <p className="font-semibold">Fordern strengere staatliche und globale Regulierungen.</p>
                                    </div>
                                </div>
                            </div>

                            <p className="border-t border-gray-700 pt-6">
                                Das Fazit ist eindeutig: Wir sind vernetzter denn je, fühlen uns aber zunehmend entfremdet. Die Forderung nach Regulierung ist der verzweifelte Versuch, die Kontrolle zurückzugewinnen.
                            </p>
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
};

export default Brochure;
