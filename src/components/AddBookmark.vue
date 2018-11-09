<template>
  <div class="AddBookmark">
    <el-button size="mini" @click="onAdd" type="primary">+ Bookmark</el-button>
  </div>
</template>

<script>
  export default {
    name: 'AddBookmark',
    methods: {
      onAdd () {
        this.$emit('clicked')
      }
    }
  }
</script>

<style scoped>

</style>