import { CopyIcon } from '@chakra-ui/icons'
import { Box, Button, Text, useToast } from '@chakra-ui/react'

export default function CopyLinkButton({ link }) {
  const toast = useToast()

  const onCopy = () => {
    navigator.clipboard.writeText(link)
    toast({
      status: 'info',
      duration: 2500,
      title: 'Link Copied to clipboard',
      position: 'top',
      isClosable: true,
    })
  }

  return (
    <Box display={'inline-flex'} alignItems={'center'}>
      <Button variant={'solid'} color={'AppWorkspace'} colorScheme="facebook">
        <CopyIcon onClick={onCopy} />
      </Button>{' '}
    </Box>
  )
}
