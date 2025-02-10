<template>
  <v-container class="pa-12">
    <v-row align="center">
      <v-spacer></v-spacer>
      <v-col align="center" cols="12" xs="12" sm="12" md="8" lg="6" xl="6" xxl="6">
        <div>
          <h1 class="text-center text-high-emphasis">Disposable Chat</h1>
          <p class="text-center text-medium-emphasis">
            Enter your name and join or create a room.
          </p>
        </div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  <v-form ref="joinForm" @keydown.enter.prevent="enterRoom">
    <v-container class="registration-input pa-12">
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col align="center" cols="12" xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="30"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col align="center" cols="12" xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
          <v-text-field
            v-model="room"
            :rules="roomRules"
            :counter="30"
            label="Room"
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col align="center">
          <v-btn @click="enterRoom">Enter Room</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-if="failure">
        <v-spacer></v-spacer>
        <v-col align="center">
          <v-label>Unable to connect to the server</v-label>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { chatStore } from '@/store/chat-store';

export default {
  data: () => ({
    name: '',
    room: '',
    failure: false,
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length >= 3 || 'Name must have at least 3 characters',
      (v) => v.length <= 30 || 'Name must have at most 30 characters',
    ],
    roomRules: [
      (v) => !!v || 'Room is required',
      (v) => v.length >= 3 || 'Room must have at least 3 characters',
      (v) => v.length <= 30 || 'Room must have at most 30 characters',
      (v) => !!v.match(`^[a-zA-Z0-9-_]+$`) || 'Room must contain alphanumeric, hyphen and underscore characters only',
    ]
  }),
  methods: {
    async enterRoom() {
      const validation = await this.$refs.joinForm.validate()
      if (!validation?.valid) return

      try {
        await chatStore.connect(this.name, this.room)
      } catch {
        this.failure = true
        return
      }

      this.failure = false
      this.$router.push({ name: 'room' })
    }
  },
  beforeRouteEnter() {
    chatStore.disconnect()
  }
}
</script>

<style scoped>
.registration-input {
  max-width: 700px;
}
</style>
