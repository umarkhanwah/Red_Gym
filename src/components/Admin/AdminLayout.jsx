import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import Logo from "../../assets/images/RedGym_Logo.png";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTrainee from "./AddTrainee";
import FeeStatus from "./FeeStatus";



const AdminLayout = () => {
  const [Content, setContent] = useState('Dashboard')
  const navigate = useNavigate();

  const activeBG = (item)=>{
    return item === Content ? "#FF2625" : "#fff"
  }
  const activeText = (item)=>{
    return item !== Content ? "#444" : "#fff"
  }

  return (
    <Box sx={{ display: "flex", height: "100vh"  }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "0", md: "25%" , lg:"25%" },
          bgcolor: "#f7f7f7",
          display: { xs: "none", md: "block" },
          padding: 2,
          // borderRight: "1px solid #ccc",
        }}
      >
        <img
          src={Logo}
          alt="..."
          onClick={() => navigate("/")}
          style={{ width: "100%", cursor: "pointer" }}
        />
        <List>
          {["Dashboard", "Add Trainee", "Fee Status"].map((item, index) => (
            <ListItem
              key={index}
              button
              
              
              sx={{
                bgcolor: activeBG(item),
                color: activeText(item),
                marginY: 1,
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": { bgcolor: "#FF2625", color: "#fff" },
              }}
              onClick={()=>{setContent(item)}}
            >
              
              <ListItemText primary={item}  />
            </ListItem>
          ))}
        </List>


        <Button variant="filled" color="error" onClick={()=>{
          localStorage.removeItem('authToken');
          alert('Logged Out Succesful');
          navigate('/signin')
          }}>Logout</Button>
      </Box>
                                
        {/* Main Content */}
          {Content==="Dashboard" && 
             <Dashboard />
          }
          {Content==="Add Trainee" && 
             <AddTrainee />
          }
          {Content==="Fee Status" && 
             <FeeStatus />
          }
      
    </Box>
  );
};

export default AdminLayout;
