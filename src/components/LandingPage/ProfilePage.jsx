import React, { useEffect, useState } from 'react';
import { Box, Flex, Avatar, Text, Button, Heading, Grid, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/auth', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);

        const { username: fetchedUsername, avatar: fetchedAvatar } = res.data; // Mengambil username dan URL avatar dari API

        setUsername(fetchedUsername);
        setAvatarUrl(fetchedAvatar);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = () => {
    // Handle profile update here
  };

  const handleResetPassword = () => {
    // Handle reset password here
    navigate("/changepassword");
  };

  const handleAvatarUpload = (event) => {
    // Handle avatar upload here
    const file = event.target.files[0];
    // ... tambahkan logika untuk mengunggah file avatar ke server atau penyimpanan yang Anda gunakan
  };

  return (
    <Box p={4} mt={20}>
      <Flex align="center" mb={4}>
        <Avatar size="xl" name={user?.name} src={avatarUrl} />
        <Text ml={4} fontSize="2xl" fontWeight="bold">
          {username}
        </Text>
      </Flex>

      <Box mt={4}>
        <Text fontSize="lg">Avatar Upload</Text>
        <Flex mt={2}>
          <Input type="file" onChange={handleAvatarUpload} />
          <Button ml={2} colorScheme="teal" size="sm">
            Upload
          </Button>
        </Flex>
        <Text fontSize="sm" mt={2} color="gray.500">
          Upload a new avatar image.
        </Text>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
        <Box bg="white" boxShadow="md" p={4} borderRadius="md">
          <Button
            colorScheme="teal"
            size="md"
            width="100%"
            onClick={() => navigate("/profileupdate")}
          >
            Edit Profile
          </Button>
        </Box>

        <Box bg="white" boxShadow="md" p={4} borderRadius="md">
          <Button colorScheme="teal" size="md" width="100%">
            My Article
          </Button>
        </Box>

        <Box bg="white" boxShadow="md" p={4} borderRadius="md">
          <Button colorScheme="teal" size="md" width="100%">
            Favorite Article
          </Button>
        </Box>

        <Box bg="white" boxShadow="md" p={4} borderRadius="md">
          <Button
            colorScheme="teal"
            size="md"
            width="100%"
            onClick={handleResetPassword}
          >
            Change Password
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProfilePage;