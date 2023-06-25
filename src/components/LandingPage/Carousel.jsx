import React, { useState, useEffect } from 'react';
import { Box, IconButton, useBreakpointValue, Heading, Text } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CaptionCarousel = () => {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=DESC&page=1');
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box position="relative" width="full" overflow="hidden" borderRadius="md">
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {articles.map((article) => (
          <Box key={article.id} position="relative">
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
              position="absolute"
              bottom="0"
              color="white"
              padding="10px 10px 20px"
              bg="rgba(0, 0, 0, 0.5)"
              width="100%"
              borderRadius="0 0 20px 20px"
            >
              <Heading as="h3" size="md" mb={2}>
                {article.title}
              </Heading>
              <Text>{article.content}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CaptionCarousel;
