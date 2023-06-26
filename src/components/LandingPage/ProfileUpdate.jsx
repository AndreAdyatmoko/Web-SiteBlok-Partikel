import React, { useEffect, useState } from 'react';
import { Box, Flex, Avatar, Text, Button, Heading, Grid, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

        const { username: fetchedUsername, email: fetchedEmail, phone: fetchedPhone } = res.data; // Mengambil data pengguna dari API

        setUsername(fetchedUsername);
        setEmail(fetchedEmail);
        setPhone(fetchedPhone);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleEmailUpdate = () => {
    // Handle email update here
    navigate("/changeemail");
  };

  const handlePhoneUpdate = () => {
    // Handle phone number update here
    navigate("/changephonenumber");
  };

  const handleUsernameUpdate = () => {
    // Handle username update here
    navigate("/changeusername");
  };

  const handleBackToHome = () => {
    // Handle navigation back to home
    navigate("/");
  };

  return (
    <Box p={4} mt={20}>
      <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            User Name
          </Text>
          <Button colorScheme="teal" size="sm" onClick={handleUsernameUpdate}>
            Change
          </Button>
        </Flex>
        <Text fontSize="md">{username}</Text>
      </Box>

      <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            Email
          </Text>
          <Button colorScheme="teal" size="sm" onClick={handleEmailUpdate}>
            Change
          </Button>
        </Flex>
        <Text fontSize="md">
          {email.replace(/.(?=.*@)/g, '*')}
        </Text>
      </Box>

      <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            Phone Number
          </Text>
          <Button colorScheme="teal" size="sm" onClick={handlePhoneUpdate}>
            Change
          </Button>
        </Flex>
        <Text fontSize="md">
          {phone.replace(/\d(?=\d{4})/g, '*')}
        </Text>
      </Box>

      <Flex justify="center">
        <Button
          colorScheme="teal"
          size="md"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
