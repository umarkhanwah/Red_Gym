import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../../assets/images/RedGym_Logo.png";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTrainee from "./AddTrainee";
import FeeStatus from "./FeeStatus";
import TraineeDetailPage from "./TraineeDetails";
import { LogoutRounded } from "@mui/icons-material";

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);
  const [trainee, setTrainee] = useState({});
  const [content, setContent] = useState("Dashboard");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const activeBG = (item) => {
    return item === content ? "#FF2625" : "#fff";
  };
  const activeText = (item) => {
    return item !== content ? "#444" : "#fff";
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Hamburger Icon for Mobile */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
        }}
      >
        <IconButton color="inherit" sx={{bgcolor:"white" , boxShadow : "0 0 3px 0 grey"}}  onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar for Desktop */}
      <Box
        sx={{
          width: { xs: "0", md: "25%", lg: "25%" },
          bgcolor: "#f7f7f7",
          display: { xs: "none", md: "block" },
          padding: 2,
        }}
      >
        <img
          src={Logo}
          alt="..."
          onClick={() => navigate("/")}
          style={{ width: "100%", cursor: "pointer" }}
        />
        <List>
          {["Dashboard", "All Trainees", "Fee Status"].map((item, index) => (
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
              onClick={() => {
                setContent(item);
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            localStorage.removeItem("authToken");
            alert("Logged Out Successfully");
            navigate("/signin");
          }}
          
        >
          <LogoutRounded /> Logout
        </Button>
      </Box>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{ zIndex: 1400 }}
      >
        <Box
          sx={{
            width: 250,
            padding: 2,
            bgcolor: "#f7f7f7",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Red Gym</Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {["Dashboard", "All Trainees", "Fee Status"].map((item, index) => (
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
                onClick={() => {
                  setContent(item);
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  alert("Logged Out Successfully");
                  navigate("/signin");
                }}
                
              >
                <LogoutRounded /> Logout
              </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", md: "75%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="error" size={100} />
        </Box>
      ) : (
        <>
          {content === "Dashboard" && <Dashboard setLoading={setLoading} />}
          {content === "All Trainees" && (
            <AddTrainee
              setTrainee={setTrainee}
              setContent={setContent}
              setLoading={setLoading}
            />
          )}
          {content === "Fee Status" && <FeeStatus setLoading={setLoading} />}
          {content === "TraineeDetails" && (
            <TraineeDetailPage
              trainee={trainee}
              setLoading={setLoading}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default AdminLayout;
