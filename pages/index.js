import { ChakraProvider, Container } from '@chakra-ui/react'
import LandingPage from './Landing'

export default function MyApp() {
  return (
    <ChakraProvider>
      <Container maxW={'contianer.xl'} className={'bgGradientEffect'}>
        <LandingPage />
      </Container>
    </ChakraProvider>
  )
}
