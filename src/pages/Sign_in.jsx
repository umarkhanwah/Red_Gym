import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Link, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Sign_in = () => {
  const [Error, setError] = useState('');
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken')



  const handleSubmit =(e)=>{
    e.preventDefault();
    const {phone , password} = e.target;

    axios.post('http://localhost:4000/auth/login' , {
      phone : phone.value,
      password : password.value,
    }).then((res)=>{
      console.log(res.data);
      localStorage.setItem('authToken' , res.data.token)
      navigate('/')
      console.log(res.data.message);
      
    }).catch((e)=>{
      console.log(e.response);
      if(e.response.data){
        setError(e.response.data.message)
      }
    })
  }
  useEffect(()=>{
    if(authToken){
      navigate('/dashboard')
    }
  } , [])




  return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
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
          // height: '50%',
          
          width : "400px"
        }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">Sign In</Typography>
        <Box sx={{ textAlign: 'start'  }}>
          <TextField
            label="Phone"
            name='phone'
            placeholder='03108900219'
            variant="outlined"
            fullWidth
            margin="normal"
            />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name='password'
            fullWidth
            margin="normal"
          />
        </Box>
        
        {Error ? <Alert severity="error" style={{marginBottom:"10px"}}>{Error}</Alert>:'' }
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/SignUp" underline="hover">
            Create an Account
          </Link>
          <Button variant="contained" type='submit' color="error">
            Sign In
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Sign_in



