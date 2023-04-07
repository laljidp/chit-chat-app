import React from 'react'
import { Box, Container, Image, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { UContext } from '../context/userContext'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import ImagesPreview from './ImagesPreview'

function ChatBody({ data: messages }) {
  const {
    user: { userName = '' },
  } = useContext(UContext)

  console.log('messages', messages)

  return (
    <Container maxW={'container.lg'} padding={'10px 5px'}>
      {messages.length === 0 && (
        <Text
          textAlign={'center'}
          bg={'facebook.300'}
          padding={2}
          color={'white'}
          borderRadius={'2xl'}
        >
          No chit chat yet. you can start by sending a message.
        </Text>
      )}
      {messages.map((message) => {
        const isMe = userName === message.sender
        return (
          <BoxAlign key={message.id} me={isMe}>
            <Message bgColor={isMe ? 'facebook.500' : 'telegram.500'} me={isMe}>
              <Text as="h5" color="white" fontWeight={500}>
                {isMe ? 'You' : message.sender}&nbsp;
                <small>( {moment(message.createdAt).fromNow()} )</small>
              </Text>
              <hr />
              <ImagesPreview images={message.attachments || []} />
              <Text marginTop={3} fontWeight={500}>
                {message.text}
              </Text>
            </Message>
          </BoxAlign>
        )
      })}
    </Container>
  )
}

const BoxAlign = styled(Box)(
  {
    width: '100%',
    display: 'inline-flex',
    marginTop: '10px',
  },
  (props) =>
    props.me ? { justifyContent: 'end' } : { justifyContent: 'start' }
)

const Message = styled(Box)(
  {
    fontSize: '.9rem',
    color: 'gray',
    padding: '.5rem',
    maxWidth: '75%',
    width: 'fit-content',
    border: '1px solid teal',
    color: '#fff',
    borderRadius: '10px 25px',
    fontWeight: '600',
    fontFamily: 'Helvetica',
    display: 'grid',
  },
  (props) =>
    props.me ? { borderRadius: '25px 10px' } : { borderRadius: '10px 25px' }
)

const MemoizedChatBody = React.memo(ChatBody)

export default MemoizedChatBody
