import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalSignUp from './ModalSignUp';
import { useNavigate } from 'react-router-dom';


const ModalWrite = ({ isOpen, onClose }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const onForgot = () => {
    onClose(); // Tutup modal sebelum pindah halaman
    navigate('/forgotpassword'); // Pindah ke halaman /forgotpassword
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You need to sign in to write a blog post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email or Username or Phone</FormLabel>
              <Input type="email" placeholder="Enter your email or username or phone" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    variant="ghost"
                    onClick={handleTogglePassword}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Link color="green" onClick={onForgot}>
              Forgot password?
            </Link>
          </ModalFooter>
          <ModalFooter>
            <span>No account? </span>
            <Link color="green" onClick={handleSignUpClick}>
              Create one
            </Link>
          </ModalFooter>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Sign In
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Sign Up */}
      {showSignUpModal && (
        <ModalSignUp isOpen={showSignUpModal} onClose={handleCloseSignUpModal} />
      )}
    </>
  );
};

export default ModalWrite;
