import React, { useEffect } from 'react';
import { Box, Image, Link, HStack, Text, Button } from '@chakra-ui/react';
import Lb from '../../Assets/LogoBranco.png';
import pf from '../../Assets/Profile.png';
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  // Verifica se o usuário está logado com base no token armazenado
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // UseEffect to disable scrolling on page load
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // Ensure no scroll on both body and html

    // Cleanup to restore scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = ''; // Reset overflow
      document.documentElement.style.overflow = ''; // Reset overflow
    };
  }, []);

  return (
    <Box>
      {/* Cabeçalho */}
      <Box
        as="nav"
        className="header glass"
        maxW="90%"
        w="90%"
        mx="auto"
        px="1em"
        borderRadius="15px"
        h="4.5em"
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
              <FaBars color="white" />
              <Link
                href="/LoginRegister" // Redireciona para a página de login
                className="login-button"
                _hover={{ color: 'gray.400' }}
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

      {/* Conteúdo centralizado */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(75vh - 4.5em)" /* Subtrai a altura do cabeçalho para centralizar corretamente */
        flexDirection="column"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
          DO YOUR SCHEDULES RIGHT NOW BY CREATING A PROFILE
        </Text>
        <Button
          as={Link}
          href="/CreateAccount"
          bg="black"
          color="white"
          borderRadius="20px"
          px={6}
          py={4}
          _hover={{ bg: 'gray.700', textDecoration:'none'}}
        >
          Create account
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
