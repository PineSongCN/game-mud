<template>
    <div class="page-handle-bc">
        <el-dialog
            :title="tip.base"
            :visible.sync="visible.base"
            :close-on-click-modal="false"
            :modal-append-to-body="true"
            :append-to-body="true"
            :show-close="false"
            custom-class="dialog-model"
            width="80vw"
            top="5vh"
            @close="$emit('finished')"
        >
            <el-row type="flex" justify="center" class="handle-box">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="$emit('finished')"
                >
                    关闭
                </el-button>
                <el-button type="primary" size="small" @click="confirmForm">
                    确定
                </el-button>
            </el-row>
            <div v-loading="loading.base" style="min-height: 200px">
                <div class="search-box">
                    <div
                        v-for="item in loop.search"
                        :key="item.key"
                        :label="item.label"
                        :prop="item.key"
                        class="filter-item"
                        style="display: inline-block; margin-right: 20px"
                    >
                        <form-item
                            v-if="item.type !== 'diy'"
                            v-model="data.search[item.key]"
                            :options="item"
                            :map="map"
                        />
                        <div v-else>
                            <template>
                                {{ item.key }}
                            </template>
                        </div>
                    </div>

                    <el-button
                        type="primary"
                        size="mini"
                        @click="
                            page.pageNo = 1;
                            load();
                        "
                    >
                        查询
                    </el-button>
                </div>
                <el-table
                    id="excel"
                    :key="0"
                    ref="multipleTable"
                    v-loading="loading.table"
                    :data="data.table"
                    element-loading-text="Loading"
                    stripe
                    border
                    fit
                    highlight-current-row
                    :height="data.tableHeight"
                    @select="handleSelect"
                    @select-all="handleSelectAll"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="40">
                    </el-table-column>
                    <el-table-column
                        v-for="(item, index) in loop.table"
                        :key="index"
                        :label="item.label"
                        :min-width="item.width || 'auto'"
                        :width="item.widthFixed ? item.width : 'auto'"
                        align="left"
                    >
                        <template slot-scope="{ row }">
                            <form-item-table
                                v-if="item.type !== 'diy'"
                                v-model="row[item.key]"
                                :options="item"
                                :map="map[item.key]"
                            />
                        </template>
                    </el-table-column>
                </el-table>
                <pagination
                    v-show="page.totalCount > 0"
                    :total="page.totalCount"
                    :page.sync="page.pageNo"
                    :limit.sync="page.pageSize"
                    class="page-diy"
                    @pagination="load"
                />
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { validate, validEmpty, isEqual } from '@/utils/validate';
import { select2 } from '@/api/manage/coupon';
import FormItem from '@/components/FormItem/index';
import FormItemTable from '@/components/FormItem/Table';
import Pagination from '@/components/Pagination';

export default {
    components: { FormItem, FormItemTable, Pagination },
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
        initData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        table: {
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
        }
    },
    data() {
        const search = [
            {
                key: 'batchNo',
                label: '卡券批次号',
                type: '',
                value: ''
            },
            {
                key: 'couponType',
                label: '券类型',
                type: 'select',
                value: ''
            }
        ];
        const loop = {
            search,
            table: [
                {
                    label: '序号',
                    key: 'index',
                    type: '',
                    width: 45,
                    widthFixed: true
                },
                ...this.table
            ]
        };
        loop.table = loop.table.filter((item) => !item.hidden);

        let tableHeight = document.body.clientHeight * 0.9 - 214;
        if (tableHeight > 790) {
            tableHeight = 790;
        }
        const dataSearch = {};
        for (const v of loop.search) {
            dataSearch[v.key] = v.value;
        }

        return {
            loop,
            data: {
                table: [],
                confirm: (this.value && [...this.value]) || [],
                search: dataSearch,
                tableHeight
            },
            page: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0
            },
            visible: {
                base: true,
                form: false
            },
            tip: {
                base: '新增优惠券'
            },
            loading: {
                base: false,
                table: false
            },
            key: 0
        };
    },
    watch: {
        value: {
            handler: function (val) {
                if (
                    val &&
                    val instanceof Array &&
                    JSON.stringify(val) != JSON.stringify(this.data.confirm)
                ) {
                    this.data.confirm = [...val];
                }
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        this.visible.form = true;
        this.load();
    },
    mounted() {},
    methods: {
        handleSelectAll(selection) {
            for (const v of this.data.table) {
                const { batchNo, couponType, couponName } = v;
                const index = this.data.confirm.findIndex(
                    (item) => item.batchNo === batchNo
                );
                const index2 = selection.findIndex(
                    (item) => item.batchNo === batchNo
                );
                if (index === -1 && index2 > -1) {
                    this.data.confirm.push({
                        batchNo,
                        couponType,
                        couponName,
                        couponImgaUrl: '',
                        appCouponImgaUrl: ''
                    });
                } else if (index > -1 && index2 === -1) {
                    this.data.confirm.splice(index, 1);
                }
            }
        },
        handleSelect(selection, row) {
            const { batchNo, couponType, couponName } = row;
            const isAdd = selection.find((item) => item.batchNo === batchNo);
            const index = this.data.confirm.findIndex(
                (item) => item.batchNo === batchNo
            );
            if (isAdd) {
                if (index === -1) {
                    this.data.confirm.push({
                        batchNo,
                        couponType,
                        couponName,
                        couponImgaUrl: '',
                        appCouponImgaUrl: ''
                    });
                }
            } else {
                if (index > -1) {
                    this.data.confirm.splice(index, 1);
                }
            }
        },
        handleSelectionChange(e) {
            // console.log('e',e)
            // this.data.confirm = [...e];
        },
        async load() {
            try {
                this.loading.base = true;
                const { pageNo, pageSize } = this.page;
                const confirmData = { pageNo, pageSize, ...this.data.search };
                const res = await select2(confirmData);
                const list = [];
                for (const i in res.couponBatchData) {
                    const v = res.couponBatchData[i];
                    v.index = i * 1 + 1 + (pageNo - 1) * 10;
                    list.push(v);
                }
                this.data.table = list;
                this.visible.form = true;
                this.loading.base = false;
                this.page.totalCount = res.total;
                await this.$nextTick();
                this.$refs.multipleTable.clearSelection();
                // console.log(this.data.table);
                // console.log(this.value);
                // console.log(this.data.confirm);
                for (const v of this.data.table) {
                    if (
                        this.data.confirm.find(
                            (item) => item.batchNo == v.batchNo
                        )
                    ) {
                        this.$refs.multipleTable.toggleRowSelection(v);
                    }
                }
            } catch (e) {
                console.log('load:e', e);
                this.visible.form = true;
                this.loading.base = false;
            }
        },
        async confirmForm() {
            const confirm = this.data.confirm;
            if (confirm.length === 0) {
                this.$message.warning('请选择优惠券');
                return;
            } else {
                this.$emit('change', confirm);
                this.$emit('finished', [...confirm]);
            }
        }
    }
};
</script>
<style lang="scss">
.page-diy.pagination-container {
    padding: 0 16px;
}
</style>
<style lang="scss" scoped>
.dialog-model-form {
    max-height: calc(90vh - 114px - 60px);
    overflow: auto;
}
.handle-box {
    width: fit-content;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
}
.search-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    .search-input {
        width: 240px;
        margin: 0 10px 0 0;
    }
}
</style>
