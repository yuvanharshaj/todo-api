const supabase = require("../config/supabase");

const authenticateUser = async (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        console.log("====================================");
        console.log("Authorization Header:", authHeader);

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid Authorization format"
            });
        }

        // Extract JWT token
        const token = authHeader.split(" ")[1];

        console.log("Token starts with:", token.substring(0, 30));

        // Verify token with Supabase
        const { data, error } = await supabase.auth.getUser(token);

        console.log("====================================");
        console.log("Supabase Error:", error);
        console.log("Supabase User:", data?.user);
        console.log("====================================");

        if (error) {
            return res.status(401).json({
                error: error.message
            });
        }

        // Attach authenticated user
        req.user = data.user;

        next();

    } catch (err) {
        console.error("Middleware Exception:", err);

        return res.status(500).json({
            error: err.message
        });
    }
};

module.exports = authenticateUser;