import { useContext, useEffect, useRef, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import useLoading from '../../hooks/useLoading'
import ChatHeader from '../../components/ChatHeader'
import ChatFooter from '../../components/ChatFooter'
import ChatBody from '../../components/ChatBody'
import InvalidRequest from '../../components/InvalidRequest'
import { getRoomInfo } from '../../api/rooms.fb'
import { Box, useToast } from '@chakra-ui/react'
import { UContext } from '../../context/userContext'
import {
  getChatsByGroupQuery,
  getChatsByRoom,
  saveMessage,
} from '../../api/message.db'
import { onSnapshot } from 'firebase/firestore'

export async function getServerSideProps(context) {
  const roomID = context.params.roomId
  const response = await getRoomInfo(roomID)
  console.log('Group Info ===>>', roomID)
  return {
    props: {
      room: response?.data || {},
      roomID: roomID,
    },
  }
}

export default function ChatRoom({ room, roomID }) {
  const isLoading = useLoading()
  const { user } = useContext(UContext)
  const toast = useToast()
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState({
    text: '',
    attachments: [],
  })
  const chatBodyRef = useRef(null)

  const handleChange = (data) => {
    setMessage({ ...message, ...data })
  }

  const handleSaveMessage = async () => {
    if (!message?.text?.trim() && message.attachments.length === 0) {
      toast({
        title: 'Message and attachments are empty! Required one of them',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    // call Firebase API to save the message
    const payload = {
      ...message,
      sender: user?.userName,
      roomID: roomID,
      createdAt: new Date(),
      status: '',
    }
    const result = await saveMessage(payload)
    if (result.success) {
      setMessage({
        text: '',
        attachments: [],
      })
    } else {
      toast({
        title: 'Message failed to send!',
        position: 'top',
        status: 'error',
      })
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      getChatsByGroupQuery(roomID),
      (querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        setChats(data)
        setTimeout(() => {
          chatBodyRef.current.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: 'smooth',
          })
        }, 500)
      }
    )

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  if (!room?.id && user?.userName) {
    return <InvalidRequest />
  }

  return (
    <Box>
      {isLoading && <PageLoader />}

      {!isLoading && (
        <Box>
          <Box
            padding={4}
            bgGradient="linear(to-r, green.100, pink.300)"
            position={'fixed'}
            width={'100%'}
          >
            <ChatHeader title={room.title} />
          </Box>
          <Box
            height={'calc(100vh - 70px)'}
            ref={chatBodyRef}
            overflow={'auto'}
            paddingTop={'70px'}
          >
            <ChatBody data={chats} />
          </Box>
          <Box>
            <ChatFooter
              text={message.text}
              attachments={message.attachments}
              onSaveMessage={handleSaveMessage}
              handleChange={handleChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}
