import React from 'react';
import { Box, Container, Grid, Link } from '@mui/material';

const Usertypes = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        
        <Grid container alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={8} md={4} sx={{ mx: 'auto' }}>
            <Link href="/SignUp/RegisterGym" underline="none">
              <Box
                component="img"
                src="https://dummyimage.com/270x450/f70d0d/f7f4f4&text=+GYM+"
                alt="GYM"
                sx={{ borderRadius: 3, width: '100%', maxWidth: 270, height: 'auto' }}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={8} md={4} sx={{ mx: 'auto' }}>
            <Link href="/SignUp/SelectGym" underline="none">
              <Box
                component="img"
                src="https://dummyimage.com/270x450/f2d0d/00200&text=+INDIVIDUAL+"
                alt="INDIVIDUAL"
                sx={{ borderRadius: 3, width: '100%', maxWidth: 270, height: 'auto' }}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Usertypes;
