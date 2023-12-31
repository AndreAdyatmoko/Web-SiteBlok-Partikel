import React, { useState } from 'react';
import { Box, Flex, Spacer, Button, Link, Input, InputGroup, InputLeftElement, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { FaVirus } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import ModalSignIn from './ModalSignIn';
import ModalWrite from './ModalWrite';
import ModalSignUp from './ModalSignUp';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../Redux/Reducer/AuthReducer';

const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Ketika User Log in >> Set True dan User Log out >> Set False Notioan
  const isLogin = localStorage.getItem('token');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (isLogin) {
      navigate('/writeblog'); // Nagivasi ke halaman write blog
    } else {
      setIsWriteModalOpen(true); // Buka modal Write
    }
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsWriteModalOpen(false);
  };
  
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate('/');
    // Add additional logic for clearing any user data or state
  };

  return (
    <Box>
      <Box
        bg={useColorModeValue("#C0DBE3")}
        width="100%"
        height={20}
        position="fixed"
        borderBottom="2px solid black"
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center">
          <Link onClick={() => navigate("/")}>
            <Flex ml={10}>
              <FaVirus size={19} color="black" />
              <Box fontWeight="bold" fontSize={24}>
                Read <br /> Particle
              </Box>
            </Flex>
          </Link>

          <InputGroup
            width={{ base: "70%", md: "70%" }}
            maxWidth={{ base: "400px", md: "500px" }}
            justifyContent="center"
            ml={30}
            position="relative"
          >
            <InputLeftElement pointerEvents="none" children={<BsSearch color="grey" size={13} />} />
            <Input htmlSize={20} borderRadius={12} height={10} borderColor="black" placeholder="Search Here" paddingLeft={8} _hover={{}} />
          </InputGroup>

          <Spacer />

          <Link onClick={() => navigate("/aboutus")}  ml={{ base: 0, md: 2 }} display={{ base: "none", md: "inline-block" }}>
            About Us
          </Link>

          <Link  onClick={() => navigate("/populerarticles")} href="#" px={22} display={{ base: "none", md: "inline-block" }}>
            Populer Articles
          </Link>

          <Link href="#" display={{ base: "none", md: "inline-block" }} onClick={handleWriteClick}>
            {isLogin ? "Write Blog"/*POSISI User sudah Sign In */ : "Write"}
          </Link>

          {isLogin ? (
            <Flex>
              <Button
                mt={1}
                ml={6}
                mr={6}
                borderRadius={15}
                color="white"
                bg="black"
                padding={3}
                _hover={{ bg: "black" }}
                _active={{ bg: "#93D9EA" }}
                onClick={() => handleLogout()}
              >
                Log Out
              </Button>
                <Profile />
            </Flex>
          ) : (
            <Flex>
              <Link href="/signtest" px={22} mt={2} display={{ base: "none", md: "inline-block" }}>
                Sign In
              </Link>
              <Button
                ml={6}
                mr={10}
                borderRadius={15}
                color="white"
                bg="black"
                padding={5}
                _hover={{ bg: "black" }}
                _active={{ bg: "#93D9EA" }}
                onClick={handleSignupClick}
              >
                Get Started
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>

      {/* Sign In Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalSignIn isOpen={isOpen} onClose={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Write Modal */}
      <Modal isOpen={isWriteModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You need to sign in to write a blog post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalWrite isOpen={isWriteModalOpen} onClose={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={isSignupModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isSignupModalOpen && (
              <ModalSignUp isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
