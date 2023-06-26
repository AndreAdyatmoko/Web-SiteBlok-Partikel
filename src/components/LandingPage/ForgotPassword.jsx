import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ isOpen, onClose }) => {
  const [resetSuccess, setResetSuccess] = useState(false); // State untuk menampilkan pesan sukses
  const [isRequesting, setIsRequesting] = useState(false); // State untuk menandakan sedang melakukan permintaan

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      setIsRequesting(true); // Mengubah state isRequesting menjadi true untuk menandakan sedang melakukan permintaan

      // Request ke API ke endpoint reset password
      await axios.put('https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass', {
        email: values.email,
        FE_URL: "http://localhost:3000"
      });

      // Jika permintaan sukses berhasil
      console.log('Success reset password');
      setResetSuccess(true); // Mengubah state resetSuccess menjadi true

    } catch (error) {
      // Respone yang muncul
      console.log("Error sending password reset:", error);
      console.log("Respone:", error.response);
    } finally {
      setIsRequesting(false); // Mengubah state isRequesting menjadi false setelah permintaan selesai
    }
  };

  const textColor = useColorModeValue('gray.800', 'gray.400');

  const handleOkClick = () => {
    window.location.href = '/'; // Navigasi ke halaman beranda // Ini harus ditanyakan kenapa tidak bisa menggunakan Navigate
  };

  return (
    <Box width="md" mx="auto" mt={36} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4}>
        Forgot your password?
      </Text>

      {resetSuccess ? ( // Menampilkan pesan sukses jika resetSuccess true
        <>
          <Text color="green.500" mb={4}>
            Success reset password. Please check your email.
          </Text>
          <Button
            colorScheme="blue"
            width="full"
            size="lg"
            onClick={handleOkClick}
          >
            OK
          </Button>
        </>
      ) : (
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Text color={textColor} mb={4}>
              You'll get an email with a reset link
            </Text>
            <Field
              as={Input}
              type="email"
              name="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              mb={4}
            />
            <Button
              colorScheme="blue"
              width="full"
              size="lg"
              type="submit"
              isLoading={isRequesting} // Menampilkan loading spinner saat sedang melakukan permintaan
              loadingText="Requesting"
            >
              {isRequesting ? 'Requesting' : 'Request Reset'}
            </Button>
          </Form>
        </Formik>
      )}
    </Box>
  );
};

export default ForgotPassword;
