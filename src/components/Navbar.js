import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Logo from '../assets/images/RedGym_Logo.png';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <Stack
      direction="row"
      justifyContent="end"
      sx={{
        gap: { sm: '122px', xs: '40px' },
        mt: { sm: '32px', xs: '20px' },
        justifyContent: 'start',
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          style={{ width: '70px', height: '70px', margin: '10px 20px -20px 20px' }}
          alt="Logo"
        />
      </Link>

      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            borderBottom: activeLink === '/' ? '3px solid #FF2625' : 'none',
          }}
          onClick={() => handleLinkClick('/')}
        >
          <HomeRoundedIcon fontSize="large" />
        </Link>

        <Typography variant='a'
         
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            cursor:   "pointer"
          }}
          onClick={() => {
            window.scrollTo({top:1800 , left: 100 , behavior : 'smooth'})
            handleLinkClick('/')
        }}
        >
          <FitnessCenterRoundedIcon fontSize="large" />
        </Typography>

        <Link
          to="/Calculators"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            borderBottom: activeLink === '/Calculators' ? '3px solid #FF2625' : 'none',
          }}
          onClick={() => handleLinkClick('/Calculators')}
        >
        <CalculateRoundedIcon fontSize="large" />
        </Link>
        <Link
          to="/Sign-in"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            borderBottom: activeLink === '/Sign-in' ? '3px solid #FF2625' : 'none',
          }}
          onClick={() => handleLinkClick('/Sign-in')}
        >
        <AccountCircleTwoToneIcon fontSize="large" />
        </Link>
        
      </Stack>
    </Stack>
  );
};

export default Navbar;
