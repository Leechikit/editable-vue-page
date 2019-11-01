<template>
  <div class="formEditor">
    <el-container>
      <el-header height="50px"></el-header>
      <el-container class="formEditor-container">
        <el-aside class="formEditor-aside" width="200px">
          <controlList @click="clickEvent"></controlList>
        </el-aside>
        <el-main class="formEditor-main" ref="main">
          <component
            v-for="(item, $index) in componentList"
            :key="$index"
            :is="item"
            :data="propData"
          ></component>
        </el-main>
        <el-aside class="formEditor-aside" width="200px">
          <component
            v-for="(item, $index) in propertyList"
            :key="$index"
            :is="`property-${item.type}`"
            :config="propertyList[$index]"
            v-model="propertyList[$index].value"
          ></component>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import controlList from '@/components/controlList'
import componentJson from '@/components.json'

import Vue from 'vue'
export default {
  name: 'form-editor',
  components: { controlList },
  data() {
    return {
      componentList: [],
      currComp: '',
      propertyList: []
    }
  },
  computed: {
    propData() {
      let result = {}
      this.propertyList.forEach(property => {
        result[property.enName] = property.value
      })
      return result
    }
  },
  created() {
    console.log(Vue.prototype)
  },
  methods: {
    clickEvent(compName) {
      this.componentList.push(compName)
      this.currComp = compName
      this.propertyList = componentJson[compName].properties
      // console.log(this.$refs.main)
      // this.$insertModule(this.$refs.main.$el, [
      //   {
      //     fnName: `$${item}`
      //   }
      // ])
      // console.log(item)
    }
  }
}
</script>
<style lang="scss" scope>
.formEditor {
  height: 100vh;
  overflow: hidden;
  &-main {
    height: calc(100vh - 50px);
    overflow: auto;
  }
}
</style>
