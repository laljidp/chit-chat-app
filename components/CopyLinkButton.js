import { CopyIcon } from '@chakra-ui/icons'
import { Box, Button, Text, useToast } from '@chakra-ui/react'

export default function CopyLinkButton({ link, ...restProps }) {
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
    <Button
      rounded={'full'}
      variant={'solid'}
      size="sm"
      color={'AppWorkspace'}
      colorScheme="facebook"
      onClick={onCopy}
      {...restProps}
    >
      <Text marginRight={1}>Room link</Text>
      <CopyIcon />
    </Button>
  )
}
