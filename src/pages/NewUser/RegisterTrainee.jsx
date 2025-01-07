import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Link, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const RegisterTrainee = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    _id: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Set default values using useEffect to prevent re-render loop
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      username: 'Umar Khan',
      _id: id,
    }));
  }, [id]); // Runs only when `id` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // You can now send formValues to the backend or perform any other actions
  };

  return (
    <Box
      sx={{
        height: '100vh',
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
          width: '400px',
        }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">
          Create Your Account
        </Typography>
        <Box sx={{ textAlign: 'start' }}>
          <TextField
           
            name="_id"
            type="hidden"
           
            inputProps={{ readOnly: true }}
            
            value={formValues._id}
          />
          <TextField
            label="UserName"
            name="username"
            inputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.username}
          />
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/SignIn" underline="hover">
            Already Have an Account?
          </Link>
          <Button type="submit" variant="contained" color="error">
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterTrainee;
