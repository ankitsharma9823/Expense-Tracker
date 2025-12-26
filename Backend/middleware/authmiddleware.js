const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; // fixed property name
    if (authHeader && authHeader.startsWith("Bearer")) { // fixed typo
        token = authHeader.split(" ")[1]; // split by space to get token

        if (!token) {
            return res.status(400).json({ msg: "no token access denied" });        
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
            console.log("the decoded user is: ", req.user);
            next(); 
        } catch (error) {
            return res.status(400).json({ msg: "Token is not valid" });
        }
    } else {
        return res.status(400).json({ msg: "No token, access denied" });
    }
};

module.exports = verifyToken;
