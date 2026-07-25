const supabase = require("../config/supabase");

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid authorization format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token with Supabase
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({
                error: "Invalid or expired token"
            });
        }

        // Attach authenticated user
        req.user = data.user;

        next();

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

module.exports = authenticateUser;