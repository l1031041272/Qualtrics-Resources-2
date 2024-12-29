const serverURL = "localhost://41080";
const debug = false;
const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/src/Resources/AModel/AModel/amodel.model3.json";
let indexLibrary = null;
let next_flag = 4;


Qualtrics.SurveyEngine.addOnload(function()
{
    /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/


    const position = {
        boxWidth: 300,
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

    // 埋め込みデータを取得
    var value1 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition1');
    var value2 = Qualtrics.SurveyEngine.getEmbeddedData('want_proposition2');
    var value3 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions1');
    var value4 = Qualtrics.SurveyEngine.getEmbeddedData('should_propositions2');

    var proposition = [
        "对社会" + value4,
        "对社会" + value3,
        "对自身" + value2,
        "对自身" + value1
    ];
    var should_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('should_userAttitude');
    console.log("should_userAttitude:", should_userAttitude);
    var want_userAttitude = Qualtrics.SurveyEngine.getEmbeddedData('want_userAttitude');
    console.log("want_userAttitude:", want_userAttitude);

    var userAttitude = [
        want_userAttitude,
        want_userAttitude,
        should_userAttitude,
        should_userAttitude
    ];

    console.log("userAttitude:", userAttitude);

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
            topbarRight.textContent = "当" + text + "　残り" + number + "個";
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
            if (!txt.value.trim()) {  // 检查输入是否为空
                // 添加红色边框
                txt.style.border = '2px solid red';

                // 300ms后恢复原样
                setTimeout(() => {
                    txt.style.border = '';
                }, 300);

                return;  // 如果输入为空，不执行后续操作
            }

            // 输入不为空时执行原有操作
            indexLibrary.handleChat(userAttitude[next_flag], proposition[next_flag]);
            console.log('userAttitude',userAttitude[next_flag]);
            console.log('proposition',proposition[next_flag]);

            if(next_flag > 0) {
                next.style.visibility = 'visible';    // 显示按钮
                next.style.pointerEvents = 'auto';    // 允许点击
            }
            else {
                next.style.visibility = 'hidden';     // 隐藏但保留空间
                next.style.pointerEvents = 'none';    // 禁止点击
            }
        });
    }
//原来按键复制内容
    function copyConversationToClipboard() {
        // 1. 获取所有聊天内容段落
        const allParagraphs = document.querySelectorAll("p.copy-msg-USER, p.copy-msg-GPT");

        // 创建格式化的对话字符串
        let formattedConversation = '';
        allParagraphs.forEach(paragraph => {
            if (paragraph.classList.contains("copy-msg-USER")) {
                formattedConversation += `user: ${paragraph.innerText}\n`;
            } else if (paragraph.classList.contains("copy-msg-GPT")) {
                formattedConversation += `assistant: ${paragraph.innerText}\n`;
            }
        });

        console.log(formattedConversation);  // 打印格式化后的对话
    }

    const copy = document.getElementById("git_copy");
    copy.addEventListener("click",event => {

        copyConversationToClipboard();
    })

//测试用字符串，正式删掉

//下一个按钮
    const next = document.getElementById("next1");
    next.style.visibility = 'hidden';     // 隐藏但保留空间
    next.style.pointerEvents = 'none';    // 禁止点击
    next.addEventListener("click",event => {

        next.style.visibility = 'hidden';     // 隐藏但保留空间
        next.style.pointerEvents = 'none';    // 禁止点击

        next_flag = next_flag - 1;

        if(next_flag > 0){
            indexLibrary.chatgpt_init(proposition[next_flag]);
            console.log('12312312312',proposition);
            updateTopbar(proposition[next_flag],next_flag);
        }
        else
        {
            updateTopbar("当前对话结束后，前往下一页",next_flag);
        }

        //indexLibrary.App_set_motion(1);//动作还没有设计好，设计好后去amodel.model3.json修改分组和路径
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