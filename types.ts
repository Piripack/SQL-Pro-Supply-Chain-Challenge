
export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    Expert = 'Expert'
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    difficulty: Difficulty;
    schemaTables: string[];
    solution: string;
}

export interface QueryResult {
    columns: string[];
    values: any[][];
}

export interface QueryExecResult {
    results?: QueryResult[];
    error?: string;
}
