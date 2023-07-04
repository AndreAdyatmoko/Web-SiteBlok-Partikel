import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const LikeButton = ({ articleId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getLikeStatus();
  }, []);

  const getLikeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { liked, count } = response.data;
      setIsLiked(liked);
      setLikeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must sign in first to like an article.");
        return;
      }

      setIsLiked(true);
      const response = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like`,
        {
          BlogId: articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { count } = response.data;
      setLikeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must sign in first to unlike an article.");
        return;
      }

      setIsLiked(false);
      const response = await axios.delete(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            BlogId: articleId,
          },
        }
      );
      const { count } = response.data;
      setLikeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Button
        colorScheme={isLiked ? "red" : "gray"}
        mt={4}
        width={30}
        height={30}
        borderRadius="full"
        size="xl"
        onClick={isLiked ? handleUnlike : handleLike}
      >
        <FaHeart />
      </Button>
    </Box>
  );
};

export default LikeButton;
