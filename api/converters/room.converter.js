class Room {
  constructor(payload) {
    this.userName = payload.userName
    this.title = payload.title
    this.id = payload.id
    this.createdAt = payload.createdAt
    this.participants = payload.participants
  }

  getFormattedData() {
    return {
      userName: this.userName,
      title: this.title,
      id: this.id,
      createdAt: this.createdAt.toDate().toString(),
      participants: this.participants || [],
      joined: this.joined || [],
    }
  }
}

export const groupConverter = {
  toFirestore: (group) => {
    return {
      userName: group.userName,
      title: group.title,
      id: group.id,
      createdAt: group.createdAt,
      participants: group.participants || [],
      joined: group.joined || [],
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Room(data).getFormattedData()
  },
}
