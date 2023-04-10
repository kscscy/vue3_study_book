<template>
  <MyButton>My Button(default)</MyButton>
  <MyButton sm>My Button sm</MyButton>
  <MyButton lg>My Button lg</MyButton>
  <MyButton background-white>My Button background white</MyButton>
  <br>
  <MyButton pill>My Button pill</MyButton>
  <MyButton text-red>My Button red</MyButton>
  <MyButton @click.prevent="onClick">My Button(prevent)</MyButton>
  <MyButton type="switch" v-model="active">toggle</MyButton>
</template>

<script>
import MyButton from './MyButton.vue';
export default {
  components: {
    MyButton
  },
  methods: {
    onClick(evt) {
      console.log('evt!', evt);
    }
  }
}
</script>

<style>

</style>