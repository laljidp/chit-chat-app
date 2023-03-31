import { Box, Text } from '@chakra-ui/react'

export default function ChatHeader({ title }) {
  return (
    <Box className="container.sm">
      <Text fontWeight={'bold'} color={'green.500'} fontSize={20}>
        {title}
      </Text>
    </Box>
  )
}
