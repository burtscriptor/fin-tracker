import FinancialRecordModel from "../schema/financial-record";
import { Request, Response, RequestHandler } from "express";

const index: RequestHandler = async (request, response): Promise<void> => {
  
    try {
        const userId: string | undefined = request.params.userId;

        if (!userId) {
            response.status(400).json({
                success: false,
                message: "User ID is required.",
            });
            return;
        }

        const records = await FinancialRecordModel.find({ userId });

        if (records.length === 0) {
            response.status(404).json({
                success: false,
                records: [],
                message: "No records matched the given User ID.",
            });
            return;
        }

        response.status(200).json({
            success: true,
            records: [records],
            message: "Records retrieved successfully.",
        });

    } catch (error) {
        console.error("Error retrieving records:", error);
        response.status(500).json({
            success: false,
            message: "An error occurred while retrieving records.",
        });
    }
};

const remove: RequestHandler = async (request, response): Promise<void> => {
    try {
        const { recordId } = request.params;

        const removed = await FinancialRecordModel.findByIdAndDelete(recordId);

        if (!removed) {
            response.status(404).json({
                success: false,
                message: "Record not found for deletion.",
            });
            return;
        }

        response.status(200).json({
            success: true,
            message: "Record successfully removed.",
        });

    } catch (error) {
        console.error("Error deleting record:", error);
        response.status(500).json({
            success: false,
            message: "An error occurred while deleting the record.",
        });
    }
};

const create: RequestHandler = async (request, response): Promise<void> => {
    console.log()
    try {
        const { userId, description, amount, category, paymentMethod } = request.body;

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount)) {
            response.status(400).json({
                success: false,
                message: "Invalid amount.",
            });
            return;
        }

        const newRecord = new FinancialRecordModel({
            userId,
            description,
            amount: parsedAmount,
            category,
            paymentMethod,
            date: new Date(),
        });

        await newRecord.save();

        response.status(201).json({
            success: true,
            message: "Record created and saved to database.",
            record: newRecord,
        });

    } catch (error) {
        console.error("Error creating record:", error);
        response.status(500).json({
            success: false,
            message: "An error occurred, and the record could not be created or saved.",
        });
    }
};

const update: RequestHandler = async (request, response): Promise<void> => {
    try {
        const { recordId } = request.params;
        const { description, category, amount, paymentMethod } = request.body;
        
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount)) {
            response.status(400).json({
                success: false,
                message: "Invalid amount.",
            });
            return;
        }

        const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
            recordId,
            {
                description,
                category,
                amount: parsedAmount,
                paymentMethod,
                date: new Date(),
            },
            { new: true }
        );

        if (!updatedRecord) {
            response.status(404).json({
                success: false,
                message: "Record not found.",
            });
            return;
        }

        response.status(200).json({
            success: true,
            message: "Record successfully updated.",
            updatedRecord,
        });

    } catch (error) {
        console.error("Error updating record:", error);
        response.status(500).json({
            success: false,
            message: "An error occurred while updating the record.",
        });
    }
};

export { index, create, remove, update };
