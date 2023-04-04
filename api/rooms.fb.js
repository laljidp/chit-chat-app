import { generateUID } from '../utils'
import { roomConverter } from './converters/room.converter'
import { db } from './firebase'
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore'

export const ROOMS = 'rooms'

export const createRoom = async (payload) => {
  try {
    const roomRef = (
      await addDoc(collection(db, ROOMS), payload)
    ).withConverter(roomConverter)
    await updateDoc(roomRef, {
      id: roomRef.id,
      joined: [
        {
          id: generateUID(),
          userName: payload.userName,
          isAdmin: true,
          ua: navigator.userAgent || 'N/A',
        },
      ],
    })
    console.log('Document added with ID:', roomRef.id)
    return { success: true, documentID: roomRef.id }
  } catch (error) {
    console.log(error)
    return { success: false, documentID: null, message: error.message }
  }
}

export const getRoomInfo = async (groupID) => {
  try {
    const roomRef = doc(db, ROOMS, groupID).withConverter(roomConverter)
    const roomSnap = await getDoc(roomRef)
    if (roomSnap && roomSnap.exists()) {
      return { data: roomSnap.data(), success: true }
    } else {
      return { success: false, message: 'Room not found' }
    }
  } catch (error) {
    console.log('🚀 ~ file: rooms.fb.js:26 ~ getGroupInfo ~ ̥:', error.message)
    return { success: false, message: 'Something went wrong!' }
  }
}

// it will update the joined array of room document
export const addUserToRoom = async (roomID, payload) => {
  try {
    const roomRef = doc(db, ROOMS, roomID).withConverter(roomConverter)
    await updateDoc(
      roomRef,
      {
        joined: arrayUnion(payload),
      },
      { merge: false }
    )
    return { success: true, message: 'User joined the Room' }
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: error.message }
  }
}
