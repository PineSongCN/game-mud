<template>
    <div v-loading="loading.base" class="com-handle-ContentManage">
        <div v-if="comStep === 1 && update" class="c-new-box">
            <div class="c-title">新增板块 选择展示类型</div>
            <div class="c-list">
                <div
                    v-for="(item, index) in map.contentType"
                    :key="index"
                    class="c-item"
                    @click="createContent(item)"
                >
                    <img
                        class="c-img"
                        :src="require(`@/assets/aggregate/${item.icon}`)"
                    />
                    <div class="c-label">{{ item.label }}</div>
                </div>
            </div>
        </div>
        <div v-else-if="comStep === 1 && !update" class="c-new-box">
            <div class="c-title">暂无板块</div>
        </div>
        <div v-else-if="comStep === 2">
            <content-create
                v-for="item in data.base"
                :key="item.key + item.options.status"
                :ref="item.key"
                v-model="item.value"
                :options="item.options"
                :map="map"
                :update="update"
                @change="confirmSubmit"
            />
        </div>
    </div>
</template>

<script>
import { validate, validEmpty, isEqual } from '@/utils/validate';
import { aggregateDetail } from '@/api/manage/aggregate';
import FormItem from '@/components/FormItem/index';
import ContentCreate from './ContentCreate';

export default {
    components: { FormItem, ContentCreate },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: Array,
            default: () => {
                return [];
            }
        },
        map: {
            type: Object,
            default: () => {
                return {};
            }
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        update: {
            type: Boolean,
            default: true
        },
        view: {
            type: Boolean,
            default: false
        }
    },
    data() {
        // const platformType = this.value.platformType
        //     .split(',')
        //     .map((item) => Number(item));
        // const loop = {
        //     base: [
        //         {
        //             label: '移动端：banner顶图',
        //             key: 'appBannerImagUrl',
        //             type: 'image',
        //             value: '',
        //             rule: true,
        //             hidden: !platformType.includes(1)
        //         },
        //         {
        //             label: 'PC端：banner顶图',
        //             key: 'pcBannerImagUrl',
        //             type: 'image',
        //             value: '',
        //             rule: true,
        //             hidden: !platformType.includes(2)
        //         }
        //     ]
        // };
        // loop.base = loop.base.filter((item) => !item.hidden);
        // const rules = validate(loop.base, {}, this);
        return {
            // loop,
            // rules: {
            //     base: {
            //         ...rules
            //     }
            // },
            data: {
                base: []
            },
            visible: {
                base: false
            },
            loading: {
                base: false
            }
        };
    },
    computed: {
        comStep() {
            const step = this.data.base.length === 0 ? 1 : 2;
            return step;
        }
    },
    watch: {
        value: {
            handler: function (val) {
                if (val) {
                    if (val instanceof Array) {
                        this.data.base = val.map((item) => {
                            const key = `${Date.now()}${Math.random()}`;
                            const item2 = this.map.contentType.find(
                                (item2) => item2.zoneType === item.zoneType
                            );
                            // if(item.couponConfigLists && item.couponConfigLists.length > 0) {
                            //     item.coupon = item.couponConfigLists
                            // }
                            // console.log(item)
                            return {
                                key,
                                options: {
                                    key,
                                    type: item2.value,
                                    label: item2.label,
                                    api: item2.api,
                                    status: 1,
                                    platformType: this.options.platformType
                                },
                                value: {
                                    activityId:
                                        this.$parent.data.BaseInfo.activityId,
                                    zoneType: item2.zoneType,
                                    apInformationId:
                                        this.options.apInformationId,
                                    ...item
                                }
                            };
                        });
                    }
                }
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        this.load();
    },
    mounted() {},
    methods: {
        async load() {
            try {
                this.loading.base = true;
                if (this.options.apInformationId) {
                    const confirmData = {
                        apInformationId: this.options.apInformationId
                    };
                    const res = await aggregateDetail(confirmData);
                    const base = res.contents;
                    this.$emit('change', base);
                }
                this.visible.base = true;
                this.loading.base = false;
            } catch (e) {
                console.log('load:e', e);
                this.visible.base = true;
                this.loading.base = false;
            }
        },
        async createContent(item) {
            const key = `${Date.now()}${Math.random()}`;
            //unshift
            this.data.base.push({
                key,
                options: {
                    key,
                    type: item.value,
                    label: item.label,
                    api: item.api,
                    status: 0,
                    platformType: this.options.platformType
                },
                value: {
                    activityId: this.$parent.data.BaseInfo.activityId,
                    zoneType: item.zoneType
                }
            });
            await this.$nextTick();
            this.$refs[key][0].$el.scrollIntoView();
        },
        confirmSubmit() {
            // console.log('this.data.base', this.data.base);
            // const base = this.data.base.map((item) => item.value);
            // this.$emit('change', base);
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.com-handle-ContentManage {
    .c-new-box {
        width: 100%;
        padding-top: 0;
        .c-title {
            height: 44px;
            display: flex;
            align-items: center;

            font-size: 16px;
            font-weight: 600;
            &::before {
                content: ' ';
                width: 2px;
                height: 16px;
                background: #be956a;
                margin-right: 8px;
            }
        }
        .c-list {
            display: flex;
            // justify-content: space-between;
            .c-item {
                width: 270px;
                height: 114px;
                background: #ffffff;
                box-shadow: 0px 0px 5px 2px #f3f1f1;
                border-radius: 4px;
                border: 1px solid #ebeaea;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                margin-left: 24px;
                line-height: 1;
                &:nth-child(1) {
                    margin-left: 0;
                }
                &:hover {
                    border: 1px solid #be956a;
                    .c-label {
                        border-color: #be956a;
                        color: #be956a;
                    }
                }
                .c-img {
                    width: 24px;
                    height: 24px;
                    margin: 12px auto 18px auto;
                }
                .c-label {
                    width: 117px;
                    height: 32px;
                    background: #fafafa;
                    border-radius: 2px;
                    border: 1px solid #d6d6d6;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
