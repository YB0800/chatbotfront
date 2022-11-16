<template lang="pug">
.zone-chat-header
  slot(name="header")
    .zone-chat-header__title {{ botTitle }}
</template>
<script>
export default {
  props: {
    botTitle: {
      type: String,
      default: 'Chatbot'
    }
  }
}
</script>
