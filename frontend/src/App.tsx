import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { FinancialRecordsProvider } from './contexts/FinancialRecordContext';

function App() {
  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
         <h3>Penny Counter</h3>
          {isSignedIn && (
            <>
             
              <UserButton />
            </>
          )}
        </div>

        <Routes>
        
          <Route
            path="/"
            element={
              isSignedIn ? (
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          
        
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
