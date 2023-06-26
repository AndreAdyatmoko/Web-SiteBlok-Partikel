import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { loginSuccess } from "../../Redux/Reducer/AuthReducer";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";


const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // modal for forgot password
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onForgot = () => {
    navigate("/forgotpassword");
  };

  const navigate = useNavigate();

  // auth
  const dispatch = useDispatch();

  const login = async (values) => {
    try {
      const { username, email, phone, password } = values;
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
        }
      );
      if (res.status === 200) {
        dispatch(loginSuccess(res.data.token));
        localStorage.setItem('token', res.data.token);
        navigate("/");
        alert("Welcome to Back 😊!");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }
  };

  // validation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Box bg ='#E0DCE3' width={"100%"} height={"100vh"}>
      <Flex justifyContent={"center"} align={"center"}>
        <Box 
          w={"50%"} 
          p={"20px 40px"} 
          mt={"100px"} 
          border={"2px solid black"}
          borderRadius={"20px"}
        >
          <VStack spacing={"4"} p={"20px 200px"}>
            <Box w={"full"}>
              <Text
                fontSize={"xs"}
                color={"black"}
                fontStyle={"italic"}
                align={"center"}
              >
                You can login by Email 😉😉
              </Text>
            </Box>
            <Box w={"full"}>
              <Button
                onClick={onOpen}
                display={"flex"}
                justifyContent={"center"}
                w={"100%"}
                mt={"6"}
                rounded={"lg"}
                color={"white"}
                bgColor={"#3182CE"}
                _hover={{ bgColor: "#1D9BF0" }}
                _active={{ bgColor: "#6C12B5" }}
              >
                Sign In
              </Button>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  rounded={"lg"}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel htmlFor="password" mt={"4"}>
                  <Flex
                    alignItems={"baseline"}
                    justifyContent={"space-between"}
                  >
                    Password
                    <Button variant={"link"} onClick={onForgot}>
                      <Text
                        fontSize={"xs"}
                        fontWeight={400}
                        color={"blue"}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Forgot Password?
                      </Text>
                    </Button>
                  </Flex>
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    rounded={"lg"}
                  />
                  <InputRightElement width="3.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? (
                        <IoEyeOffOutline size={"20px"} />
                      ) : (
                        <IoEyeOutline size={"20px"} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>
                    {formik.errors.password}
                  </FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Sign In
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SignIn;
