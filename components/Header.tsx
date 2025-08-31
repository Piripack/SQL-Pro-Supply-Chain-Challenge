
import React from 'react';
import { DatabaseIcon } from './icons/Icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg border-b border-gray-700 sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <DatabaseIcon className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            SQL Pro: <span className="text-cyan-400">Supply Chain Challenge</span>
                        </h1>
                    </div>
                     <div className="hidden md:block text-sm text-gray-400">
                        Microsoft SQL Server Syntax
                    </div>
                </div>
            </div>
        </header>
    );
}
