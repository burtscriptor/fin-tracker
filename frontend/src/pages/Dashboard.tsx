import React from 'react';
import { useUser } from '@clerk/clerk-react';
import FinancialRecordForm from '../components/FinancialRecordForm';
import FinancialRecordList from '../components/FinancialRecordList';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="dashboard-container" >
      <h1>Welcome {user?.firstName} ! Here Are You Fiances:</h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  )
}

export default Dashboard;
