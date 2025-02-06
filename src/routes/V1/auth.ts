import passport from "passport";
import {
  RegisterController,
  LoginController,
  LogoutController,
} from "../../controllers/AuthConroller";

const express = require("express");

const AuthRoutes = express.Router();

AuthRoutes.post("/register", RegisterController);
AuthRoutes.post("/signIn", LoginController);
AuthRoutes.get("/logout", LogoutController);
AuthRoutes.get(
  "/google-login",
  passport.authenticate("google", {
    scope: ["Profile", "email"],
  })
);
AuthRoutes.get(
  "/login",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req: any, res: any) => {
    res.status(200).send({ message: "success" }); // Redirect to frontend
  }
);

export { AuthRoutes };
