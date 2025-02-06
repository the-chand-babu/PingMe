import { Express, Request, Response } from "express";
import { v1Apis } from "./V1";

export const routes = (app: Express) => {
  app.use("/health", (req: Request, res: Response) => {
    res.send("Good Health");
    return;
  });

  v1Apis(app);
};
