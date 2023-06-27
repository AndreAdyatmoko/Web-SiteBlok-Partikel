import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ username: '', imgProfile: '' });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/auth',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { username, imgProfile } = res.data;

        setUserData({ username, imgProfile });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleClick = () => {
    navigate('/profilpage');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imgStyle = {
    cursor: 'pointer',
    filter: isHovered ? 'brightness(85%)' : 'brightness(100%)',
    transition: 'filter 0.3s',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '50%',
  };

  return (
    <Box mr={5}>
      <img
        src={`https://minpro-blog.purwadhikabootcamp.com/${userData.imgProfile}`}
        alt={userData.username}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={imgStyle}
      />
    </Box>
  );
};

export default Profile;
