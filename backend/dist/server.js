"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const db_1 = require("./lib/db");
const socket_1 = require("./lib/socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
socket_1.app.set("trust proxy", 1);
socket_1.app.use(express_1.default.json({ limit: "10mb" })); // Increase JSON payload size limit
socket_1.app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(',')
        : ["http://localhost:5173"],
    credentials: true
}));
socket_1.app.use('/api/auth', auth_route_1.default);
socket_1.app.use('/api/messages', message_route_1.default);
socket_1.server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    (0, db_1.connectDB)();
});
