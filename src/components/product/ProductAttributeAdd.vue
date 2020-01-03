<template>

    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品属性</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="width: 70%;margin: 0 auto">



            <el-form ref="productAttribute" :model="productAttribute" label-width="140px" :rules="productAttributeRules">
                <el-form-item label="属性名称：" prop="name">
                    <el-input v-model="productAttribute.name"></el-input>
                </el-form-item>
                <el-form-item label="商品类型：">
                    <el-select     v-model="productTypeName" placeholder="请选择商品类型">
                        <el-option v-for="item in this.productTypeList" :label="item.name" :value="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="属性是否可选：">
                    <el-radio-group v-model="productAttribute.selectType">
                        <el-radio label="0" :value="0">唯一</el-radio>
                        <el-radio label="1" :value="1">单选</el-radio>
                        <el-radio label="2" :value="2">复选</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="属性录入方式：">
                    <el-radio-group v-model="productAttribute.inputType">
                        <el-radio label="0" :value="0">手动录入</el-radio>
                        <el-radio label="1" :value="1">从列表中选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="inputList" label="属性值可选值列表：">
                    <el-input
                            type="textarea"
                            :rows="2"
                            v-model="productAttribute.inputList"
                            placeholder="请输入属性值"
                            :value="productAttribute.inputList"
                    >
                    </el-input>
                </el-form-item>

                <el-form-item label="排序属性：">
                    <el-input v-model="productAttribute.sort"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="primary" @click="addProductAttribute">提交</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>

</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "ProductAttributeAdd",
        data() {
            return {
                productAttribute: {
                    name: "",
                    productAttributeCategoryId: "",
                    selectType: "",
                    inputType: "",
                    inputList: "",
                    sort: 0,
                    type:""
                },
                productTypeList:[],
                productTypeName:"",
                productAttributeRules:{
                    //验证分类名
                    name: [
                        {required: true, message: "请输入属性名称", trigger: "blur"},
                        {min: 2, max: 10, message: "2到10个字符", trigger: "blur"}
                    ],
                }
            }
        },
        methods: {
            //添加商品属性
            addProductAttribute() {
                this.$refs.productAttribute.validate(valid => {
                    if (valid) {
                        request({
                            method: "post",
                            url: "/product-service/product/attribute/save",
                            data: this.productAttribute
                        }).then(res => {
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.$router.go(-2);
                            } else {
                                this.$message.error(res.message)
                            }
                        }).catch(err => {
                            this.$message.error("网络异常");
                        })

                    }
                });

            },
            cancel(){
                this.$router.go(-2);
            },
            getProductTypeList(){
                request({
                    method:"get",
                    url:"/product-service/product/type/select/list"
                }).then(res=>{
                    if(res.code==200){
                        this.productTypeList = res.data;
                    }else{
                        this.$message.error(res.message);
                    }
                }).catch(error=>{
                    this.message.error("网络异常");
                })
            },
        },
        created() {
            this.productAttribute.productAttributeCategoryId = this.$route.query.typeId;
            this.productTypeName = this.$route.query.typeName;
            this.productAttribute.type=this.$route.query.type;
            this.getProductTypeList();
        }
    }
</script>

<style scoped>

</style>
