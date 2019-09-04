exports.exportJavascript = {
name: 'test',
created(){
	console.log(this.$store.state.userInfo)
}
}