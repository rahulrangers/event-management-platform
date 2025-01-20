import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { usercontext } from '../context/Usercontext';
import image from '../assets/loginbg.jpg';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { userinfo } = useContext(usercontext);

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    category: '',
    location: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 

  const categories = [
    'Music',
    'Conference',
    'Workshop',
    'Seminar',
    'Meetup',
    'Festival',
    'Sports',
    'Charity',
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please upload an image for the event.');
      return;
    }

    setLoading(true);  

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const imageResponse = await fetch(`${BASE_URL}/api/events/imageurl`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error('Failed to upload image');
      }
      const imageResult = await imageResponse.json();

      const response = await fetch(`${BASE_URL}/api/events/addevent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...eventData,
          imageUrl: imageResult.imageUrl,
          createdBy: userinfo!.name,
        }),
      });

      if (response.ok) {
        setLoading(false); 
        alert('Event created successfully!');
        setEventData({
          name: '',
          description: '',
          date: '',
          category: '',
          location: '',
        });
        setImageFile(null);
      } else {
        setLoading(false); 
        alert('Error creating event. Please try again.');
      }
    } catch (error) {
      setLoading(false); 
      console.error('Error:', error);
      alert('There was an error submitting the event.');
    } finally {
      setLoading(false); 
    }
  };

  if (!userinfo || userinfo.role !== 'admin') {
    navigate('/notfound');
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
              Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Event Name"
                    name="name"
                    value={eventData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Event Date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={eventData.category}
                      onChange={handleChange}
                    >
                      {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Event Location"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                  </Button>
                  {imageFile && (
                    <Typography variant="body2" color="textSecondary">
                      {imageFile.name}
                    </Typography>
                  )}
                </Grid>
                {loading && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      Uploading... Please wait.
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}  
                  >
                    Create Event
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateEvent;
