import { Box, Button, Input, Icon, Flex, useToast } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { TbSend } from 'react-icons/tb'
import { uploadFileToStorage } from '../api/message.db'
import { UContext } from '../context/userContext'
import FileUploadProgress from './FileUploadProgress'
import ImagesLoader from './ImagesLoader'

export default function ChatFooter({
  onSaveMessage,
  handleChange,
  text,
  attachments,
}) {
  const fileRef = useRef(null)
  const toast = useToast()
  const {
    user: { roomID },
  } = useContext(UContext)
  const [fileUpload, setFileUpload] = useState({
    show: false,
    progress: 0,
    name: '',
  })

  const handleAttachmentClick = () => {
    fileRef.current?.click()
  }

  const shouldButtonDisabled = !text?.trim() && attachments.length === 0

  const handleUploadFile = async (files) => {
    if (!files || !files.length > 0) return

    const file = files[0]
    console.log('Uploading file ==>>', file)
    console.log('fileRef: ' + fileRef.current)
    if (file.size / 1000 > 5000) {
      return toast({
        title: 'File size should not exceed 5MB',
        position: 'top',
        status: 'error',
      })
    }
    setFileUpload({
      ...fileUpload,
      name: file.name,
      show: true,
    })
    uploadFileToStorage(
      roomID,
      file,
      (progress) => {
        setFileUpload({
          ...fileUpload,
          progress: progress,
        })
      },
      (fileURL) => {
        handleChange({
          attachments: [...attachments, fileURL],
        })
        setFileUpload({
          show: false,
          progress: 0,
          name: '',
        })
      }
    )
  }

  console.log('attachments', attachments)

  return (
    <Box position={'fixed'} bottom={0} left={0} width="100%">
      <Flex display={'flex'}>
        <Box position={'relative'} width="100%">
          <Input
            w={'100%'}
            placeholder="Type message here..."
            size={'lg'}
            name="text"
            value={text}
            background={'white'}
            onChange={({ target }) =>
              handleChange({ [target.name]: target.value })
            }
            paddingRight={10}
            borderRadius={'0 5px 0 5px'}
          />
          <Box position={'absolute'} right={4} bottom={2} zIndex={1}>
            <Icon
              onClick={handleAttachmentClick}
              w={5}
              h={5}
              color="red.500"
              as={GrAttachment}
            />
            <Box visibility={'hidden'} position={'absolute'}>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg, image/png"
                name="attachment"
                onChange={({ target }) => {
                  console.log('files ===>>', target.files)
                  handleUploadFile(target?.files || [])
                }}
              />
            </Box>
          </Box>
          {fileUpload.show && (
            <Box
              position={'absolute'}
              bottom={20}
              width={'90%'}
              left={10}
              right={10}
              zIndex={2}
            >
              <FileUploadProgress
                progress={fileUpload.progress}
                fileName={fileUpload.name}
              />
            </Box>
          )}
        </Box>
        {attachments.length > 0 && (
          <Box position={'absolute'} bottom={20}>
            <ImagesLoader files={attachments} />
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