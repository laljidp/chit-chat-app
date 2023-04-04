import { Box, Container } from '@chakra-ui/react'
import { useContext } from 'react'
import { UContext } from '../context/userContext'
import styled from '@emotion/styled'

export default function ChatBody({ data: messages }) {
  const {
    user: { userName = '' },
  } = useContext(UContext)

  return (
    <Container padding={'10px 5px'}>
      {messages.map((message) => (
        <BoxAlign me={userName === message.sender}>
          <Message key={message.id}>{message.text}</Message>
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

const Message = styled(Box)({
  fontSize: '.9rem',
  color: 'gray',
  padding: '.5rem',
  maxWidth: '65%',
  width: 'fit-content',
  border: '1px solid gray',
  borderRadius: '10px',
  fontWeight: '600',
  fontFamily: 'Helvetica',
})
