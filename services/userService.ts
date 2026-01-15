import { supabase } from '../lib/supabase';

export const userService = {
    async updateUserXP(userId: string, xpDelta: number) {
        try {
            // 1. Get current user data
            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('level, xp')
                .eq('id', userId)
                .single();

            if (fetchError || !user) throw new Error("Failed to fetch user data for XP update");

            let { level, xp } = user;
            level = level || 1;
            xp = xp || 0;

            // 2. Apply Delta
            xp += xpDelta;

            let leveledUp = false;
            let leveledDown = false;

            // 3. Level Up Logic
            // Threshold formula: Level * 1000
            let xpNeeded = level * 1000;

            while (xp >= xpNeeded) {
                xp -= xpNeeded;
                level++;
                xpNeeded = level * 1000; // Next level needs more XP
                leveledUp = true;
            }

            // 4. Level Down Logic (Undo)
            while (xp < 0 && level > 1) {
                level--;
                xpNeeded = level * 1000;
                xp += xpNeeded;
                leveledDown = true;
            }

            // Prevent negative XP at Level 1
            if (level === 1 && xp < 0) {
                xp = 0;
            }

            // 5. Update Database
            const { error: updateError } = await supabase
                .from('users')
                .update({ level, xp })
                .eq('id', userId);

            if (updateError) throw updateError;

            return { level, xp, leveledUp, leveledDown };

        } catch (error) {
            console.error("Error updating user XP:", error);
            throw error;
        }
    }
};
