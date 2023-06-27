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
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[\W]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const ModalSignUp = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (values) => {
    try {
      const res = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/', {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phoneNumber,
        FE_URL: 'http://localhost:3000',
      });

      if (res.status === 200) {
        console.log(res.data); // Tanggapan dari server
        toast({
          title: 'Check your Email for Verification',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      } else {
        // Tanggapan tidak sesuai yang diharapkan
        toast({
          title: 'Registration failed',
          description: 'Unable to register. Please try again later.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);

      // Tanggapan kesalahan dari server
      if (error.response && error.response.data && error.response.data) {
        const errorMessage = error.response.data;
        toast({
          title: 'Registration failed',
          description: errorMessage,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Registration failed',
          description: 'Unable to register. Please try again later.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              phoneNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            <Form>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Field type="text" name="username" placeholder="Enter your username" as={Input} />
                <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Field type="email" name="email" placeholder="Enter your email" as={Input} />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    as={Input}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      onClick={handleTogglePassword}
                    />
                  </InputRightElement>
                </InputGroup>
                <div style={{ color: 'red' }}>
                  <ErrorMessage name="password">
                    {(msg) => {
                      switch (msg) {
                        case 'Password must be at least 6 characters':
                          return 'Password must be at least 6 characters';
                        case 'Password must contain at least one uppercase letter':
                          return 'Password must contain at least one uppercase letter';
                        case 'Password must contain at least one special character':
                          return 'Password must contain at least one special character';
                        default:
                          return null;
                      }
                    }}
                  </ErrorMessage>
                </div>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    as={Input}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      onClick={handleTogglePassword}
                    />
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Field type="tel" name="phoneNumber" placeholder="Enter your phone number" as={Input} />
                <ErrorMessage name="phoneNumber" component="div" style={{ color: 'red' }} />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Sign Up
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalSignUp;
