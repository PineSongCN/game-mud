<template>
    <div class="page-a-create">
        <div class="p-title">
            <div
                v-for="(item, index) in map.menu"
                :key="index"
                class="p-item"
                :class="{ active: item.value.includes(data.step) }"
                @click="switchMenu(item)"
            >
                {{ item.label }}
            </div>
        </div>

        <div v-if="!visible.base" v-loading="loading.base" class="p-main"></div>
        <div v-else v-loading="loading.base" class="p-main">
            <base-info
                v-if="data.step === 1"
                ref="BaseInfo"
                v-model="data.BaseInfo"
                :map="map"
                :update="data.update"
                :view="true"
            />
            <banner-image
                v-else-if="data.step === 2"
                ref="BannerImage"
                v-model="data.BannerImage"
                :options="data.BaseInfo"
                :map="map"
                :update="data.update"
                :view="true"
            />
            <content-manage
                v-else-if="data.step === 3"
                ref="ContentManage"
                v-model="data.ContentManage"
                :options="data.BaseInfo"
                :map="map"
                :update="data.update"
                :view="true"
            />
            <sort-manage
                v-else-if="data.step === 4"
                ref="SortManage"
                v-model="data.SortManage"
                :options="data.BaseInfo"
                :map="map"
                :update="data.update"
                :view="true"
            />
        </div>
        <div class="p-handle-box">
            <div v-if="data.step === 1">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="go('ManageAggregate')"
                >
                    回到聚合页
                </el-button>
                <el-button type="primary" size="small" @click="confirmSubmit">
                    {{ data.update ? '提交' : '编辑' }}
                </el-button>
            </div>
            <div v-if="data.step === 2">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="go('ManageAggregate')"
                >
                    回到聚合页
                </el-button>
                <el-button type="primary" size="small" @click="confirmSubmit">
                    {{ data.update ? '提交' : '编辑' }}
                </el-button>
            </div>
            <div v-else-if="data.step === 3">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="go('ManageAggregate')"
                >
                    回到聚合页
                </el-button>
                <el-button type="primary" size="small" @click="data.step = 4">
                    预览排序
                </el-button>
                <el-button
                    v-if="!data.update"
                    type="primary"
                    size="small"
                    @click="confirmSubmit"
                >
                    编辑
                </el-button>
                <el-dropdown
                    v-else
                    style="margin-left: 10px"
                    @command="confirmSubmit"
                >
                    <el-button class="filter-item" type="primary">
                        新增<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(item, index) in map.contentType"
                            :key="index"
                            :command="item.value"
                        >
                            {{ item.label }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-else-if="data.step === 4">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="go('ManageAggregate')"
                >
                    回到聚合页
                </el-button>
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="data.step = 3"
                >
                    回到配置页
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="visible.preview = true"
                >
                    预览效果
                </el-button>
                <el-button
                    v-if="!data.update"
                    type="primary"
                    size="small"
                    @click="confirmSubmit"
                >
                    编辑
                </el-button>
                <el-button
                    v-else
                    type="primary"
                    size="small"
                    @click="confirmSubmit"
                >
                    提交保存
                </el-button>
            </div>
        </div>
        <preview
            v-if="visible.preview"
            v-model="data.BaseInfo"
            @finished="visible.preview = false"
        />
    </div>
</template>

<script>
import FormItem from '@/components/FormItem/index.vue';
import BaseInfo from './components/create/BaseInfo.vue';
import BannerImage from './components/create/BannerImage.vue';
import ContentManage from './components/create/ContentManage.vue';
import SortManage from './components/create/SortManage.vue';
import { aggregateDetail } from '@/api/manage/aggregate';
import { map as _Map } from './js/detail.js';
import Preview from './components/create/Preview';
export default {
    components: {
        FormItem,
        BaseInfo,
        BannerImage,
        ContentManage,
        SortManage,
        Preview
    },
    data() {
        return {
            image: '',
            options: {
                type: 'image',
                mini: false
            },
            data: {
                BaseInfo: {
                    // activityEndTime: 1635523199000,
                    // activityId: 'ba0acdf15b7b43318da243cec2ee2e85',
                    // activityName: 'test-002',
                    // activityStartTime: 1631721600000,
                    // apInformationId: 12,
                    // hpBottomColor: '#653E3E',
                    // platformType: '2,1',
                    // relayDesc: 'test-002-desc',
                    // relayImagUrl:
                    //     'https://nstatic.mymro.cn/promotiom/1631169032663logoX512.png',
                    // remarksDesc: 'test-002-remark'
                },
                BannerImage: {
                    // BannerImage
                    // appBannerImagUrl:
                    //     'https://nstatic.mymro.cn/promotiom/1630894409341logoX512.png',
                    // pcBannerImagUrl:
                    //     'https://nstatic.mymro.cn/promotiom/1630894413039psc.jpg'
                },
                ContentManage: [],
                SortManage: {},
                step: 1,
                update: false,
                preview: {}
            },
            map: _Map(),
            loading: {
                base: false
            },
            visible: {
                base: false,
                preview: false
            }
        };
    },
    computed: {
        comTitle() {
            const step = this.data.step;
            const titleM = this.map.title.find((item) => item.value === step);
            const title = titleM['label'];

            return title;
        }
    },
    created() {
        this.load();
    },
    mounted() {},
    methods: {
        async load() {
            try {
                const confirmData = {
                    apInformationId: this.$route.query.apInformationId
                };
                this.loading.base = true;
                this.visible.base = false;
                const res = await aggregateDetail(confirmData);
                res.base.activityTime = [
                    res.base.activityStartTime,
                    res.base.activityEndTime
                ];
                res.base.activityStartTime = Date.parse(
                    res.base.activityStartTime.replace('-', '/')
                );
                res.base.activityEndTime = Date.parse(
                    res.base.activityEndTime.replace('-', '/')
                );
                this.data.BaseInfo = res.base;
                this.data.BannerImage = res.top;
                this.data.ContentManage = res.contents;

                // this.visible.base = false;
                // await this.$nextTick();
                this.visible.base = true;
                this.loading.base = false;
            } catch (e) {
                console.log('load:e', e);
                this.visible.base = true;
                this.loading.base = false;
            }
        },
        reset() {
            const step = this.data.step;
            switch (step) {
                case 1:
                    this.data.BaseInfo = {};
                    break;

                default:
                    break;
            }
        },
        async confirmSubmit(e) {
            try {
                if (this.data.BaseInfo.activityState === 2) {
                    this.$message({
                        type: 'warning',
                        message:
                            '聚合页活动正在对外发布，请先暂停活动，才能新增'
                    });
                    return;
                }
                const step = this.data.step;
                switch (step) {
                    case 1:
                        if (this.data.update) {
                            await this.$refs.BaseInfo.confirmSubmit();
                        }
                        this.data.update = !this.data.update;
                        this.load();
                        break;
                    case 2:
                        if (this.data.update) {
                            await this.$refs.BannerImage.confirmSubmit();
                        }
                        this.data.update = !this.data.update;
                        this.load();
                        break;
                    case 3:
                        if (this.data.update) {
                            if (this.$refs.ContentManage.comStep < 3) {
                                const item = this.map.contentType.find(
                                    (item) => item.value === e
                                );
                                this.$refs.ContentManage.createContent(item);
                            }
                        } else {
                            this.data.update = !this.data.update;
                            this.load();
                        }
                        // await this.$refs.ContentManage.confirmSubmit();
                        // this.data.step++;
                        break;
                    case 4:
                        if (this.data.update) {
                            await this.$refs.SortManage.confirmSubmit();
                        }
                        this.data.update = !this.data.update;
                        // this.load();
                        break;

                    default:
                        break;
                }
                // console.log(JSON.stringify(this.data.BaseInfo));
            } catch (e) {
                console.log('confirmSubmit:e', e);
            }
        },
        isActive(route) {
            return route.path === this.$route.path;
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
                this.$router.push(latestView.fullPath);
            } else {
                if (view.name === 'Home') {
                    this.$router.replace({ path: '/redirect' + view.fullPath });
                } else {
                    this.$router.push('/');
                }
            }
        },
        go(name) {
            const view = this.$route;
            if (name) {
                this.$router.push({
                    name
                });
                this.$store
                    .dispatch('tagsView/delView', view)
                    .then(({ visitedViews }) => {
                        if (this.isActive(view)) {
                            this.toLastView(visitedViews, view);
                        }
                    });
            }
        },
        switchMenu(item) {
            if (!item.value.includes(this.data.step)) {
                this.data.update = false;
            }
            this.data.step = item.value[0];
            if ([1, 2].includes(this.data.step)) {
                this.load();
            }
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.page-a-create {
    box-sizing: border-box;
    * {
        box-sizing: border-box;
    }
    .p-title {
        width: 100%;
        height: 48px;
        background: #fff;

        font-size: 16px;
        color: #333333;

        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        .p-item {
            width: 33.33%;
            height: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // &::before {
            // content: '';
            // position: absolute;
            // top: 0;
            // left: 0;
            // width: 100%;
            // height: 1px;
            // background: #d6d6d6;
            // }
            &::after {
                content: ' ';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: #d6d6d6;
            }
            &.active {
                &::before {
                    content: ' ';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #be956a;
                }
                &::after {
                    display: none;
                }
            }
            &:nth-child(2) {
                border-left: 1px solid #d6d6d6;
                border-right: 1px solid #d6d6d6;
            }
        }
    }
    .p-main {
        width: 100%;
        height: calc(100vh - 188px);
        overflow: auto;
        padding: 16px;
    }
    .p-handle-box {
        height: 56px;
        background: #f5f5f5;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 16px;
    }
}
</style>
