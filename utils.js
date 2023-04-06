import uuid4 from 'uuid4'

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const generateUID = () => uuid4()

export const isValidPhoneNumber = (number) => {
  const regex = /^\d{10}$/
  return regex.test(number)
}
