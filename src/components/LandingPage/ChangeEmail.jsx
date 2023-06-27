import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ChangeEmail = () => {
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    currentEmail: Yup.string().email("Invalid email").required("Current Email is required"),
    newEmail: Yup.string().email("Invalid email").required("New Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      newEmail: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { currentEmail, newEmail } = values;
      const token = localStorage.getItem("token");

      const data = {
        currentEmail,
        newEmail,
        FE_URL: "http://localhost:3000",
      };

      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        setIsEmailChanged(true);
        toast({
          title: "Check your email for confirmation!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Something went wrong!",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        console.log(error);
      }
    },
  });

  if (!isEmailChanged) {
    return (
      <Box marginBottom="250px" px={6} py={4}>
        <Heading fontFamily="monospace" as="h1" size="xl" mb={4}>
          Change Email
        </Heading>
        <Box as="form" onSubmit={formik.handleSubmit}>
          <FormControl
            id="currentEmail"
            mb={4}
            isInvalid={formik.touched.currentEmail && formik.errors.currentEmail}
          >
            <FormLabel>Current Email</FormLabel>
            <Input
              type="email"
              value={formik.values.currentEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="currentEmail"
              required
            />
            {formik.touched.currentEmail && formik.errors.currentEmail && (
              <FormErrorMessage>
                {formik.errors.currentEmail}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="newEmail"
            mb={4}
            isInvalid={formik.touched.newEmail && formik.errors.newEmail}
          >
            <FormLabel>New Email</FormLabel>
            <Input
              type="email"
              value={formik.values.newEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="newEmail"
              required
            />
            {formik.touched.newEmail && formik.errors.newEmail && (
              <FormErrorMessage>{formik.errors.newEmail}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            mt={2}
            type="submit"
            size="md"
            variant="solid"
            colorScheme="teal"
            isLoading={formik.isSubmitting}
          >
            Change Email
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Email Changed Successfully!
      </Heading>
      <p>Please check your email for verification</p>
    </Box>
  );
};

export default ChangeEmail;
