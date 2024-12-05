import React from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiInfo } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
        
        {/* Left Side Content */}
        <Box className="glass" padding="1em">
          <HStack spacing={2} align="center">
            <FiInfo size={18} />
            <Text fontWeight="bold" fontSize="lg">
              Do your schedule now!
            </Text>
          </HStack>
          <Text fontSize="sm">Register now.</Text>
        </Box>

        {/* Right Side Help Button with Menu */}
        <HStack spacing={2} align="center">
          <Menu placement="top-end">
            <MenuButton
              as={Button}
              className="glass"
              size="sm"
              color="white"
              display="flex"
              alignItems="center"
              rightIcon={<ChevronDownIcon />}
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)', 
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <HStack spacing={2}>
                <AiOutlineQuestionCircle size={18} />
                <Text>Help</Text>
              </HStack>
            </MenuButton>
            <MenuList bgColor="transparent" border="none" textAlign="center">
              {/* Menu Items with Centered Text */}
              <MenuItem 
                onClick={() => window.location.href = "/info"} 
                className="glass-nob"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',  
                  transform: 'scale(1.05)',  
                  transition: 'all 0.3s ease',  
                }}
                _active={{
                  bg: 'rgba(255, 255, 255, 0.3)', 
                  transform: 'scale(1)',  
                }}
                borderRadius="lg"  
                px={4}  
                mb={2}  
                width="100%"  // Make the item take the full width of the menu
                display="flex"
                justifyContent="center"  // Center the text horizontally
              >
                Information
              </MenuItem>
              <MenuItem 
                onClick={() => window.location.href = "/faqs"} 
                className="glass-nob"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }}
                _active={{
                  bg: 'rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1)',
                }}
                borderRadius="lg"
                px={4}
                mb={2} 
                width="100%"  // Make the item take the full width of the menu
                display="flex"
                justifyContent="center"  // Center the text horizontally
              >
                FAQs
              </MenuItem>
              <MenuItem 
                onClick={() => window.location.href = "/support"} 
                className="glass-nob"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }}
                _active={{
                  bg: 'rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1)',
                }}
                borderRadius="lg"
                px={4}
                mb={2}  
                width="100%"  // Make the item take the full width of the menu
                display="flex"
                justifyContent="center"  // Center the text horizontally
              >
                Support
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
