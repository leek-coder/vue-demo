<template>

    <el-dialog
            :visible.sync="dialogVisible"
            width="30%"   :before-close="resetHideDialog"  title="商品类型添加"
    >

        <el-form ref="addProductType" class="demo-ruleForm" :model="productType"   :rules="productTypeRules" label-width="85px">
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="name" label="分类名称" >
                <el-input placeholder="请输入分类名称"
                          v-model="productType.name"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitProductType">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>

    import {request} from "../../network/request";
    export default {
        name: "ProductTypeAdd",
        methods:{
            resetHideDialog(){
                this.$refs.addProductType.resetFields();
                this.$emit('productTypeDialogVisible');
            },
            submitProductType(){
                this.$refs.addProductType.validate(valid => {
                    if (valid) {
                        request({
                            method: "post",
                            url: "/product-service/product/type/save",
                            data: this.productType
                        }).then(res => {
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.resetHideDialog();
                            } else {
                                this.$message.error(res.message)
                            }
                        }).catch(err => {
                            this.$message.error("网络异常");
                        })

                    }
                });
            }
        },
        props:{
            dialogVisible:{
                type:Boolean
            }
        },
        data(){
            return {
                productType:{
                    name:""
                },
                productTypeRules:{
                    //验证分类名
                    name: [
                        {required: true, message: "请输入类型名称", trigger: "blur"},
                        {min: 2, max: 10, message: "2到10个字符", trigger: "blur"}
                    ],
                }
            }
        }
    }
</script>

<style scoped>

</style>
