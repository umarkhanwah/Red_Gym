import React from 'react';
import { Stack , Typography } from '@mui/material';

import Icon from '../assets/images/RedGym_Logo.png';



const BodyPart = ({item , setBodyPart , bodyPart}) => {
  return (
    <Stack
    sx={{
        background : '#fff', 
        borderBottomLeftRadius : '20px' , 
        width : '270px', height : '280px' , cursor : 'pointer' , gap : '47px',
        borderTop : bodyPart === item ? '4px solid #ff2625' : ''
    }}

    type="button" alignItems='center' justifyContent='center' className='bodyPart-card'
    onClick={() => {
        setBodyPart(item);
        window.scrollTo({top:1800 , left: 100 , behavior : 'smooth'})
    }}
    >
        <img src={Icon} alt='dumbbell' style={{width:'60px' , height: '60px'}} />
        <Typography fontSize='24px' fontWeight='bold' color='#3A1212' textTransform='capitalize'>{item}</Typography>
    </Stack>
  )
}

export default BodyPart