<template>
  <Component></Component>
</template>

<script>
import Component from './Component.vue';
// import { provide } from 'vue';

export default {
  /**
   * provide는 하위 컴포넌트에 주입할 수 있는 값을 제공
   */
  provide: {
    msg: 'message',
    key1: 'value1'
  },
  components: {
    Component,
  }
}
</script>

<style>

</style>