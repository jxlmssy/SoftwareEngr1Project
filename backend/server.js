const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// Supabase connection
console.log("Supabase URL:", process.env.SUPABASE_URL);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase REST URL:", supabase.rest.url);

// Test API
app.get("/api/test", async (req, res) => {
    const { data, error } = await supabase
        .from("app_user")
        .select("*")
        .limit(1);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.json({
        success: true,
        message: "Node.js connected to Supabase!",
        data: data
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
