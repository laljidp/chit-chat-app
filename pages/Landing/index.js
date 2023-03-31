import { Container, Flex, Input, Button, Grid } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import AnimLogo from '../../components/AnimLogo'

export default function Home() {
  const handleStartChannel = (event) => {
    event.preventDefault()
    console.log('handle submitting..')
  }

  return (
    <Container maxW="container.sm">
      <Flex justifyContent={'center'} alignItems="center" height={'75vh'}>
        <Grid justifyContent={'center'} alignItems="normal">
          <Flex alignItems="center" justifyContent="center" borderRadius="10">
            <AnimLogo />
          </Flex>
          <form onSubmit={handleStartChannel}>
            <Input
              mt={5}
              placeholder="Enter chitchat title"
              size="lg"
              required
              color={'purple'}
              minLength={3}
              fontWeight="500"
            />
            <Input
              mt={5}
              placeholder="Enter your name"
              size="lg"
              color={'purple'}
              minLength={3}
              required
              fontWeight="500"
            />
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="purple"
              size={'md'}
              mt="5"
              type="submit"
            >
              START
            </Button>
          </form>
        </Grid>
      </Flex>
    </Container>
  )
}
