import FinancialRecordModel from "../schema/financial-record";
import { Request, Response } from "express";


const index = async (request: Request, response: Response)=> {
    try {

        const { userId } = request.params;
        const records = await FinancialRecordModel.find(
            {userId: userId}
        );

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

    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false, 
            message: "An error occurred while retriveing records."
        });
        
    }
};

const remove = async (request: Request, response: Response) => {

    try {

        const { recordId } = request.params;

        const removed = await FinancialRecordModel.findByIdAndDelete(recordId);

        if(!removed){
            response.status(404).send({
                success: false,
                message: "Record not found for deletion."
            });
        }

       return response.status(200).send({
            success: true,
            message: "Record successfully removed."
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            message: "An error occured while deleting the record",
        });
        
    }
};

const create = async (request: Request, response: Response)=> {

    try {
        const { userId, description, amount, category, paymentMethod } = request.body;

        const newRecord = {
            userId: userId,
            description: description,
            amount: amount,
            category: category,
            paymentMethod: paymentMethod,
            date: new Date()
        };

        const result = new FinancialRecordModel(newRecord);
        await result.save();

       return response.status(200).send({
            success: true,
            message: "Record created and saved to database."
        });


        
    } catch (error) {
        console.log(error);
        response.status(404).send({
            success: false,
            message: "An error occured and the record could not be created or saved."
        });
        
    }
};

const update = async (request: Request, response: Response)=> {

    try {
        
        const {userId, recordId, description, category, amount, paymentMethod  } = request.body

        const updateRecord ={
            userId: userId,
            description: description,
            category: category,
            amount: amount,
            paymentMethod: paymentMethod,
            date: new Date()
        };

        const result = await FinancialRecordModel.findByIdAndUpdate(
            recordId, 
            updateRecord,
            { new: true }
        );

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

        
    } catch (error) {
        console.log(error);
        response.json(500).send({
            success: false,
            message: "An error occured while updating the record."
        });
        
    }

};
export {
    index,
    create,
    remove,
    update
};