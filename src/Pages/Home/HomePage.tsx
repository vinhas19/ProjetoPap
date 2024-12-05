import React from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Centralizar conteúdo */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%" // Usa toda a altura da tela
        textAlign="center"
        paddingTop="10em"
        
      >
        <VStack spacing={6}>
          {/* Texto acima */}
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Do Your Schedules
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="white">
          Start With SmartSchedule !
          </Text>
          {/* Botão */}
          <Button
            as={Link}
            to="/Sign"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.800' }}
            borderRadius="40px"
            px={8}
            py={4}
            fontSize="lg"
          >
            Create an account
           
          </Button>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default HomePage;
