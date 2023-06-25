import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ForgotPasswordPage = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Request ke API ke endpoint reset password
      await axios.put('https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass', {
        email: values.email,
        FE_URL: "http://localhost:3000/"
      });

      // Jika permintaan sukses berhasil
      console.log('Success reset password');

      // Jika permintaan request gagal
    } catch (error) {
      // Respone yang muncul
      console.error("Error sending password reset:", error);
    }

    setSubmitting(false);
  };

  const handleRequestReset = async (values, { setSubmitting }) => {
    await handleSubmit(values, { setSubmitting });
  };

  const textColor = useColorModeValue('gray.800', 'gray.400');

  return (
    <Box width="md" mx="auto" mt={36} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4}>
        Forgot your password?
      </Text>

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
              onClick={handleRequestReset}
              width="full"
              size="lg"
            >
              Request Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordPage;
