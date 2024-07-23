import ChatService from '@/services/chat-service'
import { type Message } from '@/services/chat-service'
import { reactive } from 'vue'

export const chatStore = reactive({

  connection: new ChatService(),
  room: '',
  messages: [] as Message[],

  async connect(name: string, room: string) {
    this.room = room
    await this.connection.connect(name, room)
  },
  disconnect() {
    this.room = ''
    this.messages = []
    this.connection.disconnect()
  },
  sendMessage(text: string) {
    this.connection.broadcast(text)
  },
  saveMessage(message: Message) {
    this.messages.push(message)
    if (this.messages.length > 1000) {
      this.messages.shift()
    }
  }
})
