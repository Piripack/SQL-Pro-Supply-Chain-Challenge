import React, { useState } from 'react';
import type { Challenge } from '../types';
import { Difficulty } from '../types';
import { CheckCircleIcon, ChevronDownIcon, MenuIcon, XIcon } from './icons/Icons';

interface ChallengeSidebarProps {
    challenges: Challenge[];
    onSelectChallenge: (challenge: Challenge) => void;
    selectedChallengeId?: number;
}

const difficultyOrder = [Difficulty.Beginner, Difficulty.Intermediate, Difficulty.Advanced, Difficulty.Expert];
const difficultyColors: Record<Difficulty, string> = {
    [Difficulty.Beginner]: 'text-green-400',
    [Difficulty.Intermediate]: 'text-yellow-400',
    [Difficulty.Advanced]: 'text-orange-400',
    [Difficulty.Expert]: 'text-red-500',
};

const ChallengeSidebar: React.FC<ChallengeSidebarProps> = ({ challenges, onSelectChallenge, selectedChallengeId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const groupedChallenges = challenges.reduce((acc, challenge) => {
        (acc[challenge.difficulty] = acc[challenge.difficulty] || []).push(challenge);
        return acc;
    }, {} as Record<Difficulty, Challenge[]>);

    const content = (
        <nav className="p-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-4 px-2">Challenges</h2>
            <ul className="space-y-4">
                {difficultyOrder.map((difficulty) => (
                    <li key={difficulty}>
                        <h3 className={`px-2 text-md font-bold mb-2 ${difficultyColors[difficulty]}`}>{difficulty}</h3>
                        <ul className="space-y-1">
                            {groupedChallenges[difficulty]?.map((challenge) => (
                                <li key={challenge.id}>
                                    <button
                                        onClick={() => {
                                            onSelectChallenge(challenge);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center transition-colors duration-150 ${
                                            selectedChallengeId === challenge.id
                                                ? 'bg-cyan-600/30 text-cyan-300 font-semibold'
                                                : 'text-gray-300 hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <span className="flex-1">{challenge.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden p-4 bg-gray-800/80 border-b border-gray-700 flex justify-between items-center">
                 <span className="font-semibold text-lg">Challenge Menu</span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            
            {/* Mobile Drawer Overlay */}
            <div className={`fixed inset-0 z-30 bg-gray-900/70 backdrop-blur-sm md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
            
            {/* Single Responsive Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto md:relative md:w-72 md:flex-shrink-0 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {content}
            </aside>
        </>
    );
};

export default ChallengeSidebar;