import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const FinancialRecordForm = () => {

    const { user } = useUser();

    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        const newRecord = {
            userId: user?.id,
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        };

        // addRecord(newRecord);
       
        setDescription("");
        setCategory("");
        setAmount("");
        setPaymentMethod("");
    };

    return (
        <div className="form-containter" >
            <form onSubmit={handleSubmit}action="">
                <div className="for-field">
                    <label >Description:</label>
                    <input type="text" required className="input" value={description} onChange={(event)=> setDescription(event.target.value)} />
                </div>
                <div className="form-field">
                    <label >Amount:</label>
                    <input type="number" required className="input" value={amount} onChange={(event)=> setAmount(event.target.value)}/>
                </div>
                <div className="form-field">
                    <label htmlFor="">Category:</label>
                    <select required className="input" name="" id="" value={category} onChange={(event)=> setCategory(event.target.value)}>
                        <option value="">Select a Category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="">Payment Method:</label>
                    <select name="" id="" className="input" required value={paymentMethod} onChange={(event)=> setPaymentMethod(event.target.value)}>
                        <option value="">Select a Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <button type="submit" className="button">
                    Add Record
                </button>

            </form>

        </div>
    )
};

export default FinancialRecordForm;
