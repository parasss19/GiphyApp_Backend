import jwt from "jsonwebtoken";

const userAuth = async(req, res, next) => {
   const {token} = req.cookies;  

   if(!token){
    return res.status(401).json({success: false, message: "Not authorized"});
   }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
      req.user = decoded;   //here i got id, email, name and avatar in req.user coz during jwt sign in callbackhandler i provided all this
      next();
    }
    else{
      return res.status(400).json({
        success: false, 
        message: "Invalid token payload"
      });
    }
   } 
   catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
   }
}

export default userAuth;