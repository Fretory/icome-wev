<template>
  <!--  <div class="dashboard-container">-->
  <!--    <div class="dashboard-text">name: {{ name }}</div>-->
  <!--    <div class="dashboard-text">birthday: {{ birthday }}</div>-->
  <!--    <div class="dashboard-text">telephone: {{ telephone }}</div>-->
  <!--    <div class="dashboard-text">sex: {{ sex }}</div>-->
  <!--    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>-->
  <!--  </div>-->

  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <user-card :user="user" />
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Activity" name="activity">
              <activity />
            </el-tab-pane>
            <el-tab-pane label="Timeline" name="timeline">
              <timeline />
            </el-tab-pane>
            <el-tab-pane label="Account" name="account">
              <account :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
export default {
  name: 'Dashboard',
  // components: { UserCard, Activity },
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar',
      'birthday',
      'telephone',
      'sex'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        avatar: this.avatar,
        birthday: this.birthday,
        sex: this.sex,
        telephone: this.telephone
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
