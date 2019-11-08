<template>
  <div class="formEditor">
    <el-container>
      <el-header height="50px"></el-header>
      <el-container class="formEditor-container">
        <el-aside class="formEditor-aside" width="200px">
          <controlList @click="clickControlListEvent"></controlList>
        </el-aside>
        <el-main class="formEditor-main" ref="main">
          <div
            v-for="(item, key) in componentMap"
            :key="key"
            @click="clickComponentEvent(key)"
          >
            <componentEditor
              :compName="item.compName"
              :properties="item.properties"
            ></componentEditor>
          </div>
          <el-button type="primary" @click="save">保存</el-button>
        </el-main>
        <el-aside class="formEditor-aside" width="200px">
          <div v-if="currCompId !== ''">
            <propertyList
              :currCompId="currCompId"
              v-model="componentMap[currCompId]['properties']"
            ></propertyList>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import controlList from '@/components/controlList'
import componentJson from '@/components.json'
import randomString from 'random-string'
import propertyList from '@/components/propertyList'
import componentEditor from '@/components/componentEditor'

export default {
  name: 'form-editor',
  components: { controlList, propertyList, componentEditor },
  data() {
    return {
      componentMap: {},
      currCompId: ''
    }
  },
  methods: {
    clickControlListEvent(compName) {
      const id = randomString({
        length: 8,
        numeric: false,
        letters: true,
        special: false
      })
      this.$insertModule(compName)
      this.$set(this.componentMap, id, {
        compName,
        properties: JSON.parse(
          JSON.stringify(componentJson[compName].properties)
        )
      })
      this.currCompId = id
    },
    clickComponentEvent(id) {
      this.currCompId = id
    },
    save() {
      console.log(this.componentMap)
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
