import React, { useEffect, useState } from 'react';
import { Avatar, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ username: '', avatar: '' });
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
        console.log(res);

        const { username, avatar } = res.data; // Mengambil username dan URL avatar dari API

        setUserData({ username, avatar });
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

  const avatarStyle = {
    cursor: 'pointer',
    filter: isHovered ? 'brightness(85%)' : 'brightness(100%)',
    transition: 'filter 0.3s',
  };

  return (
    <Box mr={5}>
      <Avatar
        size="md"
        name={userData.username}
        src={userData.avatar}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={avatarStyle}
      />
    </Box>
  );
};

export default Profile;
