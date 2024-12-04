import React, { useState } from 'react';
import { Box, Image, Link, HStack, BoxProps, Button } from '@chakra-ui/react';
import Lb from '../../Assets/LogoBranco.png';


const Header: React.FC<BoxProps> = (props) => {
  
  return (
    <Box as="nav" className="header glass" maxW="90%" w="90%" mx="auto" px="1em"  borderRadius="15px" h="4.5em" {...props}>
      <Box className="logo">
      <Link href="/" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
        <Image src={Lb} alt="LogoSS" boxSize="90px" width="200px"/>
        </Link>
      </Box>
      <HStack spacing={8} className="menu">
        
        
        <Link href="/SchedulePage" className="navigation-bar-a" _hover={{ color: 'gray.400' }}>
          Schedule
        </Link>
        


      </HStack>


    </Box>
  );
}

export default Header;
