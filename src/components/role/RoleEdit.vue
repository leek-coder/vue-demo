<template>
    <el-dialog
            :visible.sync="editDialogVisible"
            width="45%" :before-close="resetHideDialog" title="角色编辑"
    >

        <el-form ref="editRole" class="demo-ruleForm" :model="roleInfo" :rules="roleRules" label-width="75px">

            <el-input type="hidden"
                      v-model="roleInfo.id" :value="roleInfo.id"></el-input>
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="name" label="角色名" >
                <el-input placeholder="请输入角色名称"
                          v-model="roleInfo.name"></el-input>
            </el-form-item>
            <el-form-item prop="roleKey" label="角色key" >
                <el-input placeholder="请输入角色key" disabled
                          v-model="roleInfo.roleKey"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="roleInfo.description"
                        placeholder="请输入角色描述"
                        :value="roleInfo.description"
                >
                </el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitRole">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";
    import validUser from "../../js/ValidateUser";

    export default {
        name: "RoleEdit",
        props: {
            editDialogVisible: {
                type: Boolean
            },
            roleInfo: {
                type: Object
            }
        },
        methods:{
            //提交角色编辑
            submitRole(){
                this.$refs.editRole.validate(valid => {
                    if(valid){
                        request({
                            method:'post',
                            url:'user-service/web/role/update',
                            data:this.roleInfo
                        }).then(res=>{
                            //成功
                            if(res.code==200){
                                this.$message.success(res.message);
                                this.$refs.editRole.resetFields();
                                this.$emit('editDialogVisible');
                            }else{
                                this.$message.error(res.message);
                            }
                        }).catch(err=>{
                            this.$message.error("网络异常");
                        })
                    }
                })

            },
            resetHideDialog(){
                this.$refs.editRole.resetFields();
                this.$emit('editDialogVisible');
            }

        },
        data(){
            return{
                //这是登陆表单的数据绑定对象
                addRole: {
                    name: '',
                    roleKey:'',
                    description:'',
                    id:''

                },
                roleRules:{
                    //验证角色名
                    name: [
                        {required: true, message: "请输入角色名称", trigger: "blur"},
                        {min: 3, max: 10, message: "3到10个字符", trigger: "blur"}
                    ],
                    roleKey: [
                        {required: true, message: "请输入角色key", trigger: "blur"},
                        {min: 3, max: 10, message: "3到10个字符", trigger: "blur"}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
