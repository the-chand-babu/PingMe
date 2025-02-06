import passport from "passport";
import { Express } from "express";
import session from "express-session";

import userRoutes from "./user";
import { AuthRoutes } from "./auth";
import { googleLogin } from "../../controllers/AuthConroller";
import { isAuthenticate } from "../../middlewares/auth";

export const v1Apis = function (app: Express) {
  googleLogin();
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.authenticate("session"));
  app.use(passport.initialize());
  app.use(passport.session());
  // Ensure '/user' is defined after these setups
  app.use("/api/v1/auth", AuthRoutes);
  app.use("/api/v1/user", isAuthenticate, userRoutes); // Define this after session and passport setup
};
