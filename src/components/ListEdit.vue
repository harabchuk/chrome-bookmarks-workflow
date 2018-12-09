<template>
  <div class="ListEditor">
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
          <div class="ListEditor-schemaDescription">{{ schemaDescription }}</div>
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
            v-if="showCancel"
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
      statusSchemas: Array,
      showCancel: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    computed: {
      currentList () {
        return {
          name: this.inputName,
          statusSchemaId: this.statusSchemaId
        }
      },
      schemaDescription () {
        const schema = this.statusSchemas.find(s => s.id === this.statusSchemaId)
        if (schema) {
          return schema.description
        }
        return ''
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
    margin-bottom: 5px;
  }
  .ListEditor-schemaDescription {
    margin-top: 7px;
    font-size: 12px;
    line-height: 16px;
  }
</style>