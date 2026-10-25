const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Supabase URL:", process.env.SUPABASE_URL);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);


console.log("Supabase REST URL:", supabase.rest.url);

app.get("/api/test", async (req, res) => {
    const { data, error } = await supabase
        .from("app_users")
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

app.post("/api/register", async (req, res) => {

    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required."
        });
    }

    try {
        const { data: authData, error: authError } =
            await supabase.auth.signUp({
                email: email,
                password: password,
                email_confirm: true
            });

        if (authError) {
            return res.status(400).json({
                error: authError.message
            });
        }

        if (!authData.user) {
            return res.status(400).json({
                error: "User registration failed."
            });
        }

        res.status(201).json({
            message: "Registration successful. Your account is pending approval.",
            user: { id: authData.user.id, email: email }
    });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            error: "Server error during registration."
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
