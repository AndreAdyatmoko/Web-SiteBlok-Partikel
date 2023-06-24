import { Box, Heading, Text, Image } from '@chakra-ui/react';
import Logo from '../../assets/Logo.jpg';

const AboutUs = () => {
  return (
    <Box textAlign="center" bg="#E0DCE3" p={8} borderRadius="lg" height={"100vh"}>
      <Heading as="h2" size="xl" mb={4} color="blue.600" fontFamily="sans-serif" mt={50}>
        About Us
      </Heading>
      <Image src={Logo} alt="Logo" maxW="300px" mx="auto" mb={6} borderRadius="full" boxShadow="lg" />
      <Text fontSize="lg" color="gray.600" fontFamily="serif">
        Partikle is a platform created with the purpose of fostering creativity, innovation, and personal development.
        We believe that everyone has unique talents and ideas that deserve to be expressed and shared with the world.
        Our platform provides a space for individuals to explore their passions, learn new skills, and collaborate with like-minded individuals.
        Whether you're an artist, writer, musician, or entrepreneur, Partikle is here to support you on your journey of self-expression and growth.
      </Text>
    </Box>
  );
};

export default AboutUs;
