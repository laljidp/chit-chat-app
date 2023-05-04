class Message {
  constructor(message) {
    this.text = message.text
    this.sender = message.sender
    this.attachments = message.attachments
    this.roomID = message.roomID
    this.status = message.status
    this.createdAt = message.createdAt
    this.id = message.id
  }

  format = () => {
    return {
      id: this.id,
      text: this.text,
      sender: this.sender,
      attachments: this.attachments,
      roomID: this.roomID,
      status: this.status,
      createdAt: this.createdAt.toDate(),
    }
  }
}

export const messageConverter = {
  toFirestore: (message) => {
    return {
      text: message.text,
      sender: message.sender,
      attachments: message.attachments,
      roomID: message.roomID,
      status: message.status,
      createdAt: message.createdAt,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Message(data).format()
  },
}
