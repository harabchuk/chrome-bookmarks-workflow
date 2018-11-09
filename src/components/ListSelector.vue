<template>
  <div v-if="currentList">
    <div class="ListSelector">
      <span class="ListSelector-label">List: </span>
      <div class="ListSelector-dropDown">
        <el-dropdown  @command="onChange" trigger="click" size="mini">
          <div class="ListSelector-dropDown-selected">
            <span>{{ currentList.name }}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="ListSelector-dropDown-items">
            <el-dropdown-item v-for="list in lists" :key="list.id" :command="list.id">{{ list.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-button type="text" size="mini" @click="onNew">
        New list
      </el-button>
      <el-button type="text" size="mini" @click="onDelete(currentList)" :disabled="this.currentList.id === 1">
        Delete list
      </el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ListSelector',
    data () {
      return {
      }
    },
    computed: {
      currentList () {
        if (this.lists && this.selectedListId) {
          return this.listById(this.selectedListId)
        }
        return null
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
      onChange (listId) {
        this.$emit('changed', this.listById(listId))
      },
      onNew () {
        this.$emit('new')
      },
      onDelete () {
        const list = this.currentList
        if (list) {
          this.$emit('deleted', list.id)
        }
      }
    }
  }
</script>

<style scoped>
  .ListSelector {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .ListSelector-label {
    font-size: 14px;
    margin-right: 0.5em;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .ListSelector-dropDown {
    flex: 1 0 0;
  }

  .ListSelector-dropDown-selected {
    cursor: pointer;
    color: #409EFF;
  }

  .ListSelector-dropDown-items {
    max-height: 80px;
    min-width: 100px;
    overflow-y: auto;
    margin-top: 3px;
  }

</style>