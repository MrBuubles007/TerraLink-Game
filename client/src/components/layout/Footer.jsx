import React from 'react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 p-4 text-center z-50">
            <p className="text-gray-400 font-mono text-sm tracking-widest">
                Erstellt von <span className="text-white font-bold">Patrik Lamprecht</span>
            </p>
        </footer>
    );
}
