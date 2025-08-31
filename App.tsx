
import React, { useState, useEffect, useCallback } from 'react';
import type { Challenge, QueryResult } from './types';
import { challenges } from './data/challenges';
import { useSqlEngine } from './hooks/useSqlEngine';
import ChallengeSidebar from './components/ChallengeSidebar';
import ChallengeView from './components/ChallengeView';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/icons/Icons';

const App: React.FC = () => {
    const { db, isReady, error, executeQuery } = useSqlEngine();
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(challenges[0]);

    const handleSelectChallenge = (challenge: Challenge) => {
        setSelectedChallenge(challenge);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-red-400">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Fatal Error</h1>
                    <p>Could not initialize the SQL engine. Please check the console.</p>
                    <pre className="mt-4 p-4 bg-gray-800 rounded-md text-left text-sm">{error}</pre>
                </div>
            </div>
        );
    }

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
                <LoadingSpinner />
                <p className="text-lg text-cyan-400 mt-4">Preparing SQL Sandbox...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 font-sans">
            <Header />
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                <ChallengeSidebar
                    challenges={challenges}
                    onSelectChallenge={handleSelectChallenge}
                    selectedChallengeId={selectedChallenge?.id}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {selectedChallenge ? (
                        <ChallengeView 
                            key={selectedChallenge.id}
                            challenge={selectedChallenge} 
                            executeQuery={executeQuery}
                        />
                    ) : (
                         <div className="flex items-center justify-center h-full">
                            <p className="text-xl text-gray-500">Select a challenge to begin</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
