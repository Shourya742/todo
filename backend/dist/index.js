"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = __importDefault(require("./routes/auth"));
const PORT = process.env.PORT;
const mongooseConnection = process.env.MONGO_URL;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_1.default);
app.use("/todo", auth_2.default);
app.listen(PORT, () => {
    mongoose_1.default.connect(mongooseConnection);
    console.log("The server is currently listening on PORT: " + PORT);
});
