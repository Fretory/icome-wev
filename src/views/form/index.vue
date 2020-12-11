<template>
  <div class="app-container">
    <el-form ref="form" :rules="Rules" :model="form" label-width="120px" label-position="left">
      <el-form-item prop="name" label="Activity name">
        <el-input ref="name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item prop="desc" label="Description">
        <el-input ref="desc" v-model="form.desc" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length < 3 || value.length > 20) {
        callback(new Error('活动名称长度在 3 到 20个字符'))
      } else {
        callback()
      }
    }
    const validateDesc = (rule, value, callback) => {
      if (value.length < 15 || value.length > 200) {
        callback(new Error('活动描述长度在 15 到 200个字符'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        delivery: false,
        desc: ''
      },
      Rules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        desc: [{ required: true, trigger: 'blur', validator: validateDesc }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm('是否确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

