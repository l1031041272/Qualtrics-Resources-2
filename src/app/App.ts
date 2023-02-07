//test LYU SIQI
import { MyCanvas } from "./MyCanvas";
import * as PIXILive2D from "pixi-live2d-display";
import axios from "axios";
import { ModelPosition } from "./types";
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

    };

    unmount = () => {
        this.pixiCanvas?.destoroy();
        window.speechSynthesis.cancel();
    };

    //3Dテーブルとのマージ分
    change_face = (num: number) => {
        switch (num){
            case 0:
                this.pixiCanvas?.hiyori.setExpression("Anger_06_close");
                break;
            case 1:
                this.pixiCanvas?.hiyori.setExpression("Anger_08_close");
                break;
            case 2:
                this.pixiCanvas?.hiyori.setExpression("Happy_01");
                break;
            case 3:
                this.pixiCanvas?.hiyori.setExpression("Happy_02");
                break;
            case 4:
                this.pixiCanvas?.hiyori.setExpression("Happy_03");
                break;
        }
    };
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
};
