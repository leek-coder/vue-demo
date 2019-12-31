<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>三级分类列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>


            <!--分类列表展示-->
            <el-table :data="categoryList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="上级分类">
                    {{$route.query.parentName}}
                </el-table-column>
                <el-table-column label="级别">
                    <template slot-scope="categoryList">
                        <el-tag>三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="图片" width="170px">

                    <!--使用作用域插槽来实现-->
                    <template slot-scope="categoryList">
                        <el-image style="width: 70px; height: 70px" :src="categoryList.row.imgUrl"></el-image>

                    </template>

                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="categoryList">
                        <el-tag type="success" v-if="categoryList.row.status===0">未删除</el-tag>
                        <el-tag type="danger" v-else>删除</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="设置" width="170px">

                    <!--使用作用域插槽来实现-->
                    <template slot-scope="categoryList">
                        <el-button size="mini"
                                   @click="preCategory()">返回上级
                        </el-button>

                    </template>

                </el-table-column>

                <el-table-column label="操作" width="120px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="categoryList">
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

    </div>
</template>

<script>

    import CategoryAdd from "./CategoryAdd";
    import {request} from "../../network/request";

    export default {
        name: "GrandsonCategory",
        components: {
            CategoryAdd
        },
        data() {
            return {
                categoryList: [],
                query: {
                    page: 1,
                    size: 5,
                    level: 2,
                    parentId: ''
                },
                total: 0
            }
        },
        methods: {
            getCategoryLists() {
                request({
                    method: 'get',
                    url: 'product-service/category/list',
                    params: {
                        level: this.query.level,
                        parentId:this.query.parentId,
                        page: this.query.page,
                        size: this.query.size
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
            preCategory(){
                this.$router.go(-1);
            },
            nextCategory(row) {
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
            //// html 取参  $route.query.id
            // script 取参  this.$route.query.id
            this.query.parentId = this.$route.query.id;
            this.getCategoryLists();
        }
    }
</script>

<style scoped>

</style>
