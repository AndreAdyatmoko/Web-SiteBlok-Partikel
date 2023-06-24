import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

const NewArtikel = ({ title, text, image }) => {
  return (
    <Box
      height="6xl"
      position="relative"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${image})`}
    >
      <Container size="lg" height="600px" position="relative">
        <Box
          spacing={6}
          w="full"
          maxW="lg"
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
        >
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            {title}
          </Heading>
          <Text fontSize={{ base: 'sm', lg: 'md' }} color="gray.500">
            {text}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default NewArtikel;
