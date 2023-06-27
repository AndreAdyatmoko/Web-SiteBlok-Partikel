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
  import { useState } from "react";

  
  
  const ChangePhoneNumber = () => {
    const [isPhoneChanged, setIsPhoneChanged] = useState(false);
    const toast = useToast();
  
    const validationSchema = Yup.object().shape({
      currentPhone: Yup.string().required("Current phone number is required"),
      newPhone: Yup.string().required("New phone number is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        currentPhone: "",
        newPhone: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const { currentPhone, newPhone } = values;
        const token = localStorage.getItem("token")
        ;
  
        const data = {
          currentPhone,
          newPhone,
          FE_URL: "http://localhost:3000",
        };
        const config = {
          method: "patch",
          maxBodyLength: Infinity,
          url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        try {
          const response = await axios(config);
          console.log(response.data);
          setIsPhoneChanged(true);
          toast({
            title: "Check your email for verification!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Error changing phone number",
            description: error.response.data,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
          console.log(error);
        }
      },
    });
  
    if (!isPhoneChanged) {
      return (
        <Box px={6} py={4} mt="100px">
          <Heading as="h1" size="xl" mb={4}>
            Change Phone Number
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              id="currentPhone"
              isInvalid={formik.errors.currentPhone && formik.touched.currentPhone}
              mb={4}
            >
              <FormLabel>Current Phone Number</FormLabel>
              <Input
                type="text"
                name="currentPhone"
                value={formik.values.currentPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.currentPhone && formik.errors.currentPhone && (
                <FormErrorMessage>
                  {formik.errors.currentPhone}
                </FormErrorMessage>
              )}
            </FormControl>
  
            <FormControl
              id="newPhone"
              mb={4}
              isInvalid={formik.errors.newPhone && formik.touched.newPhone}
            >
              <FormLabel>New Phone Number</FormLabel>
              <Input
                type="text"
                name="newPhone"
                value={formik.values.newPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPhone && formik.errors.newPhone && (
                <FormErrorMessage>
                  {formik.errors.newPhone}
                </FormErrorMessage>
              )}
            </FormControl>
  
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              variant="solid"
              isLoading={formik.isSubmitting}
            >
              Change Phone Number
            </Button>
          </form>
        </Box>
      );
    }
  
    return (
      <Box px={6} py={4} mt="100px">
        <Heading as="h1" size="xl" mb={4}>
          Check your email
        </Heading>
        <p>Check your email to verify the change of your phone number</p>
      </Box>
    );
  };
  
  export default ChangePhoneNumber;
  