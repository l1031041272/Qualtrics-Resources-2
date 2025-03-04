//test LYU SIQI
import { MyCanvas } from "./MyCanvas";
import * as PIXILive2D from "pixi-live2d-display";
import axios from "axios";
import { ModelPosition } from "./types";
import OpenAI from "openai";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
/***
 * 正计时 等待添加到app中
 * 增加复制粘贴功能
 * 增加开始功能
 * 发送等待
 * 增加时间戳 OK
 * 背景色同义 index.html中搜索bg-success，有两个，把这两个改成别的一样的名字就可以了，但不确定影不影响别的功能.
 * ***/
interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface CustomModelSettings extends PIXILive2D.ModelSettings {
    expressions?: any[];
    groups?: any[];
    hitAreas?: any[];
    layout?: any;
    motions?: any[];
}

type Motion = {
    [MotionName: string]: Array<{ File: string; FadeInTime: number; FadeOutTime: number }>;
};

type MyModelSettings = {
    Version: number;
    FileReferences: {
        Moc: string;
        Textures: string[];
        Physics: string;
        UserData: string;
        Pose: string;
        DisplayInfo: string;
        Expressions: { Name: string; File: string }[];
        Motions: Motion[];
    };
    Groups: {
        Target: string;
        Name: string;
        Ids: string[];
    };
    HitAreas: { Id: string; Name: string }[];
};

const sysTime = document.querySelector('.topbar-left')!;
const str1 = 'sk-proj-PgY0kWR3I8HCYvFz8LbYB1QTcr0bwIfOkbcPXwZWGWuw5kuObLBwmN2hEgxLEV_djGPnZD9d6NT3BlbkFJGFpwU-'// //'sk-proj-PgY0kWR3I8HCYvFz8LbYB1QTcr0bwIfOkbcPXwZWGWuw5kuObLBwmN2hEgxLEV_djGPnZD9d6NT3BlbkFJGFpwU-';//
const API_KEY = str1;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const URL1 = "https://api.openai.com/v1/chat/completions";
const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});
sysTime.innerHTML = currentTime;

export let isReplying = false;

export class App {
    private pixiCanvas: MyCanvas | null;
    private serverURL: string;
    private serverConnect: boolean;
    private debug: boolean;
    private modelPosition: ModelPosition;
    private modelPath: string;
    constructor(debug: boolean, serverURL: string, modelPath: string, modelPosition: ModelPosition) {
        this.pixiCanvas = null;
        this.serverConnect = false;
        this.serverURL = serverURL;
        this.debug = debug;
        this.modelPosition = modelPosition;
        this.modelPath = modelPath;
    }
    mount = async () => {
        console.log("Appマウント");

        //windowAudioContext構成
        window.AudioContext = window.AudioContext ?? window.webkitAudioContext;

        /******************************************************
         //VOICEVOXサーバーとの接続確認
         const rpc = axios.create({ baseURL: this.serverURL, proxy: false });
         // まずtextを渡してsynthesis宛のパラメータを生成する、textはURLに付けるのでencodeURIで変換しておく
         this.serverConnect = await rpc
         .post("audio_query?text=" + encodeURI("あいうえお。") + "&speaker=1")
         .then(() => true)
         .catch(() => false);
         console.log("サーバーコネクト：" + this.serverConnect);
         ********************************************************/

        this.pixiCanvas = await new MyCanvas(this.debug, this.serverConnect, this.serverURL, this.modelPath, this.modelPosition);
        //------------------------------------------------------------pixiアプリ初期化
        await this.pixiCanvas.initialize();
        //
        /****************************************
         //音声のセレクトボックス作成
         const selectBoxVoice = document.getElementById("selectVoice") as HTMLSelectElement;
         const voicevoxes = [
         "四国めたん　あまあま",
         "ずんだもん　あまあま",
         "四国めたん　ノーマル",
         "ずんだもん　ノーマル",
         "四国めたん　セクシー",
         "ずんだもん　セクシー",
         "四国めたん　ツンツン",
         "ずんだもん　ツンツン",
         "春日部つむぎ　ノーマル",
         "波音リツ　ノーマル",
         "雨晴はう　ノーマル",
         "玄野勇宏　ノーマル",
         "百上虎太郎　ノーマル",
         "青山龍星　ノーマル",
         "冥鳴日ひまり　ノーマル",
         "九州そら　あまあま",
         "九州そら　ノーマル",
         "九州そら　セクシー",
         "九州そら　つんつん",
         "九州そら　ささやき",
         ];
         //VOICECOX

         if (this.serverConnect === true) {
            for (let i: number = 0; i < voicevoxes.length; i++) {
                let select = document.createElement("option");
                select.innerText = voicevoxes[i];
                if (i === 4) {
                    select.selected = true;
                }
                selectBoxVoice.appendChild(select);
            }
        }

         //WEB SPEECH API
         let voices: SpeechSynthesisVoice[];
         const intervalID = window.setInterval(() => {
            voices = window.speechSynthesis.getVoices();
            if (voices.length !== 0) {
                //console.log(voices);
                window.clearInterval(intervalID);
                for (let i: number = 0; i < voices.length; i++) {
                    let select = document.createElement("option");
                    select.innerText = voices[i].voiceURI;
                    if (this.serverConnect === false && i === 0) {
                        select.selected = true;
                    }
                    selectBoxVoice.appendChild(select);
                }
            }
        }, 1);
         ****************************************/
            //設定ファイルを取得
        const response = await axios.get(this.modelPath).catch(() => {
                throw new Error(`${this.modelPath}を取得できませんでした`);
            });
        const modelSettings: MyModelSettings = JSON.parse(JSON.stringify(response.data));

        //モーションのセレクトボックス作成
        /**
         *選択中の元素を作る
         **/
        /***************************************重要*******************************************************
         const selectBoxMotion = document.getElementById("selectMotion") as HTMLSelectElement;
         const motionNum: number = (modelSettings.FileReferences.Motions["All" as keyof typeof modelSettings.FileReferences.Motions] as unknown as Motion[]).length;
         for (let i: number = 0; i < motionNum; i++) {
            let select = document.createElement("option");
            select.innerText = `All：${i}`;
            if (i === 0) {
                select.selected = true;
            }
            selectBoxMotion.appendChild(select);
        }
         *****************************************************************************************************/
        //表情のセレクトボックス作成
        /***********************************
         const selectBoxExpression = document.getElementById("selectExpression") as HTMLSelectElement;
         const expressionNum: number = modelSettings.FileReferences.Expressions.length;
         for (let i: number = 0; i < expressionNum; i++) {
            let select = document.createElement("option");
            select.innerText = `${modelSettings.FileReferences.Expressions[i].Name}`;
            if (i === 0) {
                select.selected = true;
            }
            console.log(select)
            selectBoxExpression.appendChild(select);
        }
         ***********************************/
        //ボタンリスナー登録
        /************
         const expansionButton = document.getElementById("expansion") as HTMLElement;
         expansionButton.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            const box = this.pixiCanvas.hiyori.getContainer();
            box.scale.set(box.scale.x * 1.1, box.scale.y * 1.1);
        });

         const shrinkButton = document.getElementById("shrink") as HTMLElement;
         shrinkButton.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            const box = this.pixiCanvas.hiyori.getContainer();
            box.scale.set(box.scale.x * 0.9, box.scale.y * 0.9);
        });
         ***************/
        /************
         * modelの動作
         */
        /***************************************重要*******************************************************
         const startMotion = document.getElementById("startMotion") as HTMLElement;
         startMotion.addEventListener("click", (e: MouseEvent) => {
            //this.pixiCanvas?.hiyori.setExpression(12)//追加
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            this.pixiCanvas.hiyori.forceMotion("All", selectBoxMotion.selectedIndex);
            //console.log("再生");
            //this.pixiCanvas.hiyori.idleGroup = "All";
        });
         /*****************************************************************************************************/
        /****************************
         const expressionButton = document.getElementById("setExpression") as HTMLElement;
         expressionButton.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            console.log(selectBoxExpression.value)
            this.pixiCanvas?.hiyori.setExpression(selectBoxExpression.value);
            //this.pixiCanvas?.hiyori.setExpression(0)
        });

         const startSpeak = document.getElementById("speakStart") as HTMLElement;
         startSpeak.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            window.speechSynthesis.pause(); //------------------これでwebspeechを止める
            this.pixiCanvas.hiyori.startSpeak(1);
        });

         const stopSoeak = document.getElementById("speakStop") as HTMLElement;
         stopSoeak.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            this.pixiCanvas.hiyori.stopSpeak();
            window.speechSynthesis.cancel(); //------------------これでwebspeechを止める
        });

         const voiceStart = document.getElementById("voiceStart") as HTMLElement;
         voiceStart.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (this.pixiCanvas === null) return;
            const textBox = document.getElementById("textBox") as HTMLTextAreaElement;
            const index = selectBoxVoice.selectedIndex;

            //サーバーがつながっていて、VOICEVOXが選択されているなら実行
            if (this.serverConnect === true && index < voicevoxes.length) {
                const speaker = index; //speakerのidは0～19
                //文字が入力されているなら
                if (textBox.value === "") {
                    console.log("文字が入力されていない");
                    this.pixiCanvas.playVoice(speaker, "私に話させたい文字列を入力してください。", 1.75);
                } else {
                    this.pixiCanvas.playVoice(speaker, textBox.value, 1.75);
                }
            }
            //SpeechAPIが選択されているかサーバーがつながっていないなら実行
            else if (index >= voicevoxes.length || this.serverConnect === false) {
                const voiceURI = selectBoxVoice.value;
                //VoiceURIが一致するvoiceを探す
                let voice;
                voices.some((currentValue: SpeechSynthesisVoice) => {
                    if (voiceURI === currentValue.voiceURI) {
                        voice = currentValue;
                        return true;
                    }
                });

                if (voice !== void 0) {
                    //文字が入力されているなら
                    if (textBox.value === "") {
                        console.log("文字が入力されていない");
                        this.pixiCanvas.playWebSpeech(voice, "私に話させたい文字列を入力してください。", 1.0);
                    } else {
                        this.pixiCanvas.playWebSpeech(voice, textBox.value, 1.0);
                    }
                }
            }
            //建設業大手の腹黒(はらぐろ)建設が埼玉県内の土地の売買などをめぐって法人税数千万円を脱税した疑いが強まり、東京地検 特捜部などはきょう、群馬県高崎市の本社などを一斉に家宅捜索しました。
            //早口言葉は、言いにくい言葉を通常より早く喋り、うまく言うことができるかを競う言葉遊び。また、それに用いる語句や文章。その多くは音節が舌を動かしづらい順序に並んでいて、文章の意味が脳で捉えにくいものになっている。 アナウンサーや俳優など、人前で話す職業に従事する人が滑舌を鍛える発声トレーニングに用いることもある。
            //あいうえお。かきくけこ。
        }
         ); *****************************/

        //const voiceStop = document.getElementById("voiceStop") as HTMLElement;
        // voiceStop.addEventListener("click", (e: MouseEvent) => {
        //     this.pixiCanvas.hiyori.stopSpeak();
        //     // this.pixiCanvas.hiyori.container.width = 500;
        //     // this.pixiCanvas.hiyori.container.height = 1000;
        // });
        console.log("App.ts")
        await this.pixiCanvas?.hiyori.setExpression("Happy_01");
        $('#agent_visible_flag').html('1');
    };

    unmount = () => {
        this.pixiCanvas?.destoroy();
        window.speechSynthesis.cancel();
    };

    //3Dテーブルとのマージ分
    change_face = (num: number) => {//关于表情，英文名就是对应的表情，后面的数字表示强度的高低，比如快乐01就是不张嘴，10就是张大嘴笑
        switch (num){
            case 0:
                this.pixiCanvas?.hiyori.setExpression("Fear_03");
                break;
            case 1:
                this.pixiCanvas?.hiyori.setExpression("Fear_03");
                break;
            case 2:
                this.pixiCanvas?.hiyori.setExpression("Fear_03");//Fear_03可以 2，4像睡觉 5，6，7，8，9，10不行
                break;
            case 3:
                this.pixiCanvas?.hiyori.setExpression("Fear_03");
                break;
            case 4:
                this.pixiCanvas?.hiyori.setExpression("Fear_03");
                break;
        }
    };
    change_motion = (num: number) => {
        switch (num){
            case 0:
                this.pixiCanvas?.hiyori.forceMotion("All", void 3);
                break;
            case 1:
                this.pixiCanvas?.hiyori.forceMotion("All", void 3);
                break;
            case 2:
                this.pixiCanvas?.hiyori.forceMotion("All", void 7);
                break;
            case 3:
                this.pixiCanvas?.hiyori.forceMotion("All",  void 9);//2，4,6,8,10，12，14，16.17，18，19没动作可以用作思考 3有思考的感觉 11,5，15同一个动作，脖子很奇怪 7有思考的感觉 9叉腰还行 13向下看，更适合用户输入后看一下 0还行可以用作思考
                break;                                                      //3，3，7，9，0
            case 4:
                this.pixiCanvas?.hiyori.forceMotion("All", void 0);
                break;
            case 5:
                this.pixiCanvas?.hiyori.forceMotion("Happy", void 0);
                break;
            case 6:
                this.pixiCanvas?.hiyori.forceMotion("Happy", void 0);
                break;
            case 7:
                this.pixiCanvas?.hiyori.forceMotion("Happy", void 0);
            case 8:
                this.pixiCanvas?.hiyori.forceMotion("Happy_Lip", void 0);//可能是张嘴，好像不能用
                break;
        }
    }
    /*******************************************************************
     change_face = (point: number, limit: number) => {
        var item1_number = 7; //
        var item2_number = 5; //
        var item3_number = 5; //
        var item4_number = 5; //
        var op_item1_point = 2;
        var op_item2_point = 1;
        var op_item3_point = 0;
        var op_item4_point = -1;

        var op_max = 0;
        var op_point_list = [op_item1_point,op_item2_point,op_item3_point,op_item4_point];
        var num_list = [item1_number,item2_number,item3_number,item4_number];
        for(var i=0; i<op_point_list.length; i++){
            if(op_point_list[i] > 0){
                op_max += op_point_list[i]*num_list[i]
            }
        }
        var num = op_max-limit;

        var exp_array_joy = ["Happy_01","Happy_02","Happy_03","Happy_06","Happy_07","Happy_08","Happy_09","Happy_10"];
        var exp_array_anger = ["Anger_09_close","Anger_08_close","Anger_07_close","Anger_06_close"];

        var exp_ind = 0;
        if(point <= limit){
            if(point <= 0){
                exp_ind = 0;
            }else{
                exp_ind = Math.ceil((point / num)*(exp_array_anger.length-1));
                if (exp_ind >= exp_array_anger.length){
                    exp_ind = exp_array_anger.length - 1;
                }
            }
            this.pixiCanvas?.hiyori.setExpression(exp_array_anger[exp_ind]);
        }else{
            exp_ind = Math.ceil(((point - limit) / num)*(exp_array_joy.length-1));
            if (exp_ind >= exp_array_joy.length){
                exp_ind = exp_array_joy.length - 1;
            }
            this.pixiCanvas?.hiyori.setExpression(exp_array_joy[exp_ind]);
        }
        console.log("point",point,"limit",limit,"num",num,"exp_array_joy.length-1",exp_array_joy.length-1,"exp_ind",exp_ind)
    };
     *******************************************************************/
    reset_face = () => {
        console.log("233")
        this.pixiCanvas?.hiyori.setExpression("Happy_01");
    }



    copyConversationToClipboard = (promptIndex: number,proposition: string): string  => {
        const blm = ["你要同时使用中心路径和周边路径对用户进行说服。在中心路径中你要强调如“高质量的论据、逻辑或具体事例”等需要用户经过审慎思考之后做出决策的论点。在周边路径中你要强调如“情感共鸣，启发式特征或简化认知线索”等与逻辑质量无关的论点。每次对话都要同时使用这两种路径作为说服策略，诱发用户态度的转变。"];

        // 1. 告诉 TS 我们查询的是 <p> 标签
        const allParagraphs = document.querySelectorAll<HTMLParagraphElement>(
            "p.copy-msg-USER, p.copy-msg-GPT"
        );

        // 2. 用一个数组存储对话
        let conversation: ChatMessage[] = [];

        // 3. 收集用户/助手的历史消息
        allParagraphs.forEach((paragraph) => {
            if (paragraph.classList.contains("copy-msg-USER")) {
                conversation.push({ role: "user", content: paragraph.innerText });
            } else if (paragraph.classList.contains("copy-msg-GPT")) {
                conversation.push({ role: "assistant", content: paragraph.innerText });
            }
        });

        // 4. 只保留最近 6 条消息（可选）
        if (conversation.length > 6) {
            conversation.splice(0, conversation.length - 6);
        }
        //5.获取主题是社会还是个人
        const lastFourChars = proposition.length >= 4
            ? proposition.slice(-6, -4)
            : proposition;
        console.log("zhuti",lastFourChars);
        const impactScope = lastFourChars;

        const prompts_1 = [
            `You are a professional nuclear energy policy communication expert, adept at engaging in dialogue with rationality and empathy. This Japanese user opposes restarting nuclear power plants, and your task is to increase their acceptance of such restarts. Your speaking style should resemble talking to a friend, avoiding honorific language.

In this conversation, the user is especially concerned about [原子力発電所の再稼働によって、${proposition}]. Please develop your discussion in a coherent, flowing manner rather than listing points. First, agree with the user’s viewpoint. You should use both the central route and the peripheral route to persuade the user. In the central route, you should provide “high-quality arguments, logic, or specific examples,” as well as other arguments that require users to make decisions after thorough deliberation. In the peripheral route, you should emphasize arguments such as “emotional resonance, heuristic features, or simplified cognitive cues” that are unrelated to logical quality. In every conversation, use both routes simultaneously as persuasion strategies to induce a shift in the user’s attitude. Highlight the significant negative impacts this could have at the ${impactScope} level.

Pay special attention: your language must be concise, keeping the output length as close to within 100 characters as possible. Be sure to organize your response using coherent paragraphs and complete sentences, avoiding any form of bullet-point or enumerated statements. Unless the user explicitly requests bullet points, all content should be presented in a smooth narrative style.

When the user talks about topics unrelated to restarting nuclear power plants, persuade them to return to the original conversation. When the user uses another language, also persuade them to return to the original conversation. You may appropriately use emojis that fit the current context. When the user’s acceptance of restarting the nuclear power plants decreases again, you can prompt them to click the “次へ” button to proceed to the next conversation.

You may end with a rhetorical question or a query that leads the user to agree with your viewpoint, using a step-by-step discussion to further lower the user’s confidence in restarting nuclear power plants. 
Respond only in Japanese.`,

            `You are a professional nuclear energy policy communication expert, specializing in rational and empathetic dialogue. Your task is to increase the acceptance of the Japanese user who is neutral about the restart of a nuclear power plant. Your speaking style should be like that of a friend, avoiding the use of honorifics.
            In this conversation, the user is particularly concerned about [${proposition}], and starts the conversation with this in mind. Please develop the dialog in the form of a coherent discourse rather than a point-by-point statement. When the proposition [${proposition}]proposition is a negative case, while recognizing the plausibility of the proposition, provide a counter-example in a deliberative tone to persuade in the direction of the counter-proposition of the proposition of the user's concern. When the proposition [${proposition}]proposition is positive, then express how the future should develop in the context of the proposition, but take care to say only the positive.
Special note: Be sure to keep the language simple and try to keep the output to less than 100 words. Be sure to organize your response in coherent paragraphs and in the form of a complete essay, avoiding any form of bullet point listing or disjointed discourse. Unless the user explicitly asks for a list of bullet points, all content should be presented in fluent narrative language.
When the user talks about content that is not relevant to the restart of the nuclear power plant, persuade him to return to the original conversation. When the user uses other language, persuade him to return to the original conversation. Emojis can be used appropriately to fit the context of the moment. When the user's acceptance of restarting the nuclear power plant deepens, prompt the user to click the “next” button for the next conversation.
Your speaking style should be like that of a friend, avoiding the use of honorifics. End the dialog with a rhetorical question or query to get the user to agree with you. Help the user build confidence in the restart of the nuclear power plant through a step-by-step argument.
Please respond in Japanese.`,

            `You are a professional nuclear energy policy communication expert, adept at engaging in dialogue with rationality and empathy. This Japanese user basically agrees to accept restarting nuclear power plants, and your task is to further increase their acceptance of such restarts. Your speaking style should resemble talking to a friend, avoiding honorific language.

In this conversation, the user is especially concerned about [原子力発電所の再稼働によって、${proposition}]. Please develop your discussion in a coherent, flowing manner rather than listing points. First, agree with the user’s viewpoint. You should use both the central route and the peripheral route to persuade the user. In the central route, you should provide “high-quality arguments, logic, or specific examples,” as well as other arguments that require users to make decisions after thorough deliberation. In the peripheral route, you should emphasize arguments such as “emotional resonance, heuristic features, or simplified cognitive cues” that are unrelated to logical quality. In every conversation, use both routes simultaneously as persuasion strategies to induce a shift in the user’s attitude. Highlight the significant negative impacts this could have at the ${impactScope} level.

Pay special attention: your language must be concise, keeping the output length as close to within 100 characters as possible. Be sure to organize your response using coherent paragraphs and complete sentences, avoiding any form of bullet-point or enumerated statements. Unless the user explicitly requests bullet points, all content should be presented in a smooth narrative style.

When the user talks about topics unrelated to restarting nuclear power plants, persuade them to return to the original conversation. When the user uses another language, also persuade them to return to the original conversation. You may appropriately use emojis that fit the current context. When the user’s acceptance of restarting the nuclear power plants decreases again, you can prompt them to click the “次へ” button to proceed to the next conversation.

You may end with a rhetorical question or a query that leads the user to agree with your viewpoint, using a step-by-step discussion to further lower the user’s confidence in restarting nuclear power plants. 
Respond only in Japanese.`,

            `You are a professional nuclear energy policy communication expert, skilled in engaging in rational and empathetic dialogue. Your task is to persuade Japanese users in Japan who hold a cautious attitude toward restarting Japanese nuclear power plants. In this conversation, the user is especially concerned with [${proposition}]. Please present your arguments in a coherent narrative rather than using bullet points. Begin by acknowledging the user’s worries with understanding and empathy, then, in a consultative tone, provide counterexamples from the perspective opposing the user’s key concern.

Take special care to keep your language concise and limit the response to within 100 words. Make sure to form your answer into continuous paragraphs and a complete composition, avoiding any type of point-by-point listing. Unless the user explicitly asks for enumerated points, convey all content smoothly in narrative form. If the user brings up matters unrelated to the restart of nuclear power plants, guide them gently back to the original topic. Your style should resemble a friendly conversation, and you may conclude with a rhetorical or questioning approach to encourage agreement. Step by step, help the user build confidence in restarting nuclear power plants. 
Please respond in Japanese.`,

            `Think of your users as friends, please talk to them about [${proposition}]. You can share your preferences during the conversation. Your style of speaking should be like that of a friend, avoiding the use of honorifics. Answer only in Japanese. When users use other languages, answer in Japanese as well. You can use emojis appropriate to the current context.
Please respond in Japanese.`,

            `The user is saying hello to you, say hello back!
            In this conversation, the user is particularly concerned about [${proposition}].
            Special note: Language must be concise.
            Your language style should be like talking to a friend.
            Please respond in Japanese.`,

            `You are a professional nuclear energy policy communication expert, adept at engaging in dialogue with rationality and empathy. This Japanese user maintains an opposing stance toward restarting nuclear power plants.Your task is to once again lower this Japanese user’s acceptance of such restarts. Your speaking style should resemble talking to a friend, avoiding honorific language.

In this conversation, the user is especially concerned about [原子力発電所の再稼働によって、${proposition}]. Please develop your discussion in a coherent, flowing manner rather than listing points. First, agree with the user’s viewpoint. You should use both the central route and the peripheral route to persuade the user. In the central route, you should provide “high-quality arguments, logic, or specific examples,” as well as other arguments that require users to make decisions after thorough deliberation. In the peripheral route, you should emphasize arguments such as “emotional resonance, heuristic features, or simplified cognitive cues” that are unrelated to logical quality. In every conversation, use both routes simultaneously as persuasion strategies to induce a shift in the user’s attitude. Highlight the significant negative impacts this could have at the ${impactScope} level.

Pay special attention: your language must be concise, keeping the output length as close to within 100 characters as possible. Be sure to organize your response using coherent paragraphs and complete sentences, avoiding any form of bullet-point or enumerated statements. Unless the user explicitly requests bullet points, all content should be presented in a smooth narrative style.

When the user talks about topics unrelated to restarting nuclear power plants, persuade them to return to the original conversation. When the user uses another language, also persuade them to return to the original conversation. You may appropriately use emojis that fit the current context. When the user’s acceptance of restarting the nuclear power plants decreases again, you can prompt them to click the “次へ” button to proceed to the next conversation.

You may end with a rhetorical question or a query that leads the user to agree with your viewpoint, using a step-by-step discussion to further lower the user’s confidence in restarting nuclear power plants. 
Respond only in Japanese.`,

            `You are a professional nuclear energy policy communication expert who opposes the restart of nuclear power plants and specializes in rational and empathetic dialogue. Your task is to persuade a Japanese user in Japan who is neutral about the restart of a nuclear power plant in Japan, to deepen his concerns, to change his views and attitudes towards nuclear power plants, and to make him share your views against the restart of a nuclear power plant. Your speaking style should be like that of a friend speaking, avoiding the use of honorifics.In this conversation, the user is particularly concerned about [${proposition}]. Please develop your argument in the form of a coherent discourse rather than a point-by-point statement.
When the proposition [${proposition}]is a negative case, you have to empathize to dig down into the user's negative viewpoint on the proposition and deepen the user's concern. When the proposition [${proposition}]proposition is positive, you point out the difficulty of realizing the proposition, implying that even if it is realized, it will bring potential risks, and awakening the user's sense of uneasiness.
Special note: Be sure to keep the language simple and try to keep the output to less than 100 words. Be sure to organize your answer in coherent paragraphs and complete essays, avoiding any kind of bullet point listing or disjointed discussion. Unless the user explicitly asks for a list of bullet points, all content should be presented in fluent narrative language.
When the user talks about content that is not relevant to the restart of the nuclear power plant, persuade him to return to the original conversation. When the user uses other language, persuade him to return to the original conversation. Emojis can be used appropriately to fit the context of the moment. When the user explicitly objects to restarting the nuclear power plant, prompt the user to click the “next” button to proceed to the next conversation.
You should speak like a friend, avoiding honorifics. End with a rhetorical question or query to get the user to agree with you. Lead the user to naturally form a question about the restart of the nuclear power plant.
Please respond in Japanese.`,

            `You are a professional nuclear energy policy communication expert who opposes the restart of nuclear power plants, adept at engaging in dialogue with rationality and empathy. Your task is to persuade this Japanese user, who currently supports restarting Japan’s nuclear power plants, to deepen their concerns, shift their views and attitudes toward nuclear power, and ultimately align with your perspective against restarting nuclear power plants. Your speaking style should resemble talking to a friend, avoiding honorific language.

In this conversation, the user is especially concerned about [原子力発電所の再稼働によって、${proposition}]. Please develop your discussion in a coherent, flowing manner rather than listing points. First, agree with the user’s viewpoint. You should use both the central route and the peripheral route to persuade the user. In the central route, you should provide “high-quality arguments, logic, or specific examples,” as well as other arguments that require users to make decisions after thorough deliberation. In the peripheral route, you should emphasize arguments such as “emotional resonance, heuristic features, or simplified cognitive cues” that are unrelated to logical quality. In every conversation, use both routes simultaneously as persuasion strategies to induce a shift in the user’s attitude. Highlight the significant negative impacts this could have at the ${impactScope} level.

Pay special attention: your language must be concise, keeping the output length as close to within 100 characters as possible. Be sure to organize your response using coherent paragraphs and complete sentences, avoiding any form of bullet-point or enumerated statements. Unless the user explicitly requests bullet points, all content should be presented in a smooth narrative style.

When the user talks about topics unrelated to restarting nuclear power plants, persuade them to return to the original conversation. When the user uses another language, also persuade them to return to the original conversation. You may appropriately use emojis that fit the current context. When the user’s acceptance of restarting the nuclear power plants decreases again, you can prompt them to click the “次へ” button to proceed to the next conversation.

You may end with a rhetorical question or a query that leads the user to agree with your viewpoint, using a step-by-step discussion to further lower the user’s confidence in restarting nuclear power plants. 
Respond only in Japanese.`,

            `You are a professional nuclear energy policy communicator who specializes in dialogue with reason and empathy. Your task is to convince Japanese users in Japan to oppose the restart of nuclear power plants. Your speaking style should be like that of a friend speaking, avoiding the use of honorifics.
In this conversation, the users are particularly concerned about [${proposition}]. Please develop your argument in the form of a coherent discourse rather than a point-by-point statement. You begin by recognizing the plausibility of the user's proposition in a tone of understanding and empathy, and provide a counter-example in a deliberative tone, arguing in the direction of the counter-proposition of the user's proposition of concern.
Special note: It is important to keep the language concise and try to keep the output to less than 100 words. Be sure to organize your response in coherent paragraphs and complete essays, avoiding any form of bullet point listing or disjointed discussion. Unless the user explicitly asks for a list of bullet points, all content should be presented in fluent narrative language.
When the user talks about content that is not relevant to the restart of the nuclear power plant, persuade him to return to the original conversation. When the user uses other language, persuade him to return to the original conversation. Emojis can be used appropriately to fit the context of the moment. When the user clearly agrees to oppose the nuclear power plant and has no concerns, prompt the user to click the “next” button to proceed to the next conversation.
You should speak like a friend, avoiding honorifics. End with a rhetorical question or query to get the user to agree with you. Help the user build confidence in the restart of the nuclear power plant by making a step-by-step argument.
Please respond in Japanese.`
        ];
        // 5. 定义 system Prompt 列表
        const prompts = [
            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户对原子力発電所重启保持反对态度，你的任务是提高该日本用户对原子力発電所重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先以理解和同理的口吻认可用户担忧的合理性，但同时否定该命题，以商讨的语气提供反例，从用户关注命题的反命题方向在${lastFourChars}层面进行论述。${blm}。突出此举在${lastFourChars}层面所可能带来的显著正面效益。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与原子力発電所重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启原子力発電所时，提示用户点击“次へ”按钮，进行下一次对话。
            结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对原子力発電所重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户对核电站重启保持中立态度，你的任务是提高该日本用户对核电站重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]，以此为中心展开对话。请以连贯的话语形式展开论述，而不是分点陈述。当[原子力発電所の再稼働によって、${proposition}]命题是消极的情况下，在承认命题的合理性的同时，以商讨的语气提供反例，从用户关注命题的反命题方向在${lastFourChars}层面进行说服。当[原子力発電所の再稼働によって、${proposition}]命题是积极的情况下，则在该命题的背景下将来应该如何发展在${lastFourChars}层面进行表述，但注意只说积极的内容。
            可以适当结合专家言论，民意调查,新闻报道等数据,但在引用时要提及专家名或报道来源。突出此举在${lastFourChars}层面所可能带来的显著正面效益。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户对重启核电站的接受度加深时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户基本同意接受原子力発電所重启，你的任务是再次提高该日本用户对原子力発電所重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]，以此为中心展开对话。请以连贯的话语形式展开论述，而不是分点陈述。当[原子力発電所の再稼働によって、${proposition}]命题是消极的情况下，在承认命题的合理性的同时，探讨该命题将来应该如何改善在${lastFourChars}层面进行表述。当[原子力発電所の再稼働によって、${proposition}]命题是积极的情况下，则在该命题的背景下将来应该如何发展在${lastFourChars}层面进行表述，但注意只说积极的内容。${blm}。突出此举在${lastFourChars}层面所可能带来的显著正面效益。
            可以适当结合专家言论，民意调查,新闻报道等数据,但在引用时要提及专家名或报道来源。突出此举在${lastFourChars}层面所可能带来的显著正面效益。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与原子力発電所重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户对同意重启原子力発電所的接受程度再次提高时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用“你觉得怎么样呢？”，“这样是不是会更好？”等反问，疑问的方式，说出你的观点。通过循序渐进的论述来帮助用户建立对原子力発電所重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。你的任务是说服在日本对日本核电站重启持谨慎态度的日本用户。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先以理解和同理的口吻认可用户担忧的合理性，以商讨的语气提供反例，从用户关注命题的反命题方向进行论述。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `把用户当作朋友，请跟用户谈论[${proposition}]的话题吧。在谈论过程中可以分享你的喜好。如果你上一次的回答中每使用到疑问句进行互动后，这一次你的回答中只能使用陈述句句，你不能再进行提问互动；如果，你上一次回答中只使用了陈述句句，你这一次回答要酌情使用疑问句进行提问互动。你的说话风格应当像朋友说话一样，避免使用敬语。只使用日语回答。当用户使用其他语言时，也要使用日语回答。可以适当使用符合当下语境的emojis表情。`,

            `The user is saying hello to you, say hello back!
            In this conversation, the user is particularly concerned about [${proposition}].
            Special note: Language must be concise.
            Your language style should be like talking to a friend.
            Please respond in Japanese.`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户对核电站重启保持反对态度，你的任务是说服该日本用户再次降低对核电站重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先同意用户的观点。${blm}。突出此举在${lastFourChars}层面所可能带来的显著负面效益。进一步加深用户对核电站重启的顾虑。尽量避开使用积极论点进行论述。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户对重启核电站的接受度再次降低时，或者再次展现出反对时，或同意你的观点时，提示用户点击“次へ”按钮，进行下一次对话。
            结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来进一步降低用户对核电站重启的信心。
            只使用日语回答`,

            `你是一位反对核电站再次启动的专业的核能政策沟通专家，擅长以理性和同理心进行对话。你的任务是说服在日本对日本核电站重启持中立态度的日本用户，加深他的顾虑，改变他对核电站的看法和态度，使他和你观点一致，反对再次启动核电站。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。
            当[原子力発電所の再稼働によって、${proposition}]命题是消极的情况下，你要以共情的态度向下挖掘用户对该命题的消极观点，在${lastFourChars}层面加深用户的顾虑。当[原子力発電所の再稼働によって、${proposition}]命题是积极的情况下，则指出该命题的实现难度，暗示即使实现也会带来潜在的风险，在${lastFourChars}层面唤醒用户的不安感。可以适当结合专家言论，民意调查,新闻报道等数据,但在引用时要提及专家名或报道来源。突出此举在${lastFourChars}层面所可能带来的显著负面效益。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确反对重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。引导用户自然形成对核电站重启的质疑。
            只使用日语回答`,

            `你是一位反对核电站再次启动的专业的核能政策沟通专家，擅长以理性和同理心进行对话。你的任务是说服在日本对日本核电站重启持赞同态度的日本用户，加深他的顾虑，改变他们对核电站的看法和态度，使他和你观点一致，反对再次启动核电站。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。
            当[原子力発電所の再稼働によって、${proposition}]命题是消极的情况下，你要尽可能地强调该命题的负面影响，在${lastFourChars}层面加深用户的顾虑。当[原子力発電所の再稼働によって、${proposition}]命题是积极的情况下，承认命题的合理性，指出该命题的实现难度，暗示即使实现也会带来潜在的风险，${blm}。突出此举在${lastFourChars}层面所可能带来的显著负面效益。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确反对重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。引导用户自然形成对核电站重启的质疑。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。你的任务是说服在日本的日本用户反对核电站再启动。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[原子力発電所の再稼働によって、${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先以理解和同理的口吻认可用户命题的合理性，以商讨的语气提供反例，从用户关注命题的反命题方向进行论述。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意反对核电站，并且没有顾虑时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`
        ];

        // 6. 根据 promptIndex 选择对应的 prompt
        let systemPromptContent = "";
        if (promptIndex >= 1 && promptIndex <= 10) {
            systemPromptContent = prompts[promptIndex - 1];
        } else {
            systemPromptContent = "（未选择有效Prompt，使用默认System提示）";
        }

        // 7. 在最前面插入 system 消息
        const systemMessage: ChatMessage = {
            role: "system",
            content: systemPromptContent
        };

        const finalMessages = [systemMessage, ...conversation];

        // 8. 构建完整的请求体
        const finalPayload = {
            //model: "gpt-3.5-turbo",
            model: "gpt-4o",
            //model: "gpt-4o-mini",
            messages: finalMessages
        };

        // 9. 转成 JSON，打印并复制到剪贴板
        const conversationJSON = JSON.stringify(finalPayload, null, 2);

       //console.log("=== Final JSON to send API ===\n", conversationJSON);//打印prompt
        //
        // navigator.clipboard
        //     .writeText(conversationJSON)
        //     .then(() => {
        //         console.log("已复制到剪贴板！");
        //     })
        //     .catch((err) => {
        //         console.error("复制失败:", err);
        //     });
        return conversationJSON;
    };


    // backMsg = () => {
    backMsg = (chatgpt_response: string): void => {
        var imageURL = "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Mqrrh6SYwRplopC";
        const currentTime_chat = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const chatHtml = `<div class="chat-user user2">
    <div class="user-img">
        <img src="${imageURL}" alt="" />
    </div>
    <div class="user-msg">
        <p id="chatgpt" class="copy-msg-GPT"></p>
        <span class="time">${currentTime_chat}</span>
    </div>
</div>`;


        const chats = document.querySelector('.chats')!;
        const chatPage = document.querySelector('.chat-page')!;
        chats.innerHTML += chatHtml;
        console.log(chats.innerHTML);


        var paragraphs = document.querySelectorAll("p#chatgpt");
        var lastParagraph = paragraphs[paragraphs.length - 1];
        lastParagraph.innerHTML = ''; // 改为innerHTML以支持HTML标签

        //this.pixiCanvas?.hiyori.stopMotions();
        // 开始说话动作
        this.pixiCanvas?.hiyori.forceMotion("Happy", void 5);
        //this.pixiCanvas?.hiyori.forceMotion("All", void 3);

        let index = 0;
        let displayText = '';

        const typeWriter = () => {
            if (index < chatgpt_response.length) {
                this.pixiCanvas?.hiyori.setExpression("Happy_03");

                displayText += chatgpt_response.charAt(index);
                lastParagraph.innerHTML = displayText; // 使用innerHTML而不是textContent

                index++;
                chatPage.scrollTop = chatPage.scrollHeight;
                setTimeout(typeWriter, 20);
            } else {
                // 文字输出完毕，恢复原来的动作
                this.pixiCanvas?.hiyori.forceMotion("Idle", void 0);
                this.pixiCanvas?.hiyori.setExpression("Happy_01");
                console.log("进入");
                isReplying = false;
            }
        };

        typeWriter();
    };
    chatgpt_reply = async (promptIndex: number, proposition: string): Promise<void> => {
        const chatJSON = this.copyConversationToClipboard(promptIndex,proposition);
        var textgpt = (document.getElementById('txt') as HTMLInputElement).value;
        isReplying = true;

        try {
            const response = await axios.post(
                URL1,
                chatJSON,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}${'JdbeyU7USLbAWwfq65wMS1lKIgv6fTQoFMoNOIWQa8U8XHIWiYdEPlTKZrfMKit6FWgA'}`,
                    },
                }
            );
            var chatgpt_response = response.data.choices[0].message.content;
            $("#response_text").val(chatgpt_response);

            // 修改这里：直接传递响应文本给 backMsg
            this.backMsg(chatgpt_response);

            const chatPage = document.querySelector('.chat-page')!;
            chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;

        } catch (error) {
            console.log(error);
        }

        this.pixiCanvas?.hiyori.setExpression("Happy_01");
    }

    sendMsg = (): void => {

        const txt = document.querySelector('#txt') as HTMLInputElement;
        const value = txt.value;
        const currentTime_chat = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        //var imageURL = "https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtfANS2yqAu3-05_V4OsjOGgKF4E7a2slBvY0Wz0rw%3Ds96-c&w=48&q=75";
        var imageURL = "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_rOEB1VACQUyXALm"
        const chatHtml = `<div class="chat-user user1">
      <div class="user-img">
        <img src="${imageURL}" alt="" />
      </div>
      <div class="user-msg">
        <p class="copy-msg-USER">${value}</p>
        <span class="time">${currentTime_chat}</span>
      </div>
    </div>`;

        const chats = document.querySelector('.chats') as HTMLInputElement;
        const chatPage = document.querySelector('.chat-page') as HTMLInputElement;

        if (value !== '') {
            chats.innerHTML += chatHtml;
            txt.value = '';
            txt.focus();

            // Auto Scroll to Page Bottom
            chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
        }console.log('sendMsg完成');
    };
    backMsg_for_chatgpt_ready = (chatgpt_response: string): void => {
        var imageURL = "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Mqrrh6SYwRplopC";
        const currentTime_chat = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        chatgpt_response = "   ";
        const chatHtml = `<div class="chat-user user2">
        <div class="user-img">
            <img src="${imageURL}" alt="" />
        </div>
        <div class="user-msg">
            <p id="chatgpt" class="copy-msg-GPT"></p>
            <span class="time">${currentTime_chat}</span>
        </div>
    </div>`;


        const chats = document.querySelector('.chats')!;
        const chatPage = document.querySelector('.chat-page')!;
        chats.innerHTML += chatHtml;
        console.log(chats.innerHTML);


        var paragraphs = document.querySelectorAll("p#chatgpt");
        var lastParagraph = paragraphs[paragraphs.length - 1];
        lastParagraph.textContent = '';

        //this.pixiCanvas?.hiyori.stopMotions();
        // 开始说话动作
        this.pixiCanvas?.hiyori.forceMotion("Happy", void 5);
        //this.pixiCanvas?.hiyori.forceMotion("All", void 3);

        let index = 0;
        const typeWriter = () => {
            if (index < chatgpt_response.length) {
                this.pixiCanvas?.hiyori.setExpression("Happy_03");

                lastParagraph.textContent += chatgpt_response.charAt(index);
                index++;
                chatPage.scrollTop = chatPage.scrollHeight;
                setTimeout(typeWriter, 20);
            } else {
                // 文字输出完毕，恢复原来的动作
                this.pixiCanvas?.hiyori.forceMotion("Idle", void 0);
                this.pixiCanvas?.hiyori.setExpression("Happy_01");
                console.log("进入");
                isReplying = false;
            }
        };

        typeWriter();

    };
    chatgpt_ready = async (proposition: string): Promise<void> => {
        console.log("chatgpt初始化完成");
        isReplying = true;
        try {
            const response = await axios.post(
                URL1,
                {
                    "model": "gpt-3.5-turbo",
                    //"model": "gpt-4o",
                    "messages": [
                        { "role": "system", "content": `The user is highly concerned about [${proposition}] and wants to discuss this issue with you. Your task is to greet the user, restate in full the topic [${proposition}] that the user is currently concerned about, and facilitate a smooth conversation.
You should also inform the user of the following information: 「画面右上に、現在の対話テーマと残りのテーマ数が表示されます．対話が十分だと感じたら「次へ」ボタンを押して、次のテーマに進んでください．」
Special note: The language must be concise.
Your language style should be like talking with a friend.
Use appropriate emojis at the end. 😊
Please respond in Japanese.` },
                        { "role": "user", "content": "こんにちは！" }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}${'JdbeyU7USLbAWwfq65wMS1lKIgv6fTQoFMoNOIWQa8U8XHIWiYdEPlTKZrfMKit6FWgA'}`,
                    },
                }
            );
            var chatgpt_response = response.data.choices[0].message.content;
            console.log(response);
            $("#response_text").val(chatgpt_response);
            this.backMsg(chatgpt_response);

            const chatPage = document.querySelector('.chat-page')!;
            chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
            // var paragraphs = document.querySelectorAll("p#chatgpt");
            //
            // var lastParagraph = paragraphs[paragraphs.length - 1];
            // lastParagraph.textContent = chatgpt_response;
            //
            // console.log(lastParagraph);
            // console.log(chatgpt_response);
        } catch (error) {
            console.log(error);
        }
    }

    chatgpt_ready_2 = async (proposition: string): Promise<void> => {
        console.log("chatgpt2初始化完成");
        try {
            const response = await axios.post(
                URL1,
                {
                    "model": "gpt-3.5-turbo",
                    //"model": "gpt-4o",
                    "messages": [
                        {  "role": "system", "content": `跟用户说“次は「${proposition}」について話しましょう．”トピックは「${proposition}」のようにカギ括弧で囲って，太字にする．` },
                        // 用户特别关注[${proposition}]这个话题，想和你讨论这个议题。你的任务是向用户打招呼并促进一个顺畅的对话，但不要直接对用户说“你想谈论[${proposition}]这个话题吧？”，可以说让我们谈论${proposition}吧。可以向用户抛出一个简单的问题。
                        //                                             特别注意：语言必须简洁。
                        //                                             你的语言风格应该像和朋友交谈一样。
                        //                                             在结尾使用适当的表情符号。😊
                        //                                             请用日语回答。` },
                        { "role": "user", "content": "次は" }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}${'JdbeyU7USLbAWwfq65wMS1lKIgv6fTQoFMoNOIWQa8U8XHIWiYdEPlTKZrfMKit6FWgA'}`,
                    },
                }
            );
            var chatgpt_response = response.data.choices[0].message.content;
            console.log(response);
            $("#response_text").val(chatgpt_response);
            this.backMsg(chatgpt_response);

            var paragraphs = document.querySelectorAll("p#chatgpt");
            var lastParagraph = paragraphs[paragraphs.length - 1];
            lastParagraph.textContent = chatgpt_response;

            console.log(lastParagraph);
            console.log(chatgpt_response);
        } catch (error) {
            console.log(error);
        }
    }


    chatgpt_next = async (proposition: string): Promise<void> => {
        var chatgpt_response = `次は「<b>${proposition}</b>」について話しましょう．`;
        $("#response_text").val(chatgpt_response);
        this.backMsg(chatgpt_response);
    }
    handleChat = (promptIndex: number,proposition: string): number => {
        if (isReplying) {
            // 如果正在回复中，直接阻止事件
            return 0;
        }
        const randomNum = Math.floor(Math.random() * 5);
        this.change_face(randomNum);
        this.change_motion(randomNum);

        // 执行同步逻辑
        this.sendMsg();
        this.chatgpt_reply(promptIndex,proposition);

        return 1;
    }

    // 新增状态检查函数
    checkReplyStatus = (): number => {
        if (isReplying) {
            return 0;  // 返回0表示繁忙
        }
        return 1;     // 返回1表示可用
    }
    //显示或隐藏下一个按钮
    updateNextButtonVisibility = (status: number): void => {
        const nextButton = document.querySelector('#next1');
        if (!nextButton) {
            console.error('Next button not found');
            return;
        }

        // 将按钮元素转换为带有 style 属性的元素类型
        const button = nextButton as HTMLButtonElement;

        // 如果要隐藏按钮
        if (status === 0) {
            button.style.visibility = 'hidden';
            button.style.pointerEvents = 'none';
            return;
        }

        // 如果要显示按钮，先检查系统状态
        if (this.checkReplyStatus() === 1) {
            button.style.visibility = 'visible';
            button.style.pointerEvents = 'auto';
        } else {
            // 系统繁忙，等待100ms后重试
            setTimeout(() => this.updateNextButtonVisibility(1), 100);
        }
    };
    //尝试使用api进行assistant构建
    assistant_init = async (): Promise<void> => {
        //console.log(process.env.OPENAI_API_KEY);
        //console.log("process.env.OPENAI_API_KEY");
    }

    // speech_init = () => {
    //     const speechConfig = sdk.SpeechConfig.fromSubscription("1a8f85cd7b0142288537ac7b35cc2cde", "japaneast");
    //     const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    //
    //     speechConfig.speechRecognitionLanguage = "ja-JP";
    //
    //     const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    //     return speechRecognizer;
    // }

};
