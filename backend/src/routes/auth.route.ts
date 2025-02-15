import express from "express";

import {signup, login, logout, updateProfile, checkAuth} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);
Router.put("/update-profile", authenticate, updateProfile);
Router.get("/check", authenticate, checkAuth);


export default Router;