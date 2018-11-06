<template>
  <div>
    <ListEdit @canceled="onCancel"></ListEdit>
  </div>
</template>

<script>
  import ListEdit from '../../components/ListEdit'

  export default {
    name: 'EditList',
    props: {},
    created () {
      console.log('Edit list screen')
    },
    components: {
      ListEdit
    },
    methods: {
      onCancel () {
        this.$xtransition('CANCEL')
      }
    }
  }
</script>

<style scoped>

</style>