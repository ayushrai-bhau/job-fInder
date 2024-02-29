const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({message:"Unauthorized access"})
        }

        const decode  = jwt.verify(token , process.env.SECRET_KEY)
        req.userId = decode.userId;

        // if (!isUserValid) {
        //     return res.status(401).json({ message: "Unauthorized access" });
        // }
      

        next();

    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = verifyToken