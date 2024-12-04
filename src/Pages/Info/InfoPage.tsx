import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const InfoPage: React.FC = () => {
  return (
    <Box p="6" maxW="800px" mx="auto" mt="8">
      <Heading size="lg" mb="6" textAlign="center">
        Information
      </Heading>
      <Text fontSize="md" mb="4">
        Welcome to our platform! Here you can:
      </Text>
      <Text fontSize="md" mb="4">
        - Organize your schedules efficiently.
      </Text>
      <Text fontSize="md" mb="4">
        - Manage your tasks in one place.
      </Text>
      <Text fontSize="md" mb="4">
        - Collaborate with others by sharing schedules.
      </Text>
      <Text fontSize="md">
        For more details, contact our support team or explore the FAQs section.
      </Text>
    </Box>
  );
};

export default InfoPage;
