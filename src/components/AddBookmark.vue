<template>
  <div>

    <div v-if="!editing && !bookmark" class="AddBookmark">
      <el-button size="mini" @click="onAdd" type="primary">+ Bookmark</el-button>
    </div>

    <div v-if="!editing && bookmark" class="ExistingBookmark">
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
      </el-card>

    </div>

    <div v-if="editing" class="EditBookmark">
      <span class="title">New bookmark</span>
      <el-input type="textarea" v-model="inputTitle" class="EditBookmark-input"></el-input>
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
      },
      bookmark: {
        type: Object,
        required: false,
        default: null
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