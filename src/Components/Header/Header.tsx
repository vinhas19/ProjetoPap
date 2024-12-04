import React from 'react';
import { Box, Image, Link, HStack, Button, BoxProps } from '@chakra-ui/react';
import Lb from '../../Assets/LogoBranco.png';
import pf from '../../Assets/Profile.png';

const Header: React.FC<BoxProps> = (props) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <Box
      as="nav"
      className="header"
      maxW="100%"
      w="100%"
      mx="auto"
      px="1em"
      borderRadius="15px"
      h="4.5em"
      {...props}
    >
      {/* Logo */}
      <Box className="logo">
        <Link href="/" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
          <Image src={Lb} alt="LogoSS" boxSize="90px" width="200px" />
        </Link>
      </Box>

      {/* Ícone de perfil ou botões */}
      <Box marginLeft="auto" className="user-actions">
        {isLoggedIn ? (
          <Link href="/profile" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
            <Image src={pf} boxSize="40px" width="45px" alt="Profile" />
          </Link>
        ) : (
          <HStack spacing={1} className="button-container">
            <Button
              as={Link}
              href="/LoginRegister"
              color="black"
              bg="gray.200"
              _hover={{ bg: 'gray.300' }}
              borderRadius="40px"
              px={6}
              py={2}
              fontSize="md"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/LoginRegister"
              color="white"
              bg="black"
              _hover={{ bg: 'gray.800' }}
              borderRadius="40px"
              px={6}
              py={2}
              fontSize="md"
            >
              Register
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default Header;
