import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const ProfileUpdate = () => {
  const handleFormSubmit = (values) => {
    // Lakukan tindakan yang sesuai dengan data pengguna yang telah diubah
    console.log(values);
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={4} textAlign="center">
        Update Profile
      </Heading>
      <Formik
        initialValues={{
          username: '',
          email: '',
          phoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Field type="text" name="username" as={Input} />
            <ErrorMessage name="username" component="div" color="red.500" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Field type="email" name="email" as={Input} />
            <ErrorMessage name="email" component="div" color="red.500" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Field type="text" name="phoneNumber" as={Input} />
            <ErrorMessage name="phoneNumber" component="div" color="red.500" />
          </FormControl>

          <Button mt={6} colorScheme="blue" type="submit" isFullWidth>
            Update
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default ProfileUpdate;
