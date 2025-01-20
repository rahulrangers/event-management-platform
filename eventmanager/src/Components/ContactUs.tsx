import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactUs: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', py: 5, px: 2, backgroundColor: '#f8f9fa' }}>
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#3f51b5' }}
      >
        Contact Us
      </Typography>
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ mb: 4, color: '#555' }}
      >
        We'd love to hear from you! Reach out to us via the details below.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffffff' }}>
            <PhoneIcon sx={{ color: '#3f51b5', fontSize: 40, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Call Us
            </Typography>
            <Typography variant="body1">+1 (123) 456-7890</Typography>
            <Typography variant="body1">+1 (987) 654-3210</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffffff' }}>
            <EmailIcon sx={{ color: '#3f51b5', fontSize: 40, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Email Us
            </Typography>
            <Typography variant="body1">support@eventhub.com</Typography>
            <Typography variant="body1">contact@eventhub.com</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffffff' }}>
            <LocationOnIcon sx={{ color: '#3f51b5', fontSize: 40, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Visit Us
            </Typography>
            <Typography variant="body1">123 Event Street</Typography>
            <Typography variant="body1">New York, NY, USA</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
