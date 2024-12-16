import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Heading } from '@chakra-ui/react';

const FAQsPage: React.FC = () => {
  return (
    <Box p="6" maxW="800px" mx="auto" mt="8">
      <Heading size="lg" mb="6" textAlign="center">
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              What is this platform for?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            This platform allows you to create, manage, and organize your schedules with ease.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              How do I create an account?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Click the "Register" button on the homepage, fill out the required fields, and submit.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Is my data secure?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Yes, we use modern encryption methods to protect your personal information.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FAQsPage;
