
import React from 'react';
import type { QueryExecResult } from '../types';

interface ResultsTableProps {
    result: QueryExecResult;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ result }) => {
    if (result.error) {
        return (
            <div className="p-4">
                <pre className="bg-red-900/30 text-red-300 p-4 rounded-md text-sm whitespace-pre-wrap">{result.error}</pre>
            </div>
        );
    }
    
    if (!result.results || result.results.length === 0) {
        return <p className="p-4 text-gray-400">Query executed successfully, but returned no results.</p>;
    }

    const { columns, values } = result.results[0];

    if (values.length === 0) {
        return <p className="p-4 text-gray-400">Query executed successfully, but the result set is empty.</p>;
    }

    return (
        <div className="overflow-x-auto p-2">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {values.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-700/40 transition-colors">
                            {row.map((val, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {val === null ? <em className="text-gray-500">NULL</em> : String(val)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
