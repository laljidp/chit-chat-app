import { Box, Image } from '@chakra-ui/react'

export default function ImagePlaceholder({ files = [] }) {
  if (files.length === 0) return null

  return (
    <Box
      display={'flex'}
      gap={5}
      padding={2}
      bg={'cyan.100'}
      borderRadius={'4'}
    >
      {files.map((src, index) => (
        <Box>
          <Image width={75} height={75} src={src} alt="images" key={index} />
        </Box>
      ))}
    </Box>
  )
}
