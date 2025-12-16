import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Database features will not work.');
}

export const supabase = createClient(
    supabaseUrl || 'https://vvkykbiembfmazuotevd.supabase.co',
    supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a3lrYmllbWJmbWF6dW90ZXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzEyMDUsImV4cCI6MjA4MDk0NzIwNX0.mzPMQZkgztHMIIe0DJbbs4mhZPZgjFWUsVWkOiqUj94'
);
