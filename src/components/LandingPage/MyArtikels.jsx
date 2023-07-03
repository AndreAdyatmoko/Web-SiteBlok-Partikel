import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, HStack, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';

const MyArtikels = () => {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/auth?&sort=ASC&page=1&search&sortBy&size`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)

      setArticles(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={90} align="center">
      <Heading mb={5}>My Artikels</Heading>
      {articles.length > 0 ? (
        <Wrap spacing={5} justify="center">
          {articles.map((article) => (
            <WrapItem key={article.id}>
              <Box
                p={5}
                borderWidth="1px"
                borderRadius="md"
                width="500px"
                boxShadow="md"
              >
                <Heading size="md" noOfLines={1}>{article.title}</Heading>
                <Image
                  src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                  alt={article.title}
                  mt={4}
                  mb={4}
                  objectFit="cover"
                  height="200px"
                  width="100%"
                />
                <Text noOfLines={1}>{article.content}</Text>
                <HStack spacing={2} mt={4}>
                  <Text fontWeight="bold">Category:</Text>
                  <Text>{article.Category.name}</Text>
                </HStack>

                <Text>{article.createdAt}</Text>

                
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Text>No articles found.</Text>
      )}
    </Box>
  );
};

export default MyArtikels;
