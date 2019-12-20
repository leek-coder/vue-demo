<template>
    <el-dialog
            :visible.sync="grantRoleDialogVisible"
            width="45%" :before-close="resetGrantHideDialog" title="分配角色"
    >

        <div>
            <p>当前的用户：{{this.roleInfo.userName}}</p>
            <p>当前的角色：{{this.roleInfo.roleName}}</p>
            <p>分配新角色：

                    <el-select v-model="selectRoleId" placeholder="请选择响应状态" >
                        <el-option
                                v-for="item in this.roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="resetGrantHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitUserRole">确 定</el-button>
  </span>

    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "GrantRole",
        props: {
            grantRoleDialogVisible: {
                type: Boolean
            },
            roleInfo: {
                type: Object
            },
            roleList: {
                type: Array
            }
        },
        data() {
            return {
                selectRoleId:""
            }
        },
        methods: {
            resetGrantHideDialog() {
                this.selectRoleId = "";
                this.$emit('grantRoleDialogVisible');
            },
            submitUserRole() {
                if(!this.selectRoleId){
                    this.$message.error("请选择角色");
                    return;
                }
                request({
                    method:'get',
                    url:'web/user/grant',
                    params:{
                        rId:this.selectRoleId,
                        uId:this.roleInfo.id
                    }
                }).then(res=>{
                    if(res.code==200){
                        this.$emit('grantRoleDialogVisible');
                    }else{
                        this.$message.error(res.message);
                    }
                }).catch(err=>{
                    this.$message.error("系统异常");
                })
            }
        }

    }
</script>

<style scoped>

</style>
