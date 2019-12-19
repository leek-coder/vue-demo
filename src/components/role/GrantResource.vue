<template>
    <el-dialog
            :visible.sync="grantDialogVisible"
            width="45%" :before-close="resetHideDialog" title=""
    >

    </el-dialog>
</template>

<script>
    export default {
        name: "GrantResource",
        props: {
            grantDialogVisible: {
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
            resetHideDialog(){
                this.$emit('grantDialogVisible');
            }
        }

    }
</script>

<style scoped>

</style>
