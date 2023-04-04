import { Box, Button, Input, Icon, Flex, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { TbSend } from 'react-icons/tb'
import ImageLoader from './ImageLoader'

export default function ChatFooter({
  onSaveMessage,
  handleChange,
  text,
  attachments,
}) {
  const shouldButtonDisabled = !text?.trim() && attachments.length === 0
  const fileRef = useRef(null)

  const handleAttachmentClick = () => {
    fileRef.current.click()
  }

  console.log('attachment clicked', attachments)

  return (
    <Box position={'fixed'} bottom={0} left={0} width="100%">
      <Flex display={'flex'}>
        <Box position={'relative'} width="100%">
          <Input
            w={'100%'}
            placeholder="Type message here..."
            size={'lg'}
            name="text"
            onChange={({ target }) =>
              handleChange({ [target.name]: target.value })
            }
            paddingRight={10}
            borderRadius={'0 5px 0 5px'}
          />
          <Box position={'absolute'} right={0} bottom={1}>
            <Button
              onClick={handleAttachmentClick}
              borderRadius={'full'}
              bg="white"
            >
              <Icon w={5} h={5} color="red.500" as={GrAttachment} />
            </Button>
            <Box visibility={'hidden'} position={'absolute'}>
              <input
                ref={fileRef}
                type="file"
                name="attachment"
                onChange={({ target }) => {
                  console.log('files ===>>', target.files)
                  handleChange({ attachments: target?.files || [] })
                }}
              />
            </Box>
          </Box>
        </Box>
        {attachments.length > 0 && (
          <Box position={'absolute'}>
            {attachments.map((file, index) => (
              <ImageLoader file={file} key={index} />
            ))}
            <span>Attach</span>
          </Box>
        )}
        <Box>
          <Button
            onClick={onSaveMessage}
            isDisabled={shouldButtonDisabled}
            colorScheme="telegram"
            rounded={'0 5px 0 5px'}
            h={12}
            w={18}
          >
            <Icon w={8} h={8} color="white" as={TbSend} />
          </Button>
        </Box>
      </Flex>
      <Box height={5} bg="green.100" />
    </Box>
  )
}
