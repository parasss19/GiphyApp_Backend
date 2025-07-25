import {Router} from 'express';
import passport from '../lib/passport.js';
import { callbackHandler, isAuthenticated, logout } from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';

const authRouter = Router();

//1 Google oAuth (signup or login through google)
authRouter.get('/googleAuth', passport.authenticate("google", { scope: ["profile", "email"] }))

//2 Google Oauth callback 
authRouter.get('/googleAuth/callback', passport.authenticate("google", { session: false,  failureRedirect: `${process.env.FRONTENT_URL}` }), callbackHandler)

//3 check whether user is authenticated or not using 'userAuth' middleware
authRouter.get('/me', userAuth, isAuthenticated);

//4 POST /logout - logout user
authRouter.post('/logout', logout);


export default authRouter;