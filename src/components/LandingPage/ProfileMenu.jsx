import React from 'react';
import { Box, Flex, Avatar, Text, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileUpdate = () => {
    // Handle profile update here
  };

  return (
    <Box p={4} mt={20}>
      <Flex align="center" mb={4}>
        <Avatar size="xl" name={user?.name} src={user?.profilePicture} />
        <Text ml={4} fontSize="2xl" fontWeight="bold">
          {user?.name}
        </Text>
      </Flex>

      <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={4} >
        <Heading size="md" mb={2}>
          Profile
        </Heading>

        <Button
          colorScheme="teal"
          width="20%"
          size="md"
          onClick={() => navigate("/profileupdate")}
        >
          Edit Profile
        </Button>
      </Box>

      <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={4}>
        <Button colorScheme="teal" size="md" width="20%">
          My Article
        </Button>
      </Box>

      <Box bg="white" boxShadow="md" p={4} borderRadius="md">
        <Button colorScheme="teal" size="md" width="20%">
          Favorite Article
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
