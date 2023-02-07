
//http://localhost:40080
//http://192.168.3.10:40080
const serverURL = "http://localhost:50021";
const debug = false;
//const modelPath = "/Resources/Hiyori_2/Hiyori.model3.json";
const modelPath = "/Resources/AModel/AModel/amodel.model3.json";

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
setExpression2();
window.addEventListener("beforeunload",()=>{
    console.log("アンロード");
    indexLibrary.onUnload();
});
function setExpression2(){
    var button = document.getElementById("setExpression2");
    button.onclick = () =>{indexLibrary.App_set_point(1)}
}
function  initExpression() {
    indexLibrary.App_set_point(0)
    console.log("233");
}