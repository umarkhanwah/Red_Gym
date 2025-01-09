import React, { useEffect, useState } from 'react'

import {

    Grid,
    Paper,
    Box, TextField, Button, Typography, Container, Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from 'axios';


const FeeStatus = () => {
    
    const authToken = localStorage.getItem('authToken')
    const [SearchQuery, setSearchQuery] = useState(""); 
    const [Trainees, setTrainees] = useState([])
    
    const fetchUnpaidFeesTrainees = () => {
        axios.get('http://localhost:4000/admin/fetchUnpaidFeesTrainees', {
            headers: { 'authToken': authToken }
        })
        .then(res => {
            console.log(res.data);
            setTrainees(res.data.unpaidTrainees);
        })
        .catch(e => console.error(e.response));
    };
    


    // const fetchTrainees = ()=>{

    //     if(!authToken){
    //       return navigate('/signin')
    //     }
    
    //     axios.get('http://localhost:4000/admin/fetchTrainees' , {headers : {'authToken' : authToken}})
    //     .then((res)=>{
    //       setTrainees(res.data.trainees);
    //       console.log(res.data);
    //     })
    //     .catch((e)=>console.log(e.response))
    //   }

    const getDay = (dateString) => {
        const date = new Date(dateString);
        const today = new Date( Date.now());
        if(today.getDate() == date.getDate()){
            return "Time to Pay Fees"
        }else if(today.getDate() > date.getDate()){
            
            return `${date.getDate()} - (Fees is Late ${today.getDate()- date.getDate()} days) `
        }else{
            return date.getDate()
        }
    };

    const checkDate = (date)=>{
        const today = new Date( Date.now());
        date = new Date(date);
        return (today.getDate() >= date.getDate()) 
    }
  

  const PayFees = (trainee) => {
    const date = new Date(Date.now());
    
    axios.post('http://localhost:4000/admin/PayFees', {
        trainee   , date
    }, { headers: { 'authToken': authToken } })
        .then((res) => {
            alert(res.data.message)
            console.log(res);
            

        }).catch((e) => {
            alert(e.response.data.message)
            console.log(e.response);

        })
        

}

const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
        fetchUnpaidFeesTrainees() // Reset to full list when query is empty
    } else {
        const filtered = Trainees.filter(trainee =>
            trainee.name.toLowerCase().includes(query) || 
            trainee.rollNumber.toString().includes(query) || 
            (trainee.phone && trainee.phone.includes(query))
        );
        setTrainees(filtered);
    }
};

    useEffect(() => {
        // fetchTrainees();
        fetchUnpaidFeesTrainees();
    }, [])
    return (
        <>
            <Box sx={{ display: "flex",  flexDirection : "column",justifyContent: "space-evenly", alignItems: "center", width: { xs: "100%", md: "75%" }  , overflowY : "scroll"}}>
               
                <Container>
                <Grid container spacing={2} sx={{ mt: 5 }}>
                    <Grid item xs={12} md={6} sx={{ marginLeft: "auto" }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <TextField fullWidth label="Search Trainee"  value={SearchQuery} onChange={handleSearch}/>
                            {/* <Button variant="contained" color="error">
                                    Search
                                </Button> */}
                        </Box>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ mt: 3  , borderRadius : '30px'}} >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                <TableCell>Roll No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Fees Date</TableCell>
                                <TableCell>Fees Payment</TableCell>
                                
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Trainees.map((trainee, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                                        "&:hover": { bgcolor: "#f0f0f0" },
                                    }}
                                >
                                    <TableCell>{trainee.rollNumber}</TableCell>
                                    <TableCell>{trainee.name}</TableCell>
                                    <TableCell>{getDay(trainee.joinDate)}</TableCell>
                                    
                                    <Button variant='contained' 
                                                        color={checkDate(trainee.joinDate) ?'error' : "primary"}  
                                                        sx={{borderRadius:"100px"  , margin: "10px"}} 
                                                        
                                                          onClick={()=>PayFees(trainee._id)}
                                                        >Pay fees</Button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            </Box>
           
        </>

    )
}

export default FeeStatus
