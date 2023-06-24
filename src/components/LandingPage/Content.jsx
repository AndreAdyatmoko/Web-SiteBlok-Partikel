import React from 'react';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Carousel from './Carousel';

const Content = () => {
  return (
    <Box padding={"100px 0 50px"} bg={useColorModeValue("#E0DCE3")}>
      <Box textAlign="center" my={8}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justifyContent={"space-around"} alignItems={"center"}>
          <Box maxW="32rem" flex="1" ml={10} width={{ base: '100%', md: '60%' }}>
            <Heading mb={10} lineHeight="shorter" textAlign="left">
              Welcome to Particle <br />Where Inspiration <br /> Passionately meets productivity!
            </Heading>
            <Text fontSize="xl" textAlign="left" >
              Explore our collection of insightful articles and practical tips to fuel your creativity and boost your efficiency. Whether you're a writer, designer, or entrepreneur, Particle is here to empower you on your journey to success
            </Text>
          </Box>
          
          <Box width={{ base: '100%', md: '40%' }}
            
          
          >
            <Carousel />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Content;
