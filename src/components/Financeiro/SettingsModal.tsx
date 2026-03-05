import React from 'react';

interface Props {
    onClose: () => void;
}

export function SettingsModal({ onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark border-4 border-text-main dark:border-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden flex flex-col p-8">
                <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 dark:border-gray-800 pb-4">
                    <h3 className="text-2xl font-black text-text-main dark:text-white tracking-tighter uppercase">
                        Configurações Gerais
                    </h3>
                    <button onClick={onClose} className="text-text-main dark:text-white hover:opacity-70 transition-opacity">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                <div className="flex-1 py-10 text-center">
                    <p className="text-sm font-bold tracking-widest text-text-muted uppercase">Opções em breve</p>
                </div>
            </div>
        </div>
    );
}
