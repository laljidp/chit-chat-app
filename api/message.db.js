import { messageConverter } from './converters/message.converter'
import { db } from './firebase'
import {
  collection,
  getDocs,
  where,
  query,
  limit,
  orderBy,
  addDoc,
  updateDoc,
} from 'firebase/firestore'

export const MESSAGES = 'messages'

export const saveMessage = async (payload) => {
  try {
    const chatsRef = await addDoc(collection(db, MESSAGES), payload)
    if (chatsRef.id) {
      await updateDoc(chatsRef, { id: chatsRef.id })
      return { success: true, documentID: chatsRef.id }
    } else {
      return {
        success: false,
        documentID: null,
        message: 'Document failed to be saved.',
      }
    }
  } catch (error) {
    console.log('error', error)
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getChatsByRoom = async (roomID) => {
  try {
    const q = getChatsByGroupQuery(roomID)
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    return { success: true, data: data }
  } catch (error) {
    console.log(error)
    return { success: false, error: error.message }
  }
}

export const getChatsByGroupQuery = (roomID) =>
  query(
    collection(db, MESSAGES).withConverter(messageConverter),
    where('roomID', '==', roomID),
    orderBy('createdAt', 'desc'),
    limit(50)
  )
