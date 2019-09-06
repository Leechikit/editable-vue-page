<template>
  <div>
    <component :is="type"></component>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      type: ''
    }
  },
  created() {
    evp.registerPage('pg-home').then(() => {
      this.type = 'pg-home'
    })
  }
}
</script>
<style lang="scss">
</style>
