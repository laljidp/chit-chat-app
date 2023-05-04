class Room {
  constructor(payload) {
    this.userName = payload.userName
    this.title = payload.title
    this.id = payload.id
    this.createdAt = payload.createdAt
    this.invitee = payload.invitee || []
    this.joined = payload.joined || []
    this.isDeleted = payload.isDeleted || false
  }

  getFormattedData() {
    return {
      userName: this.userName,
      title: this.title,
      id: this.id,
      createdAt: this.createdAt.toDate().toString(),
      invitee:
        this.invitee.map((i) => ({
          ...i,
          createdAt: i.createdAt.toDate().toString(),
        })) || [],
      joined: this.joined || [],
      isDeleted: this.isDeleted || false,
    }
  }
}

export const roomConverter = {
  toFirestore: (group) => {
    return {
      userName: group.userName,
      title: group.title,
      id: group.id,
      createdAt: group.createdAt,
      invitee: group.invitee || [],
      joined: group.joined || [],
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Room(data).getFormattedData()
  },
}
