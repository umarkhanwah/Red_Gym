import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const AddTrainee = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const [Error, setError] = useState({
        status: "",
        message: ""
    });
    const [Trainees, setTrainees] = useState([]);
    const [SearchQuery, setSearchQuery] = useState(""); // State for search query
    const [FilteredTrainees, setFilteredTrainees] = useState([]); // State for filtered trainees

    const fetchTrainees = () => {
        if (!authToken) {
            return navigate('/signin');
        }

        axios.get('http://localhost:4000/admin/fetchTrainees', { headers: { 'authToken': authToken } })
            .then((res) => {
                setTrainees(res.data.trainees);
                setFilteredTrainees(res.data.trainees); // Initialize filtered trainees
                console.log(res.data);
            })
            .catch((e) => console.log(e.response));
    };

    const handleSubmit = (e) => {
        const { rollNumber, name, joinDate } = e.target;

        axios.post('http://localhost:4000/admin/AddTrainee', {
            rollNumber: rollNumber.value,
            name: name.value,
            joinDate: joinDate.value
        }, { headers: { 'authToken': authToken } })
            .then((res) => {
                setError({ message: res.data.message, status: "success" });
                console.log(res);
                e.target.reset();
                fetchTrainees(); // Refresh trainees after adding
            }).catch((e) => {
                setError({ message: e.response.data.message, status: "error" });
                console.log(e.response);
            });

        e.preventDefault();
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setFilteredTrainees(Trainees); // Reset to full list when query is empty
        } else {
            const filtered = Trainees.filter(trainee =>
                trainee.name.toLowerCase().includes(query) || 
                trainee.rollNumber.toString().includes(query) || 
                (trainee.phone && trainee.phone.includes(query))
            );
            setFilteredTrainees(filtered);
        }
    };

    useEffect(() => {
        fetchTrainees();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", width: { xs: "100%", md: "75%" }, overflowY: "scroll" }}>
                <Container
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        textAlign: 'center',
                        p: 2,
                        marginTop: "20px",
                        width: "400px"
                    }}
                >
                    <Typography variant="h4" color="error" fontWeight="bold">Add Trainee</Typography>
                    <Box sx={{ textAlign: 'start' }}>
                        <TextField
                            label="Roll No."
                            name='rollNumber'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Trainee Name"
                            type="text"
                            variant="outlined"
                            name='name'
                            fullWidth
                            margin="normal"
                        />
                        <Typography marginTop={2}>Joining Date</Typography>
                        <TextField
                            label=""
                            type="date"
                            variant="standard"
                            name='joinDate'
                            fullWidth
                        />
                    </Box>

                    {Error.message ? <Alert severity={Error.status} style={{ marginTop: "10px" }}>{Error.message}</Alert> : ''}

                    <Button variant="contained" type='submit' sx={{ marginLeft: "auto", marginTop: 2 }} color="error">
                        Add Trainee
                    </Button>
                </Container>
                <Container>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid item xs={12} md={6} sx={{ marginLeft: "auto" }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <TextField
                                    fullWidth
                                    label="Search Trainee"
                                    value={SearchQuery}
                                    onChange={handleSearch}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                    <TableCell>Roll No.</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Trainer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {FilteredTrainees.map((trainee, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                                            "&:hover": { bgcolor: "#f0f0f0" },
                                        }}
                                    >
                                        <TableCell>{trainee.rollNumber}</TableCell>
                                        <TableCell>{trainee.name}</TableCell>
                                        <TableCell>{trainee.phone}</TableCell>
                                        <TableCell>{trainee.gym?.trainerName || "N/A"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    );
};

export default AddTrainee;
