import { createClient } from '@supabase/supabase-js';

// **REPLACE THESE WITH YOUR ACTUAL KEYS**
const supabaseUrl = 'https://prvssbudmnlmvjtwufdx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBydnNzYnVkbW5sbXZqdHd1ZmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzc1ODgsImV4cCI6MjA3NTg1MzU4OH0.DD2GxLa6BBy2kvpvbrLUxAGBwkf5wZ3wSSgnQGiaTIs'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
