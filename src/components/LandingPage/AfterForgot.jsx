import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Yup Validation
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[\W]/, 'Password must contain at least one special character')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const AfterForgot = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = async (values, action) => {
    try {
      const token = window.location.href.split('/').pop(); // Mengambil token dari URL terakhir
      console.log(token);
      const data = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const confirmToken = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Call the API for reset password
      const response = await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass',
        data,
        confirmToken
      );

      toast({
        title: "Success reset password",
        description: "Password has been reset",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      action.resetForm();

      console.log("Reset password berhasil:", response.data); // Tampilkan cek pada console

      setPasswordReset(true); // Set status reset password menjadi true

    } catch (error) {
      // Menampilkan pemberitahuan gagal
      toast({
        title: "Error sending password reset",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.log("Error mengirimkan password reset:", error); // Tampilkan cek pada console
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      maxWidth='400px'
      mx="auto"
      mt={36}
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4}>
        Reset Password
      </Heading>

      {passwordReset ? ( // Jika reset password berhasil
        <>
          <Heading as="h2" size="md" mb={4}>
            Password has been reset successfully.
          </Heading>
          <Button colorScheme="teal" mt={4} onClick={() => window.location.href = "/"}>Back to Home</Button>
        </>
      ) : (
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  mb={4}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={18} />
                        ) : (
                          <FaEye size={18} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage
                    name="password"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, form }) => (
                <FormControl
                  mb={4}
                  isInvalid={
                    form.errors.confirmPassword &&
                    form.touched.confirmPassword
                  }
                >
                  <FormLabel>Password Confirmation</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleToggleConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash size={18} />
                        ) : (
                          <FaEye size={18} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            <Button type="submit" colorScheme="teal" mt={4}>
              Reset Password
            </Button>
          </Form>
        </Formik>
      )}
    </Box>
  );
};

export default AfterForgot;
