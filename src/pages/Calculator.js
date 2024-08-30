import React, { useState } from 'react'
import BMIForm from '../components/BMIForm'
import bodyPart from '../components/bodyPart'
import { Box, Button, ButtonGroup, Container , Grid , Paper, Typography } from '@mui/material'

import Exercises from '../components/Exercises'
import Footer from '../components/Footer'

import BMRForm from '../components/BMRForm'
import BodyFatCalculator from '../components/BodyFatCalculator'
import CalorieIntakeCalculator from '../components/CalorieIntakeCalculator'


export const Calculator = () => {

  var forms = [
    {id :1 , name : "BMI" , gifUrl : "https://static.vecteezy.com/system/resources/previews/042/168/311/non_2x/body-mass-index-infographic-chart-colorful-bmi-chart-illustration-with-white-isolated-background-vector.jpg"},
    {id :2 , name : "BMR"  ,gifUrl : 'https://media.istockphoto.com/id/1468536099/vector/bmr-basal-metabolic-rate-acronym-medical-concept-background-metabolism-level-scale-with.jpg?s=612x612&w=0&k=20&c=QFv7nXYRjDPVvzS1z2zvvTrQOlGdaSNJHcor1KXQlno='},
    {id :3 , name : "Body Fat"  ,gifUrl : 'https://media.healthdirect.org.au/images/inline/original/visceral-fat-diagram-ad484c.jpg'},
    {id :4 , name : "Calorie Intake" , gifUrl : "https://img.koreatimes.co.kr/upload/newsV2/images/20150719--Daily-calorie-intake.jpg"},

  ]
  const [page, setpage] = useState("BMI");

 
  return (

    <Container >


            {/* Use State Value will decide , Which Form should be shown */}
            {page==="BMI" && <BMIForm />}
            {page==="BMR" && <BMRForm />}
            {page==="Body Fat" && <BodyFatCalculator />}
            {page==="Calorie Intake" && <CalorieIntakeCalculator />}

          <Exercises exercises={forms} forms={setpage} setExercises={()=>(console.log("Something"))} />



    </Container>
 
  )
}
