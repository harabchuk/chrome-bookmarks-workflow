<template>
  <div>

    <div v-if="currentList && !creatingNew">
      <el-dropdown @command="onChange">
        <span class="el-dropdown-link">
          {{ currentList.title }} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Bicycle</el-dropdown-item>
          <el-dropdown-item>Stroller</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="default" size="mini" @click="onNew(currentList)">New list</el-button>
      <el-button type="default" size="mini" @click="onDelete(currentList)">Delete list</el-button>
    </div>

    <div v-if="!currentList || creatingNew">
      <el-input placeholder="Enter the new list title" v-model="input"></el-input>
      <el-button type="primary" >Save</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ListSelector',
    data () {
      return {
        creatingNew: false
      }
    },
    props: {
      currentList: {
        type: Object,
        required: false,
        default: null
      },
      lists: {
        type: Array,
        required: false,
        default: []
      }
    },
    methods: {
      onChange (listId) {
        console.log(listId)
      },
      onNew () {
        this.creatingNew = true
      },
      onDelete (list) {
        console.log('delete', list)
      },
      onSave () {

      }
    }
  }
</script>

<style scoped>
</style>