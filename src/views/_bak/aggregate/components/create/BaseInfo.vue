<template>
    <div class="com-handle-BaseInfo">
        <el-form
            v-if="visible.base"
            ref="dataForm"
            :key="key"
            v-loading="loading.base"
            :rules="rules.base"
            :model="data.base"
            :inline="false"
            label-width="auto"
            class="dialog-model-form"
        >
            <el-form-item
                v-for="item in loop.base"
                :key="item.key"
                :label="item.label"
                :prop="item.key"
            >
                <template v-if="item.key === 'platformType'">
                    <form-item
                        v-model="data.base[item.key]"
                        :options="item"
                        :map="map"
                        :readonly="view"
                    />
                    <span v-if="!view" class="c-label"
                        >（一旦保存不允许修改）</span
                    >
                </template>
                <template v-else-if="['pcLink','appLink'].includes(item.key)">
                    <form-item
                        v-model="data.base[item.key]"
                        :options="item"
                        :map="map"
                        :readonly="view"
                    />
                </template>
                <form-item
                    v-else-if="item.type !== 'diy'"
                    v-model="data.base[item.key]"
                    :options="item"
                    :map="map"
                    :readonly="readonly"
                />
                <div v-else>
                    <template>
                        {{ item.key }}
                    </template>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { validate, validEmpty, isEqual } from '@/utils/validate';
import { aggregateAdd, updateBaseInfo } from '@/api/manage/aggregate';
// import { parseTime } from '@/utils';
import FormItem from '@/components/FormItem/index';

export default {
    components: { FormItem },
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
        const value = this.value;
        let platformType = [];
        if (value && value.platformType) {
            platformType = value.platformType.split(',').map((item) => Number(item));
        }
        const loop = {
            base: [
                {
                    label: 'PC端链接',
                    key: 'pcUrl',
                    type: 'input',
                    value: '',
                    hidden: !platformType.includes(2),
                    readonly: true,
                    width: '500px'
                },
                {
                    label: 'APP端链接',
                    key: 'appUrl',
                    type: 'input',
                    value: '',
                    hidden: !platformType.includes(1),
                    readonly: true,
                    width: '500px'
                },
                {
                    label: '活动名称',
                    key: 'activityName',
                    type: 'input',
                    value: '',
                    rule: true
                },
                {
                    label: '页面底色',
                    key: 'hpBottomColor',
                    type: 'color',
                    value: '',
                    rule: true
                },
                {
                    label: '展示平台',
                    key: 'platformType',
                    type: 'checkBox',
                    value: [],
                    rule: true
                },
                {
                    label: '活动时间',
                    key: 'activityTime',
                    type: 'DateTimeRange',
                    value: [],
                    milli: true,
                    rule: true
                },
                {
                    label: '转发描述',
                    key: 'relayDesc',
                    type: 'textarea',
                    value: '',
                    max: 30,
                },
                {
                    label: '转发图片',
                    key: 'relayImagUrl',
                    type: 'image',
                    value: '',
                    mini: true
                },
                {
                    label: '备注描述',
                    key: 'remarksDesc',
                    type: 'textarea',
                    value: ''
                }
            ]
        };
        loop.base = loop.base.filter((item) => !item.hidden);
        const rules = validate(loop.base, {}, this);
        // const base = {};
        // for (const v of loop.base) {
        //     base[v.key] =
        //         this.value && typeof this.value[v.key] !== 'undefined'
        //             ? this.value[v.key]
        //             : v.value;
        // }
        // if (typeof base.platformType === 'string') {
        //     base.platformType = base.platformType
        //         .split(',')
        //         .map((item) => Number(item));
        // }
        // if (this.value.activityStartTime && this.value.activityEndTime) {
        //     base.activityTime = [
        //         this.value.activityStartTime,
        //         this.value.activityEndTime
        //     ];
        // }
        return {
            loop,
            rules: {
                base: {
                    ...rules
                }
            },
            data: {
                base: {}
            },
            visible: {
                base: false
            },
            loading: {
                base: false
            },
            key: 0,
            readonly: true
        };
    },
    computed: {},
    watch: {
        value: {
            handler: function (val) {
                if (val) {
                    const base = { ...val };
                    if (typeof base.platformType === 'string') {
                        base.platformType = base.platformType
                            .split(',')
                            .map((item) => Number(item));
                    }
                    if (base.activityStartTime && base.activityEndTime) {
                        base.activityTime = [
                            base.activityStartTime,
                            base.activityEndTime
                        ];
                    }
                    for (const v of this.loop.base) {
                        base[v.key] =
                            typeof base[v.key] !== 'undefined'
                                ? base[v.key]
                                : v.value;
                    }
                    this.data.base = base;
                }
            },
            immediate: true,
            deep: true
        },
        update: {
            handler: function (val) {
                this.readonly = !val;
            },
            immediate: true
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
                this.visible.base = true;
                this.loading.base = false;
            } catch (e) {
                console.log('load:e', e);
                this.visible.base = true;
                this.loading.base = false;
            }
        },
        confirmSubmit() {
            return new Promise((resolve, reject) => {
                let ref = 'dataForm';
                this.$refs[ref].validate(async (valid) => {
                    try {
                        if (valid) {
                            const confirmData = { ...this.data.base };
                            confirmData.platformType =
                                confirmData.platformType.join(',');
                            confirmData.activityTime;
                            confirmData.activityStartTime =
                                confirmData.activityTime[0];
                            confirmData.activityEndTime =
                                confirmData.activityTime[1];
                            Reflect.deleteProperty(confirmData, 'activityTime');
                            console.log('confirmData', confirmData);
                            let res;
                            this.loading.base = true;
                            const $API = this.view ? updateBaseInfo : aggregateAdd;
                            res = await $API(confirmData);
                            res = { ...confirmData, ...res };
                            console.log('res', res);
                            this.$emit('change', res);
                            this.loading.base = false;
                            resolve();
                        } else {
                            reject('表单验证失败');
                        }
                    } catch (e) {
                        console.log('confirmForm:e', e);
                        reject(e);
                        this.loading.base = false;
                    }
                });
            });
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.com-handle-BaseInfo {
    .c-label {
        font-size: 12px;
        color: #909090;
    }
}
</style>
