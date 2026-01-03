export interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: number;
}

export interface AnalysisResult {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    key_moments: {
        timestamp: string;
        description: string;
    }[];
    improvement_plan: string;
    mechanics: {
        aim_rating: number; // 0-100
        movement_rating: number; // 0-100
        positioning_rating: number; // 0-100
        crosshair_placement: 'Poor' | 'Average' | 'Good' | 'Excellent';
        reaction_time?: string;
    };
    economy: {
        rating: number; // 0-100
        analysis: string;
    };
    rounds_analyzed: {
        round_number: number;
        outcome: 'Win' | 'Loss';
        kda: string;
        highlight: string;
    }[];
}

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    description?: string;
    age?: number;
    gender?: string;
    nickname?: string;
    favorite_games?: string[];
    goals?: string[];
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
