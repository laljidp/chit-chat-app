import React from 'react'
import { Box, Container, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { UContext } from '../context/userContext'
import styled from '@emotion/styled'
import moment from 'moment/moment'

function ChatBody({ data: messages }) {
  const {
    user: { userName = '' },
  } = useContext(UContext)

  return (
    <Container maxW={'container.lg'} padding={'10px 5px'}>
      {messages.map((message) => (
        <BoxAlign key={message.id} me={userName === message.sender}>
          <Message bgColor={'teal.500'} me={userName === message.sender}>
            <Text as="h1" color="white" fontWeight={600}>
              {message.sender}{' '}
              <small>({moment(message.createdAt).fromNow()})</small>
            </Text>
            <hr />
            <Text marginTop={3} fontWeight={500}>
              {message.text}
            </Text>
          </Message>
        </BoxAlign>
      ))}
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
