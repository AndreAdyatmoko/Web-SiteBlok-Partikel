import { Box, Heading, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const ChangeEmailVerification = () => {
  const toast = useToast();
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const handleVerification = async () => {
    try {
      // Lakukan permintaan verifikasi email ke API
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        // Jika verifikasi berhasil
        toast({
          title: "Change verified!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setIsEmailChanged(true);
      } else {
        // Jika verifikasi gagal
        toast({
          title: "Email verification failed!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Email verification failed!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleBackToHome = () => {
    // Pengalihan halaman ke halaman beranda setelah tombol "Back to Home" diklik
    window.location.href = "/";
  };

  return (
    <Box px={6} py={4} mt="100px" textAlign="center">
      <Heading as="h1" size="xl" mb={4}>
        Verification Email
      </Heading>
      <p>
        Please click the button below to verify the change.
      </p>
      {isEmailChanged ? (
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleBackToHome}
          isLoading={false} // Ganti menjadi `true` jika sedang memuat
        >
          Back to Home
        </Button>
      ) : (
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleVerification}
          isLoading={false} // Ganti menjadi `true` jika sedang memuat
        >
          Verification
        </Button>
      )}
    </Box>
  );
};

export default ChangeEmailVerification;
