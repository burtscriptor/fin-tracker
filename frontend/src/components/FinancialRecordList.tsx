import React, { useEffect, useMemo, useState } from 'react';
import { useTable, Column, CellProps, } from "react-table";
import { useFinancialRecords, FinancialRecord } from '../contexts/FinancialRecordContext';
import "./FinancialRecords.css";

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
    value: initialValue,
    row,
    column,
    updateRecord,
    editable,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value);
    };

    return (
       
        <div className="" 
             onClick={() => editable && setIsEditing(true)}
             style={{ cursor: editable ? "pointer" : "default" }}>
            {isEditing ? (
                <input value={value} 
                       onChange={(e) => setValue(e.target.value)} 
                       autoFocus 
                       onBlur={onBlur} 
                       style={{ width: "100%" }} />
            ) : 
                 (  value !== undefined && value !== null ? value.toString() : "N/A"

            )}
        </div>
    );
};


const FinancialRecordList = () => {
    const { records, deleteRecord, updateRecord } = useFinancialRecords();
    
       
const [totals, setTotals] = useState<{ expense: number; earnings: number } | null>(null);



    const updateCellRecord = (rowIndex: number, columnId: string, value: any)=>{
        const id = records[rowIndex]?._id;
        updateRecord(id ?? "", {...records[rowIndex], [columnId]: value })
    };

    const columns: Array<Column<FinancialRecord>> = useMemo(() => [
        { Header: "Description", accessor: "description", 
          Cell: (props) => ( <EditableCell {...props} updateRecord={(updateCellRecord)} editable /> )} ,
        { Header: "Amount", accessor: "amount", 
          Cell: (props) => ( <EditableCell {...props} updateRecord={(updateCellRecord)} editable /> )},
        { Header: "Category", accessor: "category", 
          Cell: (props) => ( <EditableCell {...props} updateRecord={(updateCellRecord)} editable /> )} ,
        { Header: "Payment Method", accessor: "paymentMethod", 
          Cell: (props) => ( <EditableCell {...props} updateRecord={(updateCellRecord)} editable /> )} ,
        { Header: "Date", accessor: "date", 
          Cell: (props) => ( <EditableCell {...props} updateRecord={(updateCellRecord)} editable={false} /> )},
        { Header: "Delete", id: "delete", 
          Cell: ({ row }) => (
              <button onClick={() => deleteRecord(row.original._id) } className="button">Delete</button>
          ) },
    ], [records]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ 
        columns, 
        data: records ?? [] // Ensures `data` is always an array
    });
    


    const total=()=>{
        if(records.length > 0){

        const totals = records.reduce((acc, record)=> {

            if(record.amount < 0){
                acc.expense += record.amount;
                return acc;
            } else {
                acc.earnings += record.amount;
                return acc;
            }
       
        }, { expense: 0, earnings: 0});
    
        setTotals(totals);

        return totals;
           
        }else{
            return;
        }
       
    };

    useEffect(()=>{
        if(records.length > 0){
            total();
        };
    }, [records])

    return (
        <>
       {
        records.length !== 0  ?
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((col) => (
                                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p>Total Earnings: ${totals ? `${totals.earnings}` : "nothing"}</p>
            <p>Total Expenses: ${totals ? `${totals.expense}` : "nothing"}</p>
            <p>Balance: $ {totals ? `${totals.earnings + totals.expense}` : ""}</p>
        </div>
        
        : (<p>No records, lets get started!</p>)}
        </>
    );
};

export default FinancialRecordList;
