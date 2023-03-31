// pages/_app.js
import { ChakraProvider, Container, Flex, Spinner } from '@chakra-ui/react'
import Router from 'next/router'
import '../styles/globals.css'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import { useState } from 'react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setPageLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setPageLoading(false)
  })

  return (
    <ChakraProvider theme={theme}>
      {pageLoading ? (
        <Container
          height="100%"
          width="100%"
          alignContent={'center'}
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Container>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  )
}

export default MyApp
