class Sources {
  constructor(datas) {
    this.$data = []
    this._binding = {}
    this._observer(datas)
  }
  _pushWatcher(watcher) {
    if (!this._binding[watcher.key]) {
      this._binding[watcher.key] = []
    }
    this._binding[watcher.key].push(watcher)
  }
  /*
   observer的作用是能够对所有的数据进行监听操作，通过使用Proxy对象
   中的set方法来监听，如有发生变动就会拿到最新值通知订阅者。
  */
  _observer(datas) {
    const me = this
    const handler = {
      set(target, key, value) {
        const rets = Reflect.set(target, key, value)
        me._binding[key].map(item => {
          item.update()
        })
        return rets
      }
    }
    this.$data.push(new Proxy(datas, handler))
  }
  push(componentName, properties) {
    this._pushWatcher(new Watcher(node, 'innerHTML', data, key));
  }
}
/*
 watcher的作用是 链接Observer 和 Compile的桥梁，能够订阅并收到每个属性变动的通知，
 执行指令绑定的响应的回调函数，从而更新视图。
*/
class Watcher {
  constructor(node, attr, data, key) {
    this.node = node
    this.attr = attr
    this.data = data
    this.key = key
  }
  update() {
    this.node[this.attr] = this.data[this.key]
  }
}

export default Sources
