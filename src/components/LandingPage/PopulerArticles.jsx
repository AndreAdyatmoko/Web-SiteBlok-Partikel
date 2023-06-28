import React, { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const PopularArticles = () => {
  const [articles, setArticles] = useState([]);
  const colorModeValue = useColorModeValue('white', 'gray.900');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1');
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Center py={6}>
      {articles.map((article) => (
        <Stack
          key={article.id}
          mt={100}
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={colorModeValue}
          boxShadow={'2xl'}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              alt={article.id}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {article.User.username}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              {article.User.username.slice(0, 6)}
            </Text>
            <Text textAlign={'center'} color={colorModeValue === 'white' ? 'gray.700' : 'gray.400'} px={3}>
              {article.description}
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            </Stack>

            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}
              >
                Like
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'teal'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
              >
                Read
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Center>
  );
};

export default PopularArticles;
