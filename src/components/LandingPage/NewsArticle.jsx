import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid,  Heading, Text, Button, Avatar, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NewsArticle = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const fetchData = async () => {
    try {
      const url =
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1";
      const response = await axios.get(url);
      console.log(response.data);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    const totalPages = Math.ceil(articles.length / 3);
    if (activePage < totalPages && activePage < 3)
    setActivePage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const renderArticleIndex = (index) => {
    return (
      <Button
        key={index}
        onClick={() => setActivePage(index)}
        colorScheme={activePage === index ? "blue" : "gray"}
        mx={1}
        size="sm"
      >
        {index}
      </Button>
    );
  };

  const renderArticleIndexes = () => {
    const totalPages = Math.ceil(articles.length / 3);
    const indexes = [];
    for (let i = 1; i <= totalPages; i++) {
      indexes.push(renderArticleIndex(i));
    }
    return indexes;
  };

  return (
    <Box mt={8}>
      <Swiper spaceBetween={30} slidesPerView={3}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {articles.slice((activePage - 1) * 3, activePage * 3).map((article) => (
            <SwiperSlide key={article.id}>
              <Box
                p={4}
                boxShadow="md"
                borderRadius="md"
                bg="white"
                border="1px solid gray"
                height="100%"
              >
                <Image
                  src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                  alt={article.id}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box>
                  <Heading as="h3" fontSize="xl" my={2}>
                    {article.title}
                  </Heading>
                  <Text mt={2}>
                    Created At: {new Date(article.createdAt).toLocaleDateString()}
                  </Text>
                  <Text>Category: {article.Category.name}</Text>
                  <Grid templateColumns="auto 1fr" mt={2} alignItems="center">
                    <Avatar
                      name={article.User.username}
                      src={article.User.imgProfile}
                      size="sm"
                      borderRadius="full"
                    />
                    <Text ml={2}>{article.User.username}</Text>
                  </Grid>
                  <Button colorScheme="blue" mt={2}>
                    Read More
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Grid>
      </Swiper>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button colorScheme="blue" onClick={handlePrevPage} disabled={activePage === 1}>
          Previous
        </Button>
        {renderArticleIndexes()}
        <Button
          colorScheme="blue"
          onClick={handleNextPage}
          disabled={activePage === Math.ceil(articles.length / 3)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default NewsArticle;
