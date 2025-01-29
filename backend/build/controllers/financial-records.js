"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.remove = exports.create = exports.index = void 0;
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const index = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const records = yield financial_record_1.default.find({ userId: userId });
        if (records.length === 0) {
            response.status(404).send({
                success: true,
                records: [],
                message: "No records matched the given UserId."
            });
        }
        return response.status(200).send({
            success: true,
            records,
            message: "Records retrived."
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            message: "An error occurred while retriveing records."
        });
    }
});
exports.index = index;
const remove = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordId } = request.params;
        const removed = yield financial_record_1.default.findByIdAndDelete(recordId);
        if (!removed) {
            response.status(404).send({
                success: false,
                message: "Record not found for deletion."
            });
        }
        return response.status(200).send({
            success: true,
            message: "Record successfully removed."
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            message: "An error occured while deleting the record",
        });
    }
});
exports.remove = remove;
const create = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, description, amount, category, paymentMethod } = request.body;
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount)) {
            return response.status(400).json({ success: false, message: "Invalid amount" });
        }
        const newRecord = {
            userId: userId,
            description: description,
            amount: amount,
            category: category,
            paymentMethod: paymentMethod,
            date: new Date()
        };
        const result = new financial_record_1.default(newRecord);
        yield result.save();
        return response.status(200).send({
            success: true,
            message: "Record created and saved to database."
        });
    }
    catch (error) {
        console.log(error);
        response.status(404).send({
            success: false,
            message: "An error occured and the record could not be created or saved."
        });
    }
});
exports.create = create;
const update = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, recordId, description, category, amount, paymentMethod } = request.body;
        const updateRecord = {
            userId: userId,
            description: description,
            category: category,
            amount: amount,
            paymentMethod: paymentMethod,
            date: new Date()
        };
        const result = yield financial_record_1.default.findByIdAndUpdate(recordId, updateRecord, { new: true });
        if (!result) {
            return response.status(404).send({
                success: false,
                message: "Record not found."
            });
        }
        return response.status(200).send({
            success: true,
            message: "Record successfully updated.",
            updatedRecord: result
        });
    }
    catch (error) {
        console.log(error);
        response.json(500).send({
            success: false,
            message: "An error occured while updating the record."
        });
    }
});
exports.update = update;
