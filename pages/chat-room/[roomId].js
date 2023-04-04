import { useContext, useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import useLoading from '../../hooks/useLoading'
import ChatHeader from '../../components/ChatHeader'
import ChatFooter from '../../components/ChatFooter'
import ChatBody from '../../components/ChatBody'
import InvalidRequest from '../../components/InvalidRequest'
import { getRoomInfo } from '../../api/rooms.fb'
import { Box, useToast } from '@chakra-ui/react'
import { UContext } from '../../context/userContext'
import { getChatsByRoom, saveMessage } from '../../api/message.db'

export async function getServerSideProps(context) {
  const roomID = context.params.roomId
  const response = await getRoomInfo(roomID)
  console.log('Group Info ===>>', roomID)
  return {
    props: {
      group: response?.data || {},
      roomID: roomID,
    },
  }
}

let unsubscribe

export default function ChatRoom({ group, roomID }) {
  const isLoading = useLoading()
  const { user } = useContext(UContext)
  console.log('user:', user)
  const toast = useToast()
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState({
    text: '',
    attachments: [],
  })

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

    const payload = {
      ...message,
      sender: user?.userName,
      roomID: roomID,
      createdAt: new Date(),
      status: '',
    }
    console.log('Payload', payload)
    const result = await saveMessage(payload)
    console.log('result', result)
    if (result.success) {
      console.log('Message saved...')
    } else {
      toast({
        title: 'Message failed to send!',
        position: 'top',
        status: 'error',
      })
    }
    // call Firebase API to save the message
  }

  const fetchChatsByRoom = async () => {
    console.log('Hello==>', roomID)
    const response = await getChatsByRoom(roomID)
    console.log('Group Info ===>>', response)
    if (response.success) {
      setChats(response.data)
    }
  }

  useEffect(() => {
    fetchChatsByRoom()
  }, [])

  if (!user?.userName && !isLoading) {
    return <InvalidRequest />
  }

  console.log('chats', chats)

  return (
    <Box>
      {isLoading && <PageLoader />}

      {!isLoading && (
        <Box>
          <Box padding={4} bgGradient="linear(to-r, green.100, pink.300)">
            <ChatHeader title={group.title} />
          </Box>
          <Box height={'calc(100vh - 130px)'}>
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
