<template>
  <div class="TagList">
    <el-tag
        :key="tag"
        v-for="tag in tags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        size="mini"
        class="TagList-tag"
    >
      {{tag}}
    </el-tag>
    <el-input
        class="TagList-input"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
        v-else
        class="TagList-button"
        size="mini"
        @click="showInput"
        type="info"
    >
      + New Tag
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'TagList',
    data () {
      return {
        inputVisible: false,
        inputValue: ''
      }
    },
    props: {
      tags: {
        type: Array,
        required: false,
        default: []
      }
    },
    methods: {
      handleClose (tag) {
        this.$emit('deleted', tag)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.$emit('created', inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style scoped>
  .TagList-tag {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .TagList-button {
  }

  .TagList-input {
    width: 90px;
  }
</style>