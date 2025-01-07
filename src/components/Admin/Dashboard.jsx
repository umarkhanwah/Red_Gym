import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  
 
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from '@mui/icons-material';


ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const authToken = localStorage.getItem('authToken')
 
  const [PaidTrainees, setPaidTrainees] = useState([])
  const [AbsentTrainees, setAbsentTrainees] = useState([])
  const [Trainees, setTrainees] = useState([])
  const [PresentTrainees, setPresentTrainees] = useState([])
    
  const markAttendance = (trainee) => {
    const date = new Date(Date.now());

    axios.post('http://localhost:4000/admin/markAttendance', {
        trainee   , date
    }, { headers: { 'authToken': authToken } })
        .then((res) => {
            alert(res.data.message)
            console.log(res);
            

        }).catch((e) => {
            alert(e.response.data.message)
            console.log(e.response);

        })
        fetchAbsentTrainees()

}


  const fetchPresentTrainees = ()=>{
    axios.get('http://localhost:4000/admin/PresentTrainees' , {headers : {'authToken' : authToken}})
    .then(
      (res)=>{ 
        console.log(res.data);
        setPresentTrainees(res.data)
        
        
      }
    ).catch((e)=>console.error(e.response))
  }
  const fetchPaidTrainees = ()=>{
    axios.get('http://localhost:4000/admin/PaidFeesTrainees' , {headers : {'authToken' : authToken}})
    .then(
      (res)=> {
        setPaidTrainees(res.data);
        console.log( "Paid Trainees",res.data);
        
      }
    ).catch((e)=>console.error(e.response))
  }


  const fetchTrainees = ()=>{

    if(!authToken){
      return navigate('/signin')
    }

    axios.get('http://localhost:4000/admin/fetchTrainees' , {headers : {'authToken' : authToken}})
    .then((res)=>{
      setTrainees(res.data.trainees);
      console.log(res.data);
    })
    .catch((e)=>console.log(e.response))
  }
  const fetchAbsentTrainees = ()=>{

    if(!authToken){
      return navigate('/signin')
    }

    axios.get('http://localhost:4000/admin/fetchAbsentTrainees' , {headers : {'authToken' : authToken}})
    .then((res)=>{
      setAbsentTrainees(res.data.absentTrainees);
      console.log(res.data);
    })
    .catch((e)=>console.log(e.response))
  }

  useEffect(() => {
    fetchPresentTrainees();
    // fetchTrainees();
    fetchAbsentTrainees();
    fetchPaidTrainees();
  }, [])
  
      
      


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
  };


  
    const createChartData = (labels, data, colors) => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverOffset: 8,
        },
      ],
    });
  
    const chartData1 = createChartData(
      ["Present", "Absent"],
      [PresentTrainees.length , AbsentTrainees.length],
      ["#5DE2E7", "#FF2625"]
    );
  
    const chartData2 = createChartData(
      ["Paid", "Unpaid"],
      [PaidTrainees.length, 50],
      ["#FF2625", "#FFC107"]
      
    );
  
    const chartData3 = createChartData(
      ["Registered", "Not Registered"],
      [70, 30],
      ["#673AB7", "#2196F3"]
    );



  const checkDate = (date)=>{
      const today = new Date( Date.now());
      date = new Date(date);
      console.log(date.getDate());
      
      return (today.getDate() >= date.getDate()) 
    }
      



  return (
    <>
      <Box sx={{ overflowY: "auto", padding: 2 }}>
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {[chartData1, chartData2, chartData3].map((data, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  borderRadius: "12px",
                  bgcolor: "#fff",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {["Attendance", "Fee Status", "Registration"][index]}
                </Typography>
                <Doughnut data={data} options={chartOptions} />
              </Paper>
            </Grid>
          ))}
        </Grid>

      <Typography variant="h4" color="error" fontWeight="bold" marginY={5} textAlign='center'>Mark Attendance 👇</Typography>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>Roll No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                
                <TableCell>Fee Status</TableCell>
                <TableCell>Mark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AbsentTrainees.map((trainee, index) => (
                <TableRow
                  key={index}
                  
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                    "&:hover": { bgcolor: "#f0f0f0" },
                    
                  }}
                  
                >
                  <TableCell>{trainee.rollNumber}</TableCell>
                  <TableCell>{trainee.name}</TableCell>
                  <TableCell>{trainee.phone } </TableCell>
                  
                  <TableCell >{checkDate(trainee.joinDate) ? "Pending ... " : "Paid"}</TableCell>
                  <TableCell>
                    <Button variant='contained' 
                    color={checkDate(trainee.joinDate) ?'error' : "primary"}  
                    sx={{borderRadius:"100px" }} 
                    
                      onClick={()=>markAttendance(trainee._id)}
                    ><Check /></Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Dashboard
