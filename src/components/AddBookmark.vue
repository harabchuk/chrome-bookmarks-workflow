<template>
  <div>
    <div v-if="!editing">
      <el-button size="mini" @click="onAdd">+ Bookmark</el-button>
    </div>
    <div v-if="editing">
      <el-input type="textarea" v-model="inputTitle"></el-input>
      <TagList :tags="tags" @created="onTagCreated" @deleted="onTagDeleted"></TagList>
      <el-button type="primary" size="mini" @click="onSave">Save</el-button>
      <el-button type="default" size="mini" @click="onCancel">Cancel</el-button>
    </div>
  </div>
</template>

<script>
  import TagList from './TagList'

  export default {
    name: 'AddBookmark',
    data () {
      return {
        tags: [],
        editing: false,
        inputTitle: ''
      }
    },
    components: {
      TagList
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
      }
    },
    methods: {
      prepareBookmark () {
        return {
          tags: this.tags,
          title: this.inputTitle,
          url: this.url
        }
      },
      onTagCreated (newTag) {
        this.tags.push(newTag)
      },
      onTagDeleted (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      onAdd () {
        this.inputTitle = this.title
        this.editing = true
      },
      onCancel () {
        this.editing = false
        this.tags = []
      },
      onSave () {
        this.$emit('saved', this.prepareBookmark())
        this.editing = false
        this.tags = []
      }
    }
  }
</script>

<style scoped>
</style>