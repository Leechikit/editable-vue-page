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
            :id="key"
            @click="clickComponentEvent(key)"
          >
            <component
              :is="item.compName"
              :data="item.formatProperties"
            ></component>
          </div>
        </el-main>
        <el-aside class="formEditor-aside" width="200px">
          <div v-if="currCompId !== ''">
            <!-- <component
              v-for="(item, $index) in componentMap[currCompId]['properties']"
              :key="$index"
              :is="`property-${item.type}`"
              :config="item"
              v-model="
                componentMap[currCompId]['formatProperties'][item.enName]
              "
            ></component> -->
            <propertyList
              :currCompId="currCompId"
              :properties="componentMap[currCompId]['properties']"
              v-model="componentMap[currCompId]['formatProperties']"
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

import Vue from 'vue'
export default {
  name: 'form-editor',
  components: { controlList, propertyList },
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
      this.$insertModule(compName, {
        props: {
          data: this.formatProperties(componentJson[compName].properties)
        }
      })
      this.$set(this.componentMap, id, {
        compName,
        properties: JSON.parse(
          JSON.stringify(componentJson[compName].properties)
        ),
        formatProperties: this.formatProperties(
          JSON.parse(JSON.stringify(componentJson[compName].properties))
        )
      })
      this.currCompId = id
      // this.$nextTick(() => {
      //   this.$insertModule(compName, {
      //     props: {
      //       data: {
      //         label: '的地方',
      //         clearable: true
      //       }
      //     }
      //   })
      //   this.componentMap[id].instance.$mount(`#${id}`)
      // })
    },
    formatProperties(properties) {
      let result = {}
      properties.forEach(item => {
        result[item.enName] = item.value
      })
      return result
    },
    clickComponentEvent(id) {
      this.currCompId = id
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
