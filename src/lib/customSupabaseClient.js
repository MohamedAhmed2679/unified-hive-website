import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njwkyizelosrvggskawl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qd2t5aXplbG9zcnZnZ3NrYXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NDI2NTAsImV4cCI6MjA3OTQxODY1MH0.5bJOqXCx1wbbuYr6kJBSgXt9GoLPpL-YqA6kMkZFJp8';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
