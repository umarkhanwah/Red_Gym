import React, { useState } from 'react';
import { Stack, Box, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const BMIForm = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleHeightUnitChange = (event) => setHeightUnit(event.target.value);
  const handleWeightUnitChange = (event) => setWeightUnit(event.target.value);

  const toggleHeightInput = () => {
    setHeightUnit(prev => prev === 'cm' ? 'feet' : 'cm');
  };

  const toggleWeightInput = () => {
    setWeightUnit(prev => prev === 'kg' ? 'lbs' : 'kg');
  };

  const calculateBMI = () => {
    // BMI Calculation logic here
  };

  return (
    <Box
      sx={{
        bgcolor: '#FFEBF3',
        p: 4, m:"50px",
        borderRadius: 2,
        boxShadow: '0 0 20px 2px silver',
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          BMI Calculator
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter Values & Click Calculate Button to get results
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'black' }}>
            Gender
          </FormLabel>
          <RadioGroup row value={gender} onChange={handleGenderChange}>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Fe-Male"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        />

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Height
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Height in cm"
            type="number"
            variant="outlined"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            fullWidth
            sx={{ borderRadius: 2, display: heightUnit === 'cm' ? 'block' : 'none' }}
          />
          <TextField
            label="Feet"
            type="number"
            variant="outlined"
            value={heightFeet}
            onChange={(e) => setHeightFeet(e.target.value)}
            sx={{ borderRadius: 2, display: heightUnit === 'feet' ? 'block' : 'none' }}
          />
          <TextField
            label="Inches"
            type="number"
            variant="outlined"
            value={heightInches}
            onChange={(e) => setHeightInches(e.target.value)}
            sx={{ borderRadius: 2, display: heightUnit === 'feet' ? 'block' : 'none' }}
          />
          <Select
            value={heightUnit}
            onChange={handleHeightUnitChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="cm">Cm</MenuItem>
            <MenuItem value="feet">Feet & Inch</MenuItem>
          </Select>
        </Stack>

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Weight
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Weight in kg"
            type="number"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            sx={{ borderRadius: 2, display: weightUnit === 'kg' ? 'block' : 'none' }}
          />
          <TextField
            label="Weight in Pounds"
            type="number"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            sx={{ borderRadius: 2, display: weightUnit === 'lbs' ? 'block' : 'none' }}
          />
          <Select
            value={weightUnit}
            onChange={handleWeightUnitChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="kg">Kg</MenuItem>
            <MenuItem value="lbs">Pounds</MenuItem>
          </Select>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: '#FF2625',
            mt: 3,
            '&:hover': {
              bgcolor: 'white',
              border: '2px solid #FF0E73',
              color: '#FF0E73',
            },
          }}
          onClick={calculateBMI}
        >
          Calculate
        </Button>
      </Stack>
    </Box>
  );
};

export default BMIForm;
