<template>
    <div class="com-handle-SortManage">
        <div class="label">拖拽排序</div>
        <draggable
            v-model="data.base"
            v-loading="loading.base"
            :disabled="!update"
            @choose="choose"
            @unchoose="unchoose"
        >
            <transition-group class="transition-wrapper" name="sort">
                <div
                    v-for="item in data.base"
                    :key="item.apContentSortId"
                    class="drag-item sort-item"
                    :class="{ active: item.active, disabled: !update }"
                    @mousedown="item.active = update && true"
                >
                    {{ item.formatLabel }}
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import { getContentList, updateContentOrder } from '@/api/manage/aggregate';
import Draggable from 'vuedraggable';

export default {
    components: { Draggable },
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
        return {
            data: {
                base: []
            },
            visible: {
                base: false
            },
            loading: {
                base: false
            },
            key: 0
        };
    },
    computed: {},
    watch: {
        // value: {
        //     handler: function (val) {
        //         if (val) {
        //         }
        //     },
        //     immediate: true,
        //     deep: true
        // }
    },
    created() {
        this.load();
    },
    mounted() {},
    methods: {
        choose(e) {
            // console.log('choose',e,a)
            // for (const v of this.data.base) {
            //     v.active = false;
            // }
        },
        unchoose(e) {
            // console.log('unchoose',e,a)
            for (const v of this.data.base) {
                v.active = false;
            }
        },
        async load() {
            try {
                this.loading.base = true;
                const confirmData = {
                    activityId: this.options.activityId,
                    apInformationId: this.options.apInformationId
                };
                const res = await getContentList(confirmData);
                // console.log('this.map.contentType', this.map.contentType);
                for (const v of res.contentSortList) {
                    const pre = this.map.contentType.find(
                        (item) => item.zoneType === v.zoneType
                    )['label'];
                    v.formatLabel = `${pre}：${v.zoneName}`;
                    v.active = false;
                }
                this.data.base = res.contentSortList;
                this.visible.base = true;
                this.loading.base = false;
            } catch (e) {
                console.log('load:e', e);
                this.visible.base = true;
                this.loading.base = false;
            }
        },
        confirmSubmit() {
            return new Promise(async (resolve, reject) => {
                try {
                    const confirmData = this.data.base.map((item, index) => {
                        return {
                            apContentSortId: item.apContentSortId,
                            apInformationId: item.apInformationId,
                            contentOrder: index
                        };
                    });
                    let res;
                    this.loading.base = true;
                    res = await updateContentOrder(confirmData);
                    res = { ...confirmData, ...res };
                    console.log('res', res);
                    this.$emit('change', res);
                    this.loading.base = false;
                    resolve();
                } catch (e) {
                    console.log('confirmForm:e', e);
                    reject(e);
                    this.loading.base = false;
                }
            });
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.com-handle-SortManage {
    .label {
        font-size: 12px;
        padding: 0 0 8px 0;
        color: #909090;
    }
    .drag-item {
        display: block;
        width: 100%;
        height: 100%;
        padding: 20px;
        text-align: center;
        color: #333333;
        font-size: 14px;
        box-shadow: 0px 0px 5px 2px #f3f1f1;
        border-radius: 4px;
        border: 1px solid #ebeaea;
        margin-bottom: 16px;
        cursor: move;
        &.disabled {
            cursor: default;
        }
        &:hover {
            box-shadow: 0px 0px 5px 2px #f3f1f1;
            border: 1px solid #be956a;
            color: #be956a;
        }
        &.active {
            box-shadow: 0px 0px 5px 2px #f3f1f1;
            border: 1px solid #be956a;
            color: #be956a;
        }
    }
}
</style>
