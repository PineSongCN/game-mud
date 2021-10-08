<template>
    <div class="com-handle-ContentCreate">
        <div class="c-title">
            <div class="inline">{{ comTitle }}</div>
            <div v-if="options.status === 0 && update">
                <el-button type="primary" plain size="small" @click="del">
                    取消
                </el-button>
                <el-button type="primary" size="small" @click="confirmSubmit">
                    保存
                </el-button>
            </div>
            <div v-else-if="update">
                <el-button type="primary" plain size="small" @click="del">
                    删除
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="options.status = 0"
                >
                    编辑
                </el-button>
            </div>
        </div>
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
                <template v-if="item.key === 'itemNoList'">
                    <div class="couponConfig">
                        <div class="label">共{{ data.itemNo.length }}个</div>
                        <div
                            v-if="update && options.status == 0"
                            class="button"
                            @click="visible.itemNo = !data.readonly"
                        >
                            选择
                        </div>
                    </div>
                    <div class="itemNoList-sort">
                        <draggable
                            v-model="data.itemNo"
                            :disabled="true"
                            @end="data.base[item.key] = data.itemNo.join(',')"
                        >
                            <transition-group
                                class="transition-wrapper"
                                name="sort"
                            >
                                <div
                                    v-for="(item2, index2) in data.itemNo"
                                    :key="item2"
                                    class="drag-item sort-item"
                                    :class="{
                                        disabled: !(
                                            options.status === 0 && update
                                        )
                                    }"
                                >
                                    <el-tag
                                        type="info"
                                        :closable="
                                            options.status === 0 && update
                                        "
                                        @close="
                                            data.itemNo.splice(index2, 1) &&
                                                (data.base[item.key] =
                                                    data.itemNo.join(','))
                                        "
                                        >{{ item2 }}</el-tag
                                    >
                                </div>
                            </transition-group>
                        </draggable>
                    </div>

                    <dialog-item-no
                        v-if="visible.itemNo"
                        v-model="data.itemNo"
                        :table="loop.table.itemNo"
                        :map="FormatMap"
                        @finished="visible.itemNo = false"
                        @change="data.base[item.key] = data.itemNo.join(',')"
                    />
                </template>
                <template v-else-if="item.key === 'couponConfigLists'">
                    <div>
                        <div class="couponConfig">
                            <div class="label">
                                共{{ data.base[item.key].length }}个
                            </div>
                            <div
                                v-if="update && options.status == 0"
                                class="button"
                                @click="visible.couponConfig = !data.readonly"
                            >
                                选择
                            </div>
                        </div>
                        <div class="couponConfigLists-sort">
                            <draggable :disabled="true">
                                <transition-group
                                    class="transition-wrapper"
                                    name="sort"
                                >
                                    <div
                                        v-for="(item2, index2) in data.base[
                                            item.key
                                        ]"
                                        :key="item2.batchNo"
                                        class="drag-item sort-item"
                                        :class="{
                                            active: item2.active,
                                            disabled: !(
                                                options.status === 0 && update
                                            )
                                        }"
                                    >
                                        <div style="display: flex">
                                            <form-item
                                                v-if="platformType.includes(2)"
                                                v-model="item2.couponImgaUrl"
                                                :options="{
                                                    label: 'PC端',
                                                    key: 'coupon',
                                                    type: 'image',
                                                    value: '',
                                                    mini: true,
                                                    showLabel: 'PC端'
                                                }"
                                                :map="FormatMap"
                                                :readonly="data.readonly"
                                                class="coupon-upload"
                                            />
                                            <form-item
                                                v-if="platformType.includes(1)"
                                                v-model="item2.appCouponImgaUrl"
                                                :options="{
                                                    label: '移动端',
                                                    key: 'coupon',
                                                    type: 'image',
                                                    value: '',
                                                    mini: true,
                                                    showLabel: '移动端'
                                                }"
                                                :map="FormatMap"
                                                :readonly="data.readonly"
                                                class="coupon-upload"
                                            />
                                        </div>
                                        <div
                                            class="coupon-label"
                                            :title="item2.batchNo"
                                        >
                                            批次号：{{ item2.batchNo }}
                                        </div>
                                        <div
                                            class="coupon-label"
                                            :title="item2.couponName"
                                        >
                                            <el-tag type="primary">
                                                {{
                                                    formatCoupon(
                                                        item2.couponType
                                                    )
                                                }}
                                            </el-tag>
                                            {{ item2.couponName }}
                                        </div>
                                        <i
                                            v-if="update && options.status == 0"
                                            class="el-icon-circle-close delete"
                                            @click="deleteCoupon(index2)"
                                        ></i>
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>

                    <dialog-coupon
                        v-if="visible.couponConfig"
                        v-model="data.couponConfig"
                        :table="loop.table.couponConfig"
                        :map="FormatMap"
                        @finished="visible.couponConfig = false"
                        @change="
                            data.base[item.key] = data.couponConfig.map(
                                (item) => item
                            )
                        "
                    />
                </template>
                <div
                    v-else-if="
                        item.key === 'appPresentationType' ||
                        item.key === 'pcPresentationType'
                    "
                    style="display: flex; align-items: center"
                >
                    <form-item
                        v-model="data.base[item.key]"
                        :options="item"
                        :map="FormatMap"
                        :readonly="data.readonly"
                    />
                    <el-tooltip
                        v-if="type === 'contentCoupon'"
                        class="item"
                        effect="dark"
                        placement="right"
                    >
                        <div slot="content">
                            <div
                                v-for="(item2, index2) in tip[item.key]"
                                :key="index2"
                            >
                                {{ item2 }}
                            </div>
                        </div>
                        <i
                            class="el-icon-warning-outline"
                            style="
                                margin-left: 10px;
                                color: #be956a;
                                cursor: pointer;
                            "
                        ></i>
                    </el-tooltip>
                </div>
                <div
                    v-else-if="
                        item.key === 'appNavigationImagUrl' ||
                        item.key === 'pcNavigationImagUrl'
                    "
                    style="display: flex; align-items: flex-start"
                >
                    <form-item
                        v-model="data.base[item.key]"
                        :options="item"
                        :map="FormatMap"
                        :readonly="data.readonly"
                    />
                    <div style="margin-left: 10px">
                        <el-checkbox
                            v-model="item.extra.checked"
                            :disabled="data.readonly"
                            @change="checkNavigationUrl($event, item.extra)"
                            >增加链接</el-checkbox
                        >
                        <div v-if="item.extra.checked">
                            <form-item
                                v-model="data.base[item.extra.key]"
                                :options="{
                                    label: '',
                                    key: item.extra.key,
                                    type: 'input',
                                    value: '',
                                    focus: true
                                }"
                                :map="FormatMap"
                                :readonly="data.readonly"
                                style="margin-top: 5px"
                            />
                        </div>
                    </div>
                </div>
                <form-item
                    v-else-if="item.type !== 'diy'"
                    v-model="data.base[item.key]"
                    :options="item"
                    :map="FormatMap"
                    :readonly="data.readonly"
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
import { aggregateAdd } from '@/api/manage/aggregate';
// import { parseTime } from '@/utils';
import FormItem from '@/components/FormItem/index';
import DialogItemNo from './DialogItemNo';
import DialogCoupon from './DialogCoupon';
import { map as _Map } from '../../js/create.js';
import Draggable from 'vuedraggable';

export default {
    components: { FormItem, DialogItemNo, DialogCoupon, Draggable },
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
        }
    },
    data() {
        const type = this.options.type;
        const platformType = this.options.platformType
            .split(',')
            .map((item) => Number(item));
        const value = this.value;
        const loop = {
            base: [
                {
                    label: '专区名称',
                    key: 'zoneName',
                    type: 'input',
                    value: '',
                    max: 10,
                    rule: true
                },
                {
                    label: '产品SKU号',
                    key: 'itemNoList',
                    type: 'input',
                    value: '',
                    rule: true,
                    hidden: !['contentSku'].includes(type)
                },
                {
                    label: '卡券批次号',
                    key: 'couponConfigLists',
                    type: 'input',
                    value: '',
                    rule: true,
                    hidden: false,
                    hidden: !['contentCoupon'].includes(type)
                },
                {
                    label: '价格颜色',
                    key: 'priceColor',
                    type: 'color',
                    value: '',
                    rule: true,
                    hidden: !['contentSku'].includes(type)
                },
                {
                    label: '文字颜色',
                    key: 'fontColor',
                    type: 'color',
                    value: '',
                    rule: true,
                    hidden: !['contentWord'].includes(type)
                },
                {
                    label: '文字描述',
                    key: 'fontDesc',
                    type: 'textarea',
                    value: '',
                    rule: true,
                    hidden: !['contentWord'].includes(type)
                },
                {
                    label: '移动端展示方式',
                    key: 'appPresentationType',
                    type: 'select',
                    value: '',
                    rule: true,
                    hidden:
                        !['contentSku', 'contentCoupon'].includes(type) ||
                        !platformType.includes(1)
                },
                {
                    label: 'PC端展示方式',
                    key: 'pcPresentationType',
                    type: 'select',
                    value: '',
                    rule: true,
                    hidden:
                        !['contentSku', 'contentCoupon'].includes(type) ||
                        !platformType.includes(2)
                },
                {
                    label: ['contentImage'].includes(type)
                        ? '移动端图片内容'
                        : '移动端导航图',
                    key: 'appNavigationImagUrl', //appNavigationUrl
                    type: 'image',
                    value: '',
                    hidden: !platformType.includes(1),
                    extra: {
                        key: 'appNavigationUrl',
                        checked: value && value.appNavigationUrl ? true : false,
                        value: (value && value.appNavigationUrl) || ''
                    },
                    rule: ['contentImage'].includes(type),
                    size: {
                        width: 718,
                        height: 0
                    }
                },
                {
                    label: ['contentImage'].includes(type)
                        ? 'PC端图片内容'
                        : 'PC端导航图',
                    key: 'pcNavigationImagUrl', //pcNavigationUrl
                    type: 'image',
                    value: '',
                    hidden: !platformType.includes(2),
                    extra: {
                        key: 'pcNavigationUrl',
                        checked: value && value.pcNavigationUrl ? true : false,
                        value: (value && value.pcNavigationUrl) || ''
                    },
                    rule: ['contentImage'].includes(type),
                    size: {
                        width: 1200,
                        height: 0
                    }
                }
            ],
            table: {
                itemNo: [
                    {
                        label: '创建时间',
                        key: 'createTime',
                        type: '',
                        width: 140
                    },
                    {
                        label: '订货号SKU',
                        key: 'itemNo',
                        type: '',
                        width: 90
                    },
                    {
                        label: '制造商型号',
                        key: 'mfrNo',
                        type: '',
                        width: 120
                    },
                    {
                        label: '品牌',
                        key: 'brandName',
                        type: '',
                        width: 140
                    },
                    {
                        label: '产品名称',
                        key: 'productName',
                        type: '',
                        width: 140
                    },
                    {
                        label: '预计出货日',
                        key: 'shipmentDate',
                        type: '',
                        width: 90
                    },
                    {
                        label: '销售面价',
                        key: 'salesPrice',
                        type: '',
                        width: 80
                    },
                    {
                        label: '状态',
                        key: 'shelfStatus',
                        type: '',
                        width: 80
                    }
                ],
                couponConfig: [
                    {
                        label: '创建时间',
                        key: 'createTime',
                        type: '',
                        width: 140
                    },
                    {
                        label: '卡券批次号',
                        key: 'batchNo',
                        type: '',
                        width: 90
                    },
                    {
                        label: '券类型',
                        key: 'couponType',
                        type: 'select',
                        width: 120
                    },
                    {
                        label: '券名称',
                        key: 'couponName',
                        type: '',
                        width: 140
                    },
                    {
                        label: '触发场景',
                        key: 'triggerScene',
                        type: 'select',
                        width: 140
                    },
                    {
                        label: '发放状态',
                        key: 'grantState',
                        type: 'select',
                        width: 90
                    },
                    {
                        label: '已使用',
                        key: 'useNum',
                        type: '',
                        width: 90
                    },
                    {
                        label: '生效状态',
                        key: 'activeStatus',
                        type: 'select',
                        width: 80
                    }
                ]
            }
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
        const FormatMap = _Map(type);
        return {
            platformType,
            type,
            FormatMap,
            loop,
            rules: {
                base: {
                    ...rules
                }
            },
            data: {
                base: {},
                readonly: false,
                itemNo: [],
                couponConfig: []
            },
            visible: {
                base: false,
                itemNo: false,
                couponConfig: false
            },
            loading: {
                base: false
            },
            tip: {
                appPresentationType: [
                    '一行一个尺寸：718x149',
                    '一行二个尺寸：351x149'
                ],
                pcPresentationType: [
                    '一行一个尺寸：1200x108',
                    '一行二个尺寸：592x180',
                    '一行三个尺寸：398x180'
                ]
            },
            key: 0
        };
    },
    computed: {
        comTitle() {
            let label;
            const options = this.options;
            const base = this.value;
            if (base.zoneName) {
                label = `${options.label}：${base.zoneName}`;
            } else {
                label = `新增${options.label}`;
            }
            return label;
        }
        // comReadonly() {
        //     const readonly = this.options.status === 1;
        //     console.log('readonly',readonly)
        //     return true
        //     return readonly;
        // }
    },
    watch: {
        'options.status': {
            handler: async function (val, oldVal) {
                const readonly = val === 1;
                this.data.readonly = readonly;
                this.key++;
                if (val !== oldVal && this.visible.base) {
                    this.visible.base = false;
                    await this.$nextTick();
                    this.visible.base = true;
                }
            },
            immediate: true,
            deep: true
        },
        value: {
            handler: function (val) {
                if (val) {
                    const base = JSON.parse(JSON.stringify(val));
                    for (const v of this.loop.base) {
                        base[v.key] =
                            typeof base[v.key] !== 'undefined'
                                ? base[v.key]
                                : v.value;
                    }
                    if (val.itemNoList) {
                        this.data.itemNo = val.itemNoList.split(',');
                    }
                    if (val.couponConfigLists) {
                        this.data.couponConfig = JSON.parse(
                            JSON.stringify(val.couponConfigLists)
                        );
                    }
                    this.data.base = base;
                    // const t = {
                    //     apInformationId: 10,
                    //     contentDetailId: 34,
                    //     activityId: '67d0c332be5c45fda5f40b794d1edea8',
                    //     zoneType: 4,
                    //     zoneName: '文字1',
                    //     fontColor: '#A33A3A',
                    //     fontDesc: 'zoneType',
                    //     appNavigationImagUrl: '',
                    //     pcNavigationImagUrl: ''
                    // };
                    // this.data.base = { ...t };
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
        deleteCoupon(index) {
            this.data.base['couponConfigLists'].splice(index, 1);
            this.data.couponConfig = JSON.parse(
                JSON.stringify(this.data.base['couponConfigLists'])
            );
        },
        formatCoupon(e) {
            console.log('this.map', this.map);
            // return '123'
            const coupon = this.map.couponType.find((item) => item.value === e);
            return (coupon && coupon.label) || '代金券';
        },
        checkNavigationUrl(e, extra) {
            if (!e) {
                this.data.base[extra.key] = '';
            }
        },
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
        async del() {
            try {
                const list = this.$parent.data.base;
                const key = this.options.key;
                const confirmData = {
                    apInformationId: this.data.base.apInformationId,
                    contentDetailId: this.data.base.contentDetailId
                };
                if (this.options.status === 0) {
                    if (
                        confirmData.apInformationId &&
                        confirmData.contentDetailId
                    ) {
                        this.options.status = 1;
                    } else {
                        list.splice(
                            list.findIndex((item) => item.key === key),
                            1
                        );
                    }
                } else {
                    const $API = this.options.api[2];
                    const res = await $API(confirmData);
                    list.splice(
                        list.findIndex((item) => item.key === key),
                        1
                    );
                }
                // if (
                //     confirmData.apInformationId &&
                //     confirmData.contentDetailId
                // ) {
                //     const $API = this.options.api[2];
                //     const res = await $API(confirmData);
                // }
                // list.splice(
                //     list.findIndex((item) => item.key === key),
                //     1
                // );
            } catch (e) {
                console.log('del:e', e);
                this.loading.base = false;
            }
        },
        confirmSubmit() {
            let ref = 'dataForm';
            this.$refs[ref].validate(async (valid) => {
                try {
                    if (valid) {
                        const confirmData = { ...this.data.base };
                        // console.log('confirmData', confirmData);
                        let res;
                        let $API = this.options.api[0];
                        if (
                            confirmData.apInformationId &&
                            confirmData.contentDetailId
                        ) {
                            $API = this.options.api[1];
                        }
                        if (confirmData.couponConfigLists) {
                            confirmData.couponConfigLists =
                                confirmData.couponConfigLists.map((item) => ({
                                    batchNo: item.batchNo,
                                    couponImgaUrl: item.couponImgaUrl,
                                    appCouponImgaUrl: item.appCouponImgaUrl,
                                    contentDetailsId: item.contentDetailsId
                                }));
                            confirmData.couponConfig =
                                confirmData.couponConfigLists;
                            confirmData.coupon = confirmData.couponConfigLists;
                        }
                        this.loading.base = true;
                        res = await $API(confirmData);
                        res = { ...confirmData, ...res };
                        // console.log('res', res);
                        this.$emit('change', res);
                        this.loading.base = false;
                        // const list = this.$parent.data.list;
                        // const key = this.options.key;
                        // const contentItem = list.find(
                        //     (item) => item.key === key
                        // );
                        // contentItem.options.status = 1;
                        this.options.status = 1;
                    }
                } catch (e) {
                    console.log('confirmForm:e', e);
                    this.loading.base = false;
                }
            });
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.com-handle-ContentCreate {
    ::v-deep .el-textarea {
        width: 66vw;
    }
    .itemNoList-sort {
        .drag-item {
            // cursor: move;
            // &.disabled {
            //     cursor: default;
            // }
            width: 80px;
            font-size: 12px;
            color: #999;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            + .drag-item {
                // margin-left: 10px;
            }
            // &:hover {
            //     color: #666;
            // }
            // .delete {
            //     color: #666;
            //     cursor: pointer;
            //     &:hover {
            //         color: #000;
            //     }
            // }
        }
    }
    .couponConfigLists-sort {
        .transition-wrapper {
            display: flex;
            flex-wrap: wrap;
        }
        .drag-item {
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            margin-left: 20px;
            &:nth-child(1) {
                margin-left: 0;
            }
            ::v-deep .upload-container .uploader.mini .el-upload {
                width: 150px;
                height: 150px;
                .el-upload-dragger {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .avatar-uploader-icon {
                        margin-top: 0;
                    }
                }
            }
            .coupon-label {
                width: calc(100% - 10px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .delete {
                color: #666;
                position: absolute;
                bottom: 14px;
                right: 0;
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
            .coupon-upload {
                margin-top: 5px;
                + .coupon-upload {
                    margin-left: 5px;
                }
            }
        }
    }
    .c-title {
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 16px;
        font-weight: 600;
        box-shadow: 0px 1px 0px 0px #d6d6d6;
        margin: 8px 0 16px 0;
        .inline {
            display: flex;
            align-items: center;
            &::before {
                content: ' ';
                width: 2px;
                height: 16px;
                background: #be956a;
                margin-right: 8px;
            }
        }
    }
    .couponConfig {
        display: flex;
        box-sizing: border-box;
        * {
            box-sizing: border-box;
        }
        .label {
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            padding: 0 16px;
            font-size: 14px;
            color: #333333;
            background: #ffffff;
            border-radius: 2px 0 0 2px;
            border: 1px solid #bfbfbf;
            // border-right: none;
        }
        .button {
            width: 60px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #fff;
            background: #be956a;
            border-radius: 0 2px 2px 0;
            cursor: pointer;
            &:hover {
                opacity: 0.9;
            }
        }
    }
}
</style>
