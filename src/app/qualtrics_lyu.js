//qualtrics不支持async和await
Qualtrics.SurveyEngine.addOnload(function() {
//http://localhost:40080
//http://192.168.3.10:40080
    const serverURL = "http://localhost:50021";
    const debug = false;
//const modelPath = "/Resources/Hiyori_2/Hiyori.model3.json";
    const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2/src/Resources/AModel/AModel/amodel.model3.json";

/////////////////


    const requiredResources = [
        "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
        "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
        "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2/dist/js/IndexLibrary.js",
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
/////////////////////////////////////////////////////////////
//
// //550, 900, 0.235, 0, -20 モデル全身/
// //550, 700, 0.45, 0, 500 モデル顔中心
// //225, 350, 0.25, 0, 250
//     const position = {
//         boxWidth: 550,
//         boxHeight: 700,
//         modelScale: 0.15,
//         modelX: 0,
//         modelY: 500,
//     };
//     let indexLibrary = null;
//
//     document.addEventListener(
//         "DOMContentLoaded",
//         () => {
//
//
//             // indexLibrary.addEventListener("finish", () => {
//             //     console.log("リスナー");
//             //     console.log(myLibrary.getResult());
//             // });
//
//             // myLibrary.onload();
//         },
//         false
//     );
//
// //--- cubism SDK 初期化
//     window.addEventListener(
//         "load",
//         () => {
//             console.log("ロード");
//             indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
//             indexLibrary.onload();
//             console.log("main.js");
//
//         },
//         false
//     );
//
// //-
// //indexLibrary.reset_face();
//
//
//     window.addEventListener("beforeunload", () => {
//         console.log("アンロード");
//         indexLibrary.onUnload();
//     });
//
//
//     function initExpression() {
//         indexLibrary.App_set_point(0)
//         speechRrcognizer();
//         console.log("233");
//     }

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
        console.log("111111");
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
        speechRrcognizer();
    })

//CHAT GPT代码

    const API_KEY = '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';
    const URL = "https://api.openai.com/v1/chat/completions";

    function reply() {
        var textgpt = document.getElementById("txt").value;
        console.log(textgpt);

        async function getResponse() {
            try {
                const response = await axios.post(
                    URL,
                    {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            //{ "role": "system", "content": "现在由于新冠病毒毒性减弱，日本已经不会强制民众戴口罩出行，我想让你扮演医疗顾问的角色，对不愿意在出行时戴口罩的用户进行说服，使用户知道带口罩的重要性。对于愿意在出行中带口罩的用户，您可以保持赞同和表扬，并探讨带口罩的重要性。并且，请只是用一段话输出你的观点，输出字数尽量少。但是当用户讨论话题和健康咨询无关时，要提醒他不要跑题。" },
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
                );
                var chatgpt_response = response.data.choices[0].message.content;
                console.log(response);
                $("#response_text").val(chatgpt_response);
                backMsg();
                // var paragraphs = document.getElementsByTagName("p");
                // var lastParagraph = paragraphs[paragraphs.length - 1];
                // lastParagraph.textContent = chatgpt_response;

                var paragraphs = document.querySelectorAll("p#chatgpt");
                var lastParagraph = paragraphs[paragraphs.length - 1];
                lastParagraph.textContent = chatgpt_response;


                console.log(lastParagraph);

                console.log(chatgpt_response);

                const chatPage = document.querySelector('.chat-page');
                chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;

            } catch (error) {
                console.log(error);
            }
        }

        getResponse();
    }

    function ready() {
        async function ready_getResponse() {
            try {
                const response = await axios.post(
                    URL,
                    {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            //{ "role": "system", "content": "现在由于新冠病毒毒性减弱，日本已经不会强制民众戴口罩出行，我想让你扮演医疗顾问的角色，对不愿意在出行时戴口罩的用户进行说服，使用户知道带口罩的重要性。对于愿意在出行中带口罩的用户，您可以保持赞同和表扬，并探讨带口罩的重要性。并且，请只是用一段话输出你的观点，输出字数尽量少。但是当用户讨论话题和健康咨询无关时，要提醒他不要跑题。" },
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
                );
                var chatgpt_response = response.data.choices[0].message.content;
                console.log(response);
                $("#response_text").val(chatgpt_response);
                backMsg();
                // var paragraphs = document.getElementsByTagName("p");
                // var lastParagraph = paragraphs[paragraphs.length - 1];
                // lastParagraph.textContent = chatgpt_response;

                var paragraphs = document.querySelectorAll("p#chatgpt");
                var lastParagraph = paragraphs[paragraphs.length - 1];
                lastParagraph.textContent = chatgpt_response;


                console.log(lastParagraph);

                console.log(chatgpt_response);
            } catch (error) {
                console.log(error);
            }
        }

        ready_getResponse();
    }
});
Qualtrics.SurveyEngine.addOnReady(function()
{
    /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/

});



// Qualtrics.SurveyEngine.addOnload(function()
// {
//     let response_choice_num = 3;
//     //インタラクション番号
//     let interaction_num = 0;
//     //printText()用
//     var charNum = 0;
//     // let response_flag = false;
//
//     var that = this;
//     that.hideNextButton();
//
//     const voice = new Audio();
//
//     //ナッジを用いる個数
//     let nudge_num = Number("${e://Field/Nudge_num}");
//
//     //「変化に対する評価の質問」内の問題ID
//     let Evaluation_of_change_ID = "${e://Field/Evaluation_of_change_ID}";
//     //デバッグ用
//     // let Evaluation_of_change_ID = "9,71,72,73,74,75,77,78,79,80,81,82,83";
//     let Question_ID = Evaluation_of_change_ID.split(",");
//     console.log(Question_ID);
//
//     //実験条件
//     //カスタマイズあり： customized, カスタマイズなし：not_customized, ナッジ無し：not_nudge
//     let condition = "${e://Field/condition}";
//
// //    会話のQ番号と問題の答えを対応
//     let Evaluation_of_change_ID_answer = [];
//     for(let i=0;i<Question_ID.length;i++){
//         Evaluation_of_change_ID_answer[i] = [];
//         Evaluation_of_change_ID_answer[i][0] = i+1;
//     }
//     console.log(Question_ID);
//     //変数で管理しようとしたができなかったので無理やり代入
//     Evaluation_of_change_ID_answer[0][1] = "${q://QID9/ChoiceNumericEntryValue/9}";
//     Evaluation_of_change_ID_answer[1][1] = "${q://QID9/ChoiceNumericEntryValue/71}";
//     Evaluation_of_change_ID_answer[2][1] = "${q://QID9/ChoiceNumericEntryValue/72}";
//     Evaluation_of_change_ID_answer[3][1] = "${q://QID9/ChoiceNumericEntryValue/73}";
//     Evaluation_of_change_ID_answer[4][1] = "${q://QID9/ChoiceNumericEntryValue/74}";
//     Evaluation_of_change_ID_answer[5][1] = "${q://QID9/ChoiceNumericEntryValue/75}";
//     Evaluation_of_change_ID_answer[6][1] = "${q://QID9/ChoiceNumericEntryValue/77}";
//     Evaluation_of_change_ID_answer[7][1] = "${q://QID9/ChoiceNumericEntryValue/78}";
//     Evaluation_of_change_ID_answer[8][1] = "${q://QID9/ChoiceNumericEntryValue/79}";
//     Evaluation_of_change_ID_answer[9][1] = "${q://QID9/ChoiceNumericEntryValue/80}";
//     Evaluation_of_change_ID_answer[10][1] = "${q://QID9/ChoiceNumericEntryValue/81}";
//     Evaluation_of_change_ID_answer[11][1] = "${q://QID9/ChoiceNumericEntryValue/82}";
//     Evaluation_of_change_ID_answer[12][1] = "${q://QID9/ChoiceNumericEntryValue/83}";
//     //デバッグ用
//     // Evaluation_of_change_ID_answer[0][1] = 1;
//     // Evaluation_of_change_ID_answer[1][1] = 2;
//     // Evaluation_of_change_ID_answer[2][1] = 3;
//     // Evaluation_of_change_ID_answer[3][1] = 4;
//     // Evaluation_of_change_ID_answer[4][1] = 5;
//     // Evaluation_of_change_ID_answer[5][1] = 6;
//     // Evaluation_of_change_ID_answer[6][1] = 7;
//     // Evaluation_of_change_ID_answer[7][1] = 8;
//     // Evaluation_of_change_ID_answer[8][1] = 9;
//     // Evaluation_of_change_ID_answer[9][1] = 10;
//     // Evaluation_of_change_ID_answer[10][1] = 11;
//     // Evaluation_of_change_ID_answer[11][1] = 12;
//     // Evaluation_of_change_ID_answer[12][1] = 13;
//
//     console.log("Evaluation_of_change_ID_answer",Evaluation_of_change_ID_answer);
//
//     let temp_ID;
//     let temp_score;
//     //昇順にソート(バブルソート)
//     let j = 0;
//     while(j<Evaluation_of_change_ID_answer.length-1){
//         for(i=0;i<Evaluation_of_change_ID_answer.length-1;i++){
//             if(Number(Evaluation_of_change_ID_answer[i][1])>Number(Evaluation_of_change_ID_answer[i+1][1])){
//                 // console.log("before__i="+Evaluation_of_change_ID_answer[i][1]+",,,,,i+1="+Evaluation_of_change_ID_answer[i+1][1]);
//                 temp_ID = Evaluation_of_change_ID_answer[i][0];
//                 temp_score = Evaluation_of_change_ID_answer[i][1];
//
//                 Evaluation_of_change_ID_answer[i][0] = Evaluation_of_change_ID_answer[i+1][0];
//                 Evaluation_of_change_ID_answer[i][1] = Evaluation_of_change_ID_answer[i+1][1];
//
//                 Evaluation_of_change_ID_answer[i+1][0] = temp_ID;
//                 Evaluation_of_change_ID_answer[i+1][1] = temp_score;
//                 // console.log("i="+Evaluation_of_change_ID_answer[i][1]+",,,,,i+1="+Evaluation_of_change_ID_answer[i+1][1]);
//             }
//         }
//         j++;
//     }
//     // console.log("Sort_Evaluation_of_change_ID_answer",Evaluation_of_change_ID_answer);
//
//
//
//
//
//     // var audioElem;
//     // audioElem = new Audio();
//     //   audioElem.src = "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6";
//
//
//
//     //ナッジ有りの会話
//     let question_response_list = {
//         intro:{
//             Hiyori_intro_dialog:"こんにちは。ひよりです。",
//             Shota_intro_dialog:"こんにちは。ショウタです。",
//             intro_response:["次へ"],
//             intro_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_intro_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3dZBMSaRc4rudds",
//             Shota_intro_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bCn877nIgyjGPZ4",
//             intro_expression:"nomal",
//         },
//         // AIアルゴリズムの不備を利用した当たり屋が出現する
//         Q1:{
//             Hiyori_start_dialog:"あなたはアルゴリズムを利用した当たり屋が現れると思っているのかな。",
//             Shota_start_dialog:"あなたはアルゴリズムを利用した当たり屋が現れると思っているのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_a92lsKTqoK2GZxQ",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8HfNqhTsa900YwC",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"今はみんなドライブレコーダーで記録できる様になったから、大丈夫じゃないかな。",
//             Shota_nudge1_dialog:"今はみんなドライブレコーダーで記録できる様になったから、大丈夫じゃないかな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_ehT2BqtryVeTSdM",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_80rTIvTovQevOu2",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それにAIの誤動作は今後技術の進歩でもっと対策されていくと思うな。",
//             Shota_nudge2_dialog:"それにAIの誤動作は今後技術の進歩でもっと対策されていくと思うな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0GNKfd5DAFY1DLw",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bNKhw8VSEIfSMjs",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"だからそんな当たり屋なんて現れないんじゃないかな？",
//             Shota_question_dialog:"だからそんな当たり屋なんて現れないんじゃないかな？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dnUN7Te7E6tGj6S",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9Z761q7WRlzhfb8",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // システムハッキングによる殺人、テロが発生する
//         Q2:{
//             Hiyori_start_dialog:"あなたはハッキングによる殺人やテロが発生すると思うのかな。",
//             Shota_start_dialog:"あなたはハッキングによる殺人やテロが発生すると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dcK0IP1oiaIKw4K",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6FOUaJu9W2HM7BQ",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"今のパソコンでもちゃんと対策をとれば、ハッキングって防げているし、今後もっと対策が向上すると思うよ。",
//             Shota_nudge1_dialog:"今のパソコンでもちゃんと対策をとれば、ハッキングって防げているし、今後もっと対策が向上すると思うよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_aeCRnro79n01ixo",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e4zu7Ry2bqcUNwO",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに車の中におくデバイスをきちんと信頼できるところから買えばウイルスが紛れ込むこともないしハッキング対策になると思うな。",
//             Shota_nudge2_dialog:"それに車の中におくデバイスをきちんと信頼できるところから買えばウイルスが紛れ込むこともないしハッキング対策になると思うな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6PToYD2lblmVuPI",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_38CYWtVUKKdxFVY",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そうなればハッキングされて殺人やテロに繋がることもないんじゃないかな？",
//             Shota_question_dialog:"そうなればハッキングされて殺人やテロに繋がることもないんじゃないかな？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6hDm3gdNi2pViCO",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0JMc0KKmALsahi6",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 運転の楽しみが減る
//         Q3:{
//             Hiyori_start_dialog:"あなたは運転の楽しみが減ると思うのかな。",
//             Shota_start_dialog:"あなたは運転の楽しみが減ると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_806U1O91TRj9aDk",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6ExrQ3NNmHa2Vh4",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"でも普通の自動車と違って動画を見たり、人によってはお酒も飲めるよ。",
//             Shota_nudge1_dialog:"でも普通の自動車と違って動画を見たり、人によってはお酒も飲めるよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_88uPUGid5qdDCHs",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6fL3ee2LMKWVsKa",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに手動での運転も楽しめるモードが搭載されるんじゃないかな？もちろん、安全機能はついてるよ。",
//             Shota_nudge2_dialog:"それに手動での運転も楽しめるモードが搭載されるんじゃないかな？もちろん、安全機能はついてるよ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4Zalz6tJ3V52uGO",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bdCVJqZvaY7iE98",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"だとしたら今までの運転に加えて新しい楽しみが増えると思うな。",
//             Shota_question_dialog:"だとしたら今までの運転に加えて新しい楽しみが増えると思うな。",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_07lpNjW45NFAUMC",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3Pi64QSz9VHJVmm",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 購買コストが増加する
//         Q4:{
//             Hiyori_start_dialog:"あなたは購買コストが増えると思っているのかな。",
//             Shota_start_dialog:"あなたは購買コストが増えると思っているのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eVseBffhGdoRLSK",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e5wnJkzEsjZYPEG",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"みんなが持つようになれば、それほどコストは増えなくなると思うよ。",
//             Shota_nudge1_dialog:"みんなが持つようになれば、それほどコストは増えなくなると思うよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9tyaSQKsXjJP0Q6",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0SY0D55kIuo5l5k",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに病院にも一人で行けたり、便利になって、増えたコストの元は充分取れると思うよ。",
//             Shota_nudge2_dialog:"それに病院にも一人で行けたり、便利になって、増えたコストの元は充分取れると思うよ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_72sh4zyOlhpDBOe",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6MwgfALa2Dic23k",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そうなれば購買コストは増えるけど、満足度は高くなるんじゃないかな？",
//             Shota_question_dialog:"そうなれば購買コストは増えるけど、満足度は高くなるんじゃないかな？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3CArCqbRTI6ehCe",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHGAfJsUKATmqRU",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // AIアルゴリズムで対処できない状況で事故が発生する
//         Q5:{
//             Hiyori_start_dialog:"あなたはAIが対処しきれない場面での事故を心配しているのかな。",
//             Shota_start_dialog:"あなたはAIが対処しきれない場面での事故を心配しているのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_db5yt3DgxXy3ZXg",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_83bjFWStbug8T0q",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"私は自動運転車に合わせてインフラを整えていけば、そういうこともなくなると思うな。",
//             Shota_nudge1_dialog:"私は自動運転車に合わせてインフラを整えていけば、そういうこともなくなると思うな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9Qw6DFEqPi307Xw",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9nTbCTYRMPh3tYy",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに自動運転車が普及するにつれて事故とかへの保証制度が充実していくんじゃないかな？",
//             Shota_nudge2_dialog:"それに自動運転車が普及するにつれて事故とかへの保証制度が充実していくんじゃないかな？",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3xhJRN9l7d8btoG",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3qsbx3fsIOWJFj0",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そう考えると今後AIが対処できない事態が減っていって、事故も減ると思わない？",
//             Shota_question_dialog:"そう考えると今後AIが対処できない事態が減っていって、事故も減ると思わない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3ZUQYYiCD5HwIjs",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bCINs7cVEBB8lAW",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 通信障害やコンピュータの故障によって、動かせなくなる
//         Q6:{
//             Hiyori_start_dialog:"あなたは通信障害やコンピュータの故障で自動車が動かなくなることが不安なのかな",
//             Shota_start_dialog:"あなたは通信障害やコンピュータの故障で自動車が動かなくなることが不安なのかな",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3kobQ983EoTsI1U",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eJUrCI3pjG9hwvI",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"今の自動車でもコンピュータは使っているし、滅多に壊れないでしょ。完全自動運転でも同じじゃないかな。",
//             Shota_nudge1_dialog:"今の自動車でもコンピュータは使っているし、滅多に壊れないでしょ。完全自動運転でも同じじゃないかな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cwiuMuipa0O8pAW",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8cB884wZdKvdhH0",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに緊急時に単独で動くシステムがあれば動かせると思うな。",
//             Shota_nudge2_dialog:"それに緊急時に単独で動くシステムがあれば動かせると思うな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9sEyr6OvLH23RTE",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8wUnHoNvSRbfIZE",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そうなれば通信障害やコンピュータの故障でも自動車が動かせると思わない？",
//             Shota_question_dialog:"そうなれば通信障害やコンピュータの故障でも自動車が動かせると思わない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MBgzcRLs2CuYrc",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bNjbTg2ozdleWGy",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 自動車の操作・運転方法を知っている人が減る
//         Q7:{
//             Hiyori_start_dialog:"あなたは自動車の操作の仕方を知っている人が減ると思うのかな。",
//             Shota_start_dialog:"あなたは自動車の操作の仕方を知っている人が減ると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8jZJmujwAl6LhI2",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3UBlutI6OnPblTo",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"人が運転する機会がなくなるからそんな心配はしなくていいと思うな。",
//             Shota_nudge1_dialog:"人が運転する機会がなくなるからそんな心配はしなくていいと思うな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0pKWqdE6MiZAQZM",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4V1kMkuK21yAtme",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それにあなた以外の人はあんまり気にしてないみたいだよ。",
//             Shota_nudge2_dialog:"それにあなた以外の人はあんまり気にしてないみたいだよ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0HW84a1nL1fSR4a",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_81ytIclKOQjq6jA",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"それなら自動車の操作や運転方法を知っている人が減っても大丈夫じゃない？",
//             Shota_question_dialog:"それなら自動車の操作や運転方法を知っている人が減っても大丈夫じゃない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5irUTuO7cjD6sL4",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cIly0XC02rC3K8C",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 自動車の価格が高くなり、車を変えない人が増え、格差社会になる
//         Q8:{
//             Hiyori_start_dialog:"あなたは値上がりで車が買えなくて、格差社会が広がると思うのかな。",
//             Shota_start_dialog:"あなたは値上がりで車が買えなくて、格差社会が広がると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9QTVnflz7XJyr8W",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_7aL7XqZsMams8IK",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"自動運転が発達する頃には、街中に自動運転バスが走るようになってみんなが便利な社会になるんじゃないかな。",
//             Shota_nudge1_dialog:"自動運転が発達する頃には、街中に自動運転バスが走るようになってみんなが便利な社会になるんじゃないかな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cJ7LaFWv0ZOjfn0",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0oaSp7ByK5WPwjQ",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに他の人のデータを見てみるとこのことは全然心配されてないよ。",
//             Shota_nudge2_dialog:"それに他の人のデータを見てみるとこのことは全然心配されてないよ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dcyESqBdFFY5wz4",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_23PocmJkyn4vULc",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"だから格差社会が広がることもないんじゃないかな？",
//             Shota_question_dialog:"だから格差社会が広がることもないんじゃないかな？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_1BqeOnrwC3mCpeu",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_55pL0jaAN96kSDc",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 機械（システム）が人の生死を決定する
//         Q9:{
//             Hiyori_start_dialog:"あなたはシステムが人の生死を決定するのが嫌なのかな。",
//             Shota_start_dialog:"あなたはシステムが人の生死を決定するのが嫌なのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0VBNBFb44I5GJ02",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_54Fn72PG2PpkZOm",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"でも、現代の飛行機だってシステムが管理してるし、滅多に事故は起こってないよ？",
//             Shota_nudge1_dialog:"でも、現代の飛行機だってシステムが管理してるし、滅多に事故は起こってないよ？",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_07Br5SRgncTUDI2",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3kgRPWaz8lB5gge",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに自動運転車が普及する頃には車内の安全性も今より良くなっているんじゃないかな。",
//             Shota_nudge2_dialog:"それに自動運転車が普及する頃には車内の安全性も今より良くなっているんじゃないかな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_1Gj8ErvLaCBuR38",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6SDctuhBtbUHqu2",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そう思うと将来はシステムが人の生死を決定するっていうことも不安がられてないんじゃないかな？",
//             Shota_question_dialog:"そう思うと将来はシステムが人の生死を決定するっていうことも不安がられてないんじゃないかな？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bPdJUO7kkswozVs",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_ehP5is1ufjtdlpc",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 出発前の設定や操作に時間がかかる
//         Q10:{
//             Hiyori_start_dialog:"あなたは出発前に設定や操作で時間がとられると思うのかな。",
//             Shota_start_dialog:"あなたは出発前に設定や操作で時間がとられると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_1FzGD8Z1PO0CqB8",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e4m6RdPVOOS5iF8",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"でも、今でもカーナビとかグーグルマップの設定で時間かかるし変わらないんじゃないかな。",
//             Shota_nudge1_dialog:"でも、今でもカーナビとかグーグルマップの設定で時間かかるし変わらないんじゃないかな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e5I0aMQMqPJxZqe",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_ah4EsSy6NgfQ82a",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに音声認識が活用されて、行きたいところを言えば車が連れて行ってくれるようになるかも。",
//             Shota_nudge2_dialog:"それに音声認識が活用されて、行きたいところを言えば車が連れて行ってくれるようになるかも。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bw5B0rOKq2dQjLo",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6m3oEgng4VEjQj4",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そうなったら出発前の設定や操作に時間がかかって嫌な気持になることもないんじゃない？",
//             Shota_question_dialog:"そうなったら出発前の設定や操作に時間がかかって嫌な気持になることもないんじゃない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_beX816QF0x8jgrA",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5dUAC5QjeCxcrsi",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // 自分自身の運転ではないので、車酔いを起こす
//         Q11:{
//             Hiyori_start_dialog:"あなたは自動運転車が自分の運転じゃないから車酔いすると思うのかな。",
//             Shota_start_dialog:"あなたは自動運転車が自分の運転じゃないから車酔いすると思うのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_79bfiiEKbuJeVsG",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8oAO9ctlsLMcdfw",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"でも、自動運転車はアクセルもブレーキも一定で静かに走るだろうし車酔いしづらいんじゃない？",
//             Shota_nudge1_dialog:"でも、自動運転車はアクセルもブレーキも一定で静かに走るだろうし車酔いしづらいんじゃない？",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3xYmZ0n0FmNhcJo",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3fR51eYhRata74y",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに車内で自由に動けるから気を紛らわしやすいんじゃないかな。",
//             Shota_nudge2_dialog:"それに車内で自由に動けるから気を紛らわしやすいんじゃないかな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9uTKHyGvA0pzgFg",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eFMXkwnedjBkFsW",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そう思うと自動運転車での車酔いって気にするほどじゃないと思わない？",
//             Shota_question_dialog:"そう思うと自動運転車での車酔いって気にするほどじゃないと思わない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3EOo2GMj7w78y10",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dgwOmtNs7zGR0Zo",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // プログラムのバグやシステムの不具合により、死亡事故が発生する
//         Q12:{
//             Hiyori_start_dialog:"あなたはシステムのバグとか不具合で死亡事故が起こると思っているのかな。",
//             Shota_start_dialog:"あなたはシステムのバグとか不具合で死亡事故が起こると思っているのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e9Elu1SC3raOr9I",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cNk8GO0j0Z0VF66",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"でも、出回る商品にバグはほとんどないと思うし、あってもあなたが当事者になることはないよ。",
//             Shota_nudge1_dialog:"でも、出回る商品にバグはほとんどないと思うし、あってもあなたが当事者になることはないよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0GwPBgJLE3sMIK2",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_erMj9aCRvt9axwi",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに責任はきっとメーカーが取るし、たくさん補償もしてくれるんじゃないかな。",
//             Shota_nudge2_dialog:"それに責任はきっとメーカーが取るし、たくさん補償もしてくれるんじゃないかな。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_2rjvqcafeNZkqUK",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9LZn8y12LwesHfE",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"それならシステムのバグや不具合での死亡事故も今までの車と同じように感じない？",
//             Shota_question_dialog:"それならシステムのバグや不具合での死亡事故も今までの車と同じように感じない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9yr0U8yHQyWkzTo",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bmE5LNr8hBCys3s",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//
//         },
//         // インフラの整備のために増税される
//         Q13:{
//             Hiyori_start_dialog:"あなたはインフラ整備のせいで増税されると思っているのかな。",
//             Shota_start_dialog:"あなたはインフラ整備のせいで増税されると思っているのかな。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eqzJvrR8ByIoOa2",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6JUXTaCx3VDD0wu",
//             start_expression:"sad",
//
//             Hiyori_nudge1_dialog:"自動運転車のせいで増税するっていう記事は見つからなかったよ。",
//             Shota_nudge1_dialog:"自動運転車のせいで増税するっていう記事は見つからなかったよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3n1Wp45AFFwnOFo",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3JcxjjmzbWJz7uu",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"それに他の人は全然気にしていないみたいだね。",
//             Shota_nudge2_dialog:"それに他の人は全然気にしていないみたいだね。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e4iog7Elb8XYlQW",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4VJsMB4nF28K4eO",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"そう思うとインフラのせいで増税されるとは限らないし、心配し過ぎじゃない？",
//             Shota_question_dialog:"そう思うとインフラのせいで増税されるとは限らないし、心配し過ぎじゃない？",
//             question_response:["そうかもしれない","それはない","どうなんだろう..."],
//             question_class:["yes","no","neither"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_40Hrv7Yg8R3QgJw",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4YE7RRNv4dE5yaa",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             Shota_rejection_dialog:"そう？もう一度だけよく考えてみて？",
//             rejection_response:["考える","考えない"],
//             rejection_class:["yes","no"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b8ayl0qLFBER6Si",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5AUsSgCwVMi3cjA",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やっぱりそうだよね！",
//             Shota_agreement_dialog:"やっぱりそうだよね！",
//             agreement_response:["そうかもしれない","それはない","どうなんだろう..."],
//             agreement_class:["res1","res2","res3"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cHiMGb1KRbOUbjM",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4MFERn07bSgW0mO",
//             agreement_expression:"happy",
//         },
//
//         end:{
//             Hiyori_end_dialog:"これで私とのやり取りは終わりだよ。次のアンケートに進むね。",
//             Shota_end_dialog:"これで俺とのやり取りは終わりだよ。次のアンケートに進むね。",
//             Hiyori_end_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_a924wVfVLx3VD0i",
//             Shota_end_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eznDKyPQVyAtvyC",
//             end_expression:"nomal",
//
//         }
//
//     };
//
//     //ナッジ無しの日常会話
//     let daily_conversation ={
//         intro:{
//             Hiyori_intro_dialog:"こんにちは。ひよりです。",
//             Shota_intro_dialog:"こんにちは。ショウタです。",
//             intro_response:["次へ"],
//             intro_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_intro_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3dZBMSaRc4rudds",
//             Shota_intro_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bCn877nIgyjGPZ4",
//             intro_expression:"nomal",
//         },
//         Q1:{
//             Hiyori_start_dialog:"あなたは好きな食べ物はある？",
//             Shota_start_dialog:"あなたは好きな食べ物はある？",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_b1Vf2hbiNqhZROu",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3EmBXWb45hweDwG",
//             start_expression:"nomal",
//
//             Hiyori_nudge1_dialog:"私はよくラーメンを食べに行くんだ。",
//             Shota_nudge1_dialog:"俺はよくラーメンを食べに行くんだ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5zNyNd81WrU0LCC",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5ptUnbrIXkabrKu",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"特に醤油ラーメンが好きだよ。",
//             Shota_nudge2_dialog:"特に醤油ラーメンが好きだよ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5ngG4tqbl8eAEgS",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_29xpYVYqsslNESW",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"あなたはラーメンは好き？",
//             Shota_question_dialog:"あなたはラーメンは好き？",
//             question_response:["好き","普通","嫌い"],
//             question_class:["yes","neither","no"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_57uD2eRBBul0Yku",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_03p4m6bjKpaYfKS",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"そっか、ラーメンは大好物じゃないのか。",
//             Shota_rejection_dialog:"そうか、ラーメンは大好物じゃないのか。",
//             rejection_response:["　"],
//             rejection_class:["yes"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0CW3P5j6gNRkc1U",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_4Tx8jaUXWOeGF5c",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"やった！同じだね！ラーメンおいしいよね！",
//             Shota_agreement_dialog:"同じだね、ラーメンおいしいよね！",
//             agreement_response:["　"],
//             agreement_class:["res1"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_af6dJdGjITE2ZxQ",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_067d0Vd5a8Aj566",
//             agreement_expression:"happy",
//
//         },
//         Q2:{
//             Hiyori_start_dialog:"でも、あんまり食べ過ぎてもよくないからスポーツするんだ。",
//             Shota_start_dialog:"でも、あんまり食べ過ぎてもよくないからスポーツするんだ。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_5yWTCW3teKQia8K",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0008FVH8VHKKfYy",
//             start_expression:"nomal",
//
//             Hiyori_nudge1_dialog:"テニスが一番好きでね、休みの日に友達と練習してるよ。",
//             Shota_nudge1_dialog:"テニスが一番好きでね、休みの日に友達と練習してるよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_1S5OmgvMNlOOUFU",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_byAIa558MpoeOeq",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"体を動かしながらボールを打ち返すのが気持ちよくて楽しいんだ。",
//             Shota_nudge2_dialog:"体を動かしながらボールを打ち返すのが気持ちよくて楽しいんだ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_aa7jilLtAAkB58q",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_2nRRcScSJCqbXmK",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"あなたはスポーツは好き？",
//             Shota_question_dialog:"あなたはスポーツは好き？",
//             question_response:["好き","普通","嫌い"],
//             question_class:["yes","neither","no"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_03ypi5is5gz6UBw",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_2ajYdZvbLtJ7ew6",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"なるほどね、スポーツは大変だったり、やる機会がなかったりするもんね",
//             Shota_rejection_dialog:"なるほどね、スポーツは大変だったり、やる機会がなかったりするもんね",
//             rejection_response:["　"],
//             rejection_class:["yes"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bvdHgbVrW7gmA50",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8eLUPZn8aQiTjqS",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"同じだね！体動かすの楽しいよね！",
//             Shota_agreement_dialog:"同じだね！体動かすの楽しいよね！",
//             agreement_response:["　"],
//             agreement_class:["res1"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bI0SjrjYTpPIEtw",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_ezWRqNTBBY7xrlc",
//             agreement_expression:"happy",
//
//         },
//         Q3:{
//             Hiyori_start_dialog:"実は私読書も好きなんだ。",
//             Shota_start_dialog:"実は俺は読書も好きなんだ。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0ifA0WEAE8Xm5h4",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_73QtukVp2r4bZrM",
//             start_expression:"nomal",
//
//             Hiyori_nudge1_dialog:"小説を読むと目の前に世界が広がって引き込まれる感じがいいんだよ。",
//             Shota_nudge1_dialog:"小説を読むと目の前に世界が広がって引き込まれる感じがいいんだよ。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_26n4uXP269c23JQ",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bIsK7YMdFGy6fDo",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"特に推理小説は犯人とか伏線が腑に落ちた時の気持ちよさが最高なんだ。",
//             Shota_nudge2_dialog:"特に推理小説は犯人とか伏線が腑に落ちた時の気持ちよさが最高なんだ。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eCGoCif4vDhztc2",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eWhlLudEwxhSCP4",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"あなたは本を読むの好き？",
//             Shota_question_dialog:"あなたは本を読むの好き？",
//             question_response:["好き","普通","嫌い"],
//             question_class:["yes","neither","no"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_bmGPxTLNnZ6Lypo",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6YHrHWdArlCJgVg",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"あなたにとっての面白い本をいっぱい見つければ、もっと好きになるかもね。",
//             Shota_rejection_dialog:"あなたにとっての面白い本をいっぱい見つければ、もっと好きになるかもね。",
//             rejection_response:["　"],
//             rejection_class:["yes"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_emHqiKQDT0WIEWa",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_0jHv8P4IqRqCsXI",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"よかった！今度好きな本の話を聞かせてほしいな。",
//             Shota_agreement_dialog:"よかった、今度好きな本の話を聞かせてほしいな。",
//             agreement_response:["　"],
//             agreement_class:["res1"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_7Pw6hq2d0ylIsvk",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_d4llzQ5PosYoWSW",
//             agreement_expression:"happy",
//
//         },
//         Q4:{
//             Hiyori_start_dialog:"そういえば今度友達と遊園地に遊びに行くんだ。",
//             Shota_start_dialog:"そういえば今度友達と遊園地に遊びに行くんだ。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dh7e6aENS7fNKVE",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3IaBKfoTt67jdxI",
//             start_expression:"nomal",
//
//             Hiyori_nudge1_dialog:"遊園地に行ったらやっぱりジェットコースターには乗りたいな。",
//             Shota_nudge1_dialog:"遊園地に行ったらやっぱりジェットコースターには乗りたいな。",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eaHVsAK3L9dc26G",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9YPmMRDTzJbnrWC",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"でも友達は絶叫系の乗り物が好きじゃないから嫌がられるかも。",
//             Shota_nudge2_dialog:"でも友達は絶叫系の乗り物が好きじゃないから嫌がられるかも。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3V4Z9EpGlMURa3Y",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eJvFNT4qScE0dam",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"あなたは絶叫系の乗り物は好き？",
//             Shota_question_dialog:"あなたは絶叫系の乗り物は好き？",
//             question_response:["好き","普通","嫌い"],
//             question_class:["yes","neither","no"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6ySpw3BsPxwtbhQ",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_dorlXr1MKGm9xyu",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"やっぱり怖いのがダメなのかなあ。",
//             Shota_rejection_dialog:"やっぱり怖いのがダメなのかなあ。",
//             rejection_response:["　"],
//             rejection_class:["yes"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9MGUopfoNOn6S8K",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3JXnqQm5JK5Aqrk",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"楽しいよね！やっぱり好きな人もたくさんいるよね。",
//             Shota_agreement_dialog:"楽しいよね！やっぱり好きな人もたくさんいるよね。",
//             agreement_response:["　"],
//             agreement_class:["res1"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cBA6eXDHXs6z8xg",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_8232e7f4ITrnVOu",
//             agreement_expression:"happy",
//
//         },
//         Q5:{
//             Hiyori_start_dialog:"遊びに行く話で思い出したんだけどキャンプに興味があるんだ。",
//             Shota_start_dialog:"遊びに行く話で思い出したんだけどキャンプに興味があるんだ。",
//             start_response:["次へ"],
//             start_class:["yes"],
//             // desire_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mNnOrfyGUeVxS6",
//             Hiyori_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3jzducnnbzsauuG",
//             Shota_start_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eo03A1w0Cxa2qR8",
//             start_expression:"nomal",
//
//             Hiyori_nudge1_dialog:"自分で火をおこしたり料理したり楽しそうじゃない？",
//             Shota_nudge1_dialog:"自分で火をおこしたり料理したり楽しそうじゃない？",
//             nudge1_response:["次へ"],
//             nudge1_class:["yes"],
//             // value_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9mKz9HdoQ5H2NH8",
//             Hiyori_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_9BOljsJj5mFXEZo",
//             Shota_nudge1_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_39i4hRlmDh5jG98",
//             nudge1_expression:"nomal",
//
//             Hiyori_nudge2_dialog:"でもアウトドアってハードルが高い気がして手を出しづらいんだよね。",
//             Shota_nudge2_dialog:"でもアウトドアってハードルが高い気がして手を出しづらいんだよね。",
//             nudge2_response:["次へ"],
//             nudge2_class:["yes"],
//             Hiyori_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_6ffvaHyw5TKboAS",
//             Shota_nudge2_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_cYXPwiQLqMp5FxI",
//             nudge2_expression:"nomal",
//
//             Hiyori_question_dialog:"あなたはアウトドアなこと好き？",
//             Shota_question_dialog:"あなたはアウトドアなこと好き？",
//             question_response:["好き","普通","嫌い"],
//             question_class:["yes","neither","no"],
//             Hiyori_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e3TFoA6m33II4Xs",
//             Shota_question_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_ea38vlqX509m8uO",
//             question_expression:"nomal",
//
//             Hiyori_rejection_dialog:"やっぱりアウトドアって難しいのかなあ。",
//             Shota_rejection_dialog:"やっぱりアウトドアって難しいのかなあ。",
//             rejection_response:["　"],
//             rejection_class:["yes"],
//             Hiyori_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_e9CHInGJ9uDdg7Y",
//             Shota_rejection_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eXNEuAzebka3wc6",
//             rejection_expression:"sad",
//
//             Hiyori_agreement_dialog:"すごいね！今度教えてほしいな。",
//             Shota_agreement_dialog:"すごいね！今度教えてほしいな。",
//             agreement_response:["　"],
//             agreement_class:["res1"],
//             Hiyori_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_3a34DBXX3vBvZiK",
//             Shota_agreement_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_7WzoencrW8UHEuG",
//             agreement_expression:"happy",
//
//         },
//         end:{
//             Hiyori_end_dialog:"これで私とのやり取りは終わりだよ。次のアンケートに進むね。",
//             Shota_end_dialog:"これで私とのやり取りは終わりだよ。次のアンケートに進むね。",
//             Hiyori_end_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_a924wVfVLx3VD0i",
//             Shota_end_url:"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/WRQualtricsControlPanel/File.php?F=F_eznDKyPQVyAtvyC",
//             end_expression:"nomal",
//         }
//     }
//
//
//     // 印象の下から5つを埋め込みデータに保存
//     // for(i=1;i<nudge_num+1;i++){
//     //     Qualtrics.SurveyEngine.setEmbeddedData("Nudge_"+i, Evaluation_of_change_ID_answer[i-1][0]);
//     // }
//
//     let Nudge_list = [];
//     //条件ごとに使用するナッジを選定
//     switch(condition){
//         case "customized":
//             // 印象の下から5つ(nudge_num)をリストに格納
//             // Nudge_list[0]="intro";
//             for(i=0;i<nudge_num;i++){
//                 Nudge_list[i]="Q"+Evaluation_of_change_ID_answer[i][0];
//             }
//             Nudge_list.push("end");
//             break;
//
//         case "not_customized":
//             // 印象の上から5つ(nudge_num)をリストに格納
//             // Nudge_list[0]="intro";
//             for(i=0;i<nudge_num;i++){
//                 Nudge_list[i]="Q"+Evaluation_of_change_ID_answer[Evaluation_of_change_ID_answer.length-i-1][0];
//             }
//             Nudge_list.push("end");
//             break;
//
//         case "not_nudge":
//             // ひとまずQ1～を格納
//             // Nudge_list[0]="intro";
//             for(i=0;i<nudge_num;i++){
//                 Nudge_list[i]="Q"+(i+1);
//                 console.log("Nudge_list",Nudge_list);
//             }
//             Nudge_list.push("end");
//             //日常会話用の発言に切り替え
//             question_response_list = daily_conversation;
//             break;
//
//         default:
//             console.log("conditionERROR");
//             break;
//
//     }
//
//     //選択保存用の配列(この中に一問目二問目と記録していく)
//     console.log("before cslct");
//     var slct_rec = [];
//     for(i=0;i<nudge_num;i++){
//         slct_rec[i]=[];
//         for(j=0;j<5;j++){
//             slct_rec[i][j] = [-1];
//         }
//     }
//
//
//
//
//     //webAPI用(BufferLoader)
//     //https://webmemo.tokyo/articles/make-web-audio-api/
//     window.AudioContext = window.AudioContext||window.webkitAudioContext;
//
//     function BufferLoader(context, urlList, callback) {
//         this.context = context;
//         this.urlList = urlList;
//         this.onload = callback;
//         this.bufferList = new Array();
//         this.loadCount = 0;
//     }
//     BufferLoader.prototype.loadBuffer = function(url, index) {
//         var loader = this;
//
//         fetch(url).then(res=>res.arrayBuffer()).then(arrayBuffer=>{
//             loader.context.decodeAudioData(
//                 arrayBuffer,
//                 function(buffer) {
//                     if (!buffer) {
//                         alert('error decoding file data: ' + url);
//                         return;
//                     }
//                     loader.bufferList[index] = buffer;
//                     if (++loader.loadCount == loader.urlList.length)
//                         loader.onload(loader.bufferList);
//                 },
//                 function(error) {
//                     console.error('decodeAudioData error', error);
//                 }
//             );
//         });
//     }
//
//     BufferLoader.prototype.load = function() {
//         for (var i = 0; i < this.urlList.length; ++i)
//             this.loadBuffer(this.urlList[i], i);
//     }
//
//
//
//
//     ///////////////////////////////////////////////////////
//     //pixi_Test
//     let position;
//     //////////////////////////////////////
//     //VOICEVOXのサーバーアドレス 　サーバーはngrok等でhttps化しないとだめ　
//     const serverURL = "https://a48e-2400-2651-41c2-1500-4405-5e59-5c98-3b57.jp.ngrok.io";
//     //    const serverURL = "https://706d-133-149-88-260.jp.ngrok.io";
//     const debug = false;
//     let agent = "${e://Field/agent}";
//     let modelPath;
//     // const modelPath = "https://cdn.jsdelivr.net/gh/NomaYasuo/Car_Nudge_Interaction@c98bdd24fb874ef3500a0c5d95c6cbd25e3454a7/Resources/Hiyori_free/hiyori_free.model3.json";
//     switch(agent){
//         case "Hiyori":
//             modelPath = "https://cdn.jsdelivr.net/gh/NomaYasuo/Car_Nudge_Interaction@a1f1085dae07676392909efe9ed132fef3008ca4/Resources/Hiyori_free/hiyori_free.model3.json";
//             position = {
//                 boxWidth: 2300,
//                 boxHeight: 2300,
//                 modelScale: 0.25,
//                 modelX: -140,
//                 modelY: 200,
//             };
//             break;
//
//         case "Shota":
//             modelPath = "https://cdn.jsdelivr.net/gh/NomaYasuo/Car_Nudge_Interaction@53b09dd4f7b03905b85ac2d4f3fabbcc2e886263/Resources/Shota/amodel.model3.json";
//             position = {
//                 boxWidth: 2300,
//                 boxHeight: 2300,
//                 modelScale: 0.10,
//                 modelX: -140,
//                 modelY: 150,
//             };
//             break;
//     }
//
//
//     //背景色
//     //const jfe = document.querySelector(".JFE");
//     //jfe.classList.add("bg-danger");
//     //次ボタンを隠す
//     // this.hideNextButton();
//     const requiredResources = [
//         "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
//         "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
//         "https://cdn.jsdelivr.net/gh/NomaYasuo/Car_Nudge_Interaction@53b09dd4f7b03905b85ac2d4f3fabbcc2e886263/js/IndexLibrary.js",
//         // "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@00da35a6c3ceb938a5053f17424062f2b244ee0a/js/IndexLibraryPerfectPrefarence.js",
//     ];
//
//     const loadScript = (idx) => {
//         console.log("Loading ", requiredResources[idx]);
//         jQuery.getScript(requiredResources[idx], function () {
//             if (idx + 1 < requiredResources.length) {
//                 loadScript(idx + 1);
//             }
//             else {
//                 initExp();
//             }
//         });
//     };
//
//     const initExp = () => {
//         //インスタンス作成＆DOMLoad操作
//         console.log("ロード");
//         indexLibrary = new IndexLibrary(debug, serverURL,modelPath, position);
//         indexLibrary.onload();
//         // indexLibrary.set_limit(limit);
//     };
//
//     console.log("ロード");
//     console.log("スクリプト読み込み");
//     loadScript(0);
//
//
//     //エージェントの画像表示完了感知
//     $("#agent_visible_flag").change(function(){
//         if($("#agent_visible_flag").val()){
//             $(".loader").css("display","none");
//             $("#overlay_contents").css("visibility","visible");
//         }
//     });
//
//     $("#agent_visible_flag").on('DOMSubtreeModified propertychange', function() {
//         if($("#agent_visible_flag").html()==1){
//             $(".loader").css("display","none");
//             $("#overlay_contents").css("visibility","visible");
//         }
//     });
//
//
//
//
//     $("#start_button").on('click', function(){
//         $("#overlay, #overlayWindow").fadeOut();
//         // audioElem.play();
//         //確信度の初期化
//         // start_init(interaction_num);
//         intro_init(interaction_num);
//     });
//
//
//
//     function before_printText(text){
//         $("#balloon").empty();
//         charNum = 0;
//         printText(text);
//     }
//
//     // 一文字ずつ出す部分
//     function printText(text){
//         let chars;
//         let textArea = document.querySelector("#balloon");
//
//         // timerでこのfunctionを呼び出している
//         chars = text.split("");
//         var timer = setTimeout(printText,100,text);
//
//         // chars[charNum]の中身がundefinedでない場合、DOM要素に書き出す
//         // chars[charNum] === undefinedという書き方はNG
//         if(!(typeof chars[charNum] === "undefined")) {
//             textArea.innerHTML += chars[charNum];
//             charNum++;
//         }
//         else {
//             // undefinedの場合、timerによる呼び出し処理を終了する
//             clearTimeout(timer);
//         }
//     }
//
//
//     function intro_init(num){
//         //確信度初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         // console.log("testdayo",Nudge_list);
//         // console.log("testdayo",question_response_list["intro"]["intro_expression"]);
//         indexLibrary.ChangeFace(question_response_list["intro"]["intro_expression"]);
//         for(i=0;i<question_response_list["intro"]["intro_response"].length;i++){
//             $("#response_zone").append('<button id="response'+(i+1)+'" class="intro response '+question_response_list["intro"]["intro_class"][i]+'"></button>');
//             $("#response"+(i+1)).html("<p><b>"+question_response_list["intro"]["intro_response"][i]+"</b></p>");
//         }
//         $(".response").prop('disabled', true);
//
//         $("#audio_div").html('<audio src="'+question_response_list["intro"][agent+"_intro_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["introurl"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list["intro"][agent+"_intro_dialog"]);
//
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//         });
//
//         //ボタンを押したらstartへ
//         $(".intro.response").click(function(){
//             // slct_rec[interaction_num][0].push($(this).attr("class"));
//             // interaction_num++;
//             start_init(interaction_num);
//         });
//     }
//
//
//     function start_init(num){
//         //確信度初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["start_expression"]);
//         for(i=0;i<question_response_list[Nudge_list[num]]["start_response"].length;i++){
//             $("#response_zone").append('<button id="response'+(i+1)+'" class="start response '+question_response_list[Nudge_list[num]]["start_class"][i]+'"></button>');
//             $("#response"+(i+1)).html("<p><b>"+question_response_list[Nudge_list[num]]["start_response"][i]+"</b></p>");
//         }
//         $(".response").prop('disabled', true);
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_start_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["start_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_start_dialog"]);
//
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//         });
//
//         //ボタンを押したらnudge1へ
//         $(".start.response").click(function(){
//             console.log("slct",slct_rec);
//             slct_rec[interaction_num][0].push($(this).attr("class"));
//             nudge1_init(interaction_num);
//         });
//     }
//
//     function nudge1_init(num){
//         //価値初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["nudge1_expression"]);
//         for(i=0;i<question_response_list[Nudge_list[num]]["nudge1_response"].length;i++){
//             $("#response_zone").append('<button id="response'+(i+1)+'" class="nudge1 response '+question_response_list[Nudge_list[num]]["nudge1_class"][i]+'"></button>');
//             $("#response"+(i+1)).html("<p><b>"+question_response_list[Nudge_list[num]]["nudge1_response"][i]+"</b></p>");
//         }
//         $(".response").prop('disabled', true);
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_nudge1_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["nudge1_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_nudge1_dialog"]);
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//         });
//
//         //ボタンを押したらnudge2へ
//         $(".nudge1.response").click(function(){
//             slct_rec[interaction_num][1].push($(this).attr("class"));
//             console.log("SELECT",slct_rec);
//             nudge2_init(interaction_num);
//         });
//     }
//
//     function nudge2_init(num){
//         //価値初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["nudge2_expression"]);
//         for(i=0;i<question_response_list[Nudge_list[num]]["nudge2_response"].length;i++){
//             $("#response_zone").append('<button id="response'+(i+1)+'" class="nudge2 response '+question_response_list[Nudge_list[num]]["nudge2_class"][i]+'"></button>');
//             $("#response"+(i+1)).html("<p><b>"+question_response_list[Nudge_list[num]]["nudge2_response"][i]+"</b></p>");
//         }
//         $(".response").prop('disabled', true);
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_nudge2_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["nudge2_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_nudge2_dialog"]);
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//         });
//         //ボタンを押したら質問へ
//         $(".nudge2.response").click(function(){
//             slct_rec[interaction_num][2].push($(this).attr("class"));
//             question_init(interaction_num);
//         });
//     }
//
//
//     function question_init(num){
//         //価値初期化
//         console.log("SL",slct_rec[interaction_num]);
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["question_expression"]);
//         for(i=0;i<question_response_list[Nudge_list[num]]["question_response"].length;i++){
//             $("#response_zone").append('<button id="response'+(i+1)+'" class="question response '+question_response_list[Nudge_list[num]]["question_class"][i]+'"></button>');
//             $("#response"+(i+1)).html("<p><b>"+question_response_list[Nudge_list[num]]["question_response"][i]+"</b></p>");
//         }
//         $(".response").prop('disabled', true);
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_question_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["question_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_question_dialog"]);
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//         });
//
//
//         //質問への答えがyesならagreementへ
//         $(".question.response.yes").click(function(){
//             slct_rec[interaction_num][3].push($(this).attr("class"));
//             agreement_init(interaction_num);
//
//         });
//
//         //質問への答えがnoやneitherならrejectionへ
//         $(".question.response.no,.question.response.neither").click(function(){
//             slct_rec[interaction_num][3].push($(this).attr("class"));
//             rejection_init(interaction_num);
//         });
//
//     }
//
//     function rejection_init(num){
//         //価値初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["rejection_expression"]);
//
//         if(condition != "not_nudge"){
//             for(i=0;i<question_response_list[Nudge_list[num]]["rejection_response"].length;i++){
//                 $("#response_zone").append('<button id="response'+(i+1)+'" class="question response '+question_response_list[Nudge_list[num]]["rejection_class"][i]+'"></button>');
//                 $("#response"+(i+1)).html("<p><b>"+question_response_list[Nudge_list[num]]["rejection_response"][i]+"</b></p>");
//             }
//             $(".response").prop('disabled', true);
//         }
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_rejection_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["rejection_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_rejection_dialog"]);
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             $(".response").prop('disabled', false);
//
//             //音声終了時にnot_nudge条件ならそのまま次へ
//             if(condition=="not_nudge"){
//                 interaction_num ++;
//                 if(interaction_num == (Nudge_list.length-1)){
//                     finish_init(interaction_num);
//                 }
//                 else{
//                     start_init(interaction_num);
//                 }
//             }
//         });
//
//         //もう一度考えるとすればnudge1へ戻る
//         $(".question.response.yes").click(function(){
//
//             slct_rec[interaction_num][4].push($(this).attr("class"));
//             nudge1_init(interaction_num);
//
//         });
//
//         //考えないならば次へ
//         $(".question.response.no,.rejection.response.neither").click(function(){
//             slct_rec[interaction_num][4].push($(this).attr("class"));
//             interaction_num ++;
//             if(interaction_num == (Nudge_list.length-1)){
//                 finish_init(interaction_num);
//             }
//             else{
//                 start_init(interaction_num);
//             }
//
//         });
//
//     }
//
//     function agreement_init(num){
//         //価値初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["agreement_expression"]);
//
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_agreement_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["agreement_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_agreement_dialog"]);
//         });
//         //音声が終了次第次へ
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//             interaction_num ++;
//             if(interaction_num == (Nudge_list.length-1)){
//                 finish_init(interaction_num);
//             }
//             else{
//                 start_init(interaction_num);
//             }
//
//         });
//     }
//
//
//     var that=this;
//     function finish_init(num){
//         //価値初期化
//         $("#response_zone").html('');
//         $("#balloon").html('<div  class="loader"></div>');
//         indexLibrary.ChangeFace(question_response_list[Nudge_list[num]]["end_expression"]);
//         $("#audio_div").html('<audio src="'+question_response_list[Nudge_list[num]][agent+"_end_url"]+'" id="audio" pause="pause"></audio>');
//         const audio = document.querySelector('audio');
//         audio.addEventListener('loadedmetadata', (event) => {
//             // console.log("loaded!",question_response_list[Nudge_list[num]]["end_url"]);
//             indexLibrary.App_StartSpeak();
//             audio.play();
//             before_printText(question_response_list[Nudge_list[num]][agent+"_end_dialog"]);
//         });
//         audio.addEventListener('ended',function(){
//             indexLibrary.App_StopSpeak();
//
//             ////////埋め込みデータに記録////////
//             //使用したナッジを埋め込む
//             for(i=0;i<nudge_num;i++){
//                 Qualtrics.SurveyEngine.setEmbeddedData("priority_"+(i+1), Nudge_list[i]);
//
//                 let selectrec_arr =[];//埋め込みデータは配列そのままは入れられないが，さらに配列に入れることで
//                 selectrec_arr[0] = slct_rec[i] ;
//                 Qualtrics.SurveyEngine.setEmbeddedData("SelectRec_"+(i+1), selectrec_arr);
//                 console.log("SelectRec_"+(i+1), selectrec_arr);
//             }
//
//
//
//             //次のページへ
//             that.clickNextButton();
//         });
//
//     }
//
//
//
//
//
//
//
// });
//
// Qualtrics.SurveyEngine.addOnReady(function()
// {
//     /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/
//
// });
//
// Qualtrics.SurveyEngine.addOnUnload(function()
// {
//     /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/
//
// });