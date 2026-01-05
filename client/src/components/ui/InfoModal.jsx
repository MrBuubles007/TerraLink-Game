import React from 'react';

export default function InfoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border-2 border-green-400 rounded-xl max-w-lg w-full p-8 shadow-[0_0_30px_rgba(74,222,128,0.3)] transform transition-all animate-pop-in relative overflow-hidden">

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4 uppercase tracking-wider">
                    Willkommen bei TerraLink
                </h2>

                <div className="space-y-4 text-gray-300 text-lg leading-relaxed font-light">
                    <p>
                        Dies ist eine <strong className="text-white">interaktive Weltsimulation</strong>.
                    </p>
                    <p>
                        Ihr übernehmt die Kontrolle über mächtige Interessengruppen. Eure Entscheidungen beeinflussen direkt die
                        <span className="text-green-400"> Weltwirtschaft</span>, das
                        <span className="text-blue-400"> Klima</span> und euer
                        <span className="text-yellow-400"> Kapital</span>.
                    </p>
                    <p>
                        Arbeitet im Team, reagiert auf globale Krisen und <strong className="text-white">bestimmt die Zukunft!</strong>
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-green-900/50 uppercase tracking-widest border border-green-400"
                >
                    Verstanden & Fortfahren
                </button>
            </div>
        </div>
    );
}
