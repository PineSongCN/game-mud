import * as $Aggregate from '@/api/manage/aggregate';
export const map = (type) => {
    let appPresentationType = [
        {
            value: 0,
            label: '横向滑动',
            filter: ['contentSku']
        },
        {
            value: 1,
            label: '一行一个',
            filter: ['contentCoupon', 'contentSku']
        },
        {
            value: 2,
            label: '一行两个',
            filter: ['contentCoupon', 'contentSku']
        }
    ];
    let pcPresentationType = [
        {
            value: 0,
            label: '横向滑动',
            filter: ['contentSku']
        },
        {
            value: 1,
            label: '一行一个',
            filter: ['contentCoupon', 'contentSku']
        },
        {
            value: 2,
            label: '一行两个',
            filter: ['contentCoupon']
        },
        {
            value: 3,
            label: '一行三个',
            filter: ['contentCoupon', 'contentSku']
        },
        {
            value: 4,
            label: '一行四个',
            filter: ['contentSku']
        },
        {
            value: 5,
            label: '一行五个',
            filter: ['contentSku']
        }
    ];
    if (type) {
        appPresentationType = appPresentationType.filter((item) =>
            item.filter.includes(type)
        );
        pcPresentationType = pcPresentationType.filter((item) =>
            item.filter.includes(type)
        );
    }
    return {
        title: [
            {
                value: 1,
                label: '基本信息'
            },
            {
                value: 2,
                label: '顶部图片'
            },
            {
                value: 3,
                label: '内容配置'
            },
            {
                value: 4,
                label: '内容配置'
            }
        ],
        platformType: [
            {
                value: 2,
                label: 'PC端'
            },
            {
                value: 1,
                label: '移动端'
            }
        ],
        contentType: [
            {
                api: [
                    $Aggregate['addContentSku'],
                    $Aggregate['updateContentSku'],
                    $Aggregate['deleteContentSku']
                ],
                icon: 'sku.png',
                value: 'contentSku',
                label: 'SKU产品专区',
                zoneType: 1
            },
            {
                api: [
                    $Aggregate['addContentCoupon'],
                    $Aggregate['updateContentCoupon'],
                    $Aggregate['deleteContentCoupon']
                ],
                icon: 'coupon.png',
                value: 'contentCoupon',
                label: '优惠券专区',
                zoneType: 2
            },
            {
                api: [
                    $Aggregate['addContentImage'],
                    $Aggregate['updateContentImage'],
                    $Aggregate['deleteContentImage']
                ],
                icon: 'images.png',
                value: 'contentImage',
                label: '纯图片',
                zoneType: 4
            },
            {
                api: [
                    $Aggregate['addContentWord'],
                    $Aggregate['updateContentWord'],
                    $Aggregate['deleteContentWord']
                ],
                icon: 'text.png',
                value: 'contentWord',
                label: '纯文字',
                zoneType: 3
            }
        ],
        appPresentationType,
        pcPresentationType,
        activeStatus: [
            {
                label: '未生效',
                value: 0
            },
            {
                label: '生效中',
                value: 1
            },
            {
                label: '已失效',
                value: 2
            }
        ],
        grantState: [
            {
                label: '待发放',
                value: 0
            },
            {
                label: '发放中',
                value: 1
            },
            {
                label: '发放结束',
                value: 2
            },
            {
                label: '暂停发放',
                value: 3
            }
        ],
        couponType: [
            {
                label: '代金券',
                value: 0
            },
            {
                label: '折扣券',
                value: 1
            },
            {
                label: '运费券',
                value: 2
            }
        ],
        triggerScene: [
            {
                label: '主动发放',
                value: 0
            },
            {
                label: '注册',
                value: 1
            }
        ]
    };
};
