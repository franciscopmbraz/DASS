import { supabase } from '../lib/supabase';

export interface Training {
    id: string;
    user_id: string;
    game: string;
    title: string;
    description: string;
    status: 'new' | 'in_progress' | 'completed';
    progress: number;
    created_at: string;
    details?: any; // JSONB for wizard answers and generated plan
}

export const fetchTrainings = async () => {
    const { data, error } = await supabase
        .from('trainings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data as Training[];
};

export const createTraining = async (training: Omit<Training, 'id' | 'user_id' | 'created_at' | 'status' | 'progress'>) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('trainings')
        .insert([
            {
                ...training,
                user_id: user.id,
                status: 'new',
                progress: 0,
            },
        ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Training;
};

export const updateTrainingStatus = async (id: string, status: Training['status']) => {
    const { data, error } = await supabase
        .from('trainings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Training;
}

export const updateTrainingProgress = async (id: string, progress: number) => {
    const { data, error } = await supabase
        .from('trainings')
        .update({ progress })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Training;
};

export const getTrainingById = async (id: string) => {
    const { data, error } = await supabase
        .from('trainings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw error;
    }

    return data as Training;
};

export const deleteTraining = async (id: string) => {
    const { error } = await supabase
        .from('trainings')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
};

export const updateTrainingDetails = async (id: string, details: any) => {
    const { data, error } = await supabase
        .from('trainings')
        .update({ details })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Training;
};
