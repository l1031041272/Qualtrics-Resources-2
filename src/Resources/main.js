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
const position = {
    boxWidth: 300,
    boxHeight: 700,
    modelScale: 0.13,
    modelX: 0,
    modelY: 300,
};
let indexLibrary = null;

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // indexLibrary.addEventListener("finish", () => {
        //     console.log("リスナー");
        //     console.log(myLibrary.getResult());
        // });

        // myLibrary.onload();
    },
    false
);

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

//-
//indexLibrary.reset_face();

//注释的setExpression2和3是指定表情的代码，使用时需要将下面两个函数和html中的控件注释取消
// setExpression2();
// setExpression3();
window.addEventListener("beforeunload",()=>{
    console.log("アンロード");
    indexLibrary.onUnload();
});
// function setExpression2(){
//     var button = document.getElementById("setExpression2");
//     button.onclick = () =>{indexLibrary.App_set_point(0)}
// }
// function setExpression3(){
//     var button = document.getElementById("setExpression3");
//     button.onclick = () =>{indexLibrary.App_set_motion(1)}
// }
function  initExpression() {
    indexLibrary.App_set_point(0)
    //speechRrcognizer();语音识别，不使用
    console.log("233");
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
/*
img.addEventListener('click', () => {
    img.src = img.src.includes('user1')
        ? './images/user2.jpg'
        : './images/user1.jpg';
});

 */

// 2. Send Message Function

const btn = document.querySelector('#btn');
const txt = document.querySelector('#txt');

const sendMsg = () => {
    const value = txt.value;

    var imageURL = "https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtfANS2yqAu3-05_V4OsjOGgKF4E7a2slBvY0Wz0rw%3Ds96-c&w=48&q=75";

    const chatHtml = `<div class="chat-user user1">
      <div class="user-img">
        <img src="${imageURL}" alt="" />
      </div>
      <div class="user-msg">
        <p>${value}</p>
        <span class="time">${currentTime}</span>
      </div>
    </div>`;

    const chats = document.querySelector('.chats');
    const chatPage = document.querySelector('.chat-page');

    if (value !== '') {
        chats.innerHTML += chatHtml;
        txt.value = '';
        txt.focus();

        // Auto Scroll to Page Bottom
        chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
    }
};
const backMsg = () => {
    var imageURL = "data:image/png;base64,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";

    const chatHtml = `<div class="chat-user user2">
      <div class="user-img">
        <img src="${imageURL}" alt="" />
      </div>
      <div class="user-msg">
        <p id="chatgpt">メッセージは受け取りました。</p>
        <span class="time">${currentTime}</span>
      </div>
    </div>`;

    const chats = document.querySelector('.chats');
    const chatPage = document.querySelector('.chat-page');

    chats.innerHTML += chatHtml;
    chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
    indexLibrary.App_set_motion(1);
    /*
    if (value !== '') {
        chats.innerHTML += chatHtml;
        txt.value = '';
        txt.focus();

        // Auto Scroll to Page Bottom
        chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
    }*/
};
btn.addEventListener('click', () => {
    indexLibrary.handleChat(3,'放射性廃棄物の長期管理が将来の世代に大きな負担を残す可能性が増す');
    //indexLibrary.copyConversationToClipboard(5);
});

// Send Message upon Pressing Enter

// txt.addEventListener('keydown', (e) => {
//     if (e.keyCode === 13) {
//         // Enter's keyCode is 13
//         indexLibrary.chatgpt_reply();
//         indexLibrary.sendMsg();
//         //backMsg();
//     }
// });

// txt.addEventListener('keydown', (e) => {
//     if (e.keyCode === 13) { // Enter 键
//     indexLibrary.handleChat();
//     }
// });

const start1 = document.getElementById("start1");
start1.addEventListener("click",event => {
    //speechRrcognizer();
    //ready();
    //indexLibrary.chatgpt_init()
    console.log("验证");
    indexLibrary.assistant_init();
})

// 封装函数
function copyConversationToClipboard(promptIndex) {
    // 1. 获取所有聊天内容段落

    const allParagraphs = document.querySelectorAll("p.copy-msg-USER, p.copy-msg-GPT");

    // 2. 转成 ChatCompletion 所需的 {role, content} 格式
    let conversation = [];
    allParagraphs.forEach(paragraph => {
        if (paragraph.classList.contains("copy-msg-USER")) {
            conversation.push({ role: "user", content: paragraph.innerText });
        } else if (paragraph.classList.contains("copy-msg-GPT")) {
            conversation.push({ role: "assistant", content: paragraph.innerText });
        }
    });

    // 3. 只保留最近 6 条 (user/assistant) 对话（可选逻辑）
    if (conversation.length > 6) {
        conversation.splice(0, conversation.length - 6);
    }

    // 4. 定义若干 System Prompt，并根据传入的索引选择
    const prompts = [
        "我是第1个 system Prompt：请用幽默的方式回答问题。",
        "我是第2个 system Prompt：请用简洁明了的方式回答问题。",
        "我是第3个 system Prompt：你是一名专业日语翻译。",
        "我是第4个 system Prompt：你是一名资深研究员，请给出严谨回答。",
        "我是第5个 system Prompt：请把所有回答都改写成诗歌形式。"
    ];

    // 验证 promptIndex 是否在合理范围
    let systemPromptContent = "";
    if (promptIndex >= 1 && promptIndex <= 5) {
        systemPromptContent = prompts[promptIndex - 1];
    } else {
        systemPromptContent = "（未选择有效Prompt，使用默认System提示）";
    }

    // 5. 在最前面插入 system 消息
    //    这样后续 user / assistant 的消息就会在 system 之后
    const systemMessage = {
        role: "system",
        content: systemPromptContent
    };

    // 组合最终 messages：先 system，再已有对话
    const finalMessages = [systemMessage, ...conversation];

    // 6. 构造完整的请求数据
    const finalPayload = {
        model: "gpt-3.5-turbo",
        messages: finalMessages
    };

    // 7. 转成 JSON 并输出到控制台
    const conversationJSON = JSON.stringify(finalPayload, null, 2);
    console.log("=== Final JSON to send API ===\n", conversationJSON);

    // 8. 复制到剪贴板
    navigator.clipboard.writeText(conversationJSON)
        .then(() => {
            console.log("已复制到剪贴板！");
        })
        .catch(err => {
            console.error("复制失败:", err);
        });
}

// 给按钮绑定点击事件，点击后执行拷贝逻辑
const copyBtn = document.getElementById("git_copy");
copyBtn.addEventListener("click", () => {
    copyConversationToClipboard(3);
});
//原来按键复制内容
// const copy = document.getElementById("git_copy");
// copy.addEventListener("click",event => {
//     var tesst = document.querySelectorAll("p.copy-msg");
//     var i;
//     for (i = 0; i < tesst.length; i++) {
//         console.log(tesst[i].innerText);
//     }
// })

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


// //倒计时
//
// //let endTime = new Date().getTime() + 60 * 60 * 1000;  // 1小时后的时间
// //let endTime = new Date().getTime() + 10 * 60 * 1000;  // 10分钟的时间
// let endTime = new Date().getTime() + 10 * 1000;  // 10秒钟的时间
//
// function countdownTime() {
//     let currentTime = new Date().getTime();
//     let difference = endTime - currentTime;
//
//     if (difference < 0) {
//         return "倒计时已结束";
//     }
//
//     let m = Math.floor(difference / 1000);
//     let mm = m % 60; // 秒
//     let f = Math.floor(m / 60);
//     let ff = f % 60; // 分钟
//     let s = Math.floor(f / 60); // 小时
//     let ss = s % 24;
//     //let day = Math.floor(s / 24); // 天数
//     //return day + "天" + ss + "时" + ff + "分" + mm + '秒';
//     return "剩余" + ss + "时" + ff + "分" + mm + '秒';
// }
//
// setInterval(() => {
//     document.getElementById('topbar-left').innerHTML = countdownTime();
// }, 1000);


/*语音识别相关代码
function speechRrcognizer() {
    const speech = document.getElementById("mic");
    const speaking = document.getElementsByClassName("wrapper")[0];
    const speaking_list = document.getElementsByClassName("wrapper");
    const input = document.getElementById("txt");
    let listening = false;
    console.log("111111");
    //const sdk = require("microsoft-cognitiveservices-speech-sdk");
    //const speechConfig = sdk.SpeechConfig.fromSubscription("1a8f85cd7b0142288537ac7b35cc2cde", "japaneast");
    //const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    //speechConfig.speechRecognitionLanguage = "ja-JP";

    //const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // const speechRecognizer =indexLibrary.speech_init();
    //
    // speechRecognizer.recognized = (s, e) => {
    //     console.log(e.result.text);
    // };
    console.log("IN SPEECH");
    const speechRecognizer = indexLibrary.speech_init();
    speechRecognizer.recognized = (s, e) => {
        console.log(e.result.text);
        const txt_undefined = "undefined";
        // console.log(speaking);
        if(speaking.classList.contains("speaking")){
            input.value += e.result.text;
        }
    }
    const stop = () => {
        speaking.classList.remove("speaking");
        console.log(speaking.classList.contains("speaking"));
        //indexLibrary.speech_stop();
        speechRecognizer.stopContinuousRecognitionAsync();
        console.log("stop");
    };

    const start = () => {
        speaking.classList.add("speaking");
        console.log(speaking.classList.contains("speaking"));
        //indexLibrary.speech_start();
        speechRecognizer.startContinuousRecognitionAsync();
        //indexLibrary.speech_result();
        console.log("start");
    };

    speech.addEventListener("click",event =>{
        listening? stop(): start();
        listening = !listening;
    });

    ready();
};
*/


//CHAT GPT代码

//const API_KEY = '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';
//const URL = "https://api.openai.com/v1/chat/completions";





//-----------------------------------------------------------------------------------------------------------备份--------------------------------------------------------------------------------------------------//
// function reply() {
//     var textgpt = document.getElementById("txt").value;
//     console.log(textgpt);
//     async function getResponse() {
//         try {
//             const response = await axios.post(
//                 URL,
//                 {
//                     "model": "gpt-3.5-turbo",
//                     "messages": [
//                         //{ "role": "system", "content": "现在由于新冠病毒毒性减弱，日本已经不会强制民众戴口罩出行，我想让你扮演医疗顾问的角色，对不愿意在出行时戴口罩的用户进行说服，使用户知道带口罩的重要性。对于愿意在出行中带口罩的用户，您可以保持赞同和表扬，并探讨带口罩的重要性。并且，请只是用一段话输出你的观点，输出字数尽量少。但是当用户讨论话题和健康咨询无关时，要提醒他不要跑题。" },
//                         { "role": "system", "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese." },
//                         { "role": "system", "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. " },
//                         { "role": "user", "content": textgpt }
//                     ]
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${API_KEY}`,
//                     },
//                 }
//             );
//             var chatgpt_response = response.data.choices[0].message.content;
//             console.log(response);
//             $("#response_text").val(chatgpt_response);
//             backMsg();
//             // var paragraphs = document.getElementsByTagName("p");
//             // var lastParagraph = paragraphs[paragraphs.length - 1];
//             // lastParagraph.textContent = chatgpt_response;
//
//             var paragraphs = document.querySelectorAll("p#chatgpt");
//             var lastParagraph = paragraphs[paragraphs.length - 1];
//             lastParagraph.textContent = chatgpt_response;
//
//
//             console.log(lastParagraph);
//
//             console.log(chatgpt_response);
//
//             const chatPage = document.querySelector('.chat-page');
//             chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
//
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     getResponse();
// }
//
// function ready() {
//     async function ready_getResponse() {
//         try {
//             const response = await axios.post(
//                 URL,
//                 {
//                     "model": "gpt-3.5-turbo",
//                     "messages": [
//                         //{ "role": "system", "content": "现在由于新冠病毒毒性减弱，日本已经不会强制民众戴口罩出行，我想让你扮演医疗顾问的角色，对不愿意在出行时戴口罩的用户进行说服，使用户知道带口罩的重要性。对于愿意在出行中带口罩的用户，您可以保持赞同和表扬，并探讨带口罩的重要性。并且，请只是用一段话输出你的观点，输出字数尽量少。但是当用户讨论话题和健康咨询无关时，要提醒他不要跑题。" },
//                         { "role": "system", "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese." },
//                         { "role": "system", "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. " },
//                         { "role": "user", "content": "こんにちは" }
//                     ]
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${API_KEY}`,
//                     },
//                 }
//             );
//             var chatgpt_response = response.data.choices[0].message.content;
//             console.log(response);
//             $("#response_text").val(chatgpt_response);
//             backMsg();
//             // var paragraphs = document.getElementsByTagName("p");
//             // var lastParagraph = paragraphs[paragraphs.length - 1];
//             // lastParagraph.textContent = chatgpt_response;
//
//             var paragraphs = document.querySelectorAll("p#chatgpt");
//             var lastParagraph = paragraphs[paragraphs.length - 1];
//             lastParagraph.textContent = chatgpt_response;
//
//
//             console.log(lastParagraph);
//
//             console.log(chatgpt_response);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     ready_getResponse();
// }
//-----------------------------------------------------------------------------------------------------------备份--------------------------------------------------------------------------------------------------//

// function reply() {
//     var textgpt = document.getElementById("txt").value;
//     console.log(textgpt);
//
//     // 封装异步操作为Promise
//     function getResponse() {
//         return new Promise((resolve, reject) => {
//             axios.post(
//                 URL,
//                 {
//                     "model": "gpt-3.5-turbo",
//                     "messages": [
//                         { "role": "system", "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese." },
//                         { "role": "system", "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. " },
//                         { "role": "user", "content": textgpt }
//                     ]
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${API_KEY}`,
//                     },
//                 }
//             )
//                 .then(response => resolve(response.data.choices[0].message.content))
//                 .catch(error => reject(error));
//         });
//     }
//
//     // 调用Promise并处理结果
//     getResponse()
//         .then(chatgpt_response => {
//             $("#response_text").val(chatgpt_response);
//             backMsg();
//             var paragraphs = document.querySelectorAll("p#chatgpt");
//             var lastParagraph = paragraphs[paragraphs.length - 1];
//             lastParagraph.textContent = chatgpt_response;
//             console.log(lastParagraph);
//             console.log(chatgpt_response);
//             const chatPage = document.querySelector('.chat-page');
//             chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
//         })
//         .catch(error => console.log(error));
// }
//
// function ready() {
//     // 封装异步操作为Promise
//     function ready_getResponse() {
//         return new Promise((resolve, reject) => {
//             axios.post(
//                 URL,
//                 {
//                     "model": "gpt-3.5-turbo",
//                     "messages": [
//                         { "role": "system", "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese." },
//                         { "role": "system", "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. " },
//                         { "role": "user", "content": "こんにちは" }
//                     ]
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${API_KEY}`,
//                     },
//                 }
//             )
//                 .then(response => resolve(response.data.choices[0].message.content))
//                 .catch(error => reject(error));
//         });
//     }
//
//     // 调用Promise并处理结果
//     ready_getResponse()
//         .then(chatgpt_response => {
//             $("#response_text").val(chatgpt_response);
//             backMsg();
//             var paragraphs = document.querySelectorAll("p#chatgpt");
//             var lastParagraph = paragraphs[paragraphs.length - 1];
//             lastParagraph.textContent = chatgpt_response;
//             console.log(lastParagraph);
//             console.log(chatgpt_response);
//         })
//         .catch(error => console.log(error));
// }