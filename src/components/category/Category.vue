<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>一级分类列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button size="small" @click="addCategory">添加</el-button>
                </el-col>
            </el-row>


            <!--分类列表展示-->
            <el-table :data="categoryList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="级别">
                    <template slot-scope="categoryList">
                        <el-tag>一级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="categoryList">
                        <el-tag type="success" v-if="categoryList.row.status===0">未删除</el-tag>
                        <el-tag type="danger" v-else>删除</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="设置"  width="170px">

                    <!--使用作用域插槽来实现-->
                    <template slot-scope="categoryList">
                        <el-button size="mini"
                                   @click="nextCategory(categoryList.row)">查看下级
                        </el-button>

                    </template>

                </el-table-column>

                <el-table-column label="操作" width="180px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="categoryList">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                                   @click="editCategory(categoryList.row.id)">编辑
                        </el-button>
                        <el-button size="mini" @click="deleteCategory(categoryList.row)" type="danger"
                                   icon="el-icon-delete">
                            删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--分页插件-->
            <el-pagination v-show="total > 0 "
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page"
                    :page-sizes="[5, 10, 15]"
                    :page-size="query.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>


        </el-card>

        <category-add :categoryList="categoryTrees" :dialogVisible="dialogVisible"
                      @categoryDialogVisible="categoryDialogVisible"></category-add>
    </div>
</template>

<script>

    import CategoryAdd from "./CategoryAdd";
    import {request} from "../../network/request";

    export default {
        name: "Category",
        components: {
            CategoryAdd
        },
        data() {
            return {
                dialogVisible: false,
                categoryTrees: {},
                categoryList: [],
                query:{
                    page:1,
                    size:5
                },
                total:0
            }
        },
        methods: {
            categoryDialogVisible() {
                this.dialogVisible = !this.dialogVisible;
                this.getCategoryLists();
            },
            //弹出添加分类对话框
            addCategory() {
                request({
                    method: 'get',
                    url: 'product-service/category/tree/1'
                }).then(res => {
                    if (res.code == 200) {
                        this.dialogVisible = !this.dialogVisible;
                        this.categoryTrees = res.data;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => {
                    this.$message.error("网络请求异常");
                })
            },
            getCategoryLists(){
                request({
                    method: 'get',
                    url: 'product-service/category/list',
                    params: {
                        level: 0,
                        page:this.query.page,
                        size:this.query.size
                    }
                }).then(res => {
                    if (res.code == 200) {
                        this.categoryList = res.data.queries;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => {
                    this.$message.error("网络请求异常");
                })
            },
            //编辑分类
            editCategory() {

            },
            //删除分类
            deleteCategory() {

            },
            handleSizeChange(size) {
                this.query.size = size;
                this.getCategoryLists();
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.getCategoryLists();
            },
            nextCategory(row){
                //跑到下级页面
                this.$router.push({
                    path:"/next/category",
                    query:{
                        parentName:row.name,
                        id:row.id
                    }
                });
            }
        },
        created() {
            //获取分类列表
            this.getCategoryLists();
        }
    }
</script>

<style scoped>

</style>
