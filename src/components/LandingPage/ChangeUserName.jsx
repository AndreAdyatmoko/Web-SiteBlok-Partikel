import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ChangeUsernamePage = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Current Username is required"),
    newUsername: Yup.string().required("New Username is required"),
  });

  // Handle form submission
  const toast = useToast();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");

      // Send the PATCH request to the endpoint with the Authorization header
      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        {
          currentUsername: values.username,
          newUsername: values.newUsername,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      console.log("Username changed successfully");
      toast({
        title: "Username changed successfully",
        description: "Check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      // Show a success message or redirect to another page
    } catch (error) {
      // Handle error response
      console.error("Error changing username:", error);
      toast({
        title: "Error changing username",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // Show an error message to the user
    }

    setSubmitting(false);
  };

  return (
    <Box p={4} mt={20}>
      <Formik
        initialValues={{ currentUsername: "", newUsername: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="bold" fontFamily="Arial">
                Current User Name
              </Text>
              <Box bg="white" boxShadow="md" p={4} borderRadius="md">
                <Field
                  as={Input}
                  type="text"
                  name="currentUsername"
                  placeholder="Enter your current username"
                />
              </Box>
              <ErrorMessage
                name="currentUsername"
                component={Text}
                color="red.500"
                mt={2}
                fontFamily="Arial"
              />
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="bold" fontFamily="Arial">
                New User Name
              </Text>
              <Box bg="white" boxShadow="md" p={4} borderRadius="md">
                <Field
                  as={Input}
                  type="text"
                  name="newUsername"
                  placeholder="Enter your new username"

                />
              </Box>
              <ErrorMessage
                name="newUsername"
                component={Text}
                color="red.500"
                mt={2}
              />
            </Box>
            <Button
              colorScheme="teal"
              size="md"
              isLoading={isSubmitting}
              type="submit"
            >
              Change Username
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangeUsernamePage;
