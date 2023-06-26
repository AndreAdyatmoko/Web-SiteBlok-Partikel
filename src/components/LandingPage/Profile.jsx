import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Heading, Wrap, WrapItem } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Wrap mr={5}>
      <WrapItem>
        <Link to="/profilemenu">
        <Avatar name='User' src='' />
        </Link>
      </WrapItem>
    </Wrap>
  );
};

export default Profile;
