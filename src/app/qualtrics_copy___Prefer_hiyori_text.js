var items = {
    'issue1' : {name_JA: '${e://Field/issue1_name}', img_url: '${e://Field/issue1_img}'},
    'issue2' : {name_JA: '${e://Field/issue2_name}', img_url: '${e://Field/issue2_img}'},
    'issue3' : {name_JA: '${e://Field/issue3_name}', img_url: '${e://Field/issue3_img}'},
    'issue4' : {name_JA: '${e://Field/issue4_name}', img_url: '${e://Field/issue4_img}'}
};
var item = ['issue1', 'issue2', 'issue3', 'issue4'];
var look_img = [0, 0, 0, 0];
var look_like= [0, 0, 0, 0];
Qualtrics.SurveyEngine.addOnload(function()
{
    /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/

    preloadImages();
    function preloadImages(){
        for (i = 0; i < item.length; i++){
            if(item[i] == '${e://Field/agent_preference_1st}'){
                switch (i){
                    case 0:
                        items.issue1.value = 2;
                        break;
                    case 1:
                        items.issue2.value = 2;
                        break;
                    case 2:
                        items.issue3.value = 2;
                        break;
                    case 3:
                        items.issue4.value = 2;
                        break;
                }
            } else if(item[i] == '${e://Field/agent_preference_2nd}'){
                switch (i){
                    case 0:
                        items.issue1.value = 1;
                        break;
                    case 1:
                        items.issue2.value = 1;
                        break;
                    case 2:
                        items.issue3.value = 1;
                        break;
                    case 3:
                        items.issue4.value = 1;
                        break;
                }
            } else if(item[i] == '${e://Field/agent_preference_3rd}'){
                switch (i){
                    case 0:
                        items.issue1.value = 0;
                        break;
                    case 1:
                        items.issue2.value = 0;
                        break;
                    case 2:
                        items.issue3.value = 0;
                        break;
                    case 3:
                        items.issue4.value = 0;
                        break;
                }
            } else if(item[i] == '${e://Field/agent_preference_4th}'){
                switch (i){
                    case 0:
                        items.issue1.value = -1;
                        break;
                    case 1:
                        items.issue2.value = -1;
                        break;
                    case 2:
                        items.issue3.value = -1;
                        break;
                    case 3:
                        items.issue4.value = -1;
                        break;
                }
            }
//            document.getElementById(String(i+1)).src = img[ID].src;
//    		var img = document.createElement('img');
//    		img.src = images[i];
        }
        console.log("issue1の価値は " + items.issue1.value);
        console.log("issue2の価値は " + items.issue2.value);
        console.log("issue3の価値は " + items.issue3.value);
        console.log("issue4の価値は " + items.issue4.value);
    }

    jQuery(".QuestionBody").css({width: '1200px ' });
    jQuery("#"+this.questionId+"Separator.Separator").css({margin: '0px ' ,height: '0px',border:'0px'});
    jQuery("#hiyori").css({width: "20%", height: "20%"});

    this.hideNextButton();
    Qualtrics.SurveyEngine.setEmbeddedData("datasets_patern", "A");
    /*console.log("datasets_pattern A")*/



    $('#prefer_1st').html('<td class="cell"><img alt="" class="image L" id="3" src="' +  items["${e://Field/agent_preference_1st}"].img_url + '" width="100%" /></td>');
    $('#prefer_2nd').html('<td class="cell"><img alt="" class="image L" id="1" src="' +  items["${e://Field/agent_preference_2nd}"].img_url + '" width="100%" /></td>');
    $('#prefer_3rd').html('<td class="cell"><img alt="" class="image D" id="2" src="' +  items["${e://Field/agent_preference_3rd}"].img_url + '" width="100%" /></td>');
    $('#prefer_4th').html('<td class="cell"><img alt="" class="image L" id="4" src="' +  items["${e://Field/agent_preference_4th}"].img_url + '" width="100%" /></td>');

});

Qualtrics.SurveyEngine.addOnReady(function()
{
///////////////////////////////////////////////////////
//pixi_Test
    const position = {
        // boxWidth: 2000,
        boxWidth: 500,
        // boxHeight: 700,
        // boxHeight: 2000,
        boxHeight: 700,
        // modelScale: 0.45,
        modelScale: 0.15,
        // modelScale: 0.2,
        modelX: 0,
        // modelY: 500,
//    modelY: 550,
        modelY: 500,
    };
    //////////////////////////////////////

    //VOICEVOXのサーバーアドレス 　サーバーはngrok等でhttps化しないとだめ　
//    const serverURL = "https://a48e-2400-2651-41c2-1500-4405-5e59-5c98-3b57.jp.ngrok.io";
//    const serverURL = "https://706d-133-149-88-260.jp.ngrok.io";
    const serverURL = "localhost://41080";
    const debug = false;
    //const modelPath = "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@39f3aed18d17f3ff893b842a2c5bef6e19af406e/Resources/Hiyori_free_2/hiyori_free_t08_2.model3.json";
    // const modelPath = "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@b05f35ef3939bbf98d15f2faeff0cc2560821826/Resources/Hiyori_free_2/hiyori_free_t08_3.model3.json";
    const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/dist/Resources/AModel/AModel/amodel.model3.json";

    //画面の縦横100%にする
    const skinInner = document.querySelector(".SkinInner");
    skinInner.classList.add("expand-section1");
    //画面の背景色変更
    if (debug === true) {
        skinInner.classList.add("bg-success");
        const body = document.getElementById("SurveyEngineBody");
        body.classList.add("bg-success");
    }

    //背景色
    //const jfe = document.querySelector(".JFE");
    //jfe.classList.add("bg-danger");
    //次ボタンを隠す
    this.hideNextButton();
    const requiredResources = [
        "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
        "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
//          "https://cdn.jsdelivr.net/gh/NomaYasuo/AgentInteraction@f2b34407eebdb25349ff51d2ce3e8cb8b5d9ee58/js/IndexLibrary.js",
        //"https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@ddd90da306fdbaff6b5ad71d120cd2e7343d9a2d/js/IndexLibraryPerfectPrefarence2.js",
        "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/dist/js/IndexLibrary.js",
    ];

    const loadScript = (idx) => {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if (idx + 1 < requiredResources.length) {
                loadScript(idx + 1);
            }
            else {
                initExp();
            }
        });
    };

    const initExp = () => {
        //インスタンス作成＆DOMLoad操作
        console.log("ロード");
        //   constructor(debug, serverURL, modelPath, modelPosition)
        //indexLibrary = new IndexLibrary(debug, modelPath, position);
        indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
        indexLibrary.onload();

    };

    console.log("ロード");
    console.log("スクリプト読み込み");
    loadScript(0);



    // console.log("index_limit",indexLibrary.limit);

    //////////////////////////

    /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/
    /*クリックした画像を拡大表示する*/

    const modalWrapper = document.querySelector('.modal-wrapper');
    const images = document.querySelectorAll('.image');
    const modalImage = document.querySelector('.modal-image');

//var Cars_ID_history = "";
//var Facial_Expression = $('input:hidden[name="FACIAL_EXPRESSION"]').val();

// function draw() {
//     var ctx = document.getElementById('canvas_test').getContext('2d');
//     for (var i = 0; i < 6; i++) {
//       for (var j = 0; j < 6; j++) {
//         // ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
//         //                  Math.floor(255 - 42.5 * j) + ', 0)';
//         // ctx.fillStyle = "rgb(255, 0, 0, 0.1)";
//         ctx.fillRect(j * 25, i * 25, 25, 25);
//       }
//     }
//   }
//   draw();
    const canvas2 = document.getElementById('canvas_chat');
    const ctx2 = canvas2.getContext('2d');
    function make_chat(){

        ctx2.beginPath();
        ctx2.strokeStyle = "rgb(0, 255, 0, 0.1)";
        // ctx2.fillStyle = "rgb(255, 0, 0, 0.1)";
        ctx2.clearRect(0, 0, 1000, 650);
        document.getElementById('canvas_chat').width=0;
        document.getElementById('canvas_chat').width=1000;
        document.getElementById('canvas_chat').height=0;
        document.getElementById('canvas_chat').height=650;

        var chat_leftx = 1100;
        var chat_lefty = 100;
        var lux = 820;
        // var luy = 50;
        var luy = 150;
        var rux = lux+155;
        var ruy = luy;
        var rdx = rux;
        var rdy = luy+400;
        var ldx = lux
        var ldy = rdy;
        ctx2.moveTo(lux-85, luy+260);//口元
        ctx2.quadraticCurveTo(lux-20, luy+280, lux-20, luy+200);
        ctx2.quadraticCurveTo(lux-20, luy+50, lux+15, luy+15);     //左上
        ctx2.quadraticCurveTo((lux+rux)/2, (luy+ruy)/2-50, rux-30, ruy+30);      //右上
        ctx2.quadraticCurveTo((rux+rdx)/2+35, (ruy+rdy)/2, rdx-30, rdy-30);      //右下
        ctx2.quadraticCurveTo((rdx+ldx)/2, (rdy+ldy)/2+40, ldx+20, ldy-20);    //左下
        ctx2.quadraticCurveTo(lux-10, ldy-50, lux-20, luy+310);
        ctx2.quadraticCurveTo(lux-40, luy+280, lux-85, luy+260);     //口元
        ctx2.fillStyle = "rgb(255, 255, 0, 0.1)";
        ctx2.fill();
        ctx2.stroke();
    }

    var multi_flag = 1;
    function hiyori_chat(){
        console.log("multi","a",multi_flag)
        multi_flag += 1;
        multi_flag = multi_flag%10;
        var tmp = multi_flag;
        console.log("multi","b",multi_flag)
        var chat_leftx = 917;
        var chat_lefty = 240;
        //文字列 もじ
        ctx2.fillStyle = "rgb(0, 0, 0, 1)";
        ctx2.font = "20px 'ＭＳ ゴシック'";
        // <img alt="" class="image L" id="1" src="' +  items["${e://Field/agent_preference_2nd}"].img_url + '" width="100%" />
        var nopareto = "もっといい配分がある気がするなぁ..."
        // var countop_to_point = op_item1_point*current_op1 + op_item2_point*current_op2;
        // var countmy_to_point = my_item1_point*current_my1 + my_item2_point*current_my2;

        items.issue4.value
        const emotionlabel = new Image();


        if(classid==1){
            // どちらでもない
            emotionlabel.src=items.issue4.img_url;
            var nopareto = "はまあまあ好き。"
        }
        else if(classid==2){
            // まあまあ好き
            emotionlabel.src=items.issue2.img_url;
            var nopareto = "は好き嫌いどちらでもないな。"
        }
        else if(classid==3){
            // とても好き
            emotionlabel.src=items.issue1.img_url;
            var nopareto = "はとても好きだよ！"
        }else if(classid == 4){
            // 嫌い
            emotionlabel.src=items.issue3.img_url;
            var nopareto = "は嫌い。"
        }
        emotionlabel.onload = ()=>{
            let img_w = emotionlabel.naturalWidth;
            let img_h = emotionlabel.naturalHeight;
            ctx2.drawImage(emotionlabel, chat_leftx-62, chat_lefty-60, img_w/1.5, img_h/1.5);  // ★ここを変更★
        };


        //文字を徐々に入力するやつ
        var former_x = chat_leftx-40;
        var former_y = chat_lefty+20;
        var former_char = "あ";
        for(let i = 0; i < nopareto.length; i++){
            // multi_flag = 0;
            setTimeout(function() {
                console.log("multi_flag","tmp",multi_flag,tmp,i)
                if(multi_flag==tmp){

                    if(former_y >= chat_lefty+300 || former_char=="？"|| former_char=="！"){
                        former_y = chat_lefty+20;
                        former_x -= 30;
                    }
                    console.log("former_x",former_x,former_char,i)
                    if(nopareto[i]=="%"){
                        former_y = chat_lefty+20;
                        former_x -= 30;

                    }
                    else if(former_char=="."){
                        ctx2.fillText(nopareto[i], former_x, former_y+10);
                        former_y += 10;
                        former_char = nopareto[i];

                    }
                    else if(nopareto[i]=="。"){
                        ctx2.fillText(nopareto[i], former_x+12, former_y+7);
                        former_y += 17;
                        former_char = nopareto[i];
                    }
                    else if(nopareto[i]=="、"){
                        ctx2.fillText(nopareto[i], former_x+12, former_y+7);
                        former_y += 17;
                        former_char = nopareto[i];
                    }
                    else{
                        if(nopareto[i]=="w"){
                            if(former_char=="|"){
                                ctx2.fillText(nopareto[i], former_x-10, former_y+23);
                                former_x -= 10;
                                former_y += 23;
                                former_char = nopareto[i];
                                console.log(former_char,"半角",i)
                            }
                            else{
                                ctx2.fillText(nopareto[i], former_x-10, former_y+18);
                                former_x -= 10;
                                former_y += 18;
                                former_char = nopareto[i];
                                console.log(former_char,"半角",i)
                            }
                        }
                        else if(nopareto[i]=="i"){
                            ctx2.fillText(nopareto[i], former_x+17, former_y);
                            former_x += 17;
                            former_char = nopareto[i];
                            console.log(former_char,"半角",i)
                        }
                        else if(nopareto[i]=="n"){
                            ctx2.fillText(nopareto[i], former_x+10, former_y);
                            former_x += 10;
                            former_char = nopareto[i];
                            console.log(former_char,"半角",i)
                        }

                        else if(nopareto[i]=="|"){
                            ctx2.fillText(nopareto[i], former_x-13, former_y+21);
                            former_x -= 17;
                            former_y += 21;
                            former_char = nopareto[i];
                            console.log(former_char,"半角",i)
                        }
                        else if(former_char=="n"){
                            ctx2.fillText(nopareto[i], former_x-17, former_y+21);
                            former_x -= 17;
                            former_y += 21;
                            former_char = nopareto[i];
                            console.log(former_char,"半角",i)
                        }
                        else if (former_char.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
                            ctx2.fillText(nopareto[i], former_x, former_y+19);
                            former_y += 19;
                            former_char = nopareto[i];
                            console.log(former_char,"全角",i)
                        }
                        else{
                            ctx2.fillText(nopareto[i], former_x, former_y+15);
                            former_y += 15;
                            former_char = nopareto[i];
                            console.log(former_char,"半角",i)
                        }


                    }
                }

            }, 40*i);
        }
    }


    that = this;
    var classid = 0;
    images.forEach(function(image) {
        image.addEventListener('click', (e) => {
            $(".sweets").hide();
            modalWrapper.classList.add('show');
            modalImage.classList.add('show');

            var imageSrc = image.getAttribute('src');
            modalImage.src = imageSrc;
//		var className = image.getAttribute('class');
            classid = e.target.id;
            switch (classid) {
                case "1":
                    switch (items.issue4.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                    }
                    look_img[0] += 1;
                    break;
                case "2":
                    switch (items.issue2.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                    }
                    look_img[1] += 1;
                    break;
                case "3":
                    switch (items.issue1.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                    }
                    look_img[2] += 1;
                    break;
                case "4":
                    switch (items.issue3.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            make_chat();
                            hiyori_chat();
                            break;
                    }
                    look_img[3] += 1;
                    break;
            }

            /*
                    //好きな画像の時
                    if (className == "image L"){
                        indexLibrary.App_set_point(2);
            //			count = -1;
            //			like_Change();

                    }
                    //嫌いな画像の時
                    else if (className == "image D"){
                        indexLibrary.App_set_point(0);
            //			count = -1;
            //			dislike_Change();

                    }

            */
            var alpha = 1;
            var time = 1;
            function fadeOut(){
                ctx2.beginPath();
                // ctx2.strokeStyle = "rgb(255, 255, 255, 0.1)";
                // ctx2.fillStyle = "rgb(255, 0, 0, 0.1)";
                ctx2.clearRect(0, 0, 1000, 650);
                document.getElementById('canvas_chat').width=0;
                document.getElementById('canvas_chat').width=1000;
                document.getElementById('canvas_chat').height=0;
                document.getElementById('canvas_chat').height=650;

                var chat_leftx = 1100;
                var chat_lefty = 100;
                var lux = 820;
                // var luy = 50;
                var luy = 150;
                var rux = lux+155;
                var ruy = luy;
                var rdx = rux;
                var rdy = luy+400;
                var ldx = lux
                var ldy = rdy;
                ctx2.moveTo(lux-85, luy+260);//口元
                ctx2.quadraticCurveTo(lux-20, luy+280, lux-20, luy+200);
                ctx2.quadraticCurveTo(lux-20, luy+50, lux+15, luy+15);     //左上
                ctx2.quadraticCurveTo((lux+rux)/2, (luy+ruy)/2-50, rux-30, ruy+30);      //右上
                ctx2.quadraticCurveTo((rux+rdx)/2+35, (ruy+rdy)/2, rdx-30, rdy-30);      //右下
                ctx2.quadraticCurveTo((rdx+ldx)/2, (rdy+ldy)/2+40, ldx+20, ldy-20);    //左下
                ctx2.quadraticCurveTo(lux-10, ldy-50, lux-20, luy+310);
                ctx2.quadraticCurveTo(lux-40, luy+280, lux-85, luy+260);     //口元
                ctx2.fillStyle = "rgb(255, 255, 255, 0.1)";
                ctx2.fill();
                ctx2.strokeStyle = "rgb(255, 255, 255, 0.1)";
                ctx2.stroke();
            }
            // fadeOut();

            setTimeout(disappear, 6100);
            for (i = 0; i < 3; i++){
                setTimeout(fadeOut, 6000+i*100);
            }

//		indexLibrary.App_set_point(5);

//		var ID = image.getAttribute('id');
//		Cars_ID_history += ID+name[ID]+", ";
            /*console.log(Cars_ID_history)*/
//		document.getElementById(ID).src = img[ID].src; //学習済みの画像をグレースケール画像に差し替える
//		image.removeEventListener('click', function() {});

        } ); // ,{once:true}); //画像のクリックは1度に制限する
    });


//拡大した画像を消す
    function disappear(){
        modalWrapper.classList.remove('show');
        modalImage.classList.remove('show');
        modalImage.src = null;
        $(".sweets").show();

        if(look_img.every(sweet => sweet > 0)){
//		$(".cars").hide();
            that.showNextButton();
//		Qualtrics.SurveyEngine.setEmbeddedData("Cars_ID_history", Cars_ID_history);
        }
    }
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    //windowUnLoad時の操作
    if (indexLibrary != null) {
        indexLibrary.onUnload();
    }
    /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/
    console.log("issue1　をクリックした回数" + look_img[2]);
    console.log("　issue2　をクリックした回数" + look_img[1]);
    console.log("issue3をクリックした回数" + look_img[3]);
    console.log("issue4　をクリックした回数" + look_img[0]);

    console.log("嫌いなもの　をクリックした回数" + look_like[0]);
    console.log("普通なもの　をクリックした回数" + look_like[1]);
    console.log("好きなもの　をクリックした回数" + look_like[2]);
    console.log("大好きなものをクリックした回数" + look_like[3]);

});