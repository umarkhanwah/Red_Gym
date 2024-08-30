import React from 'react'
import { Link } from 'react-router-dom';
import { Button , Stack , Typography  } from '@mui/material';


const ExerciseCard = ({exercise , forms}) => {
  return (  
    
    <Link className='exercise-card' onClick={()=> { 
      if(forms){
        //If There is Fitness Caluculator , So it will save the usestate value with the name of that form
        forms(exercise.name);
        console.log(exercise.name);
        window.scrollTo({top:100 , left: 100 , behavior : 'smooth'});
      }
      //Otherwise, nothing
     } } to={forms? "" //For Fitness Form => No redirection
     :  `/exercise/${exercise.id}` //For Exercise => Redirect To Detail Page
     }> 
    <img src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
          {forms ? "" : (
                <Stack direction='row'>
                        <Button sx={{ ml : '21px' , color: '#fff' , background : '#ffa9a9' , fontSize: '14px' , borderRadius: '20px' , textTransform: 'capitalize'}}>
                        {exercise.bodyPart}  
                      </Button>  
                      <Button sx={{ ml : '21px' , color: '#fff' , background : '#fcc757' , fontSize: '14px' , borderRadius: '20px' , textTransform: 'capitalize'}}>
                        {exercise.target}  
                      </Button> 
                </Stack> 
          )}
       
      <Typography ml='21px' color='#000' fontWeight="bold" mt='11px' pb='10px' textTransform='capitalize' fontSize='22px'> 
        {exercise.name}
      </Typography>
    </Link>
  )
}

export default ExerciseCard