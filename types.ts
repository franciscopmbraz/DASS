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
        // FPS
        aim_rating?: number; // 0-100
        crosshair_placement?: 'Poor' | 'Average' | 'Good' | 'Excellent';

        // MOBA
        cs_rating?: number;
        trading_rating?: number;
        skill_shots?: string;
        combos?: string;

        // Shared
        movement_rating?: number; // 0-100
        positioning_rating?: number; // 0-100
        reaction_time?: string;
    };
    // FPS Specific
    economy?: {
        rating: number; // 0-100
        analysis: string;
    };
    rounds_analyzed?: {
        round_number: number;
        outcome: 'Win' | 'Loss';
        kda: string;
        highlight: string;
    }[];
    // MOBA Specific
    macro?: {
        vision_score_rating: number;
        map_awareness: string;
        objective_control: string;
        rotation_quality: string;
    };
    phases_analyzed?: {
        phase: string;
        performance: string;
        notes: string;
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
    level?: number;
    xp?: number;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';

export interface Analysis {
    id: string;
    user_id: string;
    video_url: string;
    video_title: string;
    game: string;
    analysis_result: AnalysisResult;
    created_at: string;
}

export interface ChatMessage {
    id: string;
    analysis_id: string;
    sender: 'user' | 'ai';
    content: string;
    created_at: string;
}
