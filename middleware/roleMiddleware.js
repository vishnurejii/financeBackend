export const allowRoles= (...roles)=>{
    return (req, res, next)=>{
        //check if user exists or not
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        //check role of the user
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied" });
        }

        next();
    };
};