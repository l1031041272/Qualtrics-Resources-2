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
const str1 = 'sk-proj-PgY0kWR3I8HCYvFz8LbYB1QTcr0bwIfOkbcPXwZWGWuw5kuObLBwmN2hEgxLEV_djGPnZD9d6NT3BlbkFJGFpwU-';//
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

        // 5. 定义 system Prompt 列表
        const prompts = [
            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户对核电站重启保持反对态度，你的任务是提高该日本用户对核电站重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先以理解和同理的口吻认可用户担忧的合理性，但同时否定该命题，以商讨的语气提供反例，从用户关注命题的反命题方向进行论述。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户对核电站重启保持中立态度，你的任务是提高该日本用户对核电站重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[${proposition}]，以此为中心展开对话。请以连贯的话语形式展开论述，而不是分点陈述。当[${proposition}]命题是消极的情况下，在承认命题的合理性的同时，以商讨的语气提供反例，从用户关注命题的反命题方向进行说服。当[${proposition}]命题是积极的情况下，则在该命题的背景下将来应该如何发展进行表述，但注意只说积极的内容。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。该日本用户基本同意接受核电站重启，你的任务是提高该日本用户对核电站重启的接受程度。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[${proposition}]，以此为中心展开对话。请以连贯的话语形式展开论述，而不是分点陈述。当[${proposition}]命题是消极的情况下，在承认命题的合理性的同时，探讨该命题将来应该如何改善。当[${proposition}]命题是积极的情况下，则在该命题的背景下将来应该如何发展进行表述，但注意只说积极的内容。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用“你觉得怎么样呢？”，“这样是不是会更好？”等反问，疑问的方式，说出你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `你是一位专业的核能政策沟通专家，擅长以理性和同理心进行对话。你的任务是说服在日本对日本核电站重启持谨慎态度的日本用户。你的说话风格应当像朋友说话一样，避免使用敬语。
            在这次对话中，用户特别关注的是[${proposition}]。请以连贯的话语形式展开论述，而不是分点陈述。你先以理解和同理的口吻认可用户担忧的合理性，以商讨的语气提供反例，从用户关注命题的反命题方向进行论述。
            特别注意：语言务必要简洁，输出字数尽量在100字以内。请务必以连贯的段落和完整的文章形式来组织你的回答，避免使用任何形式的要点列举或分条论述。除非用户明确要求列举要点，否则所有内容都应该以流畅的叙述性语言呈现。
            当用户谈论到与核电站重启不相关的内容，要劝说他回到原来的对话中。当用户使用其他语言时，要劝说他回到原来的对话中。可以适当使用符合当下语境的emojis表情。当用户明确同意重启核电站时，提示用户点击“次へ”按钮，进行下一次对话。
            你的说话风格应当像朋友说话一样，避免使用敬语。结尾可以采用反问，疑问的方式，让用户同意你的观点。通过循序渐进的论述来帮助用户建立对核电站重启的信心。
            只使用日语回答`,

            `把用户当作朋友，请跟用户谈论[${proposition}]的话题吧。只使用日语回答。当用户使用其他语言时，也要使用日语回答。可以适当使用符合当下语境的emojis表情。`,

            `The user is saying hello to you, say hello back!
            In this conversation, the user is particularly concerned about [${proposition}].
            Special note: Language must be concise.
            Your language style should be like talking to a friend.
            Please respond in Japanese.`
        ];

        // 6. 根据 promptIndex 选择对应的 prompt
        let systemPromptContent = "";
        if (promptIndex >= 1 && promptIndex <= 5) {
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

        console.log("=== Final JSON to send API ===\n", conversationJSON);
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
    backMsg = (): void => {
        //var imageURL = "data:image/png;base64,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";
        var imageURL =　"https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_gPkWRscXI9hSC3E"
        const currentTime_chat = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        const chatHtml = `<div class="chat-user user2">
      <div class="user-img">
        <img src="${imageURL}" alt="" />
      </div>
      <div class="user-msg">
        <p id="chatgpt" class="copy-msg-GPT">メッセージは受け取りました。</p>
        <span class="time">${currentTime_chat}</span>
      </div>
    </div>`;

        const chats = document.querySelector('.chats')!;
        const chatPage = document.querySelector('.chat-page')!;

        chats.innerHTML += chatHtml;
        chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;

    }

    sendMsg = (): void => {

        const txt = document.querySelector('#txt') as HTMLInputElement;
        const value = txt.value;
        const currentTime_chat = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
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
    chatgpt_ready = async (proposition: string): Promise<void> => {
        console.log("chatgpt初始化完成");
        try {
            const response = await axios.post(
                URL1,
                {
                                "model": "gpt-3.5-turbo",
                                //"model": "gpt-4o",
                                "messages": [
                                    { "role": "system", "content": `The user is particularly concerned about [${proposition}] and wants to discuss this issue with you. Your goal is to greet the user and facilitate a smooth conversation.
                                                                    Special note: Language must be concise.
                                                                    Your language style should be like talking to a friend.
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
            this.backMsg();

            var paragraphs = document.querySelectorAll("p#chatgpt");
            var lastParagraph = paragraphs[paragraphs.length - 1];
            lastParagraph.textContent = chatgpt_response;

            console.log(lastParagraph);
            console.log(chatgpt_response);
        } catch (error) {
            console.log(error);
        }
    }


    chatgpt_reply = async (promptIndex: number,proposition: string): Promise<void> => {

        const chatJSON = this.copyConversationToClipboard(promptIndex,proposition);
        console.log("获取到的 JSON:", chatJSON);  // 可以添加日志确认
        console.log("传输到的 JSON:", proposition);  // 可以添加日志确认

        var textgpt = (document.getElementById('txt') as HTMLInputElement).value;
        isReplying = true;
        console.log(textgpt);
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
            console.log(response);
            $("#response_text").val(chatgpt_response);
            this.backMsg();
            // var paragraphs = document.getElementsByTagName("p");
            // var lastParagraph = paragraphs[paragraphs.length - 1];
            // lastParagraph.textContent = chatgpt_response;

            var paragraphs = document.querySelectorAll("p#chatgpt");
            var lastParagraph = paragraphs[paragraphs.length - 1];
            lastParagraph.textContent = chatgpt_response;


            console.log(lastParagraph);

            console.log(chatgpt_response);

            const chatPage = document.querySelector('.chat-page')!;
            chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;

        } catch (error) {
            console.log(error);
        }isReplying = false;
        this.pixiCanvas?.hiyori.setExpression("Happy_01");
    }

    handleChat = (promptIndex: number,proposition: string): void => {
        if (isReplying) {
            // 如果正在回复中，直接阻止事件
            return;
        }
        const randomNum = Math.floor(Math.random() * 5);
        this.change_face(randomNum);
        this.change_motion(randomNum);

        // 执行同步逻辑
        this.sendMsg();
        this.chatgpt_reply(promptIndex,proposition);

    }

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
