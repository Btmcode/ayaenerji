import { supabase, isSupabaseConfigured } from "./supabaseClient";

export async function initializeDatabase() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase is not configured. Skipping DB Initialization.");
    return;
  }

  try {
    console.log("Running Database Initialization...");

    // Check if tables exist. We can do a simple select on admins.
    const { error: checkError } = (await supabase.from('admins').select('id').limit(1)) || {};

    if (checkError && checkError.code === '42P01') {
      console.warn("Tables do not exist. Please run the supabase_schema.sql file in your Supabase SQL Editor.");
    } else {
      console.log("Tables exist.");
    }

    console.log("Database initialization check complete.");
  } catch (err) {
    console.warn("Error during DB initialization:", err);
  }
}
