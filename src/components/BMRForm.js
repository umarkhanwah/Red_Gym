import React, { useState } from 'react';
import { Grid } from 'react-loader-spinner';
import { Stack, Box, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Card, CardContent,Fade, IconButton } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { ThumbDownAltOutlined, ThumbUpAlt , ThumbUpAltOutlined, ThumbUpAltRounded } from '@mui/icons-material';
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








const BMRForm = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmrResult, setBmrResult] = useState(null);

  const handleGenderChange = (event) => setGender(event.target.value);
  const handleHeightUnitChange = (event) => setHeightUnit(event.target.value);
  const handleWeightUnitChange = (event) => setWeightUnit(event.target.value);

  const calculateBMR = () => {
    let heightInCm = heightCm;
    let weightInKg = weight;

    // Convert height to cm if it's in feet and inches
    if (heightUnit === 'feet') {
      heightInCm = (parseFloat(heightFeet) * 30.48) + (parseFloat(heightInches) * 2.54);
    }

    // Convert weight to kg if it's in pounds
    if (weightUnit === 'lbs') {
      weightInKg = parseFloat(weight) * 0.453592;
    }

    // Calculate BMR using Harris-Benedict Equation
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
    }

    // Set the BMR result
    setBmrResult(bmr.toFixed(2));
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
          BMR Calculator
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
            sx={{
              backgroundColor: gender === 'female' ? '#FF2625' : 'transparent',
              color: gender === 'female' ? 'white' : 'black',
            }}
          />
          <StyledFormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            sx={{
              backgroundColor: gender === 'male' ? '#FF2625' : 'transparent',
              color: gender === 'male' ? 'white' : 'black',
            }}
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
          onClick={calculateBMR}
        >
          Calculate
        </Button>

        {bmrResult ? (
  <Card variant="outlined" sx={{ mt: 3 }}>
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box width='60%'>
        <Typography variant="h5" marginBottom={1} component="h2">
          Your BMR is: {bmrResult}
        </Typography>
        <hr />
        <Typography marginTop={1} marginLeft={1} sx={bmrResult > 2500 || bmrResult < 1500 ? {color:'red'} : {color: 'blue'}}>
          
        {bmrResult > 3000
  ? 'Very High Metabolism 🚀'
  : bmrResult > 2500
  ? 'High Metabolism ⚡'
  : bmrResult >= 2000
  ? 'Above Average Metabolism 💪'
  : bmrResult >= 1500
  ? 'Average Metabolism 👍'
  : bmrResult >= 1200
  ? 'Below Average Metabolism ⚖️'
  : bmrResult >= 1000
  ? 'Low Metabolism 🐢'
  : 'Very Low Metabolism 💤'}
        </Typography>
      </Box>
      
      <IconButton onClick={() => { setBmrResult(0); }} md={6}>
        {bmrResult > 2500 || bmrResult < 1500 ? (
          <Zoom in={true} timeout={800}>
            <DangerousIcon fontSize="large" sx={{ color: 'red' }} />
          </Zoom>
        ) : (
          <Fade in={true} timeout={800}>
            <ThumbUpAlt fontSize="large" color='primary' />
          </Fade>
        )}
      </IconButton>
    </CardContent>
  </Card>
) : ""}


      </Stack>
    </Box>
  );
};

export default BMRForm;
