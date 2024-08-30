import React from 'react';
import {Route , Routes } from "react-router-dom";
import { Box } from '@mui/material';

import "./App.css";

import Navbar from './components/Navbar';   
import  Footer from './components/Footer';

import Home  from './pages/Home';
import ExerciseDetail  from './pages/ExerciseDetail';
import { Calculator } from './pages/Calculator';
import Sign_in from './pages/Sign_in';


const App = () => {
  return (
    <Box width="400px" sx={{ width : { xl:'1488px'}}} m="auto">
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/exercise/:id' element={<ExerciseDetail />} />
            <Route path='/calculators' element={<Calculator />} />
            <Route path='/Sign-in' element={<Sign_in />} />
        </Routes>
        <Footer />
    </Box>
    
  )
}

export default App