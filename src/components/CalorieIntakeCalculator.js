import React, { useState } from 'react';
import { Stack, Box, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Card, IconButton, Fade, CardContent } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: '0',
    borderRadius: '8px',
    overflow: 'hidden',
    width : "50%",
    transition: 'background-color 0.3s ease, color 0.3s ease',
    border: '2px solid transparent',
    padding: '10px 20px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    
    '& .MuiRadio-root': {
      display: 'none', // Hide the radio button itself
    },
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center',
    },
    '&.Mui-checked': {
      backgroundColor: '#FF2625',
      color: 'white',
      borderColor: '#FF2625',
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
      // borderColor: '#FF2625',
    },
  }));
  

const CalorieIntakeCalculator = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calorieResult, setCalorieResult] = useState(null);

  const handleGenderChange = (event) => setGender(event.target.value);

  const calculateCalories = () => {
    const heightInCm = (parseFloat(heightFeet) * 30.48) + (parseFloat(heightInches) * 2.54);
    const weightInKg = parseFloat(weight);

    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
    }

    // Calculate calories based on activity level
    const activityMultiplier = {
      'sedentary': 1.2,
      'lightly_active': 1.375,
      'moderately_active': 1.55,
      'very_active': 1.725,
      'extra_active': 1.9
    };

    const dailyCalories = bmr * activityMultiplier[activityLevel];
    setCalorieResult(dailyCalories.toFixed(2));
  };

  return (
    <Box
      sx={{
        bgcolor: '#FFEBF3',
        p: 4, m: "50px",
        borderRadius: 2,
        boxShadow: '0 0 20px 2px silver',
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <Stack spacing={2}>

        <Typography variant="h4" component="h2" fontWeight="bold">
          Calorie Intake Calculator
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter Values & Click Calculate Button to get results
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}>
            Gender
          </FormLabel>
          <RadioGroup row value={gender} onChange={handleGenderChange}>
            <StyledFormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <StyledFormControlLabel
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
        <Stack direction="row"   spacing={1}>
          <TextField
            label="Feet"
            type="number" 
            variant="outlined"
            value={heightFeet}
            onChange={(e) => setHeightFeet(e.target.value)}
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="Inches"
            type="number"
            variant="outlined"
            value={heightInches}
            onChange={(e) => setHeightInches(e.target.value)}
            sx={{ borderRadius: 2 }}
          />
        </Stack>

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Weight (kg)
        </Typography>
        <TextField
          label="Weight in kg"
          type="number"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        />

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Activity Level
        </Typography>
        <Select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="sedentary">Sedentary (Little or no exercise)</MenuItem>
          <MenuItem value="lightly_active">Lightly Active (Light exercise/sports 1-3 days/week)</MenuItem>
          <MenuItem value="moderately_active">Moderately Active (Moderate exercise/sports 3-5 days/week)</MenuItem>
          <MenuItem value="very_active">Very Active (Hard exercise/sports 6-7 days a week)</MenuItem>
          <MenuItem value="extra_active">Extra Active (Very hard exercise/sports & physical job)</MenuItem>
        </Select>

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
          onClick={calculateCalories}
        >
          Calculate
        </Button>

        {calorieResult && (
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box width='100%'>
                <Typography variant="h5" marginBottom={1} component="h2">
                  Your Daily Caloric Intake should be: {calorieResult} calories
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default CalorieIntakeCalculator;
