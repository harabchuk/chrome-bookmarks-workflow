<template>
  <div>
    <div class="EditBookmark">
      <span class="title">New bookmark</span>
      <el-input type="textarea" v-model="inputTitle" class="EditBookmark-input"></el-input>
      <div class="EditBookmark-status">
        <StatusSelector
            :possibleStatuses="possibleStatuses"
            :currentStatus="status"
            @changed="onStatusChanged"
        ></StatusSelector>
      </div>
      <TagList :tags="tags" @created="onTagCreated" @deleted="onTagDeleted"></TagList>
      <div class="EditBookmark-actions">
        <el-button type="primary" size="mini" @click="onSave" class="EditBookmark-button">Save</el-button>
        <el-button type="default" size="mini" @click="onCancel" class="EditBookmark-button">Cancel</el-button>
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
        tags: [],
        inputTitle: '',
        status: null
      }
    },
    components: {
      TagList,
      StatusSelector
    },
    props: {
      title: {
        type: String,
        required: false,
        default: ''
      },
      url: {
        type: String,
        required: false,
        default: ''
      },
      possibleStatuses: {
        type: Array
      }
    },
    methods: {
      prepareBookmark () {
        return {
          tags: this.tags,
          title: this.inputTitle,
          url: this.url,
          status: this.status
        }
      },
      getDefaultStatusName () {
        const defaultStatus = this.possibleStatuses.find(i => i.default === true)
        if (defaultStatus) {
          return defaultStatus.name
        }
        return null
      },
      onTagCreated (newTag) {
        const normalizedTag = newTag.trim()
        if (!normalizedTag.length || this.tags.indexOf(normalizedTag) > -1) {
          return
        }
        this.tags.push(newTag)
      },
      onTagDeleted (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      onStatusChanged (statusName) {
        this.status = statusName
      },
      onCancel () {
        this.tags = []
      },
      onSave () {
        this.$emit('saved', this.prepareBookmark())
        this.tags = []
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