import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ChangeUsernamePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Current Username is required"),
    newUsername: Yup.string().required("New Username is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      // Send the PATCH request to the endpoint with the Authorization header
      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        {
          currentUsername: values.currentUsername,
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
        title: "Check your email for verification",
        description: "Check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });


    } catch (error) {
      // Handle error response
      console.error("Error changing username:", error);
      toast({
        title: "Error changing username",
        description: error.response.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // Show an error message to the user
    }

    setIsSubmitting(false);
  };

  return (
    <Box mt="100px">

      <Formik
        initialValues={{ currentUsername: "", newUsername: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Current Username</label>
              <Field
                as={Input}
                type="text"
                name="currentUsername"
                required
              />
              <ErrorMessage
                name="currentUsername"
                component={Text}
                color="red.500"
              />
            </div>
            <div>
              <label>New Username</label>
              <Field
                as={Input}
                type="text"
                name="newUsername"
                required
              />
              <ErrorMessage
                name="newUsername"
                component={Text}
                color="red.500"
              />
            </div>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
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
