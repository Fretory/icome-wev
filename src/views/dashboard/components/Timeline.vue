<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getTimeLine } from '@/api/participation'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      timeline: null
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTimeLine(this.token).then(response => {
        this.timeline = response.data.timeline
      })
    }
  }
}
</script>
