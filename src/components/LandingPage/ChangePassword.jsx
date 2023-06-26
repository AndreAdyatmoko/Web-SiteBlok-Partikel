import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ChangePassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    password: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { currentPassword, password, confirmPassword } = values;
      const token = localStorage.getItem("token");

      const data = {
        currentPassword,
        password,
        confirmPassword,
      };

      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        setIsPasswordChanged(true);
        toast({
          title: "Password changed successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleToggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleToggleConfirmNewPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);
  };

  if (!isPasswordChanged) {
    return (
      <Box marginBottom={"250px"} px={6} py={4}>
        <Heading fontFamily={"monospace"} as="h1" size="xl" mb={4}>
          Change Password
        </Heading>
        <Box as="form" onSubmit={formik.handleSubmit}>
          <FormControl
            id="oldPassword"
            mb={4}
            isInvalid={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          >
            <FormLabel>Old Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={isOldPasswordVisible ? "text" : "password"}
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="currentPassword"
                required
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    isOldPasswordVisible ? "Hide password" : "Show password"
                  }
                  icon={isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleToggleOldPasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <FormErrorMessage>
                  {formik.errors.currentPassword}
                </FormErrorMessage>
              )}
          </FormControl>
          <FormControl
            id="newPassword"
            mb={4}
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel>New Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={isNewPasswordVisible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                required
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    isNewPasswordVisible ? "Hide password" : "Show password"
                  }
                  icon={isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleToggleNewPasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="confirmNewPassword"
            mb={4}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          >
            <FormLabel>Confirm New Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={isConfirmNewPasswordVisible ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmPassword"
                required
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    isConfirmNewPasswordVisible
                      ? "Hide password"
                      : "Show password"
                  }
                  icon={
                    isConfirmNewPasswordVisible ? <FaEyeSlash /> : <FaEye />
                  }
                  onClick={handleToggleConfirmNewPasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
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
            Change Password
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Password Changed Successfully!
      </Heading>
      <p>Your password has been successfully changed.</p>
    </Box>
  );
};

export default ChangePassword;
