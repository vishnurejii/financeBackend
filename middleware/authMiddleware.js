import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //check if header exists or not
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        //Extract token 
        const token = authHeader.split(" ")[1];

        //verify token 
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

