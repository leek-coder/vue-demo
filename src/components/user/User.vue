<template>
  <div>
<!--      面包屑-->
      <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>

          <el-input placeholder="请输入内容" v-model="content" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

      </el-card>

  </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                content:""
            }
        }
    }
</script>

<style scoped>

</style>
