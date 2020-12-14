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
      @sort-change="sortChange"
    >
      <el-table-column :class-name="getSortClass('id')" align="center" label="ID" prop="id" sortable="custom" width="80">
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
      <el-table-column label="Detail" width="100">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="showDetail(row,$index)">
            Show
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog
      :visible.sync="dialogFormVisible"
      title="Details"
    >
      <el-row>
        <el-col :span="6"><b>Title</b></el-col>
        <el-col :span="18">{{ temp.title }}</el-col>
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
        <el-col :span="6"><b>Time</b></el-col>
        <el-col :span="18">{{ temp.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
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

      <div>
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" :disabled="(temp.status!==1) || (applyStatus)" :loading="loading" @click.native.prevent="applyList">
          Apply
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { apply } from '@/api/apply'
export default {
  name: 'Records',
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
  }, data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        timestamp: new Date(),
        title: '',
        status: 0,
        desc: '',
        author: ''
      },
      dialogFormVisible: false,
      loading: false,
      applyStatus: true
    }
  },
  computed: {
    ...mapGetters(
      [
        'name',
        'token'
      ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    showDetail: function(row) {
      this.resetTemp()
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
    }, resetTemp() {
      this.temp = {
        id: undefined,
        timestamp: new Date(),
        title: '',
        status: 0,
        desc: '',
        author: ''
      }
      this.applyStatus = false
    },
    applyList() {
      this.loading = true
      const data = {
        username: this.name,
        token: this.token,
        id: this.temp.id
      }
      return new Promise((resolve, reject) => {
        apply(data).then(response => {
          const { data } = response
          this.$message({
            message: data,
            type: 'success'
          })
          this.loading = false
          this.applyStatus = true
        }).catch(error => {
          this.$message.error('申请失败')
          reject(error)
        })
      })
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
