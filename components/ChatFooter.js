import { Box, Button, Input, Icon, Flex } from '@chakra-ui/react'
import { GrAttachment } from 'react-icons/gr'
import { TbSend } from 'react-icons/tb'

export default function ChatFooter(options) {
  return (
    <Box position={'fixed'} bottom={0} left={0} width="100%">
      <Flex display={'flex'}>
        <Box position={'relative'} width="100%">
          <Input
            w={'100%'}
            placeholder="Type message here..."
            size={'lg'}
            paddingRight={10}
            borderRadius={'0 5px 0 5px'}
          />
          <Box position={'absolute'} right={0} bottom={1}>
            <Button borderRadius={'full'} bg="white">
              <Icon w={5} h={5} color="red.500" as={GrAttachment} />
            </Button>
          </Box>
        </Box>
        <Box>
          <Button background="purple.300" rounded={'0 5px 0 5px'} h={12} w={18}>
            <Icon w={8} h={8} color="white" as={TbSend} />
          </Button>
        </Box>
      </Flex>
      <Box height={5} bg="green.100" />
    </Box>
  )
}
