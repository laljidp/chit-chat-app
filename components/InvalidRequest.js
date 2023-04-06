import { Box, Button, Container } from '@chakra-ui/react'
import Link from 'next/link'
import AnimLogo from '../components/AnimLogo'

export default function InvalidRequest({
  errorText = 'Invalid Request',
  errorCode = 404,
}) {
  return (
    <Container
      height={'80vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        lineHeight={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box marginBottom={3}>
          <AnimLogo />
        </Box>
        <Box display={'inline-flex'}>
          <h3>
            <b>{errorCode}</b>
          </h3>{' '}
          &nbsp;&nbsp; | &nbsp;&nbsp;<span>{errorText}</span>
        </Box>
        <Box>
          <Button colorScheme="linkedin" marginTop={10} borderRadius={'3xl'}>
            <Link href="/">Create a new room</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
