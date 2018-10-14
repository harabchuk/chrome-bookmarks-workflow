<template>
  <el-card v-if="bookmark" class="Card" shadow="hover" :body-style="{padding: '0'}">

    <div :class="['card-content', {active: active}]" v-if="!editing" class="BookmarkView">
      <div class="BookmarkView-content">
        <a @click="onLinkClick(bookmark)" class="BookmarkView-link" href="">{{ bookmark.title }}</a>
        <div class="BookmarkView-tags" v-if="bookmark.tags.length">
          <span class="BookmarkView-tag" :key="tag" v-for="tag in bookmark.tags">{{ tag }}</span>
        </div>
        <div class="BookmarkView-status">
          {{ bookmark.status }}
        </div>
      </div>
      <i @click="onDeleteClick(bookmark)" class="BookmarkView-icon el-icon-delete" title="Delete bookmark"></i>
      <i @click="onEditClick(bookmark)" class="BookmarkView-icon el-icon-edit" title="Edit bookmark title"></i>
    </div>

    <div class="BookmarkEdit editing" v-if="editing">
      <el-input
          type="textarea"
          :rows="2"
          placeholder=""
          v-model="textareaTitle">
      </el-input>
      <i @click="onSaveClick()" class="el-icon-check" title="Save changes"></i>
      <i @click="onCancelClick()" class="el-icon-close" title="Cancel changes"></i>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'BookmarkCard',
    data () {
      return {
        editing: false,
        textareaTitle: ''
      }
    },
    props: {
      bookmark: Object,
      active: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    methods: {
      onLinkClick (bookmark) {
        this.$emit('linkClick', bookmark)
      },
      onDeleteClick (bookmark) {
        this.$emit('delete', bookmark)
      },
      onEditClick (bookmark) {
        this.textareaTitle = this.bookmark.title
        this.editing = true
      },
      onSaveClick () {
        this.editing = false
        if (!this.textareaTitle || this.textareaTitle === this.bookmark.title) {
          return
        }
        this.bookmark.title = this.textareaTitle
        this.$emit('updated', this.bookmark)
      },
      onCancelClick () {
        this.editing = false
      }
    }
  }
</script>

<style scoped>
  .Card {
    margin-bottom: 5px;
  }

  .Card i {
    margin-top: 15px;
    margin-right: 3px;
    cursor: pointer;
    width: 15px;
    display: block;
    flex-grow: 0;
  }

  .Card i:hover {
    color: darkred;
  }

  .BookmarkView {
    display: flex;
  }

  .BookmarkView-content {
    flex: 1 0 0;
    align-items: center;
  }

  .BookmarkView-link {
    display: block;
    width: 100%;
    padding: 15px 5px 5px 15px;
  }

  .BookmarkView-link,
  .BookmarkView-link:visited {
    color: dodgerblue;
    text-decoration: none;
  }

  .BookmarkView-link:hover {
    text-decoration: underline;
  }

  .BookmarkView-tags {
    padding: 0 5px 5px 15px;
  }

  .BookmarkView-tag {
    color: grey;
    margin-right: 1em;
    font-size: 10px;
  }

  .BookmarkView-status {
    padding: 0 5px 15px 15px;
    font-size: 10px;
    color: grey;
    font-weight: bold;
  }

  .active .BookmarkView-link {
    font-weight: bold;
  }

  .BookmarkEdit {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    padding-right: 15px;
  }

  .el-icon-check {
    color: green;
  }

  .el-icon-close {
    color: darkred;
  }

  .editing textarea {
    font-size: 9px !important;
  }


</style>