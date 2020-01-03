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
                <el-col :span="20">
                    <el-tag type="info">数据列表</el-tag>
                </el-col>
                <el-col :span="4">
                    <el-button size="small" @click="backProductAttribute">返回</el-button>
                    <el-button size="small" @click="addProductAttribute">添加</el-button>
                </el-col>
            </el-row>

            <!--分类列表展示-->
            <el-table :data="productAttributeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="商品类型" prop="productCategoryName">
                </el-table-column>
                <el-table-column label="属性是否可选">
                    <template slot-scope="productAttributeList">
                        <el-tag type="success" v-if="productAttributeList.row.selectType===0">唯一</el-tag>
                        <el-tag type="success" v-if="productAttributeList.row.selectType===1">单选</el-tag>
                        <el-tag type="danger" v-else>多选</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="属性值的录入方式">
                    <template slot-scope="productAttributeList">
                        <el-tag type="success" v-if="productAttributeList.row.inputType===0">手工录入</el-tag>
                        <el-tag type="success" v-if="productAttributeList.row.inputType===1">从列表中选取</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="可选值列表" prop="inputList">
                </el-table-column> <el-table-column label="排序" prop="sort">
                </el-table-column>


                <el-table-column label="操作" width="180px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="productAttributeList">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                                   @click="editProductAttribute(productAttributeList.row.id)">编辑
                        </el-button>
                        <el-button size="mini" @click="deleteProductAttribute(productAttributeList.row)" type="danger"
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
    import {request} from "../../network/request";

    export default {
        name: "ProductAttribute",
        methods: {
            addProductAttribute() {
                this.$router.push({
                    path: "/product/attribute/add",
                    query: {
                        typeId: this.productType.id,
                        typeName: this.productType.name,
                        type: this.type

                    }
                });
            },
            editProductAttribute() {

            },
            deleteProductAttribute() {

            },
            backProductAttribute(){
                this.$router.go(-1)
            },
            handleCurrentChange(page){
                this.query.page = page;
                this.getProductAttributeList();
            },
            handleSizeChange(size){
                this.query.size = size;
                this.getProductAttributeList();
            },
            getProductAttributeList() {
                const params = {
                    type: this.type,
                    productCategoryId: this.productType.id,
                    page:this.query.page,
                    size:this.query.size

                }
                request({
                    method: "get",
                    params: params,
                    url: '/product-service/product/attribute/list'
                }).then(res => {
                   if(res.code==200){
                       this.productAttributeList  = res.data.attributeLists;
                       this.total = res.data.total;
                   }
                }).catch(err => {
                    this.$message.error("网络异常");
                })
            }
        },
        data() {
            return {
                productType: {},
                type: "",
                productAttributeList: [],
                total:0,
                query: {
                    page: 1,
                    size: 5
                },
            }
        },
        created() {

            this.productType = this.$route.query.row;
            this.type = this.$route.query.type;
            this.getProductAttributeList();
        }
    }
</script>

<style scoped>

</style>
