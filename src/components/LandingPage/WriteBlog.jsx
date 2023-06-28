import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const WriteBlog = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [category, setCategory] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory'
      );
      setCategory(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toast = useToast();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: event.target.elements.title.value,
      content: event.target.elements.content.value,
      country: event.target.elements.country.value,
      CategoryId: selectedOption,
      url: '/',
      keywords: event.target.elements.keywords.value,
    };
    const file = event.target.elements.file.files[0];

    const formData = new FormData();
    console.log(data);
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      ); toast({
        title: 'Article created! Back to Home to View!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      console.log('Article created:', response.data);
      // Lakukan tindakan setelah artikel berhasil dibuat
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  };

  return (
    <Box mt={90} align="center">
      <Heading mb={5}>Write Your Blog here</Heading>
      <Box width={750}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            mb={5}
            placeholder="Tittle of your Article"
          />
          <Textarea
            placeholder="Masukkan Isi Artikel"
            height={300}
            mb={5}
            name="content"
          />
          <Box alignSelf="left" mb={5}>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ width: '300px', alignItems: 'center' }}
            >
              <option value="">Choose Category</option>
              {category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Box>
          <Input
            type="text"
            placeholder="Keyword"
            name="keywords"
            mb={5}
          />
          <Input type="file" name="file" variant="unstyled" mb={5} />
          <Input
            type="text"
            placeholder="Country?"
            name="country"
            mb={5}
          />
          <Button type="submit" colorScheme="teal">Submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default WriteBlog;
