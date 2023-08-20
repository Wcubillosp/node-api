import * as express from "express";
// import * as jwt from "jsonwebtoken";
import * as cors from "cors";
const jwt = require("jsonwebtoken");
import mongoose from "mongoose";
import { PORT, JWT_SECRET } from "./config";

import { AuthController } from "./auth/controller/auth.controller";
import { AuthService } from "./auth/service/auth.service";
import { UserController } from "./user/controller/user.controller";
import { UserService } from "./user/service/user.service";
import { CoinMarketcapService } from "./cripto/service/coinMarketcap.service";
import { CoinMarketcapController } from "./cripto/controller/coinMarketcap.controller";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const url = "mongodb://localhost:27017";

mongoose
  .connect(url, {})
  .then(() => console.log("Connection successful"))
  .catch((error) => console.error("Connection error: ", error));

// Middleware
app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next();
  }

  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  try {
    const cleantoken = token.replace("Bearer ", "");
    const decoded = jwt.verify(cleantoken, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
});

const authService = new AuthService();
const authController = new AuthController(authService);
const userService = new UserService();
const userController = new UserController(userService);
const coinMarketcapService = new CoinMarketcapService();
const coinMarketcapController = new CoinMarketcapController(
  coinMarketcapService
);

app.use("/auth", authController.getRouter());
app.use("/user", userController.getRouter());
app.use("/cripto", coinMarketcapController.getRouter());

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
