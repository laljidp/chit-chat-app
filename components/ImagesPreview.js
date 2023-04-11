import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

export default function ImagesPreview({ images = [] }) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  if (images.length === 0) return null

  return (
    <>
      <Box
        position={'relative'}
        height={75}
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        marginTop={4}
        onClick={onOpen}
      >
        {images.map((src, index) => (
          <React.Fragment key={src}>
            <Image
              height={75}
              width={75}
              key={src}
              src={src}
              opacity={0.8}
              position={'absolute'}
              left={index * 5}
            />
          </React.Fragment>
        ))}
      </Box>
      <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Images ({images.length})</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpen &&
              images.map((src, index) => (
                <React.Fragment key={src}>
                  <Text margin={'1rem 0'} textAlign={'center'}>
                    ( {index + 1} )
                  </Text>
                  <Image key={index} src={src} left={index * 5} />
                </React.Fragment>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
