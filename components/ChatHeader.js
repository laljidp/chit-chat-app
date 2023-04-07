import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import CopyLinkButton from './CopyLinkButton'

function ChatHeader({ title, onDelete, joiningLink }) {
  return (
    <Box className="container.sm">
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'bold'} color={'telegram.500'} fontSize={20}>
          {title}
        </Text>
        <Box display={'flex'} alignItems={'center'}>
          <CopyLinkButton link={joiningLink} />
          <Button
            colorScheme="red"
            size={'sm'}
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
