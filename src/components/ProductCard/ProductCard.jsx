import React, { useState } from 'react';

import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ data }) => {
  function Rating({ rating, numReviews }) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'orange' : 'red'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  key={i}
                  style={{ marginLeft: '1' }}
                  color="orange"
                />
              );
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
        <Box as="span" ml="2" color="gry.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Box>
    );
  }

  return (
    <Flex display={'flex'} flexWrap={'wrap'}>
      {data &&
        data.product &&
        data?.product.map((item, index) => {
          return (
            <Flex p={50} display={'flex'} flexWrap={'wrap'}>
              <Box
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
              >
                {item.new && (
                  <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    right={2}
                    bg="red.200"
                  />
                )}

                <Image
                  src={item.imageUrl}
                  alt={`Picture of ${data.name}`}
                  roundedTop="lg"
                />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    {item.new && (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="0.8em"
                        colorScheme="red"
                      >
                        New
                      </Badge>
                    )}
                  </Box>
                  <Flex
                    mt="1"
                    justifyContent="space-between"
                    alignContent="center"
                  >
                    <Box
                      fontSize="2xl"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {item.name}
                    </Box>
                    <Tooltip
                      label="Add to cart"
                      bg="white"
                      placement={'top'}
                      color={'gray.800'}
                      fontSize={'1.2em'}
                    >
                      <chakra.a href={'#'} display={'flex'}>
                        <Icon
                          as={FiShoppingCart}
                          h={7}
                          w={7}
                          alignSelf={'center'}
                        />
                      </chakra.a>
                    </Tooltip>
                  </Flex>

                  <Flex justifyContent="space-between" alignContent="center">
                    <Rating rating={item.rating} numReviews={item.review} />
                    <Box fontSize="2xl">
                      <Box as="span" color={'gray.600'} fontSize="lg">
                        $
                      </Box>
                      {item.rate.toFixed(2)}
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default ProductCard;
