import {
  Box,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  Image,
} from '@chakra-ui/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiChevronLeft } from 'react-icons/bi';
import { Center, Skeleton, SkeletonText } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Button } from '@chakra-ui/react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
const CustomButton = ({
  w,
  mt,
  py,
  px,
  color,
  bg,
  bgHover,
  boxShadow,
  border,
  borderColor,
  fontSize,
  text,
  btnIcon,
  isLoading,
  isDisabled,
  isBtnIcon,
}) => {
  return (
    <Box>
      <Button
        w={w || '100%'}
        mt={mt || '2rem'}
        py={py || '2rem'}
        px={px}
        color={color || '#fff'}
        bg={bg || 'brand.green100'}
        borderRadius="10px"
        boxShadow={'0px 4px 20px rgba(0, 175, 84, 0.25)'}
        borderColor={borderColor}
        type="submit"
        cursor="pointer"
        fontSize={fontSize || '1.42rem'}
        isLoading={isLoading}
        isDisabled={isDisabled}
        _hover={{
          bg: bgHover || 'green',
          color: '#fff',
        }}
        _focus={{
          borderColor: 'none',
          boxShadow: 'none',
        }}
      >
        {isBtnIcon && (
          <Icon
            cursor="pointer"
            color="brand.green100"
            fontSize="2.5rem"
            mr={['1rem', '3rem', '1rem', '3rem']}
            as={btnIcon}
          />
        )}{' '}
        {text}
      </Button>
    </Box>
  );
};

export { CustomButton };

const CustomLoader = () => {
  return (
    <Center bg="brand.gold300" h="100vh">
      <Box
        className="custom-loader"
        w={['50px', '50px', '50px', '70px']}
        h={['50px', '50px', '50px', '70px']}
        borderRadius="50%"
        bg="#CBA052"
        transformOrigin="50% 40%"
      />
    </Center>
  );
};

export { CustomLoader };

export const BoxCardLoader = ({ rounded = '2.4rem', h = '300px', mt }) => {
  return <Skeleton w="100%" h={h} mt={mt} {...{ rounded }} />;
};

export const TextLoader = ({ mt, noOfLines }) => {
  return (
    <SkeletonText
      startColor="#A0AEC0"
      endColor="#718096"
      w="100%"
      mt={mt}
      noOfLines={noOfLines}
      spacing="4"
      skeletonHeight="4"
      color="brand.gray200"
    />
  );
};

export const RectangularCardLoader = ({
  rounded = '2.4rem',
  h = '300px',
  mt,
}) => {
  return <Skeleton w="100%" h={h} mt={mt} {...{ rounded }} />;
};

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const location = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleNavigate = () => {
    navigate('/');
  };

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:3005/api/v1/products/static?product_id=${id}`
    );
    const jsonData = await result.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toast = '';

  const handleAddToCart = () => {
    // if (!selectedSize) {
    //   return toast({
    //     status: 'error',
    //     title: 'Select a size before adding to cart',
    //   });
    // }

    alert("{status: 'success' title: 'Item added to cart'}");
  };

  const handleBuyNow = () => {
    handleAddToCart();

    if (selectedSize) {
      setTimeout(() => {
        // router.push('/cart');
      }, 700);
    }
  };

  return (
    <Box bg="brand.white100">
      <Box maxW="1280px" mx="auto" px="3rem">
        <Box as="span" mb="2rem">
          <Icon
            as={BiChevronLeft}
            fontSize="3rem"
            cursor="pointer"
            onClick={() => {
              handleNavigate();
            }}
          />
        </Box>

        <SimpleGrid
          columns={[1, 2, 2, 2]}
          gap="4rem"
          borderBottom="1px solid"
          borderColor="brand.white600"
          pb="2rem"
        >
          {/* //loading */}
          {/* <Box>
            <BoxCardLoader rounded=".6rem" h="450px" />
            <HStack mt="2rem" spacing="2rem" mx="4rem">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <BoxCardLoader key={idx} rounded=".6rem" h="70px" />
                ))}
            </HStack>
          </Box> */}
          {/* condiiton */}
          <Box>
            <Box w="100%" borderRadius="1rem" overflow="hidden">
              <Image
                src={data?.products[0]?.imageUrl}
                height={500}
                width={500}
                alt="Product Image"
              />
            </Box>

            <Flex my="2rem" w="65%" mx="auto">
              <Box
                key={1}
                // onClick={() => setSelectedImage(item)}
                p=".8rem 1.5rem"
                fontSize="1.5rem"
                fontWeight="500"
                bg="transparent"
                border="1px solid"
                cursor="pointer"
                // borderColor={
                //   selectedImage === item ? 'brand.grey300' : 'transparent'
                // }
                borderRadius=".5rem"
              >
                <Image
                  src={data?.products[0]?.imageUrl}
                  height={70}
                  width={70}
                  alt="Product Image"
                />
              </Box>
            </Flex>
          </Box>
          {/* {isLoadingParticulaProductData ? ( */}
          {/* <Box>
            <TextLoader noOfLines={2} />
            <TextLoader mt="4rem" noOfLines={4} />
            <TextLoader mt="4rem" noOfLines={4} />
            <HStack mt="4rem">
              <BoxCardLoader rounded=".6rem" h="40px" />
              <BoxCardLoader rounded=".6rem" h="40px" />
            </HStack>
          </Box> */}
          {/* condiiton */}
          <Box>
            <Text
              fontSize={['2.5rem', '3.2rem', '2.5rem', '3.2rem']}
              fontWeight="600"
            >
              {data?.products[0]?.name}
            </Text>
            <Flex
              align="center"
              justify="space-between"
              borderBottom="1px solid"
              borderColor="brand.white600"
              pb="2rem"
            >
              <Flex
                align="center"
                fontSize={['1.5rem', '1.8rem']}
                color="brand.gold100"
                mt=".8rem"
              >
                {Array(5)
                  .fill('')
                  .map((_, i) => {
                    const roundedRating =
                      Math.round(data?.products[0]?.rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                      return (
                        <BsStarFill
                          key={i}
                          style={{ marginLeft: '1' }}
                          color={
                            i < data?.products[0]?.rating ? 'orange' : 'red'
                          }
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

                <Text ml="1rem">{data?.products[0]?.rating}</Text>
              </Flex>

              <Icon cursor="pointer" color="brand.red100" fontSize="1.5rem">
                {<GoHeart />}
              </Icon>
            </Flex>

            <Box>
              <Text
                color="brand.blue100"
                fontSize={['2.5rem', '4.2rem', '2.5rem', '4.2rem']}
                fontWeight="600"
              >
                ${data?.products[0]?.rate}
              </Text>
              <Text
                color="brand.grey300"
                fontSize={['1.5rem', '1.5rem', '1.5rem', '1rem']}
                fontWeight="300"
              >
                Shipping: $700
              </Text>

              <Box mt="2rem">
                <Text
                  fontSize={['1.6rem', '1.8rem', '1.5rem', '1.8rem']}
                  fontWeight="600"
                  color="brand.grey300"
                >
                  Size
                </Text>
                <HStack spacing={4} mt="1rem">
                  {['sm', 'md', 'lg', 'xl', '2xl', '3xl'].map(size => (
                    <Tag
                      onClick={() => setSelectedSize(size)}
                      cursor="pointer"
                      size="lg"
                      key={size}
                      p={['.8rem', '.8rem 1.5rem']}
                      fontSize={['1.5rem', '1.5rem', '1.2rem', '1.5rem']}
                      fontWeight="500"
                      bg="transparent"
                      border="1px solid"
                      borderColor={
                        selectedSize === size
                          ? 'brand.grey300'
                          : 'brand.white500'
                      }
                      borderRadius=".5rem"
                      _hover={{
                        borderColor: 'orange',
                        color: 'orange',
                      }}
                    >
                      {' '}
                      {size}
                    </Tag>
                  ))}
                </HStack>
              </Box>

              <Box mt="2rem">
                <Text
                  fontSize={['1.6rem', '1.8rem', '1.5rem', '1.8rem']}
                  fontWeight="600"
                  color="brand.grey300"
                >
                  Product Details
                </Text>
                <Text fontSize={['1.5rem', '1.5rem', '1.3rem', '1.5rem']}>
                  {data?.products[0]?.description}
                </Text>
                <HStack w="100%" gap="1rem">
                  <Box w="100%" onClick={handleAddToCart}>
                    <CustomButton
                      {...{
                        text: 'Add to cart',
                        btnIcon: AiOutlineShoppingCart,
                        py: ['2rem', '2.5rem'],
                        bg: 'transparent',
                        color: 'brand.green300',
                        boxShadow: '0',
                        border: '.2rem solid',
                        borderColor: 'brand.green300',
                        fontSize: ['1.5rem', '1.8rem', '1.6rem', '1.8rem'],
                        bgHover: 'green',
                        isBtnIcon: true,
                      }}
                    />
                  </Box>

                  <Box w="100%" onClick={handleBuyNow}>
                    <CustomButton
                      {...{
                        text: 'Buy Now',
                        py: ['2rem', '2.5rem'],
                        // border: '.2rem solid',
                        borderColor: 'transparent',
                        color: 'black',
                      }}
                    />
                  </Box>
                </HStack>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export { ProductDetails };
