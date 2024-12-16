import React, { useState, useEffect } from 'react';
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
} from '@chakra-ui/react';
import {
  FaBell,
  FaCogs,
  FaSearch,
  FaCalendarAlt,
  FaChartBar,
  FaEnvelope,
  FaHome,
  FaQuestionCircle,
} from 'react-icons/fa';

interface Disciplina {
  id: number;
  nome: string;
}

const SchedulePage: React.FC = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('white', 'gray.300');

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [horarios, setHorarios] = useState<(Disciplina | null)[][]>(
    Array.from({ length: 7 }, () => Array(5).fill(null))
  );
  const [unallocated, setUnallocated] = useState<Disciplina[]>([]);

  // Fetch disciplinas da API
  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/disciplina'); // Alterar para a URL correta do backend
      const data = await response.json();
      setDisciplinas(data);
      setUnallocated(data); // Inicialmente, todas as disciplinas estão não alocadas
    } catch (error) {
      console.error('Erro ao carregar disciplinas:', error);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  // Handler para alocar disciplinas na grade
  const handleSelect = (rowIndex: number, colIndex: number, disciplinaId: string) => {
    const selectedDisciplina = disciplinas.find((disciplina) => disciplina.id === Number(disciplinaId)) || null;

    const newHorarios = horarios.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? selectedDisciplina : cell))
    );
    setHorarios(newHorarios);

    // Atualiza a lista de não alocadas
    if (selectedDisciplina) {
      setUnallocated(unallocated.filter((d) => d.id !== selectedDisciplina.id));
    }
  };

  // Handler para liberar uma disciplina de volta às não alocadas
  const handleUnassign = (rowIndex: number, colIndex: number) => {
    const disciplina = horarios[rowIndex][colIndex];
    if (disciplina) {
      setUnallocated([...unallocated, disciplina]);
    }

    const newHorarios = horarios.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? null : cell))
    );
    setHorarios(newHorarios);
  };

  return (
    <Flex height="100vh" width="100vw" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box w="20%" p={4} bg="gray.900" display="flex" flexDirection="column" justifyContent="space-between">
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

        <Flex>
          {/* Disciplinas Não Alocadas */}
          <Box w="25%" bg="gray.700" borderRadius="md" p={4} mr={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Disciplinas Não Alocadas
            </Text>
            <VStack spacing={4} align="stretch">
              {unallocated.map((disciplina) => (
                <Box
                  key={disciplina.id}
                  bg="blue.300"
                  color="white"
                  p={2}
                  borderRadius="md"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {disciplina.nome}
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Grade de Horários */}
          <Box flex={1} bg="gray.700" borderRadius="md" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Grade de Horários
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Segunda</Th>
                  <Th>Terça</Th>
                  <Th>Quarta</Th>
                  <Th>Quinta</Th>
                  <Th>Sexta</Th>
                </Tr>
              </Thead>
              <Tbody>
                {horarios.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    <Td>{rowIndex < 3 ? 'Manhã' : 'Tarde'}</Td>
                    {row.map((cell, colIndex) => (
                      <Td key={`${rowIndex}-${colIndex}`} bg={cell ? 'blue.300' : 'white'}>
                        {cell ? (
                          <Box
                            bg="blue.300"
                            color="white"
                            p={2}
                            borderRadius="md"
                            textAlign="center"
                            cursor="pointer"
                            onClick={() => handleUnassign(rowIndex, colIndex)}
                          >
                            {cell.nome}
                          </Box>
                        ) : (
                          <Select
                            placeholder="Selecionar"
                            value={cell ? String((cell as Disciplina).id) : ''}
                            onChange={(e) => handleSelect(rowIndex, colIndex, e.target.value)}
                          >
                            {unallocated.map((disciplina) => (
                              <option key={disciplina.id} value={disciplina.id}>
                                {disciplina.nome}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SchedulePage;
