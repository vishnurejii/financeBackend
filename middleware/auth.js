import jwt from "jsonwebtoken";


export const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ✅ Check if header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        // ✅ Extract token
        const token = authHeader.split(" ")[1];

        // ✅ Verify token
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export const auth = (...roles) => {
    return (req, res, next) => {

        // ✅ Check if user exists
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // ✅ Role check
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied" });
        }

        next();
    };
};