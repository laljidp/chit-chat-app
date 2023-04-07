import { Box, Button, Grid, Text } from '@chakra-ui/react'

export default function RoomLists({ rooms = [], onRoomClick = () => {} }) {
  return (
    <Grid>
      {rooms.map((room) => (
        <Box
          padding={'8px 15px'}
          bg="facebook.300"
          color={'#fff'}
          fontWeight={500}
          borderRadius={'4px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={1}
        >
          <Text>{room.title}</Text>
          <Button
            size="sm"
            colorScheme="telegram"
            onClick={() => onRoomClick(room)}
          >
            Join
          </Button>
        </Box>
      ))}
    </Grid>
  )
}
