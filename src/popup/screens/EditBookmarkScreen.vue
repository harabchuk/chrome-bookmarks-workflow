<template>
  <div>{{ title }} Bookmark</div>
</template>

<script>
  export default {
    name: 'EditBookmark',
    props: {},
    computed: {
      title () {
        return this.$xrouter.eventArgs['bookmark_id'] ? 'Edit' : 'New'
      }
    }
  }
</script>

<style scoped>

</style>