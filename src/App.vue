<template lang="pug">
#app
  VueChatBot(
    :options="botOptions",
    :messages="messageData",
    :bot-typing="botTyping",
    :input-disable="inputDisable",
    :is-open="false",
    @init="botStart",
    @msg-send="msgSend",
  )
</template>
<script>
import BotIcon from './assets/icons/bot.png'
import { VueChatBot } from './chat-bot-ui'

export default {
  components: {
    BotIcon,
    VueChatBot
  },

  data () {
    return {
      messageData: [],
      botTyping: false,
      inputDisable: false,
      botOptions: {
        botAvatarImg: BotIcon,
        boardContentBg: '#f4f4f4',
        msgBubbleBgBot: '#fff',
        inputPlaceholder: 'Type hereeee...',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'Hit the buttons above to respond'
      }
    }
  },

  methods: {
    botStart () {
      // Envoie un premier message
      this.botTyping = true
      setTimeout(() => {
        this.botTyping = false
        this.messageData.push({
          agent: 'bot',
          type: 'text',
          text: 'Bonjour !'
        })
      }, 1000)
    },

    msgSend (value) {
      // Envoie du message de l'utilisateur
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })

      this.getResponse()
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Gill Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
