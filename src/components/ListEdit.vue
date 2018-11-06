<template>
  <div class="ListEditor">
      <el-input  class="ListEditor-input"
                 placeholder="Enter the new list title"
                 v-model="inputName"
                 size="mini"
                 maxlength="29"
      >
      </el-input>
      <el-button class="ListEditor-button"
                 type="primary"
                 size="mini"
                 @click="onSave"
                 :disabled="!inputName"
      >
        Save
      </el-button>
      <el-button class="ListEditor-button"
                 type="default"
                 size="mini"
                 @click="onCancel"
      >
        Cancel
      </el-button>
    </div>
</template>

<script>
  export default {
    name: 'ListEdit',
    data () {
      return {
        inputName: ''
      }
    },
    props: {},
    methods: {
      onSave () {
        this.$emit('created', this.inputName)
        this.inputName = ''
      },
      onCancel () {
        this.$emit('canceled')
      }
    }
  }
</script>

<style scoped>
  .ListEditor {
    display: flex;
    margin-bottom: 5px;
  }
  .ListEditor-input {
    flex: 1 0 0;
  }
  .ListEditor-button {
    margin-left: 5px;
  }
</style>