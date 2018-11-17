<template>
  <div v-if="currentBookmark">
    <div class="EditBookmark">
      <el-input type="textarea" v-model="currentBookmark.title" class="EditBookmark-input"></el-input>
      <div class="EditBookmark-status">
        <StatusSelector
            :possibleStatuses="possibleStatuses"
            :currentStatus="currentBookmark.status"
            @changed="onStatusChanged"
        ></StatusSelector>
      </div>
      <TagList :tags="currentBookmark.tags" @created="onTagCreated" @deleted="onTagDeleted"></TagList>
      <div class="EditBookmark-actions">
        <el-button type="primary" size="mini"
                   @click="onSave"
                   class="EditBookmark-button"
                   :disabled="!canSave">
          Save
        </el-button>
        <el-button type="default" size="mini" @click="onCancel" class="EditBookmark-button">
          Cancel
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import TagList from './TagList'
  import StatusSelector from './StatusSelector'

  export default {
    name: 'EditBookmark',
    data () {
      return {
        currentBookmark: null
      }
    },
    mounted () {
      this.currentBookmark = {
        title: this.bookmark.title,
        url: this.bookmark.url,
        tags: [ ...this.bookmark.tags ],
        status: this.bookmark.status
      }
    },
    components: {
      TagList,
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
      canSave () {
        return this.currentBookmark.title.length > 0
      }
    },
    methods: {
      getDefaultStatusName () {
        const defaultStatus = this.possibleStatuses.find(i => i.default === true)
        if (defaultStatus) {
          return defaultStatus.name
        }
        return null
      },
      onTagCreated (newTag) {
        const normalizedTag = newTag.trim()
        if (!normalizedTag.length || this.currentBookmark.tags.indexOf(normalizedTag) > -1) {
          return
        }
        this.currentBookmark.tags.push(newTag)
      },
      onTagDeleted (tag) {
        this.currentBookmark.tags.splice(this.currentBookmark.tags.indexOf(tag), 1)
      },
      onStatusChanged (statusName) {
        this.currentBookmark.status = statusName
      },
      onCancel () {
        this.$emit('cancel')
      },
      onSave () {
        this.$emit('saved', this.currentBookmark)
      }
    }
  }
</script>

<style scoped>
  .EditBookmark {
    display: flex;
    flex-direction: column;
  }

  .EditBookmark-input {
    margin-bottom: 5px;
  }

  .EditBookmark-actions {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
  }

  .EditBookmark-button {
    margin-left: 5px;
  }

  .EditBookmark-status {
    margin-bottom: 5px;
  }
</style>