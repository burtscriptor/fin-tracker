import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { FinancialRecordsContext, FinancialRecordsProvider } from './contexts/FinancialRecordContext';

function App() {

  return (
    <Router>
      <div className="app-container" >
        <Routes>
          <FinancialRecordsProvider >
            <Route path="/" element={<Dashboard />} />
          </FinancialRecordsProvider>
          <Route path="/auth" element={<Auth />} />

        </Routes>
      </div>
    </Router>
  )
};

export default App;
