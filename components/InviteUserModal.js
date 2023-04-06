import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UContext } from '../context/userContext'
import { updateInvittes } from '../api/rooms.fb'
import { isValidPhoneNumber } from '../utils'
import { getMessageString, sendSMS } from '../api/fastSMS'
import moment from 'moment'
import CopyLinkButton from './CopyLinkButton'

export default function InviteUserModal({ isOpen, onClose, invitee = [] }) {
  const [isSubmitting, setSubmitting] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const { user } = useContext(UContext)
  const toast = useToast()

  const roomURL = `${window.origin}/join-room/${user?.roomID}`

  console.log('invitee', invitee)

  const inviteUserRequest = async () => {
    /// Firebase function to delete the rooms and messages.
    setSubmitting(true)

    //send sms request
    if (!isValidPhoneNumber(phoneNumber)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setSubmitting(false)
      return
    }

    const message = getMessageString(url, user?.title)
    const result = await sendSMS(phoneNumber, message)
    if (result.success) {
      toast({
        title: 'Invite',
        description: `Invite sent to +91 ${phoneNumber}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
      // update invitee to the firebase collection
      const result = await updateInvittes(user?.roomID, {
        number: phoneNumber,
        createdAt: new Date(),
      })
      console.log('resullt', result)
      handleClose()
    }
    setSubmitting(false)
  }

  const handleClose = () => {
    setSubmitting(false)
    setPhoneNumber('')
    onClose()
  }

  const notAllowToSendSMS = invitee.length >= 10

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite Via Phone Number</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {notAllowToSendSMS && (
            <>
              <Alert status="warning">
                <AlertIcon />
                <AlertDescription fontWeight={500}>
                  You've exceeded SMS sending limits for the room. You can send
                  a link by copying it.
                </AlertDescription>
              </Alert>
              <Box display={'flex'} justifyContent={'center'} marginTop={3}>
                <CopyLinkButton link={roomURL} />
              </Box>
            </>
          )}
          {!notAllowToSendSMS && (
            <>
              <InputGroup>
                <InputLeftAddon children="+91" />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  onChange={({ target }) => setPhoneNumber(target.value)}
                />
              </InputGroup>
              <Box display={'flex'} justifyContent={'flex-end'} marginTop={5}>
                <Button
                  rounded={'full'}
                  size="sm"
                  colorScheme="teal"
                  mr={3}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  rounded={'full'}
                  onClick={inviteUserRequest}
                  colorScheme="telegram"
                  size="sm"
                >
                  Send Link
                </Button>
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
        <Box>
          <Text as="h1" fontSize={22} textAlign={'center'} marginBottom={5}>
            Invited numbers logs
          </Text>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                <Text fontSize={15}>
                  You can send link upto 10 times for the room.
                </Text>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Phone number</Th>
                  <Th>Sent</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invitee.map((user, index) => (
                  <Tr key={index}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{user?.number}</Td>
                    <Td>{moment(user.createdAt).fromNow()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ModalContent>
    </Modal>
  )
}
