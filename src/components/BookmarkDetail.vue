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
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'BookmarkDetail',
    props: {
      bookmark: {
        type: Object
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