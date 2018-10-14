<template>
  <div class="ExistingBookmark">
    <el-card>
      <div class="ExistingBookmark-title">
        {{ bookmark.title }}
      </div>
      <div class="ExistingBookmark-tags">
        <el-tag
            :key="tag"
            v-for="tag in bookmark.tags"
            :disable-transitions="false"
            size="mini"
            class="ExistingBookmark-singleTag"
        >
          {{tag}}
        </el-tag>
      </div>
      <div class="ExistingBookmark-status">
        <el-dropdown  @command="onStatusChange" trigger="click" size="mini">
          <div class="ExistingBookmark-status-dropDown">
            <span>{{ currentStatus }}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="ExistingBookmark-status-dropDown-items">
            <el-dropdown-item
                v-for="status in possibleStatuses"
                :key="status.name"
                :command="status.name"
            >
              {{ status.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'BookmarkDetail',
    props: {
      bookmark: {
        type: Object
      },
      possibleStatuses: {
        type: Array
      }
    },
    computed: {
      currentStatus () {
        const foundStatus = this.possibleStatuses.find(i => i.name === this.bookmark.status)
        if (!foundStatus || !this.bookmark.status) {
          return '-- Select status --'
        }
        return foundStatus.name
      }
    },
    methods: {
      onStatusChange (name) {
        this.$emit('statusChanged', name)
      }
    }
  }
</script>

<style scoped>
  .ExistingBookmark {
  }

  .ExistingBookmark-title {
    font-size: 14px;
    margin-bottom: 0.5em;
  }

  .ExistingBookmark-singleTag {
    margin-right: 10px;
    margin-bottom: 5px;
  }
</style>