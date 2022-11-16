<template lang="pug">
.zone-chat-action(
  :class="actionClass"
)
  .zone-chat-action__wrapper
    .zone-chat-action__msg-box
      input.zone-chat-action__input(
        type="text",
        v-model="messageText",
        ref="MessageInput",
        :disabled="inputDisable",
        :placeholder="inputPlaceholder",
        @keydown.enter="sendMessage",
      )
      .zone-chat-action__disable-text(
        v-if="inputDisablePlaceholder && inputDisable"
      )
        span {{ inputDisablePlaceholder }}
    .zone-chat-action__extra
      slot(name="actions")
      button.action-item.action-item--send(@click="sendMessage")
        slot(name="sendButton")
          IconSend.action-icon.action-icon--send
</template>
<script>
import IconSend from '../../assets/icons/send.svg'

export default {
  components: {
    IconSend
  },

  props: {
    inputPlaceholder: {
      type: String
    },

    inputDisablePlaceholder: {
      type: String
    },

    inputDisable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      messageText: null
    }
  },

  computed: {
    actionClass () {
      const actionClasses = []

      if (this.inputDisable) {
        actionClasses.push('zone-chat-action--disabled')
      }

      if (this.messageText) {
        actionClasses.push('zone-chat-aciton--typing')
      }

      // TODO: sending

      return actionClasses
    }
  },

  mounted () {
    this.$refs.MessageInput.focus()
  },

  methods: {
    sendMessage () {
      if (this.messageText) {
        this.$emit('msg-send', { text: this.messageText })
        this.messageText = null
      }
    }
  }
}
</script>
