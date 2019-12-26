<template>
    <el-dialog
            :visible.sync="grantDialogVisible"
            width="45%" :before-close="resetHideDialog" title="分配权限"
    >

        <!-- node-key='id' 表示选中选项的id值 check-strictly:设置父子节点不相关联 -->
        <el-tree ref="tree" show-checkbox node-key="nodeId" :data="grantList" :props="grantProperties"
                 default-expand-all check-strictly :default-checked-keys="defKeys"></el-tree>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitGrant">确 定</el-button>
  </span>

    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "GrantResource",
        props: {
            grantDialogVisible: {
                type: Boolean
            },
            grantList: {
                type: Array
            },
            defKeys: {
                type: Array
            },
            roleId: {
                type: Number
            }
        },
        data() {
            return {
                grantProperties: {
                    children: 'children',
                    label: 'name'
                },
            }
        },
        methods: {
            //取消弹框
            resetHideDialog() {
                this.$emit('grantDialogVisible');
            },
            //提交分配权限
            submitGrant() {
                let checkNodes = this.$refs.tree.getCheckedNodes();
                let nodes = [];
                checkNodes.forEach(e => {
                    nodes.push(e.nodeId)
                });
                const params = {
                    roleId: this.roleId,
                    resIds: nodes
                }
                request({
                    url: 'user-service/web/role/grant',
                    data: params,
                    method: 'post'
                }).then(res => {
                    if (res.code == 200) {
                        this.$emit('grantDialogVisible');
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    this.$message.error("系统异常")
                })


            },
            // childNodesChange(node) {
            //     let len = node.childNodes.length;
            //     for (let i = 0; i < len; i++) {
            //         node.childNodes[i].checked = false;
            //         this.childNodesChange(node.childNodes[i]);
            //     }
            // },
            // parentNodesChange(node) {
            //     if (node.parent) {
            //         for (let key in node) {
            //             if (key == "parent") {
            //                 node[key].checked = true;
            //                 this.parentNodesChange(node[key]);
            //             }
            //         }
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>
