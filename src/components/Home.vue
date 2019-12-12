<template>

    <el-button type="info" @click="logout">退出</el-button>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "Home",
        methods: {
            logout() {
                request({
                    url: "user/logout",
                    method: "get",
                }).then(res => {
                    if(res.code==0){
                          //退出成功  清理缓存
                         localStorage.clear();
                         this.$message.success(res.message);
                         this.$router.push("/login")
                    }else {
                          this.$message.error(res.message);
                          this.$router.push("/login")
                    }
                }).catch(err => {
                     this.$message.error("网络异常");
                })

            }
        }
    }
</script>

<style scoped>

</style>
