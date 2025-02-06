const express = require("express");
require("dotenv").config();
const cors = require("cors");
import cookieParser from "cookie-parser";
import { ConnnectDB } from "./config/db";
import { routes } from "./routes";

const app = express();

//adding middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.PORT, () => {
  ConnnectDB();
  console.log("server is listning:", process.env.PORT);
});
