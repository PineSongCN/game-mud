<template>
    <div class="com-handle-Preview">
        <div class="v-modal" tabindex="0" style="z-index: 2021"></div>
        <div class="inline">
            <div
                :class="{
                    'model-mobile': data.client === 'mobile',
                    'model-pc': data.client === 'pc'
                }"
            >
                <iframe class="model-inline" :src="comLink" frameborder="0"></iframe>
            </div>
            <div class="btn-box">
                <el-button
                    v-if="map.client.length > 1"
                    type="primary"
                    plain
                    size="small"
                    @click="switchClient"
                >
                    切换{{ data.client === 'mobile' ? 'PC端' : '移动端' }}效果
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="$emit('finished')"
                >
                    关闭预览
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        const platformType = this.value.platformType
            .split(',')
            .map((item) => Number(item));
        const client = [];
        if (platformType.includes(2)) {
            client.push({
                value: 'pc',
                label: 'PC端',
                link: `${this.value.pcUrl}&dev=on`
            });
        }
        if (platformType.includes(1)) {
            client.push({
                value: 'mobile',
                label: '移动端',
                link: `${this.value.appUrl}&dev=on`
            });
        }
        const map = {
            client
        };
        return {
            data: {
                base: {},
                client: platformType.includes(2) ? 'pc' : 'mobile'
            },
            map,
            visible: {
                base: true
            },
            loading: {
                base: false
            }
        };
    },
    computed: {
        comLink() {
            const client = this.map.client.find(
                (item) => item.value === this.data.client
            );
            return client.link;
        }
    },
    created() {},
    mounted() {},
    methods: {
        switchClient() {
            this.data.client = this.data.client === 'mobile' ? 'pc' : 'mobile';
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.com-handle-Preview {
    .inline {
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 3000;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .model-mobile {
            width: 310px;
            height: 627.87024px;
            font-size: 16px;
            background-color: #fff;
            margin: 0;
            box-sizing: border-box;
            overflow-y: auto;
            background-color: transparent;
            background-image: url(~@/assets/model/iPhoneX.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding: 48px 16px 38px 16px;
            overflow: hidden;
        }
        .model-pc {
            width: 1330px;
            height: 627.87024px;
            font-size: 16px;
            background-color: #fff;
            margin: 0;
            box-sizing: border-box;
            overflow-y: auto;
            background-color: transparent;
            background-image: url(~@/assets/model/PC-mini.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding: 43px 51px 50px 51px;
            overflow: hidden;
        }
        .model-inline {
            width: 100%;
            height: 100%;
            background: #fff;
        }
        .btn-box {
            margin-top: 36px;
        }
    }
}
</style>
