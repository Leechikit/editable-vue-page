<template>
<div class="pg-home">
  <component :is="pfHeaderNav"></component>
  this is page home
  <component :is="pjTest1"></component>
  <component :is="pfTaskListModule"></component>
</div>
</template>
<script>
export default {
name: 'pg-home',
data() {
	return {
    	pjTest1: '',
        pfTaskListModule: '',
      	pfHeaderNav: ''
    }
},
created(){
	console.log('this is page home')
  	evp
      .registerPlugin('pj-test1').then(() => {
        this.pjTest1 = 'pj-test1'
      })
    evp
      .registerPlugin('pf-taskListModule').then(() => {
        this.pfTaskListModule = 'pf-taskListModule'
      })
  	evp
      .registerPlugin('pf-headerNav').then(() => {
        this.pfHeaderNav = 'pf-headerNav'
      })
}
}
</script>
<style lang="scss" scoped>
.pg-home {
  color: blue;
}
</style>