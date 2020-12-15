<template>
  <el-form ref="userInfo" :model="userInfo" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="userInfo.name" />
    </el-form-item>
    <el-form-item label="Telephone" prop="telephone">
      <el-input v-model.trim="userInfo.telephone" />
    </el-form-item>
    <el-form-item label="Sex">
      <el-radio-group v-model.trim="userInfo.sex" prop="sex">
        <el-radio label="female" />
        <el-radio label="male" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Birthday" prop="birthday">
      <el-date-picker
        v-model="userInfo.birthday"
        type="date"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          telephone: '',
          avatar: '',
          role: '',
          sex: '',
          birthday: ''
        }
      }
    }
  },
  data() {
    return {
      userInfo: JSON.parse(JSON.stringify(this.user)),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, message: '请输入大于2个字符的名字', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { min: 5, max: 11, message: '请输入合法的手机号', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
