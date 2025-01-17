const serverURL = "localhost://41080";
const debug = false;
const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/src/Resources/AModel/AModel/amodel.model3.json";
let indexLibrary = null;
let next_flag = 4;

let next_b_flag;
let re_flag = 2;
let  handleChat_flag;


Qualtrics.SurveyEngine.addOnload(function()
{
    /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/
    this.hideNextButton();

    const position = {
        boxWidth: 500,
        boxHeight: 700,
        modelScale: 0.13,
        modelX: 0,
        modelY: 300,
    };

    const requiredResources = [
        "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
        "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
        "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/dist/js/IndexLibrary.js",
    ];

    const loadScript = (idx) => {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if (idx + 1 < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    };

    const initExp = () => {
        //インスタンス作成＆DOMLoad操作
        console.log("ロード");
        indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
        indexLibrary.onload();
    };


    console.log("スクリプト読み込み");
    loadScript(0);

    // window.addEventListener("beforeunload", () => {
    //     console.log("アンロード");
    //     indexLibrary.onUnload();
    // });





});

Qualtrics.SurveyEngine.addOnReady(function()
{
    /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/
    //下一个按钮标志值初始化
    re_flag = re_flag - 1;
    next_b_flag = re_flag;
    var userGroups = Qualtrics.SurveyEngine.getEmbeddedData('userGroup');
    var userGroup = Number(userGroups);  // 或者 parseInt(userGroupStr)
    console.log("userGroup:", userGroup);

    //1
    if (userGroup === 1){

    // 埋め込みデータを取得
    var value1 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition1');
    var value2 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition2');
    var value3 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions1');
    var value4 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions2');

    var proposition = [
        value4 + "ことの社会への影響",
        value3 + "ことの社会への影響",
        value2 + "ことの自身への影響",
        value1 + "ことの自身への影響"
    ];
    var should_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('should_userAttitude');
    console.log("should_userAttitude:", should_userAttitude);
    var want_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('want_userAttitude');
    console.log("want_userAttitude:", want_userAttitude);

    var userAttitude = [
        should_userAttitude,
        should_userAttitude,
        want_userAttitude,
        want_userAttitude
    ];

        console.log("userAttitude:", userAttitude);
    }
    //2
    if (userGroup === 2){

        // 埋め込みデータを取得
        var value1 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition1');
        var value2 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition2');
        var value3 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions1');
        var value4 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions2');

        var proposition = [
            value4 + "ことの社会への影響",
            value3 + "ことの社会への影響",
            value2 + "ことの自身への影響",
            value1 + "ことの自身への影響"
        ];
        var should_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('should_userAttitude');
        console.log("should_userAttitude:", should_userAttitude);
        var want_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('want_userAttitude');
        console.log("want_userAttitude:", want_userAttitude);

        var userAttitude = [
            4,
            4,
            4,
            4

        ];

        console.log("userAttitude:", userAttitude);
    }
    //3
    if (userGroup === 3){

        var proposition = [
            "好きな食べ物",
            "好きなスポーツ",
            "好きな本や漫画",
            "旅行の思い出"
        ];
        var userAttitude = [
            5,
            5,
            5,
            5

        ];
    }
    //4
    if (userGroup === 4){

        // 埋め込みデータを取得
        var value1 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition1');
        var value2 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition2');
        var value3 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions1');
        var value4 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions2');

        var proposition = [
            value4 + "ことの社会への影響",
            value3 + "ことの社会への影響",
            value2 + "ことの自身への影響",
            value1 + "ことの自身への影響"
        ];
        var should_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('should_userAttitude');
        console.log("should_userAttitude:", should_userAttitude);
        var want_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('want_userAttitude');
        console.log("want_userAttitude:", want_userAttitude);

        var userAttitude = [
            Number(should_userAttitude)+6,
            Number(should_userAttitude)+6,
            Number(want_userAttitude)+6,
            Number(want_userAttitude)+6
        ];

        console.log("userAttitude:", userAttitude);
    }
    //5
    if (userGroup === 5){

        // 埋め込みデータを取得
        var value1 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition1');
        var value2 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition2');
        var value3 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions1');
        var value4 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions2');

        var proposition = [
            value4 + "ことの社会への影響",
            value3 + "ことの社会への影響",
            value2 + "ことの自身への影響",
            value1 + "ことの自身への影響"
        ];
        var should_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('should_userAttitude');
        console.log("should_userAttitude:", should_userAttitude);
        var want_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('want_userAttitude');
        console.log("want_userAttitude:", want_userAttitude);

        var userAttitude = [
            10,
            10,
            10,
            10

        ];

        console.log("userAttitude:", userAttitude);
    }



//等该初始化页面
    const agentFlag = document.getElementById('agent_visible_flag');
    const loader = document.querySelector('.loader');
    const overlayContents = document.getElementById('overlay_contents');
    const startButton = document.getElementById('start_button');
    const overlay = document.getElementById('overlay');
    const overlayWindow = document.getElementById('overlayWindow');

// 使用 MutationObserver 监听 DOM 变化
    if (agentFlag) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.textContent === '1') {
                    if (loader) loader.style.display = 'none';
                    if (overlayContents) overlayContents.style.visibility = 'visible';
                }
            });
        });

        // 配置观察选项
        observer.observe(agentFlag, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }

//显示当前主题和剩余对话
    function updateTopbar(text, number) {
        const topbarRight = document.getElementById('topbar-right');
        if (topbarRight) {
            topbarRight.textContent = text + "　残り" + number + "個";
        }
    }

// 开始按钮点击事件
    if (startButton) {
        startButton.addEventListener('click', function() {
            next_flag = next_flag - 1;
            if (overlay) overlay.style.display = 'none';
            if (overlayWindow) overlayWindow.style.display = 'none';
            indexLibrary.chatgpt_init(proposition[next_flag]);
            updateTopbar(proposition[next_flag],next_flag);
        });
    }

    /*********************************************************/
    function copyConversationToClipboard() {
        // 1. 获取所有聊天内容及时间
        const userMessages = document.querySelectorAll(".user-msg");
        const gptMessages = document.querySelectorAll(".chat-gpt-msg");

        let formattedConversation = '';

        // 遍历每个消息容器
        const allContainers = Array.prototype.slice.call(document.querySelectorAll(".chat-user, .chat-gpt-msg"));

        allContainers.forEach(function(container) {
            const time = container.querySelector(".time").innerHTML;

            if (container.querySelector(".copy-msg-USER")) {
                const text = container.querySelector(".copy-msg-USER").innerHTML;
                formattedConversation += 'user: ' + text + ' [' + time + ']\n';
            } else if (container.querySelector(".copy-msg-GPT")) {
                const text = container.querySelector(".copy-msg-GPT").innerHTML;
                formattedConversation += 'assistant: ' + text + ' [' + time + ']\n';
            }
        });

        // 获取并添加总经过时间
        const topbarLeft = document.getElementById('topbar-left');
        if (topbarLeft) {
            formattedConversation += '\n' + topbarLeft.innerHTML;
        }

        Qualtrics.SurveyEngine.setEmbeddedData('userChat', formattedConversation);
        var userChat = Qualtrics.SurveyEngine.getEmbeddedData('userChat');
        console.log(formattedConversation);
        console.log(userChat);
    }


    let lastMessageIndex = -1;  // 用于记录上次最后一条消息的位置
    function copyConversationToClipboard_2(next_flag) {
        const allContainers = Array.prototype.slice.call(document.querySelectorAll(".chat-user, .chat-gpt-msg"));
        let formattedConversation = '';
        let currentConversation = '';

        // 获取当前主题
        currentConversation += 'theme: ' + proposition[next_flag] + '\n\n';

        // 获取当前轮次的消息
        const currentRoundMessages = allContainers.filter((_, index) => {
            return lastMessageIndex === -1 || index > lastMessageIndex;
        });

        // 保存所有对话记录
        allContainers.forEach(container => {
            const time = container.querySelector(".time").innerHTML;
            if (container.querySelector(".copy-msg-USER")) {
                const text = container.querySelector(".copy-msg-USER").innerHTML;
                formattedConversation += 'user: ' + text + ' [' + time + ']\n';
            } else if (container.querySelector(".copy-msg-GPT")) {
                const text = container.querySelector(".copy-msg-GPT").innerHTML;
                formattedConversation += 'assistant: ' + text + ' [' + time + ']\n';
            }
        });

        // 添加总经过时间
        const topbarLeft = document.getElementById('topbar-left');
        if (topbarLeft) {
            formattedConversation += '\n' + topbarLeft.innerHTML;
        }

        // 处理当前轮次的消息
        if (currentRoundMessages.length > 0) {
            currentRoundMessages.forEach(container => {
                const time = container.querySelector(".time").innerHTML;
                if (container.querySelector(".copy-msg-USER")) {
                    const text = container.querySelector(".copy-msg-USER").innerHTML;
                    currentConversation += 'user: ' + text + ' [' + time + ']\n';
                } else if (container.querySelector(".copy-msg-GPT")) {
                    const text = container.querySelector(".copy-msg-GPT").innerHTML;
                    currentConversation += 'assistant: ' + text + ' [' + time + ']\n';
                }
            });

            try {
                // 获取第一条和最后一条消息的时间
                const firstTimeElement = currentRoundMessages[0].querySelector(".time");
                const lastTimeElement = currentRoundMessages[currentRoundMessages.length - 1].querySelector(".time");

                if (!firstTimeElement || !lastTimeElement) {
                    console.log('Time elements not found');
                    currentConversation += '\n対話時間: 0分0秒\n';
                    return;
                }

                const firstTime = firstTimeElement.innerHTML;
                const lastTime = lastTimeElement.innerHTML;

                // 调试信息
                console.log('First message time:', firstTime);
                console.log('Last message time:', lastTime);

                // 将时间字符串转换为秒数
                function timeToSeconds(timeStr) {
                    if (!timeStr || timeStr.trim() === '') {
                        console.log('Empty time string received');
                        return 0;
                    }
                    try {
                        const [hours, minutes, seconds] = timeStr.trim().split(':').map(Number);
                        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                            console.log('Invalid time format:', timeStr);
                            return 0;
                        }
                        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                        console.log(`Converting ${timeStr} to seconds: ${totalSeconds}`);
                        return totalSeconds;
                    } catch (error) {
                        console.log('Error parsing time:', timeStr, error);
                        return 0;
                    }
                }

                const startSeconds = timeToSeconds(firstTime);
                const endSeconds = timeToSeconds(lastTime);

                console.log('Start seconds:', startSeconds);
                console.log('End seconds:', endSeconds);

                // 计算时间差（秒）
                const totalSeconds = Math.abs(endSeconds - startSeconds); // 添加Math.abs确保正数

                console.log('Total seconds:', totalSeconds);

                // 转换为分和秒
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                console.log('Calculated minutes:', minutes);
                console.log('Calculated seconds:', seconds);

                // 确保数字显示在字符串中
                const formattedMinutes = String(minutes || 0);
                const formattedSeconds = String(seconds || 0);

                // 添加时间信息，确保使用formattedMinutes和formattedSeconds
                currentConversation += `\n対話時間:`+ formattedMinutes + `分` + formattedSeconds + `秒\n`;
            } catch (error) {
                console.error('Error calculating time:', error);
                currentConversation += '\n対話時間: 計算エラー\n';
            }

            // 更新最后消息位置
            lastMessageIndex = allContainers.length - 1;
        }

        var RoundChat = 'RoundChat_' + next_flag;
        Qualtrics.SurveyEngine.setEmbeddedData('userChat', formattedConversation);
        Qualtrics.SurveyEngine.setEmbeddedData(RoundChat, currentConversation);
        console.log('All conversations:', formattedConversation);
        console.log('Current round:', currentConversation);
        console.log('RoundChat:', RoundChat);
    }

    /*添加聊天内容*/
// 1. User Toggle

    const img = document.querySelector('.chat-input img');
    const sysTime = document.querySelector('.topbar-left');
    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    sysTime.innerHTML = currentTime;


// 2. Send Message Function

    const btn = document.querySelector('#btn');
    const txt = document.querySelector('#txt');

// btn.addEventListener('click', () => {
//     indexLibrary.handleChat(3,'放射性廃棄物の長期管理が将来の世代に大きな負担を残す可能性が増す');
// });

//按键发送
    if (btn) {
        btn.addEventListener('click', () => {
            handleChat_flag = indexLibrary.checkReplyStatus();
            if (!txt.value.trim() || handleChat_flag === 0) {  // 检查输入是否为空
                // 添加红色边框
                txt.style.border = '2px solid red ';

                // 300ms后恢复原样
                setTimeout(() => {
                    txt.style.border = '';
                }, 300);

                return;  // 如果输入为空，不执行后续操作
            }

            indexLibrary.updateNextButtonVisibility(0);// 隐藏但保留空间// 禁止点击

            // 输入不为空时执行原有操作
            indexLibrary.handleChat(userAttitude[next_flag], proposition[next_flag]);
            console.log('userAttitude',userAttitude[next_flag]);
            console.log('proposition',proposition[next_flag]);

            if(next_flag > -1 && next_b_flag === 0) {
                console.log("显示了",next_b_flag,next_flag,handleChat_flag);
                indexLibrary.updateNextButtonVisibility(1);    // 显示按钮// 允许点击
            }
            else {
                next_b_flag = next_b_flag - 1;
                indexLibrary.updateNextButtonVisibility(0);     // 隐藏但保留空间// 禁止点击
            }
        });
    }

//下一个按钮
    const next = document.getElementById("next1");
    next.style.visibility = 'hidden';     // 隐藏但保留空间
    next.style.pointerEvents = 'none';    // 禁止点击
    next.addEventListener("click",event => {

        next_b_flag = re_flag;//初始化按键标志值

        next.style.visibility = 'hidden';     // 隐藏但保留空间
        next.style.pointerEvents = 'none';    // 禁止点击

        copyConversationToClipboard_2(next_flag);

        next_flag = next_flag - 1;

        if(next_flag > 0){
            indexLibrary.chatgpt_init(proposition[next_flag]);
            console.log('12312312312',proposition[next_flag]);
            updateTopbar(proposition[next_flag],next_flag);
        }
        else
        {
            indexLibrary.chatgpt_init(proposition[next_flag]);
            console.log('12312312312',proposition[next_flag]);
            updateTopbar(proposition[next_flag],next_flag);
            document.getElementById('next1').textContent = '会話終了';

            if(next_flag == -1){
                updateTopbar("読み込み中...",0);
                copyConversationToClipboard();
                this.clickNextButton();
            }
        }

    })

//
//正计时
    let startTime = new Date().getTime();  // 获取当前时间作为开始时间
    function timingTime(){
        let currentTime = new Date().getTime()
        let difference = currentTime - startTime
        let m =  Math.floor(difference / (1000))
        let mm = m % 60  // 秒
        let f = Math.floor(m / 60)
        let ff = f % 60 // 分钟
        let s = Math.floor(f/ 60) // 小时
        let ss = s % 24
        //let day = Math.floor(s  / 24 ) // 天数
        //return day + "天" + ss + "时" + ff + "分" + mm +'秒'

        return "経過時間：" + ss + ":" + ff + ":" + mm
    }
    setInterval(()=>{
        document.getElementById('topbar-left').innerHTML = timingTime()
    },1000);

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/

    clearInterval(setInterval);
});