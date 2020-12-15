<template>
  <div class="users-container">
    <el-row :gutter="20">
      <el-col v-for="item in list" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <el-avatar :src="computeAvatar(item.username)" />
              </el-col>
              <el-col :span="12">
                <!--                <el-tag>{{ item.username }}</el-tag>-->
                {{ item.username }}
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="12"><b>性别</b></el-col>
              <el-col :span="12">{{ item.sex }}</el-col>
              <!--              <el-col :span="12"><el-tag type="danger">{{ item.sex }}</el-tag></el-col>-->
            </el-row>
            <el-row>
              <el-col :span="12"><b>手机号</b></el-col>
              <el-col :span="12">{{ item.tel }}</el-col>
              <!--              <el-col :span="12"><el-tag type="warning">{{ item.tel }}</el-tag></el-col>-->
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { generateFromString } from 'generate-avatar'
import { fetchAllStu } from '@/api/allusers'
export default {
  name: 'User',
  data() {
    return {
      list: null,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    generateFromString,
    computeAvatar(username) {
      return `data:image/svg+xml;utf8,${generateFromString(username)}`
    },
    getList: function() {
      fetchAllStu().then((response) => {
        this.list = response.data.items
        this.total = response.data.total
      })
    }
  }
}
</script>

<style scoped>
.users-container{
  margin-top: 30px;
}
.el-col{
  margin-top:25px
}
</style>
