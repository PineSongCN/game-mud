<template>
    <div class="page-web3">
        <button class="login-button" @click="login">登录</button>
    </div>
</template>

<script>
export default {
    name: 'Web3',
    components: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {
        login: async function () {
            const res = await this.$root.tryConnectWeb3();
            if (res) {
                // this.$toast.success('登录成功');
                this.$notify({ type: 'success', message: '登录成功' });
                this.$router.push({
                    name: 'Home'
                });
            }
        }
        // onBtnClick2() {
        //     const { web3, web3Provider, web3Account, web3Chain } = this;
        //     console.log(this, { web3, web3Provider, web3Account, web3Chain });
        // }
    }
};
</script>
<style lang="scss">
.page-web3 {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: rgb(36, 40, 44);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-button {
        width: 80%;
        height: 40px;
        color: #aaa;
        background: linear-gradient(to right, rgb(45, 43, 44), rgb(28, 31, 34));
        box-shadow: 1px 2px 30px rgb(10 0 0 / 55%),
            inset 1px 2px 22px rgb(66 10 0 / 45%);
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        &:hover,
        &:active {
            opacity: 0.9;
        }
    }
}
</style>
