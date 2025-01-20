import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usercontext } from '../context/Usercontext';
import Loading from './Loading';

const Navbar = () => {
  const navigate = useNavigate();
  const { userinfo, loading,setUserinfo } = useContext(usercontext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if(loading) {
    return <Loading />
  }
  return (
    <div>
      <nav className="bg-blue-600 shadow-md p-4 shadow-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
              <Link to="/eventdashboard">Eventure</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/eventdashboard" className="text-white hover:text-blue-200">Events Dashboard</Link>
            <Link to="/aboutus" className="text-white hover:text-blue-200">About Us</Link>
            {userinfo && userinfo.role == 'admin' &&
            <Link to="/addevent" className="text-white hover:text-blue-200">Create Event</Link>
          }
            <Link to="/contactus" className="text-white hover:text-blue-200">Contact Us</Link>
            {!userinfo ?
              <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
              : <button className="text-white hover:text-blue-200" onClick={() => {
                setUserinfo(null);
                localStorage.removeItem('token');
                navigate('/login');
              }}>Logout</button>}
          </div>
          <button
            className="md:hidden  hover:text-blue-300 text-[20px] hover:rounded-lg p-2 text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden rounded-lg shadow-sm shadow-blue-100 bg-blue-500 p-4`}>
          <Link to="/eventdashboard" className="block text-white py-2 hover:text-blue-200">Events Dashboard</Link>
          <Link to="/aboutus" className="block text-white hover:text-blue-200   py-2">About Us</Link>
          {userinfo && userinfo.role == 'admin' &&
            <Link to="/addevent" className="block text-white py-2 hover:text-blue-200 ">Create Event</Link>
          }
          <Link to="/contactus" className="block text-white py-2 hover:text-blue-200 ">Contact Us</Link>
            {!userinfo ?
              <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
              : <button className="text-white hover:text-blue-200" onClick={() => {
                setUserinfo(null);
                localStorage.removeItem('token');
                navigate('/login');
            }}>Logout</button>}
         
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
