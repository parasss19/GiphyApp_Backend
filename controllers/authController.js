import jwt from 'jsonwebtoken';
import "dotenv/config"

//Google oAuth
export const callbackHandler = async (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name, avatar: user.avatar }, process.env.JWT_SECRET,{ expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.FRONTENT_URL}/`);  //redirect to frontend ie. landing page
}

//logout controller
export const logout = async(req, res) => {
    try {
      //1 clear cookie from response
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      //2 redirect user to landing page after logout
      res.redirect(`${process.env.FRONTENT_URL}/landing`);

      return res.status(200).json({
        success: true,
        message: "Logged Out",
      })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

//check if user is authenticated
export const isAuthenticated = async(req, res) => {
    try {
      return res.json({ 
        success:true,
        user: req.user,   //it is provided by middleware i.e 'userAuth'
      });
    } 
    catch (error) {
      res.json({
        success: false, 
        message: error.message
      });
    }
}
