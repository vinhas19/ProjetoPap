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
        title: 'Please fill in all fields!',
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
            title: 'Your message has been sent successfully!',
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
            title: 'There was an error sending your message, please try again later!',
            description: err.text,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      );
  };

  return (
    <Box p={4}  minW="600px" mx="auto"  className='glass-nob'>
      <Heading textAlign="center" fontWeight="bold" color="#2C2C2C">
      Support 
      </Heading>
      <VStack mb={4} spacing={4} align="stretch" >
        <form id="form" onSubmit={handleSubmit}>
          <FormControl isRequired >
            <FormLabel fontWeight="bold" color="#2C2C2C" >Name</FormLabel>
            <Input
              borderColor="black"
              type="text"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </FormControl >
          <FormControl isRequired>
            <FormLabel fontWeight="bold" color="#2C2C2C" >Email</FormLabel>
            <Input
              borderColor="black"
              type="email"
              name="from_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </FormControl>
          <FormControl isRequired >
            <FormLabel fontWeight="bold" color="#2C2C2C" >Message</FormLabel>
            <Textarea
              borderColor="black"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              size="lg"
              height="100px"
            />
          </FormControl>
          <Button type="submit" color="white" bgColor="#2C2C2C" marginTop="1em">
          Send Message
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default SupportPage;
