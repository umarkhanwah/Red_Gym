import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterGym = () => {

  const navigate = useNavigate();
  // This state is using only to confirm passwords
  const [Error, setError] = useState('')


  // All Validation Error will be store in this state
  const [Errors, setErrors] = useState([])
  
  // Setting Form Values in a state
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    gymName: '',
    trainerName: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if(formValues.password != formValues.confirmPassword){
      // setErrors([...Errors , {path : "confirmPassword" , msg : "Password Does not Match...!"}])
      setError('Password Does not Match...!')
    }
    else{
      setError('')
    }
  };
  
  
  
  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    

    axios.post('https://redgymapi.vercel.app/auth/Gym' , {
      
      trainerName : formValues.trainerName , 
      phone : formValues.phone,
      email : formValues.email, 
      gymName: formValues.gymName,
      password : formValues.password 
 
    }).then((res)=>{
      navigate('/signin')
      console.log(res.data);
      
    })
    .catch((e)=>{
      console.log(e.response);

      if(e.response.data.errors){
        setErrors(e.response.data.errors)
        console.log(Errors);
        
      }
    })

  };


    

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        marginBottom : "100px",
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          textAlign: 'center',
          p: 2,
          marginY: "100px",
          // height: '50%',
          width: '400px',
        }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">Register GYM</Typography>
        <Box sx={{ textAlign: 'start' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {Errors.map((data , i)=>{
              if(data.path == 'email') return(<Alert severity='error'>{data.msg}</Alert>)
          })}
         
          <TextField
            label="Phone"
            name="phone"
            placeholder='03123456789'
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.phone}
            onChange={handleInputChange}
          />
          {Errors.map((data , i)=>{
              if(data.path == 'phone') return(<Alert severity='error'>{data.msg}</Alert>)
          })}
          <TextField
            label="Gym Name"
            name="gymName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.gymName}
            onChange={handleInputChange}
          />
          {Errors.map((data , i)=>{
              if(data.path == 'gymName') return(<Alert severity='error'>{data.msg}</Alert>)
          })}
          <TextField
            label="Trainer Name"
            name="trainerName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.trainerName}
            onChange={handleInputChange}
          />
          {Errors.map((data , i)=>{
              if(data.path == 'trainerName') return(<Alert severity='error'>{data.msg}</Alert>)
          })}
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {Errors.map((data , i)=>{
              if(data.path == 'password') return(<Alert severity='error'>{data.msg}</Alert>)
          })}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
        </Box>
        {/* {Errors.map((data , i)=>{
              if(data.path == 'confirmPassword') return(<Alert severity='error'>{data.msg}</Alert>)
          })} */}
        {Error!='' ? <Alert severity="error">{Error}</Alert>:'' }
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/Signin" underline="hover">
            Already Have an Account?
          </Link>
          <Button type="submit" variant="contained" color="error">
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterGym;
