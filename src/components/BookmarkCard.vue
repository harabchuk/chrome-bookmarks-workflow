<template>
  <el-card v-if="bookmark" class="Card" shadow="hover" :body-style="{padding: '0'}">

    <div
        v-if="!editing"
        :class="['card-content', {active: active}]"
        class="BookmarkView"
        :style="{'border-left-color': statusColor }"
    >
      <div class="BookmarkView-content">
        <a @click="onLinkClick(bookmark)" class="BookmarkView-link" href="">{{ bookmark.title }}</a>
        <div class="BookmarkView-tags" v-if="bookmark.tags.length">
          <span class="BookmarkView-tag" :key="tag" v-for="tag in bookmark.tags">{{ tag }}</span>
        </div>
        <div class="BookmarkView-status" :style="{'background-color': statusColor }">
          {{ bookmark.status }}
        </div>
      </div>
      <i @click="onDeleteClick(bookmark)" class="BookmarkView-icon el-icon-delete" title="Delete bookmark"></i>
      <i @click="onEditClick(bookmark)" class="BookmarkView-icon el-icon-edit" title="Edit bookmark title"></i>
    </div>

    <EditBookmark
      v-if="editing"
      :bookmark="bookmark"
      :possibleStatuses="possibleStatuses"
      @cancel="onCancelClick"
      @saved="onSaveClick"
    />

  </el-card>
</template>

<script>
  import EditBookmark from './EditBookmark'

  export default {
    name: 'BookmarkCard',
    components: {
      EditBookmark
    },
    mounted () {
      console.log('card', this.possibleStatuses)
    },
    data () {
      return {
        editing: false
      }
    },
    props: {
      bookmark: Object,
      active: {
        type: Boolean,
        required: false,
        default: true
      },
      possibleStatuses: {
        type: Array
      }
    },
    computed: {
      statusColor () {
        const noColor = 'transparent'
        if (!this.bookmark.status) {
          return noColor
        }
        const foundStatus = this.possibleStatuses.find(i => i.name === this.bookmark.status)
        if (!foundStatus) {
          return noColor
        }
        return foundStatus.color
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
        this.editing = true
      },
      onSaveClick (bookmark) {
        this.editing = false
        this.$emit('updated', bookmark)
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
    border-left: solid 3px transparent;
    border-left-color: red;
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
    color: #333;
    text-decoration: none;
  }

  .BookmarkView-link:hover {
    color: dodgerblue;
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
    padding: 1px 2px 1px 2px;
    font-size: 10px;
    color: white;
    font-weight: bold;
    display: inline-block;
    margin: 0 5px 15px 15px;
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