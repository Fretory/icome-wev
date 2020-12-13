<template>
  <div class="records-container">
    <el-row>
      <el-col :span="12">
        test1
      </el-col>
      <el-col :span="12">
        test2
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Records'
}
</script>

<style lang="scss" scoped>
.records{
  &-container{
    margin: 30px;
  }
}
</style>
