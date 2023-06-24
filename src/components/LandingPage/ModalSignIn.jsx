import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import ForgotPasswordForm from './ForgotPassword';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/Reducer/AuthReducer';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ModalSignIn = ({ isOpen, onClose }) => {
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari redux store

  // Validasi dengan Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle submit
  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/login', {
        email: email,
        password: password
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(loginSuccess(response.data.token));
        Navigate('/');
      }
      onClose();
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                {/* Form untuk email atau username atau phone */}
                <FormControl>
                  <FormLabel>Email or Username or Phone</FormLabel>
                  <Field
                    type="email"
                    name="email"
                    as={Input}
                    placeholder="Enter your email or username or phone"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </FormControl>

                {/* Form untuk password */}
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      as={Input}
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        onClick={handleTogglePassword}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="password" component="div" className="error-message" />
                </FormControl>
              </Form>
            </Formik>
          </ModalBody>

          {/* Footer untuk tautan "Forgot password" */}
          <ModalFooter>
            <Link href="#" color="green" onClick={handleForgotPassword}>
              Forgot password?
            </Link>
          </ModalFooter>

          {/* Footer untuk tautan "Create one" */}
          <ModalFooter>
            No account?{' '}
            <Link href="#" color="green" onClick={handleSignUpClick}>
              Create one
            </Link>
          </ModalFooter>

          {/* Footer untuk tombol "Sign In" dan "Close" */}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" form="signin-form" onClick={handleSubmit}>
              Sign In
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Sign Up */}
      {showSignUpModal && <ModalSignUp isOpen={showSignUpModal} onClose={handleCloseSignUpModal} />}

      {/* Modal Forgot */}
      {showForgotPassword && (
        <ForgotPasswordForm isOpen={showForgotPassword} onClose={handleCloseForgotPassword} />
      )}
    </>
  );
};

export default ModalSignIn;
