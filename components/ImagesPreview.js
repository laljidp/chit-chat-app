import { Box, Image } from '@chakra-ui/react'

export default function ImagesPreview({ images = [] }) {
  if (images.length === 0) return null

  return (
    <Box
      position={'relative'}
      height={75}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      marginTop={4}
    >
      {images.map((src, index) => (
        <Image
          height={75}
          width={75}
          key={index}
          src={src}
          opacity={0.8}
          position={'absolute'}
          left={index * 5}
        />
      ))}
    </Box>
  )
}
