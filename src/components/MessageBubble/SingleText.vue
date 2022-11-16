<template lang="pug">
.msg-bubble-component.msg-bubble-component--single-text
  .msg-bubble-component__text {{ mainData.text }}
</template>
<script>
export default {
  props: {
    mainData: {
      type: Object
    }
  }
}
</script>
