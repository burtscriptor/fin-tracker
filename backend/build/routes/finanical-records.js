"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_records_1 = require("../controllers/financial-records");
const router = express_1.default.Router();
router.get("/index/:userId", financial_records_1.index);
router.post("/create", financial_records_1.create);
router.put("/update/:recordId", financial_records_1.update);
router.delete("/delete/:recordId", financial_records_1.remove);
exports.default = router;
