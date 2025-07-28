import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../model/UserModel.js";
import 'dotenv/config';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        //signup case - create new user
        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
            name: profile.displayName,     //profile.displayName is the value returned from Google and we stored it in our name field 
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0].value,
          });
        }

        //login case - just logged in the user
        return done(null, user);
      } 
      catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); //serialize MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);   //'id' here is MongoDB _id
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
