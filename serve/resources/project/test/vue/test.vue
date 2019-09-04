<template>
<div class="test">testb</div>
</template>
<script>
export default {
name: 'test',
created(){
	console.log(this.$store.state.userInfo)
}
}
</script>
<style lang="scss" scoped>
.test{
  color: blue;
}
</style>