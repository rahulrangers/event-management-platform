import { Link } from 'react-router-dom';
import image from "../assets/loginbg.jpg"

const NotFound = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/eventdashboard" style={{ fontSize: '1.2rem', color: 'white', textDecoration: 'none' }}>
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
