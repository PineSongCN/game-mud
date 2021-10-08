<template>
    <div class="page-a-create">
        <div class="p-title">
            {{ comTitle }}
        </div>
        <div class="p-main">
            <base-info
                v-if="data.step === 1"
                ref="BaseInfo"
                v-model="data.BaseInfo"
                :map="map"
            />
            <banner-image
                v-else-if="data.step === 2"
                ref="BannerImage"
                v-model="data.BannerImage"
                :options="data.BaseInfo"
                :map="map"
            />
            <content-manage
                v-else-if="data.step === 3"
                ref="ContentManage"
                v-model="data.ContentManage"
                :options="data.BaseInfo"
                :map="map"
            />
            <sort-manage
                v-else-if="data.step === 4"
                ref="SortManage"
                v-model="data.SortManage"
                :options="data.BaseInfo"
                :map="map"
            />
        </div>
        <div class="p-handle-box">
            <div v-if="data.step === 1">
                <el-button type="primary" plain size="small" @click="reset">
                    重填
                </el-button>
                <el-button type="primary" size="small" @click="confirmSubmit">
                    提交下一步
                </el-button>
            </div>
            <el-button
                v-else-if="data.step === 2"
                type="primary"
                size="small"
                @click="confirmSubmit"
            >
                保存 并下一步
            </el-button>
            <div v-else-if="data.step === 3">
                <el-button type="primary" size="small" @click="data.step = 4">
                    预览排序
                </el-button>
                <el-dropdown style="margin-left: 10px" @command="confirmSubmit">
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
                    :loading="loading.preview"
                    @click="preview"
                >
                    预览效果
                </el-button>
                <el-button type="primary" size="small" @click="confirmSubmit">
                    提交保存
                </el-button>
            </div>
        </div>
        <preview
            v-if="visible.preview"
            v-model="data.preview"
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
import { map as _Map } from './js/create.js';
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
                preview:{}
            },
            visible:{
                preview:false
            },
            loading:{
                preview:false
            },
            map: _Map()
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
    created() {},
    mounted() {},
    methods: {
        async preview() {
            try {
                const confirmData = {
                    apInformationId: this.data.BaseInfo.apInformationId
                };
                this.loading.preview = true;
                const res = await aggregateDetail(confirmData);
                this.data.preview = res.base;
                this.visible.preview = true;
                this.loading.preview = false;
            } catch (e) {
                console.log('preview:e', e);
                this.loading.preview = false;
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
                const step = this.data.step;
                switch (step) {
                    case 1:
                        await this.$refs.BaseInfo.confirmSubmit();
                        this.data.step++;
                        break;
                    case 2:
                        await this.$refs.BannerImage.confirmSubmit();
                        this.data.step++;
                        break;
                    case 3:
                        if (this.$refs.ContentManage.comStep < 3) {
                            const item = this.map.contentType.find(
                                (item) => item.value === e
                            );
                            this.$refs.ContentManage.createContent(item);
                        }
                        // await this.$refs.ContentManage.confirmSubmit();
                        // this.data.step++;
                        break;
                    case 4:
                        await this.$refs.SortManage.confirmSubmit();
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
        height: 28px;
        background: #f5f5f5;

        font-size: 14px;
        color: #333333;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .p-main {
        width: 100%;
        height: calc(100vh - 168px);
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
