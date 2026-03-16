import React from 'react';
import HomePage from './pages/HomePage';
import {Routes,Route, Navigate} from "react-router-dom"
import SignUp from './components/common/SignUp';
import Login from './components/common/Login';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './components/dashboardcomponents/Dashboard';
import Projects from './components/dashboardcomponents/Projects';

const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/login' element={<Login />} />

        {/* dashboard routes */}
        <Route path="/observix" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} /> 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='projects' element={<Projects />} /> 

        

         
        </Route>
      </Routes>
    </div>
  );
}

export default App;
