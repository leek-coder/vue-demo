<template>
    <el-dialog
            :visible.sync="grantRoleDialogVisible"
            width="45%" :before-close="resetGrantHideDialog" title="分配角色"
    >

    </el-dialog>
</template>

<script>
    export default {
        name: "GrantRole",
        props: {
            grantRoleDialogVisible: {
                type: Boolean
            },
            roleInfo: {
                type: Object
            }
        },
        data() {
            return {}
        },
        methods: {
            resetGrantHideDialog(){
                this.$emit('grantRoleDialogVisible');
            }
        }

    }
</script>

<style scoped>

</style>
