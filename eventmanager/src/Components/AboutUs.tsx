import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          About Us
        </Typography>
        <Typography
          variant="h6"
          component="p"
          textAlign="center"
          color="textSecondary"
          mb={6}
        >
          We are a passionate team dedicated to making your events unforgettable. With
          a focus on creativity, organization, and excellence, we bring your ideas to
          life.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                py: 4,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <EventIcon fontSize="large" />
              </Avatar>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Our Mission
                </Typography>
                <Typography color="textSecondary">
                  To provide exceptional event management services that inspire and
                  create lasting memories for all.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                py: 4,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 56,
                  height: 56,
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <StarIcon fontSize="large" />
              </Avatar>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Our Vision
                </Typography>
                <Typography color="textSecondary">
                  To be the leading event management company known for
                  innovation, quality, and reliability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                py: 4,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'error.main',
                  width: 56,
                  height: 56,
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <PeopleIcon fontSize="large" />
              </Avatar>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Meet Our Team
                </Typography>
                <Typography color="textSecondary">
                  A group of dedicated professionals who work tirelessly to turn
                  your event dreams into reality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={8} textAlign="center">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="textSecondary"
            mb={4}
          >
            Our team ensures that every detail is taken care of, allowing you to
            focus on enjoying your event. From small gatherings to grand
            celebrations, we handle it all with excellence and care.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
