import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

const PopularArticles = () => {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=DESC&page=1&limit=10');
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={8}>
      <Heading mb={4}>Popular Articles</Heading>
      <SimpleGrid columns={[1, 2]} spacing={4}>
        {articles.map((article) => (
          <Box key={article.id} p={4} borderWidth="1px" borderRadius="md">
            <Box
              style={{
                position: 'relative',
                paddingTop: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '20px',
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                alt={article.title}
              />
            </Box>
            <Box
              color="white"
              padding="10px 10px 20px"
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="0 0 20px 20px"
              mt={2}
            >
              <Heading as="h3" size="md" mb={2}>
                {article.title}
              </Heading>
              <Text>{article.content}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PopularArticles;
