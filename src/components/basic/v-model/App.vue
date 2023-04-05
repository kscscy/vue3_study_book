<template>
  <p>
    {{
    	`[${msg11} : ${msg22}]`
    }}
  </p>
  <Component v-model:msg="msg11" v-model:msg2="msg22" />
</template>

<script>
import Component from './Component.vue'
  
export default {
  data() {
    return {
      msg11: 'msg1 init',
      msg22: 'msg2 init'
    }
  },
  components: {
    Component
  }
}
</script>