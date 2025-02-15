"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const message_controller_1 = require("../controllers/message.controller");
const Router = express_1.default.Router();
Router.get("/users", authenticate_middleware_1.authenticate, message_controller_1.getUsersForSidebar);
Router.get("/:id", authenticate_middleware_1.authenticate, message_controller_1.getMessages);
Router.post("/send/:id", authenticate_middleware_1.authenticate, message_controller_1.sendMessage);
exports.default = Router;
