import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { addUserToRoom, getRoomInfo } from '../../server/rooms.fb'
import AnimLogo from '../../components/AnimLogo'
import InvalidRequest from '../../components/InvalidRequest'
import { useContext, useState } from 'react'
import { UContext } from '../../context/userContext'
import { generateUID } from '../../utils'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  const roomID = context.params.roomId
  const response = await getRoomInfo(roomID)
  return {
    props: {
      room: response?.data || {},
    },
  }
}

export default function JoinRoom({ room }) {
  const [isSubmitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const { setUserInfo, addRoom } = useContext(UContext)
  const router = useRouter()
  const toast = useToast()

  const handleJoinRoom = async () => {
    setSubmitting(true)
    const isUserNameExists = room?.joined?.find((o) => o.userName === name)
    if (isUserNameExists) {
      toast({
        title: 'Warning',
        description: 'User name already exists in room ! Try another name',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
      setSubmitting(false)
      return
    }
    const result = await addUserToRoom(room?.id, {
      id: generateUID(),
      userName: name,
      ua: navigator.userAgent,
      isAdmin: false,
    })
    if (result.success) {
      // Create token for the user
      const roomInfo = {
        userName: name,
        title: room?.title,
        isAdmin: false,
        roomID: room?.id,
      }
      setUserInfo(roomInfo)
      addRoom(roomInfo)
      router.push(`/chat-room/${room.id}`)
    } else {
      setSubmitting(false)
      toast({
        title: 'Error',
        description: 'Something went wrong! Try again later',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    }
    // call firebase function to join the room
  }

  if (!room?.id) {
    return <InvalidRequest />
  }

  return (
    <Container
      className="bgGradientEffect"
      display={'flex'}
      justifyContent={'center'}
    >
      <Box>
        <Grid
          width={'100%'}
          alignItems={'center'}
          flexDirection={'column'}
          placeContent={'center'}
          placeItems={'center'}
          gridGap={5}
          marginTop={40}
        >
          <AnimLogo />
          <Text as="b" color={'facebook.500'} fontSize={24}>
            {room?.title || ''}
          </Text>
          <Text fontWeight={500}>
            Invited by <b>: {room?.userName}</b>
          </Text>
          <Input
            name="name"
            disabled={isSubmitting}
            value={name}
            onChange={({ target }) => setName(target.value)}
            fontWeight={600}
            placeholder="Enter your name"
          />
          <Button
            isDisabled={!name?.trim()}
            isLoading={isSubmitting}
            colorScheme="facebook"
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        </Grid>
      </Box>
    </Container>
  )
}
