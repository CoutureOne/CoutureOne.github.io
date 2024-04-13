(function () {
    const lng = '120.3246545611'; // 经度
    const lat = '30.26454515454'; // 纬度
    let ipStore = saveToLocal.get('location');

    (async function () {
        if (!ipStore) {
            await fetch(`https://api.qjqq.cn/api/Local`)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) { // 根据实际API返回修改
                        ipStore = data;
                        saveToLocal.set('location', ipStore, 1); // 保存位置信息1小时
                        showWelcome(); // 调用显示欢迎信息的函数
                    }
                })
                .catch(err => console.log(err));
        }
    })()

    function getDistance(e1, n1, e2, n2) {
        const R = 6371
        const {sin, cos, asin, PI, hypot} = Math

        let getPoint = (e, n) => {
            e *= PI / 180
            n *= PI / 180
            return {x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n)}
        }

        let a = getPoint(e1, n1)
        let b = getPoint(e2, n2)
        let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
        let r = asin(c / 2) * 2 * R
        return Math.round(r);
    }

    function showWelcome() {
        let dist = getDistance(lng, lat, ipStore.data.lng, ipStore.data.lat); //这里换成自己的经纬度
        let pos = ipStore.data.continent;
        let ip = ipStore.data.ip || "未知";
        let posdesc;
        //根据国家、省份、城市信息自定义欢迎语
        switch (ipStore.data.country) {
            case "日本":
                posdesc = "よろしく，一起去看樱花吗";
                break;
            case "美国":
                posdesc = "Let us live in peace!";
                break;
            case "英国":
                posdesc = "想同你一起夜乘伦敦眼";
                break;
            case "俄罗斯":
                posdesc = "干了这瓶伏特加！";
                break;
            case "法国":
                posdesc = "C'est La Vie";
                break;
            case "德国":
                posdesc = "Die Zeit verging im Fluge.";
                break;
            case "澳大利亚":
                posdesc = "一起去大堡礁吧！";
                break;
            case "加拿大":
                posdesc = "拾起一片枫叶赠予你";
                break;
            case "中国":
                pos = ipStore.data.prov + " " + ipStore.data.city + " " + ipStore.data.district;
                switch (ipStore.data.prov) {
                    case "北京市":
                        posdesc = "北——京——欢迎你~~~";
                        break;
                    case "天津市":
                        posdesc = "讲段相声吧";
                        break;
                    case "河北省":
                        posdesc = "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山";
                        break;
                    case "山西省":
                        posdesc = "展开坐具长三尺，已占山河五百余";
                        break;
                    case "内蒙古自治区":
                        posdesc = "天苍苍，野茫茫，风吹草低见牛羊";
                        break;
                    case "辽宁省":
                        posdesc = "我想吃烤鸡架！";
                        break;
                    case "吉林省":
                        posdesc = "状元阁就是东北烧烤之王";
                        break;
                    case "黑龙江省":
                        posdesc = "很喜欢哈尔滨大剧院";
                        break;
                    case "上海市":
                        posdesc = "众所周知，中国只有两个城市";
                        break;
                    case "江苏省":
                        switch (ipStore.data.city) {
                            case "南京市":
                                posdesc = "这是我挺想去的城市啦";
                                break;
                            case "苏州市":
                                posdesc = "上有天堂，下有苏杭";
                                break;
                            default:
                                posdesc = "散装是必须要散装的";
                                break;
                        }
                        break;
                    case "浙江省":
                        switch (ipStore.data.city) {
                            case "杭州市":
                                posdesc = "东风渐绿西湖柳，雁已还人未南归";
                                break;
                            case "宁波市":
                                posdesc = "风摇野帻去复去，雨浥乳窦深复深";
                                break;
                            default:
                                posdesc = "人尽说江南好，游人只合江南老";
                                break;
                        }
                        break;
                    case "河南省":
                        switch (ipStore.data.city) {
                            case "郑州市":
                                posdesc = "豫州之域，天地之中";
                                break;
                            case "南阳市":
                                posdesc = "臣本布衣，躬耕于南阳此南阳非彼南阳！";
                                break;
                            case "驻马店市":
                                posdesc = "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！";
                                break;
                            case "开封市":
                                posdesc = "刚正不阿包青天";
                                break;
                            case "洛阳市":
                                posdesc = "洛阳牡丹甲天下";
                                break;
                            default:
                                posdesc = "可否带我品尝河南烩面啦？";
                                break;
                        }
                        break;
                    case "安徽省":
                        posdesc = "蚌埠住了，芜湖起飞";
                        break;
                    case "福建省":
                        posdesc = "井邑白云间，岩城远带山";
                        break;
                    case "江西省":
                        posdesc = "落霞与孤鹜齐飞，秋水共长天一色";
                        break;
                    case "山东省":
                        posdesc = "遥望齐州九点烟，一泓海水杯中泻";
                        break;
                    case "湖北省":
                        switch (ipStore.data.city) {
                            case "黄冈市":
                                posdesc = "红安将军县！辈出将才！";
                                break;
                            default:
                                posdesc = "来碗热干面~";
                                break;
                        }
                        break;
                    case "湖南省":
                        switch (ipStore.data.city) {
                            case "长沙市":
                                posdesc = "长沙斯塔克";
                                break;
                            case "岳阳市":
                                posdesc = "岳阳楼记";
                                break;
                            case "衡阳市":
                                posdesc = "大美雁城欢迎您！";
                                switch (ipStore.data.district) {
                                    case "南岳区":
                                        posdesc = "南岳衡山，五岳之首";
                                        break;
                                    case "耒阳市":
                                        posdesc = "千年纸都欢迎您！";
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            default:
                                posdesc = "湖南人民好客，欢迎来湖南旅游";
                                break;
                        }
                        break;
                    case "广东省":
                        switch (ipStore.data.city) {
                            case "广州市":
                                posdesc = "看小蛮腰，喝早茶了嘛~";
                                break;
                            case "深圳市":
                                switch (ipStore.data.district) {
                                    case "坪山区":
                                        posdesc = "好巧！博主也在坪山区生活喔~";
                                        break;
                                    default:
                                        posdesc = "今天你996了嘛~";
                                        break;
                                }
                                break;
                            case "阳江市":
                                posdesc = "阳春合水！博主家乡~ 欢迎来玩~";
                                break;
                            default:
                                posdesc = "来两斤福建人~";
                                break;
                        }
                        break;
                    case "广西壮族自治区":
                        posdesc = "桂林山水甲天下";
                        break;
                    case "海南省":
                        posdesc = "朝观日出逐白浪，夕看云起收霞光";
                        break;
                    case "四川省":
                        posdesc = "康康川妹子";
                        break;
                    case "贵州省":
                        posdesc = "茅台，学生，再塞200";
                        break;
                    case "云南省":
                        posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天";
                        break;
                    case "西藏自治区":
                        posdesc = "躺在茫茫草原上，仰望蓝天";
                        break;
                    case "陕西省":
                        posdesc = "来份臊子面加馍";
                        break;
                    case "甘肃省":
                        posdesc = "羌笛何须怨杨柳，春风不度玉门关";
                        break;
                    case "青海省":
                        posdesc = "牛肉干和老酸奶都好好吃";
                        break;
                    case "宁夏回族自治区":
                        posdesc = "大漠孤烟直，长河落日圆";
                        break;
                    case "新疆维吾尔自治区":
                        posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风";
                        break;
                    case "台湾省":
                        posdesc = "我在这头，大陆在那头";
                        break;
                    case "香港特别行政区":
                        posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉";
                        break;
                    case "澳门特别行政区":
                        posdesc = "性感荷官，在线发牌";
                        break;
                    default:
                        posdesc = "带我去你的城市逛逛吧！";
                        break;
                }
                break;
            default:
                posdesc = "带我去你的国家逛逛吧";
                break;
        }

        let timeChange;
        let date = new Date();
        if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span class='welcome-time'>🌤️ 早上好，一日之计在于晨</span>";
        else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span class='welcome-time'>☀️ 中午好，记得午休喔~</span>";
        else if (date.getHours() >= 13 && date.getHours() < 17) timeChange = "<span class='welcome-time'>🕞 下午好，饮茶先啦！</span>";
        else if (date.getHours() >= 17 && date.getHours() < 19) timeChange = "<span class='welcome-time'>🚶‍♂️ 即将下班，记得按时吃饭~</span>";
        else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span class='welcome-time'>🌙 晚上好，夜生活嗨起来！</span>";
        else timeChange = "<span class='welcome-time'>夜深了，早点休息，少熬夜</span>";

        document.getElementById("welcome-info").innerHTML =
            `<span>热烈欢迎来自~</span><br><b>${pos}</b> 的朋友</span><br><b>${posdesc}</b><br>您当前位置距博主约 <b>${dist}</b> 公里！<br><span>您的IP地址为：<b class="ip">${ip}</b></span><br>${timeChange}`;
    }

    const isWelcome = () => document.getElementById("welcome-info") && showWelcome();

    isWelcome();
    document.addEventListener('pjax:complete', isWelcome);
})();


// 那年今日
(function() {
    async function fetchHistoryData() {
        const myDate = new Date();
        const myMonth = myDate.getMonth() + 1;
        const getDate = myDate.getDate();
        const getMonth = myMonth < 10 ? "0" + myMonth : "" + myMonth;
        const getDay = getDate < 10 ? "0" + getDate : "" + getDate;
        const getMonthDate = "S" + getMonth + getDay;
        const history_data_url = `https://fastly.jsdelivr.net/gh/Zfour/Butterfly-card-history@2.08/baiduhistory/json/${getMonth}.json`;

        const response = await fetch(history_data_url);
        const data = await response.json();
        return data[getMonthDate];
    }

    function append(parent, text) {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const frag = document.createDocumentFragment();
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        parent.appendChild(frag);
    }

    function card_history() {
        if (document.getElementById('history-container')) {
            fetchHistoryData().then(data => {
                const html_item = data.map(item => `
        <div class="swiper-slide history_slide">
            <span class="history_slide_time">A.D.${item.year}</span>
            <span class="history_slide_link">${item.title}</span>
        </div>
        `).join('');
                const history_container_wrapper = document.getElementById('history_container_wrapper');
                append(history_container_wrapper, html_item);
                const swiper_history = new Swiper('.history_swiper-container', {
                    passiveListeners: true,
                    spaceBetween: 30,
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 30,
                        slideShadows: false,
                    },
                    loop: true,
                    direction: 'vertical',
                    autoplay: {
                        disableOnInteraction: true,
                        delay: 5000
                    },
                    mousewheel: false,
                });
                const history_container = document.getElementById('history-container');
                history_container.onmouseenter = function () {
                    swiper_history.autoplay.stop();
                };
                history_container.onmouseleave = function () {
                    swiper_history.autoplay.start();
                }
            });
        }
    }

    card_history();

    document.addEventListener('pjax:complete', card_history);
})();



