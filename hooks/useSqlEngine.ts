
import { useState, useEffect, useCallback } from 'react';
import type { Database } from 'sql.js';
import type { QueryExecResult } from '../types';
import { schemaSql } from '../data/schema';

// sql.js is loaded from a CDN in index.html, so we need to declare the global
declare const initSqlJs: (config?: any) => Promise<any>;

export const useSqlEngine = () => {
    const [db, setDb] = useState<Database | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeDb = async () => {
            try {
                const SQL = await initSqlJs({
                    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
                });
                const newDb = new SQL.Database();
                
                // Execute the schema and data insertion SQL
                newDb.run(schemaSql);

                setDb(newDb);
                setIsReady(true);
            } catch (err: any) {
                console.error("Failed to initialize sql.js:", err);
                setError(err.message || 'An unknown error occurred during DB initialization.');
            }
        };

        initializeDb();
        
        // Cleanup function
        return () => {
            db?.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const executeQuery = useCallback((sql: string): QueryExecResult => {
        if (!db) {
            return { error: "Database is not ready." };
        }
        try {
            const results = db.exec(sql);
            return { results: results.map(({ columns, values }) => ({ columns, values })) };
        } catch (err: any) {
            return { error: err.message };
        }
    }, [db]);

    return { db, isReady, error, executeQuery };
};
