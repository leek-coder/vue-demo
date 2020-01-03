<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品类型</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button size="small" @click="addProductType">添加</el-button>
                </el-col>
            </el-row>


            <!--分类列表展示-->
            <el-table :data="productTypeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="类型名称" prop="name"></el-table-column>
                <el-table-column label="属性数量" prop="attributeCount">
                </el-table-column>
                <el-table-column label="参数数量" prop="paramCount">
                </el-table-column>
                <el-table-column label="设置" width="210px">

                    <!--使用作用域插槽来实现-->
                    <template slot-scope="productTypeList">
                        <el-button size="mini"
                                   @click="attributeList(productTypeList.row)">属性列表
                        </el-button>
                        <el-button size="mini"
                                   @click="paramList(productTypeList.row)">参数列表
                        </el-button>

                    </template>

                </el-table-column>

                <el-table-column label="操作" width="180px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="productTypeList">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                                   @click="editProductType(productTypeList.row.id)">编辑
                        </el-button>
                        <el-button size="mini" @click="deleteProductType(productTypeList.row)" type="danger"
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

        <product-type-add :dialogVisible="dialogVisible"
                          @productTypeDialogVisible="productTypeDialogVisible"></product-type-add>
    </div>
</template>

<script>
    import ProductTypeAdd from "./ProductTypeAdd";
    import {request} from "../../network/request";

    export default {
        name: "ProductType",
        components: {
            ProductTypeAdd
        },
        methods: {
            addProductType() {
                this.dialogVisible = !this.dialogVisible;
            },
            productTypeDialogVisible() {

                this.dialogVisible = !this.dialogVisible;
                this.getProductTypeList();
            },
            //编辑商品类型
            editProductType(id) {

            },
            //删除商品类型
            deleteProductType() {

            },
            //
            handleSizeChange(size) {
            this.query.size = size;
            this.getProductTypeList();
            },
            handleCurrentChange(page) {
            this.query.page = page;
            this.getProductTypeList();
            },
            //查看属性列表
            attributeList(row) {
                //product/attribute
                //跑到下级页面
                this.$router.push({
                    path:"/product/attribute",
                    query:{
                        row:row,
                        type:"0"
                    }
                });
            },
            //查看参数列表
            paramList(row) {
                //跑到下级页面
                this.$router.push({
                    path:"/product/attribute",
                    query:{
                        row:row,
                        type:"1"
                    }
                });
            },
            getProductTypeList() {
                request({
                    method: 'get',
                    url: '/product-service/product/type/list',
                    params: {
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then(res => {
                    if (res.code == 200) {
                        this.productTypeList = res.data.attributes;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => {
                    this.$message.error("网络请求异常");
                })
            }
        },
        data() {
            return {
                dialogVisible: false,
                productTypeList: [],
                total: 0,
                query: {
                    page: 1,
                    size: 5
                }
            }
        },
        created() {
            this.getProductTypeList();
        }
    }
</script>

<style scoped>

</style>
