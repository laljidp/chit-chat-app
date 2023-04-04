import { Box, Text } from '@chakra-ui/react'

export default function ChatHeader({ title }) {
  console.log('re-rendering ChatHeader.....')
  return (
    <Box className="container.sm">
      <Text fontWeight={'bold'} color={'telegram.500'} fontSize={20}>
        {title}
      </Text>
    </Box>
  )
}
