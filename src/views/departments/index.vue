<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card
        v-loading="cardLoad"
        style="min-height=400px"
        element-loading-text="拼命加载中"
        element-loading-background="black"
      >
        <el-tabs>
          <el-tab-pane label="用户">
            <!-- 用了一个行列布局 -->
            <TreeItem
              :node="titleObj"
              @delDepartment="getDepartments"
            ></TreeItem>
            <!-- <el-tree
              :data="data"
              :props="defaultProps"
              default-expand-all
            ></el-tree> -->
            <el-tree :data="data" default-expand-all :props="defaultProps">
              <template v-slot="scope"
                ><TreeItem
                  :node="scope.node"
                  @delDepartment="getDepartments"
                ></TreeItem></template
            ></el-tree>

            <!-- @node-click="handleNodeClick" -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
    ></el-backtop> -->
  </div>
</template>

<script>
import TreeItem from './components/TreeItem.vue'
import { getDepartments } from '@/api/departments'
import { getDepartmentsDataRecursive } from './getDepartmentsData'
export default {
  filters: {},
  components: { TreeItem },
  data () {
    return {
      data: [], defaultProps: {
        children: 'children',
        label: 'name'
      },
      titleObj: {},
      // 加载
      cardLoad: true

    }
  },
  computed: {},
  watch: {},
  created () { this.getDepartments() },
  methods: {
    async getDepartments () {
      try {
        const res = await getDepartments()
        this.data = await getDepartmentsDataRecursive(res.depts, '')
        this.titleObj = res.depts[0]
        this.cardLoad = false
      } catch (err) { console.log(err) }
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 20px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
