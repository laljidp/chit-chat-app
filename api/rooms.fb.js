import { groupConverter } from './converters/room.converter'
import { db } from './firebase'
import { addDoc, collection, updateDoc, doc, getDoc } from 'firebase/firestore'

export const ROOMS = 'rooms'

export const createRoom = async (payload) => {
  try {
    const roomRef = (
      await addDoc(collection(db, ROOMS), payload)
    ).withConverter(groupConverter)
    await updateDoc(roomRef, { id: roomRef.id })
    console.log('Document added with ID:', roomRef.id)
    return { success: true, documentID: roomRef.id }
  } catch (error) {
    console.log(error)
    return { success: false, documentID: null, message: error.message }
  }
}

export const getRoomInfo = async (groupID) => {
  try {
    console.log('Getting room info', groupID)
    const roomRef = doc(db, ROOMS, groupID).withConverter(groupConverter)
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
