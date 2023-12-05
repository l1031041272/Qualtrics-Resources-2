{
    const serverURL = "localhost://41080";
    const debug = false;
    const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/src/Resources/AModel/AModel/amodel.model3.json";
    let indexLibrary = null;
    Qualtrics.SurveyEngine.addOnload(function () {
        /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/
//http://localhost:40080
//http://192.168.3.10:40080
        //const serverURL = "http://localhost:50021";


//550, 900, 0.235, 0, -20 モデル全身/
//550, 700, 0.45, 0, 500 モデル顔中心
//225, 350, 0.25, 0, 250
        const position = {
            boxWidth: 550,
            boxHeight: 700,
            modelScale: 0.15,
            modelX: 0,
            modelY: 500,
        };

        // document.addEventListener(
        //     "DOMContentLoaded",
        //     () => {
        //
        //     },
        //     false
        // );


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
            //550, 900, 0.235, 0, -20 モデル全身/
            //550, 700, 0.45, 0, 500 モデル顔中心
            //225, 350, 0.25, 0, 250
            const position = {
                boxWidth: 550,
                boxHeight: 700,
                modelScale: 0.15,
                modelX: 0,
                modelY: 500,
            };
            //インスタンス作成＆DOMLoad操作
            console.log("ロード");
            indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
            indexLibrary.onload();
        };

        console.log("スクリプト読み込み");
        loadScript(0);

//--- cubism SDK 初期化
//     window.addEventListener(
//         "load",
//         () => {
//             console.log("ロード");
//             indexLibrary = new IndexLibrary(debug,serverURL,modelPath,position);
//             indexLibrary.onload();
//             console.log("main.js");
//
//         },
//         false
//     );

//-
//indexLibrary.reset_face();

//注释的setExpression2和3是指定表情的代码，使用时需要将下面两个函数和html中的控件注释取消
// setExpression2();
// setExpression3();
        window.addEventListener("beforeunload", () => {
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
        function initExpression() {
            indexLibrary.App_set_point(0)
            speechRrcognizer();
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
            var imageURL = "https://survey.syd1.qualtrics.com/CP/Graphic.php?IM=IM_0rio0dlcHAWDxgG"
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
            reply();
            sendMsg();
            //backMsg();
        });

// Send Message upon Pressing Enter

        txt.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                // Enter's keyCode is 13
                reply();
                sendMsg();
                //backMsg();
            }
        });

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
                if (speaking.classList.contains("speaking")) {
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

            speech.addEventListener("click", event => {
                listening ? stop() : start();
                listening = !listening;
            });

            ready();
        };

        const start1 = document.getElementById("start1");
        start1.addEventListener("click", event => {
            //speechRrcognizer();
            ready();
        })

//CHAT GPT代码

        const API_KEY = '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';
        const URL = "https://api.openai.com/v1/chat/completions";


        function reply() {
            var textgpt = document.getElementById("txt").value;
            console.log(textgpt);

            // 封装异步操作为Promise
            function getResponse() {
                return new Promise((resolve, reject) => {
                    axios.post(
                        URL,
                        {
                            "model": "gpt-3.5-turbo",
                            "messages": [
                                {
                                    "role": "system",
                                    "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese."
                                },
                                {
                                    "role": "system",
                                    "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. "
                                },
                                {"role": "user", "content": textgpt}
                            ]
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${API_KEY}`,
                            },
                        }
                    )
                        .then(response => resolve(response.data.choices[0].message.content))
                        .catch(error => reject(error));
                });
            }

            // 调用Promise并处理结果
            getResponse()
                .then(chatgpt_response => {
                    $("#response_text").val(chatgpt_response);
                    backMsg();
                    var paragraphs = document.querySelectorAll("p#chatgpt");
                    var lastParagraph = paragraphs[paragraphs.length - 1];
                    lastParagraph.textContent = chatgpt_response;
                    console.log(lastParagraph);
                    console.log(chatgpt_response);
                    const chatPage = document.querySelector('.chat-page');
                    chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
                })
                .catch(error => console.log(error));
        }

        function ready() {
            console.log("进入函数")

            // 封装异步操作为Promise
            function ready_getResponse() {
                return new Promise((resolve, reject) => {
                    axios.post(
                        URL,
                        {
                            "model": "gpt-3.5-turbo",
                            "messages": [
                                {
                                    "role": "system",
                                    "content": "Due to the reduced virulence of the novel coronavirus, Japan no longer mandates the wearing of masks for the general public. However, as a medical advisor, I would like to emphasize the importance of wearing masks while traveling and persuade those who are reluctant to do so. Wearing masks serves as a crucial preventive measure, helping to minimize the spread of respiratory droplets and protect both the wearer and those around them from potential infection. For individuals who willingly wear masks during their outings, I commend and support their decision, as it demonstrates their understanding of the significance of mask usage. Let's continue to encourage everyone to prioritize mask-wearing as an essential practice for public health. Lastly, if discussions veer off-topic or away from health-related inquiries, I kindly remind users to stay focused on the subject at hand.Please respond in Japanese."
                                },
                                {
                                    "role": "system",
                                    "content": "And, please output your point of view in only one paragraph, with as few words of output as possible. "
                                },
                                {"role": "user", "content": "こんにちは"}
                            ]
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${API_KEY}`,
                            },
                        }
                    )
                        .then(response => resolve(response.data.choices[0].message.content))
                        .catch(error => reject(error));
                });
            }

            // 调用Promise并处理结果
            ready_getResponse()
                .then(chatgpt_response => {
                    $("#response_text").val(chatgpt_response);
                    backMsg();
                    var paragraphs = document.querySelectorAll("p#chatgpt");
                    var lastParagraph = paragraphs[paragraphs.length - 1];
                    lastParagraph.textContent = chatgpt_response;
                    console.log(lastParagraph);
                    console.log(chatgpt_response);
                })
                .catch(error => console.log(error));
        }


    });

    Qualtrics.SurveyEngine.addOnReady(function () {
        /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/

    });

    Qualtrics.SurveyEngine.addOnUnload(function () {
        /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/

    });
}