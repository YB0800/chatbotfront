<template lang="pug">
.bot-ui(
  :class="uiClasses"
)
  transition(name="fadeUp")
    .zone-chat(v-if="botActive")
      ZoneChatHeader(
        :bot-title="optionsMain.botTitle",
        @close-bot="botToggle"
      )
      ZoneChatContent(
        :bot-typing="botTyping",
        :main-data="messages"
      )
      ZoneChatAction(
        :input-disable="inputDisable",
        :input-placeholder="optionsMain.inputPlaceholder",
        :input-disable-placeholder="optionsMain.inputDisablePlaceholder",
        @msg-send="sendMessage"
      )
  .bot-bubble
    button.bubble-btn(
      @click="botToggle"
    )
      slot(name="bubbleButton")
        transition(name="scaleUp")
          BubbleIcon.bubble-btn-icon(
            v-if="!botActive",
            key="1"
          )
          CloseIcon.bubble-btn-icon.bubble-btn-icon--close(
            v-else,
            key="2"
          )
  AppStyle(:options="optionsMain")
  .preload-image
    .msg-avatar__img(v-if="optionsMain.botAvatarImg")
</template>

<script>
import EventBus from '../helpers/event-bus'
import Config from '../config'
import ZoneChatHeader from './ZoneChat/Header'
import ZoneChatContent from './ZoneChat/Content'
import ZoneChatAction from './ZoneChat/Action'
import AppStyle from './AppStyle'
import BubbleIcon from '../assets/icons/bubble.svg'
import CloseIcon from '../assets/icons/close.svg'

export default {
  name: 'VueChatBot',

  components: {
    ZoneChatHeader,
    ZoneChatContent,
    ZoneChatAction,
    BubbleIcon,
    CloseIcon,
    AppStyle
  },

  // Definition des types de props
  props: {
    options: {
      type: Object,
      default: () => { return {} }
    },

    messages: {
      type: Array
    },

    botTyping: {
      type: Boolean,
      default: false
    },

    inputDisable: {
      type: Boolean,
      default: false
    },

    isOpen: {
      type: Boolean,
      default: false
    },

    openDelay: {
      type: Number
    }
  },

  // Données de la zone du ChatBot
  data () {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Chatbot',
        colorScheme: '#F44336',
        textColor: '#fff',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: '#F44336',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null
      }
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      let classes = []

      if (this.optionsMain.animation) {
        classes.push('bot-ui--animate')
      }

      return classes
    }
  },

  created () {
    if (this.isOpen) {
      if (this.openDelay) {
        setTimeout(this.botOpen, this.openDelay)
      } else {
        this.botToggle()
      }
    }
  },

  mounted () {
    document.addEventListener(Config.EVENT_OPEN, function () {
      this.botOpen()
    })
    document.addEventListener(Config.EVENT_CLOSE, function () {
      this.botClose()
    })
    document.addEventListener(Config.EVENT_TOGGLE, function () {
      this.botToggle()
    })
  },

  beforeDestroy () {
    EventBus.$off('select-button-option')
  },

  methods: {
    botOpen () {
      if (!this.botActive) {
        this.botToggle()
      }
    },

    botClose () {
      if (this.botActive) {
        this.botToggle()
      }
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        EventBus.$on('select-button-option', this.selectOption)
        this.$emit('init')
      } else {
        EventBus.$off('select-button-option')
        this.$emit('destroy')
      }
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
