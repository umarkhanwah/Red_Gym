import React, { useState } from 'react';
import { Stack, Box, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Card, IconButton, Fade, CardContent } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: '0',
  borderRadius: '8px',
  overflow: 'hidden',
  width: '50%',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  border: '2px solid transparent',
  padding: '10px 20px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  '& .MuiRadio-root': {
    display: 'none',
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
  },
}));

const BodyFatCalculator = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [bodyFatResult, setBodyFatResult] = useState(null);

  const handleGenderChange = (event) => setGender(event.target.value);

  const calculateBodyFat = () => {
    const heightInCm = (parseFloat(heightFeet) * 30.48) + (parseFloat(heightInches) * 2.54);
    const waistInCm = parseFloat(waist) * 2.54;
    const neckInCm = parseFloat(neck) * 2.54;
    const hipInCm = gender === 'female' ? parseFloat(hip) * 2.54 : 0;

    let bodyFatPercentage;

    if (gender === 'male') {
      bodyFatPercentage = 86.01 * Math.log10(waistInCm - neckInCm) - 70.041 * Math.log10(heightInCm) + 36.76;
    } else {
      bodyFatPercentage = 163.205 * Math.log10(waistInCm + hipInCm - neckInCm) - 97.684 * Math.log10(heightInCm) - 78.387;
    }

    setBodyFatResult(bodyFatPercentage.toFixed(2));
  };

  return (
    <Box
      sx={{
        bgcolor: '#FFEBF3',
        p: 4,
        m: "50px",
        borderRadius: 2,
        boxShadow: '0 0 20px 2px silver',
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          Body Fat Calculator
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
          Weight (in lbs)
        </Typography>
        <TextField
          label="Weight"
          type="number"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        />

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Waist (in inches)
        </Typography>
        <TextField
          label="Waist"
          type="number"
          variant="outlined"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        />

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
          Neck (in inches)
        </Typography>
        <TextField
          label="Neck"
          type="number"
          variant="outlined"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          fullWidth
          sx={{ borderRadius: 2 }}
        />

        {gender === 'female' && (
          <Box>
            <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
              Hip (in inches)
            </Typography>
            <TextField
              label="Hip"
              type="number"
              variant="outlined"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              fullWidth
              sx={{ borderRadius: 2 }}
            />
          </Box>
        )}

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
          onClick={calculateBodyFat}
        >
          Calculate
        </Button>

        {bodyFatResult && (
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box width="60%">
                <Typography variant="h5" marginBottom={1} component="h2">
                  Your Body Fat Percentage is: {bodyFatResult}%
                </Typography>
                <hr />
                <Typography
                  marginTop={1}
                  marginLeft={1}
                  sx={
                    bodyFatResult > 24 || bodyFatResult < 6
                      ? { color: 'red' }
                      : { color: 'blue' }
                  }
                >
                  {bodyFatResult > 25
                    ? 'High Body Fat 🔴'
                    : bodyFatResult >= 18
                    ? 'Normal Body Fat'
                    : 'Low Body Fat ⬇'}
                </Typography>
              </Box>

              <IconButton onClick={() => setBodyFatResult(null)} md={6}>
                {bodyFatResult > 24 || bodyFatResult < 6 ? (
                  <Zoom in={true} timeout={800}>
                    <DangerousIcon fontSize="large" sx={{ color: 'red' }} />
                  </Zoom>
                ) : (
                  <Fade in={true} timeout={800}>
                    <ThumbUpAlt fontSize="large" color="primary" />
                  </Fade>
                )}
              </IconButton>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default BodyFatCalculator