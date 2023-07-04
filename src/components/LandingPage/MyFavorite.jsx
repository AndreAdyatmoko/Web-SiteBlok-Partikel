import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Avatar } from '@chakra-ui/react';

const MyFavorites = ({ token }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        My Favorites
      </Heading>
      {favorites.length === 0 ? (
        <Text fontSize="xl" fontWeight="bold" color="gray.500" textAlign="center">
        Oops! You don't have any favorites yet.
        <br />
        Start exploring and liked your favorite items.
        </Text>
      ) : (
        favorites.map((favorite) => (
          <Box key={favorite.id} mb={8}>
            <Heading as="h3" size="md" mb={2}>
              {favorite.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={4}>
              Created At: {new Date(favorite.createdAt).toLocaleDateString()}
            </Text>
            <Box mb={4}>
              <Avatar
                name={favorite.User.username}
                src={favorite.User.imgProfile}
                size="sm"
                borderRadius="full"
                mr={2}
              />
              <Text fontSize="sm" fontWeight="bold" display="inline">
                {favorite.User.username}
              </Text>
            </Box>
            <Text>{favorite.content}</Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MyFavorites;
