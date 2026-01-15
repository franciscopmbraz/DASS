import { supabase } from '../lib/supabase';
import { Analysis, ChatMessage, AnalysisResult } from '../types';

export const fetchUserAnalyses = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data as Analysis[];
};

export const getAnalysisById = async (id: string) => {
    const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw error;
    }

    return data as Analysis;
};

export const createAnalysis = async (
    video_url: string,
    video_title: string,
    game: string,
    analysis_result: AnalysisResult
) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('analyses')
        .insert([
            {
                user_id: user.id,
                video_url,
                video_title,
                game,
                analysis_result,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error creating analysis:', error);
        throw error;
    }

    return data as Analysis;
};

export const deleteAnalysis = async (id: string) => {
    const { error } = await supabase
        .from('analyses')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
};

export const fetchAnalysisMessages = async (analysisId: string) => {
    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('analysis_id', analysisId)
        .order('created_at', { ascending: true });

    if (error) {
        throw error;
    }

    return data as ChatMessage[];
};

export const saveChatMessage = async (analysisId: string, sender: 'user' | 'ai', content: string) => {
    const { data, error } = await supabase
        .from('chat_messages')
        .insert([
            {
                analysis_id: analysisId,
                sender,
                content,
            },
        ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as ChatMessage;
};
