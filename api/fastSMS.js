export const sendSMS = async (numbers, message) => {
  try {
    const token = process.env.NEXT_PUBLIC_SMS_API_KEY
    const params = {
      route: 'v3',
      sender_id: 'FTWSMS',
      message: message,
      language: 'english',
      flash: 0,
      numbers: numbers,
      authorization: token,
    }
    const baseUrl = 'https://www.fast2sms.com/dev/bulkV2'
    const fullUrl = `${baseUrl}?${new URLSearchParams(params).toString()}`
    const response = await fetch(fullUrl)
    console.log('sending sMS ==>>', response)
    return { success: true, requestID: 'sms' }
  } catch (err) {
    console.log(`Error sending SMS to ${numbers || 'NO_NUMBER'}`, err)
    return {
      success: false,
      message: err.message,
    }
  }
}

export const getMessageString = (url) => {
  return `Chitchat:${url}`
}
