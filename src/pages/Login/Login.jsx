import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const loginHandler = async () => {
    try {
      const result = await fetch(`http://localhost:3005/api/v1/user/login`, {
        method: 'POST', // Use POST method for login
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!result.ok) {
        // Handle non-successful responses (e.g., server error, bad request
        const text = await result.json();
        if (result.status === 401) {
          toast({
            title: await `${text.message}`,
            position: 'top-left',
            status: 'warning', // const text = await result.json;
            isClosable: true,
            duration: 3000,
          });
          return;
        }
        toast({
          title: await `${text.msj}`,
          position: 'top-left',
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
        return;
      }
      const jsonData = await result.json();
      // Assuming the response format is an object with a 'products' property
      if (jsonData && jsonData.accessToken) {
        setData(jsonData.accessToken);
        toast({
          title: `Successfully Logged-in`,
          position: 'top-left',
          status: 'success',
          isClosable: true,
          duration: 3000,
        });
        sessionStorage.setItem('accessToken', jsonData.accessToken);
        navigate('/');
      } else {
        // Handle cases where the response is not as expected
        console.error('Unexpected response format:', jsonData);
      }
    } catch (error) {
      // Handle any other errors that might occur during the fetch
      toast({
        title: await `${error}`,
        position: 'top-left',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  loginHandler();
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                New user?{' '}
                <Link color={'blue.400'} href={'/signup'}>
                  Click here
                </Link>{' '}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
