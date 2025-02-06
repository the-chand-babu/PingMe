import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { userModal } from "../models/user";
import bcrypt from "bcryptjs";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Successfully" });
  } catch (error) {
    console.log("error", error);
  }
};

export const LoginController = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "succesfull!" });
  } catch (error) {
    console.log("error", error);
  }
};

export const googleLogin = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        callbackURL: "http://localhost:3001/api/v1/auth/login",
        scope: ["email", "profile"], // Ensure email is received
      },
      async (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: Function
      ) => {
        try {
          const email = profile.emails?.[0]?.value || null;
          if (!email)
            return done(new Error("Email not provided by Google"), null);

          let user = await userModal.findOne({ email });

          if (!user) {
            // Generate a random password (optional)
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            user = new userModal({
              googelId: profile.id,
              name: profile.displayName,
              email: email,
              photo: profile.photos?.[0]?.value || "",
              password: hashedPassword, // Store hashed password
            });

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModal.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export const LogoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("connect.sid");
    res.status(200).send({ message: "Logout" });
  });
};
