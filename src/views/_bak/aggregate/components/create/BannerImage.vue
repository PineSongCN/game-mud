<template>
    <div class="com-handle-BannerImage">
        <el-form
            v-if="visible.base"
            ref="dataForm"
            :key="key"
            v-loading="loading.base"
            :rules="rules.base"
            :model="data.base"
            :inline="true"
            label-width="auto"
            class="dialog-model-form"
        >
            <el-form-item
                v-for="item in loop.base"
                :key="item.key"
                :label="item.label"
                :prop="item.key"
            >
                <form-item
                    v-if="item.type !== 'diy'"
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
import { addTopImage, updateTopImage } from '@/api/manage/aggregate';
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
                return {
                    platformType: ''
                };
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
        const platformType = this.options.platformType
            .split(',')
            .map((item) => Number(item));
        const loop = {
            base: [
                {
                    label: '移动端：banner顶图',
                    key: 'appBannerImagUrl',
                    type: 'image',
                    value: '',
                    rule: true,
                    hidden: !platformType.includes(1)
                },
                {
                    label: 'PC端：banner顶图',
                    key: 'pcBannerImagUrl',
                    type: 'image',
                    value: '',
                    rule: true,
                    hidden: !platformType.includes(2)
                }
            ]
        };
        loop.base = loop.base.filter((item) => !item.hidden);
        const rules = validate(loop.base, {}, this);
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
                    // const base = { ...val };
                    const base = {};
                    for (const v of this.loop.base) {
                        base[v.key] =
                            typeof val[v.key] !== 'undefined'
                                ? val[v.key]
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
                // if(this.options.apInformationId && (!this.data.base.appBannerImagUrl && !this.data.base.pcBannerImagUrl)) {
                // }
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
                            const activityId = this.options.activityId;
                            const confirmData = {
                                activityId,
                                ...this.data.base
                            };
                            console.log('confirmData', confirmData);
                            let res;
                            this.loading.base = true;
                            const $API = this.view ? updateTopImage : addTopImage;
                            res = await addTopImage(confirmData);
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
<style lang="scss">
.com-handle-BannerImage {
    .el-form-item__label-wrap {
        float: none;
        margin-bottom: 12px;
    }
}
</style>
<style lang="scss" scoped></style>
