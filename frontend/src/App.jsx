import React from 'react';
import HomePage from './pages/HomePage';
import {Routes,Route} from "react-router-dom"
import SignUp from './components/common/SignUp';
import Login from './components/common/Login';

const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
