<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        logout(){
            this.$http.post('/account/logout/', {}).then((data)=>{
                if(data.data.tip === 0){
                    window.sessionStorage.clear()
                    this.$router.push('/login')
                }
            })

        }
    },
}
</script>

<style lang="less" scoped>

</style>