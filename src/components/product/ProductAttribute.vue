<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品属性列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button size="small" @click="addProductAttribute">添加</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ProductAttribute",
        methods: {
            addProductAttribute() {
                console.log("addProductAttribute====")
            }
        }
    }
</script>

<style scoped>

</style>
