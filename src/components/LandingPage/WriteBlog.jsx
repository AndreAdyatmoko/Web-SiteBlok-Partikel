import React, { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

const WriteBlog = () => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Lakukan tindakan saat tombol "Post" ditekan
    console.log('Posting content:', content);
  };

  return (
    <Box mt={10} mx="auto" maxW="600px">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis artikelmu di sini..."
        size="lg"
        height="300px"
        resize="none"
      />
      <Button mt={4} colorScheme="teal" onClick={handlePost}>
        Post
      </Button>
    </Box>
  );
};

export default WriteBlog;