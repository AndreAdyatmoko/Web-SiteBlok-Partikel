import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Image, HStack } from '@chakra-ui/react';
import axios from 'axios';

const MyArtikels = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box mt={90} align="center">
      <Heading mb={5}>My Artikels</Heading>
      {articles.length > 0 ? (
        <VStack spacing={5}>
          {articles.map((article) => (
            <Box
              key={article.id}
              p={5}
              borderWidth="1px"
              borderRadius="md"
              width="500px"
              boxShadow="md"
            >
              <Heading size="md">{article.title}</Heading>
              <Image
                src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                alt={article.title}
                mt={4}
                mb={4}
                objectFit="cover"
                height="200px"
                width="100%"
              />
              <Text>{article.content}</Text>
              <HStack spacing={2} mt={4}>
                <Text fontWeight="bold">Category:</Text>
                <Text>{article.category}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No articles found.</Text>
      )}
    </Box>
  );
};

export default MyArtikels;