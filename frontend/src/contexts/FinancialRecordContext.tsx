import axios from "axios";
import { createContext, useContext, useState } from "react";

interface FinancialRecord {
    id?: string;
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

    const addRecord = async (record: FinancialRecord) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/financial-records/create", // Fixed typo
                record
            );

            console.log(response.data);

            if (response.data.success) {                
                const newRecord = response.data;
                newRecord.date = new Date(newRecord.date);

                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => { // Fixed typo
    const context = useContext(FinancialRecordsContext);

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }

    return context;
};
