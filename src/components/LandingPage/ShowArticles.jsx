import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid, Heading, Text, Button, Avatar, Image, Flex } from "@chakra-ui/react";

const ShowArticles = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const articlesPerPage = 8;
  const paginationSize = 10;

  const fetchData = async () => {
    try {
      const categories = [1, 2, 3, 4, 5, 6, 7]; // Daftar ID kategori
      const filter = categories.map(categoryId => {
        const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${categoryId}&sort=ASC&page=1&limit=20`;
        return axios.get(url);
      });
      const responses = await Promise.all(filter);
      const allArticles = responses.flatMap(response => response.data.result);
      console.log(allArticles);
      setArticles(allArticles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    if (activePage < totalPages) setActivePage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(prevPage => prevPage - 1);
    }
  };

  const renderArticle = (article) => {
    return (
      <Box
        key={article.id}
        p={4}
        boxShadow="md"
        borderRadius="md"
        bg="#C0DBE3"
        border="1px solid gray"
        display="block"
        flexDirection="column"
        width="240px"
        height="auto"
        margin={4}
      >
        <Image
          src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
          alt={article.id}
          boxSize="150px"
          flex="1"
          objectFit="cover"
          width={"100%"}
        />
        <Box mt={4}>
          <Heading as="h3" fontSize="xl" noOfLines={1}>
             {article.title}
          </Heading>
          <Text noOfLines={1}>{article.content}</Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            Created At: {new Date(article.createdAt).toLocaleDateString()}
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            Category: {article.Category.name}
          </Text>
          <Flex mt={2} alignItems="center">
            <Avatar
              name={article.User.username}
              src={article.User.imgProfile}
              size="sm"
              borderRadius="full"
            />
            <Text ml={2} fontSize="sm" noOfLines={1}>
              {article.User.username}
            </Text>
          </Flex>
          <Button colorScheme="blue" mt={4} size="sm">
            Read More
          </Button>
        </Box>
      </Box>
    );
  };

  const renderArticleIndexes = () => {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = Math.max(activePage - Math.floor(paginationSize / 2), 1);
    const endIndex = Math.min(startIndex + paginationSize - 1, totalPages);

    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index).map(i => (
      <Button
        key={i}
        onClick={() => setActivePage(i)}
        colorScheme={activePage === i ? "blue" : "gray"}
        mx={1}
        size="sm"
      >
        {i}
      </Button>
    ));
  };

  return (
    <Box mt={8}>
      <SimpleGrid columns={[2, 4]} spacing={4}>
        {articles
          .slice((activePage - 1) * articlesPerPage, activePage * articlesPerPage)
          .map((article) => renderArticle(article))}
      </SimpleGrid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button colorScheme="blue" onClick={handlePrevPage} disabled={activePage === 1} width="7%">
          Previous
        </Button>
        {renderArticleIndexes()}
        <Button
          colorScheme="blue"
          width="7%"
          onClick={handleNextPage}
          disabled={activePage === Math.ceil(articles.length / articlesPerPage)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ShowArticles;
