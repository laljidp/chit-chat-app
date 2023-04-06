import { Box, Progress, Text } from '@chakra-ui/react'

export default function FileUploadProgress({ progress, fileName }) {
  return (
    <Box padding={4} border={'1px solid #dedede'} borderRadius={'2xl'}>
      <Text fontWeight={500} color={'teal'}>
        {fileName}
      </Text>
      <Progress marginTop={2} hasStripe value={progress} />
    </Box>
  )
}
