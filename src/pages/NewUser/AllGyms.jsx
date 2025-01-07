import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

import { AddCircle, FitnessCenterRounded  } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowGyms = () => {

  const [AllGyms, setAllGyms] = useState([])
  const navigate = useNavigate();
  
  const fetchGyms = ()=>{
    axios.get('http://localhost:4000/auth/showGyms')
    .then((res)=>{
      setAllGyms(res.data.AllGyms)
    }).catch((e)=>{
      console.log(e.response);
      
    })
  
  }

  function handleClick(id){
    if(id == "add"){
      return navigate('/SignUp/RegisterGym')
    }
    navigate(`/SignUp/RegisterTrainee/${id}`)
    
  }
  



    useEffect(() => {
       fetchGyms()
      console.log(AllGyms);
      
      
    }, [])
    

    return (
      <>
      <Container sx={{marginTop : "30px"}}>
              <Typography variant="h3" textAlign='center' color="error" fontWeight="bold">
                      Select Your Gym
                    </Typography>
      </Container>


        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'space-around',
            margin : "30px",
            alignItems: 'center',
            flexWrap : "wrap" , 
            gap : "20px"
          }}
        >
          
            {/* Give this code chatGPT to make a Plus icon card */}
           
              {AllGyms.map((data , i)=>{
                  return (
                      <Card
                        onClick={()=>{handleClick(data._id)}}

                          sx={{
                            width: 300,
                            height: 500,
                            
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#C40A0C',
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': {
                              backgroundColor: '#830506',
                              // backgroundColor: '#B72B2D',
                              cursor: 'pointer'
                            },
                          }}
                        >
                      
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FitnessCenterRounded sx={{ fontSize: 150, color: 'white' }} />
                          <Box mt={2} textAlign='center' fontFamily='roboto' >
                            <Typography variant="h4" color='white'  my='10px'>
                              {data.gymName}
                            </Typography>
                            <Typography variant="p" color='white' >
                              {data.trainerName}
                            </Typography>
                          </Box>
                        </CardContent>
                                
                      </Card>
                  ) 
              })}
                  
                  
                    
                    

              
                
            <Card
              onClick={()=>{handleClick('add')}}
              sx={{
                width: 300,
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }} 
            >
              
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AddCircle sx={{ fontSize: 50, color: '#f50057' }} />
                  <Box mt={2}>
                    <Typography variant="h6" color="textSecondary">
                      Add Gym
                    </Typography>
                  </Box>
                </CardContent>
              
            </Card>
                
          
        </Box>
        </>

      );
}

export default ShowGyms
