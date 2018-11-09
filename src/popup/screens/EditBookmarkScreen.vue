<template>
  <div>Bookmark</div>
</template>

<script>
  export default {
    name: 'EditBookmarkScreen',
    props: {},
    mounted () {
      console.log('New bookmark', this.bookmarkId)
    },
    computed: {
      bookmarkId () {
        return this.$xrouter.eventArgs['bookmark_id']
      }
    }
  }
</script>

<style scoped>

</style>