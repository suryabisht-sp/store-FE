import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import SidebarWithHeader from './components/sidebar/SideBar';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import NavBar from './components/navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './SignUP/SignUp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar admin={'false'} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* <SidebarWithHeader>
        <Product />
      </SidebarWithHeader> */}
    </ChakraProvider>
  );
}

export default App;
