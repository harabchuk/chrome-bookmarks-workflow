<template>
  <div>
    <span class="Popup-sectionTitle">New list</span>
    <ListEdit
      :statusSchemas="statusSchemas"
      @canceled="onCancel"
      @saved="onSave"
    >
    </ListEdit>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ListEdit from '../../components/ListEdit'

  export default {
    name: 'EditListScreen',
    props: {},
    components: {
      ListEdit
    },
    computed: {
      ...mapState('statuses', [
        'statusSchemas'
      ])
    },
    methods: {
      ...mapActions('bookmarks', [
        'createList',
        'setCurrentListId'
      ]),
      onCancel () {
        this.$xtransition('CANCEL')
      },
      onSave (list) {
        this.createList(list)
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