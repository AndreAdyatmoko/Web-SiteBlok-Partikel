import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Link, InputGroup, InputRightElement, IconButton, Box } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotSignInLike = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onForgot = () => {
    navigate('/forgotpassword');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    // Logika untuk melakukan sign in
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box mt={0}>
      <FormControl>
        <FormLabel>Email or Username or Phone</FormLabel>
        <Input type="email" placeholder="Enter your email or username or phone" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Enter your password"
            onChange={handlePasswordChange}
          />
          <InputRightElement>
            <IconButton
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              variant="ghost"
              onClick={handleTogglePassword}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Link color="green" onClick={onForgot}>
        Forgot password?
      </Link>
      <div>
        <span>No account? </span>
        <Link color="green" onClick={handleSignUp}>
          Create one
        </Link>
      </div>
      <Button colorScheme="blue" onClick={handleSignIn}>
        Sign In
      </Button>
    </Box>
  );
};

export default NotSignInLike;
