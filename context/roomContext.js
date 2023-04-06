import React, { useState } from 'react'

export const RoomContext = React.createContext({})

export default function RoomContextProvider({ children }) {
  const [room, setRoom] = useState({})

  const setRoomInfo = (info) => {
    setRoom(info)
  }

  return (
    <RoomContext.Provider value={{ setRoomInfo, room }}>
      {children}
    </RoomContext.Provider>
  )
}
