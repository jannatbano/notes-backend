const jwt=require('jsonwebtoken')
const JWT_SECRET="84553873441bf9ba8496226308001a032a1a9dbf4eb0fe4a684a9db5b98b40f3c7a76e8e08d584205fecc35f2c9601cdce5340598b206f669791713d73d27b84   "

const auth=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "No token provided"
            });
        }
        const token=authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message: "token missing"
            });
        }
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user = decoded;

        next();


    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
module.exports = auth;