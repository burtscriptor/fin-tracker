"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const finanical_records_1 = __importDefault(require("./src/routes/finanical-records"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
app.use(express_1.default.json());
const mongoURI = process.env.MONGODB_DATABASE_URL;
if (!mongoURI) {
    throw new Error('MONGODB_DATABASE_URL not available');
}
;
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log(`CONNECTED TO MONGODB!`))
    .catch((error) => console.log("Failed to Connect to MongoDB:", error));
app.use("/finanical-records", finanical_records_1.default);
app.listen(port, () => {
    console.log(`Sever Running on Port ${port}`);
});
