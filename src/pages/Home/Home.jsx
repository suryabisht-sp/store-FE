import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import {
  Container,
  Flex,
  VStack,
  HStack,
  Stack,
  Input,
  Box,
} from '@chakra-ui/react';
import Login from '../Login/Login';
import SignUp from '../../SignUP/SignUp';
import { ProductDetails } from '../../components/Product/Card';
import { ProductCard2 } from '../../components/Product/Card2';
const Home = () => {
  return (
    <Stack align={'center'} justifyContent={'center'}>
      <Carousel />
      <ProductCard2 />
      {/* <ProductDetails /> */}
    </Stack>
  );
};

export default Home;
