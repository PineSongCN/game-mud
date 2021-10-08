<template>
    <div class="app-container">
        <div class="filter-container">
            <div
                v-for="item in loop.search"
                :key="item.key"
                :label="item.label"
                :prop="item.key"
                class="filter-item"
                style="display: inline-block; margin-right: 20px"
            >
                <label for="" class="my-label">{{ item.label }}:</label>
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
            <el-button v-waves class="filter-item" @click="resetForm">
                重置
            </el-button>
            <el-button
                v-waves
                class="filter-item"
                type="primary"
                @click="handleFilter"
            >
                查询
            </el-button>
        </div>
        <div class="table-title">
            <div class="title">
                <i></i>
                聚合页管理
            </div>
            <div class="add">
                <el-button
                    v-waves
                    class="filter-item"
                    type="primary"
                    @click="addManage"
                >
                    新增
                </el-button>
            </div>
            <div class="el-table-scroll">
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
                >
                    <el-table-column
                        v-for="(item, index) in loop.table"
                        :key="index"
                        :label="item.label"
                        :min-width="item.width || 'auto'"
                    >
                        <template slot-scope="{ row }">
                            <form-item-table
                                v-if="item.type !== 'diy'"
                                v-model="row[item.key]"
                                :options="item"
                                :data="row"
                                :map="map[item.key]"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="140">
                        <template slot-scope="{ row }">
                            <div>
                                <el-link
                                    type="primary"
                                    size="mini"
                                    style="margin-right: 10px"
                                    @click="preview(row)"
                                >
                                    预览
                                </el-link>
                                <el-link
                                    v-if="row.activityState !== 3"
                                    type="primary"
                                    style="margin-right: 10px"
                                    size="mini"
                                    @click="updateGrantState(row)"
                                >
                                    {{
                                        (row.activityState === 0 && '启动') ||
                                        ([1, 2].includes(row.activityState) &&
                                            '暂停') ||
                                        '重放'
                                    }}
                                </el-link>
                                <el-link
                                    type="primary"
                                    size="mini"
                                    style="margin-right: 10px"
                                    @click="showUpdate(row.apInformationId)"
                                >
                                    详情
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination
                v-show="page.totalCount > 0"
                :total="page.totalCount"
                :page.sync="page.pageNo"
                :limit.sync="page.pageSize"
                @pagination="fetchData"
            />
            <preview
                v-if="visible.preview"
                v-model="data.preview"
                @finished="visible.preview = false"
            />
        </div>
    </div>
</template>

<script>
import { select, updateActivityState, aggregateDetail } from '@/api/manage/aggregate';
import { parseTime } from '@/utils';
import Pagination from '@/components/Pagination';
import waves from '@/directive/waves';
import FormItem from '@/components/FormItem/index';
import FormItemTable from '@/components/FormItem/Table';
import Preview from './components/create/Preview';
import { map as _Map } from './js/index.js';

export default {
    name: 'ManageAggregate',
    components: { FormItem, FormItemTable, Pagination, Preview },
    directives: { waves },
    data() {
        const search = [
            {
                key: 'activityName',
                label: '活动名称',
                type: '',
                value: ''
            },
            {
                key: 'activityState',
                label: '活动状态',
                type: 'select',
                value: ''
            },
            {
                key: 'grantTime',
                label: '发放时间',
                type: 'DateTimeRange',
                value: ''
            }
        ];
        const $router = this.$router;
        const table = [
            {
                label: '创建时间',
                key: 'createTime',
                type: '',
                width: 120
            },
            {
                label: '活动ID',
                key: 'activityId',
                type: '',
                width: 80
            },
            {
                label: '活动名称',
                key: 'activityName',
                type: '',
                width: 130
            },
            {
                label: '活动时间',
                key: 'activityTime',
                type: '',
                width: 180
            },
            {
                label: '活动状态',
                key: 'activityState',
                type: 'select',
                width: 80
            }
        ];
        const loop = {
            search,
            table
        };

        const dataSearch = {};
        for (const v of loop.search) {
            dataSearch[v.key] = v.value;
        }
        return {
            loop,
            data: {
                id: 'id',
                table: [],
                handle: {},
                search: dataSearch,
                preview: {}
            },
            loading: {
                table: true
            },
            page: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0
            },
            visible: {
                handle: false,
                preview: false
            },
            map: _Map(),
            table: {
                height: window.innerHeight - 96
            }
        };
    },
    mounted() {
        let _this = this;
        window.onresize = () => {
            _this.table.height = window.innerHeight - 96;
        };
    },
    destroyed() {
        window.onresize = null;
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.loading.table = true;
                const confirmData = {
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                    ...this.data.search
                };
                for (const k in confirmData) {
                    // if (!confirmData[k]) {
                    //     Reflect.deleteProperty(confirmData, k);
                    // }
                }
                if (confirmData.grantTime) {
                    confirmData.startTime = parseTime(
                        confirmData.grantTime[0]
                        // '{y}-{m}-{d}'
                    );
                    confirmData.endTime = parseTime(
                        confirmData.grantTime[1]
                        // '{y}-{m}-{d}'
                    );
                }
                Reflect.deleteProperty(confirmData, 'grantTime');
                const response = await select(confirmData);
                const list = [];
                for (const v of response.aggregateData) {
                    list.push(this.formatRow(v));
                }
                list.map((item) => {
                    item.activityTime = `${item.activityStartTime} 至 ${item.activityEndTime}`;
                });
                this.data.table = list;
                this.loading.table = false;
                this.page.totalCount = response.total;
            } catch (e) {
                console.log('fetchData:e', e);
                this.loading.table = false;
            }
        },
        async preview(row) {
            try {
                const confirmData = {
                    apInformationId: row.apInformationId
                };
                this.loading.base = true;
                const res = await aggregateDetail(confirmData);
                this.data.preview = res.base;
                this.visible.preview = true;
                this.loading.base = false;
            } catch (e) {
                console.log('preview:e', e);
            }
        },
        addManage() {
            this.$router.push({
                path: '/manage/aggregate/create',
                query: { isAddPage: true }
            });
        },
        resetForm() {
            for (const k in this.data.search) {
                this.data.search[k] = null;
            }
            this.page.pageNo = 1;
            this.fetchData();
        },
        formatRow(v) {
            const { province, city, district, area } = v;
            v.address = [province, city, district, area]
                .filter((item) => item)
                .join(' ');
            return v;
        },
        handleFilter() {
            this.page.pageNo = 1;
            this.fetchData();
        },
        newlyAdded() {
            this.$router.push({
                name: 'HsUserdetail',
                query: {
                    type: 'create'
                }
            });
        },
        showUpdate(apInformationId) {
            this.$router.push({
                path: '/manage/aggregate/detail',
                query: {
                    // isAddPage: false,
                    apInformationId
                }
            });
        },
        finishedHandle(e) {
            this.visible.handle = false;
            if (e) {
                this.fetchData();
            }
        },
        async updateGrantState(row) {
            const { apInformationId, activityState } = row;
            try {
                const tipList = {};
                const confirmData = {
                    apInformationId
                };
                if (activityState === 4) {
                    tipList.title =
                        '是否重新发放聚合活动，确认后，用户可在平台继续查看？';
                    confirmData.stateType = 2;
                } else if (activityState === 0) {
                    tipList.title =
                        '是否发放聚合活动，确认后，用户可在平台查看？';
                    confirmData.stateType = 0;
                } else {
                    tipList.title =
                        '停止聚合活动，用户将无法查阅到聚合页面，如果聚合页配置在广告区，也将一并下架掉';
                    confirmData.stateType = 1;
                }
                await this.$confirm(tipList.title, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                this.loading.table = true;
                const res = await updateActivityState(confirmData);

                this.$message({
                    message: '成功！',
                    type: 'success'
                });
                this.fetchData();
            } catch (e) {
                console.log('confirmDel', e);
                this.loading.table = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
