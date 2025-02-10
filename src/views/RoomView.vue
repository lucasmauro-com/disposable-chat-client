<template>
  <main>
    <v-container class="pa-16">
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col align="center" cols="12" xs="12" sm="12" md="8" lg="6" xl="6" xxl="6">
          <h1><span class="text-center text-medium-emphasis">Room</span> {{ roomName }}</h1>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="message-history">
        <v-col cols="12">
          <ul>
            <li v-for="message, index in messages" v-bind:key="index">
              <span v-if="message.type === 'welcome'" class="text-medium-emphasis">
                Active clients:
                <span v-for="client, index in message.data.room.activeClients" v-bind:key="index">
                  <span class="text-high-emphasis">{{ client.name }}</span><span v-if="index+1 !== message.data.room.activeClients.length">, </span>
                </span>
              </span>
              <span v-else-if="message.type === 'info'" class="text-medium-emphasis">
                <span class="text-high-emphasis">{{ message.data.client.name }}</span> has {{ message.data.action }}
              </span>
              <span v-else-if="message.type === 'chat'" class="text-medium-emphasis">
                [<span class="text-high-emphasis">{{ message.data.client.name }}</span>]: {{ message.data.text }}
              </span>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row v-show="isMobile">
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field @keydown.enter.prevent="send" v-model="typedMessage" label="Enter your message..."></v-text-field>
          <v-btn :disabled="messageTooLong" block size="large" @click="send">Send</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-show="!isMobile">
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-text-field @keydown.enter.prevent="send" v-model="typedMessage" label="Enter your message..."></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn :disabled="messageTooLong" block size="large" @click="send">Send</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-if="messageTooLong" align="center">
        <v-spacer></v-spacer>
        <v-col cols="6" align="center">
          <span class="text-medium-emphasis">Your message may not contain over 300 characters</span>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { chatStore } from '@/store/chat-store';

export default {
  data: () => ({
    typedMessage: '',
    sendAllowed: true,
    labels: {
      'registered': 'registered to',
      'unregistered' : 'unregistered from'
    }
  }),
  computed: {
    isMobile() {
      return screen.width <= 760;
    },
    roomName() {
      return chatStore.room
    },
    messages() {
      return chatStore.messages
    },
    messageTooLong() {
      return this.typedMessage?.length > 300
    }
  },
  methods: {
    send() {
      if (!this.typedMessage) {
        return
      }
      chatStore.sendMessage(this.typedMessage)
      this.typedMessage = ''
    },
  },
  beforeRouteLeave() {
    chatStore.disconnect()
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

span {
  word-break: initial
}

.message-history {
  overflow-y: auto;
  overflow-x: hidden;
  height: 65vh;
  flex-direction: column-reverse;
}
</style>