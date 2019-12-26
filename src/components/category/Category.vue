<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="dialogVisible=true">添加分类</el-button>
                </el-col>
            </el-row>
        </el-card>

        <category-add :dialogVisible="dialogVisible" @categoryDialogVisible="categoryDialogVisible"></category-add>
    </div>
</template>

<script>

    import CategoryAdd from "./CategoryAdd";

    export default {
        name: "Category",
        components: {
            CategoryAdd
        },
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            categoryDialogVisible() {
                this.dialogVisible = !this.dialogVisible;
            }
        }
    }
</script>

<style scoped>

</style>
