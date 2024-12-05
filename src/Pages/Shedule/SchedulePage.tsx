import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  VStack,
  HStack,
  Text,
  Link,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBell, FaCogs, FaSearch, FaCalendarAlt, FaChartBar, FaEnvelope, FaHome, FaQuestionCircle } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900'); // Background color for dark mode
  const textColor = useColorModeValue('white', 'gray.300'); // Text color for dark mode

  return (
    <Flex height="100vh" width="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box w="30%" p={4} bg="gray.900" display="flex" flexDirection="column" justifyContent="space-between">
        {/* Logo */}
        <Box mb={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            SmartSchedule
          </Text>
        </Box>

        {/* Menu */}
        <VStack spacing={6} align="start">
          <Link href="#" display="flex" alignItems="center">
            <FaHome style={{ marginRight: '8px' }} /> Dashboard
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaEnvelope style={{ marginRight: '8px' }} /> Message
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaCalendarAlt style={{ marginRight: '8px' }} /> Schedule
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaChartBar style={{ marginRight: '8px' }} /> Analytics
          </Link>
        </VStack>

        {/* Support */}
        <VStack spacing={6} align="start" mt={10}>
          <Link href="#" display="flex" alignItems="center">
            <FaCogs style={{ marginRight: '8px' }} /> Setting
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaQuestionCircle style={{ marginRight: '8px' }} /> Faq
          </Link>
        </VStack>

        {/* Profile */}
        <HStack spacing={4} mt={10} align="center">
          <Avatar name="Admin" />
          <Text>Admin</Text>
        </HStack>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={8}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch />
              </InputLeftElement>
              <Input type="text" placeholder="Search" />
            </InputGroup>
            <IconButton icon={<FaBell />} aria-label="Notifications" />
            <IconButton icon={<FaCogs />} aria-label="Settings" />
          </HStack>
        </Flex>

        {/* Content Area */}
        <Box bg="gray.700" borderRadius="md" p={8}>
          <Text>Overview Schedules</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
