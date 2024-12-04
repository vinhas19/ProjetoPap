import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre Login e Registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveCredentials, setSaveCredentials] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    // Lógica de login
    if (username && password) {
      localStorage.setItem('token', 'user-auth-token'); // Salva o token
      toast({
        title: 'Login realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      window.location.href = '/'; // Redireciona para a página principal
    } else {
      toast({
        title: 'Preencha todos os campos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = () => {
    // Lógica de registro
    if (username && password) {
      localStorage.setItem('token', 'user-auth-token'); // Salva o token
      toast({
        title: 'Registro realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      window.location.href = '/'; // Redireciona para a página principal
    } else {
      toast({
        title: 'Preencha todos os campos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="gray.800"
      w="400px"
      p="6"
      borderRadius="md"
      boxShadow="lg"
      mx="auto"
      mt="10%"
      textAlign="center"
      filter="blur"
    >
      <Heading size="lg" color="white" mb="4">
        {isRegistering ? 'Register' : 'Login'}
      </Heading>
      <VStack spacing="4">
        <FormControl>
          <FormLabel color="gray.300">Username</FormLabel>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.300">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>
        {!isRegistering && (
          <Checkbox
            isChecked={saveCredentials}
            onChange={(e) => setSaveCredentials(e.target.checked)}
            colorScheme="blue"
            color="white"
          >
            Save Credentials
          </Checkbox>
        )}
        <Button
          colorScheme="blue"
          w="full"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? 'Register' : 'Login'}
        </Button>
        <Text color="gray.400">
          {isRegistering ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login' : 'Register'}
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginRegister;
