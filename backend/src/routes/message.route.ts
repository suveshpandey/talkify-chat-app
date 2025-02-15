import express from "express";
import { authenticate } from "../middlewares/authenticate.middleware";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller";

const Router = express.Router();

Router.get("/users", authenticate, getUsersForSidebar);
Router.get("/:id", authenticate, getMessages);
Router.post("/send/:id", authenticate, sendMessage);


export default Router;