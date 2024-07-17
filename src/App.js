
import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import Login from './components/Login';
import DepositForm from './components/Dashboard/CustomerDetails=/Deposit';
import WithdrawalForm from './components/Dashboard/CustomerDetails=/Withdraw';
import TransactionsList from './components/Dashboard/CustomerDetails=/Transactions';
import Dashboard from './components/Dashboard/CustomerDashboard';
import BankerDashboard from './components/Dashboard/BankerDashboard';
import { RoleProvider, useRole } from './AuthRoute/roleContext'; 

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/transaction" element={<ProtectedCustomerDashboard/>} />
          <Route path="/banker-dashboard" element={<ProtectedBankerDashboard />} />
          <Route path="/customer-dashboard" element={<ProtectedCustomerDashboard />} />
          <Route path="/withdraw" element={<ProtectedCustomerDashboard />} />
          <Route path="/deposit" element={<ProtectedCustomerDashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

function ProtectedCustomerDashboard() {
  const { role } = useRole();
  console.log("Role",role)
  if (role !== 'Customer') {
   
    return <Navigate to="/" replace />;
  }

  return <TransactionsList /> ,<WithdrawalForm />,<DepositForm />,<Dashboard />;
}


function ProtectedBankerDashboard() {
  const { role } = useRole();
  console.log("Role",role)
  if (role !== 'Banker') {
   
    return <Navigate to="/" replace />;
  }

  return <BankerDashboard />;
}


export default App;
