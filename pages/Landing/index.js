import { Container, Flex, Input, Button, Grid } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import AnimLogo from '../../components/AnimLogo'
import { createGroup } from '../../api/group.fb'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [isSubmitting, setSubmitting] = useState(false)

  const router = useRouter()

  const handleStartChannel = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const userName = formData.get('name')
    setSubmitting(true)
    const response = await createGroup({
      title,
      userName,
      participants: [],
      joined: [],
      createdAt: new Date(),
    })
    if (response.success) {
      console.log('Document created successfully!')
      router.push(`/chat-room/${response.documentID}`)
    }
    setSubmitting(false)
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
              name="title"
              required
              color={'purple'}
              minLength={3}
              fontWeight="500"
            />
            <Input
              mt={5}
              placeholder="Enter your name"
              size="lg"
              name="name"
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
              isLoading={isSubmitting}
            >
              START
            </Button>
          </form>
        </Grid>
      </Flex>
    </Container>
  )
}
