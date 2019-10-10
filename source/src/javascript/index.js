exports.exportJavascript = {
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