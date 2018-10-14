<template>
  <div class="Status">
    <span v-if="showLabel" class="Status-label">{{ label }}</span>
    <el-dropdown @command="onStatusChange" trigger="click" size="mini">
      <div class="Status-dropDown">
        <span>{{ currentStatusVisible }}</span><i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="Status-dropDown-items">
        <el-dropdown-item
            v-for="status in possibleStatuses"
            :key="status.name"
            :command="status.name"
        >
          {{ status.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'StatusSelector',
    props: {
      possibleStatuses: {
        type: Array
      },
      currentStatus: {
        type: String,
        required: false,
        default: null
      },
      showLabel: {
        type: Boolean,
        required: false,
        default: true
      },
      label: {
        type: String,
        required: false,
        default: 'Status:'
      },
      notSelectedTitle: {
        type: String,
        required: false,
        default: 'Not selected'
      }
    },
    computed: {
      currentStatusVisible () {
        const foundStatus = this.possibleStatuses.find(i => i.name === this.currentStatus)
        if (!this.currentStatus || !foundStatus) {
          return this.notSelectedTitle
        }
        return foundStatus.name
      }
    },
    methods: {
      onStatusChange (name) {
        this.$emit('changed', name)
      }
    }
  }
</script>

<style scoped>
  .Status {
    display: inline-block;
  }
  .Status-dropDown, .Status-label {
    font-size: 14px;
  }
</style>