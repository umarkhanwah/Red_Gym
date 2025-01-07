import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from '@mui/material';

import "./App.css";

import Navbar from './components/Navbar';   
import Footer from './components/Footer';

import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import { Calculator } from './pages/Calculator';
import Sign_in from './pages/Sign_in';
import SignUp from './pages/NewUser/CreateUser';
import RegisterGym from './pages/NewUser/RegisterGym';

import ShowGyms from './pages/NewUser/AllGyms';
import RegisterTrainee from './pages/NewUser/RegisterTrainee';
import Dashboard from './components/Admin/Dashboard';
import AdminLayout from './components/Admin/AdminLayout';

const App = () => {
  const location = useLocation(); // Get the current route path

  // Define paths where the Navbar should not be displayed
  const hideNavbarPaths = ['/dashboard'];

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      {/* Conditionally render Navbar */}
      {/* {location.pathname!='/dashboard' && <Navbar />} */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/exercise/:id' element={<ExerciseDetail />} />
        <Route path='/calculators' element={<Calculator />} />
        <Route path='/SignUp' element={<ShowGyms />} />
        <Route path='/SignUp/RegisterGym' element={<RegisterGym />} />
        <Route path='/SignUp/RegisterTrainee/:id' element={<RegisterTrainee />} />
        <Route path='/SignUp/CreateUser' element={<SignUp />} />
        <Route path='/Signin' element={<Sign_in />} />
        <Route path='/Dashboard' element={<AdminLayout />} />
      </Routes>
      {!hideNavbarPaths.includes(location.pathname) && <Footer />}

    </Box>
  );
};

export default App;
