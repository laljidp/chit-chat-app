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

export const getRoomRef = (roomID) =>
  doc(db, ROOMS, roomID).withConverter(roomConverter)

export const getRoomInfo = async (roomID) => {
  try {
    const roomSnap = await getDoc(getRoomRef(roomID))
    if (roomSnap && !roomSnap.data().isDeleted) {
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

export const deleteRoom = async (roomID) => {
  try {
    const roomRef = doc(db, ROOMS, roomID)
    await updateDoc(roomRef, {
      isDeleted: true,
    })
    return { success: true, message: 'Room deleted' }
  } catch (error) {
    console.log('error: ', error)
    return {
      success: false,
      message: 'Error deleting room',
    }
  }
}

export const updateInvittes = async (roomID, payload) => {
  try {
    const roomRef = doc(db, ROOMS, roomID).withConverter(roomConverter)
    await updateDoc(roomRef, { invitee: arrayUnion(payload) })
    return { success: true, message: 'Invitee updated!' }
  } catch (err) {
    console.log('error updating room invittes', err)
    return { success: false, message: err.message }
  }
}
