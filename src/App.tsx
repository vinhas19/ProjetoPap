import {
  Box,
  ChakraProvider,
  Spacer,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from "./Pages/Home/HomePage"

import Header from "./Components/Header/Header"
import Body from "./Components/Body/Body"
import Footer from "./Components/Footer/Footer"
import bg from './Assets/Images/background.png';
import SchedulePage from "./Pages/Shedule/SchedulePage";




export const App = () => (
  <ChakraProvider theme={theme}>
      <Box  id="bg" pt="1em" w="100%" h="100%" maxW="100%" maxH="100%" minH="100vh" backgroundImage={bg} backgroundRepeat="no-repeat" backgroundSize="cover">
        <Header/>
        <Body h="calc(100vh - 13em)" minH="calc(100vh - 13em)" pt="2.5em" >
          <BrowserRouter>
          <AnimatePresence exitBeforeEnter></AnimatePresence>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/Schedule" element={<SchedulePage/>}/>
            </Routes>
          </BrowserRouter>
          <Spacer h="100%"/>
          <Footer/>
        </Body>
      </Box>
  </ChakraProvider>
)
