import { groupConverter } from './converters/group.converter'
import { db } from './firebase'
import { addDoc, collection, updateDoc, doc, getDoc } from 'firebase/firestore'

export const GROUPS = 'groups'

export const createGroup = async (payload) => {
  try {
    const groupRef = (
      await addDoc(collection(db, GROUPS), payload)
    ).withConverter(groupConverter)
    await updateDoc(groupRef, { id: groupRef.id })
    console.log('Document added with ID:', groupRef.id)
    return { success: true, documentID: groupRef.id }
  } catch (error) {
    console.log(error)
    return { success: false, documentID: null, message: error.message }
  }
}

export const getGroupInfo = async (groupID) => {
  try {
    console.log('Getting group info', groupID)
    const groupRef = doc(db, GROUPS, groupID).withConverter(groupConverter)
    const groupSnap = await getDoc(groupRef)
    if (groupSnap && groupSnap.exists()) {
      return { data: groupSnap.data(), success: true }
    } else {
      return { success: false, message: 'Group not found' }
    }
  } catch (error) {
    console.log('🚀 ~ file: group.fb.js:26 ~ getGroupInfo ~ ̥:', error.message)
    return { success: false, message: 'Something went wrong!' }
  }
}
