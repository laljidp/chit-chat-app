import { db } from './firebase'
import {
  collection,
  getDocs,
  where,
  query,
  limit,
  orderBy,
  addDoc,
} from 'firebase/firestore'

export const MESSAGES = 'messages'

export const saveMessage = async (payload) => {
  try {
    const chatsRef = await addDoc(collection(db, MESSAGES), payload)
    if (chatsRef.id) {
      return { success: true, documentID: chatsRef.id }
    } else {
      return {
        success: false,
        documentID: null,
        message: 'Document failed to be saved.',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getChatsByGroup = async (roomID) => {
  try {
    const q = query(
      collection(db, MESSAGES),
      where('roomID', '==', roomID),
      limit(50),
      orderBy('created_at', 'desc')
    )
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
