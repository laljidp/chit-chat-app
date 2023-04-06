import { Box, Image } from '@chakra-ui/react'

export default function ImagePlaceholder({ files = [] }) {
  if (files.length === 0) return null

  return (
    <Box display={'flex'} gap={2} padding={2} borderRadius={'4'}>
      {files.map((src, index) => (
        <Box bg="gray.300" borderRadius={'4px'} padding={1}>
          <Image width={75} height={75} src={src} alt="images" key={index} />
        </Box>
      ))}
    </Box>
  )
}
