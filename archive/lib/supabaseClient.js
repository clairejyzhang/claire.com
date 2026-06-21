import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqhojpapzsofkthttwou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxaG9qcGFwenNvZmt0aHR0d291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNDM5MjgsImV4cCI6MjA2NDkxOTkyOH0.A3YPjJirTeyBwMBA8nuv1UvJffMtp9IOG3AJilgxnmo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);