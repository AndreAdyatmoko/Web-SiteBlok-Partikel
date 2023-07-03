import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const LikeButton = ({ articleId, token }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getLikeStatus();
  }, []);

  const getLikeStatus = async () => {
    try {
      const response = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/like/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { liked, count } = response.data;
      setLiked(liked);
      setLikeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like/${articleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { liked, count } = response.data;
      setLiked(liked);
      setLikeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button colorScheme={liked ? "blue" : "gray"} mt={4} size="sm" onClick={handleLike}>
      {liked ? "Disukai" : "Suka"} ({likeCount})
    </Button>
  );
};

export default LikeButton;
