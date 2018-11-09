<template>
  <div>
    <ListEdit
        @canceled="onCancel"
        @saved="onSave"
    >
    </ListEdit>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ListEdit from '../../components/ListEdit'

  export default {
    name: 'EditListScreen',
    props: {},
    components: {
      ListEdit
    },
    methods: {
      ...mapActions('bookmarks', [
        'createList',
        'setCurrentListId'
      ]),
      onCancel () {
        this.$xtransition('CANCEL')
      },
      onSave (name) {
        this.createList(name)
          .then((newList) => {
            this.setCurrentListId(newList.id)
            this.$xtransition('SAVE')
          })
      }
    }
  }
</script>

<style scoped>

</style>