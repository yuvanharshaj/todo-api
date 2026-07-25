const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// =======================
// SIGNUP
// =======================
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.status(201).json({
            message: "User registered successfully",
            user: data.user
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            return res.status(401).json({
                error: error.message
            });
        }

        return res.status(200).json({
            message: "Login successful",
            session: data.session,
            user: data.user
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;