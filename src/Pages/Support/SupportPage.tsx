import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, VStack, useToast } from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  // Inicialize o EmailJS com o seu User ID
  emailjs.init('wZKxLB3hLzvzvbYh2');  // Coloque o User ID do painel do EmailJS aqui

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifique se todos os campos foram preenchidos
    if (!name || !email || !message) {
      toast({
        title: 'Por favor, preencha todos os campos!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Use o emailjs.sendForm para enviar o formulário
    const serviceID = 'service_597sg8i';  // O ID do serviço configurado no painel do EmailJS
    const templateID = 'template_1eo5w8k';  // O ID do template configurado no painel do EmailJS

    emailjs.sendForm(serviceID, templateID, e.target as HTMLFormElement)
      .then(
        () => {
          toast({
            title: 'Sua mensagem foi enviada com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setName('');
          setEmail('');
          setMessage('');
        },
        (err) => {
          toast({
            title: 'Ocorreu um erro ao enviar sua mensagem!',
            description: err.text,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      );
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading mb={6} textAlign="center">
        Suporte - Envie sua mensagem
      </Heading>
      <VStack spacing={4} align="stretch">
        <form id="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="from_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Mensagem</FormLabel>
            <Textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sua mensagem"
              size="lg"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Enviar Mensagem
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default SupportPage;
