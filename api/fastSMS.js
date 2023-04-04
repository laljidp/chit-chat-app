import fast2sms from 'fast2sms'

export const sendSMS = async ({ numbers, message }) => {
  try {
    const options = {
      numbers,
      message,
    }
    const response = await fast2sms.sendMessage(options)
    console.log('sending sMS ==>>', response)
    return { success: true, requestID: 'sms' }
  } catch (err) {
    console.log(`Error sending SMS to ${options?.numbers || 'NO_NUMBER'}`, err)
    return {
      success: false,
      message: err.message,
    }
  }
}
