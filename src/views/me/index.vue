<template>
  <div class="records-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Author" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusChanger }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="showDetail(row,$index)">
            Show
          </el-button>
          <el-button size="mini" type="info" @click="editDetail(row,$index)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="Details"
      :fullscreen="true"
    >
      <el-row>
        <el-col :span="4"><b>Title</b></el-col>
        <el-col :span="12">{{ temp.title }}</el-col>
        <el-col :span="2"><b>Time</b></el-col>
        <el-col :span="6">{{ temp.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
      </el-row>

      <el-divider />

      <el-row>
        <el-col :span="6"><b>Author</b></el-col>
        <el-col :span="18">
          <el-tag type="success">{{ temp.author }}</el-tag>
        </el-col>
      </el-row>

      <el-divider />

      <el-row>
        <el-col :span="6"><b>Description</b></el-col>
        <el-col :span="18">{{ temp.desc }}</el-col>
      </el-row>

      <el-divider />

      <el-row>
        <el-col :span="24">
          <el-steps :active="temp.status" finish-status="success">
            <el-step title="筹备中" />
            <el-step title="招募中" />
            <el-step title="已结束" />
          </el-steps>
        </el-col>
      </el-row>

      <el-divider />

      <el-table
        :data="joiners"
        height="250"
        border
        style="width: 100%"
      >
        <el-table-column align="center" label="ID" >
          <template slot-scope="{row}">
            <span>{{ row.joinerID }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Name" >
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="ApplyDate">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-divider />

      <div>
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { fetchAllPass, fetchMyList } from '@/api/article'
import { mapGetters } from 'vuex'
export default {
  name: 'Me',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return statusMap[status]
    },
    parseTime,
    statusChanger(status) {
      const statusMaps = ['筹备中', '招募中', '已结束']
      return statusMaps[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      joiners: null,
      joinersLength: 0,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: ''
      },
      temp: {
        id: undefined,
        timestamp: new Date(),
        title: '',
        status: 0,
        desc: '',
        author: ''
      },
      dialogFormVisible: false,
      queryJoiners: {
        id: 0
        // 项目id
      }
    }
  }, computed: {
    ...mapGetters(
      [
        'name',
        'token'
      ])
  },
  created() {
    this.listQuery.username = this.name
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMyList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    showDetail(row) {
      this.resetTemp()
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.queryJoiners.id = row.id
      this.joiners = null
      this.joinersLength = 0
      fetchAllPass(this.queryJoiners).then((response) => {
        this.joiners = response.data.items
        this.joinersLength = response.data.length
      })
    },
    editDetail(row) {
      console.log(row.id)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        timestamp: new Date(),
        title: '',
        status: 0,
        desc: '',
        author: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.records{
  &-container{
    margin: 30px;
  }
}
</style>
