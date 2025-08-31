
import React, { useState, useCallback } from 'react';
import type { Challenge, QueryExecResult } from '../types';
import ResultsTable from './ResultsTable';
import getHint from '../services/geminiService';
import { CheckCircleIcon, ExclamationCircleIcon, LightBulbIcon, LoadingSpinner, PlayIcon, SchemaIcon } from './icons/Icons';

interface ChallengeViewProps {
    challenge: Challenge;
    executeQuery: (sql: string) => QueryExecResult;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, executeQuery }) => {
    const [sqlQuery, setSqlQuery] = useState<string>('-- Write your SQL query here\n');
    const [queryResult, setQueryResult] = useState<QueryExecResult | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hint, setHint] = useState<string>('');
    const [isHintLoading, setIsHintLoading] = useState<boolean>(false);

    const deepCompareResults = (res1: any[][], res2: any[][]): boolean => {
        if (res1.length !== res2.length) return false;
        const sortFunc = (a: any[], b: any[]) => JSON.stringify(a).localeCompare(JSON.stringify(b));
        const sortedRes1 = res1.map(row => [...row]).sort(sortFunc);
        const sortedRes2 = res2.map(row => [...row]).sort(sortFunc);
        return JSON.stringify(sortedRes1) === JSON.stringify(sortedRes2);
    };

    const handleRunQuery = useCallback(() => {
        setIsLoading(true);
        setQueryResult(null);
        setIsCorrect(null);
        setHint('');

        setTimeout(() => {
            const userResult = executeQuery(sqlQuery);
            setQueryResult(userResult);

            if (userResult.results && userResult.results.length > 0) {
                const solutionResult = executeQuery(challenge.solution);
                if (solutionResult.results && solutionResult.results.length > 0) {
                    const userValues = userResult.results[0].values;
                    const solutionValues = solutionResult.results[0].values;
                    const correct = deepCompareResults(userValues, solutionValues);
                    setIsCorrect(correct);
                } else {
                    setIsCorrect(false);
                }
            } else {
                setIsCorrect(false);
            }
            setIsLoading(false);
        }, 500); // Simulate network latency
    }, [sqlQuery, challenge.solution, executeQuery]);

    const handleGetHint = async () => {
        setIsHintLoading(true);
        setHint('');
        try {
            const hintText = await getHint(challenge.description, sqlQuery);
            setHint(hintText);
        } catch (error) {
            console.error("Error getting hint:", error);
            setHint("Sorry, I couldn't fetch a hint right now. Please try again later.");
        }
        setIsHintLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-cyan-400 mb-2">{challenge.title}</h2>
                <p className="text-gray-300">{challenge.description}</p>
                 <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                    <SchemaIcon className="h-5 w-5 text-gray-500"/>
                    <span>Relevant Tables: {challenge.schemaTables.join(', ')}</span>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                    <label htmlFor="sql-editor" className="text-lg font-semibold text-gray-200">SQL Editor</label>
                </div>
                <div className="p-1">
                    <textarea
                        id="sql-editor"
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        className="w-full h-48 p-4 bg-gray-900 text-white font-mono text-sm rounded-md border-transparent focus:border-cyan-500 focus:ring-cyan-500 transition"
                        placeholder="SELECT * FROM Employees;"
                    />
                </div>
                <div className="p-4 border-t border-gray-700 flex flex-wrap gap-4 items-center justify-between">
                    <button
                        onClick={handleRunQuery}
                        disabled={isLoading}
                        className="flex items-center justify-center px-5 py-2.5 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
                    >
                        {isLoading ? <LoadingSpinner /> : <PlayIcon className="h-5 w-5 mr-2" />}
                        <span>{isLoading ? 'Running...' : 'Run Query'}</span>
                    </button>
                    <button
                        onClick={handleGetHint}
                        disabled={isHintLoading}
                        className="flex items-center justify-center px-5 py-2.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
                    >
                         {isHintLoading ? <LoadingSpinner /> : <LightBulbIcon className="h-5 w-5 mr-2" />}
                        <span>{isHintLoading ? 'Thinking...' : 'Get a Hint'}</span>
                    </button>
                </div>
            </div>

            {isHintLoading && (
                <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-yellow-700/50 flex items-center space-x-3">
                    <LoadingSpinner />
                    <p className="text-yellow-300">Generating a hint with Gemini...</p>
                </div>
            )}
            
            {hint && !isHintLoading && (
                 <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-yellow-700/50">
                    <h3 className="font-bold text-lg text-yellow-400 flex items-center mb-2"><LightBulbIcon className="h-5 w-5 mr-2" />Hint</h3>
                    <p className="text-yellow-200 whitespace-pre-wrap font-mono text-sm">{hint}</p>
                </div>
            )}

            {queryResult && (
                <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <div className="p-4 border-b border-gray-700 flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-200">Results</h3>
                        {isCorrect === true && (
                            <span className="flex items-center px-3 py-1 text-sm font-medium text-green-300 bg-green-900/50 rounded-full">
                                <CheckCircleIcon className="h-5 w-5 mr-1.5"/>
                                Correct!
                            </span>
                        )}
                        {isCorrect === false && (
                            <span className="flex items-center px-3 py-1 text-sm font-medium text-red-300 bg-red-900/50 rounded-full">
                                 <ExclamationCircleIcon className="h-5 w-5 mr-1.5"/>
                                Incorrect, please try again.
                            </span>
                        )}
                         {queryResult.error && (
                            <span className="flex items-center px-3 py-1 text-sm font-medium text-red-300 bg-red-900/50 rounded-full">
                                 <ExclamationCircleIcon className="h-5 w-5 mr-1.5"/>
                                Query Error
                            </span>
                        )}
                    </div>
                    <ResultsTable result={queryResult} />
                </div>
            )}
        </div>
    );
};

export default ChallengeView;
