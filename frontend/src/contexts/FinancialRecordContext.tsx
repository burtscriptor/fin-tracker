import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';


export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date; 
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}


interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    deleteRecord:(id: string) => void;
    updateRecord:(id: string, newRecord: FinancialRecord) => void;

   
}

export const FinancialRecordsContext = createContext<
    FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();

    const addRecord = async (record: FinancialRecord) => {

        try {
            const response = await axios.post(
                "http://localhost:3001/financial-records/create",
                record, 
            );


            if (response.data.success) {                
                await getRecords(user);
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };


  
    const deleteRecord = async(id: String)=>{
      
        try {
            const response = await axios.delete(`http://localhost:3001/financial-records/delete/${id}`);

            if(response.data.success){
                await getRecords(user);
            }

            setRecords((prevRecords) => prevRecords.filter(record => record._id !== id));

        } catch (error) {
            console.log(error);
            
        }
    };

    const getRecords = async ()=> {
       
        try {
            
            const response = await axios.get(`http://localhost:3001/financial-records/index/${user?.id}`); 

            if(response.data.success){
                const recordList = response.data.records[0].map((record) => {
                    const parsedDate = new Date(record.date);
                    return {
                        ...record,
                        date: isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleString(),
                    };
                });
                setRecords(recordList);
                
            };
            return;

        } catch (error) {
            console.log("Error fetching records:", error)
        };
        
    };

    const updateRecord=async(id:string, newRecord: FinancialRecord)=>{

        try {
            const response = await axios.put(`http://localhost:3001/financial-records/update/${id}`, newRecord,)

            console.log(response);

            if (response.data.success) {
              const newRecord = response.data.updatedRecord;
              setRecords((prev)=> prev.map((record)=>{
                if(record._id === id) {
                    return newRecord;
                } else{
                    return record;
                }
              }))
                
            }
        } catch (error) {
            console.log(error); 
        }

    };


    useEffect(()=>{
        getRecords();

    }, [user]);

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, getRecords, deleteRecord, updateRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => { 
    const context = useContext(FinancialRecordsContext);

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }

    return context;
};
