import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const ForgotPasswordPage = () => {
  const handleRequestReset = () => {
    // Logika untuk mengirim permintaan reset password
  };

  return (
    <Box width="md" mx="auto" mt={'36'} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4}>
        Forgot your password?
      </Text>
      <Text color={useColorModeValue('gray.800', 'gray.400')} mb={4}>
        You'll get an email with a reset link
      </Text>
      <FormControl id="email" mb={4}>
        <Input
          placeholder="your-email@example.com"
          _placeholder={{ color: 'gray.500' }}
          type="email"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        onClick={handleRequestReset}
        width="full"
        size="lg"
      >
        Request Reset
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
