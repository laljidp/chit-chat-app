import { Box, Button, Container } from '@chakra-ui/react'
import Link from 'next/link'

export default function InvalidRequest() {
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
        <Box display={'inline-flex'}>
          <h3>
            <b>500</b>
          </h3>{' '}
          &nbsp;&nbsp; | &nbsp;&nbsp;<span> Invalid Requests.</span>
        </Box>
        <Box>
          <Button marginTop={10}>
            <Link href="/">Go to landing page</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
