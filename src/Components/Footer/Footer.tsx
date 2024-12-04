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
          <Menu placement="top-end" >
            <MenuButton
              as={Button}
              className="glass"
              size="sm"
              color="white"
              display="flex"
              alignItems="center"
              rightIcon={<ChevronDownIcon />}
            >
              <HStack spacing={2}>
                <AiOutlineQuestionCircle size={18} />
                <Text>Help</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => window.location.href = "/info"}>
                Information
              </MenuItem>
              <MenuItem onClick={() => window.location.href = "/faqs"}>
                FAQs
              </MenuItem>
              <MenuItem onClick={() => window.location.href = "/support"}>
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
