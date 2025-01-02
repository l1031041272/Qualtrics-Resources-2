//http://localhost:40080
//http://192.168.3.10:40080

const serverURL = "http://localhost:50021";
const debug = false;
//const modelPath = "/Resources/Hiyori_2/Hiyori.model3.json";
const modelPath = "/Resources/AModel/AModel/amodel.model3.json";
// 添加状态标记

//550, 900, 0.235, 0, -20 モデル全身/
//550, 700, 0.45, 0, 500 モデル顔中心
//225, 350, 0.25, 0, 250
//550, 700, 0.15, 0, 500
//300, 700, 0.13, 0, 300
const position = {
    boxWidth: 360,
    boxHeight: 700,
    modelScale: 0.13,
    modelX: 0,
    modelY: 300,
};
let indexLibrary = null;
let next_flag = 4;

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
        topbarRight.textContent = `当前${text}　残り${number}個`;
    }
}

// 开始按钮点击事件
startButton?.addEventListener('click', function() {
    next_flag = next_flag - 1;
    if (overlay) overlay.style.display = 'none';
    if (overlayWindow) overlayWindow.style.display = 'none';
    indexLibrary.chatgpt_init('原子力発電所の再稼働によって、事故発生時に壊滅的な影響を及ぼすリスクが高まる');
    updateTopbar("ABCABCABC",next_flag);
});

//--- cubism SDK 初期化
window.addEventListener(
    "load",
    () => {
        console.log("ロード");
        indexLibrary = new IndexLibrary(debug,serverURL,modelPath,position);
        indexLibrary.onload();
        console.log("main.js");

    },
    false
);

window.addEventListener("beforeunload",()=>{
    console.log("アンロード");
    indexLibrary.onUnload();
});

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
btn?.addEventListener('click', () => {
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
    indexLibrary.handleChat(10, '雇用機会が創出される');

    if(next_flag > 0) {
        next.style.visibility = 'visible';    // 显示按钮
        next.style.pointerEvents = 'auto';    // 允许点击
    }
    else {
        next.style.visibility = 'hidden';     // 隐藏但保留空间
        next.style.pointerEvents = 'none';    // 禁止点击
    }
});
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
        indexLibrary.chatgpt_init('事故発生時に壊滅的な影響を及ぼすリスクが高まる');
        console.log('12312312312',next_flag);
        updateTopbar("CDECDECDE",next_flag);
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