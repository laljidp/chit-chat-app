import { Box, Button, Input, Icon } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function ChatFooter(options) {
  return (
    <Box position={'fixed'} bottom={0} left={0} width="100%">
      <Box position={'relative'}>
        <Input w={'100%'} placeholder="Type message here..." size={'lg'} />
        <Box position={'absolute'} right={1} bottom={6}>
          <Button borderRadius={'3xl'} bg="white">
            <Icon w={8} h={8} color="red.500" as={ArrowForwardIcon} />
          </Button>
        </Box>
        <Box height={5} bg="green.100" />
      </Box>
    </Box>
  )
}
