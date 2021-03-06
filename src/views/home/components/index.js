import { MessageBox, Message, Input } from 'element-ui';
import { Field } from 'vant';

export const session = (h) => ({
    // title: '第一章《摘下星星之人》',
    title: '摘下星星之人',
    data: [
        {
            content:
                '1923年3月14日，太阳刚刚落下月亮便升了起来，在寂静的夜晚里，一艘承载了13名船员54名旅客以及数吨重的货物的的警戒号，驶离了悉尼湾的环形码头，但实际上这艘航船真正的货物其实是鲜活的你们，如果不是意外的暴风雨导致了航线向北轻微偏航，恐怕如今你们都沉入了大海的深渊之中。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {},
            
        },
        {
            content:
                '你从昏暗的客舱中醒来头脑仍然胀痛不已，致使你分不清是船体的颠簸，还是你的大脑在剧烈的晃动，4人的客舱不知为何只剩下了你一个人，你依稀记得睡在你对铺的是一个来自美洲的黑人，其余两人就没有印象了毕竟从上船起你就一直昏睡不醒，连吃饭的时间都错过了不少次，也庆幸你随船带了不少食物，不然可非得活活饿死在这船上。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '从狭小的窗户望向外面，月亮完美无缺的悬挂在夜空之中，船随着波涛涌动月亮也随着你的眼睛律动起来，渐渐的你开始感到奇怪起来，原以为同船的旅客只是半夜去内急去上厕所罢了，可如今你已经清醒了半个钟头了却仍不见有人归来迹象。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '收回望向月亮的目光你仔细的观察客舱起来，黑人的床榻整整齐齐整洁的就像未曾有人睡过，而另外两位客人的床榻就显得凌乱不堪，甚至还有酒瓶滚落在床上，里面残余的酒液随着航船的起伏洒落在床垫上，你开始不得不怀疑另外两个旅客估计是喝醉酒了找不到回船舱的路吧，你拿起桌上被油灯压住的一副图纸查看，那应该不是另外两位旅客携带的东西毕竟这在你的桌上，可若是那个黑人的物品也更有些说不过去。',
            next: '打开图纸',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '图纸上画着一群长脚的鱼朝拜着黑色的太阳，它们手持短刀切开一具老人的肚腩，然后将老人的灵魂献祭给了大海。这副图纸有种说不出的诡异，旁边记录着一些特殊的符号，是一种你从未见过的文字。',
            next: '放下',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '正在这时，屋外突然传来一声凄厉的尖叫声，那尖叫声传递的恐惧感使你头疼再次加重。<br>你提起油灯试图前去一探究竟，油灯在你手中轻微晃动发出金属摩擦的声音像是快要损坏的样子，灯光照亮了锈迹斑斑的铁门，以及那许久未有人擦拭的玻璃视窗。',
            next: '开门',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你试着打开房门可即使使出了全身了的力气门把手依旧纹丝不动，呼的一声，似乎有东西从门外快速跑过，当你反应过来时那东西已经消失在了视窗的视野里，你将油灯拧向玻璃视窗，灯光透过玻璃照亮了门前的红色通道，过道上空无一人，唯独让你感到奇怪的是红色地板残留了一道白色的浊液，在灯光的照耀下反射着微光，上面还残留着两块大型鱼类的鳞片以及一个损坏的门把手。',
            next: '呼喊',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你爬在窗口大声呼喊起来试图引起船员的注意，你的声音引来了刚刚的那道身影，一只巨大的鱼眼占满了半个窗户，你惊愕的发现门口竟然是一只巨大行走的鱼类，它张开锋利的牙齿开始嚎叫起来，挥舞着畸形的手臂试图打开房门，幸好门把手早已被损毁怪异的鱼类无法闯入你的房间。你用纸张挡住了玻璃，将床板和小木柜抵住了门口，外面的鱼怪又再尝试几次无法闯入后便果断的离开了。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你惊魂未定的回到床边坐下，眼光落在了那张被掀开的床板的下方，那个曾是黑人整洁的床位下方有着一个暗道门，暗道被上了一把黄铜色的密码锁。密码锁上面刻录着的并非熟悉的数字密码，反而是月相符号分别是【朔月】【上弦】【满月】【下弦】。毫无头绪的你试图在房间里搜寻一些有用的信息。',
            next: '搜寻',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '通过搜寻你在那张诡异的图纸背面发现了潦草的字迹，【3.7】【3.21】【3.21】【3.14】你看了眼窗外，虽然记不清自己今天是第几号，但却清晰记得自己是在3月14日出发的。<br>你来到了暗道边，油灯照亮了黄铜锁上面的触手斑驳残留着触手的纹路。你再次查阅了图纸后面的字迹，开始尝试打开密码锁。',
            next: '开锁',
            class: ['center'],
            beforeNext: async () => {
                const key = Date.now();
                let value = undefined;
                const msgbox = {
                    key: Math.random(),
                    data: [
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        }
                    ],
                    confirm: ['上弦', '下弦', '下弦', '满月']
                };
                const inputBox = [];
                for (const i in msgbox.data) {
                    inputBox.push(
                        h('input', {
                            key: msgbox.data[i]['key'],
                            class: 'session-input',
                            props: {
                                value: msgbox.data[i]['value']
                            },
                            domProps:{
                                autofocus: i == 0 ? 'autofocus' : ''
                            },
                            on: {
                                input(e) {
                                    const value = e.target.value;
                                    msgbox.data[i]['value'] = value;
                                    // console.log('input', e);
                                },
                                change(e) {
                                    // console.log('change', e);
                                }
                            }
                        })
                    );
                }
                const res = await MessageBox({
                    title: '开锁',
                    message: h('div', { key, class: 'session-box' }, [
                        h(
                            'div',
                            {
                                style: 'margin-bottom:15px;'
                            },
                            '请将正确月相符号输入框内'
                        ),
                        h(
                            'div',
                            {
                                class: 'session-list'
                            },
                            [...inputBox]
                        )
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose(action, instance, done) {
                        if (action === 'confirm') {
                            let tag = true;
                            for (const k in msgbox.data) {
                                if (
                                    Object.hasOwnProperty.call(msgbox.data, k)
                                ) {
                                    const value =
                                        msgbox.data[k]['value'].trim();
                                    const confirm = msgbox.confirm[k];
                                    if (value !== confirm) {
                                        tag = false;
                                    }
                                }
                            }
                            if (tag) {
                                Message({
                                    message: '开锁成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                done();
                            } else {
                                Message({
                                    message: '锁未打开，请重试',
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        } else {
                            done();
                        }
                    }
                });
            }
        },
        {
            content: '“咔哒”',
            next: '打开暗门',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '暗门被你打开，下面一片漆黑你用提灯向下面照了照，那是一条幽深的竖井通道，整个通道里除了锈迹斑斑的楼梯和损坏的应急灯并无他物，屋外突然传来一声撞击声，还有鱼怪的嘶叫声，受到惊吓你提灯从手中滑落掉了下去，火苗扑腾两下就消失了踪迹，暗道又陷入了黑暗之中。外面的撞击越来越多，悉悉索索的脚步声和抓墙声越来越多。时间紧急，你顺手拿起两个旅客床旁的一个手提箱便直接前往密道。',
            next: '进入暗道',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '所幸暗道并没有什么危险，你趴在楼梯上将暗门挡板从内部锁上，光便从你的视野完全消失了，你摸索着尝试打开皮箱，但上面被上了密码锁应该是最简单的数字密码锁。你回忆起睡梦中曾梦到两只狗熊反反复复为着蜂蜜争吵，或许两只狗熊的对话就是现那两个旅馆在你睡梦时的争吵。',
            next: '回忆',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '“1只狗熊偷11罐蜂蜜，2只狗熊共偷20罐蜂蜜”<br>“1只狗熊分9罐蜂蜜，2只狗熊共分17罐蜂蜜”<br>“一只狗熊说另一只狗熊多分蜂蜜，另一只狗熊说一只狗熊少偷了蜂蜜，一只狗熊说另一只狗熊藏了蜂蜜”<br>思索了片刻你尝试着打开密码箱。',
            next: '开锁',
            class: ['center'],
            beforeNext: async () => {
                const key = Date.now();
                let value = undefined;
                const msgbox = {
                    key: Math.random(),
                    data: [
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        }
                    ],
                    confirm: ['1', '1', '1']
                };
                const inputBox = [];
                for (const i in msgbox.data) {
                    inputBox.push(
                        h('input', {
                            key: msgbox.data[i]['key'],
                            class: 'session-input',
                            props: {
                                value: msgbox.data[i]['value']
                            },
                            domProps:{
                                autofocus: i == 0 ? 'autofocus' : ''
                            },
                            on: {
                                input(e) {
                                    const value = e.target.value;
                                    msgbox.data[i]['value'] = value;
                                    // console.log('input', e);
                                },
                                change(e) {
                                    // console.log('change', e);
                                }
                            }
                        })
                    );
                }
                const res = await MessageBox({
                    title: '开锁',
                    message: h('div', { key, class: 'session-box' }, [
                        h(
                            'div',
                            {
                                style: 'margin-bottom:15px;'
                            },
                            '请将正确数字输入框内'
                        ),
                        h(
                            'div',
                            {
                                class: 'session-list'
                            },
                            [...inputBox]
                        )
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose(action, instance, done) {
                        if (action === 'confirm') {
                            let tag = true;
                            for (const k in msgbox.data) {
                                if (
                                    Object.hasOwnProperty.call(msgbox.data, k)
                                ) {
                                    const value =
                                        msgbox.data[k]['value'].trim();
                                    const confirm = msgbox.confirm[k];
                                    if (value !== confirm) {
                                        tag = false;
                                    }
                                }
                            }
                            if (tag) {
                                Message({
                                    message: '开锁成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                done();
                            } else {
                                Message({
                                    message: '锁未打开，请重试',
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        } else {
                            done();
                        }
                    }
                });
            }
        },
        {
            content: '“咔哒”',
            next: '打开箱子',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你从箱子里找到了一个手电，就在你试图打开手电的那一刻，你听到客舱内传来的砰的一声，是铁门撞开的声音。可你觉得那应该不是那些鱼怪能做到的，你猜测还有着更诡异的生物参与了进来。你屏住了呼吸不敢在暗道内发出任何声响，声怕外面的生物发现了你的踪迹，悉悉索索的声音离你越来越近，就在你的头顶一群长着扭曲四肢的鱼怪正在搜寻着你的屋子，而你与它们的距离仅仅只有一个生锈的挡板的阻隔。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '有鱼怪发现了挡板的古怪试图将其抛开，他们爬在被锁上的挡板的缝隙处用鼻子嗅着,恶臭的液体从它们体内溢出，渗过挡板的缝隙滴落到了你的脸上，你听到它们含糊不清的说什么，那中仿佛从枯萎朽木里发出干哑的声音让你头皮一阵发麻，你从一长串的语录里听懂了两个单词，一个是【GREAT】另外一个是【ANCIENT】。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '房间的骚乱持续了一阵子一无所获的鱼怪陆陆续续的离开了，你得到了喘息的机会，用手电向下照去看到了已经破碎的油灯以及视乎损坏许久的警示灯，这是一条隐蔽竖井不知为何竟然通向你所居住的船舱，因为无人打理楼梯已经被腐蚀的锈迹斑斑，头顶仍有恶臭的液体滴到了你的头发和衣领上，你在心里恶狠狠的咒骂那些怪异的生物。',
            next: '向下攀爬',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '很快你便来到了竖井的最底端打开手电面前是一扇水密门，你尝试了一下似乎凭借你的力气根本无法打开，你不甘心的又试了试，确信了无法打开。你得寻找帮手或者是工具，用手电再次翻找了了皮箱除了几件衣物外还有着一张照片。那是一对棕发兄弟穿着短袖的合照，可是其中一人反常的戴着高领的围巾和面罩，照片背后是一串数字和以及被被涂黑的墨点【123571113****】。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你抬头望了望上面有些不情愿，但你知道你必须得冒着生命危险再次前往船舱，长日的不进食导致你已经快有些虚脱了，你突然想起了自己的处境，茫茫的大海中这艘货轮即使危机四伏却仍然是你生存立足之地，离开了轮船你依然无法活下去，除非避开那些鱼怪拿到救生艇和食物。你肯定自己还遗漏了些什么线索，你晃了晃晕沉的脑袋然后向上爬去。',
            next: '向上攀爬',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '谨慎的推开暗道的挡板，房间的铁皮门被砸开了个巨大的缺口，视窗的玻璃碎裂在地面到处都是，上面还残留着鱼怪穿过时留下的绿色液体，你悄悄的走向门边探头左右望了望，过道一片狼藉你听到楼梯间传来阵阵的枪击声，应该是船员开始反击你祈祷着他们能够为你带来胜利，你在房间再次搜寻了许久，期间并没有遭遇过之前的鱼怪，这或许得益于鱼怪们都被枪声吸引了过去。',
            next: '搜寻',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你从黑人的枕头里面发现了一个怪异的雕塑和一把短刀，还从金发兄弟的鞋里中找到了一袋宝石。惊喜之余你开始猜测起金发兄弟的职业，不过比起珠宝更重要的还是那个奇怪的雕像。',
            next: '查看雕像',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '绿色的鱼怪手里捧着黑色的盒子，盒子顶部有三个可以拔出的石块和一个空缺的石槽，分别是【梯子】【婴儿】【星星】按下石块以后可以将石块取出。雕塑的材质十分特殊你用短刀敲击下石雕发出了清脆的叮铃声，石雕毫发无伤没有一点点刻痕。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你随机的尝试了下试图解开雕像的秘密，但外面传来了急促的脚步声，你迅速的躲回了暗道中，外面似乎有人正在急促的翻找着什么你隐约的听到了他说“金发兄弟与宝石”，但是动静过大很快就招来了鱼怪，你躲在暗道中听到了男人的咒骂声，几声枪响过后外面只剩下了鱼怪悉悉索索的声音。',
            next: '向下攀爬',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '暂时又被困在了密道之中，你悄悄的回到了竖井底部，面对紧闭的水密门你没有再试图浪费力气尝试一番。打开手电你仔细的研究起了石雕像，空缺的石槽让你觉得似乎丢失关键的钥匙，如果找不到丢失的钥匙恐怕这个盒子永远也无法打开吧。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你掏出了【一袋宝石】只要能活着回去，这一袋宝石换来的金钱可以使你富裕充实的度过一生，正当你沉浸于美梦的幻想时，一滴红色的液体滴落在了你的手心，鲜艳的红色瞬间将你从梦境里拉出，你下意识的挥动手臂，手中的宝石全数洒落。',
            next: '搜寻宝石',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你大概已经知晓上面是一副炼狱般血腥的场景，叹了口气你拿起手电蹲在地上一颗一颗将宝石捡起，任由血液滴落在后背绽开，手电照到之前摔落的油灯，你从玻璃中捡起了一个石块，原以为是滚落在其中的宝石，可当你用石雕上的石块做对比，惊喜的发现正好就是缺失的哪一个，翻到正面上面刻着【时间】',
            next: '插入卡槽',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content: '【梯子】【婴儿】【星星】【-----】',
            next: '插入时间',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content: '【种子】【男人】【月亮】【时间】',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '当你把时间插到最后一个卡槽时，【婴儿】石块变为【男人】，【梯子】在时间的回溯下变回了【种子】，【星星】消失不见变成了【月亮】，再次插入还能变成【老人】【太阳】【木头】，巧妙的设计让你惊奇不已，手中的这几个石块的价值或许远远超越了那一袋宝石也说不定，几次尝试后你发现无论插入几个石块，只要在最后插入【时间】前面的石块符号都会变为另一个样子。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '你继续在破碎的油灯的里搜寻试图找到一些线索，果然在油灯的内部刻这一段斑驳的字迹。“Take off the stars”<br>脑袋不再昏沉你快速的分析着这一段话，除去【时间】石块以外3个石块分别可以选择的样子。<br>【婴儿】→【男人】→【老人】；【星星】→【月亮】→【太阳】；【梯子】→【种子】→【木头】',
            next: '插入石块',
            class: ['center'],
            beforeNext: async () => {
                const key = Date.now();
                let value = undefined;
                const msgbox = {
                    key: Math.random(),
                    data: [
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        },
                        {
                            key: Math.random(),
                            value: ''
                        }
                    ],
                    confirm: ['婴儿', '木头', '星星', '时间']
                };
                const inputBox = [];
                for (const i in msgbox.data) {
                    inputBox.push(
                        h('input', {
                            key: msgbox.data[i]['key'],
                            class: 'session-input',
                            props: {
                                value: msgbox.data[i]['value']
                            },
                            domProps:{
                                autofocus: i == 0 ? 'autofocus' : ''
                            },
                            on: {
                                input(e) {
                                    const value = e.target.value;
                                    msgbox.data[i]['value'] = value;
                                    // console.log('input', e);
                                },
                                change(e) {
                                    // console.log('change', e);
                                }
                            }
                        })
                    );
                }
                const res = await MessageBox({
                    title: '开锁',
                    message: h('div', { key, class: 'session-box' }, [
                        h(
                            'div',
                            {
                                style: 'margin-bottom:15px;'
                            },
                            '请将正确石块名称输入框内'
                        ),
                        h(
                            'div',
                            {
                                class: 'session-list'
                            },
                            [...inputBox]
                        )
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose(action, instance, done) {
                        if (action === 'confirm') {
                            let tag = true;
                            for (const k in msgbox.data) {
                                if (
                                    Object.hasOwnProperty.call(msgbox.data, k)
                                ) {
                                    const value =
                                        msgbox.data[k]['value'].trim();
                                    const confirm = msgbox.confirm[k];
                                    if (value !== confirm) {
                                        tag = false;
                                    }
                                }
                            }
                            if (tag) {
                                Message({
                                    message: '开锁成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                done();
                            } else {
                                Message({
                                    message: '锁未打开，请重试',
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        } else {
                            done();
                        }
                    }
                });
            }
        },
        {
            content: '【男人】【梯子】【星星】【时间】',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '在一阵绿色诡异的光芒下，婴儿长大成为男人，木头被修建成为了梯子，男人爬上梯子摘下了星星，只留下了夜空，然后回到了属于自己的石块里将星星捧在手中。你试图将那个石块从石槽中拔出，石雕上的鱼怪发出雀跃的尖叫声。对的，你从它的声音中感觉到了兴奋激动的情绪。',
            next: '下一页',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content:
                '石块被拔出的一刹那整个石雕开始解体从你手中掉落，一块绿色的【陨石碎片】留了下来，它静静的躺在你手心散发着清凉的气息，可此刻极致的异样感环绕在你的心间，你望向手中的陨石碎片莫名的恐慌起来，仿佛石块上的男人就是你自己，你看着来回爬过的竖井楼梯陷入了寂静的沉思之中。',
            next: '完',
            class: ['center'],
            beforeNext: async () => {}
        },
        {
            content: '感谢你通过《雾海之下》故事的第一章节。',
            next: '',
            class: ['center'],
            beforeNext: async () => {}
        }
    ]
});
