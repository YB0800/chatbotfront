<template lang="pug">
.bot-style(v-html="style", style="display: none")
</template>
<script>
export default {
  props: ['options'],
  computed: {
    style () {
      if (!this.options) {
        return ''
      }

      const {
        colorScheme,
        textColor,
        boardContentBg,
        bubbleBtnSize,
        botAvatarImg,
        botAvatarSize,
        inputDisableBg,
        msgBubbleBgBot,
        msgBubbleColorBot,
        msgBubbleBgUser,
        msgBubbleColorUser
      } = this.options

      const styles = `
<style type="text/css" id="bot-style">
.bubble-btn {
  background-color: ${colorScheme};
  width: ${bubbleBtnSize}px;
  height: ${bubbleBtnSize}px;
}
.bubble-btn-icon {
  fill: ${textColor};
  color: ${textColor};
}
.zone-chat {
  bottom: ${bubbleBtnSize}px;
}
.zone-chat-header {
  background-color: ${colorScheme};
}
.zone-chat-header__title {
  color: ${textColor};
}
.zone-chat-content {
  background-color: ${boardContentBg};
}
${botAvatarImg
    ? `.msg-avatar {
      width: ${botAvatarSize}px;
      height: ${botAvatarSize}px;
    }
    .msg-avatar__img {
      background-image: url(${botAvatarImg});
    }`
    : ''
}
.msg-bubble--bot .msg-bubble-component__text {
  color: ${msgBubbleColorBot};
  background-color: ${msgBubbleBgBot};
}
.msg-bubble__typing-indicator span,
.msg-bubble__typing-indicator::before,
.msg-bubble__typing-indicator::after {
  background-color: ${msgBubbleColorBot};
}
.mb-button-options__btn::before {
  background-color: ${msgBubbleBgUser};
}
.msg-bubble--user .msg-bubble-component__text {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.mb-button-options__btn {
  color: ${msgBubbleBgUser};
  border-color: ${msgBubbleBgUser};
}
.mb-button-options__btn:hover {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.zone-chat-action--disabled::before {
  background-color: ${inputDisableBg};
}
</style>
      `
      return styles
    }
  }
}
</script>
