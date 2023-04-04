import { Box } from '@chakra-ui/react'

export default function ImageLoader(file) {
  return (
    <Box>
      <img src={file.src} alt="iamge" />
    </Box>
  )
}
