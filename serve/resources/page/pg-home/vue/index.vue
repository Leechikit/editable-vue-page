<template>
<div class="pg-home">
  this is page home
  <component :is="type"></component>
</div>
</template>
<script>
export default {
name: 'pg-home',
data() {
	return {
    	type: ''
    }
},
created(){
	console.log('this is page home')
  	evp
      .registerPlugin('pj-test1').then(() => {
        this.type = 'pj-test1'
      })
}
}
</script>
<style lang="scss" scoped>
.pg-home {
  color: blue;
}
</style>