"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const Router = express_1.default.Router();
Router.post("/signup", auth_controller_1.signup);
Router.post("/login", auth_controller_1.login);
Router.post("/logout", auth_controller_1.logout);
Router.put("/update-profile", authenticate_middleware_1.authenticate, auth_controller_1.updateProfile);
Router.get("/check", authenticate_middleware_1.authenticate, auth_controller_1.checkAuth);
exports.default = Router;
