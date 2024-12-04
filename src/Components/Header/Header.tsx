import React from 'react';
import { Box, Image, Link, HStack, BoxProps } from '@chakra-ui/react';
import Lb from '../../Assets/LogoBranco.png';
import pf from '../../Assets/Profile.png';

const Header: React.FC<BoxProps> = (props) => {
  // Verifica se o usuário está logado com base no token armazenado
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <Box
      as="nav"
      className="header glass"
      maxW="90%"
      w="90%"
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

      {/* Menu */}
      <HStack spacing={8} className="menu">
        <Link href="/SchedulePage" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
          Schedule
        </Link>
      </HStack>

      {/* Ícone de perfil ou botões */}
      <Box marginLeft="auto" className="user-actions">
        {isLoggedIn ? (
          // Ícone de perfil
          <Link href="/profile" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
            <Image src={pf} boxSize="40px" width="45px" alt="Profile" />
          </Link>
        ) : (
          // Botões de Login e Register
          <HStack spacing={4} className="button-container">
            <Link
              href="/LoginRegister" // Redireciona para a página de login
              className="login-button"
              color="black"
            >
              Login
            </Link>
            <Link
              href="/LoginRegister" // Redireciona para a página de registro
              className="register-button"
              _hover={{ color: 'gray.400' }}
            >
              Register
            </Link>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default Header;
