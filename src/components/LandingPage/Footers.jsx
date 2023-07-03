import { Box, Flex, Link, Icon, Heading } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box mt={30} bg="#E0DCE3" py={4}>
      <Flex direction="column" alignItems="center">
        <Heading as="h2" size="md" mb={2}>
          Follow Us
        </Heading>
        <Flex justify="center">
          <Link href="https://github.com/AndreAdyatmoko" isExternal mx={2}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
          <Link href="https://www.linkedin.com/in/andre-adyatmoko-69a856177/" isExternal mx={2}>
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
          <Link href="https://www.instagram.com/andreadyatmoko/" isExternal mx={2}>
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
        </Flex>
      </Flex>
      <Box textAlign="center" mt={2} fontSize="sm" color="gray.500">
        by Andre Adyatmoko
      </Box>
    </Box>
  );
};

export default Footer;
