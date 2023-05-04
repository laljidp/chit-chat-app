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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

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
    orderBy('createdAt'),
    limit(50)
  )

export const uploadFileToStorage = (
  roomID,
  file,
  onProgress,
  onUploadCompleted
) => {
  try {
    const storage = getStorage()
    const timestamp = new Date().getTime()
    const storageRef = ref(
      storage,
      `images/${roomID}_${timestamp}_${file.name}`
    )
    const metadata = {
      roomID,
      name: file.name,
      size: file.size,
      type: file.type,
    }

    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is' + progress + ' done')
        onProgress(progress)
      },
      (error) => {
        console.log('Eror while uploading file: ', error)
      },
      () => {
        // Handle Successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Files available at', downloadURL)
          onUploadCompleted(downloadURL)
        })
      }
    )
  } catch (error) {
    console.error('Error uploading file', error)
  }
}
