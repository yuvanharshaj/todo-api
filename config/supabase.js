const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log(
  "SUPABASE_KEY starts with =",
  process.env.SUPABASE_KEY
    ? process.env.SUPABASE_KEY.substring(0, 20)
    : "undefined"
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("✅ Supabase client initialized");

module.exports = supabase;