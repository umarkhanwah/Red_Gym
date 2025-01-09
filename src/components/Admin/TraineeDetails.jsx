import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  
  Divider,
  CardActionArea,
} from "@mui/material";
import axios from "axios";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const TraineeDetailPage = ({  trainee}) => {
  const [traineeDetails, setTraineeDetails] = useState(trainee);
  const [bodyMeasurements, setBodyMeasurements] = useState([]);
  const [newMeasurement, setNewMeasurement] = useState({
    chest: "",
    back: "",
    shoulder: "",
    weight: "",
    foreArm: "",
    arm: "",
    leg: "",
  });

  // Fetch trainee details
  // const fetchTraineeDetails = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/admin/trainee/${trainee._id}`);
  //     setTraineeDetails(response.data);
  //   } catch (error) {
  //     console.error("Error fetching trainee details:", error);
  //   }
  // };

  const fetchBodyMeasurements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/body-measurements/${trainee._id}`
      );
      setBodyMeasurements(response.data);
    } catch (error) {
      console.error("Error fetching body measurements:", error);
    }
  };
  useEffect(() => {

    // fetchTraineeDetails();
    fetchBodyMeasurements();
  }, [trainee]);
  
  
  const handleDelete = async(M_id)=>{
    
    await axios.get(`http://localhost:4000/admin/delete-measurement/${M_id}`)
    .then(
      (res)=>
        alert(res.data.message))
      .catch( 
        (error)=>
          console.log(error.response.data.message))
    fetchBodyMeasurements();
        
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/admin/body-measurements/${trainee._id}`,
        {
          ...newMeasurement,
          date: new Date(),
        }
      );
      setBodyMeasurements([response.data, ...bodyMeasurements]); // Add the new record to the top
      setNewMeasurement({ chest: "", back: "", shoulder: "", weight: ""  , leg : "" , arm : "" , foreArm : ""}); // Reset form
    } catch (error) {
      console.error("Error adding new measurement:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Left Half: Trainee Details */}
      <Grid item xs={12} md={6} overflow='hidden' >
        <Card sx={{maxHeight:"200px" , overflow:"scroll" , margin:"10px"  }} elevation={3} >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Trainee Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {traineeDetails.name || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {traineeDetails.phone || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Roll Number:</strong> {traineeDetails.rollNumber || "N/A"}
            </Typography>
          </CardContent>
        </Card>
         {/* Measurement Form */}
        <Card sx={{ overflow:"scroll" , margin:"10px" }} elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Update Body Measurements
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Chest"
                    fullWidth
                    value={newMeasurement.chest}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, chest: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Arm"
                    fullWidth
                    value={newMeasurement.arm}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, arm: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Back"
                    fullWidth
                    value={newMeasurement.back}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, back: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Shoulder"
                    fullWidth
                    value={newMeasurement.shoulder}
                    onChange={(e) =>
                      setNewMeasurement({
                        ...newMeasurement,
                        shoulder: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Fore Arm"
                    fullWidth
                    value={newMeasurement.foreArm}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, foreArm: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Leg"
                    fullWidth
                    value={newMeasurement.leg}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, leg: e.target.value })
                    }
                  />
                </Grid>
               
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Weight"
                    fullWidth
                    value={newMeasurement.weight}
                    onChange={(e) =>
                      setNewMeasurement({ ...newMeasurement, weight: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} >
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    fullWidth
                  >
                    Add Measurement
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Half: Body Measurements */}
      <Grid item xs={12} md={6} >
            <Card sx={{maxHeight:"100vh", overflow:"scroll"}} elevation={3}>
              <CardContent>
                  {bodyMeasurements.length == 0 ? <Typography variant="h5" color='error' textAlign='center'> No Measurements Yet 🥲</Typography> :
                   <>
                    <Typography variant="h5" gutterBottom>
                      Body Measurements
                    </Typography>
                    <List>
                      {bodyMeasurements.map((measurement, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Chest</Typography>
                                    <Typography variant="h6">{measurement.chest} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Back</Typography>
                                    <Typography variant="h6">{measurement.back} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Shoulder</Typography>
                                    <Typography variant="h6">{measurement.shoulder} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Weight</Typography>
                                    <Typography variant="h6">{measurement.weight} kg</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Arm</Typography>
                                    <Typography variant="h6">{measurement.arm} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Fore Arm</Typography>
                                    <Typography variant="h6">{measurement.foreArm} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1">Leg</Typography>
                                    <Typography variant="h6">{measurement.leg} inch</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={6} sm={3} >
                              
                              <Button variant="outlined" color="error" onClick={()=>handleDelete(measurement._id)} sx={{height:"100%" , width: "100%"}}>
                                    <DeleteOutlineOutlined />

                              </Button>
                              
                                {/* <Card  sx={{ height: "100%" , margin: "0"}}>

                                  <CardActionArea sx={{ height: "100%" , display: "flex" , alignItems : "center"}}>
                                      <DeleteOutlineOutlined />
                                  </CardActionArea>
                                </Card> */}
                                  {/* <CardContent>
                                    <Typography variant="subtitle1">Leg</Typography>
                                    <Typography variant="h6">{measurement.leg} inch</Typography>
                                  </CardContent> */}
                                
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Typography variant="body2" color="textSecondary">
                              Date: {new Date(measurement.date).toLocaleDateString()}
                            </Typography>
                          </ListItem>
                          {index < bodyMeasurements.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                   </>
                  }
                  
              </CardContent>
            </Card>
      </Grid>

    
      {/* <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Body Measurements
            </Typography>
            <List>
              {bodyMeasurements.map((measurement, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      secondary={`Date: ${new Date(
                        measurement.date
                      ).toLocaleDateString()}`}
                      primary={`Chest: ${measurement.chest}, Back: ${measurement.back}, Shoulder: ${measurement.shoulder}, Weight: ${measurement.weight}`}
                    />
                  </ListItem>
                  {index < bodyMeasurements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid> */}

     
      <Grid item xs={12}>
      
      </Grid>
    </Grid>
  );
};

export default TraineeDetailPage;
