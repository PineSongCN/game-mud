<template>
    <div class="page-home">
        <van-nav-bar
            :title="session.title"
            left-text=""
            :left-arrow="comLeftArrow"
            safe-area-inset-top
            @click-left="minusStep"
        />
        <transition name="fade">
            <div class="content" :class="comClass" v-html="comContent"></div>
        </transition>
        <van-tabbar fixed safe-area-inset-bottom @change="next">
            <van-tabbar-item icon="" style="visible: hidden"></van-tabbar-item>
            <van-tabbar-item icon="" style="visible: hidden"></van-tabbar-item>
            <van-tabbar-item icon="" style="visible: hidden"></van-tabbar-item>
            <van-tabbar-item icon="">{{ comNext }}</van-tabbar-item>
        </van-tabbar>
        <!-- <van-number-keyboard safe-area-inset-bottom /> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { session } from './components/index.js';

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            session: session(this.$createElement),
            step: 0
        };
    },
    computed: {
        comLeftArrow() {
            return this.step > 0;
        },
        comClass() {
            return this.session.data[this.step].class;
        },
        comContent() {
            let content = this.session.data[this.step].content
                .split('<br>')
                .join('</p><p>');
            content = `<p>${content}</p>`;
            return content;
        },
        comNext() {
            return this.session.data[this.step].next;
        }
    },
    created() {},
    methods: {
        minusStep() {
            this.step--;
        },
        async next() {
            await this.session.data[this.step].beforeNext();
            this.step++;
            console.log('next');
        }
    }
};
</script>
<style lang="scss">
.client-web {
    .page-home {
        .content {
            text-indent: 2em;
        }
    }
}
</style>
<style lang="scss">
.page-home {
    width: 100%;
    min-height: 100vh;
    background: #191b1a;
    // background: rgb(36, 40, 44);
    color: #f2f2f2;
    box-sizing: border-box;
    [class*='van-hairline']::after {
        border-color: #666;
        // border-bottom-width: 1px;
    }
    .van-nav-bar {
        background: #191b1a;
        color: #f2f2f2;
        .van-nav-bar__title {
            color: #f2f2f2;
            font-size: 18px;
        }
    }
    .van-tabbar {
        background: #191b1a;
        color: #f2f2f2;
        .van-tabbar-item {
            background: #191b1a;
            color: #f2f2f2;
            font-size: 18px;
        }
        .van-tabbar-item__icon {
            display: none;
        }
        .van-tabbar-item--active {
            background: #191b1a;
            color: #f2f2f2;
        }
    }
    .content {
        width: 100%;
        height: 100%;
        max-width: 55vh;
        margin: auto;
        padding: 15px 10px;
        box-sizing: border-box;
        line-height: 1.5;
        color: #ddd;
        text-indent: 5em;
        font-size: 12rem;
        &.center {
            height: calc(100vh - 46px - 50px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: center;

            padding-top: constant(safe-area-inset-top);
            padding-top: env(safe-area-inset-top);
            padding-bottom: constant(safe-area-inset-bottom);
            padding-bottom: env(safe-area-inset-bottom);
        }
    }
    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }
}
.session-box {
    .van-cell {
        padding: 5px 5px;
        border-bottom: 1px solid #666;
        background: #191b1a;
        color: #ccc;
        + .van-cell {
            margin-left: 20px;
        }
        &::after {
            display: none;
        }
        .van-field__value,
        .van-field__control {
            color: #ccc;
        }
    }
    .el-input {
        .el-input__inner {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #666;
            background: #191b1a;
            color: #ccc;
        }
        + .el-input {
            margin-left: 20px;
        }
    }
    .session-input {
        box-sizing: border-box;
        width: 100%;
        line-height: 28px;
        padding: 5px;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #666;
        background: #191b1a;
        color: #ccc;
        &.center {
            text-align: center;
        }
        + .session-input {
            margin-left: 20px;
        }
    }
    .session-list {
        display: flex;
        box-sizing: border-box;
    }
}
.el-message-box {
    background: #191b1a;
    color: #ccc;
    .el-message-box__title,
    .el-message-box__content {
        color: #ccc;
    }
}
</style>
