import {
  Box,
  Circle,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Skeleton,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Image,
  Select,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
// import { MdOutlineStarBorder } from 'react-icons/md';
// mport Link from 'next/link';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

import { Fragment, useEffect, useState } from 'react';
// import { Product } from '@/types/product';
import { useNavigate } from 'react-router-dom';
export const BoxCardLoader = ({
  rounded = '2.4rem',
  h = '300px',
  mt,
  w = '300px',
}) => {
  return <Skeleton w={w} h={h} mt={mt} {...{ rounded }} />;
};

const ProductCard2 = () => {
  const [loading, setLoading] = useState(true);
  const [loadingLike, setLoadingLike] = useState(false);
  const [data, setData] = useState();
  const [stat, setStat] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortOptionName, setSortOptionName] = useState('');

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:3005/api/v1/products/static?name=${stat}&sortByPrice=${sortOption}&sortByName=`
    );
    const jsonData = await result.json();
    if (jsonData && jsonData.products.length > 1) {
      setData(jsonData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [stat, sortOption, sortOptionName]);

  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const toggleProductChecked = id => {
    setLoadingLike(true);
    setLike(id);
  };

  const nextCard = (id, name) => {
    navigate(`/${id}`, { state: name });
  };

  const handleChange = e => {
    setStat(e.target.value);
  };

  const handleSortChange = value => {
    console.log('values', value);
    setSortOptionName(value);
    setSortOption(value);
  };
  console.log('options', sortOption);
  return (
    <Box
      p="0"
      bg="brand.white300"
      position="relative"
      h="100%"
      overflow="hidden"
    >
      <Box width={'100%'} display={'flex'} justifyContent={'end'}>
        <InputGroup w={'50%'} mr={'5'}>
          <Input
            type="tel"
            placeholder="Search Here...."
            onChange={e => handleChange(e)}
          />
          <InputRightAddon children="Search" _hover={{ cursor: 'pointer' }} />
        </InputGroup>
        <Select
          w={'25%'}
          mr={10}
          placeholder="Sort By"
          value={sortOptionName}
          onChange={e => handleSortChange(e.target.value)}
        >
          <option value="option" disabled>
            Price----
          </option>
          <option value="asc">Low to High</option>
          <option value="des">High to Low</option>
          <option value="option" disabled>
            Name----
          </option>
          <option value="ascN">A to Z</option>
          <option value="desN">Z to A</option>
          {/* Add more options based on your data */}
        </Select>
      </Box>
      <Box maxW="1280px" mx="auto" pb="4rem">
        <Box pos="absolute" top="310px" left="-100px">
          {/* <img
            width={200}
            height={200}
            // src="https://queue-it.com/media/ppcp1twv/product-drop.jpg"
            alt="Product Image Background"
          /> */}
        </Box>
        <Box p="3rem" pos="relative" zIndex="">
          <Flex align="center">
            <Image
              src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-new-arrival-banner-sale-sticker-png-image_5954962.jpg"
              height={30}
              width={30}
              alt="New Seal"
            />
            <Text fontWeight="600" ml="1rem">
              New arrivals
            </Text>
          </Flex>

          <SimpleGrid columns={[1, 3, 3, 4]} gap="2rem" mt="1rem">
            {loading ? (
              <Fragment>
                {Array(12)
                  .fill(0)
                  .map((_, idx) => (
                    <BoxCardLoader key={idx} rounded=".6rem" />
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                {/* {productData?.data?.products?.map((product: Product) => ( */}
                {data &&
                  data.products.map((item, index) => (
                    <Box
                      key={index}
                      pos="relative"
                      cursor="pointer"
                      w={300}
                      h={300}
                    >
                      {' '}
                      <Box
                        bg="brand.white100"
                        boxShadow="0px 4px 24px rgba(240, 240, 240, 0.6)"
                        borderRadius="1rem"
                        overflow="hidden"
                        alignContent={'center'}
                      >
                        <Image
                          src={item?.imageUrl}
                          width={200}
                          height={200}
                          alt="Product Image"
                          m="auto"
                          onClick={() => {
                            nextCard(item.product_id, item.name);
                          }}
                        />

                        <Box p={['1rem', '2rem', '2rem', '2rem']}>
                          <Flex
                            align={['left', 'center']}
                            justify="space-between"
                            flexDir={['column', 'row']}
                          >
                            <Text
                              color="brand.grey300"
                              textAlign="left"
                              maxW="200px"
                              fontSize={['1.4rem', '1.5rem']}
                              fontWeight="600"
                              isTruncated
                            >
                              {item?.name}
                            </Text>
                            <Box>
                              <Text
                                fontSize={['1.2rem', '1.3rem']}
                                fontWeight="500"
                                color="brand.blue100"
                              >
                                ${item?.rate}
                              </Text>
                            </Box>
                          </Flex>
                          <HStack color={'grey'}>
                            {Array(5)
                              .fill('')
                              .map((_, i) => {
                                const roundedRating =
                                  Math.round(item.rating * 2) / 2;
                                if (roundedRating - i >= 1) {
                                  return (
                                    <BsStarFill
                                      key={i}
                                      style={{ marginLeft: '1' }}
                                      color={i < item.rating ? 'orange' : 'red'}
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
                                return (
                                  <BsStar key={i} style={{ marginLeft: '1' }} />
                                );
                              })}
                            <Circle
                              bg="brand.white100"
                              p=".5rem"
                              pos="absolute"
                              // left="15px"
                              // top="15px"
                              right="10px"
                              color="grey"
                            >
                              <Icon
                                onClick={() =>
                                  toggleProductChecked(item.product_id)
                                }
                                color={`${'brand.red100'}`}
                                fontSize="1.5rem"
                              >
                                {loadingLike && item.product_id === like ? (
                                  <GoHeartFill color="red" />
                                ) : (
                                  <GoHeart />
                                )}
                              </Icon>
                            </Circle>
                          </HStack>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Fragment>
            )}
          </SimpleGrid>
          <Box textAlign="center">
            <Button
              bg="brand.green100"
              color="brand.white100"
              fontSize="1.5rem"
              p="2rem"
              mt="5rem"
              _hover={{
                bg: 'brand.green200',
              }}
              _focus={{
                borderColor: 'none',
                boxShadow: 'none',
              }}
              onClick={() => {}}
            >
              View more products
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ProductCard2 };
