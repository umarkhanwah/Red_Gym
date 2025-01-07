import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Container } from '@mui/material';

const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

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
          // height: '50%',
          width: '400px',
        }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">Sign Up</Typography>
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
          <TextField
            label="UserName"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.username}
            onChange={handleInputChange}
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

export default CreateUser;
