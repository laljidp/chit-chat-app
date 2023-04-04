import { createContext, useState, useEffect } from 'react'
import Cryptr from 'cryptr'

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY

const cryptr = new Cryptr(secretKey, {
  pbkdf2Iterations: 10000,
  saltLength: 15,
})

export const UContext = createContext(null)

const USER_STORAGE_KEY = 'userToken'

export default function UserContext({ children }) {
  const [user, setUser] = useState({
    isAdmin: false,
    userName: '',
  })

  const setUserInfo = (userInfo) => {
    const token = cryptr.encrypt(JSON.stringify(userInfo))
    localStorage.setItem(USER_STORAGE_KEY, token)
    setUser(userInfo)
  }

  useEffect(() => {
    const token = localStorage.getItem(USER_STORAGE_KEY)
    if (token) {
      const decryptStr = cryptr.decrypt(token)
      const userInfo = JSON.parse(decryptStr)
      console.log('userInfo', userInfo)
      if (userInfo) {
        setUser(userInfo)
      }
    }
  }, [])

  return (
    <UContext.Provider value={{ user, setUserInfo }}>
      {children}
    </UContext.Provider>
  )
}
