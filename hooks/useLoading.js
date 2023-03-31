import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function useLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])

  return isLoading
}

export default useLoading
