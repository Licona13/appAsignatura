//aqui va lo que nos da supabase
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://awyduqhsesofneqspfxg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eWR1cWhzZXNvZm5lcXNwZnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODA5ODgsImV4cCI6MjA1OTQ1Njk4OH0.--kj4TWXqPIMT12kMMg2vYgEaEVIgwSN5DtQ7xMyO24";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})