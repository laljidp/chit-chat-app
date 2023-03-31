import PageLoader from '../../components/PageLoader'
import useLoading from '../../hooks/useLoading'
import { getGroupInfo } from '../../api/group.fb'
import { Box, Container } from '@chakra-ui/react'
import ChatHeader from '../../components/ChatHeader'
import ChatFooter from '../../components/ChatFooter'
import ChatBody from '../../components/ChatBody'

export async function getServerSideProps(context) {
  const groupID = context.params.roomId
  const response = await getGroupInfo(groupID)
  console.log('Group Info ===>>', response)
  return {
    props: {
      group: response?.data || {},
    },
  }
}

export default function Posts({ group }) {
  const isLoading = useLoading()
  console.log(group)

  return (
    <Box>
      {isLoading && <PageLoader />}

      {!isLoading && (
        <Box>
          <Box padding={4} bgGradient="linear(to-r, green.100, pink.300)">
            <ChatHeader title={group.title} />
          </Box>
          <Box height={'calc(100vh - 130px)'}>
            <ChatBody />
          </Box>
          <Box>
            <ChatFooter />
          </Box>
        </Box>
      )}
    </Box>
  )
}
