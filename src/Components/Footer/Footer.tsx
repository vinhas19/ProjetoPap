import React from 'react';
import { Box, Text, Button, Flex, HStack } from '@chakra-ui/react';
import { FiInfo } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <Box
      color="white"
      position="fixed"
      bottom="0"
      width="100%"
      px={4}
      py={3}
    >
      <Flex justify="space-between" align="center">
        <Box className="glass" padding="1em">
          <HStack spacing={2} align="center">
            <FiInfo size={18} />
            <Text fontWeight="bold" fontSize="lg">
              Do your schedule now!
            </Text>
          </HStack>
          <Text fontSize="sm">Register now.</Text>
        </Box>
        <HStack spacing={2} align="center">
          <Button className="glass" size="sm" color="white" display="flex" alignItems="center">
            <AiOutlineQuestionCircle size={18} style={{ marginRight: "8px" }} />
            Help
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
