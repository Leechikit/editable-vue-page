exports.exportJavascript = {
props: {
  opacity: {
    type: String,
    default: '1'
  },
  display: {
    type: String,
    default: 'block'
  }
},
data() {
  return {
    appListShow: false,
    popoverShow: false,
    logoImg: '',
    userName: '用户',
    currentPath: [
        {
          title: '首页',
          path: 'home',
          name: 'home_index'
        }
     ]
  }
},
methods: {
  toName(name) {
    return name ? { name } : ''
  },
  itemTitle(item) {
    return item.title
  },
  gotoMyWork() {
    this.$router.push({
      name: 'my-work'
    })
  },
  gotoDocumentLib() {
    this.$router.push({
      name: 'document-lib'
    })
  },
  gotoPersonalInformation() {
    this.$router.push({
      name: 'personal_information'
    })
  },
  goAppManager() {
    this.$router.push({
      name: 'workflow-design'
    })
  },
  gotoPage() {
    this.$router.push({
      name: 'people-manage'
    })
  },
  toApp(itemId, itemName) {
    
  },
  getModuleList(showAppList = true) {
    
  },
  goSystem(name) {
    
  }
}

}