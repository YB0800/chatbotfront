import ChatBot from './components/ChatBotUI.vue'

const Plugin = {
  install (Vue, options) {
    Vue.component('ChatBot', ChatBot)

    if (options) {
      // console.log('options', options)
    }
  }
}

export default Plugin
export { ChatBot }
