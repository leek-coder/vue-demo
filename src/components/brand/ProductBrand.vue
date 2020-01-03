<template>

    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品品牌</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button  size="small" @click="addProductBrand">添加</el-button>
                </el-col>
            </el-row>

            <!--分类列表展示-->
            <el-table :data="productBrandList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="品牌首字母" prop="firstLetter">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="productBrandList">
                        <el-tag type="success" v-if="productBrandList.row.status==='0'">未删除</el-tag>
                        <el-tag type="danger" v-else>删除</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="排序" prop="sort">
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                </el-table-column>

                <el-table-column label="操作" width="180px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="productBrandList">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                                   @click="editProductBrand(productBrandList.row.id)">编辑
                        </el-button>
                        <el-button size="mini" @click="deleteProductBrand(productBrandList.row)" type="danger"
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

        <product-brand-add :dialogVisible="dialogVisible"
                           @productBrandDialogVisible="productBrandDialogVisible"></product-brand-add>
    </div>
</template>

<script>
    import ProductBrandAdd from "./ProductBrandAdd";
    import {request} from "../../network/request";

    export default {
        name: "ProductBrand",
        components: {
            ProductBrandAdd
        },
        data() {
            return {
                dialogVisible: false,
                productBrandList: [],
                total: 0,
                query: {
                    page: 1,
                    size: 5
                },
            }
        },
        methods: {
            addProductBrand() {
                this.dialogVisible = !this.dialogVisible;
            },
            productBrandDialogVisible() {
                this.dialogVisible = !this.dialogVisible;
                this.getProductBrandList();
            },
            handleSizeChange(size) {
                this.query.size = size;
                this.getProductBrandList();
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.getProductBrandList();
            },
            editProductBrand() {

            },
            deleteProductBrand() {

            },
            getProductBrandList() {
                request({
                    method: 'get',
                    url: 'product-service/product/brand/list',
                    params: {
                        level: 0,
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then(res => {
                    if (res.code == 200) {
                        this.productBrandList = res.data.productBrands;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => {
                    this.$message.error("网络请求异常");
                })
            }
        },
        created() {
            this.getProductBrandList();
        }
    }
</script>

<style scoped>

</style>
