import React from 'react';
import { Box , Stack , Typography } from '@mui/material';

import Loader from './Loader';

import HorizontalScrollBar from "./HorizontalScrollBar"

export const SimilarExercises = ({targetMuscleExercises , equipmentExercises}) => {
  return (
    <Box sx={{mt : { lg : '100px' ,  xs : '0'}}}>
      <Typography variant='h3' mb={5}>Exercises That Target the Same Muscle Group.</Typography>
      <Stack direction='row' sx={{p : '2' , position : 'relative'}}>
        {targetMuscleExercises.length ? <HorizontalScrollBar data={targetMuscleExercises} /> : <Loader /> }

      </Stack>
      <Typography variant='h3' mb={5}>Exercises That use the Same Equipments.</Typography>
      <Stack direction='row' sx={{p : '2' , position : 'relative'}}>
        {equipmentExercises.length ? <HorizontalScrollBar data={equipmentExercises} /> : <Loader /> }

      </Stack>
    </Box>
  )
}
