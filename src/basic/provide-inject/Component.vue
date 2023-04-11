<template>
  <p>{{ msg }}</p>
  <p>{{ key1 }}</p>
</template>

<script>
export default {
  inject: ['msg', 'key1'],
}
</script>

<style>

</style>