import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'

function ChatHeader({ title, onDelete, onInviteClick }) {
  console.log('re-rendering ChatHeader.....')
  return (
    <Box className="container.sm">
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'bold'} color={'telegram.500'} fontSize={20}>
          {title}
        </Text>
        <Box display={'flex'} alignItems={'center'}>
          <Button
            onClick={onInviteClick}
            colorScheme="facebook"
            size={'xs'}
            borderRadius={'3xl'}
          >
            + Invite
          </Button>
          <Button
            colorScheme="red"
            size={'xs'}
            onClick={onDelete}
            borderRadius={'3xl'}
            marginLeft={2}
          >
            Destroy
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default React.memo(ChatHeader)
