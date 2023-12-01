import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import { Container, Flex, VStack, HStack } from '@chakra-ui/react';
import Login from '../Login/Login';
import SignUp from '../../SignUP/SignUp';
const Home = () => {
  return (
    <Flex align={'center'} justifyContent={'center'}>
      <Carousel />
    </Flex>
  );
};

export default Home;
