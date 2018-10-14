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
        <StatusSelector
            :possibleStatuses="possibleStatuses"
            :currentStatus="bookmark.status"
            @changed="onStatusChange"
        ></StatusSelector>
      </div>
    </el-card>
  </div>
</template>

<script>
  import StatusSelector from './StatusSelector'
  export default {
    name: 'BookmarkDetail',
    components: {
      StatusSelector
    },
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