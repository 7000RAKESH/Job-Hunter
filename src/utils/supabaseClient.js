import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create the standard Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a function to get an authenticated Supabase client using Clerk's JWT
export const getAuthenticatedClient = async () => {
  try {
    // Get the Clerk JWT token
    const token = await getClerkJWT();

    // Create a new Supabase client with the Clerk JWT
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    console.error("Error getting authenticated client:", error);
    // Fall back to unauthenticated client
    return supabase;
  }
};

// Function to get JWT from Clerk
const getClerkJWT = async () => {
  try {
    // Use Clerk's getToken method to get a JWT for Supabase
    // Make sure your JWT template in Clerk is configured for Supabase
    const token = await window.Clerk.session.getToken({ template: "supabase" });
    return token;
  } catch (error) {
    console.error("Error getting JWT from Clerk:", error);
    throw error;
  }
};
