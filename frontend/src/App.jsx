import React from 'react';
import HomePage from './pages/HomePage';
import {Routes,Route, Navigate} from "react-router-dom"
import SignUp from './components/common/SignUp';
import Login from './components/common/Login';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './components/dashboardComponents/Dashboard';
import Projects from './components/dashboardComponents/Projects';
import { Toaster } from 'sonner';
import ProjectDetailsPage from './components/dashboardComponents/ProjectDetailsPage';
import SocketProvider from './components/common/SocketProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
import Docs from './pages/Docs';


const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <SocketProvider />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/docs' element={<Docs />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/login' element={<Login />} />


        {/* dashboard routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/observix" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} /> 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='projects' element={<Projects />} /> 
        <Route path='project/details/:id' element={<ProjectDetailsPage />} />
        </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
