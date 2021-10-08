<template>
    <div class="page-handle">
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
                    <div class="search-label">查找SKU号：</div>
                    <el-input
                        v-model="data.itemNo"
                        class="search-input"
                        placeholder=""
                        size="mini"
                        clearable
                    />
                    <el-button
                        type="primary"
                        size="mini"
                        @click="
                            page.pageStartId = null;
                            page.pageEndId = null;
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
                    class="page-diy-hide"
                    @prev="load(1)"
                    @next="load(2)"
                />
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { validate, validEmpty, isEqual } from '@/utils/validate';
import { selectForItem } from '@/api/manage/coupon';
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
        const loop = {
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
        return {
            loop,
            data: {
                table: [],
                confirm: (this.value && [...this.value]) || [],
                itemNo: '',
                tableHeight
            },
            page: {
                pageStartId: null,
                pageEndId: null,
                pageNo: 1,
                pageSize: 10,
                totalCount: Math.pow(10, 10)
            },
            visible: {
                base: true,
                form: false
            },
            tip: {
                base: '新增产品'
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
                const itemNo = v.itemNo;
                const index = this.data.confirm.findIndex(
                    (item) => item === itemNo
                );
                const index2 = selection.findIndex(
                    (item) => item.itemNo === itemNo
                );
                if (index === -1 && index2 > -1) {
                    this.data.confirm.push(itemNo);
                } else if (index > -1 && index2 === -1) {
                    this.data.confirm.splice(index, 1);
                }
            }
        },
        handleSelect(selection, row) {
            const itemNo = row.itemNo;
            const isAdd = selection.find((item) => item.itemNo === itemNo);
            if (isAdd) {
                this.data.confirm.push(itemNo);
            } else {
                this.data.confirm.splice(
                    this.data.confirm.findIndex((item) => item === itemNo),
                    1
                );
            }
        },
        handleSelectionChange(e) {
            // console.log('e',e)
            // this.data.confirm = [...e];
        },
        async load(pageType = 2) {
            try {
                this.loading.base = true;
                const { pageNo, pageStartId, pageEndId, pageSize } = this.page;

                const confirmData = { pageSize, pageType };
                if (this.data.itemNo) {
                    confirmData.itemNo = this.data.itemNo;
                }
                if (pageType === 1) {
                    confirmData.pageStartId = pageStartId;
                } else {
                    confirmData.pageEndId = pageEndId;
                }
                const res = await selectForItem(confirmData);
                this.page.pageStartId = res.pageStartId;
                this.page.pageEndId = res.pageEndId;
                const list = [];
                for (const i in res.itemInfo) {
                    const v = res.itemInfo[i];
                    v.index = i * 1 + 1 + (pageNo - 1) * 10;
                    v.salesPrice = v.salesPrice || '-';
                    list.push(v);
                }
                this.data.table = list;
                this.visible.form = true;
                this.loading.base = false;
                await this.$nextTick();
                this.$refs.multipleTable.clearSelection();
                for (const v of this.data.table) {
                    if (this.data.confirm.find((item) => item == v.itemNo)) {
                        this.$refs.multipleTable.toggleRowSelection(v);
                    }
                }
            } catch (e) {
                console.log('load:e', e);
                this.visible.form = true;
                this.loading.base = false;
            }
        },
        async handleRemote(search_words) {
            try {
                const confirmData = {
                    page_num: 1,
                    per_page: 100,
                    search_words
                };
                const res = await update(confirmData);
                const list = {};
                for (const v of res.data_list) {
                    list[v.staff_user_id] = {
                        label: `${v.nickname}(${v.phone})`,
                        value: v.staff_user_id
                    };
                }
                return list;
            } catch (e) {
                console.log('handleRemote:e', e);
            }
        },
        async confirmForm() {
            const confirm = this.data.confirm;
            if (confirm.length === 0) {
                this.$message.warning('请选择产品');
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
.page-diy-hide.pagination-container {
    padding: 0 16px;
    .el-pagination {
        display: flex;
        justify-content: flex-end;
    }
    .el-pager,
    .el-pagination__total,
    .el-pagination__sizes,
    .el-pagination__jump {
        display: none;
    }
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
