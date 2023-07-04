import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, HStack, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';

const PopularArticles = () => {
  const [popularArticles, setPopularArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      // Sort articles by popularity and slice the top 10 articles
      const sortedArticles = response.data.result
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setPopularArticles(sortedArticles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box mt={90} align="center">
      <Heading mb={5}>Your Like Articles</Heading>
      <Wrap spacing={5} justify="center">
        {popularArticles.map((article) => (
          <WrapItem key={article.id}>
            <Box
              p={5}
              borderWidth="1px"
              borderRadius="md"
              width="500px"
              boxShadow="md"
            >
              <Heading size="md">{article.title.slice(0,6)}...</Heading>
              <Image
                src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                alt={article.title}
                mt={4}
                mb={4}
                objectFit="cover"
                height="200px"
                width="100%"
              />
              <Text>{article.content.slice(0, 7)}...</Text>
              <HStack spacing={2} mt={4}>
                <Text fontWeight="bold">Category:</Text>
                <Text>{article.Category.name}</Text>
              </HStack>
                <Text>By {article.User.username} on{" "}</Text>
                <Text>{article.createdAt}</Text>

            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default PopularArticles;
