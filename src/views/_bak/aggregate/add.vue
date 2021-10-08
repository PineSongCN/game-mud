<template>
    <div class="container">
        <article>{{ pageTitle }}</article>
        <div v-if="isAddPage" class="my-title">{{ title }}</div>
        <div v-else class="margin-bom10">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                <el-tab-pane label="顶部图片" name="second"></el-tab-pane>
                <el-tab-pane label="内容配置" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="content">
            <el-form
                v-if="status == 1"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item
                    v-if="!isAddPage"
                    label="PC端链接："
                    prop="pcUrl"
                    readonly
                >
                    <el-input
                        v-model="ruleForm.pcUrl"
                        :disabled="isDisabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="!isAddPage"
                    label="APP端链接："
                    prop="appUrl"
                    readonly
                >
                    <el-input
                        v-model="ruleForm.appUrl"
                        :disabled="isDisabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动名称：" prop="activityName">
                    <el-input
                        v-model="ruleForm.activityName"
                        :disabled="isDisabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="页面底色：" prop="hpBottomColor">
                    <el-color-picker
                        v-model="ruleForm.hpBottomColor"
                        :disabled="isDisabled"
                    ></el-color-picker>
                </el-form-item>
                <el-form-item label="展示平台：" prop="platformType">
                    <el-radio
                        v-model="ruleForm.platformType"
                        :label="1"
                        :disabled="isDisabled"
                        >移动端</el-radio
                    >
                    <el-radio
                        v-model="ruleForm.platformType"
                        :label="2"
                        :disabled="isDisabled"
                        >pc端</el-radio
                    >
                    <span class="info">（一旦保存不允许修改）</span>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                        <el-form-item prop="activityStartTime">
                            <el-date-picker
                                v-model="ruleForm.activityStartTime"
                                :disabled="isDisabled"
                                type="datetime"
                                placeholder="选择日期"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center"
                        >至</el-col
                    >
                    <el-col :span="11">
                        <el-form-item prop="activityEndTime">
                            <el-time-picker
                                v-model="ruleForm.activityEndTime"
                                :disabled="isDisabled"
                                type="datetime"
                                placeholder="选择时间"
                                style="width: 100%"
                            ></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="转发描述：" prop="relayDesc">
                    <el-input
                        v-model="ruleForm.relayDesc"
                        type="textarea"
                        autosize
                        :disabled="isDisabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="转发图片："
                    prop="relayImagUrl"
                    style="margin-bottom: 30px"
                >
                    <Upload
                        v-model="ruleForm.relayImagUrl"
                        dialog-width="30%"
                        drag
                    />
                </el-form-item>
                <el-form-item label="备注描述：" prop="remarksDesc">
                    <el-input
                        v-model="ruleForm.remarksDesc"
                        type="textarea"
                        :disabled="isDisabled"
                        autosize
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="fix-bottom">
                        <el-button
                            v-if="isAddPage"
                            @click="resetForm('ruleForm')"
                            >重填</el-button
                        >
                        <el-button
                            v-if="isAddPage"
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >提交下一步</el-button
                        >
                        <el-button
                            v-if="!isAddPage"
                            @click="$router.push('/manage/aggregate')"
                            >回到聚合页</el-button
                        >
                        <el-button
                            v-if="!isAddPage"
                            type="primary"
                            @click="isDisabled = false"
                            >编辑</el-button
                        >
                    </div>
                </el-form-item>
            </el-form>
            <el-form
                v-if="status == 2"
                ref="ruleForm1"
                :model="ruleForm1"
                :rules="rules1"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="移动端：banner顶图"
                    prop="appBannerImagUrl"
                    style="margin-bottom: 30px"
                >
                    <Upload
                        v-model="ruleForm1.appBannerImagUrl"
                        dialog-width="30%"
                        drag
                    />
                </el-form-item>
                <el-form-item
                    label="PC端：banner顶图"
                    prop="pcBannerImagUrl"
                    style="margin-bottom: 30px"
                >
                    <Upload
                        v-model="ruleForm1.pcBannerImagUrl"
                        dialog-width="30%"
                        drag
                    />
                </el-form-item>
                <el-form-item>
                    <div class="fix-bottom">
                        <el-button
                            v-if="isAddPage"
                            type="primary"
                            @click="submitForm('ruleForm1')"
                            >保存并下一步</el-button
                        >
                        <el-button
                            v-if="!isAddPage"
                            @click="$router.push('/manage/aggregate')"
                            >回到聚合页</el-button
                        >
                        <el-button
                            v-if="!isAddPage"
                            type="primary"
                            @click="isDisabled = false"
                            >编辑</el-button
                        >
                    </div>
                </el-form-item>
            </el-form>
            <div v-if="status == 3">
                <div v-if="contentStatus === 0">
                    <div class="title">
                        <i></i>
                        新增聚合活动页
                    </div>
                    <ul class="flex-ul">
                        <li
                            v-for="(item, index) in productList"
                            :key="index"
                            @click="addItem(index)"
                        >
                            <i></i>
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>
                <div v-if="contentStatus === 1">
                    <div class="title">
                        <i></i>
                        {{ addTitle }}
                        <el-button
                            class="filter-item float-right"
                            type="primary"
                            @click="submitForm('ruleForm2')"
                        >
                            保存
                        </el-button>
                        <el-button
                            class="filter-item float-right margin-right10"
                        >
                            取消
                        </el-button>
                    </div>
                    <el-form
                        ref="ruleForm2"
                        :model="ruleForm2"
                        :rules="rules2"
                        label-width="130px"
                        class="demo-ruleForm"
                        style="width: 650px; margin-top: 20px"
                    >
                        <el-form-item label="专区名称：" prop="zoneName">
                            <el-input v-model="ruleForm2.zoneName"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="isSku"
                            label="产品SKU号："
                            prop="itemNoList"
                        >
                            <el-col :span="21">
                                <el-input
                                    v-model="ruleForm2.itemNoList"
                                    placeholder="请输入内容"
                                >
                                    <template slot="append"
                                        >共{{ selection.length }}个</template
                                    >
                                </el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button
                                    class="filter-item"
                                    type="primary"
                                    style="margin-left: 15px"
                                    @click="openDialog(1)"
                                    >选择</el-button
                                >
                            </el-col>
                        </el-form-item>
                        <el-form-item v-if="isCoupon" label="卡券批次号：">
                            <el-input
                                v-model="selectCoupT"
                                placeholder="请输入内容"
                            >
                                <el-button slot="append" @click="openDialog(2)"
                                    >请选择</el-button
                                >
                            </el-input>

                            <ul class="coupon-list">
                                <li
                                    v-for="(item, index) in selectionCP"
                                    :key="index"
                                >
                                    <div class="img">{{ item.batchNo }}</div>
                                    <div class="img">
                                        <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :limit="1"
                                            :on-remove="handleRemove"
                                            :on-change="handleChange"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                >点击上传</el-button
                                            >
                                            <div
                                                slot="tip"
                                                class="el-upload__tip"
                                            >
                                                只能上传jpg/png文件，且不超过500kb
                                            </div>
                                        </el-upload>
                                    </div>
                                </li>
                            </ul>
                        </el-form-item>
                        <el-form-item
                            v-if="isSku"
                            label="价格颜色："
                            prop="priceColor"
                        >
                            <el-color-picker
                                v-model="ruleForm2.priceColor"
                            ></el-color-picker>
                        </el-form-item>
                        <el-form-item
                            v-if="isText"
                            label="文字颜色："
                            prop="fontColor"
                        >
                            <el-color-picker
                                v-model="ruleForm2.fontColor"
                            ></el-color-picker>
                        </el-form-item>
                        <el-form-item
                            v-if="isText"
                            label="文字描述："
                            prop="fontDesc"
                        >
                            <input
                                v-model="ruleForm2.fontDesc"
                                type="textarea"
                                :rows="2"
                                maxlength="150"
                                show-word-limit
                                placeholder="不填写，用户端优惠券详情不展示该字段"
                            />
                        </el-form-item>
                        <el-form-item
                            v-if="isSku || isCoupon"
                            label="移动端展示方式："
                            prop="appPresentationType"
                        >
                            <el-select
                                v-model="ruleForm2.appPresentationType"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-if="isSku || isCoupon"
                            label="PC端展示方式："
                            prop="pcPresentationType"
                        >
                            <el-select
                                v-model="ruleForm2.pcPresentationType"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-if="isSku || isCoupon || isImg"
                            label="移动端导航图："
                            prop="appNavigationImagUrl"
                            style="margin-bottom: 30px"
                        >
                            <el-col :span="15">
                                <Upload
                                    v-model="ruleForm2.appNavigationImagUrl"
                                    dialog-width="30%"
                                    drag
                                />
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-checkbox v-model="checked"
                                    >增加链接</el-checkbox
                                >
                                <el-input
                                    v-show="checked"
                                    v-model="ruleForm2.appNavigationUrl"
                                    placeholder="请输入内容"
                                ></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item
                            v-if="isSku || isCoupon || isImg"
                            label="PC端导航图："
                            prop="pcNavigationImagUrl"
                        >
                            <el-col :span="15">
                                <Upload
                                    v-model="ruleForm2.pcNavigationImagUrl"
                                    dialog-width="30%"
                                    drag
                                />
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-checkbox v-model="checked2"
                                    >增加链接</el-checkbox
                                >
                                <el-input
                                    v-show="checked2"
                                    v-model="ruleForm2.pcNavigationUrl"
                                    placeholder="请输入内容"
                                ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="contentStatus === 2">
                    <div class="drag-title">拖拽排序</div>
                    <draggable v-model="dragList">
                        <transition-group
                            class="transition-wrapper"
                            name="sort"
                        >
                            <div
                                v-for="item in dragList"
                                :key="item.id"
                                class="drag-item sort-item"
                            >
                                {{ item.name }}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div v-if="contentStatus === 3">
                    <div class="edit-list">
                        <div class="title border-b">
                            <i></i>
                            SKU专区：爆款好物
                            <el-button
                                class="filter-item float-right"
                                type="primary"
                            >
                                删除
                            </el-button>
                            <el-button
                                class="filter-item float-right margin-right10"
                                @click="editSKU"
                            >
                                编辑
                            </el-button>
                        </div>
                        <el-form
                            ref="ruleForm2"
                            :model="ruleForm2"
                            :rules="rules2"
                            label-width="130px"
                            class="demo-ruleForm"
                            style="width: 650px; margin-top: 20px"
                        >
                            <el-form-item label="专区名称：" prop="zoneName">
                                <el-input
                                    v-model="ruleForm2.zoneName"
                                    :disabled="isDisabled2"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="产品SKU号：" prop="itemNoList">
                                <el-col :span="21">
                                    <el-input
                                        v-model="ruleForm2.itemNoList"
                                        placeholder="请输入内容"
                                        :disabled="isDisabled2"
                                    >
                                        <template
                                            v-if="!isDisabled2"
                                            slot="append"
                                            >共{{
                                                selection.length
                                            }}个</template
                                        >
                                    </el-input>
                                </el-col>
                                <el-col v-if="!isDisabled2" :span="3">
                                    <el-button
                                        class="filter-item"
                                        type="primary"
                                        style="margin-left: 15px"
                                        :disabled="isDisabled2"
                                        @click="openDialog(1)"
                                        >选择</el-button
                                    >
                                </el-col>
                            </el-form-item>
                            <el-form-item label="价格颜色：" prop="priceColor">
                                <el-color-picker
                                    v-model="ruleForm2.priceColor"
                                    :disabled="isDisabled2"
                                ></el-color-picker>
                            </el-form-item>
                            <el-form-item
                                label="移动端展示方式："
                                prop="appPresentationType"
                            >
                                <el-select
                                    v-model="ruleForm2.appPresentationType"
                                    placeholder="请选择"
                                    :disabled="isDisabled2"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="PC端展示方式："
                                prop="pcPresentationType"
                            >
                                <el-select
                                    v-model="ruleForm2.pcPresentationType"
                                    placeholder="请选择"
                                    :disabled="isDisabled2"
                                >
                                    <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="移动端导航图："
                                prop="appNavigationImagUrl"
                                style="margin-bottom: 30px"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.appNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked"
                                        :disabled="isDisabled2"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked"
                                        v-model="ruleForm2.appNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item
                                label="PC端导航图："
                                prop="pcNavigationImagUrl"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.pcNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked2"
                                        :disabled="isDisabled2"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked2"
                                        v-model="ruleForm2.pcNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="edit-list">
                        <div class="title border-b">
                            <i></i>
                            纯文字：活动介绍
                            <el-button
                                class="filter-item float-right"
                                type="primary"
                            >
                                删除
                            </el-button>
                            <el-button
                                class="filter-item float-right margin-right10"
                                @click="isDisabled1 = false"
                            >
                                编辑
                            </el-button>
                        </div>
                        <el-form
                            ref="ruleForm2"
                            :model="ruleForm2"
                            :rules="rules2"
                            label-width="130px"
                            class="demo-ruleForm"
                            style="width: 650px; margin-top: 20px"
                        >
                            <el-form-item label="专区名称：" prop="zoneName">
                                <el-input
                                    v-model="ruleForm2.zoneName"
                                    :disabled="isDisabled1"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="文字颜色：" prop="fontColor">
                                <el-color-picker
                                    v-model="ruleForm2.fontColor"
                                    :disabled="isDisabled1"
                                ></el-color-picker>
                            </el-form-item>
                            <el-form-item label="文字描述：" prop="fontDesc">
                                <input
                                    v-model="ruleForm2.fontDesc"
                                    type="textarea"
                                    :rows="2"
                                    maxlength="150"
                                    show-word-limit
                                    placeholder="不填写，用户端优惠券详情不展示该字段"
                                    :disabled="isDisabled"
                                />
                            </el-form-item>
                            <el-form-item
                                label="移动端导航图："
                                prop="appNavigationImagUrl"
                                style="margin-bottom: 30px"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.appNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked"
                                        :disabled="isDisabled1"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked"
                                        v-model="ruleForm2.appNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item
                                label="PC端导航图："
                                prop="pcNavigationImagUrl"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.pcNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked2"
                                        :disabled="isDisabled1"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked2"
                                        v-model="ruleForm2.pcNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="edit-list">
                        <div class="title border-b">
                            <i></i>
                            优惠券专区：领券专区
                            <el-button
                                class="filter-item float-right"
                                type="primary"
                            >
                                删除
                            </el-button>
                            <el-button
                                class="filter-item float-right margin-right10"
                                @click="editCoupon"
                            >
                                编辑
                            </el-button>
                        </div>
                        <el-form
                            ref="ruleForm2"
                            :model="ruleForm2"
                            :rules="rules2"
                            label-width="130px"
                            class="demo-ruleForm"
                            style="width: 650px; margin-top: 20px"
                        >
                            <el-form-item label="专区名称：" prop="zoneName">
                                <el-input
                                    v-model="ruleForm2.zoneName"
                                    :disabled="isDisabled3"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="卡券批次号：">
                                <el-input
                                    v-model="selectCoupT"
                                    placeholder="请输入内容"
                                    :disabled="isDisabled3"
                                >
                                    <el-button
                                        v-if="!isDisabled3"
                                        slot="append"
                                        @click="openDialog(2)"
                                        >请选择</el-button
                                    >
                                </el-input>

                                <ul class="coupon-list">
                                    <li
                                        v-for="(item, index) in selectionCP"
                                        :key="index"
                                    >
                                        <div class="img">
                                            {{ item.batchNo }}
                                        </div>
                                        <div class="img">
                                            <el-upload
                                                class="upload-demo"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :limit="1"
                                                :on-remove="handleRemove"
                                                :on-change="handleChange"
                                            >
                                                <el-button
                                                    size="small"
                                                    type="primary"
                                                    >点击上传</el-button
                                                >
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >
                                                    只能上传jpg/png文件，且不超过500kb
                                                </div>
                                            </el-upload>
                                        </div>
                                    </li>
                                </ul>
                            </el-form-item>
                            <el-form-item
                                label="移动端展示方式："
                                prop="appPresentationType"
                            >
                                <el-select
                                    v-model="ruleForm2.appPresentationType"
                                    placeholder="请选择"
                                    :disabled="isDisabled3"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="PC端展示方式："
                                prop="pcPresentationType"
                            >
                                <el-select
                                    v-model="ruleForm2.pcPresentationType"
                                    placeholder="请选择"
                                    :disabled="isDisabled3"
                                >
                                    <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="移动端导航图："
                                prop="appNavigationImagUrl"
                                style="margin-bottom: 30px"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.appNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked"
                                        :disabled="isDisabled3"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked"
                                        v-model="ruleForm2.appNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item
                                label="PC端导航图："
                                prop="pcNavigationImagUrl"
                            >
                                <el-col :span="15">
                                    <Upload
                                        v-model="ruleForm2.pcNavigationImagUrl"
                                        dialog-width="30%"
                                        drag
                                    />
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-checkbox
                                        v-model="checked2"
                                        :disabled="isDisabled3"
                                        >增加链接</el-checkbox
                                    >
                                    <el-input
                                        v-show="checked2"
                                        v-model="ruleForm2.pcNavigationUrl"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="fix-bottom">
                    <el-button
                        v-if="contentStatus == 2 || contentStatus == 3"
                        @click="$router.push('/manage/aggregate')"
                        >回到聚合页</el-button
                    >
                    <el-button v-if="contentStatus == 2" type="primary"
                        >预览效果</el-button
                    >
                    <el-button v-if="contentStatus == 2" type="primary"
                        >提交保存</el-button
                    >
                    <el-button
                        v-if="
                            contentStatus == 1 ||
                            contentStatus == 0 ||
                            contentStatus == 2
                        "
                        type="primary"
                        @click="contentStatus = 2"
                        >预览排序</el-button
                    >
                    <a
                        v-if="
                            contentStatus == 1 ||
                            contentStatus == 0 ||
                            contentStatus == 2
                        "
                    >
                        <el-dropdown
                            style="margin-left: 10px"
                            trigger="click"
                            @command="showUpdate"
                        >
                            <el-button class="filter-item" type="primary">
                                新增<i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    v-for="item in productList"
                                    :key="item"
                                    :command="item"
                                    >{{ item }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </a>
                </div>
            </div>
        </div>
        <el-dialog title="选择产品" :visible.sync="dialogSKU" width="60%">
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
                    ref="multipleTable"
                    v-loading="loading.table"
                    :data="data.table"
                    :height="data.tableHeight"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" label="序号" width="55">
                    </el-table-column>
                    <el-table-column
                        label="订货号SKU"
                        prop="itemNo"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="mfrNo"
                        label="创造商型号"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="salesPrice" label="销售面价">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSKU = false">取 消</el-button>
                <el-button type="primary" @click="submits">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择产品" :visible.sync="dialogCoupon" width="60%">
            <div v-loading="loading.base" style="min-height: 200px">
                <div class="search-box">
                    <div class="search-label">卡券批次号：</div>
                    <el-input
                        v-model="batchNo"
                        class="search-input"
                        placeholder=""
                        size="mini"
                        clearable
                    />
                    <div class="search-label">券类型：</div>
                    <el-select v-model="couponType" placeholder="请选择">
                        <el-option
                            v-for="item in couponList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
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
                    ref="multipleTable"
                    v-loading="loading.table"
                    :data="tableCP"
                    :height="data.tableHeight"
                    style="width: 100%"
                    @selection-change="handleSelectionChangeCP"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="batchNo"
                        label="卡券批次号"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="couponTypeName" label="券类型">
                    </el-table-column>
                    <el-table-column prop="receivedNum" label="领取数量">
                    </el-table-column>
                    <el-table-column prop="grantState" label="发放状态">
                        <template slot-scope="scope">
                            <span>{{ cpMap[scope.row.activeStatus] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="useNum" label="已使用">
                    </el-table-column>
                    <el-table-column prop="activeStatus" label="生效状态">
                        <template slot-scope="scope">
                            <span>{{
                                grantStateMap[scope.row.grantState]
                            }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination
                    v-show="pageC.totalCount > 0"
                    :total="pageC.totalCount"
                    :page.sync="pageC.pageNo"
                    :limit.sync="pageC.pageSize"
                    @pagination="load()"
                />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCoupon = false">取 消</el-button>
                <el-button type="primary" @click="submitsCP">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination';
import draggable from 'vuedraggable';
import {
    aggregateAdd,
    addTopImage,
    getItemInfo,
    couponQuery,
    addContentCoupon,
    aggregateDetail
} from '@/api/manage/aggregate';
import Upload from '@/components/Upload/SingleImage4';
export default {
    name: 'AggregateAdd',
    components: {
        Upload,
        Pagination,
        draggable
    },
    data() {
        let tableHeight = document.body.clientHeight * 0.9 - 214;
        if (tableHeight > 790) {
            tableHeight = 790;
        }
        return {
            isDisabled: false,
            isDisabled1: true,
            isDisabled2: true,
            isDisabled3: true,
            detailObj: '',
            pageTitle: '',
            activeName: 'first',
            isAddPage: false,
            dragList: [
                {
                    id: '1',
                    name: '优惠券专区：领券专区'
                },
                {
                    id: '2',
                    name: 'SKU专区：爆款好物'
                },
                {
                    id: '3',
                    name: 'SKU专区：推荐好物'
                },
                {
                    id: '4',
                    name: 'SKU专区：低价促销'
                },
                {
                    id: '5',
                    name: '纯图片：专区详情说明'
                },
                {
                    id: '6',
                    name: '纯文字：领券专区'
                }
            ],
            fileList: [],
            grantStateMap: {
                0: '待发放',
                1: '发放中',
                2: '发放结束',
                3: '暂停发放'
            },
            cpMap: {
                0: '未生效',
                1: '生效中',
                2: '已失效'
            },
            tableCP: [],
            batchNo: '',
            couponType: '',
            couponList: [
                {
                    label: '代金券',
                    value: 0
                },
                {
                    label: '折扣券',
                    value: 0
                },
                {
                    label: '运费券',
                    value: 0
                }
            ],
            data: {
                table: [],
                // confirm: (this.value && [...this.value]) || [],
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
            pageC: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0
            },
            loading: {
                base: false,
                table: false
            },
            selection: [],
            selectionCP: [],
            selectCoup: [],
            selectCoupT: '',
            dialogSKU: false,
            dialogCoupon: false,
            isSku: false,
            isCoupon: false,
            isImg: false,
            isText: false,
            addTitle: '',
            contentStatus: 0,
            checked: false,
            urlImg1: '',
            checked2: false,
            urlImg2: '',
            options: [
                {
                    value: '0',
                    label: '黄横向滑动展示金糕'
                },
                {
                    value: '1',
                    label: '一行一个'
                },
                {
                    value: '2',
                    label: '一行两个'
                }
            ],
            options2: [
                {
                    value: '0',
                    label: '一行一个'
                },
                {
                    value: '1',
                    label: '一行两个'
                },
                {
                    value: '2',
                    label: '一行三个'
                },
                {
                    value: '3',
                    label: '一行四个'
                },
                {
                    value: '4',
                    label: '一行五个'
                }
            ],
            activityId: '',
            productList: ['SKU产品专区', '优惠券专区', '纯图片', '纯文字'],
            title: '基本信息',
            status: 1,
            ruleForm: {
                activityName: '',
                hpBottomColor: '',
                activityStartTime: '',
                activityEndTime: '',
                platformType: '',
                relayDesc: '',
                remarksDesc: '',
                relayImagUrl: ''
            },
            ruleForm1: {
                appBannerImagUrl: '',
                pcBannerImagUrl: ''
            },
            ruleForm2: {
                activityId: '', //活动id
                zoneName: '', //活动名称
                itemNoList: '', //订货号SKU,多个数据通过,分割
                priceColor: '', //价格颜色
                appPresentationType: '', //移动端展现方式，0横向滑动，1一行一个，2一行两个，3，一行三个...
                pcPresentationType: '', //pc端展现方式，1一行一个展示，2一行两个展示，3一行三个，4一行四个..
                appNavigationImagUrl: '', //移动端导航图片地址,
                appNavigationUrl: '', //移动端导航增加链接地址,
                pcNavigationImagUrl: '', //pc端导航图片地址,
                pcNavigationUrl: '', //pc端导航增加链接地址,
                fontColor: '',
                fontDesc: ''
            },
            rules1: {
                // appBannerImagUrl:[
                //     { required: true, message: '请选择图片', trigger: 'blur' }
                // ],
                // pcBannerImagUrl:[
                //     { required: true, message: '请选择图片', trigger: 'blur' }
                // ]
            },
            rules2: {
                zoneName: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }
                ],
                itemNoList: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'change'
                    }
                ],
                priceColor: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'change'
                    }
                ]
            },
            rules: {
                //   activityName: [
                //     { required: true, message: '请输入活动名称', trigger: 'blur' },
                //     // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                //   ],
                //   hpBottomColor:[
                //       { required: true, message: '请选择颜色', trigger: 'blur' },
                //   ],
                //   activityStartTime: [
                //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                //   ],
                //   activityEndTime: [
                //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                //   ],
                //   platformType: [
                //     { required: true, message: '请选择展示平台', trigger: 'change' }
                //   ],
                //   relayDesc: [
                //     { required: true, message: '请填写转发描述', trigger: 'blur' }
                //   ],
                //   remarksDesc: [
                //     { required: true, message: '请上传转发图片', trigger: 'blur' }
                //   ],
                //   relayImagUrl:[
                //       { required: true, message: '请选择图片', trigger: 'blur' }
                //   ]
            }
        };
    },
    created() {
        this.isAddPage = JSON.parse(this.$route.query.isAddPage);
        if (!this.isAddPage) {
            this.pageTitle = '聚合活动页详情';
            this.isDisabled = true;
            this.getDetail();
        } else {
            this.pageTitle = '新增聚合活动页';
        }
    },
    methods: {
        editSKU() {
            this.isDisabled2 = false;
            this.isSku = true;
            this.isCoupon = false;
        },
        editCoupon() {
            this.isDisabled3 = false;
            this.isCoupon = true;
            this.isSku = false;
        },
        async getDetail() {
            try {
                this.loading.base = true;
                const confirmData = {
                    apInformationId: this.$route.query.apInformationId
                };
                this.detailObj = await aggregateDetail(confirmData);
                // const { activityName, hpBottomColor,activityStartTime, activityEndTime, platformType,relayDesc,remarksDesc,relayImagUrl} = this.detailObj.base
                // const { appBannerImagUrl, pcBannerImagUrl} = this.detailObj.top
                // const { activityId, zoneName,itemNoList, priceColor, appPresentationType,pcPresentationType,appNavigationImagUrl,appNavigationUrl,pcNavigationImagUrl,pcNavigationUrl,fontColor,fontDesc} = this.detailObj.contents
                this.ruleForm = this.detailObj.base;
                this.ruleForm1 = this.detailObj.top;
                // this.ruleForm2 = this.detailObj.contents
            } catch (e) {
                console.log('load', e);
                // this.visible.form = true;
                this.loading.base = false;
            }
        },
        handleClick(tab, event) {
            this.isDisabled = true;
            switch (tab.label) {
                case '基本信息':
                    this.status = 1;
                    this.activeName = 'first';

                    break;
                case '顶部图片':
                    this.status = 2;
                    this.activeName = 'second';
                    break;
                case '内容配置':
                    this.status = 3;
                    this.contentStatus = 3;
                    this.activeName = 'third';
                    break;
            }
        },
        handleRemove(file) {},
        handleChange(file) {},
        async load(pageType = 2) {
            try {
                console.log(this.isSku, this.isCoupon);
                this.loading.base = true;
                const { pageNo, pageStartId, pageEndId, pageSize } = this.page;

                const confirmData = { pageSize, pageType };
                if (pageType === 1) {
                    confirmData.pageStartId = pageStartId;
                } else {
                    confirmData.pageEndId = pageEndId;
                }
                if (this.isSku) {
                    if (this.data.itemNo) {
                        confirmData.itemNo = this.data.itemNo;
                    }
                    const res = await getItemInfo(confirmData);
                    this.page.pageStartId = res.pageStartId;
                    this.page.pageEndId = res.pageEndId;
                    const list = [];
                    for (const i in res.itemInfo) {
                        const v = res.itemInfo[i];
                        v.index = i * 1 + 1 + (pageNo - 1) * 10;
                        list.push(v);
                    }
                    this.data.table = list;
                    this.loading.base = false;
                    await this.$nextTick();
                    this.$refs.multipleTable.clearSelection();
                    for (const v of this.data.table) {
                        if (
                            this.selection.find(
                                (item) => item.itemNo == v.itemNo
                            )
                        ) {
                            this.$refs.multipleTable.toggleRowSelection(v);
                        }
                    }
                } else if (this.isCoupon) {
                    const confirmData = {
                        pageNo: this.pageC.pageNo,
                        pageSize: this.pageC.pageSize,
                        batchNo: this.batchNo,
                        couponType: this.couponType
                    };
                    const response = await couponQuery(confirmData);

                    // const list = [];
                    // for (const v of response.couponBatchData) {
                    //     list.push(this.formatRow(v));
                    // }
                    this.tableCP = response.couponBatchData;
                    this.loading.base = false;
                }
            } catch (e) {
                console.log('load', e);
                // this.visible.form = true;
                this.loading.base = false;
            }
        },
        openDialog(v) {
            if (v === 1) {
                this.dialogSKU = true;
                this.page.pageStartId = null;
                this.page.pageEndId = null;
                this.page.pageNo = 1;
                this.isSku = true;
                this.isCoupon = false;
            } else if (v === 2) {
                this.dialogCoupon = true;
                this.isCoupon = true;
                this.isSku = false;
            }
            this.load();
        },
        submits() {
            this.dialogSKU = false;
            this.ruleForm2.itemNoList = '';
            let list = [];
            this.selection.map((item) => {
                list.push(item.itemNo);
            });
            this.ruleForm2.itemNoList = list.join(',');
        },
        submitsCP() {
            this.dialogCoupon = false;
            this.ruleForm2.itemNoList = '';
        },
        handleSelectionChange(val) {
            this.selection = val;
        },
        handleSelectionChangeCP(val) {
            this.selectionCP = val;
            this.selectCoupT = `共${this.selectionCP.length}个`;
        },
        addItem(index) {
            switch (index) {
                case 0:
                    this.contentStatus = 1;
                    this.addTitle = '新增SKU';
                    this.isSku = true;
                    this.isCoupon = false;
                    this.isImg = false;
                    this.isText = false;
                    break;
                case 1:
                    this.contentStatus = 1;
                    this.addTitle = '新增优惠券专区';
                    this.isSku = false;
                    this.isCoupon = true;
                    this.isImg = false;
                    this.isText = false;
                    break;
                case 2:
                    this.contentStatus = 1;
                    this.addTitle = '新增纯图片';
                    this.isSku = false;
                    this.isCoupon = false;
                    this.isImg = true;
                    this.isText = false;
                    break;
                case 3:
                    this.contentStatus = 1;
                    this.isSku = false;
                    this.isCoupon = false;
                    this.isImg = false;
                    this.isText = true;
                    this.addTitle = '新增纯文本';
                    break;
            }
        },
        // chooseSKU (e) {
        //     this.ruleForm2.itemNoList += e +','
        //     this.itemNoListArr = this.ruleForm2.itemNoList.split(',')
        //     console.log(this.itemNoListArr)
        // },
        showUpdate(e) {
            switch (e) {
                case 'SKU产品专区':
                    this.contentStatus = 1;
                    this.addTitle = '新增SKU';
                    this.isSku = true;
                    this.isCoupon = false;
                    this.isImg = false;
                    this.isText = false;
                    break;
                case '优惠券专区':
                    this.contentStatus = 1;
                    this.addTitle = '新增优惠券专区';
                    this.isSku = false;
                    this.isCoupon = true;
                    this.isImg = false;
                    this.isText = false;
                    break;
                case '纯图片':
                    this.contentStatus = 1;
                    this.isSku = false;
                    this.isCoupon = false;
                    this.isImg = true;
                    this.isText = false;
                    this.addTitle = '新增纯图片';
                    break;
                case '纯文字':
                    this.contentStatus = 1;
                    this.isSku = false;
                    this.isCoupon = false;
                    this.isImg = false;
                    this.isText = true;
                    this.addTitle = '新增纯文本';
                    break;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (formName === 'ruleForm') {
                        const dataObject = aggregateAdd(this.ruleForm);
                        this.status = 2;
                        this.title = '顶部图片';
                        this.activityId = dataObject.data.activityId;
                    } else if (formName === 'ruleForm1') {
                        this.ruleForm1.activityId = this.activityId;
                        const topImg = addTopImage(this.ruleForm1);
                        this.status = 3;
                        this.contentStatus = 0;
                        this.title = '内容配置';
                    } else if (formName === 'ruleForm2') {
                        if (this.isSku) {
                            console.log('请求sku add接口');
                            this.$refs[formName].clearValidate();
                            this.$refs[formName].resetFields();
                        } else if (this.isCoupon) {
                            this.$refs[formName].clearValidate();
                            this.$refs[formName].resetFields();
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
.sort-move {
    transition: transform 0.3s;
}
.container .el-tabs--card .el-tabs__header .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
        width: 33.33%;
    }
}
.container .el-input.is-disabled .el-input__inner {
    border: none;
    background: #fff;
    cursor: none;
}
.container .el-select .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
    border: 1px solid #dfe4ed;
}
.container input:disabled {
    border: none;
    background: #fff;
    cursor: none;
}
</style>
<style scoped lang="scss">
@import './index.scss';
</style>
