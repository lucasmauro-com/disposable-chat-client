import { chatStore } from '@/store/chat-store'
import queryString from 'query-string'

export interface Message {
  type: string,
  data: object,
}

export class ChatService {
  // @ts-ignore
  private url = process.env.SERVER_URL
  private connection: WebSocket | null = null
  
  public ready: boolean = false

  private async ensureReady() {
    if (this.ready) return true

    const intrasleep = 100
    const timeout = 10000
    const ttl = timeout / intrasleep
    let loop = 0
    while (this.connection!.readyState === WebSocket.CONNECTING && loop < ttl) {
      await new Promise(resolve => setTimeout(resolve, intrasleep))
      loop++
    }
    
    if (!this.ready) {
      throw new Error('Unable to connect to the server')
    }
  }

  async connect(name: string, room: string) {
    this.disconnect()

    const params = queryString.stringify({ name, room })
    this.connection = new WebSocket(`${this.url}?${params}`)

    this.connection.onopen = () => this.ready = true
    this.connection.onerror = () => this.ready = false
    this.connection.onclose = () => this.ready = false
    this.connection.onmessage = (ev) => chatStore.saveMessage(JSON.parse(ev.data))

    await this.ensureReady()
  }

  broadcast(text: string) {
    if (!this.ready) return

    const msg = JSON.stringify({ text })
    this.connection!.send(msg)
  }

  disconnect() {
    this.connection?.close()
  }
}

export default ChatService
