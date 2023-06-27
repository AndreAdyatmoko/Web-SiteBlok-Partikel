import React  from 'react';
import { Box, Flex, Text, Button, Heading } from '@chakra-ui/react';

import axios from 'axios';

const VerificationPage = () => {
  const token = async () => {
    const url = window.location.href.split("/");
    const getToken = url[url.length - 1];
    console.log(getToken);

    try {
        const data = await axios.patch(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
            {},
            {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            }
        );
        console.log(data);
        alert("Your account has been verified");
        window.location.href = "/";
    } catch (error) {
        console.log(error.response.data);
    }
};

  return (
    <Box mt="150px" p={4}>
      <Flex align="center" mb={4}>
        <Heading size="md" fontWeight="bold">
          Verification Page
        </Heading>
      </Flex>

      <Text mb={4}>Click the button below to verify your account:</Text>

      <Button colorScheme="teal" size="md" onClick={() => token()}>
        Verify Account
      </Button>
    </Box>
  );
};

export default VerificationPage;
