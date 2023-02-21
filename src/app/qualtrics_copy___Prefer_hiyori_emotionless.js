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
//        "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@ddd90da306fdbaff6b5ad71d120cd2e7343d9a2d/js/IndexLibraryPerfectPrefarence2.js",
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

    that = this;
    images.forEach(function(image) {
        image.addEventListener('click', (e) => {
            $(".sweets").hide();
            modalWrapper.classList.add('show');
            modalImage.classList.add('show');

            var imageSrc = image.getAttribute('src');
            modalImage.src = imageSrc;
//		var className = image.getAttribute('class');
            var classid = e.target.id;
            switch (classid) {
                case "1":
                    switch (items.issue4.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            break;
                    }
                    look_img[0] += 1;
                    break;
                case "2":
                    switch (items.issue2.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            break;
                    }
                    look_img[1] += 1;
                    break;
                case "3":
                    switch (items.issue1.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
                            break;
                    }
                    look_img[2] += 1;
                    break;
                case "4":
                    switch (items.issue3.value){
                        case -1:
                            indexLibrary.App_set_point(2);
                            look_like[0] += 1;
                            break;
                        case 0:
                            indexLibrary.App_set_point(2);
                            look_like[1] += 1;
                            break;
                        case 1:
                            indexLibrary.App_set_point(2);
                            look_like[2] += 1;
                            break;
                        case 2:
                            indexLibrary.App_set_point(2);
                            look_like[3] += 1;
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
            setTimeout(disappear, 6100);

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