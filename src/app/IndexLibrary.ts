//このクラスがおおもとのライブラリで、これをqualtricsまたはindex.htmlで呼び出して使っている。

import "../css/index.scss";
import * as bootstrap from "bootstrap";
import { App } from "./App";
import { ModelPosition } from "./types";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import axios from "axios";

const speechConfig = sdk.SpeechConfig.fromSubscription("1a8f85cd7b0142288537ac7b35cc2cde", "japaneast");
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

speechConfig.speechRecognitionLanguage = "ja-JP";

const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

export default class IndexLibrary {
    private debug: boolean;
    private serverURL: string;
    private modelPath: string;
    private modelPosition: ModelPosition;
    private app: App | null;
    private agent_point: number =0;
    private limit: number =0;
    constructor(debug: boolean, serverURL: string, modelPath: string, modelPosition: ModelPosition) {
        this.debug = debug;
        this.serverURL = serverURL;
        this.modelPosition = modelPosition;
        this.app = null;
        this.modelPath = modelPath;
    }
    onload = () => {
        console.log("DOMLoadedAction");
        this.app = new App(this.debug, this.serverURL, this.modelPath, this.modelPosition); //
        console.log("ロードした");
        this.app.mount();
        console.log("Indexlibrary.ts");
    };
    onUnload = () => {
        console.log("WindowLoadedAction");
        console.log("アンロード");
        this.app?.unmount();
    };

    set_agentpoint = (point: number) => {
        this.agent_point = point;
    }
    set_limit = (limit: number) => {
        this.limit = limit;
    }
    /*****
    App_set_point =() => {
        this.app?.change_face(this.agent_point, this.limit);
    }
     *****/
    App_set_point =(num:number) => {
        this.app?.change_face(num);
    }
    App_set_motion =(num:number) => {
        this.app?.change_motion(num);
    }
    reset_face = () => {
        this.app?.reset_face();
    }

    speech_init = () => {
        return new sdk.SpeechRecognizer(speechConfig, audioConfig);
    }
    speech_start = () => {
        speechRecognizer.startContinuousRecognitionAsync();
    }
    speech_stop = () => {
    speechRecognizer.stopContinuousRecognitionAsync();
    }
    speech_result = () => {
        speechRecognizer.recognized = (s, e) => {
            console.log(e.result.text);
        };

    }
    //使用curl，curl只能进行简单对话//
    sendMsg = () => {//使用curl，curl只能进行简单对话
        this.app?.sendMsg();
    }
    chatgpt_init = (proposition: string) => {//使用curl，curl只能进行简单对话
        this.app?.chatgpt_ready(proposition);
    }

    chatgpt_init_2 = (proposition: string) => {//使用curl，curl只能进行简单对话
        this.app?.chatgpt_ready_2(proposition);
    }
    // chatgpt_reply = (promptIndex: number,proposition: string) => {//使用curl，curl只能进行简单对话
    //     this.app?.chatgpt_reply(promptIndex,proposition);
    // }
    handleChat = (promptIndex: number,proposition: string): number => {//保证GPT回复期间无法发送
        return this.app?.handleChat(promptIndex,proposition) ?? 0;;
    }

    checkReplyStatus = (): number => {//保证GPT回复期间无法发送
        return this.app?.checkReplyStatus() ?? 0;;
    }
    // copyConversationToClipboard = (promptIndex: number,proposition: string) => () => {
    //     this.app?.copyConversationToClipboard(promptIndex,proposition);
    // }
        /////////////////////////////////////////////////////////////

    //尝试使用api进行assistant构建
    assistant_init = () => {
        this.app?.assistant_init();
    }
}

//http://localhost:40080
//http://192.168.3.10:40080

//550, 900, 0.235, 0, -20 モデル全身/
//550, 700, 0.45, 0, 500 モデル顔中心
//225, 350, 0.25, 0, 250
