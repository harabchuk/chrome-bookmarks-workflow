<template>
  <div class="ListEditor1">
      <el-form label-width="70px" label-position="left" size="mini">
        <el-form-item label="Title">
          <el-input
             placeholder="Enter the new list title"
             v-model="inputName"
             size="mini"
             maxlength="29"
          />
        </el-form-item>
        <el-form-item label="Statuses">
          <el-select v-model="statusSchemaId" placeholder="Select status schema" size="mini">
            <el-option
              size="mini"
              v-for="schema in statusSchemas"
              :value="schema.id"
              :key="schema.id"
              :label="schema.title"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="onSave"
            :disabled="!inputName.trim() || !statusSchemaId"
          >
            Save
          </el-button>
          <el-button
            type="default"
            size="mini"
            @click="onCancel"
          >
            Cancel
          </el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: 'ListEdit',
    data () {
      return {
        inputName: '',
        statusSchemaId: ''
      }
    },
    props: {
      statusSchemas: Array
    },
    computed: {
      currentList () {
        return {
          name: this.inputName,
          statusSchemaId: this.statusSchemaId
        }
      }
    },
    methods: {
      onSave () {
        this.$emit('saved', this.currentList)
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