import { Box, Container, Spinner, Text } from '@chakra-ui/react'

export default function PageLoader({ className = '' }) {
  return (
    <Container
      width="100%"
      alignItems="center"
      display="flex"
      justifyContent="center"
      height="85vh"
      className={className}
    >
      <Box display={'grid'} lineHeight={2}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text marginTop={2}>Loading...</Text>
      </Box>
    </Container>
  )
}
