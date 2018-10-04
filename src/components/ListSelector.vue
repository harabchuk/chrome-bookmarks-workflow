<template>
  <div>
    <div v-if="currentList && !creatingNew" class="ListSelector">
      <div class="ListSelector-dropDown">
        <el-dropdown  @command="onChange" trigger="click" size="mini">
          <div class="ListSelector-dropDownLink">
            <span>{{ currentList.name }}</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropDown">
            <el-dropdown-item v-for="list in lists" :key="list.id" :command="list.id">{{ list.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-button type="text" size="mini" @click="onNew(currentList)">
        New list
      </el-button>
      <el-button type="text" size="mini" @click="onDelete(currentList)" :disabled="this.currentList.id === 1">
        Delete list
      </el-button>
    </div>

    <div v-if="!lists || creatingNew" class="">
      <el-input placeholder="Enter the new list title" v-model="inputName" size="mini"></el-input>
      <el-button type="primary" size="mini" @click="onSave" :disabled="!inputName">Save</el-button>
      <el-button type="default" size="mini" @click="onCacnel">Cancel</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ListSelector',
    data () {
      return {
        creatingNew: false,
        currentList: null,
        inputName: ''
      }
    },
    created () {
      if (this.lists && this.selectedListId) {
        this.currentList = this.listById(this.selectedListId)
      } else if (this.lists) {
        this.currentList = this.lists[0]
      }
    },
    props: {
      selectedListId: {
        type: Number,
        required: false,
        default: 0
      },
      lists: {
        type: Array,
        required: false,
        default: []
      }
    },
    methods: {
      listById (listId) {
        return this.lists.find(item => item.id === listId)
      },
      createNewList (name) {
        return {
          name,
          id: (new Date()).getTime()
        }
      },
      onChange (listId) {
        this.currentList = this.listById(listId)
        this.$emit('changed', this.currentList)
      },
      onNew () {
        this.creatingNew = true
      },
      onDelete () {
        this.$emit('deleted', this.currentList)
        this.currentList = this.listById(1)
      },
      onSave () {
        this.creatingNew = false
        this.currentList = this.createNewList(this.inputName)
        this.inputName = ''
        this.$emit('created', this.currentList)
      }
    }
  }
</script>

<style scoped>
  .ListSelector {
    display: flex;
  }

  .ListSelector-dropDownLink {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .ListSelector-dropDown {
    flex: 1 0 0;
  }

  .dropDown {
    max-height: 80px;
    overflow-y: auto;
  }
</style>