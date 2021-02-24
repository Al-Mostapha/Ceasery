
var DailyTradeMatrialPlayer={};
var EXCHANGE_ITEM;
const  RESOURCE_IMAGE = {
   coin: "images/style/coin.png",
   food: "images/style/food.png",
   wood: "images/style/wood.png",
   stone: "images/style/stone.png",
   metal: "images/style/iron.png",
   population: "images/style/population.png",
   gold:'images/icons/gold.png'
};



var Trading = {
    
    getTradeList: function (){
        $.ajax({
            url: `${API_URL}/api/AExchange/getExchangeItem`,
            data: {
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                EXCHANGE_ITEM = JSON.parse(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        
    },
    
    content_unit : function (Item){
      
         
            var exchangeItem = Item;
            var req_list = "";
            var req    = JSON.parse(Item.req);
            var reword = JSON.parse(Item.reword);
            var image = "";
            
            
            for(var iii in req){
                
                if(req[iii].type === "resource" || req[iii].type === "gold"){
                    image = RESOURCE_IMAGE[ req[iii].resource_type] ;
                  
                }else if(req[iii].type === "matrial"){
                    image = Matrial.image(req[iii].matrial) ;
                }
                
                req_list += `<li class="pull-L">
                                <div class="pic pull-L">
                                    <div class="req-unit-image" style="background-image: url(${image})">
                                    </div>
                                </div>
                                <div class="num stroke ellipsis pull-R">${req[iii].amount}</div>
                            </li>`;

            }
            
            var prize_image = "";
            var prize_name = "";
            var player_amount = "--";
            
            if(reword.type === "matrial"){
                
                prize_image = Matrial.image(reword.matrial);
                prize_name = Matrial.getMatrialName(reword.matrial);
                player_amount = Matrial.getPlayerAmount(reword.matrial);
               
            } else if(reword.type === "equip"){
                prize_image = Equipment.getImage(reword.equip , reword.part, reword.lvl);
                prize_name  = Equipment.getName(reword.equip , reword.part, reword.lvl);
                player_amount = Equipment.getPlayerAmount(reword.equip , reword.part, reword.lvl);
            }

         

            var list = `<li data-index="${Item.id_ex}" matrial_type="${reword.matrial}" class="tooltip_mat matrial_unit exchange-item">
                           <img src=" images/style/Border-up.png" class="border_up"/>
                           <div class="img-inside-box">
                               <div class="player_amount">
                                    <img src="images/icons/shopQuantityBG.png"/>
                                     <p>${player_amount}</p>
                                </div>
                                <div class="wrapper big-img">
                                    <div class="image" style="background-image: url(${prize_image})"></div>
                                </div>
                                <div class="matrial">
                                    <ul class="req-list">`;


             list +=  req_list +     "</ul>"
                            +   "</div>"
                            + "</div>";
                    
             var tail = ' <div class="txt-inside-box">'
                      +                 '<h2>'+ prize_name +'</h2>'
                      +              '</div>'
                      +             '<div  class="tooltip_desc"></div>'
                      +          '</li>';

              return list+tail+"";
       
    },
    
    dailogBox_allMat:  function (category , offset = 1){
       
       
       category = category || "trade-all";
       var all_content_unite = Elkaisar.Item.ItemExchangeBox(category, offset);
        
            
            return `<div class="box_content for_mat_trade" data-page-for="exchange">
                        <div class="left-content">
                            <div class="banner-red">
                                لا توجد فاعلية
                            </div>
                            <div class="fa3lia-img">
                                <img src="images/style/sp.jpg">
                            </div>
                            <p class="fa3lia-p">لا توجد  فاعلية حالية  يمكنك متابعة اخبار الفاعليات  من خلال <a href="http://forum.elkaisar.com/index.php" target="_blank">المنتدى</a></p>
                        </div>
                        <div class="right-content">
                            <ul class='total' mat_table="trade-all">${all_content_unite}</ul>
                            <div class="right-content-footer">
                                <div class="buttons pull-R">
                                    <ul>
                                        <li>
                                            <div class="full-btn full-btn-3x" id="goToMall">
                                                ${Translate.Button.MenuList.BuyItems[UserLag.language]}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="full-btn full-btn-3x">
                                                ${Translate.Button.MenuList.GetSomeGold[UserLag.language]}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="budget pull-L">
                                    <div class="txt">
                                        ${getArabicNumbers(Elkaisar.DPlayer.Player.gold)}: لديك
                                    </div>
                                    <div>
                                        <img src="images/icons/gold_money.jpg">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    },
    
    calPageNum: function ( cat){
     
        var count = 0;
        
        for (var iii in EXCHANGE_ITEM){
            
            if(EXCHANGE_ITEM[iii].cat === cat || !cat){
                count++;
            }
            
        }
        
        return Math.ceil(count/9);
    }
    
    
};


$(document).on("PlayerReady", "html", function (){
    
    Trading.getTradeList();
    
});
$('.menu-list[data-show="trade"]').click(function (){
    Trading.getTradeList();
});

$(document).on("click" ,  "#dialg_box .for_mat_trade .matrial_unit" , function (){
    
    
    var matrial_type = $(this).attr("matrial_type");
    var index = $(this).data("index");
    
    for(var iii in EXCHANGE_ITEM)
        if(Number(EXCHANGE_ITEM[iii].id_ex) === Number(index))
            var exchange = EXCHANGE_ITEM[iii];
    
    var req = JSON.parse(exchange.req);
    var reword = JSON.parse(exchange.reword);
    
    var image = "";
    var req_list = "";
    var right_req_list = "";
    
   
    for(var iii in req){
        
        if(req[iii].type === "resource"){
            image = RESOURCE_IMAGE[ req[iii].resource_type ] ;

        }else if(req[iii].type === "matrial"){
            image = Matrial.image(req[iii].matrial) ;
        }
        
        req_list += `<li class="pull-L">
                        <div class="pic pull-L">
                            <img src="${image}">
                        </div>
                        <div class="num stroke ellipsis pull-R">${req[iii].amount}</div>
                    </li>`;

    }
    for(var iii in req){
        
        if(req[iii].type === "resource"){
            image = RESOURCE_IMAGE[ req[iii].resource_type ] ;

        }else if(req[iii].type === "matrial"){
            image = Matrial.image(req[iii].matrial) ;
        }
        
        right_req_list += `<li>
                        <div class="image pull-L">
                            <img src="${image}"/>
                        </div>
                        <div class="amount pull-L">
                            ${req[iii].amount}
                        </div>
                    </li>`;

    }   
    
    var prize_image = "";
    var prize_name = "";
    var player_amount = "--";
    var desc = "";
    var long_desc = "";
    if(reword.type === "matrial"){
                
        prize_image = Matrial.image(reword.matrial);
        prize_name = Matrial.getMatrialName(reword.matrial);
        player_amount = Matrial.getPlayerAmount(reword.matrial);
        long_desc = Matrial.getMatrial(reword.matrial).long_desc;
        desc = Matrial.getMatrial(reword.matrial).desc;

    } else if(reword.type === "equip"){
        
        prize_image   = Equipment.getImage(reword.equip , reword.part, reword.lvl);
        prize_name    = Equipment.getName(reword.equip , reword.part, reword.lvl);
        long_desc     = Equipment.getEquipData(reword.equip , reword.part , reword.lvl).long_desc;
        desc          = Equipment.getEquipData(reword.equip , reword.part, reword.lvl).desc;
        player_amount = Equipment.getPlayerAmount(reword.equip , reword.part, reword.lvl);
    }

    
    var confirm_box = `<div id="matral-box-use" class="bg-general"> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">${Translate.Button.MenuList.Buy[UserLag.language]}</div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="matrial-show matrial-trade-show">        
                                <div class="row-2">
                                    <div class="pull-L left">
                                        <img src="${prize_image}">
                                        <ul> 
                                            ${req_list}
                                        </ul>

                                        <div class="mat_desc">
                                            ${long_desc}
                                        </div>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="name">
                                            ${prize_name} 
                                        </div>
                                        <div class="req">
                                            <ul>
                                                ${right_req_list}
                                            </ul>
                                        </div>
                                        <div class="item-left">
                                            <label>المواد المتبقية:</label>
                                            <span>${exchange.player_max - exchange.take_times}</span>
                                        </div>
                                        <div class="prom">
                                            <label>قسطور</label>
                                        </div>
                                        <div class="max-limit">
                                            <label>الحد الاقصى للمواد:</label>
                                            <span>${exchange.player_max} </span>
                                        </div>
                                    </div>
                                </div>  

                                <div class="row-3">        
                                    <div class="confim-btn">            
                                        <button class="full-btn full-btn-3x  pull-R enter" id="buyTradeItem" data-trade-index="${index}">${Translate.Button.MenuList.Buy[UserLag.language]}</button>  
                                        <input type="text" min="1" step="1" class="pull-L only_num input" max="${exchange.player_max - exchange.take_times}" id="amount_to_trade" value="1">
                                        <div class="number-arrow-wrapper pull-L">
                                            <label class="number-arrow up"></label>
                                            <label class="number-arrow down"></label>
                                        </div>
                                    </div>    
                                </div>
                            </div>    
                        </div>`;
    $("body").append(confirm_box);
    
});


function buyTradeMatral(index){
    
    for(var iii in EXCHANGE_ITEM)
        if(Number(EXCHANGE_ITEM[iii].id_ex) === Number(index))
            var exchange = EXCHANGE_ITEM[iii];
    
    var req    = JSON.parse(exchange.req);
    var reword = JSON.parse(exchange.reword);
    var amountToTrade = Number($("#amount_to_trade").val()) || 1;
    if(amountToTrade < 1)
        return;
    
    for(var iii in req){
        
        if(req[iii].type === "matrial"){
            
             if(Number(Matrial.getPlayerAmount(req[iii].matrial)) < Number(req[iii].amount)*amountToTrade) {
            
                alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المواد");
                return ;
            }
        }else if(req[iii].type === "resource"){
            
            if(Number(Elkaisar.CurrentCity.City[req[iii].resource_type])< Number( req[iii].amount)*amountToTrade ) {
            
                alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من الموارد");
                return ;
            }
            
        }else if(req[iii].type === "equip"){
            
            if(Equipment.getPlayerAmount(reword.equip , reword.part , reword.lvl) < req[iii].amount*amountToTrade){
                alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المعدات");
                return ;
            }
            
            
        }
        
    }

       
    
    
    if(reword.type === "matrial"){
        if(Number(exchange.max_to_have) < Number(Matrial.getPlayerAmount(reword.matrial)) + amountToTrade ){
            alert_box.confirmMessage("لقد تجاوزت الحد الاقصى للمواد");
            return ;

        } 
    }else if(reword.type === "equip"){
        if(Number(exchange.max_to_have) <  Number(Equipment.getPlayerAmount(reword.equip , reword.part, reword.lvl)) + amountToTrade ){
        
            alert_box.confirmMessage("لقد تجاوزت الحد الاقصى للمعدات");
            return ;

        } 
    }
    
        
        $.ajax({
            
            url: `${API_URL}/api/AExchange/buyExchange`,
            type: 'POST',
            data:{
                idExchange    : exchange.id_ex,
                idCity        : Elkaisar.CurrentCity.City.id_city,
                amountToTrade : amountToTrade,
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer
            },
            beforeSend: function (xhr) {
                waitCursor();
                $("#alert_box button").attr("disabled" , "disabled");
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var jsonData = JSON.parse(data);
                
                if(jsonData.state === 'ok'){
                    
                    exchange.take_times = Number(exchange.take_times) + amountToTrade;
                    
                    $(".close-alert_container").click();

                    var reword = JSON.parse(exchange.reword);

                    if(reword.type === "matrial"){

                        Matrial.givePlayer(reword.matrial , reword.amount*amountToTrade);

                    }else if(reword.type === "equip"){

                        Elkaisar.Equip.getPlayerEquip().done(function (){

                            $("#dialg_box .nav_bar .left-nav .selected").click();

                        });

                    }


                    for(var iii in req){

                        if(req[iii].type === "matrial"){

                            Matrial.takeFrom(req[iii].matrial , req[iii].amount*amountToTrade);

                        }else if(req[iii].type === "resource"){

                            Elkaisar.CurrentCity.City[req[iii].resource_type] -= req[iii].amount*amountToTrade;

                        }
                    }

                    alert_box.succesMessage("تم التبادل بنجاح");
                    
                    
                }else if(jsonData.state === "error_1"){
                    
                    alert_box.confirmMessage("لقد استنفذت الحد اليومى المسموح من التبادل");
                    
                }else if(jsonData.state === "error_2"){
                    
                    alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المواد");
                    
                }else if(jsonData.state === "error_3"){
                    
                    alert_box.confirmMessage("تم استنفاذ العدد الاقصى المسموح بالسيرفر");
                    
                }else if(jsonData.state === "error_4"){
                    
                    alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المواد");
                    
                }else if(jsonData.state === "error_5"){
                    
                    alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المعدات");
                    
                }else if(jsonData.state === "error_over_max"){
                    alert_box.confirmMessage("لقد وصلت الى الحد الاقصى من الجوائز");
                }else{
                    alert(data);
                }
                
                city_profile.refresh_resource_view();
                $("#dialg_box .nav_bar .left-nav .selected").click();
               
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
}

//<button class="full-btn full-btn-3x  pull-R enter" id="buyTradeItem" data-trade-index="${index}" onclick="buyTradeMatral('${index}')">${Translate.Button.MenuList.Buy[UserLag.language]}</button>
$(document).on("click", "#buyTradeItem", function (){
    var index = $(this).attr("data-trade-index");
    buyTradeMatral(index);
});var BATTEL_REPORTS = {};

var Reports = {
    chang_content_leaving: function () {

        var all_lines = "";
        Reports.refresh_content_leaving();
        
        $.ajax({
            url: `${API_URL}/api/ABattelRunning/getLeavingHero`,
            data: {
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                Elkaisar.Battel.LeavinHeros = JSON.parse(data);
                Reports.refresh_content_leaving();


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },
    refresh_content_leaving: function () {
        var all_lines = "";
        var all = Elkaisar.Battel.LeavinHeros;
        for (var iii = 0; iii < 16; iii++) {



            if (all[iii]) {
                var arrive_date = new Date(all[iii].time_end * 1000);
                var Hero = Elkaisar.Hero.getHero(all[iii].id_hero);
                all_lines += `<div class="tr" id_battel = "${all[iii].id_battel}"  id_hero="${all[iii].id_hero}">
                                    <div class="td_1">${BATTAL_TASKS[all[iii].task].ar_title}</div>
                                    <div class="td_2">[${(all[iii].y_city)} , ${(all[iii].x_city)} ] &nbsp; &nbsp; ${Elkaisar.City.getCity(Hero.Hero.id_city).City.name}</div>
                                    <div class="td_3">[${(all[iii].y_coord)} , ${(all[iii].x_coord)} ]</div>
                                    <div class="td_4">${(arrive_date.getHours()) + ":" + (arrive_date.getMinutes()) + ':' + (arrive_date.getSeconds())}</div>
                                    <div class="td_5 time_counter" time-end="${all[iii].time_end}"> ${changeTimeFormat(all[iii].time_end - Date.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x battel_hero_back"> استرجاع</button>
                                    </div>
                                </div>
                                `;
            } else {
                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }

        var output = `<div class="box_content for_report ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_4 ellipsis">${Translate.Title.TH.ArrivalTime[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                   ${all_lines} 
                            </div>
                        </div>`;

        $(".for_report").replaceWith(output);
    },
    change_content_heroBack: function () {

        $.ajax({
            url: `${API_URL}/api/ABattelRunning/getHeroBack`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            beforeSend: function (xhr) {
                Reports.refresh_content_heroBack();
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data)) 
                    return Elkaisar.LBase.Error(data);
                
                Elkaisar.Battel.HeroBack = JSON.parse(data);
                Reports.refresh_content_heroBack();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });


    },
    refresh_content_heroBack: function (){
        var all_lines = "";
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.HeroBack[iii]) {

                var arrive_date = new Date(Elkaisar.Battel.HeroBack[iii].time_back * 1000);

                all_lines += `<div class="tr" id_hero="${Elkaisar.Battel.HeroBack[iii].id_hero}">
                                    <div class="td_1">${Elkaisar.Battel.HeroBack[iii].Task < 5 ? "عودة من" : ""} ${BATTAL_TASKS[Elkaisar.Battel.HeroBack[iii].Task].ar_title}</div>
                                    <div class="td_2">[${(Elkaisar.Battel.HeroBack[iii].yFrom)} , ${(Elkaisar.Battel.HeroBack[iii].xFrom)} ] &nbsp; &nbsp; ${Elkaisar.City.getCityByCoord(Elkaisar.Battel.HeroBack[iii].xTo, Elkaisar.Battel.HeroBack[iii].yTo).City.name}</div>
                                    <div class="td_3">[${(Elkaisar.Battel.HeroBack[iii].yTo)} , ${(Elkaisar.Battel.HeroBack[iii].xTo)} ]</div>
                                    <div class="td_4">${(arrive_date.getHours()) + ":" + (arrive_date.getMinutes())}</div>
                                    <div class="td_5 time_counter" time-end="${Elkaisar.Battel.HeroBack[iii].time_back}"> ${changeTimeFormat(Elkaisar.Battel.HeroBack[iii].time_back - Date.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x show_hero_back show-hero-detailed-review" data-id-hero="${Elkaisar.Battel.HeroBack[iii].id_hero}"> ${Translate.Button.MenuList.View[UserLag.language]}</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }



        var output = `<div class="box_content for_report hero_back_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_4 ellipsis">${Translate.Title.TH.ArrivalTime[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                    ${all_lines} 
                            </div>  
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
        $("#dialg_box .nicescroll-rails").remove();
    },
    change_content_GarrisonUnits: function () {
        Reports.refresh_content_GarrisonUnits();
        $.ajax({
            url: `${API_URL}/api/ABattelRunning/getGarrisonHeros`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                
                Elkaisar.Battel.HeroGarrison = JSON.parse(data);
                Reports.refresh_content_GarrisonUnits();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });



    },
    refresh_content_GarrisonUnits: function (){
        
        var all_lines = "";
       
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.HeroGarrison[iii]) {
                 var Unit = WorldUnit.getWorldUnit(Elkaisar.Battel.HeroGarrison[iii].x_coord, Elkaisar.Battel.HeroGarrison[iii].y_coord);
                all_lines += `<div class="tr">
                                    <div class="td_1">[${Elkaisar.Battel.HeroGarrison[iii].x_coord} , ${Elkaisar.Battel.HeroGarrison[iii].y_coord}]</div>
                                    <div class="td_2">${Elkaisar.City.getCity(Elkaisar.Hero.getHero(Elkaisar.Battel.HeroGarrison[iii].id_hero)).City.name}</div>
                                    <div class="td_3">${Elkaisar.Hero.getHero(Elkaisar.Battel.HeroGarrison[iii].id_hero).Hero.name}</div>
                                    <div class="td_4">${WorldUnit.isCity(Unit.ut) ? "مدينة" : `${Elkaisar.World.UnitTypeData[Unit.ut].Title} مستوى ${Unit.l}`}</div>
                                    <div class="td_5"> ----</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x small show_hero show-hero-detailed-review" data-id-hero="${Elkaisar.Battel.HeroGarrison[iii].id_hero}"> ${Translate.Button.MenuList.View[UserLag.language]}</button>
                                        <button class="full-btn full-btn-3x small hero_back_from_garrison" data-id-hero="${Elkaisar.Battel.HeroGarrison[iii].id_hero}"> استرجاع</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }



        var output = ` <div class="box_content for_report hero_garrison_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.Hero[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                  ${all_lines} 
                            </div>
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
        $("#dialg_box .nicescroll-rails").remove();
        
    },
    change_content_SpyTask: function () {
        
        Reports.refresh_content_SpyTask();
        $.ajax({
            url: `${API_URL}/api/ABattelRunning/getSpyRuning`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                Elkaisar.Battel.SpyingList = JSON.parse(data);
                Reports.refresh_content_SpyTask();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });



    },
    refresh_content_SpyTask: function (){
        var all_lines = "";
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.SpyingList[iii]) {
                var Unit = WorldUnit.getWorldUnit(Elkaisar.Battel.SpyingList[iii].x_to, Elkaisar.Battel.SpyingList[iii].y_to)
                all_lines += `<div class="tr">
                                    <div class="td_1">[${Elkaisar.Battel.SpyingList[iii].x_to} , ${Elkaisar.Battel.SpyingList[iii].y_to}]</div>
                                    <div class="td_2">${Elkaisar.City.getCity(Elkaisar.Battel.SpyingList[iii].id_city).City.name}</div>
                                    <div class="td_3">${Elkaisar.Battel.SpyingList[iii].spy_num}</div>
                                    <div class="td_4">${WorldUnit.isCity(Unit.ut) ?  "مدينة" : `${getUnitTitle(Unit.ut)} مستوى ${Unit.l}`}</div>
                                    <div class="td_5 time_counter" time-end="${Elkaisar.Battel.SpyingList[iii].time_arrive}">${changeTimeFormat(Elkaisar.Battel.SpyingList[iii].time_arrive - $.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x cansel_spy" data-id-spy="${Elkaisar.Battel.SpyingList[iii].id_spy}">${Translate.Button.General.Cancel[UserLag.language]}</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }
        }
        
        var output = `<div class="box_content for_report spy_task_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.Scout[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                  ${all_lines}
                            </div>
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
    }

};



/*  retreat from battel */
$(document).on("click", ".battel_hero_back", function () {

    var id_hero = $(this).parents(".tr").attr("id_hero");
    var id_battel = $(this).parents(".tr").attr("id_battel");
    var self_ = $(this);
    alert_box.confirmDialog("تاكيد انسحاب البطل ", function () {


        var flag_check = false;

        var json_obj = {
            url: "Battel/abort",
            data: {
                idHero: id_hero
            }
        };
        ws.send(JSON.stringify(json_obj));
        flag_check = true;
    });

});



$(document).on("click", ".cansel_spy", function () {

    var id_spy = $(this).attr("data-id-spy");

    alert_box.confirmDialog("تاكيد الغاء عملية التجسس", function () {
        var idCity = Elkaisar.CurrentCity.City.idCity;
        $.ajax({

            url: `${API_URL}/api/ASpy/cancel`,
            data: {
                idSpy  : id_spy,
                idCity : idCity,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                Reports.change_content_SpyTask();
                alert_box.succesMessage("تم الغاء عملبة التجسس بنجاح");
                PLAYER_NOTIF.spy_task -= 1;
                Fixed.refreshPlayerNotif();
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                city_profile.refresh_army_view();
                city_profile.refresh_resource_view();
                


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });

});


$(document).on("click", ".hero_back_from_garrison", function () {

    var id_hero = Number($(this).attr("data-id-hero"));
    var self_ = $(this);

    alert_box.confirmDialog("تأكيد سحب البطل ", function () {
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        $.ajax({
            url: `${API_URL}/api/ACityPalace/removeHeroFromGarrison`,
            data: {
                idHero : id_hero,
                idCity : idCity,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                if (JsonObject.state === "ok") {

                    alert_box.succesMessage("تم  سحب البطل بنجاح");
                    
                    Elkaisar.Battel.HeroGarrison        =  JsonObject.Garrison;
                    Elkaisar.Hero.getHero(id_hero).Hero = JsonObject.Hero;
                    Reports.refresh_content_GarrisonUnits();
                    city_profile.refresh_hero_view();

                } else {
                    alert(data);
                    console.log(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});




var Dominant = {};



$(document).on("click", ".left-nav ul  li", function () {
    $(".left-nav ul  li").each(function (el) {
        $(this).removeClass("selected")
    });
    $(this).addClass("selected");
    $("#dialg_box .nicescroll-rails").remove();

    var head_title = $(this).attr("head_title");
    switch (head_title) {
        // فيها صفحة الرئيسى ف الموارد
        case "colonizer-city":
            Dominant.cityColonizer();
            break;
        case "my-colonized-city":
            Dominant.MyColonizedCity();
            break;
    }
});

Dominant.dialogBox = function () {

    return  menu_bar.dialogBox(Translate.Title.MenuList.Dominance[UserLag.language], NavBar.Dominance, `<div id="WORLD_UNIT_DOMINANT" class="box_content"></div>`, 0);
};

Dominant.armyCapital = function () {
    $.ajax({

        url: "api/dominant.php",
        data: {

            GET_ARMY_CAPITAL_DOMINANT: true

        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (isJson(data)) {
                var jsonData = JSON.parse(data);
                console.log(jsonData)
            } else {
                alert(data);
                return;
            }

            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:25%">${Translate.Title.TH.Capital[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:30%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:10%">${Translate.Title.TH.Duration[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width:15%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii in jsonData.unit) {

                if (jsonData.unit[iii].rank.length > 0) {
                    var duration = 0;
                    if (jsonData.type === "rank") {
                        duration = jsonData.unit[iii].rank[0].d_sum;
                    } else if (jsonData.type === "domain") {

                        duration = Math.floor(Date.now() / 1000 - jsonData.unit[iii].rank[0].time_stamp);

                    }


                    list += `<div class="tr">
                                 <div class="td_1" style="width:25%">${jsonData.unit[iii].title}</div>
                                 <div class="td_2" style="width:20%">[${jsonData.unit[iii].x} , ${jsonData.unit[iii].y}]</div>
                                 <div class="td_3" style="width:30%">${jsonData.unit[iii].rank[0].name}</div>
                                 <div class="td_4 rtl" style="width:10%">${`${Math.floor(duration / 60)} د ${duration % 60} ث`}</div>
                                 <div class="td_5" style="width:15%">
                                     <button class="full-btn-3x open-world-unit" data-x-coord="${jsonData.unit[iii].x}" data-y-coord="${jsonData.unit[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                 </div>
                             </div>`;
                } else {

                    list += `<div class="tr">
                                <div class="td_1" style="width:25%">${jsonData.unit[iii].title}</div>
                                <div class="td_2" style="width:20%">[${jsonData.unit[iii].x} , ${jsonData.unit[iii].y}]</div>
                                <div class="td_3" style="width:30%">----</div>
                                <div class="td_4" style="width:10%">----</div>
                                <div class="td_5" style="width:15%">
                                    <button class="full-btn-3x open-world-unit"  data-x-coord="${jsonData.unit[iii].x}" data-y-coord="${jsonData.unit[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                </div>
                            </div>`;

                }

            }
            var content = `<div class="left-content full">
                            ${list}
                            <div class="tr"></div><div class="tr"></div>
                            <div class="tr"></div><div class="tr"></div>
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};

Dominant.cityColonizer = function () {
    $.ajax({

        url: `${API_URL}/api/ADominant/getCityColonizer`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var jsonData = JSON.parse(data);

            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:15%">المدينة</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:15%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:25%">التاريخ</div>
                            <div class="td_5 ellipsis" style="width:25%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii = 0; iii < 10; iii++)
            {
                if (jsonData[iii]) {
                    list += `<div class="tr">
                                 <div class="td_1" style="width:15%">${jsonData[iii].CityName}</div>
                                 <div class="td_2" style="width:20%">[${jsonData[iii].x} , ${jsonData[iii].y}]</div>
                                 <div class="td_3" style="width:15%">${jsonData[iii].PlayerName}</div>
                                 <div class="td_4 rtl" style="width:25%">${dateTimeFormatShort(new Date(jsonData[iii].time_stamp))}</div>
                                 <div class="td_5" style="width:25%">
                                     <button class="full-btn-3x open-world-unit" style="width: 25%" data-x-coord="${jsonData[iii].x}" data-y-coord="${jsonData[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                     <button class="full-btn-3x abondonColonizedCity" style="width: 25%; height: 26px" data-id-city="${jsonData[iii].id_city_colonized}">تخلى</button>
                                 </div>
                             </div>`;
                } else {
                    list += `<div class="tr"></div>`;
                }
            }

            var content = `<div class="left-content full">
                            ${list}
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};

Dominant.MyColonizedCity = function () {
    $.ajax({

        url: `${API_URL}/api/ADominant/getCityColonized`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var jsonData = JSON.parse(data);

            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:25%">المدينة</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:30%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:10%">${Translate.Title.TH.Duration[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width:15%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii = 0; iii < 10; iii++)
            {
                if (jsonData[iii]) {
                    list += `<div class="tr">
                                 <div class="td_1" style="width:25%">${jsonData[iii].CityName}</div>
                                 <div class="td_2" style="width:20%">[${jsonData[iii].x} , ${jsonData[iii].y}]</div>
                                 <div class="td_3" style="width:30%">${jsonData[iii].PlayerName}</div>
                                 <div class="td_4 rtl" style="width:10%">${dateTimeFormatShort(new Date(jsonData[iii].time_stamp))}</div>
                                 <div class="td_5" style="width:15%">
                                     <button class="full-btn-3x open-world-unit" style="width: 25%" data-x-coord="${jsonData[iii].x}" data-y-coord="${jsonData[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                     <button class="full-btn-3x  fireColonizer" style="width: 25%; height: 26px" data-id-city="${jsonData[iii].id_city_colonized}">طرد المستعمر</button>
                                 </div>
                             </div>`;
                } else {
                    list += `<div class="tr"></div>`;
                }
            }

            var content = `<div class="left-content full">
                            ${list}
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};




$(document).on("click", ".open-world-unit", function () {

    var x_coord = $(this).attr("data-x-coord");
    var y_coord = $(this).attr("data-y-coord");
    $("#dialg_box").slideUp("fast", function () {
        $("#dialg_box").remove();
        uniteMapClick(x_coord, y_coord);
    });

});


$(document).on("click", ".abondonColonizedCity", function () {

    var idCity = $(this).attr("data-id-city");
    $.ajax({
        url: `${API_URL}/api/ADominant/abondonColonizedCity`,
        data: {
            idCity: idCity,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);
            Dominant.cityColonizer();
            if (JsonObject.state === "ok") {
                alert_box.succesMessage("تم التخلى بنجاح");
                Elkaisar.City.getCityBase();
            } else {
                alert_box.confirmMessage("لست المسيطر على المدينة");
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});


$(document).on("click", ".fireColonizer", function () {

    var idCity = $(this).attr("data-id-city");

    alert_box.confirmDialog("تاكيد طرد المستعمر مقابل 1 مساعدة حرية", function () {
        $.ajax({
            url: `${API_URL}/api/ADominant/fireColonizer`,
            data: {
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);
                Dominant.cityColonizer();
                if (JsonObject.state === "ok") {
                    alert_box.succesMessage("تم  الطرد بنجاح");
                    Elkaisar.City.getCityBase();
                } else if (JsonObject.state === "error_1") {
                    alert_box.confirmMessage("لا توجد مواد كافية ");
                } else {
                    alert_box.confirmMessage("لست المسيطر على المدينة");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    });
});

Elkaisar.Item.ItemBox = function(Box, pageOffset = 1)
{
    var ListString    = "";
    var ListOfItem    = Matrial.listOf(Box);
    var FilteredList  = {};
    var currentOffset = 0;
    
    var maxPageCount = Math.ceil(Object.keys(ListOfItem).filter(It => Matrial.getPlayerAmount(It) > 0).length/12);
    
    if(pageOffset > maxPageCount)
        return "";
    if(pageOffset < 1)
        return "";
   
    
    
    
    $("#page-nav-holder").html(`${pageOffset}/${Math.ceil(Object.keys(ListOfItem).filter(It => Matrial.getPlayerAmount(It) > 0).length/12)}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "box-item");
    for(var iii in ListOfItem)
    {
        
        if(Matrial.getPlayerAmount(iii) <= 0)
            continue;
        currentOffset++;
        
        if(currentOffset >  pageOffset*12)
            break;
        if(currentOffset <= (pageOffset - 1) *12)
            continue;
        
        FilteredList[iii] = ListOfItem[iii];
    }
    
    for (var iii in FilteredList)
        ListString += Matrial.itemUnitWidget(iii, false);
    
    return ListString;
    
};


Elkaisar.Item.ItemMallBox = function(Box, pageOffset = 1)
{
    
    var ListString    = "";
    var ListOfItem    = Matrial.listOf(Box);
    var FilteredList  = {};
    var currentOffset = 0;
    
    var maxPageCount = Math.ceil(Object.keys(ListOfItem).filter(It =>ListOfItem[It].gold > 0).length/12);
    
    if(pageOffset > maxPageCount)
        return ;
    if(pageOffset < 1)
        return ;
    
    $("#page-nav-holder").html(`${pageOffset}/${Math.ceil(Object.keys(ListOfItem).filter(It =>ListOfItem[It].gold > 0).length/12)}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "mall");
    for(var iii in ListOfItem)
    {
        
        if(ListOfItem[iii].gold <= 0)
            continue;
        currentOffset++;
        
        if(currentOffset >  pageOffset*12)
            break;
        if(currentOffset <= (pageOffset - 1) *12)
            continue;
        
        FilteredList[iii] = ListOfItem[iii];
    }
    
    for (var iii in FilteredList)
        ListString += Matrial.itemUnitWidget(iii, true);
    
    return ListString;
    
};

Elkaisar.Item.ItemExchangeBox = function(Box, pageOffset = 1)
{
    
    var ListString    = "";
    var FilteredList  = [];
    var currentOffset = 0;
    
    var maxPageCount = Math.ceil(EXCHANGE_ITEM.filter(It => It.cat  === Box || Box === "trade-all").length/9);
    
    if(pageOffset > maxPageCount)
        return "";
    if(pageOffset < 1)
        return "";
    
    $("#page-nav-holder").html(`${pageOffset}/${maxPageCount}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "exchange");
    
   
            
    for(var iii in EXCHANGE_ITEM)
    {
        currentOffset++;
        
        if(currentOffset >  pageOffset*9)
            break;
        if(currentOffset <= (pageOffset - 1) *9)
            continue;
        
        FilteredList.push(EXCHANGE_ITEM[iii]);
    }
    
    for (var iii in FilteredList)
        ListString += Trading.content_unit(FilteredList[iii]);
    
    
    return ListString;
    
};

Elkaisar.Item.EquipBox = function(pageOffset = 1)
{

    var all_equip = "";
    var FilteredList  = [];
    var currentOffset = 0;
    
    var maxPageCount = Math.ceil(Elkaisar.DPlayer.Equip.filter(It => !It.id_hero).length/12);
    
    if(pageOffset > maxPageCount)
        return ;
    if(pageOffset < 1)
        return ;
    
    $("#page-nav-holder").html(`${pageOffset}/${maxPageCount}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", "equip");
    $(".box_content").attr("data-page-for", "equip");
    
     for(var iii in Elkaisar.DPlayer.Equip)
    {
        
        if(Elkaisar.DPlayer.Equip[iii].id_hero)
            continue;
        currentOffset++;
        
        if(currentOffset >  pageOffset*12)
            break;
        if(currentOffset <= (pageOffset - 1) *12)
            continue;
        
        FilteredList.push(Elkaisar.DPlayer.Equip[iii]);
    }
    
    for (var iii in FilteredList)
         all_equip += `  <li class="matrial_unit" data-id-equip="${FilteredList[iii].id_equip}">
                            <img src=" images/style/Border-up.png" class="border_up"/>
                            <div class="img-inside-box">
                                 <img src="${Equipment.getImage(FilteredList[iii].type, FilteredList[iii].part, FilteredList[iii].lvl)}" class="big-img equip-unit" data-equi-part="${FilteredList[iii].part}" data-equi-type="${FilteredList[iii].type}" data-equi-lvl="${FilteredList[iii].lvl}">
                             </div>
                             <div class="txt-inside-box">
                                 <h2>${Equipment.getName(FilteredList[iii].type, FilteredList[iii].part, FilteredList[iii].lvl)}</h2>
                             </div>
                         </li>`;
    
    return all_equip;
    
};


$(document).on("click", "#nav-item-box-right", function (){
    
    var currentOffset = Number($(this).attr("data-current-offset"));
    var PageFor       = $(".box_content").attr("data-page-for");
    
    if(PageFor === "mall")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1));
    if(PageFor === "box-item")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox    ($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1));
    if(PageFor === "equip")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.EquipBox    (currentOffset + 1));
    if(PageFor === "exchange")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemExchangeBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1));
    
});


$(document).on("click", "#nav-item-box-left", function (){
    
    var currentOffset = Number($(this).attr("data-current-offset"));
    var PageFor       = $(".box_content").attr("data-page-for");
    
    if(PageFor === "mall")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox ($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));
    if(PageFor === "box-item")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox     ($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));
    if(PageFor === "equip")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.EquipBox    (currentOffset - 1));
    if(PageFor === "exchange")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemExchangeBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));
    
});
var WS_utile = {};
var ws;
WS_utile.failsConTime = 0;



WS_utile.onopen = function (){
    WS_utile.failsConTime = 0;
    ws.send(JSON.stringify({
        url:"Player/addPlayer",
        data:{
            idPlayer:ID_PLAYER
        }
    }));
    Elkaisar.World.Map.getWorldCity();
    Elkaisar.World.Map.getWorldCityColonized();
};

WS_utile.onmessage =  function (e){
    
    console.log(e.data);
    
    if(isJson(e.data)){
      var data = JSON.parse(e.data);  
    }else{
        
        alert(e.data);
        console.log(e);
    }
    
    var classPath = data.classPath.split(".");
   
    if(!$.isArray(classPath)){
        alert_box.confirmMessage("برجاء تصوير الرسالة وارسالها الى فريق الدعم" + e.data);
    }
    
    if(classPath.length === 2)
        Elkaisar.WsLib[classPath[0]][classPath[1]](data);
    else if(classPath.length === 3)
        Elkaisar.WsLib[classPath[0]][classPath[1]][classPath[2]](data);
    
};

WS_utile.onclose = function (event) {
        
        alert_box.confirmMessage("انقطاع الاتصال");
        
        $(".close-alert").remove();
        $(".confim-btn").off("click");
        $(".confim-btn").click(function (){
            window.location.href = "http://www.elkaisar.com";
            window.location.replace("http://www.elkaisar.com");
        }); 

        
};


WS_utile.connect = function (){
   
    ws =  new WebSocket(`ws://${WS_HOST}:${WS_PORT}?idPlayer=${ID_PLAYER}&server=${SERVER_ID}&token=${Elkaisar.Config.OuthToken}`);
    ws.onopen    = WS_utile.onopen;
    ws.onmessage = WS_utile.onmessage;
    ws.onclose   = WS_utile.onclose;
    console.log("connected");
};

/*
$(document).on("PlayerReady", "html", function (){
    
    $.getScript(`js${JS_VERSION}/ws/lib/chat.js`, function (){
        $.getScript(`js${JS_VERSION}/ws/lib/battel.js`, function (){
            $.getScript(`js${JS_VERSION}/ws/lib/guild.js`, function (){
                $.getScript(`js${JS_VERSION}/ws/lib/mail.js`, function (){
                    $.getScript(`js${JS_VERSION}/ws/lib/hero.js`, function (){
                        $.getScript(`js${JS_VERSION}/ws/lib/player.js`, function (){
                            $.getScript(`js${JS_VERSION}/ws/lib/serverAnnounce.js`, function (){
                                $.getScript(`js${JS_VERSION}/ws/lib/city.js`, function (){
                                    WS_utile.connect();
                                });
                               
                            });
                        });
                    });
                });
            });
        });
    });
});*/
var WsBattel = {};

WsBattel.started = function(battel){
    
    if(Number(battel.id_battel) < 0){
        alert_box.failMessage("حدث خطاء");
        return ;
    }

    $(".close-alert").click();
    $(".close_dialog").click();

    Hero.heroAttackProc();
    PLAYER_NOTIF.battel_number  =  Number(PLAYER_NOTIF.battel_number) + 1;
    PLAYER_NOTIF.hero_in_battel =  Number(PLAYER_NOTIF.hero_in_battel) + 1;
    Fixed.refreshPlayerNotif();

    Crafty.audio.play("war_sound");
    city_profile.refresh_hero_view();
    
    var world_unit = WorldUnit.getWorldUnit(battel_data.x_coord , battel_data.y_coord).entite;
    Matrial.takeNeedsForAttack(world_unit.t);

        if(!Elkaisar.Battel.Battels){

            Elkaisar.Battel.Battels = [battel.Battel];

        }else{

            Elkaisar.Battel.Battels.push(battel.Battel);

        }

        

        for(var ii in battel.StartingPrice)
        {
            Matrial.takeFrom(battel.StartingPrice[ii].Item ,  battel.StartingPrice[ii].amount);
        }
    
};

WsBattel.effectedPlayer = function (battel){

    
    var unit = WorldUnit.getWorldUnit(battel.x_to, battel.y_to);
    
    if(WorldUnit.isArmyCapital(unit.t)){
        
        alert_box.systemChatMessage(`<p class="round-announce">بداء <span class="red">${battel.attackerName} </span>بالهجوم على  <span class="red">${Elkaisar.World.UnitData[unit.t].ar_title}</span> 
                                            <label class="clickable-coords font-2" 
                                            data-x-coord="${battel.x_to}" data-y-coord="${battel.y_to}">
                                                <i>[${battel.x_to},${battel.y_to}]</i>
                                            </label> 
                                        التى تسيطر عليها القوات الخاصة بك!</p>`);
        
    }
     
    
};



WsBattel.ended = function (data){
    
    for(var iii = 0 ; iii< Elkaisar.Battel.Battels.length ; iii++){

        if(Number(Elkaisar.Battel.Battels[iii].id_battel) ===  Number(data.Battel.id_battel)){
            Elkaisar.Battel.Battels.splice(iii , 1);
            break;
        }

    }

    $("#dialg_box[type=reports] .left-nav .selected").click();

    city_profile.afterBattelFinish(data);
    
    Battel.afterFininsh(data);

    PLAYER_NOTIF.msg_report    = Number(PLAYER_NOTIF.msg_report) + 1;
    PLAYER_NOTIF.battel_number = Number(PLAYER_NOTIF.battel_number) - 1;
    Fixed.refreshPlayerNotif();
   
    
};


WsBattel.cityIsOnFire = function (data){
    
    alert_box.failMessage(`يبداء الان الهجوم على المدينة ${data.city_name}(${data.x_to},${data.y_to})  من [${data.x_from},${data.y_from}]`);
    alert_box.systemChatMessage(`يبداء الان الهجوم على المدينة ${data.city_name}(${data.x_to},${data.y_to})  من [${data.x_from},${data.y_from}]`);
    Crafty.audio.play("war_sound");
    PLAYER_NOTIF.battel_number = Number(PLAYER_NOTIF.battel_number) + 1;
    Fixed.refreshPlayerNotif();
    city_profile.afterBattelFinish();
    playerBattels();
    
};


WsBattel.helperList = function (data){
   
   var enemyArray = [];
   var allayArray = [];
   
   var enemyNames = [];
   var allayNames = [];
   
   data.players.forEach((player , index)=>{
       
        data.playersName.forEach((p)=>{
            if(Number(p.id_player) === Number(player.id_player)){
                player.name = p.name;
            }
        }); 
       
        if(Number(player.id_player) === Number(data.attacker)){
           
        }else if(Number(player.side) === 1) {
           enemyArray.push(player);
        }else if(Number(player.side) === 0){
            allayArray.push(player);
        }
       
   });
   
   allayArray.forEach((p)=>{ allayNames.push(p.name); });
   enemyArray.forEach((p)=>{ enemyNames.push(p.name); });
  
    var result = {allaylist:"",enemyList:""};
    
    if(allayNames.length > 0)
        result.allaylist = join(`وذالك بمساعدة <span class="red">${allayNames.join(" , ")}</span>`); 
    if(allayNames.length > 0)
        result.enemyList = join(` و معاونية <span class="red">${enemyNames.join(" , ")}</span>`); 
        


    return result;
};



WsBattel.announceHonorGained =  function (data){
    
    var honor = 0;
    data.players.forEach(function (player){
        if(Number(player.id_player) === Number(data.attacker)){
            honor =  player.prize.honor;
        }
        
    });
    
    return honor;
    
};

WsBattel.announceAttackerName =  function (data){
    
    var name =''; 
    data.playersName.forEach(function (player){
        
        if(Number(player.id_player) === Number(data.attacker)){
            name = player.name;
        }
        
    });
    
    return name;
};

WsBattel.endedAnnounce = function (data){
    
    
    var playerNames = this.helperList(data);
    
    var msg =   `<div class="battel-f-ann">
                        قام <span class="red">${data.Attacker.name}</span> بهزيمة بطل النظام ${playerNames.enemyList} فى <span class="red">${Elkaisar.World.UnitTypeData[data.WorldUnit.t].Title}</span> مستوى <span class="red">${data.WorldUnit.l}</span>.
                        ${playerNames.allaylist},
                        وفى المقابل  حصل على  <span class="red">${Matrial.prizeToString(data)}</span> 
                        وايضا <span class="red">${data.honor}</span> شرف
                 </div>`;
    Chat.append(msg);
    
};


$(document).on("PlayerReady", "html", function (){
    WS_utile.connect();
});Elkaisar.WsLib.Chat = {};

Elkaisar.WsLib.Chat.scrollChat = function (){
    if($("#msg-area").getNiceScroll(0).page.maxh - $("#msg-area").getNiceScroll(0).getScrollTop() < 15 ){
        setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
    }
};


Elkaisar.WsLib.Chat.WorldMsg = function (data){
    Chat.worldMessage(data);
    this.scrollChat();
};

Elkaisar.WsLib.Chat.GuildMsg = function (data){
    Chat.guildMessage(data);
    this.scrollChat();
};


Elkaisar.WsLib.Chat.deleteMsg = function (data){
    $(`#msg-area .msg-unit[data-id-msg=${data.id_msg}]`).animate({opacity:0} , 800,function (){
        var msg = `قام ${data.p_name_delete_by}  بحذف رسالة اللاعب ${data.p_name_delete_for}`;
       $(this).html(`<div class='d-msg-replacement font-2'>${msg}</div>`) ;
       $(this).css({opacity: 1});
    });
    this.scrollChat();
};

Elkaisar.WsLib.Chat.banPlayer = function (data){
    var msg = `<div class="msg-unit panne-msg font-2">قام ${data.p_name_panner} بحظر اللاعب ${data.p_name_panned} لمدة ${changeTimeFormat(data.duration)}</div>`;
    if(Number(data.idPlayerToPan) === Number(Elkaisar.DPlayer.Player.id_player)){
        alert_box.confirmMessage("  لقد قام المراقب بحظرك من الشات  <br/>\n\
                                 اذا ان لديك اى شكوى يمكنك تقديمها فى صندوق الشكاوى <a href='http://forum.elkaisar.com/index.php?forums/14/' target='_blank'>هنا</a>");
        Elkaisar.DPlayer.Player.chat_panne = Math.floor(Date.now()/1000) + Number(data.duration);
        Fixed.refresePlayerStateList();
        Player_profile.refresh_player_data();
    }

    $("#msg-area").append(msg);
    this.scrollChat();
};



Elkaisar.WsLib.Chat.privateMsg = function (data){
    
    showPrivateChatNotif(data.idTo ,data.fromName , data.playerToAvatar);

    var chatRoom =  $("#SMB-"+data.idFrom);
    var msg_container = `<div class="sender-msg">
                                        <div class="content"><span>[${data.fromName}]:</span> ${extractEmjoi(extractUrl(data.chatMsg))}</div>
                                    </div>`;
    chatRoom.append(msg_container);
    setTimeout(function (){chatRoom.getNiceScroll(0).doScrollTop(chatRoom.getNiceScroll(0).getContentSize().h , 0);} , 35);
    
};



Elkaisar.WsLib.Chat.sendMsgImage = function (data){
    
    var msg = `<div data-id-msg="${data.idFrom}-${data.idMsg}" 
                        class="msg-unit world_chat ${"user-group-"+data.userGroup}" 
                        data-id-player="${data.idFrom}" data-avatar="${data.playerAvatar}" 
                        data-name="${data.fromName}" data-user-group="${data.userGroup}">
                        <div class="msg-from">
                            [${data.fromName}]:
                        </div>
                        <div class="msg-body">
                            <P>
                              <img style="max-width: 100%;" src="${data.image}"/>
                            </P>
                        </div>
                    </div>`;
    $("#msg-area").append(msg);
    this.scrollChat();
    
};Elkaisar.WsLib.Battel = {};

Elkaisar.WsLib.World = {};
Elkaisar.WsLib.World.Fire = {};

Elkaisar.WsLib.World.Fire.On = function (data)
{
    var world_unit = WorldUnit.getWorldUnit(data.xCoord , data.yCoord).entite;
    world_unit.__state = 1;
    Animation.fireWorldUnit({x_coord: data.xCoord, y_coord: data.yCoord});
    
}

Elkaisar.WsLib.World.Fire.On = function (data)
{
    var world_unit = WorldUnit.getWorldUnit(data.xCoord , data.yCoord).entite;
    world_unit.__state = 1;
    Animation.fireWorldUnit({x_coord: data.xCoord, y_coord: data.yCoord});
    
}

Elkaisar.WsLib.World.Fire.Off = function (data)
{
    WorldUnit.refreshUnitView(data.xCoord , data.yCoord);
}

Elkaisar.WsLib.Battel.battel = function (data) {
    
    if (data.task === "finish") {
        WsBattel.ended(data);
    } else if (data.task === "YOUR_CITY_FIRE") {
        WsBattel.cityIsOnFire(data);
    } else if (data.task === "aborted") {

        for (var iii = 0; iii < Elkaisar.Battel.Battels.length; iii++) {
            if (Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(data.id_battel)) {
                Elkaisar.Battel.Battels.splice(iii, 1);
            }
        }

        $('#dialg_box[type="reports"] .left-nav .selected').click();
        PLAYER_NOTIF.battel_number--;
        Fixed.refreshPlayerNotif();
        alert_box.succesMessage("تم سحب الابطال من المعركة بنجاح");
        
        
    } else if (data.task === "aborted_fail") {
        alert_box.confirmMessage("لا يمكنك الانسحاب من المعركة لقد فات الاوان");
    } else if (data.task === "not_in_city") {
        alert_box.confirmMessage("البطل الحالى ليس فى المدينة");
    } else if (data.task === "no_more_lvls") {
        alert_box.confirmMessage("لا توجد مستويت اخرى للهجوم عليها");
    } else if (data.task === "locked_unit") {
        alert_box.confirmMessage("لا يمكنك الهجوم على وحدة مغلقة");
    } else if (data.task === "hero_cant_used") {
        alert_box.confirmMessage("لا يمكنك الهجوم بالبطل الحالى");
    } else if (data.task === "no_enough_mat") {
        alert_box.confirmMessage("لا توجد مواد كافية");
    }

};


Elkaisar.WsLib.Battel.Started = function (data)
{
    WsBattel.started(data);
}

Elkaisar.WsLib.Battel.StartFailed = function (data)
{
    if (data.state === "not_his_role") {
        alert_box.confirmMessage("لست الحلف المسيطر عليها");
    } else if (data.state === "not_in_city") {
        alert_box.confirmMessage("البطل الحالى ليس فى المدينة");
    } else if (data.state === "no_more_lvls") {
        alert_box.confirmMessage("لا توجد مستويت اخرى للهجوم عليها");
    } else if (data.state === "locked_unit") {
        alert_box.confirmMessage("لا يمكنك الهجوم على وحدة مغلقة");
    } else if (data.state === "hero_cant_used") {
        alert_box.confirmMessage("لا يمكنك الهجوم بالبطل الحالى");
    } else if (data.state === "no_enough_mat") {
        alert_box.confirmMessage("لا توجد مواد كافية");
    } else if (data.state === "hero_carry_no_army") {
        alert_box.confirmMessage("البطل لا يحمل اى قوات");
    } else if (data.state === "in_attackable") {
        alert_box.confirmMessage("لا يمكنك الهجوم");
    }
}



Elkaisar.WsLib.Battel.Finished = function (data)
{
    
    WsBattel.ended(data);
    
}

Elkaisar.WsLib.Battel.startAnnounce = function (data){
    WsBattel.effectedPlayer(data);
};



Elkaisar.WsLib.Battel.finishAnnounce = function (data){
    WsBattel.endedAnnounce(data);
};

Elkaisar.WsLib.Battel.unitLastLvl = function (data){
    
    PLAYER_NOTIF.battel_number -=1 ;
    Fixed.refreshPlayerNotif();
    $("#dialg_box[type='reports'] .nav_bar .left-nav ul .selected").click();
    
};

Elkaisar.WsLib.Battel.Spy = {};

Elkaisar.WsLib.Battel.Spy.Notif = function (data){
    
    PLAYER_NOTIF.spy_task -= 1;
    PLAYER_NOTIF.spy_report = Number(PLAYER_NOTIF.spy_report) +  1;
    Fixed.refreshPlayerNotif();
    Elkaisar.CurrentCity.City.spies =  Number(Elkaisar.CurrentCity.City.spies) + Number(data.spy_num);
    city_profile.refresh_army_view();
    city_profile.afterBattelFinish();
    $("#dialg_box[type=reports] .selected[head_title=spy]").click();
    
};

Elkaisar.WsLib.Battel.garrisonFire = function (data){
    
    Animation.fireWorldUnit({x_coord: data.x_to , y_coord: data.y_to});
    PLAYER_NOTIF.battel_number =  Number(PLAYER_NOTIF.battel_number) + 1;
    Fixed.refreshPlayerNotif();
};



Elkaisar.WsLib.Battel.garrisonCityAdded = function (data){
    
    Palace.getCityGarison().done( function (){
                    
        if($("#dialg_box .nav_bar .left-nav .selected").attr("head_title") === "city_garrison"){
            $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset")));
        }

        alert_box.systemChatMessage("تم استقبال حراس الى مدينتك");
    });
};



Elkaisar.WsLib.Guild = {};


Elkaisar.WsLib.Guild.joinReqAccepted = function (data){
    
    alert_box.systemChatMessage(` تم قبولك فى حلف ${data.guild_name} بواسطة ${data.accepter_name}`);
    Guild.getGuildData();
    Player_profile.refresh_player_data();
    
};



Elkaisar.WsLib.Guild.announceRelation = function (data){
    
    var relation_title = {
        ally:"محايدة",
        friend:"صداقة",
        enemy:"عداوة"

    };

    var msg = `تم تغير العلاقة بين حلف ${data.guild_one} وحلف ${data.guild_two} الى -${relation_title[data.relation]}- بواسطة  ${data.player_name}`;
    alert_box.systemChatMessage(msg);
    if(Number(data.id_guild_one) === Number(Elkaisar.DPlayer.Player.id_guild) || Number(data.id_guild_two) === Number(Elkaisar.DPlayer.Player.id_guild)){
        Guild.getGuildData();
    }
    
};

Elkaisar.WsLib.Guild.msgSent = function (data){
    
    PLAYER_NOTIF.msg_in = Number(PLAYER_NOTIF.msg_in) + 1;
    Fixed.refreshPlayerNotif();
    
};Elkaisar.WsLib.Mail = {};


Elkaisar.WsLib.Mail.sentTo = function (data){
    PLAYER_NOTIF.msg_in = Number(PLAYER_NOTIF.msg_in) + 1;
    Fixed.refreshPlayerNotif();
};

Elkaisar.WsLib.Mail.someOneSpy = function (data){
    PLAYER_NOTIF.spy_report = Number(PLAYER_NOTIF.spy_report) +  1;
    Fixed.refreshPlayerNotif();
    city_profile.afterBattelFinish();
};
Elkaisar.WsLib.Hero = {};

Elkaisar.WsLib.Hero.Power = {};

Elkaisar.WsLib.Hero.Power.Added = function (data)
{
    
    for(var iii in data.Heros)
    {
        if(Elkaisar.Hero.getHero(data.Heros[iii].idHero))
            if(Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero)
                Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero.power = data.Heros[iii].power;
        
        if(Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(data.Heros[iii].idHero)){
            if($("#dialg_box[type=hero]").length > 0){
                $("#dialg_box .middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
            }
        }
    }
    
};


Elkaisar.WsLib.Hero.Back = function (data){
    
    var hero  = Elkaisar.Hero.getHero(data.idHero);
    var msg = ` تم عودة البطل ${data.HeroName} من ${BATTAL_TASKS[data.Task].ar_title}  [${data.xTo},${data.yTo}] الى المدينة ${data.CityName} `;
    PLAYER_NOTIF.hero_in_battel -= 1;


    if(Number(data.Task) === BATTEL_TYPES_CONST.GARRISON){
        msg = ` تم ارسال البطل ${hero.Hero.name}  بنجاح الى [${data.xTo},${data.yTo}] لبدء عملية الامداد`;
    }

    hero.Hero.in_city = data.inCity; 
    if(Number(data.Task) === BATTEL_TYPES_CONST.SUPPLY){
        
        var idCity = Number(Elkaisar.CurrentCity.City.id_city);
        var cityTo = Elkaisar.City.getCityByCoord(data.xTo, data.yTo);
       
        Elkaisar.City.getCityHero(cityTo.City.id_city);
        Elkaisar.City.getCityHeroArmy(cityTo.City.id_city);
        Elkaisar.City.getCityHeroMedal(cityTo.City.id_city);
        Elkaisar.City.getCityHeroEquip(cityTo.City.id_city);
        
    }



    alert_box.systemChatMessage(msg);
    Fixed.refreshPlayerNotif();
    city_profile.refresh_hero_view();
};


Elkaisar.WsLib.Player = {};

Elkaisar.WsLib.Player.someOneOppend = function (){
    
    alert_box.confirmMessage("هذا الحساب مفتوح فى  مكان اخر");
    $(".close-alert").remove();
    $(".confim-btn").off("click");
    $(".confim-btn").click(function (){
        window.location.href = "http://www.elkaisar.com";
        window.location.replace("http://www.elkaisar.com");
    });
    
};

Elkaisar.WsLib.ServerAnnounce = {};

Elkaisar.WsLib.ServerAnnounce.capitalUnLock = function (data){
    
    var msg = `<div class="msg-unit ann-red announce">تم فتح ${Elkaisar.World.UnitData[data.capital.t].getTitle(data.capital.x, data.capital.y)} ${Extract.coords(`[${data.capital.x},${data.capital.y}]`)} وسيتم اغلاقها بعد ساعتين من الان للمساعدة اضغط <a class="safe-url" href="commingsoon.php" target="_blank">هنا </a></div>`;
    Chat.append(msg);
};



Elkaisar.WsLib.ServerAnnounce.capitalLock = function (data){
    
    var playerName = "لا احد";
    if($.isArray(data.players) && data.players.length > 0)
        playerName = data.players[0].name;
    
    
    var msg = `<div class="msg-unit announce user-group-5">تم اغلاق ${Elkaisar.World.UnitData[data.capital.t].getTitle(data.capital.x, data.capital.y)} ${Extract.coords(`[${data.capital.x},${data.capital.y}]`)} و كان الفوز بالمركز الاول من  نصيب&nbsp;<span class="ann-red"> ${playerName} </span> </div>`;
    Chat.append(msg);
};

Elkaisar.WsLib.ServerAnnounce.Battel = {};

WsBattel.helperList = function (data){
   
   var enemyArray = [];
   var allayArray = [];
   
   var enemyNames = [];
   var allayNames = [];
   
   data.Joiners.forEach((player , index)=>{
       allayNames.push(player.name);
   });
   data.Defender.forEach((player , index)=>{
       enemyNames.push(player.name);
   });
  
    var result = {allaylist:"",enemyList:""};
    
    if(allayNames.length > 0)
        result.allaylist = join(`وذالك بمساعدة <span class="red">${allayNames.join(" , ")}</span>`); 
    if(allayNames.length > 0)
        result.enemyList = join(` و معاونية <span class="red">${enemyNames.join(" , ")}</span>`); 
        


    return result;
};

Elkaisar.WsLib.ServerAnnounce.Battel.Win = function (data){
    
    
    var playerNames = WsBattel.helperList(data);
    
    var msg =   `<div class="battel-f-ann">
                        قام <span class="red">${data.Attacker.name}</span> بهزيمة بطل النظام ${playerNames.enemyList} فى <span class="red">${Elkaisar.World.UnitTypeData[data.WorldUnit.t].Title}</span> مستوى <span class="red">${data.WorldUnit.l}</span>.
                        ${playerNames.allaylist},
                        وفى المقابل  حصل على  <span class="red">${Matrial.prizeToString(data)}</span> 
                        وايضا <span class="red">${data.honor}</span> شرف
                 </div>`;
    Chat.append(msg);
    
};

Elkaisar.WsLib.ServerAnnounce.Battel.GuildWin = function (data){
    
    
    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    
    var msg =   `<div class="battel-f-ann">نجح حلف <span class="red">${data.GuildName}</span> بقيادة <span class="red">${data.PlayerName}</span> بالسيطرة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${Unit.y} , ${Unit.x}]</div>`;
    Chat.append(Extract.coords(msg));
    
};

Elkaisar.WsLib.ServerAnnounce.Battel.Started = function (data)
{
    
    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    var msg = `<div class="battel-f-ann">بداء حلف <span class="red">${data.GuildName}</span> بقيادة <span class="red">${data.PlayerName}</span> معركة ضد ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${Unit.y} , ${Unit.x}] الان</div>`;
    Chat.append(Extract.coords(msg));
    
};


Elkaisar.WsLib.ServerAnnounce.CityColonized = function (data)
{
    var Unit                 = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    Unit.CityColonizerFlag   = data.CityColonizerFlag;
    Unit.CityColonized       = true;
    Unit.ColonizerIdGuild    = data.ColonizerIdGuild;
    Unit.ColonizerIdPlayer   = data.ColonizerIdPlayer;
    Elkaisar.World.Map.RefreshWorld();
    var msg = `<div class="battel-f-ann">نجح الملك <span class="red">${data.ColonizerName}</span> فى استعمار المدينة <span class="red">${data.CityColonizedName}</span> [${data.yCoord},${data.xCoord}] التابعة للملك <span class="red">${data.ColonizedName}</span> </div>`;
    Chat.append(Extract.coords(msg));
    
};Elkaisar.WsLib.City = {};

Elkaisar.WsLib.City.Pop = {}

Elkaisar.WsLib.City.Pop.Update = function (data){
    
    Elkaisar.City.getCityBase(data.idCity);
    
};

Elkaisar.WsLib.City.Pop.UpdateLoy = function (data){
    
    Elkaisar.City.getCityBase(data.idCity);
    
};


Elkaisar.WsLib.City.WorldCity = function (data){
    
    
    
}
Elkaisar.WsLib.Base = {};

Elkaisar.WsLib.Base.CrossReq = function (data)
{

    if($.isFunction(Elkaisar.WsLib.Base.CrossReqFun[data.url]))
        Elkaisar.WsLib.Base.CrossReqFun[data.url](data.Res);
    else 
        console.log(data);

}

Elkaisar.WsLib.Base.CrossReqFun = {};

Elkaisar.WsLib.Base.MakeCrossReq = function (url, Parm, ResFun)
{

    Elkaisar.WsLib.Base.CrossReqFun[url] = ResFun;
    ws.send(
            JSON.stringify({
                url: url,
                data: Parm
            })
            );

};


Elkaisar.WsLib.Base.worldCity = function (data){
    var Unit ;
    for(var iii in data.City)
    {
        
        Unit           = WorldUnit.getWorldUnit(data.City[iii].x, data.City[iii].y);
        Unit.idGuild   = data.City[iii].id_guild;
        Unit.CityLvl   = data.City[iii].lvl;
        Unit.idCity    = data.City[iii].id_city;
        Unit.idPlayer  = data.City[iii].id_player;
        Unit.CityFlag  = data.City[iii].city_flag;
        Unit.ut        = Number(data.City[iii].lvl) + WUT_CITY_LVL_0;
        Unit.l         = data.City[iii].lvl;
        Unit.t         = Number(data.City[iii].lvl) + 17;
    }
    
};

Elkaisar.WsLib.Base.worldCityColonized = function (data){
    var Unit ;
    for(var iii in data.City)
    {
        
        Unit           = WorldUnit.getWorldUnit(data.City[iii].x, data.City[iii].y);
        Unit.CityColonizerFlag  = data.City[iii].city_flag;
        Unit.CityColonized      = true;
        Unit.ColonizerIdGuild   = data.City[iii].id_guild;
        Unit.ColonizerIdPlayer   = data.City[iii].id_player;
    }
    
};


Elkaisar.WsLib.Base.refreshWorldCitiesForPlayers = function (data){
    var Unit ;

    Unit           = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    Unit.idGuild   = data.idGuild;
    Unit.CityLvl   = data.CityLvl;
    Unit.idCity    = data.idCity;
    Unit.idPlayer  = data.idPlayer;
    Unit.CityFlag  = data.CityFlag;
    Unit.ut        = 0 + WUT_CITY_LVL_0;
    Unit.l         = 0;
    Unit.t         = 0 + 17;
    if(Unit.entite)
        Unit.entite.destroy();
    Elkaisar.World.Map.Scroll(true);
    Elkaisar.World.Map.RefreshWorld();
    
};const WUT_EMPTY = 0; 

const WUT_RIVER_LVL_1 =  1;
const WUT_RIVER_LVL_2 =  2;
const WUT_RIVER_LVL_3 =  3;
const WUT_RIVER_LVL_4 =  4;
const WUT_RIVER_LVL_5 =  5;
const WUT_RIVER_LVL_6 =  6;
const WUT_RIVER_LVL_7 =  7;
const WUT_RIVER_LVL_8 =  8;
const WUT_RIVER_LVL_9 =  9;
const WUT_RIVER_LVL_10 = 10;

const WUT_BUSY_UNIT = 12;
const WUT_WORLD_FLOOR = 11;

const WUT_MOUNT_LVL_1 = 30;
const WUT_MOUNT_LVL_2 = 31;
const WUT_MOUNT_LVL_3 = 32;
const WUT_MOUNT_LVL_4 = 33;
const WUT_MOUNT_LVL_5 = 34;
const WUT_MOUNT_LVL_6 = 35;
const WUT_MOUNT_LVL_7 = 36;
const WUT_MOUNT_LVL_8 = 37;
const WUT_MOUNT_LVL_9 = 38;
const WUT_MOUNT_LVL_10 = 39;

const WUT_DESERT_LVL_1 = 40;
const WUT_DESERT_LVL_2 = 41;
const WUT_DESERT_LVL_3 = 42;
const WUT_DESERT_LVL_4 = 43;
const WUT_DESERT_LVL_5 = 44;
const WUT_DESERT_LVL_6 = 45;
const WUT_DESERT_LVL_7 = 46;
const WUT_DESERT_LVL_8 = 47;
const WUT_DESERT_LVL_9 = 48;
const WUT_DESERT_LVL_10 = 49;

const WUT_WOODS_LVL_1 = 50;
const WUT_WOODS_LVL_2 = 51;
const WUT_WOODS_LVL_3 = 52;
const WUT_WOODS_LVL_4 = 53;
const WUT_WOODS_LVL_5 = 54;
const WUT_WOODS_LVL_6 = 55;
const WUT_WOODS_LVL_7 = 56;
const WUT_WOODS_LVL_8 = 57;
const WUT_WOODS_LVL_9 = 58;
const WUT_WOODS_LVL_10 = 59;

const WUT_CITY_LVL_0 = 60; 
const WUT_CITY_LVL_1 = 61; 
const WUT_CITY_LVL_2 = 62; 
const WUT_CITY_LVL_3 = 63;

const WUT_MONAWRAT = 70;

const WUT_CAMP_BRITONS  = 71;
const WUT_CAMP_REICH    = 72;
const WUT_CAMP_ASIANA   = 73;
const WUT_CAMP_GAULS    = 74;
const WUT_CAMP_MACEDON  = 75;
const WUT_CAMP_HISPANIA = 76;
const WUT_CAMP_ITALIA   = 77;
const WUT_CAMP_PARTHIA  = 78;
const WUT_CAMP_CARTHAGE = 79;
const WUT_CAMP_EGYPT    = 80;



const WUT_FRONT_SQUAD    = 81;
const WUT_FRONT_BAND     = 82;
const WUT_FRONT_SQUADRON = 83;
const WUT_FRONT_DIVISION = 84;


const WUT_ARMY_LIGHT_SQUAD     = 85;
const WUT_ARMY_LIGHT_BAND      = 86;
const WUT_ARMY_LIGHT_SQUADRON  = 87;
const WUT_ARMY_LIGHT_DIVISION  = 88;

const WUT_ARMY_HEAVY_SQUAD    = 89;
const WUT_ARMY_HEAVY_BAND     = 90;
const WUT_ARMY_HEAVY_SQUADRON = 91;
const WUT_ARMY_HEAVY_DIVISION = 92;

const WUT_GUARD_SQUAD    = 93;
const WUT_GUARD_BAND     = 94;
const WUT_GUARD_SQUADRON = 95;
const WUT_GUARD_DIVISION = 96;

const WUT_BRAVE_THUNDER = 97;

const  WUT_GANG    = 98;
const  WUT_MUGGER  = 99;
const  WUT_THIEF   = 100;

/* CARTAGE */

const WUT_CARTHAGE_GANG    = 101;
const WUT_CARTHAGE_TEAMS   = 102;
const WUT_CARTHAGE_REBELS  = 103;
const WUT_CARTHAGE_FORCES  = 104;
const WUT_CARTHAGE_CAPITAL = 105;


const WUT_ARMY_CAPITAL_A = 150;
const WUT_ARMY_CAPITAL_B = 151;
const WUT_ARMY_CAPITAL_C = 152;
const WUT_ARMY_CAPITAL_D = 153;
const WUT_ARMY_CAPITAL_E = 154;
const WUT_ARMY_CAPITAL_F = 155;


const WUT_ARENA_CHALLANGE = 175;
const WUT_ARENA_DEATH     = 176;
const WUT_ARENA_GUILD     = 177;


const WUT_QUEEN_CITY_A = 180;
const WUT_QUEEN_CITY_B = 181;
const WUT_QUEEN_CITY_C = 182;

const WUT_REPLE_CASTLE_A = 184;
const WUT_REPLE_CASTLE_B = 185;
const WUT_REPLE_CASTLE_C = 186;

const WUT_WAR_STATUE_A = 200;
const WUT_WAR_STATUE_B = 201;
const WUT_WAR_STATUE_C = 202;


const WUT_WOLF_STATUE_A = 203;
const WUT_WOLF_STATUE_B = 204;
const WUT_WOLF_STATUE_C = 205;


const WUT_CHALLAGE_FIELD_PLAYER = 220;
const WUT_CHALLAGE_FIELD_TEAM   = 221;
const WUT_CHALLAGE_FIELD_GUILD  = 222;
const WUT_CHALLAGE_FIELD_SERVER = 223;

const WUT_FIEGHT_FIELD_PLAYER = 224;
const WUT_FIEGHT_FIELD_TEAM   = 225;
const WUT_FIEGHT_FIELD_GUILD  = 226;
const WUT_FIEGHT_FIELD_SERVER = 227;

const WUT_SEA_CITY_1 = 231; 
const WUT_SEA_CITY_2 = 232; 
const WUT_SEA_CITY_3 = 233; 
const WUT_SEA_CITY_4 = 234; 
const WUT_SEA_CITY_5 = 235; 
const WUT_SEA_CITY_6 = 236; 

var WorldUnit = {
    
    isBarrary: function( unitType) {
	return (Number(unitType) >= WUT_RIVER_LVL_1 && unitType <= WUT_WOODS_LVL_10);
    },

    isRiver: function( unitType) {
            return (Number(unitType) >=  WUT_RIVER_LVL_1 && unitType <= WUT_RIVER_LVL_10);
    },

    isEmpty: function( unitType) {
            return (Number(unitType) === WUT_EMPTY);
    },

    isCity: function( unitType) {
            return (Number(unitType) >= WUT_CITY_LVL_0 && unitType <= WUT_CITY_LVL_3);
    },
    isCityLv0: function( unitType) {
        return (Number(unitType) === WUT_CITY_LVL_0);
    },
    isCityLv1: function( unitType) {
        return (Number(unitType) === WUT_CITY_LVL_1);
    },
    isCityLv2: function( unitType) {
          return (Number(unitType) === WUT_CITY_LVL_2);
    },
    isCityLv3: function( unitType) {
          return (Number(unitType) === WUT_CITY_LVL_3);
    },

    isMountain: function( unitType) {
            return (Number(unitType) >= WUT_MOUNT_LVL_1 && unitType <= WUT_MOUNT_LVL_10);
    },

    isDesert: function( unitType) {
            return (Number(unitType) >= WUT_DESERT_LVL_1 && unitType <= WUT_DESERT_LVL_10);
    },

    isWood: function( unitType) {
            return (Number(unitType) >= WUT_WOODS_LVL_1 && unitType <= WUT_WOODS_LVL_10);
    },

    isMonawrat: function( unitType) {
            return (Number(unitType) === WUT_MONAWRAT);
    },

    isCamp: function( unitType) {
            return (Number(unitType) >= WUT_CAMP_BRITONS && unitType <= WUT_CAMP_EGYPT);
    },

    isAsianSquads: function( unitType) {
            return (Number(unitType) >= WUT_FRONT_SQUAD && unitType <= WUT_BRAVE_THUNDER);
    },

    isOneFRONT: function( unitType) {
            return (Number(unitType) >= WUT_FRONT_SQUAD && unitType <= WUT_FRONT_DIVISION);
    },

    isFrontSquad: function( unitType) {
            return (Number(unitType) === WUT_FRONT_SQUAD);
    },

    isFrontBand: function( unitType) {
            return (Number(unitType) === WUT_FRONT_BAND);
    },

    isFrontSquadron: function( unitType) {
            return (Number(unitType) === WUT_FRONT_SQUADRON);
    },

    isFrontDivision: function( unitType) {
            return (Number(unitType) === WUT_FRONT_DIVISION);
    },

    isOneLight: function( unitType) {
            return (Number(unitType) >= WUT_ARMY_LIGHT_SQUAD && unitType <= WUT_ARMY_LIGHT_DIVISION);
    },

    isLightSquad: function( unitType) {
            return (Number(unitType) === WUT_ARMY_LIGHT_SQUAD);
    },

    isLightBand: function( unitType) {
            return (Number(unitType) === WUT_ARMY_LIGHT_BAND);
    },

    isLightSquadron: function( unitType) {
            return (Number(unitType) === WUT_ARMY_LIGHT_SQUADRON);
    },

    isLightDivision: function( unitType) {
            return (Number(unitType) === WUT_ARMY_LIGHT_DIVISION);
    },

    isOneHeavy: function( unitType) {
            return (Number(unitType) >= WUT_ARMY_HEAVY_SQUAD && unitType <= WUT_ARMY_HEAVY_DIVISION);
    },

    isHeavySquad: function( unitType) {
            return (Number(unitType) === WUT_ARMY_HEAVY_SQUAD);
    },

    isHeavyBand: function( unitType) {
            return (Number(unitType) === WUT_ARMY_HEAVY_SQUAD);
    },

    isHeavySquadron: function( unitType) {
            return (Number(unitType) === WUT_ARMY_HEAVY_SQUADRON);
    },

    isHeavyDivision: function( unitType) {
            return (Number(unitType) === WUT_ARMY_HEAVY_DIVISION);
    },

    isOneGuard: function( unitType) {
            return (Number(unitType) >= WUT_GUARD_SQUAD && unitType <= WUT_GUARD_DIVISION);
    },

    isGuardSquad: function( unitType) {
            return (Number(unitType) === WUT_GUARD_SQUAD);
    },

    isGuardBand: function( unitType) {
            return (Number(unitType) === WUT_GUARD_BAND);
    },

    isGuardSquadron: function( unitType) {
            return (Number(unitType) === WUT_GUARD_SQUADRON);
    },

    isGuardDivision: function( unitType) {
            return (Number(unitType) === WUT_GUARD_DIVISION);
    },

    isBraveThunder: function( unitType) {
            return (Number(unitType) === WUT_BRAVE_THUNDER);
    },

    isGangStar: function( unitType) {
            return (Number(unitType) >= WUT_GANG && unitType <= WUT_THIEF);
    },

    isGang: function( unitType) {
            return (Number(unitType) === WUT_GANG);
    },

    isMugger: function( unitType) {
            return (Number(unitType) === WUT_MUGGER);
    },

    isThiefs: function( unitType) {
            return (Number(unitType) === WUT_THIEF);
    },

    isCarthagianArmies: function( unitType) {
            return (Number(unitType) >= WUT_CARTHAGE_GANG && unitType <= WUT_CARTHAGE_CAPITAL);
    },

    isCarthasianGang: function( unitType) {
            return (Number(unitType) === WUT_CARTHAGE_GANG);
    },

    isCarthageTeams: function( unitType) {
            return (Number(unitType) === WUT_CARTHAGE_TEAMS);
    },

    isCarthageRebals: function( unitType) {
            return (Number(unitType) === WUT_CARTHAGE_REBELS);
    },

    isCarthageForces: function( unitType) {
            return (Number(unitType) === WUT_CARTHAGE_FORCES);
    },

    isCarthageCapital: function( unitType) {
            return (Number(unitType) === WUT_CARTHAGE_CAPITAL);
    },

    isArmyCapital: function( unitType) {
            return (Number(unitType) >= WUT_ARMY_CAPITAL_A && unitType <= WUT_ARMY_CAPITAL_F);
    },

    isArmyCapitalA: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_A);
    },

    isArmyCapitalB: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_B);
    },

    isArmyCapitalC: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_C);
    },

    isArmyCapitalD: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_D);
    },

    isArmyCapitalE: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_E);
    },

    isArmyCapitalF: function( unitType) {
            return (Number(unitType) === WUT_ARMY_CAPITAL_F);
    },

    isQueenCity: function( unitType) {
            return (Number(unitType) >= WUT_QUEEN_CITY_A && unitType <= WUT_QUEEN_CITY_C);
    },

    isQueenCityS: function( unitType) {
            return (Number(unitType) === WUT_QUEEN_CITY_A);
    },

    isQueenCityM: function( unitType) {
            return (Number(unitType) === WUT_QUEEN_CITY_B);
    },

    isQueenCityH: function( unitType) {
            return (Number(unitType) === WUT_QUEEN_CITY_C);
    },

    isRepelCastle: function( unitType) {
            return (Number(unitType) >= WUT_REPLE_CASTLE_A && unitType <= WUT_REPLE_CASTLE_C);
    },

    isRepelCastleS: function( unitType) {
            return (Number(unitType) === WUT_REPLE_CASTLE_A);
    },

    isRepelCastleM: function( unitType) {
            return (Number(unitType) === WUT_REPLE_CASTLE_B);
    },

    isRepelCastleH: function( unitType) {
            return (Number(unitType) === WUT_REPLE_CASTLE_C);
    },

    isStatueWar: function( unitType) {
            return (Number(unitType) >= WUT_WAR_STATUE_A && unitType <= WUT_WAR_STATUE_C);
    },

    isStatueWarS: function( unitType) {
            return (Number(unitType) === WUT_WAR_STATUE_A);
    },

    isStatueWarM: function( unitType) {
            return (Number(unitType) === WUT_WAR_STATUE_B);
    },

    isStatueWarH: function( unitType) {
            return (Number(unitType) === WUT_WAR_STATUE_C);
    },

    isStatueWalf: function( unitType) {
            return (Number(unitType) >= WUT_WOLF_STATUE_A && unitType <= WUT_WOLF_STATUE_C);
    },

    isStatueWalfS: function( unitType) {
            return (Number(unitType) === WUT_WOLF_STATUE_A);
    },

    isStatueWalfM: function( unitType) {
            return (Number(unitType) === WUT_WOLF_STATUE_B);
    },

    isStatueWalfH: function( unitType) {
            return (Number(unitType) === WUT_WOLF_STATUE_C);
    },

    canHasGarrison: function( unitType) {
            return (isCity( unitType) || isBarrary( unitType));
    },

    isArena: function( unitType) {
            return (Number(unitType) >= WUT_ARENA_CHALLANGE && unitType <= WUT_ARENA_GUILD);
    },

    isArenaChallange: function( unitType) {
            return (Number(unitType) === WUT_ARENA_CHALLANGE);
    },

    isArenaDeath: function( unitType) {
            return (Number(unitType) === WUT_ARENA_DEATH);
    },

    isArenaGuild: function( unitType) {
            return (Number(unitType) === WUT_ARENA_GUILD);
    },
    
    getWorldUnit:function (x,y){
        return Elkaisar.worldAllUnits[x*500 + Number(y)];
    },
    
    
    refreshUnitData: function (x , y){
        
        
        return  $.ajax({
                    url: "api/world.php",
                    data:{
                        get_unit_map_data: true,
                        x_coord: x, 
                        y_coord: y
                    },
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        if(isJson(data)){
                            var jsonData = JSON.parse(data);
                            WorldUnit.getWorldUnit(x, y).l = jsonData.l;
                            WorldUnit.getWorldUnit(x, y).t = jsonData.t;
                            WorldUnit.getWorldUnit(x, y).ut = jsonData.ut;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
        
    },
    
    
     getCampFlage(x , y){
         
        x = Number(x);
        y = Number(y);
        
        var Unit = WorldUnit.getWorldUnit(x, y);
        $flag = "";
        if(Number(Unit.ut) === WUT_CAMP_GAULS){
            $flag = "flag_france";
        }else  if(Number(Unit.ut) === WUT_CAMP_ASIANA){
            $flag = "flag_magul";
        }else  if(Number(Unit.ut) === WUT_CAMP_BRITONS){
            $flag = "flag_england";
        }else  if(Number(Unit.ut) === WUT_CAMP_MACEDON){
            $flag = "flag_macdoni";
        }else  if(Number(Unit.ut) === WUT_CAMP_ITALIA){
            $flag = "flag_roma";
        }else  if(Number(Unit.ut) === WUT_CAMP_HISPANIA){
            $flag = "flag_spain";
        }else  if(Number(Unit.ut) === WUT_CAMP_PARTHIA){
              $flag = "flag_greek";
        }else  if(Number(Unit.ut) === WUT_CAMP_EGYPT){
            $flag = "flag_egypt";
        }else  if(Number(Unit.ut) === WUT_CAMP_CARTHAGE){
            $flag = "flag_cartaga";
        }else  if(Number(Unit.ut) === WUT_CAMP_REICH){
            $flag = "flag_germany";
        } 
            
            return $flag;
        
    },
    
    refreshUnitView(x ,y){
        
        
        var entite = this.getWorldUnit(x ,y);
        if(!entite.entite){
            return ;
        }
        entite.on_map = false;
        entite.entite.destroy();
        delete(entite.entite);
        
        addMapUnite({
            x:entite.x,
            y:entite.y
        });
        
    }
};



WorldUnit.WorldUnitRank = function (x,y){
    
    var unitType = Number(WorldUnit.getWorldUnit(x,y).ut);
    $.ajax({
       
        url: `${API_URL}/api/AWorld/getWorldUnitRank`,
        data:{
            xCoord   : x,
            yCoord   : y,
            unitType : unitType,
            token    : Elkaisar.Config.OuthToken,
            server   : Elkaisar.Config.idServer
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
           
            if(isJson(data)){
                var jsonData = JSON.parse(data);
            }else{
                alert(data);
            }
            var icon = ["1st","2nd","3rd","4th","5th"];
            
            var list = "";
            var name = "";
            var guild = "";
            var duration = "";
            var innerList = "";
            
            for(var iii = 0; iii < 5; iii++){
                
                if(jsonData[iii]){
                    
                    name = jsonData[iii].PlayerName || jsonData[iii].GuildName;
                    guild = jsonData[iii].GuildName === "NULL" ? "---" : jsonData[iii].GuildName;
                    duration = `${Math.floor(jsonData[iii].totalDuration/60)}د ${jsonData[iii].totalDuration%60} ث`;
                   
                }else{
                   
                    name = "";
                    guild = "";
                    duration = "";
                    
                }
                
                if(WorldUnit.isArenaGuild(unitType)){
                    
                    innerList = `   <div class="td_1" style="width: 30%">
                                        <div class="rank-image" style="background-image: url(images/number/${icon[iii]}.png)"></div>
                                    </div>
                                    <div class="td_1" style="width: 40%">${name}</div>
                                    <div class="td_1 rtl font-2"  style="width: 30%">${duration}</div>`;
                }else{
                    
                    innerList = `<div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/${icon[iii]}.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%">${name}</div>
                                <div class="td_1" style="width: 30%">${guild}</div>
                                <div class="td_1 rtl font-2"  style="width: 20%">${duration}</div>`;

                }
                
                list += `<div class="tr">
                            ${innerList}
                        </div>`;
                
            }
            
            var content = ` <div class="unit-with-rank">
                        
                                <div class="rank-list">

                                    <div class="inner_nav">
                                        ${
                                            WorldUnit.isArenaGuild(unitType) ? 
                                            `<div class="td_1 font-2" style="width:30%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 30%">المدة</div>` 
                                        : 
                                                
                                            `<div class="td_1 font-2" style="width:20%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 30%">الملك</div>
                                            <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 20%">المدة</div>`
            
                                        }
                                    </div>
                                    ${list}
                                </div>
                            </div>`;
            
            
           $(".unit-with-rank").replaceWith(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
};

$(document).on("click" , "#new-city-confirm button" , function (){
    
   var city_new_name = $("#new-city-name").val();
   var xCoord = $(this).attr("data-x-coord");
   var yCoord = $(this).attr("data-y-coord");
   
    if(city_new_name.length < 1){
        alert_box.confirmMessage("لا يمكنك ترك اسم المدينة خالى ");
        return ;
    }
    
    alert_box.confirmDialog("تأكيد  بناء مدينة " , function (){
       
       var idCity = Elkaisar.CurrentCity.City.id_city;
       
        if(canBuildNewCity(xCoord, yCoord)){
            
            $.ajax({
                url: `${API_URL}/api/AWorld/BuildNewCity`,
                data:{
                    idCity   : idCity,
                    xCoord   : xCoord,
                    yCoord   : yCoord,
                    CityName : city_new_name,
                    token    : Elkaisar.Config.OuthToken,
                    server   : Elkaisar.Config.idServer
                },
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    
                    if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                    var json_data = JSON.parse(data);
                    
                    
                        
                    var json_data = JSON.parse(data);
                    if(json_data.state === "error_0"){

                    }else if(json_data.state === "error_1"){

                    }else if(json_data.state === "error_2"){

                    }else if(json_data.state === "ok") {

                        if(json_data.City){
                            
                            Elkaisar.DPlayer.City[json_data.City.id_city].City = json_data.City;
                            Elkaisar.City.refreshBtnList();
                            $(".close_RB img").click();
                            $("#x_coord-input input").val(xCoord);
                            $("#y_coord-input input").val(yCoord);
                            $("#nav-btn button").click();


                        }else{
                            alert("error add city");
                        }


                    }else{

                        alert(data);

                    }
                        
                 
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
            });


        }else{

            alert_box.failMessage("لا يمكنك  بناء مدينة جديدة");
            return ;

        }

    }); 
    
});

var campDB = {
    
    
    
    showDialogBox: function (x_coord , y_coord){
        
        var unit     = WorldUnit.getWorldUnit(x_coord , y_coord);
        var lvl      = unit.l;
        var type     = unit.ut;
        var now_date = new Date();
        
       
        
        var box = ` <div id="dialg_box" class="world" style="top: -500px;">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png">
                            <div class="title">${Elkaisar.World.UnitTypeData[type].Title}</div>
                        </div>
                        <div class="nav_bar">
                            <div class="right-nav">
                                <div class="nav_icon">
                                    <img class="close_dialog" src="images/btns/close_b.png" style="float: right; margin-right: 15px; margin-top: 20px">
                                </div>
                            </div>   
                        </div>
                        <div class="box_content camps">
                            ${this.left_content(x_coord , y_coord)}
                            <div class="right-content  camps">
                                ${this.overview(x_coord , y_coord)}
                                <div class="th ellipsis">
                                    استخبارات المدينة
                                </div>
                                ${this.armyContainer(x_coord, y_coord)}
                            </div>
                            <div id="camp-panal-equip-row" class="footer camp-equip flex"></div>
                        </div>
                    </div>`;
        
        if($("#dialg_box").length === 0){
            $("body").append(box );
            $("#dialg_box").animate({top:"150px"}, 200);
            campDB.equipRow([]);
       }else {
            $("#dialg_box").remove(function (){
                $("body").append(box );
                $("#dialg_box").animate({top:"150px"}, 200);
                campDB.equipRow([]);
            });              
       }
    },
    
    armyContainer: function (x_coord , y_coord){
        
        var unit   = WorldUnit.getWorldUnit(x_coord, y_coord);
        var lvl    = unit.l;
        var type   = unit.ut;
        
        
        if(WorldUnit.isArmyCapital(type) 
                || WorldUnit.isArenaChallange(type)
                || WorldUnit.isArenaDeath(type)              
                || WorldUnit.isQueenCity(type)               
                ){
            WorldUnit.WorldUnitRank(x_coord , y_coord);
            return `<div class="unit-with-rank">
                        <div class="army-col">
                            <ul>
                                <li>
                                    <div class="image" style="background-image: url(images/tech/soldier_3.jpg)"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="rank-list">
                          
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width:20%">التصنيف</div>
                                <div class="td_1 font-2" style="width: 30%">الملك</div>
                                <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 20%">المدة</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/1st.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/2nd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/3rd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/4th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/5th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                        </div>
                    </div>`;
        }else if( WorldUnit.isRepelCastle(type) ){
            campDB.getQueAttackList(x_coord, y_coord);
            return `<div class="unit-with-rank">
                        <div class="rank-list">
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 30%">وقت البداء</div>
                                <div class="td_1 font-2" style="width: 30%">وقت الانتهاء</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                        </div>
                    </div>`;
        }
        else if( WorldUnit.isArenaGuild(type) ){
            WorldUnit.WorldUnitRank(x_coord , y_coord);
            return `<div class="unit-with-rank">
                        <div class="army-col">
                            <ul>
                                <li>
                                    <div class="image" style="background-image: url(images/tech/soldier_3.jpg)"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="rank-list">
                          
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width: 30%">التصنيف</div>
                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 30%">المدة</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/1st.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/2nd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/3rd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/4th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/5th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                        </div>
                    </div>`;
        }
        
        var renew_time = Elkaisar.World.UnitData[unit.t].timeNextRest().getTime();
        return `<div class="camp-data">
                    <div class="left pull-L blue-ribbon">
                        <table id="camp-army-table">
                            <tr>
                                <td>
                                    <img src="images/tech/soldier_1.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_a"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type , lvl ,"army_a") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_2.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_b"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_b") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_3.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_c"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_c") : "0"}
                                    </h1>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <img src="images/tech/soldier_4.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_d"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_d") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_5.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_e"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_e") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_6.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_f"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_f") : "0"}
                                    </h1>
                                </td>

                            </tr>

                        </table>
                    </div>
                    <div class="right pull-R">
                        <div class="refresh_time">
                            <div class="pull-R" >
                                <h1>وقت اعادة التعيين</h1>
                                <h2 class="time_counter  rtl attack_time_reset"  time-end="${renew_time/1000}"></h2>
                            </div>
                            <div class="pull-L">
                                <h1>المستوى</h1>
                                <h3><span>${Math.min(lvl , Elkaisar.World.UnitTypeData[type].maxLvl)}/</span>${Elkaisar.World.UnitTypeData[type].maxLvl}</h3>
                            </div>
                        </div>
                        <table border="1">
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].heroLvl ? Elkaisar.World.UnitTypeData[type].heroLvl :getArabicNumbers(5+(lvl*5))}</td>
                                <td>مستوى البطل</td>
                            </tr>
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].heroNum ? Elkaisar.World.UnitTypeData[type].heroNum : getArabicNumbers( lvl%10 === 0? 3 : 1)}</td>
                                <td>عدد الابطال</td>
                            </tr>
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].techLvl ? Elkaisar.World.UnitTypeData[type].techLvl :  getArabicNumbers(Math.floor(lvl/10)*2+2)}</td>
                                <td>مستوى الدراسة</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
        
    },
    
    overview: function (x_coord , y_coord){
        var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
        var type = unit.ut;
        var list = `<ul>`;
        
        list += WorldUnit.prize.prizeAllLvlsList(x_coord, y_coord);
            
        list += `</ul>`;
        
        var ov = `<div class="overview" >
                        <div class="th ellipsis">
                            نظرة عامة
                        </div>
                        <div  class="wrapper" style=" height: 80%">
                            <p id="camp-over-view-desc"  style=" outline: currentcolor none medium;" tabindex="4">
                                ${Elkaisar.World.UnitTypeData[type].Desc}
                           </p>
                            <div class="image pull-R" id="camp-prize">
                             ${list}
                            </div>
                        </div>
                    </div>`;
        return ov;
    },
    left_content: function (x_coord , y_coord){
      
        var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
        var type = unit.ut;
        var lvl  = unit.l;
        var title = Elkaisar.World.UnitTypeData[type].Title;
        
        var left_content = `<div class="left-content ">
                                <table border="1" class="camp_review">
                                    <tr>
                                        <td rowspan="4" class="camp_snap_shot" style="background: url(images/background/frame.png) 100% 80%">
                                            <img src="images/world/snap-shot/${Elkaisar.World.UnitTypeData[type].WSnapShoot}"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            ${title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div class="coord-txt">[${getArabicNumbers(x_coord)},${getArabicNumbers(y_coord)}]</div>
                                            <div class="copy-coord-icon">
                                                <button class="copy-coord" data-x-coord="${x_coord}" data-y-coord="${y_coord}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>${Translate.Text.Province[UserLag.language]}</td>
                                        <td>${Elkaisar.World.Province.getTitle(x_coord , y_coord)}</td>
                                    </tr>
                                    <tr>

                                        <td>
                                            <div class="${Number(Elkaisar.World.UnitTypeData[type].reqProm) > Number(Elkaisar.DPlayer.Player.porm) ? "not-enough" : "enough"}">
                                                ${Elkaisar.BaseData.Promotion[Elkaisar.World.UnitTypeData[type].reqProm].Title}
                                            </div>
                                        </td>
                                        <td colspan="2">
                                            تصنيف النبيل المطلوب
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>
                                            ${(Elkaisar.World.UnitTypeData[type].reqFitness)} 
                                        </td>
                                        <td colspan="2">
                                              اللياقة البدنية
                                        </td>
                                    </tr>
                                </table>
                                ${this.attackBtns(x_coord, y_coord)}
                                <div class="battel_req">
                                    <ul>
                                        ${this.get_req(type)}
                                    </ul>
                                </div>
                            </div>`;
         return left_content;
    },
    
    attackBtns: function (xCoord, yCoord)
    {
        
        var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
        if(WorldUnit.isQueenCity(Unit.ut) || WorldUnit.isRepelCastle(Unit.ut))
            return `<div class="attakBtns four-btn-camp">
                        <div class="container">
                            <div class="attck_start pull-L" id="attack_camp">
                                <button id="START_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x enter"> انشاء</button>
                            </div>
                            <div class="attack_join pull-R">
                                <button id="JOIN_ATTACK"  data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> انضمام</button>
                            </div>
                            <div class="request-order pull-L">
                                <button id="REQUEST_ORDER" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> طلب</button>
                            </div>
                            <div class="plunde-prize pull-R">
                                <button id="PLUNDE_PRIZE"  data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> غنيمة</button>
                            </div>
                        </div>
                    </div>`;
        
        
        return `<div class="attakBtns">
                    <div class="container">
                        <div class="attck_start pull-L" id="attack_camp">
                            <button id="START_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x enter" disabled='disabled' > انشاء</button>
                        </div>
                        <div class="attack_join pull-R">
                            <button id="JOIN_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x" disabled='disabled' > انضمام</button>
                        </div>
                    </div>
                </div>`;
        
    },
    
    get_req: function(type){
        var camp_obj = Elkaisar.World.UnitTypeData[type];
        
        var total_req = "";
        var total_join_req = "";
        var total = "";
        
        camp_obj.MakeReq.forEach(function(el){  // هنجيب المتطلبات بتاعة  الهجوم ونحطها  فى ليست
            if(el !== ""){
                total_req += `<span class="${Matrial.getPlayerAmount(el.Item) < el.amount ? "not-enough" : "enough"} "> ${el.amount} من  ${Elkaisar.BaseData.Items[el.Item].name}</span>`;
            }
        });
         if(total_req !==""){
             total += `<li>
                        يستهلك${total_req} لانشاء معركة
                    </li>`;
         }
        camp_obj.JoinReq.forEach(function(el){  // هنجيب المتطلبات بتاعة  الانضمام ونحطها  فى ليست
            if(el !== ""){
                total_join_req += `<span  class="${Matrial.getPlayerAmount(el.Item) < 1 ? "not-enough" : "enough"} "> ${el.amount} من  ${Elkaisar.BaseData.Items[el.Item].name}</span>`;
            }
        });
        if(total_join_req !==""){
            total += `<li>
                        يستهلك${total_join_req} لانشاء معركة
                    </li>`;
        }
        return total;
    },
    
    getArmyAmountForUnit(type  , lvl ,  army_type){
        
        if(WorldUnit.isMonawrat(type) || WorldUnit.isCamp(type)){
             if(lvl > 50){
                 return 0;
             }
            var factor = 1;
            if(parseInt(type) === 30){
                factor = 3;
            }

            if(army_mo3_and_mon[lvl].type_1 === army_type){

                return army_mo3_and_mon[lvl].amount_1*factor;

            }else if(army_mo3_and_mon[lvl].type_2 === army_type){

                return army_mo3_and_mon[lvl].amount_2*factor;

            }
        }else if(WorldUnit.isAsianSquads(type)){
            
            return ARMY_ASIAN_SQUAD[type][army_type];

        }else if(WorldUnit.isGangStar(type)){
            
           return ARMY_GANGSTAR[type][army_type]*(Number(lvl));
           
        }else if(WorldUnit.isCarthagianArmies(type)){
            if(lvl > 100){
                return 0;
            }
            return ARMY_CARTHIAN[type][Math.max(lvl , 1)][army_type];
            
        }
             
             
             
        return 0;
        
    }
};


campDB.equipRow = function (equip){
    
    var returnEquiImage = function (part){
        var ii;
        for(ii in equip){
            if(equip[ii].part === part){
                return Equipment.getImage(equip[ii].equip, equip[ii].part, equip[ii].lvl);
            }
        }
        return "images/tech/no_army.png";
    };
    
    $("#camp-panal-equip-row").html(
    `
        <ul>
            <li equi_type="helmet"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("helmet")})"></div>
                        <div class="icon" style="background-image: url(images/box/helmet.png)"></div>
                    </div>
                </li>
                <li equi_type="necklace"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("necklace")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="armor"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("armor")})"></div>
                        <div class="icon" style="background-image: url(images/box/armor.png)"></div>
                    </div>
                </li>
                <li equi_type="boot"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("boot")})"></div>
                        <div class="icon" style="background-image: url(images/box/boots.png)"></div>
                    </div>
                </li>
                <li equi_type="sword"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("sword")})"></div>
                        <div class="icon" style="background-image: url(images/box/sword.png)"></div>
                    </div>
                </li>
                <li equi_type="shield"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("shield")})"></div>
                        <div class="icon" style="background-image: url(images/box/shield.png)"></div>
                    </div>
                </li>
                <li equi_type="horse"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("steed")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>

                <li equi_type="ring"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("ring")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="belt"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("belt")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="niche"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("pendant")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
            </ul>`);
};

campDB.armyRow  = function (heroList){
    
    var armyObj = Hero.calWorldUnitArmy(heroList);
    var tb = "<tr>";
    for(var iii = 1 ; iii <= 3; iii++){
        tb += `<td>
                    <img src="images/tech/soldier_${iii}.jpg"/>
                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(armyObj[iii])}">
                        ${armyObj[iii]}
                    </h1>
                </td>`;
    }
     tb += "</tr><tr>";
    for(var iii = 4 ; iii <= 6; iii++){
        tb += `<td>
                    <img src="images/tech/soldier_${iii}.jpg"/>
                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(armyObj[iii])}">
                        ${armyObj[iii]}
                    </h1>
                </td>`;
    }
    tb +="</tr>";
    $("#camp-army-table").html(`<tr> ${tb} </tr>`);
};

campDB.getQueAttackList    = function (xCoord, yCoord)
{
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
    
    if(!WorldUnit.isRepelCastle(Unit.ut))
        return ;
    return $.ajax({
       
        url: `${API_URL}/api/AWorld/getGuildAttackQue`,
        type: 'GET',
        data: {
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer,
            xCoord : xCoord,
            yCoord : yCoord
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data)
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            Elkaisar.CurrentWorldUnit.AttackQueList = JsonObject;
            campDB.refreshQueAttackList(xCoord, yCoord);
        }
        
    });
};

campDB.refreshQueAttackList = function (xCoord, yCoord)
{
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

            var icon = ["1st","2nd","3rd","4th","5th"];
            
            var list = "";
            var name = "";
            var guild = "";
            var timeEnd = "";
            var timeStart = "";
            var innerList = "";
            for(var iii = 0; iii < 5; iii++){
                var ListItem =  Elkaisar.CurrentWorldUnit.AttackQueList [iii];
                if(ListItem){
                    
                    
                    name = ListItem.PlayerName || ListItem.GuildName;
                    guild = ListItem.GuildName === "NULL" ? "---" : ListItem.GuildName;
                    timeEnd  = `${dateTimeFormatShort(new Date(ListItem.time_end*1000))}`;
                    timeStart = `${dateTimeFormatShort(new Date(ListItem.time_start*1000))}`;
                   
                }else{
                   
                    name = "";
                    guild = "";
                    timeEnd = '';
                    timeStart = "";
                    
                }
                
                if(WorldUnit.isRepelCastle(Unit.ut)){
                    
                    innerList = `   <div class="td_1" style="width: 30%">${name}</div>
                                    <div class="td_1" style="width: 35%">${timeStart}</div>
                                    <div class="td_1" style="width: 35%">${timeEnd}</div>`;
                }
                
                list += `<div class="tr">
                            ${innerList}
                        </div>`;
                
            }
            
            var content = ` <div class="unit-with-rank">
                        
                                <div class="rank-list">
                                        ${
                                            WorldUnit.isRepelCastle(Unit.ut) ? 
                                            `<div class="inner_nav">
                                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                                <div class="td_1 font-2" style="width: 30%">وقت البداء</div>
                                                <div class="td_1 font-2" style="width: 30%">وقت الانتهاء</div>
                                            ` 
                                        : 
                                                
                                            `<div class="td_1 font-2" style="width:20%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 30%">الملك</div>
                                            <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 20%">المدة</div>`
            
                                        }
                                    </div>
                                    ${list}
                                </div>
                            </div>`;
            
            
           $(".unit-with-rank").replaceWith(content);
};


/* global WorldUnit */

const army_mo3_and_mon = {
    "1":{
        "type_1":"army_a",
        "amount_1":10,
        "type_2":"army_d",
        "amount_2":8
    },
    "2":{
        "type_1":"army_a",
        "amount_1":16,
        "type_2":"army_d",
        "amount_2":11
    },
    "3":{
        "type_1":"army_a",
        "amount_1":26,
        "type_2":"army_d",
        "amount_2":18
    },
    "4":{
        "type_1":"army_a",
        "amount_1":38,
        "type_2":"army_d",
        "amount_2":23
    },
    "5":{
        "type_1":"army_a",
        "amount_1":47,
        "type_2":"army_d",
        "amount_2":31
    },
    "6":{
        "type_1":"army_a",
        "amount_1":60,
        "type_2":"army_d",
        "amount_2":36
    },
    "7":{
        "type_1":"army_a",
        "amount_1":70,
        "type_2":"army_d",
        "amount_2":44
    },
    "8":{
        "type_1":"army_a",
        "amount_1":81,
        "type_2":"army_d",
        "amount_2":10
    },
    "9":{
        "type_1":"army_a",
        "amount_1":91,
        "type_2":"army_d",
        "amount_2":59
    },
    "10":{
        "type_1":"army_a",
        "amount_1":110,
        "type_2":"army_d",
        "amount_2":98
    },
    "11":{
        "type_1":"army_a",
        "amount_1":190,
        "type_2":"army_e",
        "amount_2":54
    },
    "12":{
        "type_1":"army_a",
        "amount_1":271,
        "type_2":"army_e",
        "amount_2":54
    },
    "13":{
        "type_1":"army_a",
        "amount_1":350,
        "type_2":"army_e",
        "amount_2":72
    },
    "14":{
        "type_1":"army_a",
        "amount_1":427,
        "type_2":"army_e",
        "amount_2":88
    },
    "15":{
        "type_1":"army_a",
        "amount_1":509,
        "type_2":"army_e",
        "amount_2":104
    },
    "16":{
        "type_1":"army_a",
        "amount_1":589,
        "type_2":"army_e",
        "amount_2":19
    },
    "17":{
        "type_1":"army_a",
        "amount_1":666,
        "type_2":"army_e",
        "amount_2":137
    },
    "18":{
        "type_1":"army_a",
        "amount_1":745,
        "type_2":"army_e",
        "amount_2":153
    },
    "19":{
        "type_1":"army_a",
        "amount_1":824,
        "type_2":"army_e",
        "amount_2":168
    },
    "20":{
        "type_1":"army_a",
        "amount_1":9003,
        "type_2":"army_e",
        "amount_2":185
    },
    "21":{
        "type_1":"army_b",
        "amount_1":787,
        "type_2":"army_e",
        "amount_2":1093
    },
    "22":{
        "type_1":"army_b",
        "amount_1":1381,
        "type_2":"army_e",
        "amount_2":1920
    },
    "23":{
        "type_1":"army_b",
        "amount_1":1976,
        "type_2":"army_e",
        "amount_2":2747 
    },
    "24":{
        "type_1":"army_b",
        "amount_1":2570,
        "type_2":"army_e",
        "amount_2":3573
    },
    "25":{
        "type_1":"army_b",
        "amount_1":3163,
        "type_2":"army_e",
        "amount_2":4400
    },
    "26":{
        "type_1":"army_b",
        "amount_1":3759,
        "type_2":"army_e",
        "amount_2":5227
    },
    "27":{
        "type_1":"army_b",
        "amount_1":4352,
        "type_2":"army_e",
        "amount_2":6053
    },
    "28":{
        "type_1":"army_b",
        "amount_1":4948,
        "type_2":"army_e",
        "amount_2":6880
    },
    "29":{
        "type_1":"army_b",
        "amount_1":5541,
        "type_2":"army_e",
        "amount_2":7707
    },
    "30":{
        "type_1":"army_b",
        "amount_1":5541,
        "type_2":"army_e",
        "amount_2":7707
    },
    "31":{
        "type_1":"army_b",
        "amount_1":6719,
        "type_2":"army_f",
        "amount_2":1938
    },
    "32":{
        "type_1":"army_b",
        "amount_1":5153,
        "type_2":"army_f",
        "amount_2":1477
    },
    "33":{
        "type_1":"army_b",
        "amount_1":5583,
        "type_2":"army_f",
        "amount_2":1602
    },
    "34":{
        "type_1":"army_b",
        "amount_1":6013,
        "type_2":"army_f",
        "amount_2":1725
    },
    "35":{
        "type_1":"army_b",
        "amount_1":6442,
        "type_2":"army_f",
        "amount_2":1847
    },
    "36":{
        "type_1":"army_b",
        "amount_1":6872,
        "type_2":"army_f",
        "amount_2":1972
    },
    "37":{
        "type_1":"army_b",
        "amount_1":7301,
        "type_2":"army_f",
        "amount_2":2217
    },
    "38":{
        "type_1":"army_b",
        "amount_1":7731,
        "type_2":"army_f",
        "amount_2":2217
    },
    "39":{
        "type_1":"army_b",
        "amount_1":8160,
        "type_2":"army_f",
        "amount_2":2342
    },
    "40":{
        "type_1":"army_b",
        "amount_1":8588,
        "type_2":"army_f",
        "amount_2":2465
    },
    "41":{
        "type_1":"army_a",
        "amount_1":8295,
        "type_2":"army_f",
        "amount_2":4192
    },
    "42":{
        "type_1":"army_c",
        "amount_1":8295,
        "type_2":"army_f",
        "amount_2":4192
    },
    "43":{
        "type_1":"army_c",
        "amount_1":11712,
        "type_2":"army_f",
        "amount_2":5919
    },
    "44":{
        "type_1":"army_c",
        "amount_1":18544,
        "type_2":"army_f",
        "amount_2":9371
    },
    "45":{
        "type_1":"army_c",
        "amount_1":21959,
        "type_2":"army_f",
        "amount_2":11098
    },
    "46":{
        "type_1":"army_c",
        "amount_1":25376,
        "type_2":"army_f",
        "amount_2":12824
    },
    "47":{
        "type_1":"army_c",
        "amount_1":28762,
        "type_2":"army_f",
        "amount_2":14551
    },
    "48":{
        "type_1":"army_c",
        "amount_1":32208,
        "type_2":"army_f",
        "amount_2":16276
    },
    "49":{
        "type_1":"army_c",
        "amount_1":35625,
        "type_2":"army_f",
        "amount_2":18003
    },
    "50":{
        "type_1":"army_c",
        "amount_1":35625,
        "type_2":"army_f",
        "amount_2":18003
    }
};
var ARMY_ASIAN_SQUAD = {};

ARMY_ASIAN_SQUAD[WUT_FRONT_SQUAD] = { // الفرقة الامامية
    army_a:0,
    army_b:0,
    army_c:16002,
    army_d:0,
    army_e:0,
    army_f:4002
};
ARMY_ASIAN_SQUAD[WUT_FRONT_BAND] = {  // السرية الامامية
   army_a:0,
   army_b:0,
   army_c:24006,
   army_d:0,
   army_e:0,
   army_f:6006
};
ARMY_ASIAN_SQUAD[WUT_FRONT_SQUADRON] = {  // الجماعة الامامية
    army_a:0,
    army_b:0,
    army_c:32004,
    army_d:0,
    army_e:0,
    army_f:8004
 };
ARMY_ASIAN_SQUAD[WUT_FRONT_DIVISION] ={  // الكتيبة الامامية
    army_a:0,
    army_b:0,
    army_c:40002,
    army_d:0,
    army_e:0,
    army_f:10002
 };
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_SQUAD] = {  //  فرقة التسليح الخفيف
    army_a:0,
    army_b:0,
    army_c:56010,
    army_d:0,
    army_e:0,
    army_f:14010
 };
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_BAND] = {  //  سرية التسليح الخفيف
   army_a:0,
   army_b:0,
   army_c:64089,
   army_d:0,
   army_e:0,
   army_f:16029
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_SQUADRON] = { //  جماعة التسليح الخفيف
   army_a:0,
   army_b:0,
   army_c:72006,
   army_d:0,
   army_e:0,
   army_f:18006
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_DIVISION] = {  //  كتيبة التسليح الخفيف
   army_a:0,
   army_b:0,
   army_c:80007,
   army_d:0,
   army_e:0,
   army_f:20010
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_SQUAD] = { //  فرقة التسليح الثقيل
   army_a:0,
   army_b:0,
   army_c:95772,
   army_d:0,
   army_e:0,
   army_f:23952
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_BAND] = {//  سرية التسليح الثقيل
   army_a:0,
   army_b:0,
   army_c:104466,
   army_d:0,
   army_e:0,
   army_f:26124
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_SQUADRON] = { //  جماعة التسليح الثقيل
   army_a:0,
   army_b:0,
   army_c:112335,
   army_d:0,
   army_e:0,
   army_f:28095
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_DIVISION] ={//  كتيبة التسليح الثقيل
   army_a:0,
   army_b:0,
   army_c:120009,
   army_d:0,
   army_e:0,
   army_f:30012
};
ARMY_ASIAN_SQUAD[WUT_GUARD_SQUAD] = { //  فرقة الحراسة 
   army_a:0,
   army_b:0,
   army_c:132996,
   army_d:0,
   army_e:0,
   army_f:34011
};
ARMY_ASIAN_SQUAD[WUT_GUARD_BAND] = {//  سرية الحراسة 
   army_a:0,
   army_b:0,
   army_c:144162,
   army_d:0,
   army_e:0,
   army_f:36051
};
ARMY_ASIAN_SQUAD[WUT_GUARD_SQUADRON] = { //  جماعة الحراسة 
   army_a:0,
   army_b:0,
   army_c:152772,
   army_d:0,
   army_e:0,
   army_f:38208
};
ARMY_ASIAN_SQUAD[WUT_GUARD_DIVISION] = {//  كتيبة الحراسة 
   army_a:0,
   army_b:0,
   army_c:165615,
   army_d:0,
   army_e:0,
   army_f:41424
};
ARMY_ASIAN_SQUAD[WUT_BRAVE_THUNDER] = {  // الثاندر الشجاع
   army_a:0,
   army_b:0,
   army_c:248427,
   army_d:0,
   army_e:0,
   army_f:62130
};
var ARMY_GANGSTAR = {};

ARMY_GANGSTAR[WUT_GANG] = { // الفرقة الامامية
    army_a:486,
    army_b:0,
    army_c:0,
    army_d:392,
    army_e:0,
    army_f:0
};
ARMY_GANGSTAR[WUT_MUGGER] = {  // السرية الامامية
    army_a:322,
    army_b:0,
    army_c:0,
    army_d:206,
    army_e:0,
    army_f:0
};
ARMY_GANGSTAR[WUT_THIEF] = {  // الجماعة الامامية
    army_a:243,
    army_b:0,
    army_c:0,
    army_d:153,
    army_e:0,
    army_f:0
};

var  ARMY_CARTHIAN = {};

ARMY_CARTHIAN[WUT_CARTHAGE_GANG    ]={ // الفرقة الامامية
    "1":{
        army_a:10400,
        army_b:0,
        army_c:0,
        army_d:5200,
        army_e:0,
        army_f:0 
    },
    "2":{
        army_a:10400,
        army_b:0,
        army_c:0,
        army_d:5200,
        army_e:0,
        army_f:0 
    },
    "3":{
        army_a:10400,
        army_b:0,
        army_c:0,
        army_d:5200,
        army_e:0,
        army_f:0 
    },
    "4":{
        army_a:10400,
        army_b:0,
        army_c:0,
        army_d:5200,
        army_e:0,
        army_f:0 
    },
    "5":{
        army_a:31200,
        army_b:7800,
        army_c:0,
        army_d:31200,
        army_e:0,
        army_f:0 
    },
    "6":{
        army_a:11700,
        army_b:0,
        army_c:0,
        army_d:9100,
        army_e:0,
        army_f:0 
    },
    "7":{
        army_a:11700,
        army_b:0,
        army_c:0,
        army_d:9100,
        army_e:0,
        army_f:0 
    },
    "8":{
        army_a:11700,
        army_b:0,
        army_c:0,
        army_d:9100,
        army_e:0,
        army_f:0 
    },
    "9":{
        army_a:11700,
        army_b:0,
        army_c:0,
        army_d:9100,
        army_e:0,
        army_f:0 
    },
    "10":{
        army_a:46800,
        army_b:7800,
        army_c:0,
        army_d:31200,
        army_e:5850,
        army_f:0 
    }

};
ARMY_CARTHIAN[WUT_CARTHAGE_TEAMS   ]={  // السرية الامامية
    "1":{
        army_a:15600,
        army_b:2600,
        army_c:0,
        army_d:10400,
        army_e:1950,
        army_f:0 
    },
    "2":{
        army_a:15600,
        army_b:2600,
        army_c:0,
        army_d:10400,
        army_e:1950,
        army_f:0 
    },
    "3":{
        army_a:15600,
        army_b:2600,
        army_c:0,
        army_d:10400,
        army_e:1950,
        army_f:0 
    },
    "4":{
        army_a:15600,
        army_b:2600,
        army_c:0,
        army_d:10400,
        army_e:1950,
        army_f:0 
    },
    "5":{
        army_a:78000,
        army_b:23400,
        army_c:0,
        army_d:46800,
        army_e:11700,
        army_f:0 
    },
    "6":{
        army_a:20800,
        army_b:5200,
        army_c:0,
        army_d:13000,
        army_e:1950,
        army_f:0 
    },
    "7":{
        army_a:20800,
        army_b:5200,
        army_c:0,
        army_d:13000,
        army_e:1950,
        army_f:0 
    },
    "8":{
        army_a:20800,
        army_b:5200,
        army_c:0,
        army_d:13000,
        army_e:1950,
        army_f:0 
    },
    "9":{
        army_a:20800,
        army_b:5200,
        army_c:0,
        army_d:13000,
        army_e:1950,
        army_f:0  
    },
    "10":{
        army_a:0,
        army_b:65000,
        army_c:13000,
        army_d:0,
        army_e:32500,
        army_f:6500 
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_REBELS  ]={  // الجماعة الامامية
    "1":{
        army_a:0,
        army_b:22554,
        army_c:86136,
        army_d:0,
        army_e:26922,
        army_f:0 
    },
    "2":{
        army_a:0,
        army_b:22554,
        army_c:86136,
        army_d:0,
        army_e:26922,
        army_f:0  
    },
    "3":{
        army_a:0,
        army_b:22554,
        army_c:86136,
        army_d:0,
        army_e:26922,
        army_f:0 
    },
    "4":{
        army_a:0,
        army_b:22554,
        army_c:86136,
        army_d:0,
        army_e:26922,
        army_f:0 
    },
    "5":{
        army_a:0,
        army_b:67662,
        army_c:258408,
        army_d:0,
        army_e:80766,
        army_f:0 
    },
    "6":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "7":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "8":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922
    },
    "9":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "10":{
        army_a:0,
        army_b:0,
        army_c:435000,
        army_d:0,
        army_e:0,
        army_f:110000 
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_FORCES  ]={ // الفرقة الامامية
    "1":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "2":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "3":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922 
    },
    "4":{
        army_a:0,
        army_b:0,
        army_c:108690,
        army_d:0,
        army_e:0,
        army_f:26922  
    },
    "5":{
        army_a:0,
        army_b:0,
        army_c:435000,
        army_d:0,
        army_e:0,
        army_f:110000 
    },
    "6":{
        army_a:0,
        army_b:0,
        army_c:188690,
        army_d:0,
        army_e:0,
        army_f:46922 
    },
    "7":{
        army_a:0,
        army_b:0,
        army_c:188690,
        army_d:0,
        army_e:0,
        army_f:46922
    },
    "8":{
        army_a:0,
        army_b:0,
        army_c:188690,
        army_d:0,
        army_e:0,
        army_f:46922 
    },
    "9":{
        army_a:0,
        army_b:0,
        army_c:188690,
        army_d:0,
        army_e:0,
        army_f:46922 
    },
    "10":{
        army_a:0,
        army_b:0,
        army_c:635000,
        army_d:0,
        army_e:0,
        army_f:210000  
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_CAPITAL ]={  // السرية الامامية
    "1":{
        army_a:0,
        army_b:0,
        army_c:326070,
        army_d:0,
        army_e:0,
        army_f:80766 
    },
    "2":{
        army_a:0,
        army_b:0,
        army_c:326070,
        army_d:0,
        army_e:0,
        army_f:80766 
    },
    "3":{
        army_a:0,
        army_b:0,
        army_c:326070,
        army_d:0,
        army_e:0,
        army_f:80766 
    },
    "4":{
        army_a:0,
        army_b:0,
        army_c:326070,
        army_d:0,
        army_e:0,
        army_f:80766 
    },
    "5":{
        army_a:0,
        army_b:0,
        army_c:793482,
        army_d:0,
        army_e:0,
        army_f:322140 
    },
    "6":{
        army_a:0,
        army_b:0,
        army_c:396741,
        army_d:0,
        army_e:0,
        army_f:161070 
    },
    "7":{
        army_a:0,
        army_b:0,
        army_c:396741,
        army_d:0,
        army_e:0,
        army_f:161070 
    },
    "8":{
        army_a:0,
        army_b:0,
        army_c:396741,
        army_d:0,
        army_e:0,
        army_f:161070  
    },
    "9":{
        army_a:0,
        army_b:0,
        army_c:396741,
        army_d:0,
        army_e:0,
        army_f:161070 
    },
    "10":{
        army_a:0,
        army_b:0,
        army_c:1586979,
        army_d:0,
        army_e:0,
        army_f:644280 
    }
};


var CURRENT_CURSOR_COORDS;
var GENERAL_TIMER;

var unitLvlPrize = [
    "هنا يمكنك  بناء مدينة لك ان كنت تمتلك ",
    "",
    "هنا يمكن الهجوم والحصول على صبغً",
    "هنا يمكن الهجوم والحصول على بهارات",
    "هنا يمكن الهجوم والحصول على نبيذ",
    "هنا يمكن الهجوم والحصول على  صوف",
    "هنا يمكن الهجوم والحصول على حرير",
    "هنا يمكن الهجوم والحصول على فرو",
    "هنا يمكن الهجوم والحصول على بخور",
    "هنا يمكن الهجوم والحصول على عاج",
    "هنا يمكن الهجوم والحصول على جواهر"
];

var allUniteType = {
    lake:{
        ar_title:"بحيرة",
        prod:"غذاء"
    },
    mountain:{
        ar_title:" جبال",
        prod:"حديد"
    },
    desert:{
        ar_title:"صحراء",
        prod:"صخور"
    },
    wood:{
        ar_title:"غابات",
        prod:"غذاء"
    },
    city:{
        ar_title:"مدينة",
        prod:""
    },
    empty:{
        ar_title:"مكان خالى",
        prod:""
    }
    
    
};

var  TimeRest = {
    restEvery4: function (){
        var date = new Date();
        var currentHour = date.getUTCHours();
        var currentDay  = date.getUTCDate();
            
        var restDate = new Date();
        restDate.setUTCMinutes(0);
        restDate.setUTCSeconds(2);
                
           if(currentHour >= 20){
                restDate.setUTCDate(Number(currentDay) + 1);
                restDate.setUTCHours(0);
               
            }else if(currentHour >= 16){
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(20);
            }else if(currentHour >= 12){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(16);
                
            }else if(currentHour >= 8){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(12);
                
            }else if(currentHour >= 4){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(8);
                
            }else if(currentHour >= 0){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(4);
                
            }
            return restDate;
    },
    
    restEvery6: function (){
        var date = new Date();
        var currentHour = date.getUTCHours();
        var currentDay  = date.getUTCDate();
            
        var restDate = new Date();
        restDate.setUTCMinutes(0);
        restDate.setUTCSeconds(2);
                
           if(currentHour >= 20){
               
                restDate.setUTCDate(Number(currentDay) + 1);
                restDate.setUTCHours(0);
               
            }else if(currentHour >= 14){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(20);
                
            }else if(currentHour >= 8){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(14);
                
            }else if(currentHour >= 2){
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(8);
                
            }
            return restDate;
    },
    
    restEvery12: function (){
            
            var date = new Date();
            var currentHour = date.getUTCHours();
            var currentDay  = date.getUTCDate();
            var restDate = new Date();
                restDate.setUTCMinutes(0);
                restDate.setUTCSeconds(0);
                
           if(currentHour >= 20){
               
                restDate.setUTCDate(Number(currentDay) + 1);
                restDate.setUTCHours(8);
                
            }else{
                
                restDate.setUTCDate(currentDay);
                restDate.setUTCHours(20);
                
            }
            return restDate;
        }
};




function getUnitObj(type){
    
    if(WorldUnit.isEmpty(type)){
        return allUniteType.empty;
    }
    
    else if(WorldUnit.isRiver(type)){
        return allUniteType.lake;
    }
    
    else if(WorldUnit.isMountain(type)){
        return  allUniteType.mountain;
    }
    else if(WorldUnit.isDesert(type)){
        return  allUniteType.desert;
    }
    
    else if(WorldUnit.isWood(type)){
        return  allUniteType.wood;
    }
    
}



var WorldUtil = {
    
    tooltipHeader: function (xCoord , yCoord){
        var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
        if(Elkaisar.World.UnitTypeData[Unit.ut].lvlChange)
            return  `${Elkaisar.World.UnitTypeData[Unit.ut].Title} مستوى ${Elkaisar.World.UnitTypeData[Unit.ut].maxLvl > 0 ?  (Elkaisar.World.UnitTypeData[Unit.ut].maxLvl <= Unit.l ? "---" : Unit.l) : Unit.l}`
        else 
             return  `${Elkaisar.World.UnitTypeData[Unit.ut].Title}`;
            
    },
    getDesc: function (type , x_coord , y_coord){
        
        if(WorldUnit.isBarrary(type)){
            
            return unitLvlPrize[WorldUnit.getWorldUnit(x_coord , y_coord).l] === ""? "" :unitLvlPrize[WorldUnit.getWorldUnit(x_coord , y_coord).l];
            
        }else if(WorldUnit.isCity(type)){   // جبال صحراء و غابات
            
            WorldUtil.descForCity(x_coord , y_coord).done(function (data){
                
                var tooltip = ` 
                                <div class="map-tooltip city-unit-tooltip">
                                    <div class="tt-header">
                                        <div class="coords">
                                            [ ${getArabicNumbers(y_coord)} ,  ${getArabicNumbers(x_coord)}]    <span class="distance">${getDistance(x_coord,y_coord)} ميل</span>
                                        </div>

                                    </div>
                                    <div class="tt-desc">
                                        <div class="tt-title friend">
                                            ${data.name}
                                        </div>
                                        <table>
                                            <tr>
                                                <td>الملك</td>
                                                <td class="friend">${data.p_name}</td>
                                            </tr>
                                            <tr>
                                                <td>الاتحاد</td>
                                                <td class="friend">${data.guild}</td>
                                            </tr>
                                            <tr>
                                                <td>البرستيج</td>
                                                <td>${getArabicNumbers(data.prestige)}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>`;
                  
                    if(Crafty("UnitToolTip").get().length === 0){
                        
                        Crafty.e("HTML , UnitToolTip").append(tooltip).attr({x:x_coord*64-y_coord*64+100 ,y :x_coord*32+y_coord*32+100 , z:99999999999});
                        
                    }else{
                        
                        Crafty("UnitToolTip").get(0).replace(tooltip).attr({x:x_coord*64-y_coord*64+100 ,y :x_coord*32+y_coord*32+100, z:999999999999 });
                        
                    }
               
                
            });
            

            
        }else if(WorldUnit.isMonawrat(type)){ // مناورات
            
             return ` يمكنك الحصول على هدايا قيمة م مجلس الشيوخ مثل تسريع التديب ,خبز وايضا قلادات حمراء`;
             
        }else if(WorldUnit.isCamp(type)){ // معسكرات
            
             return `من هنا يتم الحصول على الشعارت لتبديلها مع مواد من صندوق المواد وايضا الحصول على معدات`;
             
        } else if(WorldUnit.isEmpty(type)){
            
            return " يمكنك   بناء مدينة هنا";
            
        } else if(WorldUnit.isAsianSquads(type)){
            return " مواد بناء وترقية , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات  المتمردة فى اسيا";
        } else if( WorldUnit.isGangStar(type)){
            return "حزم جيوش , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات المتمردة";
        } else if( WorldUnit.isCarthagianArmies(type) ){
            return "حزم جيوش , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات المتمردة";
        } else if(WorldUnit.isArmyCapital(type)){
            return "حزم جيوش , موارد , خام,...ألخ  يمكن الحصول عليها من عاصمة الجيوش وذالك بسبب قوتها الجبارة";
        } else if(WorldUnit.isArena(type)){
            return "لتحكم العالم عليك اثبات جدارتك اولا , تحدى الملوك و قم بالفوز...";
        } else if(WorldUnit.isQueenCity(type)){
            return "تحدى الملكات بين الاحلاف لاثبات  الاجدر بينهم";
        } else if(WorldUnit.isRepelCastle(type)){
            return "تحدى القلاع بين الاحلاف لاثبات  الاجدر بينهم";
        } else if(WorldUnit.isStatueWalf(type)){
            return "نافس الذئاب فى وكرهم وسيكون من نصيبك جوائز قيمة";
        } else if(WorldUnit.isStatueWar(type)){
            return "تمثال الحرب رمز للصمود فى العصور القديمة, اذا تمكنت من هدم الاسطورة سيكون من نصيبك جوائز قيمة";
        }
        
        
    },
    descForCity : function (x_coord , y_coord){

        return  $.ajax({
            url:"api/city.php",
            data: {
                get_data_by_coords: true,
                x_coord: x_coord,
                y_coord: y_coord,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            dataType: 'JSON'
            
        });
      
    },
    showMapTooltip:function (x_coord , y_coord){
        
            var unit = WorldUnit.getWorldUnit(x_coord , y_coord);
            var desc = WorldUtil.getDesc(unit.ut  , x_coord , y_coord) ;
            
            if($.isEmptyObject(unit.entite))
            {
                console.log(unit, x_coord, y_coord);
            }
                
            var tooltip = ` <div class="map-tooltip">
                                <div class="tt-header">
                                    <div class="coords">
                                       [ ${getArabicNumbers(y_coord)}  , ${getArabicNumbers(x_coord)}  ]  
                                    </div>
                                </div>
                                <div class="tt-title">
                                       ${WorldUtil.tooltipHeader(Number(unit.x) , Number(unit.y))}
                                </div>
                                <div class="tt-desc">
                                    ${desc}
                                </div>
                            </div>`;

                if(Crafty("UnitToolTip").get().length === 0){

                    Crafty.e("HTML , UnitToolTip").append(tooltip).attr({x:unit.entite.x+100 ,y :unit.entite.y+100 , z:100000000});

                }else{

                    Crafty("UnitToolTip").get(0).replace(tooltip).attr({x:unit.entite.x+100 ,y :unit.entite.y+100 , z:100000000});

                }
                    
                
            
                                 
    }
    
    

};


function uniteMapClick(x_coord , y_coord)
{
    var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
    var type = unit.ut;
    var lvl  = unit.l;
    var state = unit.s;
    
    if(WorldUnit.isEmpty(type)){  // مكان خالى 
        
        var city_counts = Object.keys(Elkaisar.DPlayer.City).length;
        
        var box = ` <div id="unit_review" class="bg-general" x_coord="${x_coord}" y_coord="${y_coord}" type="0" lvl="${lvl}">
                        <div class="header">
                            <div class="title banner-red">
                                مكان خالى
                            </div>
                            <div class="close_RB">
                                <img src="images/btns/close_b.png">.
                            </div>
                        </div>
                        <div class="content">
                            <div class="right_cont">
                                <div class="dist">
                                    <div class="coords" style="margin-right: 37px">
                                        <a href="#">[${y_coord} , ${x_coord}]</a>
                                    </div>
                                    <div class="mile">
                                        ${getDistance(x_coord, y_coord)} ميل
                                    </div>
                                    <div class="copy-coord-icon">
                                        <button class="copy-coord" data-x-coord="${x_coord}" data-y-coord="${y_coord}"></button>
                                    </div>
                                </div>
                                <div class="new-city-req-table">
                                    <table class="req_table " border="0"> 
                                        <tbody> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/food.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.food) < Math.pow(10,city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10,city_counts + 3)} 
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/stone.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.stone) < Math.pow(10,city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10,city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                            </tr> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/wood.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.wood) < Math.pow(10,city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10,city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/iron.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.metal) < Math.pow(10,city_counts + 3) ? "not_enough" : "enough"} "> 
                                                        ${Math.pow(10,city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                            </tr> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/coin.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.coin) < Math.pow(10,city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10,city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/wait.png"> 
                                                    <div class="amount sol-people"> 
                                                        0 ث
                                                    </div> 
                                                </td> 
                                            </tr> 
                                        </tbody> 
                                    </table> 
                                    
                                    <div class="province">${Translate.Text.Province[UserLag.language]}: ${Elkaisar.World.Province.getTitle(x_coord , y_coord)}</div>
                                    
                                </div>
                            </div>
                            <div class="left_cont">
                                <div class="unite_image">
                                    <div style="background-image:url(images/world/snap-shot/empty-place.jpg)"></div>
                                </div>
                                <div class="required-prom">
                                    <label>تصنيف لنبيل:</label><span class="${Number(Elkaisar.DPlayer.Player.porm) < city_counts*2 ? "not_enough" :"enough" }">${Elkaisar.BaseData.Promotion[city_counts*2].Title}</span>
                                </div>
                            </div>
                        </div>
                        <div class="footer  new-city-footer">
                            <ul>
                                <div class="inputs">
                                    <div class="input-wrapper pull-L">
                                        <input id="new-city-name" ${canBuildNewCity(x_coord , y_coord)?"" : "disabled='disabled'"} type="text" class="input" placeholder="اسم المدينة الجديدة"/>
                                    </div>
                                    <div  id="new-city-confirm" class="pull-R">
                                        <button class="full-btn-3x" ${canBuildNewCity(x_coord , y_coord)?"" : "disabled='disabled'"} data-x-coord="${x_coord}" data-y-coord="${y_coord}"> بناء مدينة</button>
                                    </div>
                                </div>
                            </ul>

                        </div>
                    </div>`;
        
        $("#unit_review").remove();   
        $("body").append(box);
        
        
    }
    
    else if(WorldUnit.isBarrary(type)){ // show  review box  for barary
        
       
       
       /*
        *unitObj holds  the name of unit   and the prize from it 
        */
        var unitObj = getUnitObj(type);

        var title = `${Elkaisar.World.UnitTypeData[type].Title}  مستوى ${getArabicNumbers(lvl)}`;
        
        var desc = reviewBox.descForBarray(type , lvl);
        var box = reviewBox.getSmallBox(x_coord , y_coord , type , title , desc , lvl , state , `images/world/snap-shot/${Elkaisar.World.UnitTypeData[type].WSnapShoot}`);
        $("#unit_review").remove();   
        $("body").append(box);
         addRemainBarryData(x_coord , y_coord);
            
       
        
    }
    
    else if(WorldUnit.isCity(type)){   // review bo for city
       
        $.ajax({
            
            url:"api/city.php",
            data: {
                get_data_by_coords: true,
                x_coord: x_coord,
                y_coord: y_coord,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    
                }else{
                    
                    alert(data);
                    console.log(data);
                    return ;
                    
                }
                
                var lvl_ = lvl ? lvl :0;
     
                var title = json_data.name;
                
                WorldCurrentUnit.__id_guild    = json_data.id_guild;
                WorldCurrentUnit.__id_city     = json_data.id_city;
                WorldCurrentUnit.__id_player   = json_data.id_player;
                WorldCurrentUnit.__player_name = json_data.p_name;
                WorldCurrentUnit.__guild_name  = json_data.guild;
                
                var desc = reviewBox.descForCity(json_data.p_name , json_data.prestige , json_data.guild);
                
                var box = reviewBox.getSmallBox(x_coord , y_coord ,
                                        type , title , desc , lvl , 
                                        WorldCurrentUnit.__state, 
                                        PLAYER_FACES[json_data.avatar]);
                                        
                $("#unit_review").remove();   
                $("body").append(box);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    
    
    else{
        
        campDB.showDialogBox(x_coord , y_coord);
        $("#camp-over-view-desc").niceScroll(SCROLL_BAR_PROP);
        
         WorldUnit.refreshUnitData(x_coord , y_coord).done( function (data){
            
            if(isJson(data)){
                var jsonData = JSON.parse(data);
                WorldUnit.getWorldUnit(x_coord, y_coord).l = jsonData.l;
            }else{
                alert(data);
                return ;
            }
            campDB.equipRow(jsonData.equip);
            campDB.armyRow(jsonData.hero);
            
            if(Number(jsonData.l) >  Elkaisar.World.UnitTypeData[type].maxLvl){
                return ;
            }else  if(!Elkaisar.World.UnitData.isAttackable(type)){
                return ;
            }else if(Number(jsonData.lo) === 1){
                return;
            }else {
                $("#JOIN_ATTACK").removeAttr("disabled"); 
                $("#START_ATTACK").removeAttr("disabled"); 
            }
            
            
       
            
        });
    } 
    
    
    
}




function canBuildNewCity(x_coord , y_coord)
{
    var city_counts = Object.keys(Elkaisar.DPlayer.City).length
    if(!WorldUnit.isEmpty(WorldUnit.getWorldUnit(x_coord , y_coord).ut)){
        return false;
    }else if(Number(Elkaisar.CurrentCity.City.food) < Math.pow(10,city_counts + 3)){
        return false;
    }else if(Number(Elkaisar.CurrentCity.City.wood) < Math.pow(10,city_counts + 3)){
        return false;
    }else if(Number(Elkaisar.CurrentCity.City.stone) < Math.pow(10,city_counts + 3)){
        return false;
    }else if(Number(Elkaisar.CurrentCity.City.metal) < Math.pow(10,city_counts + 3)){
        return false;
    }else if(Number(Elkaisar.CurrentCity.City.coin) < Math.pow(10,city_counts + 3)){
        return false;
    }else if(Number(Elkaisar.DPlayer.Player.porm) < city_counts*2){
        return false;
    } 
    
    return true;
    
}


function getDistance(x , y){
    var difX = Math.abs(Elkaisar.CurrentCity.City.x - x);
    var difY = Math.abs(Elkaisar.CurrentCity.City.y - y);
    console.log(difX, difY)
    if(difX > 249)
        difX -= 500;
    if(difY > 249)
        difY -= 500;
    console.log(difX, difY)
    return (Math.floor(Math.sqrt(Math.pow((difX),2) + Math.pow((difY),2)))*6000);
}


 var reviewBox = {
     
    getSmallBox:function (x_coord , y_coord , type ,title, desc , lvl , state , snap_shoot){
        
        
        var box = `<div id="unit_review" class="bg-general" x_coord = "${x_coord}" y_coord="${y_coord}" type="${type}" lvl="${lvl}">
                        <div class="header">
                            <div class="title banner-red">
                                 ${title}
                            </div>
                            <div class="close_RB">
                                <img src="images/btns/close_b.png"/>.
                            </div>
                        </div>
                        <div class="content">
                            <div class="left_cont">
                                <div class="unite_image">
                                    <div style="background-image:url(${snap_shoot})"></div>
                                </div>
                                <button class="battel-field" ${Number(state) === 0 ? " disabled" : ""} data-title="${title}">
                                    ارض المعركة
                                </button>
                            </div>
                             <div class="right_cont">
                                <div class="dist">
                                   <div class="coords" style="margin-right: 37px">
                                       <a href="#">[${y_coord} , ${x_coord}]</a>
                                   </div>
                                   <div class="mile">
                                        ${getDistance(x_coord , y_coord)} ميل
                                   </div>
                                   <div class="copy-coord-icon">
                                        <button class="copy-coord" data-x-coord="${x_coord}" data-y-coord="${y_coord}"></button>
                                    </div>
                                </div>
                                <div class="desc">
                                    <div class="province">${Translate.Text.Province[UserLag.language]}: ${Elkaisar.World.Province.getTitle(x_coord , y_coord)}</div>
                                   ${desc}
                                </div>
                                <div class="under-desc">
                                </div>
                                <div class="prize-list">
                                    <ul></ul>
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            ${this.footer(type)}
                        </div>
                    </div>`;
        return box;             
    },
    
    descForBarray: function (type , lvl){
        return ` <p>
                    زيادة انتاج ${getUnitObj(type).prod} بمقدار ${getArabicNumbers(3*lvl)}% فى مديتك
               </p>`;
    },
    descForCity: function (p_name , prestige , union ){
        
        
        
        var desc = `<div class="name bg-btn-blu">
                        <h1>
                            ${p_name}
                        </h1>
                        <div class="msg_icon">
                            ${Number(WorldCurrentUnit.__id_player) === Number(Elkaisar.DPlayer.Player.id_player) ? "":
                                    `<img src="images/tech/message_icon.png" 
                                        id="mail-player-from-world" data-id-player="${WorldCurrentUnit.__id_player}"
                                        data-player-name="${WorldCurrentUnit.__player_name}"/>`}
                        </div>
                    </div>
                    <table class="player-table-data">
                        <tr>
                            <td>${getArabicNumbers(prestige)}</td>
                            <td>البرستيج</td>
                        </tr>
                        <tr>
                            <td>${union}</td>
                            <td>الاتحاد</td>
                        </tr>
                        <tr>
                            <td>طبيعي</td>
                            <td>الحالة </td>
                        </tr>
                    </table>`;
        return desc;
    },
    footer: function (type){
        
        var recource_supply = "";
        
        for(var ii in Elkaisar.DPlayer.City)
        {
            
            var CCity =  Elkaisar.DPlayer.City[ii];
            if(Number(CCity.City.x) !== Number(WorldCurrentUnit.coord_x))
                continue;
            if(Number(CCity.City.y) !== Number(WorldCurrentUnit.coord_y))
                continue;
            
            return ` <ul id="footer_bar">
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY}">
                            <img src="images/icons/war-icon/enter-city.png" /> 
                        </li>
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_HERO_TRANS}">
                            <img src="images/icons/war-icon/supply.png"/> 
                        </li>
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY}">
                            <img src="images/icons/war-icon/resource-supply.png"/> 
                        </li>
                    </ul>`;
            
        }
        
        if(WorldUnit.isCity(type)){
            
            recource_supply = ` <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY}">
                                        <img src="images/icons/war-icon/resource-supply.png"/> 
                                    </li>`;
            
        }
        
        if(Number(WorldCurrentUnit.__id_guild) === Number(Elkaisar.DPlayer.Player.id_guild) && !isNaN(Elkaisar.DPlayer.Player.id_guild)){
            
            return `<ul id="footer_bar">
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT}">
                            <img src="images/icons/war-icon/supply.png"/> 
                        </li>
                        ${recource_supply}
                    </ul>`;
            
        }
        
        
        return `<ul id="footer_bar">
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_CONQUER}">
                        <img src="images/icons/war-icon/attack.png" /> 
                    </li>
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE}">
                        <img src="images/icons/war-icon/dominate.png"/> 
                    </li>   
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY}">
                        <img src="images/icons/war-icon/spy.png"/> 
                    </li>
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT}">
                        <img src="images/icons/war-icon/supply.png"/> 
                    </li>
                    ${recource_supply}
                </ul>`;
    },
    
    battelField: function (x_coord , y_coord , title , unit_type){
       
        var dialoge_box = `<div id="dialg_box_two" type="battel_field" style="top: 125px;" x_coord="${x_coord}" y_coord="${y_coord} data-unit-type="${unit_type}">
                                <div class="head_bar">
                                    <img src="images/style/head_bar.png">
                                    <div class="title">ارض المعركة</div>
                                </div>
                                <div class="nav_bar">
                                    <div class="right-nav">
                                        <div class="nav_icon">

                                            <img class="close_BF_dialog_box" src="images/btns/close_b.png">
                                        </div>
                                     </div>
                                        <div class="left-nav">
                                             <ul>
                                                <li head_title="battle">ارض المعركة</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="box_content for_report">

                                    <div class="left-content " id="reports_list_BF">
                                        <div class="th ellipsis">
                                            ${Translate.Title.TH.Subject[UserLag.language]}
                                        </div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                    </div>

                                    <div class="right-content ">
                                        <div class="rest-time">
                                            <h6> الوقت المتبقى: </h6>
                                            <span id="AJAX-REMAIN-TIME">
                                            </span>
                                        </div>
                                        <div class="report_state">
                                            <div class="defense-side">
                                                <div class="banner-red">
                                                    ${title}
                                                </div>
                                                <div class="image">

                                                    <img src="images/style/defense.png" class="big-img">
                                                    <div class="joined-num" id="AJAX-DEF-NUM"></div>
                                                </div>
                                                <div class="full-btn" id="JOIN_DEFENCE_SIDE">

                                                </div>
                                            </div>
                                            <div class="attack-side">
                                                <div class="banner-red" id="AFTER_AJAX_ATTACKER">

                                                </div>
                                                <div class="image">
                                                    <img src="images/style/attack.png" class="big-img">
                                                    <div class="joined-num" id="AJAX-ATK-NUM"></div>
                                                </div>
                                                <div class="full-btn" id="JOIN_ATTACK_SIDE">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="down_report">
                                            <div class="reload">
                                                <div class="full-btn ">
                                                    الاستخبارات
                                                </div>
                                                <div class="full-btn deactive">
                                                    تحديث المعركة 
                                                </div>
                                            </div>
                                            <div class="time_start">
                                                وقت البداء: 
                                                <span>٤٣&nbsp;ث&nbsp;٣٨&nbsp;د&nbsp;٥&nbsp;س&nbsp; </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>                
                            </div>`;
        
        
            $("body").append(dialoge_box);
        
        
    },
    
    refreshBattaelField: function (){
        
       var x_coord   = parseInt($("#dialg_box_two").attr("x_coord")) ;
       var y_coord   = parseInt($("#dialg_box_two").attr("y_coord")) ;
       var id_battel = $("#reports_list_BF .selected").attr("id_battel");
       
       if(!isNaN(x_coord) || !isNaN(y_coord) ){
           
           $.ajax({
               
                url: "api/battel.php",
                data:{
                    GET_BATTEL_FIELD_DATA:true,
                    x_coord:x_coord,
                    y_coord:y_coord,
                    id_player:ID_PLAYER,
                    token:TOKEN
                },
                type: 'GET',
                cache: false,
                beforeSend: function (xhr) {
                    
                },
                success: function (data, textStatus, jqXHR) {
                    
                    /*[{"id_battel":"1","x_city":"151","y_city":"32","city_name":"MuStapha","player_name":"mustpaha_1"}]*/
                    var json_data = JSON.parse(data);
                    
                    var all_reportHeader = "";
                    for(var iii = 0 ; iii < 14 ; iii++){
                        
                        if(json_data[iii]){
                            
                            all_reportHeader += `<div class="tr has_battel_BF ${json_data[iii].id_battel === id_battel || (id_battel === undefined && iii === 0)? "selected" : ""}"  id_battel="${json_data[iii].id_battel}"  >
                                                    قام الملك ${json_data[iii].player_name} بانشاء  معركة    من المدينة  ${json_data[iii].city_name}
                                                </div>`;
                            
                        }else{
                            
                           all_reportHeader += `<div class="tr" > </div>`; 
                            
                        }
                        
                        
                    }
                    
                    $("#reports_list_BF").html(`<div class="th ellipsis">${Translate.Title.TH.Subject[UserLag.language]}</div>` + all_reportHeader);
                    reviewBox.refreshBattelDetail();
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
               
               
           });
           
       }
        
    },
    
    refreshBattelDetail: function (){
        
        var id_battel = false;
        
        $("#reports_list .tr , #reports_list_BF .tr").each(function (){
            
            if($(this).hasClass("selected")){
                
                id_battel = parseInt($(this).attr("id_battel"));
                
            }
            
        });
        
        if(!id_battel){
            
            id_battel = parseInt($("#reports_list .tr:first").attr("id_battel")) ||
                        parseInt($("#reports_list_BF .tr:first").attr("id_battel")) ||
                       false;
        }
        
        if(!id_battel){
            return ;
        }
        
        $.ajax({
               
            url: "api/battel.php",
            data:{
                GET_BATTEL_FIELD_DETAIL:true,
                id_battel:id_battel,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                /* {"time_start":"1539888070","time_end":"1549995750","attack_num":1,"defence_num":0}*/
                var json_data = JSON.parse(data);
                
                $("#AJAX-DEF-NUM").html(getArabicNumbers(json_data.defence_num));
                $("#AJAX-ATK-NUM").html(getArabicNumbers(json_data.attack_num));
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }


       });
        
    },
    firstClikBattelData: function (id_battel, x_coord , y_coord){
        
        if(id_battel === false){
            
            $.ajax({
            
                url: "api/battel.php",
                data:{

                    GET_BATTEL_FIXED_DATA:true,
                    x_coord:x_coord,
                    y_coord:y_coord,
                    id_player:ID_PLAYER,
                    token:TOKEN
                },
                type: 'GET',
                beforeSend: function (xhr) {

                },
                success: function (data, textStatus, jqXHR) {

                    /*{"time_end":"1549995750","time_start":"1539888070","name":"MuStapha"}*/
                    var json_data = JSON.parse(data);
                    
                    $("#AFTER_AJAX_ATTACKER").html(json_data.name);
                    $("#AJAX-REMAIN-TIME").addClass("time_counter");
                    $("#AJAX-REMAIN-TIME").attr("time-end" , json_data.time_end);
                    $("#JOIN_ATTACK_SIDE").html("انضمام للهجوم");
                    $("#JOIN_DEFENCE_SIDE").html("انضمام للدفاع");
                    $("#JOIN_ATTACK_SIDE").attr("data-id-battel"  , json_data.id_battel);
                    $("#JOIN_DEFENCE_SIDE").attr("data-id-battel" , json_data.id_battel);
                    
                    $("#JOIN_ATTACK_SIDE").attr("data-x_coord"  , x_coord);
                    $("#JOIN_ATTACK_SIDE").attr("data-y_coord" , y_coord);
                    $("#JOIN_DEFENCE_SIDE").attr("data-x_coord"  , x_coord);
                    $("#JOIN_DEFENCE_SIDE").attr("data-y_coord" , y_coord);
                    
                    $("#JOIN_ATTACK_SIDE").attr("data-title" , $.trim($(".attack-side .banner-red").html()));
                    $("#JOIN_DEFENCE_SIDE").attr("data-title" , $.trim($(".defense-side .banner-red").html()));
                    
                    

                },
                error: function (jqXHR, textStatus, errorThrown) {

                }

            });
            
        }else{
            
            $.ajax({
            
                url: "api/battel.php",
                data:{

                    GET_BATTEL_FIXED_DATA:true,
                    id_battel:id_battel,
                    id_player:ID_PLAYER,
                    token:TOKEN
                },
                type: 'GET',
                beforeSend: function (xhr) {

                },
                success: function (data, textStatus, jqXHR) {
                    
                    if(!isJson(data)){
                        alert(data);
                        return ;
                    }
                    var json_data = JSON.parse(data);
                    
                    $("#AFTER_AJAX_ATTACKER").html(json_data.name);
                    $("#AJAX-REMAIN-TIME").addClass("time_counter");
                    $("#AJAX-REMAIN-TIME").attr("time-end" , json_data.time_end);
                    $("#JOIN_ATTACK_SIDE").html("انضمام للهجوم");
                    $("#JOIN_DEFENCE_SIDE").html("انضمام للدفاع");
                    $("#JOIN_ATTACK_SIDE").attr("data-id-battel"  , json_data.id_battel);
                    $("#JOIN_DEFENCE_SIDE").attr("data-id-battel" , json_data.id_battel);

                },
                error: function (jqXHR, textStatus, errorThrown) {

                }

            });
            
        }
        
        
    }
 };



$(document).on("click" , ".close_RB img" , function (){
    $("#unit_review").remove();
});




$(document).on("click" , "#smallMap-icon img" , function (){
    
    var myCityIcons = "";
    
    for(var iii in Elkaisar.DPlayer.City){
        
        myCityIcons += `
                         <lable type="18" style="background-image: url(images/world/map-icon/myCity.png); width:20px; height:20px; left: ${Elkaisar.DPlayer.City[iii].City.x}px; top: ${Elkaisar.DPlayer.City[iii].City.y}px"></lable>`;
        
    }
    
    var smallMap = `<div id="smallMap">
                        <img src="images/world/smallMap.jpg"/>
                        <div id="smallMap_close">
                            <img src="images/btns/close_b.png"/>
                        </div>
                        <div class="overMap">
                            <div id="CURRENT_CURSOR_COORDS"></div>
                            <lable type="${WUT_CAMP_ASIANA}" style="background-image: url(images/world/ratterCastle.png); left: 78px; top: 300px"></lable>
                            <lable type="${WUT_CAMP_BRITONS}" style="background-image: url(images/world/ratterCastle.png); left: 88px; top: 444px"></lable>
                            <lable type="${WUT_CAMP_CARTHAGE}" style="background-image: url(images/world/ratterCastle.png); left: 106px;top: 19px"></lable>
                            <lable type="${WUT_CAMP_EGYPT}" style="background-image: url(images/world/ratterCastle.png); left: 136px;top: 160px"></lable>
                            <lable type="${WUT_CAMP_GAULS}" style="background-image: url(images/world/ratterCastle.png); left: 246px;top: 111px"></lable>
                            <lable type="${WUT_CAMP_HISPANIA}" style="background-image: url(images/world/ratterCastle.png); left: 266px;top: 245px"></lable>
                            <lable type="${WUT_CAMP_ITALIA}" style="background-image: url(images/world/ratterCastle.png); left: 316px;top: 450px"></lable>
                            <lable type="${WUT_CAMP_MACEDON}" style="background-image: url(images/world/ratterCastle.png); left: 392px;top: 213px"></lable>
                            <lable type="${WUT_CAMP_PARTHIA}" style="background-image: url(images/world/ratterCastle.png); left: 407px;top: 66px"></lable>
                            <lable type="${WUT_CAMP_REICH}" style="background-image: url(images/world/ratterCastle.png); left: 427px;top: 337px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 300px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 300px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 470px"></lable>
    
    
    
    
    
    
    
                            <lable type="${WUT_FRONT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 464px;top:  93px"></lable>
                            <lable type="${WUT_FRONT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 463px;top:  86px"></lable>
                            <lable type="${WUT_FRONT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 447px;top:  72px"></lable>
                            <lable type="${WUT_FRONT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 450px;top:  69px"></lable>
                            <lable type="${WUT_FRONT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 432px;top:  52px"></lable>
                            <lable type="${WUT_FRONT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 434px;top:  56px"></lable>
                            <lable type="${WUT_FRONT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 417px;top:  39px"></lable>
                            <lable type="${WUT_FRONT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 412px;top:  37px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 470px;top:  76px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 473px;top:  72px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 458px;top:  62px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 456px;top:  58px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 445px;top:  48px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 442px;top:  47px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 427px;top:  33px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 431px;top:  30px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 475px;top:  57px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 479px;top:  60px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 467px;top:  47px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 465px;top:  49px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 453px;top:  37px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 457px;top:  36px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 446px;top:  28px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 441px;top:  23px"></lable>
                            <lable type="${WUT_GUARD_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 480px;top:  42px"></lable>
                            <lable type="${WUT_GUARD_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 475px;top:  35px"></lable>
                            <lable type="${WUT_GUARD_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 464px;top:  26px"></lable>
                            <lable type="${WUT_GUARD_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 458px;top:  20px"></lable>
                            <lable type="${WUT_BRAVE_THUNDER}" style="background-image: url(images/world/map-icon/dr.png); left: 478px;top:  21px"></lable>
 
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 44px;top:  465px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 353px;top:  233px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 284px;top:  141px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 281px;top:  299px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 264px;top:  458px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 367px;top:  87px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 122px;top:  154px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 74px; top:  33px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 74px; top:  326px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 472px;top:  379px"></lable>
    
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 363px;top: 76px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 354px;top: 233px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 59px;top:  456px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 467px;top: 370px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 282px;top: 297px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 77px;top:  33px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 262px;top: 459px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 261px;top: 137px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 136px;top: 158px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 75px;top:  325px"></lable>
    
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 474px;top:  378px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 135px;top:  157px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 352px;top:  237px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 286px;top:  296px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 259px;top:  136px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 286px;top:  296px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 135px;top:  157px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 259px;top:  136px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 260px;top:  458px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 474px;top:  378px"></lable>
    
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 66px; top:  470px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 220px;top:  463px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 187px;top:  493px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 133px;top:  410px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 58px; top:  452px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 136px;top:  450px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 50px; top:  433px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 150px;top:  433px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 44px; top:  472px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 159px;top:  408px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 32px; top:  495px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 28px; top:  489px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 24px; top:  429px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 11px; top:  400px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 79px; top:  490px"></lable>
    
    
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 1px;   top:  380px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 16px;  top:  380px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 47px;  top:  486px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 57px;  top:  410px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 64px;  top:  470px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 73px;  top:  483px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 81px;  top:  425px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 86px;  top:  429px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 104px; top:  469px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 109px; top:  440px"></lable>
    
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 40px;  top:  412px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 67px;  top:  395px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 80px;  top:  469px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 83px;  top:  418px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 85px;  top:  428px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 85px;  top:  461px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 95px;  top:  418px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 99px;  top:  392px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 120px; top:  450px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 132px; top:  448px"></lable>
    
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 80px;  top:  460px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 88px;  top:  448px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 90px;  top:  476px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 94px;  top:  463px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 104px; top:  483px"></lable>
    
                            <lable type="56" style="background-image: url(images/world/map-icon/p33.png); left: 103px; top:  447px"></lable>
                            
                            <lable type="100" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 235px; top:  125px"></lable>
                            <lable type="101" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 140px; top:  170px"></lable>
                            <lable type="102" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 400px; top:  230px"></lable>
                            <lable type="103" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 255px; top:  266px"></lable>
                            <lable type="104" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 80px;  top:  280px"></lable>
                            <lable type="105" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 400px; top:  340px"></lable>
                            
                            
                            <lable type="125" style="background-image: url(images/world/map-icon/arena.png); width:15px; height:15px; left: 249px; top:  247px"></lable>
    
                            <lable type="130" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:  100px"></lable>
                            <lable type="131" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:   90px"></lable>
                            <lable type="132" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:   80px"></lable>
                            <lable type="134" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:  100px"></lable>
                            <lable type="135" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:   90px"></lable>
                            <lable type="136" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:   80px"></lable>
    
                            <lable type="150" style="background-image: url(images/world/map-icon/npcBlue.png); left: 320px; top:  410px"></lable>
                            <lable type="151" style="background-image: url(images/world/map-icon/npcBlue.png); left: 330px; top:   410px"></lable>
                            <lable type="152" style="background-image: url(images/world/map-icon/npcBlue.png); left: 340px; top:   410px"></lable>
                            <lable type="153" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 320px; top:  420px"></lable>
                            <lable type="154" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 330px; top:   420px"></lable>
                            <lable type="155" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 340px; top:   420px"></lable>
    
                            
                            ${myCityIcons}
                            
                        </div>
                    </div>`;
    
    if($("#smallMap").length >0){
        
    }else{
        $("body").append(smallMap);
    }
    
    CURRENT_CURSOR_COORDS = $("#CURRENT_CURSOR_COORDS");
    
});





$(document).on("mouseover" , ".overMap lable" , function (){
    
    var type = parseInt($(this).attr("type"));
    var x_coord = parseInt($(this).css("left").replace("px" , ""));
    var y_coord = parseInt($(this).css("top").replace("px" , ""));
    
    
    $.ajax({
            url: `${API_URL}/api/AWorld/refreshWorldUnitLvl`,
            type: 'GET',
            data: {
                xCoord : x_coord,
                yCoord : y_coord,
                server : Elkaisar.Config.idServer,
                token  : Elkaisar.Config.OuthToken
            },
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                
                WorldUnit.getWorldUnit(x_coord, y_coord).l = JsonObject.l;
                
                var tooltip = `<div class="map-tooltip" style="left:${x_coord+15}px; top: ${y_coord+15}px">
                                    <div class="tt-header">
                                        <div class="coords">
                                           [ ${getArabicNumbers(y_coord) /*هى المفروض بالعكس بس العربى بيعكس يعنى الى بيظهر هنا هو الاكس*/} , ${getArabicNumbers(x_coord)}]  
                                        </div>
                                    </div>
                                    <div class="tt-title">
                                           ${WorldUtil.tooltipHeader(x_coord , y_coord)}
                                    </div>
                                    <div class="tt-desc">
                                        ${WorldUtil.getDesc(WorldUnit.getWorldUnit(x_coord, y_coord).ut , x_coord , y_coord) }
                                    </div>
                                </div>`;
                $(".map-tooltip").remove();
                $(".overMap").append(tooltip);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
});

$(document).on("mouseout" , ".overMap lable" , function (){ $(".map-tooltip").remove(); });
$(document).on("click" , "#smallMap_close img" , function (){ $("#smallMap").remove(); });
$(document).on("mouseleave" , "#cr-stage canvas", function (){Crafty("UnitToolTip").each(function (){this.destroy()}); });





/*
 * عشان اهجم على المعسكرات والمناورات
 */
$(document).on("click" , "#START_ATTACK" , function (){
    
   var x_coord = parseInt($(this).attr("data-x-coord"));
   var y_coord = parseInt($(this).attr("data-y-coord"));
   var Unit    = WorldUnit.getWorldUnit(x_coord, y_coord);
   var type    = Unit.ut;
   var lvl     = Unit.l;
    
    var battel = {
        x_coord : x_coord,
        y_coord : y_coord,
        ar_title: Elkaisar.World.UnitTypeData[type].Title ,
        task : BATTEL_TYPES_CONST.ATTACK,
        task_title:"هجوم",
        time:calAttakTime(),
        type: type
    };  
    
    var hero_object;
   
   for(var iii in Elkaisar.DPlayer.Heros)
   {
       if(Elkaisar.DPlayer.Heros[iii].Hero.id_city  != Elkaisar.CurrentCity.City.id_city)
            continue;
       if( Elkaisar.DPlayer.Heros[iii].Hero.in_city == 1 && Elkaisar.DPlayer.Heros[iii].Hero.console == 0){
                Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
                army.getCurrentArmy(Elkaisar.CurrentHero);
            break;
        }
   }
   
     
    
    $("#dialg_box").remove();
    
    var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero , battel);
    var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language] , NavBar.Hero , content);
     if($("#dialg_box").length > 0){
                 $("#dialg_box").animate({top:"-800px"}, 200 , "linear" , function (){
                    $(this).remove();
                    $("body").append(dialog_box );
                    $("#dialg_box").attr("type" , "hero");
                    $("#dialg_box").animate({top:"150px"}, 200);
                    $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
                 });
            }else {
                $("body").append(dialog_box );
               
                $("#dialg_box").attr("type" , "hero");
                $("#dialg_box").animate({top:"150px"}, 200);
                $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
            }
      
    $(".left-nav ul li").each(function (){
        if($(this).attr("head_title") === "camp"){
            $(this).addClass("selected");
        }
    });
    
    
});



$(document).on("click" , ".battel-field" , function (){
    
    var title = $(this).attr("data-title");
    var x_coord = parseInt($("#unit_review").attr("x_coord"));
    var y_coord = parseInt($("#unit_review").attr("y_coord"));
    var unite_type = parseInt($("#unit_review").attr("type"));
    
    $("#unit_review").remove();
    
    BattelField.battelField({x_coord: x_coord, y_coord:y_coord, unite_type:unite_type, navBar: BattelFieldNavBar, totalBox: true});
    
    /*
    reviewBox.battelField(x_coord , y_coord , title , unite_type);
    reviewBox.refreshBattaelField();
    reviewBox.firstClikBattelData(false , x_coord , y_coord);
    
    
    
    
    GENERAL_TIMER = setInterval(function (){
        
        reviewBox.refreshBattaelField();
        
    } , 1000);
    */
});

$(document).on("click" , ".close_BF_dialog_box" , function (){
    
    $("#dialg_box_two").remove();
    clearInterval(GENERAL_TIMER);
    
});



/*   msg fromsmall  box    */
$(document).on("click" ,"#mail-player-from-world" , function (){
     
     //<img src="images/tech/message_icon.png"  id="mail-player-from-world" data-id-player="${WorldCurrentUnit.__id_player}" data-player-name="${WorldCurrentUnit.__player_name}"/>

    var player_name = $(this).attr("data-player-name");
    var player_id   = $(this).attr(" data-id-player");
    
    $(".close_RB img").trigger("click");
    var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Mail[UserLag.language] , msg_nav_bar ,  message.dialogBoxcontent_msgWrite({name:player_name , id:player_id}) , 0);
    dialogBoxShow(dialog_box);
    
});



function addRemainBarryData(x_coord , y_coord)
{
    $.ajax({
        url: "api/world.php",
        data:{
            GET_EMAIN_BARRY_DATA:true,
            x_coord: WorldCurrentUnit.coord_x,
            y_coord: WorldCurrentUnit.coord_y,
            id_player:ID_PLAYER,
            token:TOKEN
        },
        type: 'GET',
        beforeSend: function (xhr) {
            $("#unit_review .prize-list ul").html(WorldUnit.prize.prizeList(x_coord , y_coord));
        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                
                var json_data = JSON.parse(data);
                
            }else{
                
                console.log(data);
                alert(data);
                return ;
                
            }
            
            if(json_data === false){
                return ;
            }
            
            var under_desc = `  <ul>
                                    <li> 
                                        <label>المدينة :</label>
                                        <span>${json_data.c_name}</span>
                                    </li>
                                    <li> 
                                        <label>الاحداثيات :</label>
                                        <span>${json_data.x} , ${json_data.y}</span>
                                    </li>
                                    <li> 
                                        <label>الملك :</label>
                                        <span>${json_data.p_name}</span>
                                    </li>
                                    <li> 
                                        <label>${Translate.Button.Chat.League[UserLag.language]} : </label>
                                        <span>${json_data.guild}</span>
                                    </li>
                                </ul>`;
            $("#unit_review .under-desc").html(under_desc);
            $("#unit_review .prize-list ul").html("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
    
    
}
WorldUnit.prize = {};

WorldUnit.prize.prizes = {};

WorldUnit.prize.getAllPrize = function (){
    
    $.ajax({
       
       url:"api/worldUnit.php",
       data:{
           GET_ALL_PRIZES: true
       },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(isJson(data)){
                WorldUnit.prize.prizes = JSON.parse(data);
                for(var iii in WorldUnit.prize.prizes){
                    
                    WorldUnit.prize.prizes[iii].lvl  = Number(WorldUnit.prize.prizes[iii].lvl);
                    WorldUnit.prize.prizes[iii].type = Number(WorldUnit.prize.prizes[iii].unitType);
                  
                }
            }else{
                
                alert(data);
                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
};





WorldUnit.prize.getUnitPrize = function (type , lvl){
    
    type = Number(type);
    lvl = Number(lvl);
    var result = [];
    for(var iii in WorldUnit.prize.prizes){
        
        if( WorldUnit.prize.prizes[iii].type === type && WorldUnit.prize.prizes[iii].lvl === lvl ){
            result.push(WorldUnit.prize.prizes[iii]);
        }
        
    }
    return result;
    
};

WorldUnit.prize.getUnitAllLvlsPrize = function (type){
    
    type = Number(type);
    var result = [];
    for(var iii in WorldUnit.prize.prizes){
        
        if( WorldUnit.prize.prizes[iii].type === type){
            result.push(WorldUnit.prize.prizes[iii]);
        }
        
    }
    return result;
    
};


WorldUnit.prize.prizeList = function (x_coord , y_coord){

    if(!WorldUnit.getWorldUnit(x_coord , y_coord))
         return ;

    var lvl  = Number(WorldUnit.getWorldUnit(x_coord , y_coord).l);
    var type = Number(WorldUnit.getWorldUnit(x_coord , y_coord).ut);
    
    var prize = this.getUnitPrize(type , lvl);
    var list  = "";
    for(var iii in prize){
        list += `   <li>
                        <div class="golden-border">
                            <div class="unit-image" style="background-image: url(${Matrial.image(prize[iii].prize)})">
                                <div class="amount stroke">(${prize[iii].amount_min}-${prize[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
    }
   
    return list;
};


WorldUnit.prize.prizeAllLvlsList = function (x_coord , y_coord){
   
   if(!WorldUnit.getWorldUnit(x_coord , y_coord))
         return ;

    var lvl  = Number(WorldUnit.getWorldUnit(x_coord , y_coord).l);
    var type = Number(WorldUnit.getWorldUnit(x_coord , y_coord).ut);
   
    var prize = WorldUnit.prize.getUnitAllLvlsPrize (type);
   
    
    var prizeList = [];
    
    var list  = "";
    for(var iii in prize){
        
        if(prizeList.indexOf(prize[iii].prize) === -1){
            prizeList.push(prize[iii].prize);
        }else {
            continue;
        }
        if(prizeList.length > 16){
            break;
        }
        
        list += `   <li>
                        <div class="golden-border">
                            <div class="unit-image ${prize[iii].lvl !== lvl ? "gray-filter" : ""}" style="background-image: url(${Matrial.image(prize[iii].prize)})">
                                <div class="amount stroke">(${prize[iii].amount_min}-${prize[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
        
        
    }
   
    return list;
};






WorldUnit.prize.getAllPrize ();

Elkaisar.World.Map.posX = function (xCoord, yCoord) {
    return xCoord * 64 - yCoord * 64;
};

Elkaisar.World.Map.posY = function (xCoord, yCoord) {
    return xCoord * 32 + yCoord * 32;
};


Elkaisar.World.Map.xCoord = function (x, y) {
    return Math.round((2 * y + x) / 128);
};
Elkaisar.World.Map.yCoord = function (x, y) {
    return Math.round((2 * y - x) / 128);
};

Elkaisar.World.Map.widthInTile = function () {
    return Math.ceil(Elkaisar.MAX_SCREEN_WIDTH / 128);
};
Elkaisar.World.Map.heightInTile = function () {
    return Math.ceil(Elkaisar.MAX_SCREEN_HEIGHT / 64);
};

Elkaisar.World.Map.posY = function (xCoord, yCoord) {
    return xCoord * 32 + yCoord * 32;
};

Elkaisar.World.Map.realCoord = function (coord) {
    return (500 * 500 + Number(coord)) % 500;
};

Elkaisar.World.Map.posZ = function (xCoord, yCoord) {

    var z_offset_x = (xCoord) < 0 ? -500 : (xCoord) > 499 ? 500 : 1;
    var z_offset_y = (yCoord) < 0 ? -500 : (yCoord) > 499 ? 500 : 1;

    return  500 * 500 * 500 + Math.max(this.realCoord(xCoord) + this.realCoord(yCoord)) + z_offset_y + z_offset_x;

};

Elkaisar.World.Map.getEntity = function (xCoord, yCoord) {

    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

    if (WorldUnit.isRiver(Unit.ut) || WorldUnit.isEmpty(Unit.ut) || (Unit.ut) === WUT_BUSY_UNIT) {
        return Crafty.e("2D, Canvas , Mouse , WorldUnit, worldEnt").attr({_w: 128, _h: 128});
    }

    return Crafty.e(`2D, Canvas, ${Elkaisar.World.UnitData[Unit.t].tileName[Unit.l] || Elkaisar.World.UnitData[Unit.t].tileName[0]}, Mouse , WorldUnit, worldEnt`);

};


Elkaisar.World.UnitData = {

    "0": {

        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [64, 64, 128, 96, 64, 128, 0, 96],
        tileName: {"0": "floor"},
        getTitle: (x_coord, y_coord) => {
            return "مكان خالى";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "1": {
        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [64, 64, 128, 96, 64, 128, 0, 96],
        tileName: {"0": "river_1"},
        getTitle: (x_coord, y_coord) => {
            return "بحيرة";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "17": {
        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [112, 95, 70, 118, 23, 92, 65, 70],
        tileName: {"0": "city_0"},
        getTitle: (x_coord, y_coord) => {
            return "مدينة مستوى 1";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "18": {

        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [103, 78, 106, 100, 63, 118, 18, 98, 17, 83, 58, 56],
        tileName: {"0": "city_1"},
        getTitle: (x_coord, y_coord) => {
            return "مدينة مستوى 2";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "19": {

        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [105, 72, 107, 100, 63, 125, 15, 97, 21, 72, 61, 50],
        tileName: {"0": "city_2"},
        getTitle: (x_coord, y_coord) => {
            return "مدينة مستوى 3";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "20": {

        snapShoot: "river_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {"0": "city_3"},
        getTitle: (x_coord, y_coord) => {
            return "مدينة مستوى 4";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "21": {

        snapShoot: "mountain_1.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [101, 94, 67, 115, 27, 96, 63, 72],
        tileName: {1: "m_1", 2: "m_2", 3: "m_3", 4: "m_4"},
        getTitle: (x_coord, y_coord) => {
            return "هضبة";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "22": {

        snapShoot: "mountain_2.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [123, 96, 67, 123, 12, 96, 49, 66, 74, 52],
        tileName: {5: "m_5", 6: "m_6", 7: "m_7"},
        getTitle: (x_coord, y_coord) => {
            return "جبل";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "23": {

        snapShoot: "mountain_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [119, 92, 70, 122, 11, 90, 61, 27, 88, 31],
        tileName: {8: "m_8", 9: "m_9", 10: "m_10"},
        getTitle: (x_coord, y_coord) => {
            return "جبال";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "24": {

        snapShoot: "desert_1.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [65, 67, 20, 91, 73, 118, 105, 92],
        tileName: {1: "d_1", 2: "d_2", 3: "d_3", 4: "d_4"},
        getTitle: (x_coord, y_coord) => {
            return "رمال";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "25": {

        snapShoot: "desert_2.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [112, 98, 60, 120, 15, 96, 60, 72, 86, 66],
        tileName: {5: "d_5", 6: "d_6", 7: "d_7"},
        getTitle: (x_coord, y_coord) => {
            return "صحراء";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "26": {

        snapShoot: "desert_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [119, 97, 62, 120, 19, 95, 41, 77, 47, 56, 86, 58],
        tileName: {8: "d_8", 9: "d_9", "10": "d_10"},
        getTitle: (x_coord, y_coord) => {
            return "صحراء";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "27": {

        snapShoot: "wood_1.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [63, 72, 90, 83, 92, 97, 67, 112, 39, 99, 47, 84],
        tileName: {1: "w_1", 2: "w_2", 3: "w_3", 4: "w_4"},
        getTitle: (x_coord, y_coord) => {
            return "احراش";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "28": {

        snapShoot: "wood_2.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [64, 64, 106, 86, 109, 101, 66, 122, 27, 97, 33, 80],
        tileName: {5: "w_5", 6: "w_6", 7: "w_7"},
        getTitle: (x_coord, y_coord) => {
            return "اخشاب";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "29": {

        snapShoot: "wood_3.png",
        desc: null,
        maxLvl: 0,
        prom_lvl: 0,
        fitness: 0,
        make_req: [],
        join_req: [],
        hitArea: [62, 48, 116, 77, 120, 97, 65, 127, 15, 100, 16, 74],
        tileName: {8: "w_8", 9: "w_9", 10: "w_10"},
        getTitle: (x_coord, y_coord) => {
            return "غابات";
        },
        timeNextRest: () => {
            return null;
        }

    },
    "30": {
        snapShoot: "monwrat.png",
        ar_title: "مناورات",
        prom_title: "مواطن",
        prom_lvl: 0,
        fitness: 40,
        make_req: ["necklace_4"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "مناورات";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,
        maxLvl: 50,
        hitArea: [64, 0, 128, 32, 128, 96, 64, 128, 0, 96, 0, 32],
        tileName: {0: "mnawrat"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }

    },
    "31": {
        snapShoot: "camps.png",
        ar_title: "معسكرات",
        prom_title: "مواطن",
        prom_lvl: 0,
        fitness: 40,
        make_req: ["necklace_4"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            if (x_coord === 136 && y_coord === 160) {
                return `المعسكر الفرنسى المتمرد`;
            } else if (x_coord === 407 && y_coord === 66) {
                return `المعسكر الاسيوى المتمرد`;
            } else if (x_coord === 106 && y_coord === 19) {
                return `المعسكر البريطانى المتمرد`;
            } else if (x_coord === 392 && y_coord === 213) {
                return `المعسكر المقدونى المتمرد`;
            } else if (x_coord === 266 && y_coord === 245) {
                return `المعسكر الايطالى المتمرد`;
            } else if (x_coord === 78 && y_coord === 300) {
                return `المعسكر الاسبانى المتمرد`;
            } else if (x_coord === 427 && y_coord === 337) {
                return `المعسكر الفارسى المتمرد`;
            } else if (x_coord === 316 && y_coord === 450) {
                return `المعسكر المصرى المتمرد`;
            } else if (x_coord === 88 && y_coord === 444) {
                return `المعسكر القرطاجى المتمرد`;
            } else if (x_coord === 246 && y_coord === 111) {
                return `المعسكر الالمانى المتمرد`;
            }
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 50,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "city_4"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "32": {
        snapShoot: "front_squad.png",
        ar_title: "الفرقة الامامية",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        getTitle: function (x_coord, y_coord) {
            return "الفرقة الامامية";
        },
        maxLvl: 40,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "front_squad"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "33": {
        snapShoot: "front_squad.png",
        ar_title: "السرية الامامية",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        getTitle: function (x_coord, y_coord) {
            return "السرية الامامية";
        },
        maxLvl: 40,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "front_band"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "34": {
        snapShoot: "front_band.png",
        ar_title: "الجماعة الامامية",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        getTitle: function (x_coord, y_coord) {
            return "الجماعة الامامية";
        },
        maxLvl: 40,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "front_squadron"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "35": {
        snapShoot: "front_division.png",
        ar_title: "الكتيبة الامامية",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "الكتيبة الامامية";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 40,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "front_division"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "36": {
        snapShoot: "armed_light_squad.png",
        ar_title: "فرقة التسليح الخفيف",
        prom_lvl: 10,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "فرقة التسليح الخفيف";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 30,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_light_squad"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "37": {
        snapShoot: "armed_light_band.png",
        ar_title: "سرية التسليح الخفيف",
        prom_lvl: 10,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "سرية التسليح الخفيف";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 30,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_light_band"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "38": {
        snapShoot: "armed_light_squadron.png",
        ar_title: "جماعة التسليح الخفيف",
        prom_lvl: 10,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "جماعة التسليح الخفيف";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 30,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_light_squadron"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "39": {
        snapShoot: "armed_light_division.png",
        ar_title: "كتيبة التسليح الخفيف",
        prom_lvl: 10,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "كتيبة التسليح الخفيف";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 30,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_light_division"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "40": {
        snapShoot: "armed_heavy_squad.png",
        ar_title: "فرقة التسليح الثقيل",
        prom_lvl: 20,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "فرقة التسليح الثقيل";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_heavy_squad"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "41": {
        snapShoot: "armed_heavy_band.png",
        ar_title: "سرية التسليح الثقيل",
        prom_lvl: 20,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "سرية التسليح الثقيل";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_heavy_band"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "42": {
        snapShoot: "armed_heavy_squadron.png",
        ar_title: "جماعة التسليح الثقيل",
        prom_lvl: 20,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "جماعة التسليح الثقيل";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_heavy_squadron"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "43": {
        snapShoot: "armed_heavy_division.png",
        ar_title: "كتيبة التسليح الثقيل",
        prom_lvl: 20,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "كتيبة التسليح الثقيل";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "armed_heavy_division"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "44": {
        snapShoot: "guard_squad.png",
        ar_title: "فرقة الحراسة",
        prom_lvl: 25,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "فرقة الحراسة";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "guard_squad"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "45": {
        snapShoot: "guard_band.png",
        ar_title: "سرية الحراسة",
        prom_lvl: 25,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "سرية الحراسة";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "guard_band"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "46": {
        snapShoot: "guard_squadron.png",
        ar_title: "جماعة الحراسة",
        prom_lvl: 25,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "جماعة الحراسة";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "guard_squadron"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "47": {
        snapShoot: "guard_division.png",
        ar_title: "كتيبة الحراسة",
        prom_lvl: 25,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "كتيبة الحراسة";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 20,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "guard_division"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "48": {
        snapShoot: "thunder.png",
        ar_title: "الساندرز",
        prom_lvl: 29,
        fitness: 40,
        make_req: ["truce_pack"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "الساندرز الشجاع";
        },
        desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

        maxLvl: 10,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "brave_thunder"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "49": {
        snapShoot: "gang.png",
        ar_title: "العصابات",
        prom_lvl: 1,
        fitness: 20,
        make_req: ["t_map"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "العصابات";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 2,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "gang"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "50": {
        snapShoot: "mugger.png",
        ar_title: "قطاع الطرق",
        prom_lvl: 1,
        fitness: 20,
        make_req: ["t_map"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "قطاع الطريق";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 2,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "mugger"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "51": {
        snapShoot: "thief.png",
        ar_title: "اللصوص",
        prom_lvl: 1,
        fitness: 20,
        make_req: ["t_map"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "اللصوص";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 2,
        hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
        tileName: {0: "thief"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "52": {
        snapShoot: "c_gang.png",
        ar_title: "العصابات القرطاجية",
        prom_lvl: 4,
        fitness: 20,
        make_req: ["repel_trumpet_1"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "العصابات القرطاجية";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [69, 110, 90, 101, 90, 69, 63, 53, 42, 64, 41, 97],
        tileName: {0: "carthage_gang"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "53": {
        snapShoot: "c_teams.png",
        ar_title: "فرق العصيان القرطاجى",
        prom_lvl: 1,
        fitness: 30,
        make_req: ["repel_trumpet_1"],
        join_req: [""],
        getTitle: function (x_coord, y_coord) {
            return "فرق العصيان القرطاجى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [63, 112, 97, 96, 94, 71, 65, 54, 35, 68, 34, 98],
        tileName: {0: "carthage_teams"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "54": {
        snapShoot: "c_rebels.png",
        ar_title: "متمردى قرطاجة",
        prom_lvl: 7,
        fitness: 40,
        make_req: ["repel_trumpet_2"],
        join_req: ["repel_trumpet_2"],
        getTitle: function (x_coord, y_coord) {
            return "متمردى قرطاجة";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [69, 115, 104, 102, 97, 68, 61, 48, 34, 64, 31, 98],
        tileName: {0: "carthage_rebels"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "55": {
        snapShoot: "c_forces.png",
        ar_title: "القوات الخاصة القرطاجية",
        prom_lvl: 14,
        fitness: 50,
        make_req: ["repel_trumpet_2"],
        join_req: ["repel_trumpet_2"],
        getTitle: function (x_coord, y_coord) {
            return "القوات الخاصة القرطاجية";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [67, 116, 110, 100, 101, 67, 69, 47, 31, 65, 29, 100],
        tileName: {0: "carthage_forces"},
        timeNextRest: function () {
            return TimeRest.restEvery6();
        }
    },
    "56": {
        snapShoot: "c_capital.png",
        ar_title: "عاصمة التمرد",
        prom_lvl: 19,
        fitness: 60,
        make_req: ["repel_medal"],
        join_req: ["repel_medal"],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة التمرد";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [62, 116, 108, 97, 102, 67, 71, 46, 29, 64, 27, 98],
        tileName: {0: "carthage_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "100": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة المشاة",
        prom_lvl: 1,
        fitness: 50,
        make_req: ["warrior_medal"],
        join_req: [],
        hero_army_req: 1,
        getTitle: function (x_coord, y_coord) {
            return "عاصمة المشاة";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "101": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة الفرسان",
        prom_lvl: 1,
        fitness: 50,
        hero_army_req: 2,
        make_req: ["warrior_medal"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة الفرسان";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "102": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة المدرعين",
        prom_lvl: 1,
        fitness: 50,
        hero_army_req: 3,
        make_req: ["warrior_medal"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة المدرعين";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "103": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة رماة السهم",
        prom_lvl: 1,
        fitness: 50,
        hero_army_req: 4,
        make_req: ["warrior_medal"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة رماة السهم";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "104": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة المقاليعٍ",
        prom_lvl: 1,
        fitness: 50,
        hero_army_req: 5,
        make_req: ["warrior_medal"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة المقاليع";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "105": {
        snapShoot: "armyCapital.png",
        ar_title: "عاصمة المنجنيق",
        prom_lvl: 1,
        fitness: 50,
        hero_army_req: 6,
        make_req: ["warrior_medal"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "عاصمة المنجنيق";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "army_capital"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "125": {
        snapShoot: "arena.png",
        ar_title: "حلبة التحدى",
        prom_lvl: 1,
        fitness: 10,
        make_req: [],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "حلبة التحدى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "arena"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "126": {
        snapShoot: "arena.png",
        ar_title: "حلبة الموت",
        prom_lvl: 1,
        fitness: 10,
        make_req: [],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "حلبة الموت";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "arena"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "127": {
        snapShoot: "arena.png",
        ar_title: "حلبة تحدى الاحلاف",
        prom_lvl: 1,
        fitness: 10,
        make_req: [],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "حلبة تحدى الاحلاف";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "arena"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "130": {
        snapShoot: "queenCityS.png",
        ar_title: "الملكة الصغرى",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["bronze_horn"],
        join_req: ["bronze_horn"],
        getTitle: function (x_coord, y_coord) {
            return "الملكة الصغرى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "queenCity_1"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "131": {
        snapShoot: "queenCityM.png",
        ar_title: "الملكة الوسطى",
        prom_lvl: 4,
        fitness: 50,
        make_req: ["silver_horn"],
        join_req: ["silver_horn"],
        getTitle: function (x_coord, y_coord) {
            return "الملكة الصغرى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "queenCity_2"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "132": {
        snapShoot: "queenCityH.png",
        ar_title: "الملكة الكبرى",
        prom_lvl: 5,
        fitness: 60,
        make_req: ["gold_horn"],
        join_req: ["gold_horn"],
        getTitle: function (x_coord, y_coord) {
            return "الملكة الصغرى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "queenCity_3"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "134": {
        snapShoot: "repleCastleS.png",
        ar_title: "القلاع الصغرى",
        prom_lvl: 3,
        fitness: 40,
        make_req: ["bronze_horn"],
        join_req: ["bronze_horn"],
        getTitle: function (x_coord, y_coord) {
            return "القلاع الصغرى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "repleCastle_1"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "135": {
        snapShoot: "repleCastleM.png",
        ar_title: "القلاع الوسطى",
        prom_lvl: 4,
        fitness: 50,
        make_req: ["silver_horn"],
        join_req: ["silver_horn"],
        getTitle: function (x_coord, y_coord) {
            return "القلاع الوسطى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "repleCastle_2"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "136": {
        snapShoot: "repleCastleH.png",
        ar_title: "القلاع الكبرى",
        prom_lvl: 5,
        fitness: 60,
        make_req: ["gold_horn"],
        join_req: ["gold_horn"],
        getTitle: function (x_coord, y_coord) {
            return "القلاع الكبرى";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
        tileName: {0: "repleCastle_3"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "150": {
        snapShoot: "statueWar_1.png",
        ar_title: "تمثال الحرب الاصغر",
        prom_lvl: 29,
        fitness: 100,
        make_req: ["evil_army_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "تمثال الحرب الاصغر";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 75,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "151": {
        snapShoot: "statueWar_2.png",
        ar_title: "تمثال الحرب الاوسط",
        prom_lvl: 29,
        fitness: 100,
        make_req: ["evil_army_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "تمثال الحرب الاوسط";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 50,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "152": {
        snapShoot: "statueWar_3.png",
        ar_title: "تمثال الحرب الاكبر",
        prom_lvl: 5,
        fitness: 60,
        make_req: ["evil_army_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "تمثال الحرب الاكبر";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 25,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery12();
        }
    },
    "153": {
        snapShoot: "wolf_1.png",
        ar_title: "مجموعة الذئب 1",
        prom_lvl: 29,
        fitness: 100,
        make_req: ["evil_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "مجموعة الذئب 1";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "154": {
        snapShoot: "wolf_2.png",
        ar_title: "مجموعة الذئب 2",
        prom_lvl: 29,
        fitness: 100,
        make_req: ["evil_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "مجموعة الذئب 2";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },
    "155": {
        snapShoot: "wolf_3.png",
        ar_title: "مجموعة الذئب 3",
        prom_lvl: 29,
        fitness: 100,
        make_req: ["evil_pass"],
        join_req: [],
        getTitle: function (x_coord, y_coord) {
            return "مجموعة الذئب 3";
        },
        desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

        maxLvl: 10,
        heroNum: 3,
        techLvl: 10,
        heroLvl: 255,
        hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
        tileName: {0: "wolfStatue"},
        timeNextRest: function () {
            return TimeRest.restEvery4();
        }
    },

    isPromLvlOk: function (type) {
        var camp = Elkaisar.World.UnitTypeData[type];
        return (Elkaisar.DPlayer.Player.porm >= camp.reqProm);
    },

    isAttackable: function (type) {
        var camp = Elkaisar.World.UnitTypeData[type];
        for (var mat in camp.MakeReq) {
            if (Matrial.getPlayerAmount(camp.MakeReq[mat].Item) < camp.MakeReq[mat].amount) {
                return false;
            }
        }
        return (Elkaisar.DPlayer.Player.porm >= camp.reqProm);
    }



};



Elkaisar.World.Map.base = {x: 0, y: 0};
Elkaisar.World.Map.active = false;
Elkaisar.World.Map.dragging = false;
Elkaisar.World.Map.dragStartOn = 0;
Elkaisar.World.Map.dragStartAt = {x: 0, y: 0};
Elkaisar.World.Map.lastMouse = {x: 0, y: 0};
Elkaisar.World.Map.diff = {x: 0, y: 0};


Elkaisar.World.Map.deltaDrag = {x: 0, y: 0};




Elkaisar.World.Map.mouseMoveFn = function (e) {

    if (!Elkaisar.World.Map.dragging) {
        return;
    }

    if (Elkaisar.World.Map.dragStartOn === 0) {
        Elkaisar.World.Map.dragStartOn = Date.now();
        Elkaisar.World.Map.dragStartAt.x = Crafty.viewport.x;
        Elkaisar.World.Map.dragStartAt.y = Crafty.viewport.y;
    }

    Crafty.onDragClickable = false;


    Elkaisar.World.Map.diff.x = e.clientX - Elkaisar.World.Map.lastMouse.x;
    Elkaisar.World.Map.diff.y = e.clientY - Elkaisar.World.Map.lastMouse.y;

    Elkaisar.World.Map.lastMouse.x = e.clientX;
    Elkaisar.World.Map.lastMouse.y = e.clientY;



    var viewport = Crafty.viewport;
    viewport.x += Elkaisar.World.Map.diff.x / viewport._scale;
    viewport.y += Elkaisar.World.Map.diff.y / viewport._scale;
    Elkaisar.World.Map.Scroll();

};


Elkaisar.World.Map.mouseUpFn = function (e) {

    setTimeout(function () {
        Crafty.onDragClickable = true;
    }, 100);

    Elkaisar.World.Map.RefreshWorld();
    
    Elkaisar.World.Map.clear();
    Elkaisar.World.Map.dragging = false;
    Elkaisar.World.Map.dragStartOn = 0;
};



Elkaisar.World.Map.mouseDownFn = function (e) {


    if (Elkaisar.World.Map.dragging)
        return;

    Crafty.trigger("StopCamera");
    Elkaisar.World.Map.lastMouse.x = e.clientX;
    Elkaisar.World.Map.lastMouse.y = e.clientY;

    Elkaisar.World.Map.base.x = Crafty.viewport.x;
    Elkaisar.World.Map.base.y = Crafty.viewport.y;

    Elkaisar.World.Map.dragging = true;



};





Elkaisar.World.Map.Scroll = function (Force) {

    if (Crafty._floor !== "world")
        return;

    var viewport = Crafty.viewport;



    if (Math.abs(viewport.x - Elkaisar.World.Map.base.x) >= 50 || Math.abs(viewport.y - Elkaisar.World.Map.base.y) >= 50 || Force) {


        Elkaisar.World.Map.base.x = viewport.x;
        Elkaisar.World.Map.base.y = viewport.y;

        var xCoord = -Elkaisar.World.Map.xCoord(viewport.x, viewport.y) - 2;
        var yCoord = -Elkaisar.World.Map.yCoord(viewport.x, viewport.y);
        var widthInTile = Elkaisar.World.Map.widthInTile() + 4;
        var heightInTile = Elkaisar.World.Map.heightInTile() + 4;


        var vvv = 0;
        var kkk = 0;

        for (; vvv <= heightInTile; vvv++) {
            for (; kkk <= widthInTile; kkk++) {

                addMapUnite({x: xCoord + vvv + kkk, y: yCoord + vvv - kkk});
                addMapUnite({x: xCoord + vvv + kkk + 1, y: yCoord + vvv - kkk});

            }
            kkk = 0;
        }


        var floorXStart = xCoord - (xCoord % 10) - 20;
        var floorYStart = yCoord - (yCoord % 10);
        var iii = 0;
        var jjj = 0;

        for (; iii <= heightInTile + 20; iii += 10) {
            for (; jjj <= widthInTile + 20; jjj += 10) {


                addMapWorldFloor({x: floorXStart + iii + jjj, y: floorYStart + iii - jjj});
                addMapWorldFloor({x: floorXStart + iii + jjj + 10, y: floorYStart + iii - jjj});

            }
            jjj = 0;
        }

    }


};



Elkaisar.World.Map.RefreshWorld = function () {

    Animation.cityFlag();
    Animation.cityColonizerFlag();
};


Elkaisar.World.Map.getWorldCity = function () {

    ws.send(JSON.stringify({
        url: "World/getWorldCity"
    }));


};
Elkaisar.World.Map.getWorldCityColonized = function () {

    ws.send(JSON.stringify({
        url: "World/getWorldCityColonized"
    }));


};







var WorldCurrentUnit = {};


Elkaisar.World.unitWidth  = 128;
Elkaisar.World.unitHeight = 128;

MAX_SCREEN_WIDTH  = $(document).width();
MAX_SCREEN_HEIGHT = $(document).height();




const TILE_SIZE = 128;






    

Crafty.WORLD_MOVES = 0;

Crafty.defineScene("world" , function (){
    
    Crafty._floor = "world";
        Crafty.onDragClickable = true;
       
       // Crafty.bind("ViewportScroll", Elkaisar.World.Map.Scroll);
        
        Crafty.widthInTile = 35;
        Crafty.heightIntile =35;
        
    
         
                
                
                
        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", Elkaisar.World.Map.mouseDownFn);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup",   Elkaisar.World.Map.mouseUpFn );
        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", Elkaisar.World.Map.mouseMoveFn);
	
        
        
        Crafty.viewport.x  = -Elkaisar.World.Map.posX(Elkaisar.CurrentCity.City.x, Elkaisar.CurrentCity.City.y) + Elkaisar.MAX_SCREEN_WIDTH/2 - 64; // 56 is displacement to center the view port 
        Crafty.viewport.y  = -Elkaisar.World.Map.posY(Number(Elkaisar.CurrentCity.City.x), Number(Elkaisar.CurrentCity.City.y)) + Elkaisar.MAX_SCREEN_HEIGHT/2 - 128;
        

    
    
    UnitFloor = Crafty.e("2D, DOM, unit_floor")
                .attr({w: TILE_SIZE, h: 96 });
    
}, function () {
    Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", Elkaisar.World.Map.mouseDownFn);
    Crafty.removeEvent(this, Crafty.stage.elem, "mouseup"  ,   Elkaisar.World.Map.mouseUpFn );
    Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", Elkaisar.World.Map.mouseMoveFn);
    //Crafty.unbind("ViewportScroll", Elkaisar.World.Map.Scroll);
});


function loading(percent)
{
    
    $("#load-percent").html(Math.floor(percent)+"%");
    $("#load-bar div").css({width: percent+"%"});
    
}





Crafty.sprite("images/world/worldFloor.jpg", {worldFloor:[0,0,640,640]});






function  addMapUnite(el){
    
    
                
       setTimeout(function (){
                    
                    var unit = Elkaisar
                            .worldAllUnits
                            [Elkaisar.World.Map.realCoord(el.x)*500+Number(Elkaisar.World.Map.realCoord(el.y))];
                    
                     if( !$.isEmptyObject(unit.entite)){
                         
                         unit.entite.attr({
                            x: Elkaisar.World.Map.posX(el.x, el.y),
                            y: Elkaisar.World.Map.posY(el.x, el.y),
                            z: Elkaisar.World.Map.posZ(el.x , el.y)
                         });
                        return ;
                        
                     }




                    var tile = Elkaisar.World.Map.getEntity(unit.x , unit.y);
                    
                   
                    
                    tile
                            .bind("Click", function(e) {
                                if(Crafty.onDragClickable){

                                    WorldCurrentUnit = this;
                                    uniteMapClick(unit.x , unit.y);


                                }
                            })
                            .bind("MouseOver", function() {

                            
                                UnitFloor.x = this.x;
                                UnitFloor.y = this.y + TILE_SIZE/2;
                                WorldUtil.showMapTooltip(unit.x , unit.y);


                            })
                            .bind("MouseOut", function() {

                                //Crafty("UnitToolTip").each(function (){this.destroy();});

                            })
                            .areaMap(Elkaisar.World.UnitData[unit.t].hitArea)
                            .attr({
                                x: Elkaisar.World.Map.posX(el.x, el.y),
                                y: Elkaisar.World.Map.posY(el.x, el.y),
                                z: Elkaisar.World.Map.posZ(el.x , el.y),
                                coord_x: parseInt(unit.x),
                                coord_y: parseInt(unit.y)
                            });

                    unit.entite = tile;
                    Crafty.__end ++;
                        
                });
       
   
   
 
                      
}

function addMapWorldFloor(el){
    
    var realX = Elkaisar.World.Map.realCoord(el.x);
    var realY = Elkaisar.World.Map.realCoord(el.y);
    
    var unit = WorldUnit.getWorldUnit(realX , realY);
   
    
    if(typeof unit.floor === "object" && !$.isEmptyObject(unit.floor)){
        
        unit.floor.attr({
            x:Elkaisar.World.Map.posX(el.x, el.y),
            y:Elkaisar.World.Map.posY(el.x, el.y)
        });
        return ; 
    }
   
  
    unit.floor =  Crafty
           .e("2D, Canvas, worldFloor ,  Sprite")
           .attr({
                x: Elkaisar.World.Map.posX(el.x, el.y),
                y: Elkaisar.World.Map.posY(el.x, el.y),
                z: -1,
                coord_x: parseInt(unit.x),
                coord_y: parseInt(unit.y)
            });
    
    return unit;
}




Elkaisar.World.navigateTo = function (x, y){
    
};

Elkaisar.World.Map.clear = function(){
    
   if(Crafty("*").length < 500)
        return ;
    
   var rect = Crafty.viewport.rect();
   rect._x -= Elkaisar.World.unitWidth*3;
   rect._y -= Elkaisar.World.unitHeight*3;
   rect._h += Elkaisar.World.unitHeight*6;
   rect._w += Elkaisar.World.unitWidth*6;
   
   setTimeout(function (){
        Crafty("2D").each(function (){
           
            if(!this.intersect(rect) && $.isFunction(this.destroy)){
                
                    this.destroy();
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).entite;
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).floor;
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).CityFlagEntite;
                
            }
        });
    }, 0, rect);
   
};


/*____________________________________________________________________________*/
/*__________________________NAVIGET IN WORLD MAP______________________________*/
$("#nav-btn .full-btn").click(function (){
    
    var x_coord = parseInt($("#x_coord-input input").val())||0;
    var y_coord = parseInt($("#y_coord-input input").val())||0;
    
    Crafty.viewport.x = - Elkaisar.World.Map.posX(Number(x_coord) , Number(y_coord))+ Math.floor( MAX_SCREEN_WIDTH/2 - 128);
    Crafty.viewport.y = - Elkaisar.World.Map.posY(Number(x_coord) , Number(y_coord)) + Math.floor( MAX_SCREEN_HEIGHT/2 - 128) ;
    Animation.currentUnitArrow.put(x_coord, y_coord);
    
    
    Elkaisar.World.Map.Scroll();
    setTimeout(Elkaisar.World.Map.RefreshWorld , 250);
    Elkaisar.World.Map.clear();
});






$(document).on("mousemove" , "#smallMap .overMap" , function (evt){
    
    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);
    
    CURRENT_CURSOR_COORDS.css({left:x + 25 , top:y + 25});
    CURRENT_CURSOR_COORDS.html(`[${x} , ${y}]`);
    
    
});
$(document).on("mouseout" , "#smallMap .overMap" , function (){
    CURRENT_CURSOR_COORDS.html("");
    
});

$(document).on("click" , "#smallMap .overMap" , function (evt){
    
    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);
    
    $("#x_coord-input input").val(x);
    $("#y_coord-input input").val(y);
    
    
    $("#nav-btn button").trigger("click");
    
});







/*+___________________________________________________________________________*/
/*___________________________________CHAT BOX_________________________________*/

/*$(document).on("keydown", "#input-chat input", function (e){
    if(e.keyCode ===13 && !e.shiftKey){
        var msg = `<div class="msg-unit">
                        <div class="msg-from">
                            [Mustapha]:
                        </div>
                        <div class="msg-body">
                            <P>
                               ${$("#input-chat input").val()}
                            </P>
                        </div>
                    </div>`;
        $("#msg-area").append(msg);
        $("#input-chat input").val("");
        setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
    }
});
*/

var army_icon = {
    "0": "",
    "1": '<img src="images/tech/soldier_1.jpg"/>',
    "2": '<img src="images/tech/soldier_2.jpg"/>',
    "3": '<img src="images/tech/soldier_3.jpg"/>',
    "4": '<img src="images/tech/soldier_4.jpg"/>',
    "5": '<img src="images/tech/soldier_5.jpg"/>',
    "6": '<img src="images/tech/soldier_6.jpg"/>',
    "10": '<img src="images/tech/defense01.jpg"/>',
    "11": '<img src="images/tech/defense02.jpg"/>',
    "12": '<img src="images/tech/defense03.jpg"/>'
};


const BATTEL_TYPES_CONST = {
    ATTACK: 0,
    DOMINATE: 1,
    JOIN_ATTACK: 2,
    JOIN_DEFENCE: 3,
    SPY: 4,
    SUPPLY: 5,
    GARRISON: 6,
    resourceSupply: 7,
    enterCity: 8

};

speeds = [
    100, //البطل  فاضى
    300, //مشاة
    900, //فرسان
    600, //مدرعين
    250, //رماة
    150, //مقاليع
    100 //منجنيق
];

const BATTEL_JOIN_ATTACK = 2;
const BATTEL_JOIN_DEFENCE = 3;

$(document).on("click", "#footer_bar li", function () {

    var x_coord = parseInt($("#unit_review").attr("x_coord"));
    var y_coord = parseInt($("#unit_review").attr("y_coord"));
    var type = parseInt($("#unit_review").attr("type"));
    var lvl = parseInt($("#unit_review").attr("lvl"));
    var battel_task = $(this).attr("data-type");
    var world_unit = WorldUnit.getWorldUnit(x_coord, y_coord).entite;

    if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY) {

        buildingClick("market");
        $(".nav_bar .left-nav li[head_title=transport_resources]").click();
        $("#transport-distin input[data-coord=x]").val(WorldCurrentUnit.coord_x);
        $("#transport-distin input[data-coord=y]").val(WorldCurrentUnit.coord_y);
        $(".close_RB img").trigger("click");

        return;
    }

    if (Number(Elkaisar.DPlayer.PlayerState.peace) - 12 * 60 * 60 > ($.now() / 1000)) {
        alert_box.failMessage("لا  يمكنك الهجوم و انت  فى حالة هدنة");
        return;
    } else if (world_unit.__peace && world_unit.__peace > $.now() / 1000) {
        alert_box.succesMessage("لا يمكنك الهجوم على هذه المدينة  </br> ( ملك المدينة قام بتفعيل هدنة)");

        return;
    }


    if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY) {

        SPY.sendSpy(x_coord, y_coord);

        return;

    } else if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY) {

        $("#WorldCity").trigger("click");
        $(".close_RB img").trigger("click");

        return;

    }

    // get hero id 
    var hero_object;

    for (var iii in Elkaisar.DPlayer.Heros)
    {
        if (Elkaisar.DPlayer.Heros[iii].Hero.id_city != Elkaisar.CurrentCity.City.id_city)
            continue;
        if (Elkaisar.DPlayer.Heros[iii].Hero.in_city != 1)
            continue;
        if (Elkaisar.DPlayer.Heros[iii].Hero.console != 0)
            continue;
        Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
        break;
    }

    if (typeof Elkaisar.CurrentHero !== "object") {

        if (!cityHasType(BUILDING_TYPS.THEATER)) {
            alert_box.confirmMessage("لا يوجد ابطال او مسارح لتجنيد ابطال داخل المدينة");
            return;
        }

        buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
        return;

    }

    var battel = {
        x_coord: x_coord,
        y_coord: y_coord,
        ar_title: WorldUtil.tooltipHeader(x_coord, y_coord),
        task: battel_task,
        task_title: "غزو",
        time: 60,
        type: type,
        lvl: lvl
    };

    var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel);
    var dialog_box = army.dialogBox("الابطال", NavBar.Hero, content);


    dialogBoxShow(dialog_box, function () {
        army.getCurrentArmy(Elkaisar.CurrentHero);
        getHeroEquip(Elkaisar.CurrentHero.Hero.id_hero);
        $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
    });

    /*     HEILIGHT   THE CAMP TAB */
    $(".left-nav ul li").each(function () {
        if ($(this).attr("head_title") === "camp") {
            $(this).addClass("selected");
        }
    });

    // close  samll box
    $(".close_RB img").trigger("click");

});



function getUnitTitle(type)
{
    if (Elkaisar.World.UnitTypeData[type])
        return Elkaisar.World.UnitTypeData[type].Title;
    return "---";
}


//                              START BATTEL BUTTON
$(document).on("click", "#start_battel", function () {

    if (battel_data.x_coord === null || battel_data.y_coord == null) {

        $("body").append(alert_box.confirmMessage("برجاء اختيار واجهة الهجوم"));
        return;

    }

    if (Number(Elkaisar.CurrentHero.Hero.power) < Hero.getPowerRequired(battel_data.x_coord, battel_data.y_coord)) {
        alert_box.confirmMessage("لا توجد لياقة بدنية كافية للبطل");
        return;
    }

    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero))
        return alert_box.confirmMessage("لا يمكنك ارسال البطل الى المعركة وهو فى مهمة ");



    $(this).attr("disabled", "disabled");
    var coords = `[${getArabicNumbers(battel_data.x_coord)},${getArabicNumbers(battel_data.y_coord)}]`;
    var task = `تاكيد ${BATTAL_TASKS[battel_data.task].ar_title} ${battel_data.ar_title}`;
    alert_box.confirmDialog(`${task}</br> ${coords}`, function () {

        battelStart();
        $(this).removeAttr("disabled");
    });

});



function battelStart() {

    if (Number(Elkaisar.CurrentHero.Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بطل الى بعثة و هو فى ليس داخل المدينة");
        return;
    }
    if (Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(Elkaisar.CurrentCity.City.console)) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بطل الى بعثة و هو قنصل");
        return;
    }

    var _wu = WorldUnit.getWorldUnit(battel_data.x_coord, battel_data.y_coord);

    if (!Elkaisar.World.UnitData.isPromLvlOk(_wu.ut)) {
        alert_box.failMessage("لا يمكنك الهجو..م تحقق من توافق الشروط");
        return;
    }

    var out_hero = 0;


    var idCity = Number(Elkaisar.CurrentHero.Hero.id_city);

    for (var ii in Elkaisar.DPlayer.Heros) {

        if (Number(Elkaisar.DPlayer.Heros[ii].Hero.id_city) !== idCity)
            continue;
        if (Number(Elkaisar.DPlayer.Heros[ii].Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
            out_hero++;
        }

    }


    var blaza_place = cityHasType(BUILDING_TYPS.HOSPITAL);

    if (!blaza_place) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بعثات خارج المدينة حيث لا يوجد بلازا داخل المدينة");
        return;
    }

    var blaza_lvl = Math.min(Number(Elkaisar.City.getCity().BuildingLvl[blaza_place]), 20);

    if (out_hero >= blaza_lvl) {
        $(".close-alert").click();
        alert_box.failMessage("وصل عدد الابطال بالخارج الى الحد الاقصى لا يمكنك ارسال قوات اخرى</br> (يمكنك الانتظار حتى عودة الابطال من الخارج)");
        return;
    }


    if (!Battel.isAttackable(Elkaisar.CurrentHero.Hero.id_hero, _wu.ut)) {

        alert_box.failMessage("لا يمكنك الهجوم بالبطل الحالى! ");
        return;

    }

    if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY) {

        Battel.millertySupply(battel_data.x_coord, battel_data.y_coord);
        Elkaisar.CurrentHero.Hero.in_city = 1;
        city_profile.refresh_hero_view();
        return;

    }

    if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_JOIN_ATT
            || Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_JOIN_DEF) {


        if (!Battel.checkJoinReq(battel_data.x_coord, battel_data.y_coord)) {

            alert_box.failMessage(`لا يوجد لديك مواد كافية للانضمام`);
            return;
        }

        $.ajax({

            url: `${API_URL}/api/ABattelRunning/joinBattel`,
            data: {
                idBattel: battel_data.id_battel,
                idHero: Elkaisar.CurrentHero.Hero.id_hero,
                side: battel_data.side,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer

            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {

                if (isJson(data)) {
                    var jsonData = JSON.parse(data);
                } else {
                    alert(data);
                }


                if (jsonData.state === "ok") {

                    $(".close_dialog").trigger("click");
                    Elkaisar.CurrentHero.Hero.in_city = 0;
                    $(".close-alert").trigger("click");

                    battel_data.type = jsonData.unit_type;
                    battel_data.lvl = jsonData.unit_lvl;
                    Hero.heroAttackProc();

                    PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                    city_profile.refresh_hero_view();


                    var battel = jsonData.Battel;

                    var found = false;
                    for (var iii in Elkaisar.Battel.Battels) {

                        if (Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(battel_data.id_battel)) {
                            found = true;
                            Elkaisar.Battel.Battels[iii] = battel;
                        }

                    }

                    if (!found) {
                        PLAYER_NOTIF.battel_number = Number(PLAYER_NOTIF.battel_number) + 1;


                        if (!Elkaisar.Battel.Battels) {
                            Elkaisar.Battel.Battels = [battel];
                        } else {
                            Elkaisar.Battel.Battels.push(battel);
                        }
                    }
                    Fixed.refreshPlayerNotif();
                    Battel.afterJoin(battel_data.x_coord, battel_data.y_coord);

                } else if (jsonData.state === "error_1") {
                    alert_box.confirmMessage("البطل ليس فى المدينة");

                } else if (jsonData.state === "error_2") {
                    alert_box.confirmMessage("انتهت المعركة لا يمكنك الانضمام");

                } else if (jsonData.state === "error_3") {

                    alert_box.confirmMessage("لا يمكنك الانضمام للدفاع </br> (وصل عدد المنضمين الى الحد الاقصى)");

                } else if (jsonData.state === "error_5") {

                    alert_box.confirmMessage("لا يمكنك الدفاع ضد هذا الحلف");

                } else if (jsonData.state === "error_6") {

                    alert_box.confirmMessage("المواد غير كافية");

                } else {
                    alert_box.confirmMessage("لا يمكنك الانضمام");

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });


    } else if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT) {
        Elkaisar.Battel.supportByHero();
    } else if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_HERO_TRANS) {
        Elkaisar.Battel.TransHero();
    } else {

        ws.send(
                JSON.stringify({
                    url: "Battel/start",
                    data: {
                        xCoord: battel_data.x_coord,
                        yCoord: battel_data.y_coord,
                        idHero: Elkaisar.CurrentHero.Hero.id_hero,
                        attackTask: battel_data.task
                    }
                })
                );


    }

}



function getReportTitle(type, lvl, x_coord, y_coord)
{

    var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
    if (WorldUnit.isArmyCapital(Unit.ut) || WorldUnit.isArena(Unit.ut)) {
        return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord) } ,${getArabicNumbers(x_coord)}] `;
    } else {
        return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord) } ,${getArabicNumbers(x_coord)}] مستوى ${lvl}`;
    }

}
function getSpyReportTitle(type, lvl, x_coord, y_coord)
{
    var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
    return  `تقرير التجسس على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${(y_coord) } ,${(x_coord)}] مستوى ${(lvl)}`;
}

$(document).on("click", ".battel-con", function () {
    $("#confirm_battel").trigger("click");
});



var Back_heros = new Array();

function playerBattels() {

    return $.ajax({

        url: `${API_URL}/api/ABattelRunning/getBattels`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {


            Elkaisar.Battel.Battels = JSON.parse(data);

            if ($("#dialg_box").attr("type") === "reports" && Elkaisar.Battel.Battels && Elkaisar.Battel.Battels.length > 0) { // if opened menu is for reports

                if ($("#reports_list .selected").length > 0) {   // if there selected  battel

                    $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, $("#reports_list .selected").attr("id_battel"), true));
                    BattelField.battelField({navBar: NavBar.Report, totalBox: false, id_battel: $("#reports_list .selected").attr("id_battel")}, Elkaisar.Battel.Battels);
                    //$(".box_content").replaceWith(Reports.dialogBoxcontent_reports($("#reports_list .selected").attr("id_battel")));


                } else if ($("#reports_list").length > 0) {   // no battels

                    $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, 0, true));

                }

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

}

$(document).on("PlayerReady", "html", function () {
    playerBattels();
});



Elkaisar.Battel.supportByHero = function (idHero)
{
    if (!idHero)
        idHero = Elkaisar.CurrentHero.Hero.id_hero;

    return $.ajax({
        url: `${API_URL}/api/AWorldUnit/supportByHero`,
        type: 'POST',
        data: {

            xTo: battel_data.x_coord,
            yTo: battel_data.y_coord,
            idHero: idHero,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        success: function (data, textStatus, jqXHR) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok")
            {
                Elkaisar.Hero.getHero(idHero);
                alert_box.succesMessage("تم ارسال البطل الى البعثة");
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();
                city_profile.refresh_hero_view();
                $(".nav_icon .close_dialog").click();

            } else if (JsonObject.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (JsonObject.state === "error_1") {
                alert_box.failMessage("لا توجد هذة الوحدة");
            } else if (JsonObject.state === "error_2") {
                alert_box.failMessage("البطل ليس فى المدينة");
            } else if (JsonObject.state === "error_3") {
                alert_box.failMessage("لا يمكنك ارسال البطل");
            }


        }
    });

};

Elkaisar.Battel.TransHero = function (idHero)
{

    if (!idHero)
        idHero = Elkaisar.CurrentHero.Hero.id_hero;

    return $.ajax({
        url: `${API_URL}/api/AWorldUnit/transHero`,
        type: 'POST',
        data: {

            xTo: battel_data.x_coord,
            yTo: battel_data.y_coord,
            idHero: idHero,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok")
            {
                Elkaisar.Hero.getHero(idHero).in_city = Elkaisar.Hero.HeroState.HERO_IN_BATTEL;
                alert_box.succesMessage("تم ارسال البطل الى البعثة");
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();
                city_profile.refresh_hero_view();
                $(".nav_icon .close_dialog").click();

            } else if (JsonObject.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (JsonObject.state === "error_1") {
                alert_box.failMessage("لا توجد هذة الوحدة");
            } else if (JsonObject.state === "error_2") {
                alert_box.failMessage("البطل ليس فى المدينة");
            } else if (JsonObject.state === "error_3") {
                alert_box.failMessage("لا يمكنك ارسال البطل");
            }
        }
    });
};








/*
 *   REFRESH BATTEL DATA 
 */
$(document).on("click", "#REFRESH_BATTEL_DATA", function () {

    var id_battel = parseInt($(this).attr("data-id-battel"));

    if (!id_battel) {

        alert_box.confirmMessage("برجاء اختيار المعركة");

    } else {

        $.ajax({

            url: "api/battel.php",
            data: {

                REFRESH_BATTEL_DATA: true,
                id_battel: id_battel,
                id_player: ID_PLAYER,
                token: TOKEN

            },
            type: 'GET',
            beforeSend: function (xhr) {
                console.log(this.data)
            },
            success: function (data, textStatus, jqXHR) {

                var json_data = JSON.parse(data);
                // refresh attack num
                $(".attack-side .joined-num").html(getArabicNumbers(json_data.attack_num));
                $(".defense-side .joined-num").html(getArabicNumbers(json_data.defence_num)); // refresh defence num

            },
            error: function (jqXHR, textStatus, errorThrown) {



            }

        });


    }

});

Battel = {

    millertySupply: function (x_coord, y_coord) {


        $.ajax({
            url: "api/battel.php",
            data: {
                SUPPLY_WORLD_UNIT_HERO: true,
                x_to: x_coord,
                y_to: y_coord,
                x_from: Elkaisar.CurrentCity.City.x,
                y_from: Elkaisar.CurrentCity.City.y,
                id_hero: Elkaisar.CurrentHero.Hero.id_hero,
                id_player: ID_PLAYER,
                token: TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                console.log(this.data)
            },
            success: function (data, textStatus, jqXHR) {
                if (isJson(data)) {

                } else {
                    alert(data);
                }
                $(".close_dialog").click();
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },

    afterFininsh: function (Battel) {



        var hero_dialog = $("#dialg_box[type='hero'] .hero-profile");




        if (hero_dialog.length > 0) {
            hero_dialog.replaceWith(army.middle_content(Elkaisar.CurrentHero));
        }

        for (var iii in Battel.ItemPrize) {

            Matrial.givePlayer(Battel.ItemPrize[iii].Item, Battel.ItemPrize[iii].amount);

        }
        Elkaisar.DPlayer.Player.honor = Number(Elkaisar.DPlayer.Player.honor) + Number(Battel.Player.Honor);


        if (Number(Battel.Battel.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE)
        {
            Elkaisar.City.getCityBarray();
        }

    }
};

Battel.checkJoinReq = function (x_coord, y_coord) {

    var unit = WorldUnit.getWorldUnit(x_coord, y_coord);


    for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

        if (Matrial.getPlayerAmount(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item) < Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount) {
            return false;
        }

    }



    return true;

};



Battel.afterJoin = function (x_coord, y_coord) {

    var unit = WorldUnit.getWorldUnit(x_coord, y_coord);



    for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

        Matrial.takeFrom(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item, Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount);

    }
    return true;

};

Battel.isAttackable = function (idHero, type) {


    if (WorldUnit.isArmyCapital(type)) {
        return Battel.heroArmiesAre(idHero, Elkaisar.World.UnitData[type].hero_army_req);
    }


    return true;
};

Battel.heroArmiesAre = function (idHero, armyType) {

    var hero = getHeroById(idHero);

    armyType = Number(armyType);

    if (Number(hero.army.f_1_type) > 0 && Number(hero.army.f_1_type) !== armyType)
        return false;
    if (Number(hero.army.f_2_type) > 0 && Number(hero.army.f_2_type) !== armyType)
        return false;
    if (Number(hero.army.f_3_type) > 0 && Number(hero.army.f_3_type) !== armyType)
        return false;

    if (Number(hero.army.b_1_type) > 0 && Number(hero.army.b_1_type) !== armyType)
        return false;
    if (Number(hero.army.b_2_type) > 0 && Number(hero.army.b_2_type) !== armyType)
        return false;
    if (Number(hero.army.b_3_type) > 0 && Number(hero.army.b_3_type) !== armyType)
        return false;


    return true;
};


var guild_Detail ;

function showInVitedMembers()
{
    
    $.ajax({
        
        url: `${API_URL}/api/AGuild/getGuildInvReq`,
        data:{
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
            
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var json_data = JSON.parse(data);
            Elkaisar.Guild.Requests = json_data.GuildReq;
            Elkaisar.Guild.Invetaions = json_data.GuildInv;
            var total_inv_list ="";
            var total_req_list ="";
            
            for(var index in Elkaisar.Guild.Invetaions){
                
                var Inv = Elkaisar.Guild.Invetaions[index];
                total_inv_list +=` <li data-id-player="${Inv.id_player}" data-player-name="${Inv.name}"> 
                                    <div class="pull-L">
                                        <img src="${Elkaisar.BaseData.HeroAvatar[Inv.avatar]}">
                                    </div>
                                    <h1 class="pull-L">${Inv.name}</h1>
                                    <div class="select-button">
                                        <button class="show-player-profile full-btn full-btn-1x ellipsis pull-R" data-id-player="${Inv.id_player}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                        <button class="full-btn full-btn-1x pull-L cansel-inv-action ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank) < 4  ? "disabled" : ""}>${Translate.Button.General.Cancel[UserLag.language]}</button>
                                        
                                    </div>
                                </li>`;
                
            }
            $("#AFTER-AJAX-invited-mem").html(total_inv_list);
            $("#AFTER-AJAX-invited-mem").niceScroll(SCROLL_BAR_PROP); 
             
            
            
            
            for(var index in Elkaisar.Guild.Requests){
                
                var Req = Elkaisar.Guild.Requests[index];
                total_req_list +=` <li data-id-player="${Req.id_player}" data-player-name="${Req.name}"> 
                                    <div class="pull-L">
                                        <img src="${Elkaisar.BaseData.HeroAvatar[Req.avatar]}">
                                    </div>
                                    <h1 class="pull-L">${Req.name}</h1>
                                    <div class="select-button">
                                        <button class="show-player-profile full-btn  full-btn-1x  full-btn-1x pull-R" data-id-player="${Req.id_player}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                
                                        
                                        <button class="full-btn full-btn-1x pull-L select-req-action ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank) < Guild.RANK_DATA.MENSTER  ? "disabled" : ""}>اختيار</button>
                                        
                                        <div class="drop-down-li">
                                            ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.MENSTER ?`<div class="accept-guild-req">قبول</div>` : ""}
                                            ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY ?` <div class="cansel-guild-req">الغاء</div>` : ""}
                                        </div>
                                    </div>
                                </li>`;
                
            }
            
            $("#AFTER-AJAX-join-req-mem").html(total_req_list);
            $("#AFTER-AJAX-join-req-mem").niceScroll(SCROLL_BAR_PROP);
            
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
}

$(document).on("click" , ".select-req-action , .guild-mem-action-for_admins" , function (){
    
    $(".drop-down-li").hide(function (){
        $(this).removeClass("active");
    });
    
    if(!$(this).next(".drop-down-li").hasClass("active")){
        
        $(this).next(".drop-down-li").slideDown(function (){
            $(this).addClass("active");
        });
        
    }else{
        
        $(this).next(".drop-down-li").hide(function (){
            $(this).removeClass("active");
        });
        
        
    }
    
});



/*
 *   accept guild reqest buy guild admin 
 */
$(document).on("click", ".accept-guild-req" , function (){
    
   var id_player = $(this).parents("li").attr("data-id-player");
   var self_ = $(this).parents("li");
   
   $.ajax({
       
        url: `${API_URL}/api/AGuildInvReq/acceptGuildReq`,
        data:{
            idPlayerToAccept: id_player,
            token : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        beforeSend: function (xhr) {
        },
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                alert_box.succesMessage("تم اضافة الملك بنجاح");
                self_.remove();
                Elkaisar.Guild.Invetaions = JsonObject.GuildReqInvList.GuildInv;
                Elkaisar.Guild.Requests   = JsonObject.GuildReqInvList.GuildReq;
                $("#dialg_box .left-nav li[head_title='g_relation']").click();
            }else{
                alert(data); 
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
       
   });  
});
/*
 *   cansel guild reqest buy guild member 
 */
$(document).on("click", ".cansel-guild-req" , function (){
    
   var id_player = $(this).parents("li").attr("data-id-player");
   var self_ = $(this).parents("li");
   
   $.ajax({
       
        url: `${API_URL}/api/AGuildInvReq/rejectGuildJoinReq`,
        data:{
            idPlayerToAccept : id_player,
            token            : Elkaisar.Config.OuthToken,
            server           : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                alert_box.succesMessage("تم الغاء الطلب بنجاح");
                Elkaisar.Guild.Invetaions = JsonObject.GuildReqInvList.GuildInv;
                Elkaisar.Guild.Requests   = JsonObject.GuildReqInvList.GuildReq;
                
                self_.remove();
                $("#dialg_box .left-nav li[head_title='g_relation']").click();
              
            }else{
                alert(data);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
       
   });  
});


/*
 *   cansel guild inv buy guild admin 
 */
$(document).on("click", ".cansel-inv-action" , function (){
    
   var id_player = $(this).parents("li").attr("data-id-player");
   var self_ = $(this).parents("li");
   
   $.ajax({
       
        url: `${API_URL}/api/AGuildInvReq/cancelGuildInv`,
        data:{
            idPlayerToInvite : id_player,
            token            : Elkaisar.Config.OuthToken,
            server           : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var jsonObject = JSON.parse(data);
            
            if(jsonObject.state === "ok"){
                
                alert_box.succesMessage("تم الغاء الطلب بنجاح");
                self_.remove();
                Elkaisar.Guild.Invetaions = JsonObject.GuildReqInvList.GuildInv;
                Elkaisar.Guild.Requests   = JsonObject.GuildReqInvList.GuildReq;
                showInVitedMembers();
              
            }else{
                alert(data);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
       
   });  
});


/*
 * 
 * if  the user have now guild he can show all list of guilds
 * this button to show   the all list 
 * 
 */
$(document).on("click" , "#show_avail_guild" , function (){
    
    
    var content = menu_bar.dialogBoxcontent_Ranks(true);
                var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Ranking[UserLag.language] ,NavBar.Ranking , content , 0);
                 if($("#dialg_box").length > 0){
                    $("#dialg_box").animate({top:"-800px"}, 200 , "linear" , function (){
                       $(this).remove();
                       $("body").append(dialog_box );
                       menu_bar.getContentForRanks("unuions" ,0) ;
                       $("#dialg_box").attr("type" , "messages");
                       $("#dialg_box").animate({top:"125"}, 200);
                       
                    });
               }else {
                   $("body").append(dialog_box );
                    menu_bar.getContentForRanks("unuions" ,0) ;
                   $("#dialg_box").attr("type" , "messages");
                   $("#dialg_box").animate({top:"125"}, 200);
                  
               }
            
            $("#select_from").remove();
});



/*
 * 
 * @type type
 *   when  one result is clicked in  ranks
 *   
 *   
 */
$(document).on("click" , ".show-guild-prev" , function (){
    
    var id_guild = $(this).parents(".tr").data("id_guild");
    
    
    $.ajax({
        
        url: "api/guild.php",
        data:{
            
            GET_GUILD_DETAIL:true,
            id_guild: id_guild,
            id_player:ID_PLAYER,
            token:TOKEN
            
        },
        
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                var  json_data = JSON.parse(data);
            }else{
                alert(data);
                return ;
            }
            
            var over_layer = `  <div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review">
                                            <div class="upper" style="height: 185px;">
                                                <div class="table flex">
                                                    <div class="left">
                                                        <img src="images/style/bottom-${json_data.slog_btm}.png" style="position: absolute">
                                                        <img src="images/style/central-${json_data.slog_cnt}.png" style="position: absolute">
                                                        <img src="images/style/top-${json_data.slog_top}.png" style="position: absolute">
                                                    </div>
                                                    <div class="right">
                                                        <div class="t-r">
                                                            <label>${json_data.p_name}</label>
                                                            <label>: المدير</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.rank_g)}</label>
                                                            <label>: تصنيف</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.mem_num)}</label>
                                                            <label>: الاعضاء</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.lvl)}</label>
                                                            <label>: مستوى</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.prestige)}</label>
                                                            <label>: برستيج</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.honor)}</label>
                                                            <label>: شرف</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <table>
                                                    <tbody>

                                                        <tr>
                                                            <td colspan="3" style="text-align: center; line-height: 34px;">
                                                                <h1 style="background-image: url(&quot;images/background/profile_name.png&quot;);
                                                                    background-size: 75% 100%;
                                                                    background-repeat: no-repeat;
                                                                    background-position: center;"> ${json_data.name}</h1>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                                <p>
                                                    ${json_data.word || "لا توجد مقدمة"}
                                                </p>
                                                ${Elkaisar.DPlayer.GuildData.id_guild ? `<div id="send-guild-req" >
                                                                                    <button class="full-btn full-btn-2x" data-id-guild="${json_data.id_guild}">ارسال دعوة انضمام</button>
                                                                                </div>` : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            
            $("body").append(over_layer);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
         
        
    });
    
});



var Guild = {

    dialogBox: function (title , nav_bar , content){

        var nav_list  = "";
        nav_bar.forEach( function (one , index)
        {
            nav_list += ` <li head_title = "${one["title"]}" class="${index === 0? "selected" : ""}" >
                               ${one[("title_"+UserLag.language)] }
                           </li>`;
        });
     
         var nav_bar_list = ` `;
         
                     
        return `
            <div id='dialg_box' class='guild guild_dialog_box'>
                <div class="head_bar">
                    <img src="images/style/head_bar.png">
                    <div class="title">${title}</div>
                </div>
                ${nav_bar_list}
                <div class="nav_bar">
                    <div class="left-nav">
                         <ul>${nav_list}</ul>
                    </div>
                    <div class="right-nav">
                        <div class="nav_icon">
                            <img  class ="close_dialog" src="images/btns/close_b.png">
                            <div class="full-btn full-btn-1x ellipsis" id="guild_lead">
                                ${Translate.Button.MenuList.LeagueManagement[UserLag.language]}
                            </div>
                            <div class="drop-list">
                                <ul>
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY     ? `<li id="chang-g-word"> تعديل المقدمة</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY     ? `<li id="change-g-F_E-list">الاصدقاء والاعداء</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SUPERVISOR ? ` <li id="invite-g">دعوة ملك</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SUPERVISOR ? ` <li id="send-g-msg"> ارسال رسالة</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.MENSTER    ? ` <li id="change-g-slog"> تغير الشعار</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SENIOR_MEM ? ` <li id="resignation-g"> استقالة</li>` : ""}
                                    <li id="leave-g">
                                        الخروج
                                    </li>
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER ? ` <li id="destroy-g">تفكيك</li>` : ""}

                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
                ${content}
            </div>`;
    },
    
    guild_click: function(){
        Guild.getGuildData();
        if(!Elkaisar.DPlayer.GuildData.id_guild){
            
            var box = ` <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">${Translate.Button.General.Use[UserLag.language]}</div>
                                <img class="close close_use_menu" id="closeGuildSelFrom" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div class="container">
                                <div id="two_buttons">
                                    <button class="full-btn full-btn-3x pull-R" id="show_avail_guild"> اعرض الحلف المتاح</button>
                                    <button class="full-btn full-btn-3x pull-L" id="creat_guild"> انشاء حلف </button>
                                </div>
                                <div id="sent_to">
                                    <div class="th">
                                        <div class="td_2 ellipsis">${Translate.Title.TH.PendingLeagueApplication[UserLag.language]}</div>
                                        <div class="td_1 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                    </div>
                                    <div class="tr" id="A-A-guild_req-list">
                                        <div class="td_1 ellipsis"></div>
                                        <div class="td_2 ellipsis"></div>
                                    </div>
                                </div>
                                <div id="sent_from">
                                    <div class="th">
                                        <div class="td_2 ellipsis">${Translate.Title.TH.PendingLeagueInvitation[UserLag.language]}</div>
                                        <div class="td_1 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>

                                    </div>
                                    
                                    <div id="A-A-guild_inv-list">
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        this.unJoinedPlayer();
            $("body").append(box);

        }else{
            
            
            var content = Guild.content_forGuild_data();
            var dialog_box = Guild.dialogBox(Translate.Button.Chat.League[UserLag.language] , NavBar.League , content);
             
             dialogBoxShow(dialog_box);
                    
                    
        }
        
    },
    
    unJoinedPlayer: function(){
    
        $.ajax({
            
            url: "api/guild.php",
            data:{
                
                GET_UNJOINED_PLAYER_DATA: true,
                id_player:ID_PLAYER,
                token:TOKEN
                
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
                console.log(errorThrown);
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                if(json_data.guild_req !== false){
                    
                    var guild = `<div class="td_1" style="width: 70%;">${json_data.guild_req.name}</div>
                                <div class="td_2" style="width: 30%;">
                                    <button  class="full-btn full-btn-1x ellipsis" style="width: 80%; margin: auto" id="cansel-guild_req" data-id-guild="${json_data.guild_req.id_guild}">${Translate.Button.General.Cancel[UserLag.language]}</button>
                                </div>`;
                    $("#A-A-guild_req-list").html(guild);
                    
                    
                }
                if(json_data.guild_inv.length > 0){
                    
                    var guilds = "";
                    for(var iii =0 ; iii < 5 ; iii++){
                        
                        if(json_data.guild_inv[iii]){
                            guilds +=`  <div class="tr" data-id_guild="${json_data.guild_inv[iii].id_guild}">
                                            <div class="td_1" style="width: 50%;">${json_data.guild_inv[iii].name}</div>
                                            <div class="td_2" style="width: 48%; margin-right: 2%">
                                                <button  class="full-btn full-btn-1x pull-R ellipsis" style="width: 30%;" id="cansel-guild_inv" data-id-guild="${json_data.guild_inv[iii].id_guild}">الغاء</button>
                                                <button  class="full-btn full-btn-1x ellipsis" style="width: 30%; display: inline-block; " id="accept-guild-inv" data-id-guild="${json_data.guild_inv[iii].id_guild}" >قبول</button>
                                                <button  class="full-btn full-btn-1x pull-R show-guild-prev ellipsis" style="width: 30%; margin-right:3%" >${Translate.Button.MenuList.View[UserLag.language]}</button>
                                            </div>
                                        </div>`;
                        }else {
                            
                            
                            guilds +=`<div class="tr">
                                            <div class="td_1"></div>
                                            <div class="td_2"></div>
                                        </div>`;
                            
                        }
                        
                    }
                    
                    $("#A-A-guild_inv-list").html(guilds);
                    
                }
            }
            
        });
        
    },
    
    
    create: function (){
        
        if($("#guild-name").val() === ""){
            alert_box.confirmMessage(" لا يمكن ان يكون اسم الحلف خالى");
            return ;
        }else if(player.guild_data !== false){
            return ;
        }
        else if($("#guild-name").val().length < 5){
            
            alert_box.confirmMessage("اسم الحلف اقل من 5 حروف");
            return ;
            
        }else if($("#guild-name").val().length  > 20){
            
            alert_box.confirmMessage("يجب ان لا يتعدى اسم الحلف عن 20 حرف");
            return ;
             
        }else{
            var idCity = Elkaisar.CurrentCity.City.id_city;
            $.ajax({
                url: `${API_URL}/api/AGuild/create`,
                data: {
                    guildName  : $("#guild-name").val(),
                    slogBottom : $(".guild_slogan img:first").attr("data-cur_image"),
                    slogTop    : $(".guild_slogan img:last").attr("data-cur_image"),
                    slogMiddle : $(".guild_slogan img:nth-child(2)").attr("data-cur_image"),
                    idCity     : idCity,
                    token      : Elkaisar.Config.OuthToken,
                    server     : Elkaisar.Config.idServer
                },
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    
                    if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                    var JsonObject = JSON.parse(data);
                    
                    if(JsonObject.state === "ok"){
                        
                        $(".close-alert_container").trigger("click");
                       
                       
                       Player_profile.getPlayerGuildData();
                       Guild.getGuildData();
                       Player_profile.refresh_player_data();
                       alert_box.succesMessage(`تم انشاء حلف ${JsonObject.GuildData.name} بنجاح`);
                        
                    }else{
                        
                        alert(data);
                        
                    }
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
            });
            
        }
        
    },
    getGuildData: function (){
        
      
        
        return $.ajax({
            url: `${API_URL}/api/AGuild/getGuildData`,
            data:{
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                Elkaisar.Guild.GuildData  = JsonObject.Guild.GuildData;
                Elkaisar.Guild.LeaderName = JsonObject.Guild.leaderName;
                Elkaisar.Guild.Allay      = JsonObject.Guild.Allay;
                Elkaisar.Guild.prizeShare = JsonObject.Guild.prizeShare;
                
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
    },
    content_forGuild_data: function (){
        
        
        this.getGuildData();
        
        var all_allaies = "";
        var allaies_count = 0;
        
        for(var iii = 0; iii < Elkaisar.Guild.Allay.length ; iii++){
            
            
            
            if(Number(Elkaisar.Guild.Allay[iii]["state"]) === 2){
                all_allaies += `<div class="tr" data-id_guild="${Elkaisar.Guild.Allay[iii]["id_guild"]}">
                                <div class="td friend">${Elkaisar.Guild.Allay[iii]["name"]}</div>
                                <div class="td">
                                    <button class="full-btn full-btn-1x show-guild-prev ellipsis">${Translate.Button.MenuList.View[UserLag.language]} </button>
                                 </div>
                            </div>`;
                allaies_count++;
            }
        }
        
        for(var iii =0 ; iii < 13- allaies_count ; iii++){
            all_allaies += `<div class="tr">
                                    <div class="td"></div>
                                    <div class="td"></div>
                                </div>`;
        }
        
        
        var all_enemy= "";
        var enemy_count = 0;
        
        for(var iii = 0; iii < Elkaisar.Guild.Allay.length ; iii++){
            
            
            
            if(Number(Elkaisar.Guild.Allay[iii]["state"]) === 1){
                all_enemy += `<div class="tr" data-id_guild="${Elkaisar.Guild.Allay[iii]["id_guild"]}">
                                <div class="td enemy">${Elkaisar.Guild.Allay[iii]["name"]}</div>
                                <div class="td">
                                    <button class="full-btn full-btn-1x show-guild-prev ellipsis">${Translate.Button.MenuList.View[UserLag.language]} </button>
                                 </div>
                            </div>`;
                enemy_count++;
            }
        }
        for(var iii =0 ; iii < 13- enemy_count ; iii++){
            all_enemy += `<div class="tr">
                                </div>`;
        }
        
        
        var content = ` <div class="box_content for_guild" id="guild-guild_data">
                            <div class="left-content">
                                <div class="upper">
                                    <div class="table">
                                        <div class="t-row">
                                            <div class="t-d">
                                                <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" style="position: absolute">
                                                <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" style=" position: absolute">
                                                <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" style="position: absolute">
                                            </div>
                                        </div>
                                        <div class="t-row">
                                            <div class="t-r">
                                                <div class="t-d"> :مدير</div>
                                                <div class="t-d">${Elkaisar.Guild.LeaderName}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : الاعضاء</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.mem_num}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : مستوى</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.lvl}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : برستيج</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.prestige}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : شرف</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.honor}</div>
                                            </div>
                                        </div>
                                        <p style="clear: both"></p>
                                        <div class="t-row">
                                            <h1>
                                                ${Elkaisar.Guild.GuildData.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="down">
                                    <div class="th ellipsis"><div class="td_1 ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div></div>
                                    <p>
                                       ${Elkaisar.Guild.GuildData.word || "لا توجد مقدمة"}   
                                    </p>
                                </div>
                            </div>
                            <div class="right-content">
                                <div id="leftofright" class="pull-L">
                                    <div id="guild_domain">
                                        <img src="images/world/smallMap.jpg"/>
                                    </div>
                                </div>
                                <div id="rightofright" class="pull-R">

                                        <div class="th">
                                            <div class="td ellipsis" id="show_allay">${Translate.Title.TH.Friendly[UserLag.language]}</div>
                                            <div class="td ellipsis" id="show_enemy">${Translate.Title.TH.Hostile[UserLag.language]}</div>
                                        </div>
                                        <div id="guild_allaies">${all_allaies}</div>
                                        <div id="guild_enemy" style="display: none">${all_enemy}</div>
                                  
                                </div>
                            </div>
                        </div>`;
        
        return content;
    },
    
    getGuildMemeber:function (offset){
        
        if(!offset){
            offset = 0;
        }
        $.ajax({
            url: "api/guild.php",
            data:{
                get_guild_member: true,
                id_guild: player.guild_data.id_guild,
                id_player:ID_PLAYER,
                offset:offset,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                        
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var guild_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                if(guild_data.length < 1){
                    return ;
                }
                var all_member = "";
                for(var iii =0 ; iii < guild_data.length ; iii ++){
                    
                
                    all_member += ` <div class="tr" data-offset="${offset + iii}" 
                                        data-id-member="${guild_data[iii].id_player}" 
                                        data-member-rank="${guild_data[iii].rank}"
                                        data-prize-share="${guild_data[iii].prize_share}">
                    
                                        <div class="td_1 ellipsis" style="width : 17%">${guild_data[iii].name}</div>
                                        <div class="td_2 ellipsis" style="width : 12%">${guild_ranks[guild_data[iii].rank].ar_title}</div>
                                        <div class="td_3 ellipsis" style="width : 14%">${guild_data[iii].prize_share}%</div>
                                        <div class="td_4 ellipsis" style="width : 13%">${Elkaisar.BaseData.Promotion[guild_data[iii].porm].Title}</div>
                                        <div class="td_5 ellipsis" style="width : 16%"> ${getArabicNumbers(guild_data[iii].prestige)}</div>

                                        <div class="td_6 ellipsis" style="width : 12%">${Number(guild_data[iii].online) === 1 ? "<span style='color:#34740e'>متصل الان</span>" : lastSeen(guild_data[iii].last_seen)}</div>
                                        <div class="td_7 ellipsis" style="width : 16%">
                                            <button class="full-btn full-btn-1x pull-L show-player-profile ellipsis" data-id-player=${guild_data[iii].id_player}>${Translate.Button.MenuList.View[UserLag.language]} </button>
                                            <button class="full-btn full-btn-1x pull-R guild-mem-action-for_admins ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank)<2 ? "disabled" : ""}>${Translate.Button.General.Action[UserLag.language]}</button>
                                            <div class="drop-down-li">
                    
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) > parseInt(guild_data[iii].rank) && parseInt(guild_data[iii].rank) >0? `<div id="isolate-guild-member">عزل من المنصب</div>` : ""}
                                                
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= 5 &&
                                                        parseInt(guild_data[iii].rank) < 6 &&
                                                        parseInt(ID_PLAYER) !== parseInt(guild_data[iii].id_player)? 
                                                `<div id="promote-guild-member">ترقية    &nbsp;&nbsp;&#8618;</div>` : ""}
                                                
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) > parseInt(guild_data[iii].rank) ? `<div id="trade-guild-position">تبادل المناصب</div>` : ""}
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Number(Guild.RANK_DATA.LEADER) ? `<div class="mem-prize-percent">نسبة الجوائز</div>` : ""}
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) >=4 && parseInt(guild_data[iii].rank) === 0? ` <div id="fire-guild-mamber">${Translate.Button.Hero.Dismiss[UserLag.language]}</div>` : ""}
                                                ${parseInt(Elkaisar.DPlayer.GuildData.rank) >=1 && parseInt(guild_data[iii].id_player) === parseInt(ID_PLAYER) && parseInt(Elkaisar.DPlayer.GuildData.rank) !== 6? ` <div id="stepdown-guild-mamber">تنحى من المنصب</div>` : ""}
                                                ${parseInt(guild_data[iii].id_player) === parseInt(ID_PLAYER)? ` <div id="get-out-guild">خروج</div>` : ""}
                                                
                                                
                                            </div>
                                        </div>
                                    </div>`;
                }

                for(var iii =0 ; iii <10 - guild_data.length  ; iii ++){
                    all_member += ` <div class="tr" >

                                    </div>`;
                }

                $("#AFTER-AJAX-allMember").html(all_member);

                /*show invited list*/
                
        
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
            
        });
    },
    content_forRelation: function (){
        
        var guild_data;
        var content = ` <div class="box_content for_guild" id="guild-g_relation">
                            <div class="left-content">
                                <div class="upper" id="join-req-list">
                                    <div class="th"><div class="td_1 ellipsis">${Translate.Title.TH.PendingApplicationApproval[UserLag.language]}</div></div>
                                    <div  class="search_res" style="display: block;">
                                        <ul id="AFTER-AJAX-join-req-mem">

                                        </ul>
                                    </div>
                                </div>
                                <div class="down" id="invited-list">
                                    <div class="th">
                                        <div class="td_1 ellipsis">${Translate.Title.TH.Invite[UserLag.language]}</div>
                                    </div>
                                    <div  class="search_res" style="display: block;">
                                        <ul id="AFTER-AJAX-invited-mem"> 

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="right-content">
                                <div class="left-content full">  

                                    <div class="th">
                                        <div class="td_1 ellipsis" style="width : 17%">${Translate.Title.TH.Member[UserLag.language]}</div>
                                        <div class="td_2 ellipsis" style="width : 12%">${Translate.Title.TH.Post[UserLag.language]}</div>
                                        <div class="td_2 ellipsis" style="width : 14%">${Translate.Title.TH.PrizeShare[UserLag.language]}</div>
                                        <div class="td_3 ellipsis" style="width : 13%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                                        <div class="td_5 ellipsis" style="width : 16%">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                                        <div class="td_6 ellipsis" style="width : 12%">${Translate.Title.TH.LastSeen[UserLag.language]}</div>
                                        <div class="td_7 ellipsis" style="width : 16%">${Translate.Button.General.Action[UserLag.language]}</div>
                                    </div>
                                    <div id="AFTER-AJAX-allMember"></div>
                                </div>  

                            </div>
                            <div class="right-content-footer" >  
                                <div class="buttons">  
                                    <ul>  
                                        <li>  
                                            <div class="full-btn full-btn-2x">  
                                                ${Translate.Button.MenuList.ViewLeagueRank[UserLag.language]}  
                                            </div>  
                                        </li> 
                                        <li>
                                            <div class="nav_icon flex" id="navigate-member-guild-list">
                                                <button data-move="most-left" class="left move_g_page most-left-btn pull-L"></button>
                                                <button data-move="left"  class="left move_g_page left-btn pull-L"></button>
                                                <h1> 1/${Math.ceil(Elkaisar.Guild.GuildData.mem_num/10)}</h1>
                                                <button data-move="most-right"  class="right move_g_page pull-R most-right-btn"></button>
                                                <button data-move="right"  class="right move_g_page pull-R right-btn"></button>
                                            </div>
                                        </li>

                                        <li id="nav_input" class="flex">  
                                            <input type="text" class="input">
                                            <div class="full-btn full-btn-1x ellipsis">  
                                                ${Translate.Button.General.GoTo[UserLag.language]}   
                                            </div>
                                        </li>

                                        <li id="search_select" style=" width: 85px;">  
                                            <select>
                                                <option selected="">الاسم</option>
                                            </select>
                                        </li>
                                        <li id="nav_search" class="flex"> 
                                            <input type="text" class="input">
                                            <div class="full-btn full-btn-1x ellipsis">  
                                                ${Translate.Button.General.Search[UserLag.language]}
                                            </div>
                                        </li>

                                    </ul>  
                                </div>  

                            </div> 
                        </div>`;

        $(".for_guild").replaceWith(content);
        showInVitedMembers();
        this.getGuildMemeber(0);
    },
    
    content_forUpgrade: function (){
        
        var guild_data;
        $.ajax({
            url: "api/guild.php",
            data:{
                get_guild_res: true,
                id_guild: player.guild_data.id_guild,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                if(isJson(data)){
                    var guild_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                        
                 var content =`  <div class="box_content for_guild up_guild">
                            <div class="left-content">
                                <div class="upper">
                                    <div class="banner-red">تطوير الحلف</div>
                                    
                                    <div class="guild-banner">
                                        <div id="guild-lvl">${getArabicNumbers(guild_data.lvl)}</div>
                                        <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png">
                                        <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" >
                                        <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png">
                                    </div>
                                </div>
                                <button class="full-btn  full-btn-2x" id="upgrade_guild" ${Guild.isUpgradable(guild_data) ? "" :"disabled"}>
                                    ${Translate.Button.General.Upgrade[UserLag.language]}
                                </button>

                            </div>
                            <div class="right-content">
                                <div class="left pull-L">
                                    <table border="1">
                                        <td colspan="6" class="th ellipsis">
                                            ${guild_data.lvl < 10 ? "المواد المطلوبة لتطوير الحلف" : "لا يمكنك تطوير الحلف بالموارد مرة اخرى"}
                                        </td>
                                        <tr>
                                            <td>
                                                <img src="images/style/food.png"/>
                                            </td>
                                            <td class="${guild_data.food >= guild_data.lvl*1250000? 'enough': 'not_enough'}">
                                                ${guild_data.lvl < 10? getArabicNumbers(guild_data.lvl*1250000) : "----"}
                                            </td>
                                            <td>
                                                <img src="images/style/stone.png"/>
                                            </td>
                                            <td class="${guild_data.stone >= guild_data.lvl*1250000? 'enough': 'not_enough'}">
                                                ${guild_data.lvl < 10? getArabicNumbers(guild_data.lvl*1250000) : "----"}
                                            </td>
                                            <td>
                                                <img src="images/style/coin.png"/>
                                            </td>
                                            <td class="${guild_data.coin >= guild_data.lvl*1000000? 'enough': 'not_enough'}">
                                                ${guild_data.lvl < 10? getArabicNumbers(guild_data.lvl*1000000) : "----"}
                                            </td>
                                        </tr>
                                        <tr>
                                           <td>
                                                <img src="images/style/wood.png"/>
                                            </td>
                                            <td class="${guild_data.wood >= guild_data.lvl*1250000? 'enough': 'not_enough'}">
                                                ${guild_data.lvl < 10? getArabicNumbers(guild_data.lvl*1250000) : "----"}
                                            </td>
                                            <td>
                                                <img src="images/style/iron.png"/>
                                            </td>
                                            <td class="${guild_data.metal >= guild_data.lvl*1250000? 'enough': 'not_enough'}">
                                                ${guild_data.lvl < 10?  getArabicNumbers(guild_data.lvl*1250000) : "----"}
                                            </td>
                                            
                                        </tr>
                                    </table>
                                    <div class="up_with_mat">
                                        <button class="full-btn pull-L" id="up_with_mat">
                                            <img src="images/icons/pluse.png">
                                            ${Translate.Button.General.Use[UserLag.language]}
                                        </button>
                                        <h1 class="pull-R">
                                           (استعمال احد شعارات الحلف لتطوير الحلف) 
                                        </h1>
                                    </div>
                                </div>
                                <div class="right pull-R ">
                                    <h1 class="header-2 th">
                                        المستوى الحالى
                                    </h1>
                                    <div>
                                        <p>
                                            عدد اعضاء الحلف الحالى هم ${getArabicNumbers(guild_data.mem_num)} عضو
                                            سعة الحلف الاجمالية ${getArabicNumbers(guild_data.lvl*10)} عضو 
                                            وسعة استيعاب الموارد هى ${getArabicNumbers(guild_data.lvl*1000000)}
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div class="right-content-footer" >  
                                <div class="left pull-L">
                                   <div class="table" id="guild-res-table">

                                        <div class="td"  style="width: 13.4%;"></div>
                                        <div  class="td" style="width: 73px;" data-resource="wood" data-count="${guild_data.wood}">
                                            ${getArabicNumbers(guild_data.wood)}
                                        </div>


                                        <div  class="td" style="width: 73px;" data-resource="stone" data-count="${guild_data.stone}">
                                            ${getArabicNumbers(guild_data.stone)}
                                        </div> 

                                        <div  class="td" style="width: 73px;" data-resource="metal" data-count="${guild_data.metal}">
                                            ${getArabicNumbers(guild_data.metal)}
                                        </div>

                                        <div  class="td" style="width: 73px;"  data-resource="food" data-count="${guild_data.food}">
                                            ${getArabicNumbers(guild_data.food)}
                                        </div>

                                        <div  class="td" style="width: 73px;" >
                                            ----
                                        </div> 
                                        <div  class="td" style="width: 73px; margin-top: 10px;">
                                            <img src="images/style/coin.png" style="margin-bottom: -26px;"/>
                                            <div  data-resource="coin" data-count="${guild_data.coin}" >${getArabicNumbers(guild_data.coin)}</div>
                                        </div> 
                                         
                                    </div>
                                     <ol id="input-guild-donate">
                                         <li>
                                            <input type="text" value="0" class="only_num input"  min="0" data-resource="wood" max="${Math.floor(Elkaisar.CurrentCity.City.wood)}" min="0" step="${Math.floor(Elkaisar.CurrentCity.City.wood)}"/>
                                         </li>
                                         <li>
                                             <input type="text" value="0" class="only_num input"  min="0" data-resource="stone" max="${Math.floor(Elkaisar.CurrentCity.City.stone)}" step="${Math.floor(Elkaisar.CurrentCity.City.stone)}"/>
                                         </li>
                                         <li>
                                             <input type="text" value="0" class="only_num input"  min="0" data-resource="metal" max="${Math.floor(Elkaisar.CurrentCity.City.metal)}" step="${Math.floor(Elkaisar.CurrentCity.City.metal)}"/>
                                         </li>
                                         <li>
                                             <input type="text" value="0" class="only_num input"  min="0" data-resource="food" max="${Math.floor(Elkaisar.CurrentCity.City.food)}" step="${Math.floor(Elkaisar.CurrentCity.City.food)}"/>
                                         </li>
                                         <li>
                                             <input type="text" value="0" class="only_num input" style="margin-left: 82px;"  min="0"  data-resource="coin" max="${Math.floor(Elkaisar.CurrentCity.City.coin)}" step="${Math.floor(Elkaisar.CurrentCity.City.coin)}"/>
                                         </li>
                                     </ol>
                                </div>
                                <div class="right pull-R">
                                    <button class="full-btn full-btn-3x" id="guild-donate">
                                        ${Translate.Button.MenuList.Deposite[UserLag.language]}
                                    </button>
                                </div>
                            </div> 
                        </div>`;
                
                $(".for_guild").replaceWith(content);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
       
    },
    
    isUpgradable(guild_data){
        
        if(parseInt(Elkaisar.DPlayer.GuildData.rank) < 4){
            
            return false;
            
        }else if(guild_data.food < guild_data.lvl*1250000){
            
            return false;
            
        }else if(guild_data.wood < guild_data.lvl*1250000){
            
            return false;
            
        }else if(guild_data.metal < guild_data.lvl*1250000){
            
            return false;
            
        }else if(guild_data.stone < guild_data.lvl*1250000){
            
            return false;
            
        }else if(guild_data.coin < guild_data.lvl*1000000){
            
            return false;
            
        }
        
        return true;
        
        
    }
    
    
    
    
};

$(document).on("PlayerReady", "html", function (){
    Guild.getGuildData();
});


const guild_ranks = {
    "0":{
        "ar_title": "عضو عادى"
    },
    "1":{
        "ar_title": "عضو رسمى"
    },
    "2":{
        "ar_title": "عضو كبير"
    },
    "3":{
        "ar_title": "المستشار"
    },
    "4":{
        "ar_title": "الوزير"
    },
    "5":{
        "ar_title": "نائب المدير"
    },
    "6":{
        "ar_title": " المدير"
    }
    
};
Guild.RANK_DATA ={
    NORMAL_MEM: 0,
    SENIOR_MEM:1,
    OLD_MEM:2,
    SUPERVISOR:3,
    MENSTER:4,
    DEPUTY:5,
    LEADER:6
    
};

/*
 * 
 * GUILD MATRIAL DONAtE
 * 
 */

$(document).on("click" , "#guild-donate" , function (){
    
    var food  = parseInt($('#input-guild-donate input[data-resource="food"]').val() )||0;
    var wood  = parseInt($('#input-guild-donate input[data-resource="wood"]').val() )||0;
    var stone = parseInt($('#input-guild-donate input[data-resource="stone"]').val())||0;
    var metal = parseInt($('#input-guild-donate input[data-resource="metal"]').val())||0;
    var coin  = parseInt($('#input-guild-donate input[data-resource="coin"]').val() )||0;
    
    if(food + wood + stone + metal + coin < 10000){
        
        alert_box.confirmMessage("لا يمكنك التبرع باقل من 10 الاف  مورد");
        return ;
        
    }
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({
        
        url: `${API_URL}/api/AGuild/donateRes`,
        data:{
            idCity : idCity,
            food   : food,
            wood   : wood,
            stone  : stone,
            metal  : metal,
            coin   : coin,
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                Elkaisar.City.getCity(idCity).City = JsonObject.CityRes;
                Elkaisar.Guild.GuildData           = JsonObject.GuildData.GuildData;
                Elkaisar.Guild.Allay               = JsonObject.GuildData.Allay;
                Elkaisar.Guild.LeaderName          = JsonObject.GuildData.leaderName;
                Elkaisar.Guild.prizeShare          = JsonObject.GuildData.prizeShare;
                
                /* zero the inputs*/
                $('#input-guild-donate input').val("0");
                
                city_profile.refresh_resource_view();
                city_profile.refresh_army_view();
                /*refresh the view*/
                resourcesRefresh();
                
                /*  refresh  the data in page*/
                Guild.content_forUpgrade();
                
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});


$(document).on("click" , "#creat_guild" , function (){
    
    var box = `  <div id="alert_container" class="bg-general" style=" position:fixed; width: 560px; 
                        z-index:1000;left: 50%;margin-left: -280px; top: 150px; 
                        height:318px"> 
                    <div id="alert_head">    
                        <div>        
                            <img src="images/panner/king_name.png">    
                        </div>       
                        <div id="alert-title">
                             انشاء حلف
                        </div>            
                        <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                    </div>
                    <div id="alert_box" class="guild_creat" >        
                        <div class="row-one">
                            <div class="pull-L left">
                                <div class="guild_slogan" >
                                    <img src="images/style/bottom-1.png" data-place="bottom" data-cur_image="1">
                                    <img src="images/style/central-1.png" data-place="middle" data-cur_image="1">
                                    <img src="images/style/top-1.png" data-place="top" data-cur_image="1">
                                        
                                </div>
                            </div>
                            <div class="pull-R right">
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="top"></div>
                                    <h1>1/21</h1>
                                    <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="top"></div>
                                </div>
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left"  data-place="middle"></div>
                                    <h1>1/4</h1>
                                    <div class="pull-R loop-guild-slogan right-btn"  data-direction="right"  data-place="middle"></div>

                                </div>
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left"  data-place="bottom"></div>
                                    <h1>1/5</h1>
                                    <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="bottom"></div>

                                </div>
                            </div>
                        </div>  
                        <div class="row-two bg-btn-blu" style="background-size: 105% 123%;
                                            background-position: center;
                                            background-repeat: no-repeat;
                                            background-position-y: 0px;">
                            <input type="text" class="input" placeholder="اسم الحلف" id="guild-name"/>
                        </div>
                        <div class="row-three">        
                            <div class="confim-btn">            
                                <button id="conf_creat_guild" class="full-btn full-btn-2x  enter"  >تاكيد وانشاء</button>    

                            </div>    
                        </div>
                    </div>    
                </div>`;
    
    $("body").append(box);
    $("#select_from").remove();
});


/*
* 
* player   change the slogan
* 
 */

$(document).on("click" , ".loop-guild-slogan" , function (){
    
    var direction = $(this).data("direction");
    var place     = $(this).data("place");
    var counter ;
    if(direction === "right"){
        
        if(place === "top"){
            
            if(parseInt($(".guild_slogan img:last").attr("data-cur_image")) < 21){
                
                var next_img = `images/style/top-${parseInt($(".guild_slogan img:last").attr("data-cur_image"))+1}.png`;
                counter = parseInt($(".guild_slogan img:last").attr("data-cur_image"))+1;
                
            }else{
                
                var next_img = `images/style/top-21.png`;
                counter = 21;
                
            } 
            
            $(".guild_slogan img:last").attr("src" ,next_img);
            $(".guild_slogan img:last").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:first h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(21));
            
        }else if(place === "bottom"){
            
            
            if(parseInt($(".guild_slogan img:first").attr("data-cur_image")) < 5){
                
                var next_img = `images/style/bottom-${parseInt($(".guild_slogan img:first").attr("data-cur_image"))+1}.png`;
                counter = parseInt($(".guild_slogan img:first").attr("data-cur_image"))+1;
                
            }else{
                
                var next_img = `images/style/bottom-5.png`;
                counter = 5;
                
            } 
            
            $(".guild_slogan img:first").attr("src" ,next_img);
            $(".guild_slogan img:first").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:nth-child(3) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(5));
            
            
        }else if( place === "middle"){
            
            
            if(parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) < 4){
                
                var next_img = `images/style/central-${parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image"))+1}.png`;
                counter = parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image"))+1;
                
            }else{
                
                var next_img = `images/style/central-4.png`;
                counter = 4;
                
            } 
            
            $(".guild_slogan img:nth-child(2)").attr("src" ,next_img);
            $(".guild_slogan img:nth-child(2)").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:nth-child(2) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(4));
            
        }
        
        
    }else{
        
        
        if(place === "top"){
            
            if(parseInt($(".guild_slogan img:last").attr("data-cur_image")) > 1){
                
                var next_img = `images/style/top-${parseInt($(".guild_slogan img:last").attr("data-cur_image"))-1}.png`;
                counter = parseInt($(".guild_slogan img:last").attr("data-cur_image"))-1;
                
            }else{
                
                var next_img = `images/style/top-1.png`;
                counter = 1;
                
            } 
            
            $(".guild_slogan img:last").attr("src" ,next_img);
            $(".guild_slogan img:last").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:first h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(21));
            
        }else  if(place === "bottom"){
            
            
            if(parseInt($(".guild_slogan img:first").attr("data-cur_image")) > 1){
                
                var next_img = `images/style/bottom-${parseInt($(".guild_slogan img:first").attr("data-cur_image"))-1}.png`;
                counter = parseInt($(".guild_slogan img:first").attr("data-cur_image"))-1;
                
            }else{
                
                var next_img = `images/style/bottom-1.png`;
                counter = 1;
                
            } 
            
            $(".guild_slogan img:first").attr("src" ,next_img);
            $(".guild_slogan img:first").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:nth-child(3) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(5));
            
            
        }else if( place === "middle"){
            
            
            if(parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) >1){
                
                var next_img = `images/style/central-${parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image"))-1}.png`;
                counter = parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image"))-1;
                
            }else{
                
                var next_img = `images/style/central-1.png`;
                counter = 1;
                
            } 
            
            $(".guild_slogan img:nth-child(2)").attr("src" ,next_img);
            $(".guild_slogan img:nth-child(2)").attr("data-cur_image" , counter);
            $(".guild_creat .nav_icon:nth-child(2) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(4));
            
        }
        
        
        
    }
    
    
    
    
});



/*____________________________________________________________________________*/
$(document).on("click" , "#show_enemy" , function (){
    $("#guild_enemy").show();
    $("#guild_allaies").hide();
    $("#show_enemy").addClass("selected");
    $("#show_allay").removeClass("selected");
});

$(document).on("click" , "#show_allay" , function (){
    $("#guild_enemy").hide();
    $("#guild_allaies").show();
    $("#show_allay").addClass("selected");
    $("#show_enemy").removeClass("selected");
});



/*                              تطوير الحلف  بالشعارات*/

$(document).on("click" , "#up_with_mat" , function (){
    BoxOfMatrialToUse(
            ["union_slogan","union_declar","union_era" ],
            "upgrade_guild",
            1
    );
});


$(document).on("click" , ".use_to_up_guild" , function (){
    var matrial_name = $(this).attr("matrial_name");
    var use_for = $(this).attr("use_for");
    var amount = $(this).attr("amount");
    var title = `تأكيد استعمال ${getArabicNumbers(amount)} ${Elkaisar.BaseData.Items[matrial_name].name} من  صندوق المواد الخاص`;
    var content = alert_box.confirmUse_single(use_for , matrial_name , title);
    var alert = alert_box.alert(Translate.Button.Building.Confirm[UserLag.language], content);
    
    $("body").append(alert);
});






// when player click his guild_name

$("#player_guild").click(function (){
    $(".menu-list").each(function (){
        if($(this).data("show") === "union"){
            $(this).trigger("click");
        }
    });
});




/*   show guild leading list  */
$(document).on("click" , "#guild_lead" , function (){
    
    $(this).next(".drop-list").slideToggle();
    
});


/*   CHANGE GUILD WORD   */
$(document).on("click" , "#chang-g-word" , function (){
    
    var current_guild = `<div id="over_lay">
                            <div id="select_from">
                                <div class="head_bar">
                                    <img src="images/style/head_bar.png" class="banner">
                                    <div class="title">المقدمة</div>
                                    <img class="close close_use_menu" src="images/btns/close_b.png">
                                </div>
                                <p style="clear: both"></p>
                                <div id="rank-review">
                                    <div class="upper">
                                        <div class="upper" style="height: 185px;">
                                            <div class="table flex">
                                                <div class="left">
                                                    <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" style="position: absolute">
                                                    <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" style="position: absolute">
                                                    <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" style="position: absolute">
                                                </div>
                                                <div class="right">
                                                    <div class="t-r">
                                                        <label>${Elkaisar.Guild.GuildData.p_name}</label>
                                                        <label>: المدير</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.rank_g)}</label>
                                                        <label>: تصنيف</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.mem_num)}</label>
                                                        <label>: الاعضاء</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.lvl)}</label>
                                                        <label>: مستوى</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.prestige)}</label>
                                                        <label>: برستيج</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.honor)}</label>
                                                        <label>: شرف</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <table>
                                                <tbody>

                                                    <tr>
                                                        <td colspan="3" style="text-align: center; line-height: 34px;">
                                                            <h1 style="background-image: url(&quot;images/background/profile_name.png&quot;);
                                                                background-size: 75% 100%;
                                                                background-repeat: no-repeat;
                                                                background-position: center;"> ${Elkaisar.Guild.GuildData.name}</h1>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="down">
                                        <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                        <p>
                                            <textarea value="${Elkaisar.Guild.GuildData.word}">${Elkaisar.Guild.GuildData.word}</textarea>
                                            <button class="full-btn full-btn-2x " id="save-g-intro" > تعديل</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    
    
    $("body").append(current_guild);
    
    
});


/*      MDIFY   THE INTODUCTION FOR  GUILD    */
$(document).on("click" , "#save-g-intro" , function (){
    
    var self_ = $(this);
    var new_intro = $(this).prev("textarea").val();
    
    if(new_intro.length  === 0){
        alert_box.failMessage("مقدمة غير مسموح بها ");
        return ;
        
    }
    if(Number(Elkaisar.DPlayer.GuildData.rank) < 6){
        alert_box.failMessage("غير مسموح بتغير المقدمة  الا بواسطة المدير");
        return ;
    }
    if(new_intro === Elkaisar.Guild.GuildData.word){
        alert_box.confirmMessage("لم يتم تغير المقدمة");
        return ;
    }
    
    $.ajax({
        
        url: `${API_URL}/api/AGuild/modifyGuildWord`,
        
        data:{
            newWord : new_intro,
            token   : Elkaisar.Config.OuthToken,
            server  : Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                Elkaisar.Guild.GuildData           = JsonObject.GuildData.GuildData;
                Elkaisar.Guild.Allay               = JsonObject.GuildData.Allay;
                Elkaisar.Guild.LeaderName          = JsonObject.GuildData.leaderName;
                Elkaisar.Guild.prizeShare          = JsonObject.GuildData.prizeShare;
                self_.parents("p").html(new_intro);
                Elkaisar.Guild.GuildData.word = new_intro;
                alert_box.succesMessage("تم تعديل المقدمة بنجاح");
            }
        }
        
    });
    
});

$(document).on("click" , "#change-g-F_E-list" , function (){
    
    var content = alert_box.alert_content_Guild_FE_list();
    var box= `   <div id="over_lay_alert">   
                            <div id="guild-alert-box">    
                                <div id="alert_head">          
                                    <div>               
                                        <img src="images/panner/king_name.png">       
                                    </div>       
                                    <div id="alert-title">الاصدقاء و الاعداء        
                                    </div>           
                                    <img src="images/btns/close_b.png" class="img-sml close-alert">  
                                </div>  
                                   ${content}
                            </div>
                        </div>`;
    $("body").append(box);
    
});

$(document).on("keyup" , ".F_E-list .row-1 input" , function (){
    
    var search_val = $(this).val();
    
    if(search_val === ""){
        
        $("#g-search_result ul").html("");
        $("#g-search_result").hide();
        return ;
    }
    
    
    $.ajax({
        
        url: "api/guild.php",
        data:{
            
            GET_GUILD_AUTO_COMPLETE: true,
            search_value: search_val,
            id_player:ID_PLAYER,
            id_guild: Elkaisar.DPlayer.Player.id_guild,
            token:TOKEN
            
        },
        type: 'GET',
        
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            var json_data = JSON.parse(data);
            
            var list = "";
            
            for(var iii = 0 ; iii< json_data.length ; iii++){
                
                list += `   <li data-id-guild="${json_data[iii].id_guild}" data-g-name = "${json_data[iii].name}"> 
                                <div class="pull-L image">
                                    <img src="images/style/bottom-${json_data[iii].slog_btm}.png">
                                    <img src="images/style/central-${json_data[iii].slog_cnt}.png">
                                    <img src="images/style/top-${json_data[iii].slog_top}.png" >
                                </div>
                                <h1 class="pull-L">${json_data[iii].name}</h1>
                                <h2 class="pull-L">(${getArabicNumbers(json_data[iii].lvl)})</h2>
                            </li>`; 
                
            }
            
           if(json_data.length){
               
                $("#g-search_result").show();
                $("#g-search_result ul").html(list);
               
           }else{
               
                $("#g-search_result").hide();
                $("#g-search_result ul").html("");
               
           }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
});





/*
 * SELECT GUILD FOR RELATION 
 */
$(document).on("click" , "#g-search_result li" , function (){
    
    var id_guild = parseInt($(this).attr("data-id-guild"));
    var guild_name = $(this).attr("data-g-name");
    
    $(".F_E-list .row-1 input").val(guild_name);
    $(".F_E-list .row-1 input").attr("data-id-guild" , id_guild);
    $(".F_E-list .row-1 input").attr("data-g-name" , guild_name);
    
    
    $("#g-search_result").hide();
    $("#g-search_result ul").html("");
    
});


$(document).on("click" , "#submit-guild-relation" , function (){
    
    var relation   = $('.F_E-list input[name=guild_relation]:checked').val();
    var id_guild   = parseInt($(".F_E-list .row-1 input").attr("data-id-guild"));
    var guild_name = ($(".F_E-list .row-1 input").attr("data-g-name"));
    
    if(!id_guild){
        
        alert_box.confirmMessage("عليك اختيار الحلف اولا");
        return ;
    }else if(!relation.length){
        
        alert_box.confirmMessage("اختار العلاقة بين الحلفين");
        return ;
        
    }
    
    
    
    $.ajax({
        
        url: "api/guild.php",
        data:{
            
            CHANGE_GUILD_RELATION:true,
            id_guild: id_guild,
            relation: relation,
            id_player:ID_PLAYER,
            token:TOKEN
            
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(data === "added"){
                
                $(".close-alert").click();
                alert_box.succesMessage("تم اضافة العلاقة بين الحلفين بنجاح");
                Guild.getGuildData().done(function (){
                    if($(".left-nav .selected").attr("head_title") === "guild_data"){
                        $(".left-nav .selected").click();
                    }
                });
                ws.send(JSON.stringify({
                    url:"WS_GuildReq/announceRelation",
                    data:{
                        idPlayer:ID_PLAYER,
                        player_name:Elkaisar.DPlayer.Player.name,
                        guild_one:Elkaisar.DPlayer.GuildData.name,
                        guild_two:guild_name,
                        id_guild_one:Elkaisar.DPlayer.Player.id_guild,
                        id_guild_two:id_guild,
                        relation:relation,
                        token:TOKEN
                    }
                    
                }));
                
            }else{
                alert(data) ;
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});


/*
* 
*        GUILD INVITE PLAYER 
*/

$(document).on("click" , "#invite-g" , function (){
    
    var content = alert_box.alert_content_Guild_Invite();
    var box= `   <div id="over_lay_alert">   
                            <div id="guild-alert-box">    
                                <div id="alert_head">          
                                    <div>               
                                        <img src="images/panner/king_name.png">       
                                    </div>       
                                    <div id="alert-title">دعوة املك
                                    </div>           
                                    <img src="images/btns/close_b.png" class="img-sml close-alert">  
                                </div>  
                                   ${content}
                            </div>
                        </div>`;
    $("body").append(box);
    
});


$(document).on("keyup" , "#search_by_name_forGuild" , function (){
   
    var segmant = $(this).val();
    
    if($.trim(segmant) !== ""){
        
        searchByName(segmant , true);
         
    }else{
        $("#search_result ul").empty();
        $("#search_result ").hide();
    }
 
    
});


$(document).on("click" , "#submit-guild-invite" , function (){
    
    var id_player = parseInt($("#search_by_name_forGuild").attr("id_player"));
    
    if( !id_player){
        
        alert_box.confirmMessage("يجب عليك اختيار ملك");
        return ;
        
    }    
    
    
    $.ajax({
        
        url: "api/guild.php",
        data: {
            
            INVITE_GUILD_MEMBER: true,
            id_player: id_player,
            id_admin:ID_PLAYER,
            token:TOKEN
            
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
          
            if(data === "added"){
                
                $(".close-alert").click();
                if($("#guild-g_relation").length > 0){
                    showInVitedMembers();
                }
                alert_box.succesMessage('تم ارسال الدعوة بنجح');
            }else{
                alert(data);
                console.log(data);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});


/*  change  guild  slogan*/
$(document).on("click" , "#change-g-slog" , function (){
    
    
    if(!Elkaisar.Guild.GuildData){
        alert_box.confirmMessage("لا يمكن عرض هذا العنصر");
        return ;
    }
    
    $("#alert_container").remove();
    
    var new_slogan_co = `<div id="alert_container" class="bg-general" style=" position:fixed; width: 560px; 
                                z-index:1000;left: 50%;margin-left: -280px; top: 150px; height: auto;
                                "> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">
                                    تعديل شعار
                                </div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="guild_creat">        
                                <div class="row-one">
                                    <div class="pull-L left">
                                        <div class="guild_slogan">
                                            <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" data-place="bottom" data-cur_image="1">
                                            <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" data-place="middle" data-cur_image="1">
                                            <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" data-place="top" data-cur_image="1">

                                        </div>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="top"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_top)}/21</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="top"></div>
                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="middle"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_cnt)}/4</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="middle"></div>

                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="bottom"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_top)}/5</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="bottom"></div>

                                        </div>
                                    </div>
                                </div>  
                                <div class="row-two bg-btn-blu" style="background-size: 105% 123%;
                                                    background-position: center;
                                                    background-repeat: no-repeat;
                                                    background-position-y: 0px;">
                                    <h1 style="color: white; font-size: 16px; line-height: 36px; text-align: center" >${Elkaisar.Guild.GuildData.name}</h1>
                                </div>
                                <div class="row-three">        
                                    <div class="confim-btn">            
                                        <button  class="full-btn full-btn-2x  enter" id="updateGuildSlog"> تعديل الشعار</button>    

                                    </div>    
                                </div>
                            </div>    
                        </div>`;
    $("body").append(new_slogan_co);
    
});


/*
 * send join reqest for guild
 */
$(document).on("click" , "#send-guild-req button" , function (){
    
    var id_guild = parseInt($(this).attr("data-id-guild"));
    
    if(typeof id_guild !== 'number'){
        
        return ;
        
    }
    $.ajax({
        
        url: `${API_URL}/api/AGuildInvReq/sendGuildRequest`,
        data:{
            idGuild   : id_guild,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            
            if(Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                alert_box.succesMessage("تم ارسال الدعوة الى المسؤلين للانضمام للحلف");
                $(".close_use_menu").click();
            }
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});


/*
 *  player cansel his own invetation  
 * 
 */

function canselGuildInvetation(id_player , id_guild)
{
    
    $.ajax({
        
        url: `${API_URL}/api/AGuildInvReq/rejectGuildInv`,
        data: {
            idGuild  : id_guild,
            token    : Elkaisar.Config.OuthToken,
            server   : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                alert_box.succesMessage("تم الغاء  دعوة الانضمام بنجاح");
                $(".close_use_menu").click();
            }
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
}


/*
 *  player cansel his own invetation  
 * 
 */

function canselGuildJoinRequest(id_player , id_guild)
{
    
    $.ajax({
        
        url: `${API_URL}/api/AGuildInvReq/cancelGuildRequest`,
        data: {
            idGuild: id_guild,
            server: Elkaisar.Config.idServer,
            token : Elkaisar.Config.OuthToken
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                alert_box.succesMessage("تم الغاء طلب الانضمام بنجاح");
            }
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
}


$(document).on("click" , "#cansel-guild_inv" , function (){
    
    var id_guild = parseInt( $(this).attr("data-id-guild"));
    var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);
    
    canselGuildInvetation(id_player , id_guild);
    $(this).parents(".tr").html("");
    
});


$(document).on("click" , "#cansel-guild_req" , function (){
    
    var id_guild  = parseInt( $(this).attr("data-id-guild"));
    var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);
    
    canselGuildJoinRequest(id_player , id_guild);
    $(this).parents(".tr").html("");
    $(".close_use_menu").click();
});



/*
 * 
 * accept guild invetation
 * 
 */
$(document).on("click" , "#accept-guild-inv" , function (){
    
    var  id_guild = parseInt($(this).attr("data-id-guild"));
    
    $.ajax({
        
        url: `${API_URL}/api/AGuildInvReq/cancelGuildRequest`,
        data: {
            idGuild: id_guild,
            server: Elkaisar.Config.idServer,
            token : Elkaisar.Config.OuthToken
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                Player_profile.getPlayerGuildData();
                
                Guild.getGuildData();
                $("#select_from").remove();
                alert_box.succesMessage("تم انضمامك للحلف واصبحت عضو فيه");
                Player_profile.refresh_player_data();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});

/*________________________________ACTIONS MADE PY GUILD ADMINS ____________________*/


$(document).on("click" , "#isolate-guild-member" , function (){
    
    var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
    var id_member   = parseInt($(this).parents(".tr").attr("data-id-member"));
    
    if(rank_member < parseInt(Elkaisar.DPlayer.GuildData.rank)){
        
        $.ajax({
            
            url: `${API_URL}/api/AGuildMember/removeFromPosition`,
            data:{
                
                idMember : id_member,
                offset   : 0,
                token    : Elkaisar.Config.OuthToken,
                server   : Elkaisar.Config.idServer
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
            },
            success: function (data, textStatus, jqXHR) {
                
                if(Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
                var JsonObject = JSON.parse(data);

                if(JsonObject.state === "ok"){

                    if($("#guild-g_relation").length > 0){
                        var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                        Guild.getGuildMemeber(offset);
                        
                    }
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    }else{
        
        alert_box.confirmMessage("لا يمكنك عزل هذا العضو حيث ان رتبته اعلى منك") ;
       return ;
        
    }
    
});


/*                  ترقية عضو داخل الحلف*/
$(document).on("click" , "#promote-guild-member" , function (){
    
    
    $(".promote-guild-member").remove();
    var adder = `<ul class="drop-down-li promote-guild-member" style="display: block;">

                        ${Elkaisar.DPlayer.GuildData.rank > 5 ? `<div data-promrote-to="5"> نائب مدير</div>` : ""}
                        <div data-promrote-to="4">وزير</div>
                        <div data-promrote-to="3">مستشار</div>
                        <div data-promrote-to="2">عضو كبير</div>
                        <div data-promrote-to="1">عضو رسمى</div>
                </ul>`;
    
    $(adder).insertAfter($(this));
    
});

$(document).on("click" , ".promote-guild-member div" , function (){
    
    var id_member = parseInt($(this).parents(".drop-down-li").parents(".tr").attr("data-id-member"))|| 0;
    var promotion = $(this).attr("data-promrote-to");
    
    if(parseInt(ID_PLAYER) === parseInt(id_member)){
        
        alert_box.confirmMessage("لا يمكنك ترقية نفسك  يا حج :D");
        return ;
        
    }else if(parseInt(Elkaisar.DPlayer.GuildData.rank < 5)){
        
        alert_box.confirmMessage("انت فى منصب  لا يسمح لك بترقية الاخرين");
        return ;
        
    }else{
        
        $.ajax({
            
            url: `${API_URL}/api/AGuildMember/promotMember`,
            data:{
                idMember : id_member,
                offset   : 0,
                newRank  : promotion,
                token    : Elkaisar.Config.OuthToken,
                server   : Elkaisar.Config.idServer
                
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                if(JsonObject.state === "ok"){
                    
                    if($("#guild-g_relation").length > 0){
                        
                        var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                        Guild.getGuildMemeber(offset);
                        
                    }
                    
                }else if(JsonObject.state === "error_6"){
                    
                    alert_box.confirmMessage(`يوجد عدد كافى من ${guild_ranks[promotion].ar_title} لتتطوير هذا العضو عليك عزل ${guild_ranks[promotion].ar_title} اخر`);
                    
                }else if(JsonObject.state === "error_3"){
                    
                    alert_box.confirmMessage("انت لا تملك المنصب المناسب لترقة هذا العضو");
                    
                }else{
                    
                    alert(data)
                    
                }
                
            },
            beforeSend: function (xhr) {
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    }
    
    
    
});


/*                             تبادل المناصب                                 */
$(document).on("click" ,"#trade-guild-position" , function (){
    
    var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
    var id_member   = parseInt($(this).parents(".tr").attr("data-id-member"));
    
    if(parseInt(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER){
        
        
       
        
        if (!confirm("تاكيد نقل منصب المدير الى شخص اخر بالحلف")) {
            
            alert_box.confirmMessage("تم الغاء الطلب");
            return ;
            
        }  
        
    }
    
    if(rank_member >= parseInt(Elkaisar.DPlayer.GuildData.rank)){
        
        
        alert_box.confirmMessage("لا يمكنك تبادل مناصب اعلى او فى نفس مستوى منصبك");
        return ;
        
    }else if(id_member === parseInt(Elkaisar.DPlayer.Player.id_player)){
        
        alert_box.confirmMessage("لا يمكنك تبادل مناصب مع نفسك");
        return ;
        
    }else {
        
        $.ajax({
            
            url: `${API_URL}/api/AGuildMember/tradePosition`,
            data:{
                idMember : id_member,
                offset   : 0,
                token    : Elkaisar.Config.OuthToken,
                server   : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                if(JsonObject.state === "ok"){
                    
                    //Guild.content_forRelation();
                    var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                    Guild.getGuildMemeber(offset);
                    
                }else if(JsonObject.state === "error_3"){
                    
                    alert_box.confirmMessage("لا يمكنك تبادل مناصب اعلى او فى نفس مستوى منصبك");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    }
    
});
$(document).on("click" ,".mem-prize-percent" , function (){
    
    var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
    var id_member   = parseInt($(this).parents(".tr").attr("data-id-member"));
    var prize_share   = parseInt($(this).parents(".tr").attr("data-prize-share"));
    
    if(Number(Elkaisar.DPlayer.GuildData.rank) < Guild.RANK_DATA.LEADER){
        
        alert_box.confirmMessage("لا يمكن الا للمدير بتعديل نسب الجوائز للاعب")
        
    }
    
    var content = `
                تاكيد تعديل نسبة الجوائز للاعب </br>
                <input id="modfie-prize-share-input" type="text" class="only_num input" value="${prize_share}" 
                    max="${Math.max(100 - Number(Elkaisar.Guild.GuildData.total_prize_share) + prize_share , 0)}" 
                    min="0" step="1"/>`;
                    
    alert_box.confirmDialog(content, function (){
        
        var newVal = Number($("#modfie-prize-share-input").val());
        if(newVal > Math.max(100 - Number(Elkaisar.Guild.GuildData.total_prize_share) + prize_share , 0)
                || newVal < 0)
        {
            alert_box.failMessage("نسبة الجوائز غير مسموح بيها");
            return ;
        }
        $.ajax({
            url: `${API_URL}/api/AGuildMember/modifyPrizeShare`,
            data:{
                idMember      : id_member,
                offset        : 0,
                newPrizeShare : newVal,
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var jsonData = JSON.parse(data);
                    
                    if(jsonData.state === "ok"){
                        
                        var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                        Guild.getGuildMemeber(offset);
                        
                    }else if(jsonData.state === "error_1"){
                        alert_box.failMessage("هذا اللاعب غير موجود بالحلف الحالى");
                    }else if(jsonData.state === "error_4"){
                        alert_box.failMessage("النسبة الجديدة غير مسموح بها") ;
                    }else if(jsonData.state === "error_5"){
                        alert_box.failMessage("لا توجد نسب كافية لهذا اللاعب");
                    }
                    
                    
                }else{
                    alert(data);
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    });

    
    
    
});

/*                     طرد لاعب  */
$(document).on("click" , "#fire-guild-mamber" , function (){
    
    var id_member   = parseInt($(this).parents(".tr").attr("data-id-member"));
    var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
    
    if(!id_member){
        
        return ;
        
    }
    
    alert_box.confirmDialog("تاكيد طرد اللاعب " , function (){
        
        if(rank_member === 0){
            
            $.ajax({
                
                url: `${API_URL}/api/AGuildMember/fireMember`,
                data:{
                    idMember : id_member,
                    offset   : 0,
                    token    : Elkaisar.Config.OuthToken,
                    server   : Elkaisar.Config.idServer
                },
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    
                    if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                    var JsonObject = JSON.parse(data);
                    
                    if(JsonObject.state === "ok"){
                        
                        var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                        Guild.getGuildMemeber(offset);
                        alert_box.succesMessage("تم حذف العضو بنجاح");
                        
                    }else if(data === "error_0"){
                        
                        alert_box.confirmMessage("انت لست فى منصب يسمح لك ذالك");
                        
                    }
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
                
            });
            
            
        }else{
            
            alert_box.confirmMessage("لا يمكنك طرد عضو موجود بمنصب");
            
        }
        
        
    });
    
});


/*                                                 خروج من الحلف*/
$(document).on("click" , '#get-out-guild , #leave-g' , function (){
    
    
    if(parseInt(Elkaisar.DPlayer.GuildData.rank) > 0){
        
        alert_box.confirmMessage("لا يمكنك الخروج من الحلف عليك التخلى عن منصبك اولا ");
        return ;
        
    }
    
    alert_box.confirmDialog("تاكيد الخروج من الحلف" , function (){
        
        $.ajax({

            url: `${API_URL}/api/AGuild/quitFromGuild`,
            data:{
                token:Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer``
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {

                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                    
                var JsonObject = JSON.parse(data);
                    
                if(JsonObject.state === "ok"){

                    $(".close_dialog").click();
                    Player_profile.getPlayerGuildData();
                    Player_profile.getPlayerBaseData();
                    $("#player_guild span").html("");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });
        
    });
    
});

$(document).on("click" , "#stepdown-guild-mamber , #resignation-g" , function (){
    
    if(parseInt(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER){
        
        alert_box.confirmMessage("عليك التنازل  لاحد اعضاء الحلف بمنصب المدير");
        return ;
        
    }
    
    alert_box.confirmDialog("تاكيد الاستقالة من الحلف ( ستصبح عضو عادى تاخل الحلف)"  , function (){
        
        $.ajax({
            
            url: `${API_URL}/api/AGuild/resignFromPosition`,
            data:{
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                    
                var JsonObject = JSON.parse(data);
                    
                if(JsonObject.state === "ok"){
                    
                    Player_profile.getPlayerGuildData();
                    var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
                    Guild.getGuildMemeber(offset);
                    
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
});


/*                                   distroy guild                             */
$(document).on("click" , "#destroy-g" , function (){
    
    if(Number(Elkaisar.DPlayer.GuildData.rank) !== Guild.RANK_DATA.LEADER){
        
        alert_box.confirmMessage("يجب انت تكون مدير الحلف   لتتمكن من تفكيك الحلف");
        return ;
        
    }
    
    alert_box.confirmDialog("تاكيد تفكيك الحلف , اذا تم تاكيد تفكيك الحلف سيتم طرد جميع الاعضاء ولن تتمكن من  ارجاع الحلف ثانية"  , function (){
        
       $.ajax({
           
            url: `${API_URL}/api/AGuild/disbandGuild`,
            data:{
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
               if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                    
                var JsonObject = JSON.parse(data);
                    
                if(JsonObject.state === "ok"){
                   
                    Player_profile.getPlayerGuildData();
                    alert_box.succesMessage("تم تفكيك الحلف بنجاح");
                    $(".close_dialog").click();
                   
               }else{
                    alert(data);
               }
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
           
       }); 
        
    });
    
});



/*  upgrade guild page*/

$(document).on("click" , "#upgrade_guild" , function (){
    
    if(Elkaisar.DPlayer.GuildData.rank < Guild.RANK_DATA.MENSTER){
        
        alert_box.confirmMessage("منصبك  لا يسمح لك بتتطوير الحلف");
        return ;
        
    }
    
    $.ajax({
        
        url: `${API_URL}/api/AGuild/upgradeUsingRes`,
        data:{
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
        
            if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                    
            var JsonObject = JSON.parse(data);

            if(JsonObject.state === "ok"){
                alert_box.succesMessage("تم تطوير الحلف");
                Guild.getGuildData();
                $(".left-nav .selected").click();
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});

$(document).on("click" , "#navigate-member-guild-list .move_g_page" , function (){
    
    var move_direction = $(this).attr("data-move");
    var last_offset    = $("#guild-g_relation .left-content .tr:last-child").attr("data-offset");
    var first_offset   = $("#guild-g_relation .left-content .tr:first-child").attr("data-offset");
    if(move_direction === "right"){
        if(Number(last_offset) === Number(Elkaisar.Guild.GuildData.mem_num) - 1 || !last_offset){
            return ;
        }else{
            Guild.getGuildMemeber(Number(last_offset) +1);
        }
    }else if(move_direction === "left"){
        if(Number(first_offset) === 0){
            return ;
        }else{
            Guild.getGuildMemeber(Number(first_offset) - 10);
        }
    }else if(move_direction === 'most-right'){
        Guild.getGuildMemeber(Math.floor(Elkaisar.Guild.GuildData.mem_num - Elkaisar.Guild.GuildData.mem_num%10));
    }else{
        Guild.getGuildMemeber(0);
    }
    
});

//<img class="close close_use_menu" id="closeGuildSelFrom" src="images/btns/close_b.png" onclick="">
$(document).on("click", "#closeGuildSelFrom", function(){
    $('#select_from').remove();
});
//<button id="conf_creat_guild" class="full-btn full-btn-2x  enter" onclick="Guild.create()" >تاكيد وانشاء</button> 
$(document).on("click", "#conf_creat_guild", function (){
    Guild.create();
});

//<button  class="full-btn full-btn-2x  enter" id="updateGuildSlog" onclick="BoxOfMatrialToUse(['family_slogan'], 'change_g_slog')"> تعديل الشعار</button>
$(document).on("click", "#updateGuildSlog", function (){
    BoxOfMatrialToUse(['family_slogan'], 'change_g_slog');
});var MSG_NUM;


function refreshMsg(){
    
     $.ajax({
            url: "api/message.php",
            data:{
                MSG_NUMBERS: true,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                MSG_NUM = JSON.parse(data);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
    
}

refreshMsg();

function getReports(offset){
    
    if(offset  === undefined){
        offset = 0;
    }
    
    return $.ajax({
            url: "api/battelReport.php",
            data: {
                get_report:true , 
                offset: offset,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
            
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var reports = JSON.parse(data);
                }else {
                    alert(data);
                }

                if(reports){
                    
                    var header = "";
                    for(var iii = 0 ; iii <10 ; iii++){
                        if(reports[iii]){
                            header += `<div class="tr  ${parseInt(reports[iii].seen) === 0 ? "not-seen" : ""}" id_report="${reports[iii]["id_report"]}"  id_msg="${reports[iii]["id_report"]}" 
                                            table="report_player" db_offset="${parseInt(offset)+iii}" data-x-coord="${reports[iii].x}" 
                                             data-y-coord="${reports[iii].y}" data-time-stamp="${reports[iii].time_stamp}" data-report-for="${reports[iii].type}"
                                            data-seen="${reports[iii].seen}">
                                            <div class="td_1">
                                                <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                                <label for="check_${iii}" class="checker"></label>
                                            </div>
                                            <div class="td_3">${getReportTitle(reports[iii]["t"] , reports[iii]["lvl"] , reports[iii]["x"] , reports[iii]["y"])}</div>
                                            <div class="td_5">${reports[iii]["time_stamp"]}</div>
                                            <div class="td_6"><div class="full-btn full-btn-3x show_battel_report">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                        </div>`;
                        }else{
                            header += `<div class="tr"></div>`;
                        }
                    }
                    var output =    `<div class="box_content for_msg for_Br ">
                                        <div class="left-content full">
                                            <div class="th">
                                            <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                            <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                            <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                            <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                        </div>
                                            ${header}
                                        </div>
                                        ${message.footer("report_player" , offset)}
                                    </div>`;
                    $(".box_content").replaceWith(output);
                
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
}

function getSpyReports(offset){
    
    if(offset  === undefined){
            
            offset = 0;
            
        }
    return $.ajax({
        
        
            url: "api/battelReport.php",
            data: {
                get_spy_report:true , 
                offset: offset,
                id_player :ID_PLAYER,
                token     :TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
            
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var reports = JSON.parse(data);
                }else {
                    alert(data);
                }
                
                if(reports){
                    
                    var header = "";
                    for(var iii = 0 ; iii <10 ; iii++){
                        if(reports[iii]){
                            var seen = "";
                            if(Number(reports[iii].id_player ) === Number(Elkaisar.DPlayer.Player.id_player)){
                                seen = Number(reports[iii].seen) === 0 ? "not-seen" : "";
                            }
                            header += `<div class="tr  ${seen}" id_report="${reports[iii]["id_report"]}"  id_msg="${reports[iii]["id_report"]}" 
                                            table="spy_report" db_offset="${parseInt(offset)+iii}" data-x-coord="${reports[iii].x}" 
                                            data-y-coord="${reports[iii].y}" data-time-stamp="${reports[iii].time_stamp}" 
                                            data-id-player = "${reports[iii].id_player}"
                                            data-report-for="${reports[iii].type}"  data-spy-for="${reports[iii].spy_for}" data-seen="${reports[iii].seen}">
                                            <div class="td_1">
                                                <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                                <label for="check_${iii}" class="checker"></label>
                                            </div>
                                            <div class="td_3">${getSpyReportTitle(reports[iii]["t"] , reports[iii]["l"] , reports[iii]["x"] , reports[iii]["y"])}</div>
                                            <div class="td_5">${reports[iii]["time_stamp"]}</div>
                                            <div class="td_6"><div class="full-btn full-btn-3x show_spy_report" data-id-victim=${Number(reports[iii].victim)}>${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                        </div>`;
                        }else{
                            header += `<div class="tr"></div>`;
                        }
                    }
                    var output =    `<div class="box_content for_msg for_Br  for_SR">
                                        <div class="left-content full">
                                            <div class="th">
                                                <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                                <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                                <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                                <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                            </div>
                                            ${header}
                                        </div>
                                        ${message.footer("spy_report" , offset)}
                                    </div>`;
                    $(".box_content").replaceWith(output);
                
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
}

var message = {
    
    dialogBoxContent_battelReport: function(offset){
         if(offset  === undefined){
            
            offset = 0;
            
        }
        getReports(offset);
        
    },
    dialogBoxContent_spyReport: function(offset){
         if(offset  === undefined){
            
            offset = 0;
            
        }
        getSpyReports(offset);
        
    },
    dialogBoxcontent_msgIncome:function (offset){
        if(offset  === undefined){
            
            offset = 0;
            
        }
        
        
        var output =  ` <div class="box_content for_msg">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Sender[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                            </div>
                        `;
        $.ajax({
            
            url: "api/message.php",
            data:{
                get_msg_income : true,
                offset         : offset ,
                id_player      : ID_PLAYER,
                token          : TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data)
                var json_data = JSON.parse(data);
               
                   
                    for (var iii =0 ; iii < 10 ; iii++){

                        if(json_data[iii]){
                            output += `<div class="tr ${parseInt(json_data[iii].seen) === 0 ? "not-seen" : "seen"} ${parseInt(json_data[iii].from_) === 1 ? "sys-msg" : ""} ${parseInt(json_data[iii].from_) === 2 ? "g-msg" : ""}"
                                            data-seen="${json_data[iii].seen}" id_msg="${json_data[iii].id_msg}" table="msg_income" db_offset="${parseInt(offset)+iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                           
                                        </div>
                                        <div class="td_2">${json_data[iii].name}</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6">
                                            <div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div>
                                        </div>
                                    </div>`;
                        }else{
                            output += `<div class="tr"></div>`;
                        }
                    }
                     output +=  `

                            </div>
                            ${message.footer("msg_income" , offset)}
                        </div>`;

                    $(".box_content").replaceWith(output);
                
                
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
        
                             
          
    },
    
    incomeMsgShow: function (id_msg , offset_parent){
        
        var msg_data;
        $.ajax({
            url: "api/message.php",
            data:{
                get_income_msg_in_detail: true,
                id_message: id_msg,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                msg_data = JSON.parse(data);
                var single_meassage =`  <div class="box_content for_msg" id="msg_income_detail">
                                            <div class="left-content full">
                                                <div class="upper">
                                                    <ol>
                                                        <li>
                                                             <span>: المرسل </span><span> ${msg_data[0].name}</span> 
                                                        </li>
                                                        <li>
                                                              <span>  : الموضوع  </span><span style="width: 256px;">${msg_data[0].head}</span>
                                                        </li>
                                                        <li>
                                                             <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="msg_body">
                                                    <p class ="selectable">
                                                        ${extractUrl(msg_data[0].body)}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                                <div class="buttons">  
                                                    <ul>  
                                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                            <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_income">
                                                                عودة
                                                            </button>
                                                        </li>
                                                        <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                                           ${parseInt(msg_data[0].from_) === 1 ? "" : ` <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>`}
                                                        </li>

                                                    </ul>  
                                                </div>  
                                            </div> 
                                        </div>`;
                $(".box_content").replaceWith(single_meassage);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    },
    dialogBoxcontent_msgDiff:function (offset){
        if(offset  === undefined){
            
            offset = 0;
            
        }
        
        var output =  ` <div class="box_content for_msg ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Sender[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>`;
        $.ajax({
            
            url: "api/message.php",
            data:{
                get_msg_diff: true,
                offset: offset || 0,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                var json_data = JSON.parse(data);
              
                    for (var iii =0 ; iii < 10 ; iii++){
                    
                        if(json_data[iii]){
                            output += `<div class="tr ${parseInt(json_data[iii].seen) === 0 ? "not-seen" : "seen"}"
                                            data-seen="${json_data[iii].seen}" id_msg="${json_data[iii].id_msg}" data-seen="${json_data[iii].seen}"
                                            table="msg_diff" db_offset="${parseInt(offset)+iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                        </div>
                                        <div class="td_2">النظام</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6"><div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                    </div>`;
                        }else{
                            output += `<div class="tr"></div>`;
                        }
                    }
                     output +=  `

                                </div>
                                ${message.footer("msg_diff" , offset)}
                            </div>`;
                     $(".box_content").replaceWith(output);
               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
        
                             
          
    },
    diffMsgShow: function (id_msg , offset_parent){
        var msg_data;
        $.ajax({
            url: "api/message.php",
            data:{
                get_diff_msg_in_detail: true,
                id_message: id_msg,
                id_player:ID_PLAYER,
                    token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
              
                msg_data = JSON.parse(data);
                var single_meassage =`  <div id="msg_diff_detail" class="box_content for_msg">
                                            <div class="left-content full">
                                                <div class="upper">
                                                    <ol>
                                                        <li>

                                                        </li>
                                                        <li>
                                                              <span>  : الموضوع  </span><span>${msg_data[0].head}</span>
                                                        </li>
                                                        <li>
                                                             <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="msg_body">
                                                    <p>
                                                        ${msg_data[0].body}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                                <div class="buttons">  
                                                    <ul>  
                                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                            <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_diff">
                                                                عودة
                                                            </button>
                                                        </li>
                                                        <li style=" float: right; width: 85px; margin-right: 10px;">  
                                                             <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>
                                                        </li>

                                                    </ul>  
                                                </div>  
                                            </div> 
                                        </div>`;
                $(".box_content").replaceWith(single_meassage);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
        
    },
    dialogBoxcontent_msgOutcome:function (offset){
        
        if(offset  === undefined){
            
            offset = 0;
            
        }
        var output =  ` <div class="box_content for_msg ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Recipient[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>`;
        $.ajax({
            
            url: "api/message.php",
            data:{
                get_msg_outcome: true,
                offset: offset || 0,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                var json_data = JSON.parse(data);
                if(json_data.length >0){
                    for (var iii =0 ; iii < 10 ; iii++){
                    
                        if(json_data[iii]){
                            output += `<div class="tr" id_msg="${json_data[iii].id_msg}" data-seen="${json_data[iii].seen}" table="msg_out" db_offset="${parseInt(offset)+iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                        </div>
                                        <div class="td_2">${json_data[iii].name}</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6"><div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                    </div>`;
                        }else{
                            output += `<div class="tr"></div>`;
                        }
                    }
                    output +=  `

                               </div>
                               ${message.footer("msg_out" , offset)}
                           </div>`;
                    $(".box_content").replaceWith(output);
                    }
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
        
                             
         
    },
    
    outcomeMsgShow: function (id_msg , offset_parent){
        var msg_data;
        $.ajax({
            url: "api/message.php",
            data:{
                get_out_msg_in_detail: true,
                id_message: id_msg,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                msg_data = JSON.parse(data);
                var single_meassage =`  <div class="box_content for_msg">
                                            <div class="left-content full">
                                                <div class="upper">
                                                    <ol>
                                                        <li>
                                                             <span>: المرسل </span><span> ${msg_data[0].name}</span> 
                                                        </li>
                                                        <li>
                                                              <span>  : الموضوع  </span><span>${msg_data[0].head}</span>
                                                        </li>
                                                        <li>
                                                             <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="msg_body">
                                                    <p class ="selectable">
                                                        ${extractUrl(msg_data[0].body)}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                                <div class="buttons">  
                                                    <ul>  
                                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                            <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_out">
                                                                عودة
                                                            </button>
                                                        </li>
                                                        <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                                            <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>
                                                        </li>

                                                    </ul>  
                                                </div>  
                                            </div> 
                                        </div>`;
                
                $(".box_content").replaceWith(single_meassage);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
        
    },
     /*
      *  
      *  
      */
    dialogBoxcontent_msgWrite: function (to , subject ){
        var msg_data;
        
        var single_meassage =`  <div class="box_content for_msg">
                                    <div class="left-content full">
                                        <div class="upper">
                                            <ol>
                                                <li>
                                                     <span>: المرسل </span><span> ${player.name}</span> 
                                                </li>
                                                <li>
                                                      <span>  : الموضوع  </span><input type="text" class="input" value="${subject|| ''}" style=" width: 76% ;" id="subject_to_mail"/>
                                                </li>
                                                <li>
                                                    <span> : المستقبل</span>
                                                    <input type="text" class="input" value="${to? to.name : ''}" style=" width: 59%;" ${to ? (to.id === null ? "" : `id_player="${to.id}"` )  : ""} id="${to ? (to.id === null ? "" : "search_by_name" )  : "search_by_name"}" />
                                                </li>
                                            </ol>
                                            ${to ? ""   : ` <div id="search_result" class="search_res">
                                                                <ul>

                                                                </ul>
                                                            </div>`}
                                        </div>
                                        <div class="msg_body">
                                            
                                            <textarea class ="selectable"></textarea>
                                           
                                        </div>

                                    </div>
                                    <div class="right-content-footer" rank_for="players">  
                                        <div class="buttons">  
                                            <ul>  
                                                <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                    <button class="full-btn full-btn-3x full" id="get-out-of-msgout">
                                                        عودة
                                                    </button>
                                                </li>
                                                <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                                    <button class="full-btn full-btn-3x full" id="${to ? (to.id === null ? "send_mail_to_guild" : "send_mail_to" ) : "send_mail_to"}">
                                                        ارسال
                                                    </button>
                                                </li>

                                            </ul>  
                                        </div>  
                                    </div> 
                                </div>`;
        return single_meassage;
    },
    footer: function (table , offset){
        
        var footer =`   <div class="right-content-footer" msg_for="${table}">  
                            <div class="buttons">  
                                <ul style="overflow: auto; height: 100%;">  
                                    <li>  
                                        <div class="full-btn full-btn-3x" id="select_msg_all">  
                                            ${Translate.Button.MenuList.ToggelAll[UserLag.language]}   
                                        </div>  
                                    </li> 
                                    

                                    <li id="nav_input">  
                                        <div class="full-btn full-btn-3x full" id="del_selected">  
                                            ${Translate.Button.MenuList.DeleteSelected[UserLag.language]}   
                                        </div> 
                                    </li>

                                    <li id="delete-all">  
                                        <button class="full-btn full-btn-3x full">  
                                            ${Translate.Button.MenuList.DeleteAll[UserLag.language]}   
                                        </button> 
                                    </li>
                                    ${
                                    table !== undefined ? 
                                        `<li>
                                            <div id="move_msg_left" msg_type="${table}"  class="left pull-L move_msg left-btn"> </div>
                                            <h1 class="pull-L" id="msg-navigator"> <span>${getArabicNumbers(parseInt(offset)/10+1)}</span>/${getArabicNumbers(Math.ceil(MSG_NUM[table]/10) || 0)}</h1>
                                            <div id="move_msg_right" msg_type="${table}" class="right pull-R move_msg right-btn" ></div>
                                        </li>` : ""
                                    
                                    }
                                </ul>  
                            </div>  

                        </div> `;
        return footer;
    }
};





$(document).on("click" , ".show_msg_income" , function (){
    
    var id_msg = $(this).parents(".tr").attr("id_msg");
    var table = $(this).parents(".tr").attr("table");
    var seen = $(this).parents(".tr").attr("data-seen");
    var offset = $(".for_msg  .tr:first").attr("db_offset");
    if(table === "msg_diff"){
        message.diffMsgShow(id_msg  , offset);
        if(Number(seen) === 0){
            PLAYER_NOTIF.msg_diff -- ;
        }
    }else if(table === "msg_income"){
        message.incomeMsgShow(id_msg , offset);
        if(Number(seen) === 0){
            PLAYER_NOTIF.msg_in -- ;
        }
    }else if(table === "msg_out"){
        message.outcomeMsgShow(id_msg , offset);
    }
    Fixed.refreshPlayerNotif();
});


/*                     SELECT ALL MESSAGEES             */
$(document).on("click" , "#select_msg_all" , function (){

    $(".msg-action").prop("checked" , true);

});

$(document).on("click" , "#del_selected" , function (){
    
    var total_msg = {
        table:null,
        id_msgs:[]
    };
    
    $(".msg-action").each(function (){
        
        if($(this).prop("checked") === true){
            var id_msg = $(this).parents(".tr").attr("id_msg");
            var table = $(this).parents(".tr").attr("table");
            
            total_msg.id_msgs.push(id_msg);
            total_msg.table = table;
        }
        
    });
    
    if(total_msg.id_msgs.length < 1){
        return ;
    }
    
    $.ajax({
        
        url: "api/message.php",
        data: {
            delete_msg: true,
            msgs: JSON.stringify(total_msg),
            id_player:ID_PLAYER,
            token:TOKEN
        },
        type: 'POST',
        beforeSend: function (xhr) {
        },
        success: function (data, textStatus, jqXHR) {
            
            if(parseInt(data) > 0){
                
                if(total_msg.table === "msg_income"){
                    message.dialogBoxcontent_msgIncome();
                }else if(total_msg.table === "msg_diff"){
                    message.dialogBoxcontent_msgDiff();
                }else if(total_msg.table === "msg_out"){
                    message.dialogBoxcontent_msgOutcome();
                }else if(total_msg.table === "report_player"){
                    message.dialogBoxContent_battelReport();
                }else if(total_msg.table === "report_player"){
                    message.dialogBoxContent_spyReport();
                }
                Player_profile.refreshPlayerNotif();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
        
    });
    
});


$(document).on("click" , "#delete-all button" , function (){
    
    var total_msg = {
        table:null,
        id_msgs:[]
    };
    total_msg.table = $(".right-content-footer").attr("msg_for")  
    
    alert_box.confirmDialog("تأكيد حذف جميع الرسائل!..", function (){
        $.ajax({

            url: "api/message.php",
            data: {
                DELETE_ALL_UNREAD: true,
                msgs: JSON.stringify(total_msg),
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
            },
            success: function (data, textStatus, jqXHR) {

               

                if(total_msg.table === "msg_income"){
                    message.dialogBoxcontent_msgIncome();
                }else if(total_msg.table === "msg_diff"){
                    message.dialogBoxcontent_msgDiff();
                }else if(total_msg.table === "msg_out"){
                    message.dialogBoxcontent_msgOutcome();
                }else if(total_msg.table === "report_player"){
                    message.dialogBoxContent_battelReport();
                }else if(total_msg.table === "report_player"){
                    message.dialogBoxContent_spyReport();
                }
                
                Player_profile.refreshPlayerNotif();

                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    });
    
});


function searchByName(segmant , condtion)
{
    
    
    if(condtion  === undefined){
        
        var data_send = {
                search_by_name: true,
                name: segmant,
                id_player:ID_PLAYER,
                token:TOKEN
            };
        
    }else{
        
        var data_send = {
                search_by_name: true,
                name: segmant,
                id_guild_no: false,
                id_guild: playerElkaisar.DPlayer.Player.id_guild,
                id_player:ID_PLAYER,
                token:TOKEN
                
            };
        
    }
    
    $.ajax({
        
            url: "api/player.php",
            data:data_send,
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                var json_data = JSON.parse(data);
                var total = "";
                for(var iii =0 ; iii < json_data.length ; iii++){
                    if(json_data[iii]){
                        total += ` <li id_player="${json_data[iii].id_player}" data-player-name="${json_data[iii].name}"> 
                                        <div class="pull-L">
                                            <img src="${Elkaisar.BaseData.HeroAvatar[json_data[iii].avatar]}"/>
                                        </div>
                                        <h1 class="pull-L">${json_data[iii].name}</h1>
                                        <h2 class="pull-L">(${Elkaisar.BaseData.Promotion[json_data[iii].porm].Title})</h2>
                                    </li>`;
                    }
                }
                $("#search_result ").show();
                $("#search_result ul").html(total);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}



$(document).on("keyup" , "#search_by_name" , function (){
   
    var segmant = $(this).val();
    
    if($.trim(segmant) !== ""){
        
        searchByName(segmant);
         
    }else{
        $("#search_result ul").empty();
        $("#search_result ").hide();
    }
 
    
});


$(document).on("click" , "#search_result ul li" , function (){
    
    var id_player = $(this).attr("id_player");
    var p_name = $(this).attr("data-player-name");
    $("#search_by_name").attr("id_player" , id_player); 
    $("#search_by_name").val(p_name);
    $("#search_by_name_forGuild").attr("id_player" , id_player); 
    $("#search_by_name_forGuild").val(p_name);
    $("#search_result").hide();
    
});


$(document).on("click" , "#send_mail_to" , function (){
    
    var id_to = $("#search_by_name").attr("id_player");
    var subject = $("#subject_to_mail").val();
    var body = $(".msg_body textarea").val();
   
    
    if(!id_to){
        alert_box.confirmMessage("لا يوجد لاعب بهذا الاسم الرجاء التاكد من اسم اللاعب");
        return ;
    }else if($.trim(subject) === ""){
       alert_box.confirmMessage("يجب ان تكون الرسالة بعنوان اكتب اسم موضوع الرسالة");
        return ;
    }else if($.trim(body) === ""){
        alert_box.confirmMessage("لا يمكنك ارسال رسالة فارغة");
        return ;
    }else{
        
        $.ajax({
           
            url: "api/message.php",
            data: {
                send_mail_to: true,
                id_to: id_to, 
                id_from: ID_PLAYER,
                body:body,
                subject: subject,
                token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(data === 'done'){
                    $("#search_by_name").val("");
                    $("#subject_to_mail").val("");
                    $(".msg_body textarea").val("");
                    
                }else{
                    alert(data);
                }
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    }
    
});



$(document).on("click" , ".move_msg" , function (){
    
    var msg_for = $(this).parents(".right-content-footer").attr("msg_for");
    
    var offset = 0;
    if($(this).attr("id") === "move_msg_left"){
        
        offset  = $(".for_msg .left-content .tr:first").attr("db_offset") - 10 >=0 ? $(".for_msg .left-content .tr:first").attr("db_offset") - 10  : 0;
        
    }else if($(this).attr("id") === "move_msg_right"){
        
        offset  = parseInt($(".for_msg .left-content .tr:last").attr("db_offset") )+ 1 || 0 ;
        
    }
        
    
   
    
    switch (msg_for){
        
        case "msg_income": 
            
            message.dialogBoxcontent_msgIncome(parseInt(offset));
            
            break;
        case "report_player": 
            
            message.dialogBoxContent_battelReport(parseInt(offset));
            
            break;
        case "msg_diff": 
            
            message.dialogBoxcontent_msgDiff(parseInt(offset));
            
            break;
        
        case "msg_out": 
            
            message.dialogBoxcontent_msgOutcome(parseInt(offset));
            
            break;
            
        case "spy_report": 
            
            message.dialogBoxContent_spyReport(parseInt(offset));
            
            break;
        
        
    }
    
    
});






$(document).on("click" , ".show-player-profile" , function (){
    
    var id_player = $(this).attr("data-id-player");
    showPlayerProfile(id_player);
    
});


/*
 * 
 * @param {type} id_player
 * @returns {undefined}
 */
function showPlayerProfile(id_player)
{
    
    $.ajax({
        
        url: "api/player.php",
        data:{
            
            GET_PLAYER_DETAIL: true,
            id_player: id_player
            
        },
        type: 'GET',
        beforeSend: function (xhr) {
             var player_review = `<div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">ملف الملك</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review" class="player-review">
                                            <div class="upper">
                                                <div class="left pull-L">
                                                    <div class="player-avatar">
                                                        <img src="${Elkaisar.BaseData.HeroAvatar[1]}" id="A-A-P-image"/>
                                                    </div>

                                                </div>
                                                <div class="right pull-R">
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.League[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-guild">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.NobleRank[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-promotion">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.Ranking[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-rank">
                                                       ----
                                                    </div>
                                                </div>
                                                <p style="clear: both"></p>
                                                <h1 class="player-name" id="A-A-P-name">-----</h1>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Info[UserLag.language]}</div>
                                                <div class="li" style="margin-top: 15px;">
                                                    <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/prestige.png"/>
                                                        </div>
                                                        <div class="title pull-R  " id="A-A-P-prestige">
                                                           ------
                                                        </div>
                                                    </div>
                                                    <div class="li-d pull-R bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/honor.png"/>
                                                        </div>
                                                        <div class="title pull-R " id="A-A-P-honor">
                                                            ----
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="li" style="margin-top: 5px; width: 125px; margin: auto">
                                                     <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/stat_login.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            ${Translate.Button.General.Soon[UserLag.language]}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="li buttons" style="margin-top: 15px; width: 95%">
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/message.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            مراسلة
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/chat.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            شات
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/friend.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            صديق
                                                        </div>
                                                    </div>

                                                </div>

                                                <span style="clear: both"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

            $("body").append(player_review);
        },
        success: function (data, textStatus, jqXHR) {
            
            var json_data = JSON.parse(data);
            
           $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[json_data.avatar] );
           $("#A-A-P-guild").html(json_data.guild || "----");
           $("#A-A-P-promotion").html(Elkaisar.BaseData.Promotion[json_data.porm].Title);
           $("#A-A-P-rank").html(getArabicNumbers(json_data.rank));
           $("#A-A-P-name").html(json_data.name);
           $("#A-A-P-prestige").html(getArabicNumbers(json_data.prestige));
           $("#A-A-P-honor").html(getArabicNumbers(json_data.honor));

        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
    
    
    
}


$(document).on("click" , "#send-g-msg" , function (){
    
    
        var dialog_box = menu_bar.dialogBox(
            Translate.Title.MenuList.Mail[UserLag.language],
            NavBar.Mail,
            message.dialogBoxcontent_msgWrite(
                    {name: Translate.Button.Chat.League[UserLag.language], id: null}
                    ),
            0);
     
        dialogBoxShow(dialog_box , function (){$("#dialg_box").attr("type" , "messages");});
              
    
    
});

$(document).on("click" , "#send_mail_to_guild" , function (){
    
    
    var subject = $("#subject_to_mail").val();
    var body = $(".msg_body textarea").val();
   
    
    if($.trim(subject) === ""){
       alert_box.confirmMessage("يجب ان تكون الرسالة بعنوان اكتب اسم موضوع الرسالة");
        return ;
    }else if($.trim(body) === ""){
        alert_box.confirmMessage("لا يمكنك ارسال رسالة فارغة");
        return ;
    }else{
        
        $.ajax({
           
            url: "api/message.php",
            data: {
                SEND_GUILD_MAIL: true, 
                id_from: ID_PLAYER,
                body:body,
                subject: subject,
                    token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                alert_box.succesMessage("تم ارسال الرسالة بنجاح");
                $("#search_by_name").val("");
                $("#subject_to_mail").val("");
                $(".msg_body textarea").val("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    }
    
});


/*<button class="full-btn full" id="back_msg_income"  data-parent-offset="${offset_parent}">*/

$(document).on("click" ,"#back_msg" , function (){
    
    
    var back_offset = $(this).attr("data-parent-offset");
    var msg_for     = $(this).attr("data-msg-for");
    
    
    switch (msg_for){
        
        case "msg_income": 
            
            message.dialogBoxcontent_msgIncome(parseInt(back_offset));
            
            break;
        case "battel_report": 
            
            message.dialogBoxContent_battelReport(parseInt(back_offset));
            
            break;
        case "msg_diff": 
            
            message.dialogBoxcontent_msgDiff(parseInt(back_offset));
            
            break;
        
        case "msg_out": 
            
            message.dialogBoxcontent_msgOutcome(parseInt(back_offset));
            
            break;
            
        case "spy_report": 
            
            message.dialogBoxContent_spyReport(parseInt(back_offset));
            
            break;
        
        
        
    }
    $("#dialg_box  .nicescroll-rails").remove();
});

$(document).on("click" , "#get-out-of-msgout" , function (){
    
    $(".nav_bar .left-nav li:first").click();
    
});

$(document).on("click" , ".show_battel_report" ,function (){
    
    var id_report = $(this).parents(".tr").attr("id_report");
    var parent_offset = $(".for_msg .tr:first").attr("db_offset");
    var seen     = $(this).parents(".tr").attr("data-seen");
    
    var data_obj = {
        
        time_stamp: $(this).parents(".tr").attr("data-time-stamp"),
        x_coord: $(this).parents(".tr").attr("data-x-coord"),
        y_coord: $(this).parents(".tr").attr("data-y-coord"),
        id_report:id_report
        
    };
    
    
    $.ajax({
        url: "api/battelReport.php",
        data: {
            report_detail: true,
            id_report: id_report,
            id_player:ID_PLAYER,
            token:TOKEN
        },
        type: 'GET',
        beforeSend: function (xhr) {
           
        },
        success: function (data, textStatus, jqXHR) {
            if(Number(seen) === 0){
                PLAYER_NOTIF.msg_report --;
                Fixed.refreshPlayerNotif();
                
            }
            if(isJson(data)){
                $(".box_content").replaceWith(getReportContent(JSON.parse(data) , data_obj , parent_offset));
                $("#battel-detail").niceScroll(SCROLL_BAR_PROP);  
            }else{
                alert(data);
            }
          
            
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
});



message.contentForSpyReport =  function (json_data , data_obj , parent_offset){
    
    if(Number(data_obj.seen) === 0){
        PLAYER_NOTIF.spy_report --;
        Fixed.refreshPlayerNotif();
    }
    if(json_data.side  === "victim"){
        
        return `<div id="spy-report" class="box_content for_msg" >
                    <div class="left-content full">
                        <div id="city-spy-report" class="spy-report">
                            <div class="paragraph">${json_data.content}</div>
                        </div>
                    </div>
                    <div class="right-content-footer" rank_for="players">  
                        <div class="buttons">  
                            <ul>  
                                <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                    <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                        عودة
                                    </button>
                                </li>
                                <li style=" float: right; width: 85px; margin-right: 10px;">  

                                </li>

                            </ul>  
                        </div>  
                    </div> 
                <div>`;
    }
    
    
    return `<div id="spy-report" class="box_content for_msg" >
                <div class="left-content full">
                    
                    <div id="city-spy-report" class="spy-report">
                        
                        <div class="report">
                            <div id="city-resource">
                                <div class="title banner-red">
                                    موارد  المدينة
                                </div>
                                <hr style="width: 70%"/>
                                <ul>
                                    <li>
                                        <img src="images/style/food.png"/>
                                        <label>${json_data.food_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/wood.png"/>
                                        <label>${json_data.wood_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/stone.png"/>
                                        <label>${json_data.stone_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/iron.png"/>
                                        <label>${json_data.metal_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/coin.png"/>
                                        <label>${json_data.coin_res}</label>
                                    </li>
                                </ul>
                            </div>
                            <hr style="width: 80%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div id="spy-report-city-floor">
                                <div id="hill">
                                    <div class="building-unit" style="left: 320px; top: 131px;">
                                        <img class="building" src="images/city/palace.png" style="width: 90px;">
                                        <div class="lvl">${json_data.palace.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 162px; top: 151px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 122px; top: 163px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 208px; top: 156px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 177px; top: 168px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 146px; top: 177px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 251px; top: 165px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 222px; top: 178px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 191px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 160px; top: 198px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 265px; top: 184px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 203px; top: 209px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_11.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 233px; top: 197px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="under-wall">
                                    <div class="building-unit" style="left: 199px; top: 25px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 168px; top: 65px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 169px; top: 40px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 229px; top: 88px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 263px; top: 75px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 199px; top: 51px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 230px; top: 40px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 139px; top: 51px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 259px; top: 52px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 293px; top: 63px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 226px; top: 64px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_11.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 199px; top: 77px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="under-palace">
                                    <div class="building-unit" style="left: 456px; top: 216px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 425px; top: 202px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 202px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 361px; top: 177px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 393px; top: 165px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 458px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 176px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 513px; top: 189px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 453px; top: 163px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 422px; top: 152px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 426px; top: 175px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_11.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 395px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="light-house">
                                   
                                     <div class="building-unit" style="left: 546px; top: 120px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 514px; top: 134px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 547px; top: 148px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 548px; top: 174px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 535px; top: 100px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 147px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 510px; top: 111px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 483px; top: 122px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 455px; top: 133px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 517px; top: 160px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_10.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="around-wood">
                                    <div class="building-unit" style="left: 185px; top: 107px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 156px; top: 94px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 287px; top: 134px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 323px; top: 122px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 359px; top: 108px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 388px; top: 97px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 359px; top: 83px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 332px; top: 94px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 146px; top: 120px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_6.split("-")[1]}</div>
                                    </div>
                                </div>
                            </div>
                            <hr style="width: 90%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div class="title banner-red" style="width: 40%; margin: auto">
                                قوات المدينة
                            </div>
                            <div class="city-army">
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier01.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_a)}">${json_data.army_a}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier02.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_b)}">${json_data.army_b}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier03.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_c)}">${json_data.army_c}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier04.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_d)}">${json_data.army_d}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier05.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_e)}">${json_data.army_e}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier06.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_f)}">${json_data.army_f}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            
                            <div class="desc">
                                يمكن ان تحتوى هذه التقارير على  استخبارات خاطئة بسبب  ضعف الجواسيس لديك
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right-content-footer" rank_for="players">  
                    <div class="buttons">  
                        <ul>  
                            <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                    عودة
                                </button>
                            </li>
                            <li style=" float: right; width: 85px; margin-right: 10px;">  

                            </li>

                        </ul>  
                    </div>  
                </div> 
            </div>`;
    
};


message.contentForSpyReportBarray =  function (json_data , data_obj , parent_offset){
    
    return `<div id="spy-report" class="box_content for_msg" >
                <div class="left-content full">
                    
                    <div id="city-spy-report" class="spy-report">
                        
                        <div class="report">
                            
                            <hr style="width: 80%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div class="title banner-red" style="width: 40%; margin: auto">
                                قوات البرية
                            </div>
                            <div class="city-army">
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier01.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_a*3)}">${json_data.army_a*3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier02.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_b*3)}">${json_data.army_b*3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier03.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_c*3)}">${json_data.army_c*3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier04.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_d*3)}">${json_data.army_d*3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier05.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_e*3)}">${json_data.army_e*3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier06.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_f*3)}">${json_data.army_f*3}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            
                            <div class="desc">
                                يمكن ان تحتوى هذه التقارير على  استخبارات خاطئة بسبب  ضعف الجواسيس لديك
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right-content-footer" rank_for="players">  
                    <div class="buttons">  
                        <ul>  
                            <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                    عودة
                                </button>
                            </li>
                            <li style=" float: right; width: 85px; margin-right: 10px;">  

                            </li>

                        </ul>  
                    </div>  
                </div> 
            </div>`;
    
};

$(document).on("click" , ".show_spy_report" ,function (){
    
    var id_report     = $(this).parents(".tr").attr("id_report");
    var seen        = $(this).parents(".tr").attr("data-seen");
    var id_player     = $(this).parents(".tr").attr("data-id-player");
    var parent_offset = $(".for_msg .tr:first").attr("db_offset");
    var id_victim     = $(this).attr("data-id-victim");
    
    if(Number(seen) === 0){
        PLAYER_NOTIF.spy_report --;
        Fixed.refreshPlayerNotif();
    }
    
    var data_obj = {
        
        time_stamp: $(this).parents(".tr").attr("data-time-stamp"),
        x_coord: $(this).parents(".tr").attr("data-x-coord"),
        y_coord: $(this).parents(".tr").attr("data-y-coord"),
        spy_for: $(this).parents(".tr").attr("data-spy-for"),
        id_victim:id_victim,
        seen:seen,
        id_player:id_player
        
    };
    
    
    $.ajax({
        url: "api/battelReport.php",
        data: {
            spy_report_detail: true,
            id_report: id_report,
            id_player:ID_PLAYER,
            spy_for: data_obj.spy_for,
            id_victim:id_victim,
                    token:TOKEN
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(isJson(data)){
                if(data_obj.spy_for === "barrary"){
                    
                    $(".box_content").replaceWith(message.contentForSpyReportBarray(JSON.parse(data) , data_obj , parent_offset));
                    $("#spy-report .spy-report .report").niceScroll(SCROLL_BAR_PROP); 
                    
                }else if(data_obj.spy_for === "city"){
                    
                    $(".box_content").replaceWith(message.contentForSpyReport(JSON.parse(data) , data_obj , parent_offset));
                    $("#spy-report .spy-report .report").niceScroll(SCROLL_BAR_PROP); 
                    
                }
                 
            }else{
                alert(data);
            }
          
            
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
});


/**
 * 
 * @param {int} id_player
 * @param {array} heros
 * @param {int} side_win
 * @returns {Boolean}  true if winner 
 */
function checkWinner(id_player , heros , side_win)
{
    
    for(var jjj = 0; jjj < heros.length ; jjj++){  
    
        if(parseInt(heros[jjj].id_player)=== parseInt(id_player) &&
                parseInt(heros[jjj].side) === parseInt(side_win)){

                return true;

            }
    
    }
    return false;
    
    
}


//الملك ${detail.general_data.p_name} انشئ ${parseInt(detail.general_data.task) === 0 ? "غزو" : "استيلاء"} الى جبل [ ${getArabicNumbers(data_obj.y_coord)} , ${getArabicNumbers(data_obj.x_coord)} ]
function getReportContent(detail , data_obj , offset)
{
    console.log(detail);
    console.log(data_obj);
    
    var cont = `<div class="box_content for_msg for_Br " id="battel-report-msg">
                    <div class="left-content full">
                        <div id="battel_r_upper">
                            <div class="header">
                                <div class="pull-R th" style="direction: rtl;">
                                   انشئ الملك ${detail.general_data.p_name} ${parseInt(detail.general_data.task) === 0 ? "غزو" : "استيلاء"} الى   [ ${getArabicNumbers(data_obj.y_coord)} , ${getArabicNumbers(data_obj.x_coord)} ] م ${(detail.general_data.lvl)} 
                                </div>
                                <div class="pull-L th">
                                    ${data_obj.time_stamp}
                                </div>
                            </div>
                            <p style="clear: both"></p>
                            <div class="result-icon">
                                ${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "<div class='win'>فوز</div> " : "<div class='def'>هزيمة</div>"}
                            </div>
                            <div class="battel-desc">
                                
                            </div>
                            <div class="resource-row">
                                <ul>
                                    <li><img ondragstart="return false;" src="images/style/food.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.resource.food} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/wood.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.resource.wood}</span></li>
                                    <li><img ondragstart="return false;" src="images/style/stone.png"><span>${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.resource.stone} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/iron.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.resource.metal} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/coin.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player , detail.heros , detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.resource.coin} </span></li>
                                </ul>
                            </div>
                            <div class="prize-row flex">
                                <ul>`;
                            for(var iii in detail.prize.matrial){
                                
                                cont += `<li>
                                            <img src="${Matrial.image(detail.prize.matrial[iii].prize)}">
                                            <div class="amount stroke">${detail.prize.matrial[iii].amount}</div>
                                        </li>`;
                                
                            }
                            

                            cont +=`</ul>
                                    <p>جولات: ${getArabicNumbers(detail.general_data.round_num)}, شرف: ${getArabicNumbers(detail.prize.honor ||0)}</p>
                                </div>
                            </div>`;
                      
                        
                cont += `<div id="battel-detail">
                            <div class="your_side">
                                <ul>`;
                            for(var jjj = 0; jjj < detail.heros.length ; jjj++){   
                                       if(detail.heros[jjj]["side"] === "1"){
                                            var tr_1 = "";
                                            var tr_2 = "";
                                            for( var iii = 1 ; iii <= 3 ; iii++){
                                                var f_pre = "f_"+iii+"_pre";
                                                var f_post = "f_"+iii+"_post";
                                                var f_type = "f_"+iii+"_type";

                                                if(detail["heros"][jjj][f_pre] !== "0"){
                                                    tr_1 += ` <li>
                                                             ${army_icon[detail["heros"][jjj][f_type]]}
                                                            <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][f_pre])}</div>
                                                            <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][f_post])}</div>
                                                        </li>`;
                                                }
                                            }
                                            for( var kkk = 1 ; kkk <= 3 ; kkk++){

                                                var b_pre = "b_"+kkk+"_pre";
                                                var b_post = "b_"+kkk+"_post";
                                                var b_type = "b_"+kkk+"_type";
                                                if(detail["heros"][jjj][b_pre] !== "0"){
                                                    tr_2 += ` <li>
                                                             ${army_icon[detail["heros"][jjj][b_type]]}
                                                            <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][b_pre])}</div>
                                                            <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][b_post])}</div>
                                                        </li>`;
                                                }
                                        }
                                        cont+= `<li>
                                                    <div class="hero">
                                                        <div class="name">
                                                            ${detail.heros[jjj].h_name ? detail.heros[jjj].h_name : "بطل النظام"}
                                                        </div>
                                                        ${
                                                        Number(detail.heros[jjj].id_player)  === Number(ID_PLAYER) ?
                                                        `<div class="image">
                                                            <img src="${Elkaisar.BaseData.HeroAvatar[detail.heros[jjj].avatar] || "images/icons/hero/eq-bg.png"}" />
                                                            <div class="xp stroke">+${getArabicNumbers(detail["heros"][jjj]["xp"])}</div>
                                                        </div>`: ""
            
                                                        }
                                                    </div>
                                                    <div class="army">
                                                        <ol>
                                                        ${tr_1}
                                                        ${tr_2}
                                                        </ol>
                                                    </div>
                                                </li>`;
                                       }
                                }
                    cont +=   `</ul>
                            </div>
                            <div class="enemy_side">
                                <ul>`;
                                    for(var jjj = 0; jjj < detail.heros.length ; jjj++){   
                                       if(detail.heros[jjj]["side"] === "0"){
                                            var tr_1 = "";
                                            var tr_2 = "";
                                            for( var iii = 1 ; iii <= 3 ; iii++){
                                                var f_pre = "f_"+iii+"_pre";
                                                var f_post = "f_"+iii+"_post";
                                                var f_type = "f_"+iii+"_type";

                                                if(detail["heros"][jjj][f_pre] !== "0"){
                                                    tr_1 += ` <li>
                                                             ${army_icon[detail["heros"][jjj][f_type]]}
                                                            <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][f_pre])}</div>
                                                            <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][f_post])}</div>
                                                        </li>`;
                                                }
                                            }
                                            for( var kkk = 1 ; kkk <= 3 ; kkk++){

                                                var b_pre = "b_"+kkk+"_pre";
                                                var b_post = "b_"+kkk+"_post";
                                                var b_type = "b_"+kkk+"_type";
                                                if(detail["heros"][jjj][b_pre] !== "0"){
                                                    tr_2 += ` <li>
                                                            ${army_icon[detail["heros"][jjj][b_type]]}
                                                            <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][b_pre])}</div>
                                                            <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][b_post])}</div>
                                                        </li>`;
                                                }
                                        }
                                        cont+= `<li>
                                                    <div class="hero">
                                                        <div class="name">
                                                            ${detail.heros[jjj].h_name ? detail.heros[jjj].h_name : "بطل النظام"}
                                                        </div>
                                                        ${
                                                            Number(detail.heros[jjj].id_player)  === Number(ID_PLAYER) ?
                                                            `<div class="image">
                                                                <img src="${Elkaisar.BaseData.HeroAvatar[detail.heros[jjj].avatar] || "images/icons/hero/eq-bg.png"}"/>
                                                                <div class="xp stroke">+${getArabicNumbers(detail["heros"][jjj]["xp"])}</div>
                                                            </div>`: ""
            
                                                        }
                                                    </div>
                                                    <div class="army">
                                                        <ol>
                                                        ${tr_1}
                                                        ${tr_2}
                                                        </ol>
                                                    </div>
                                                </li>`;
                                       }
                                }
                   cont +=    ` </ul>
                            </div>
                        </div>
                    </div>
                    <div class="right-content-footer" rank_for="players">  
                        <div class="buttons">  
                            <ul>  
                                <li  style=" float: right; width: 85px; margin-right: 50px;">  
                                    <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${offset}" data-msg-for="battel_report">
                                        عودة
                                    </button>
                                </li>
                                <li  style=" float: right; width: 120px; margin-right: 10px;">  
                                    <button class="full-btn full-btn-3x full" id="show-battel-animated">
                                        <a   href="battel.php?report=${detail.encId}&server=${SERVER_ID}" target="_blank">استعراض المعارك</a>
                                    </button>
                                </li>

                            </ul>  
                        </div>  
                    </div>
                </div>`;
    return cont;
}

$(document).on("click" , "#show-battel-animated" , function (){
    
    //alert_box.confirmMessage("هذة الخاصية غير متاحة الان");
    
});

/*<button class="full-btn full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}">  رد </button>*/

$(document).on("click" , "#msg-reply" ,function (){
    
    var id_player = $(this).attr("data-id-player"); 
    var player_name = $(this).attr("data-player-name"); 
    var subject = "رد " + $(this).attr("data-msg-head") ; 
    
    $(".for_msg").replaceWith( message.dialogBoxcontent_msgWrite({name: player_name , id: id_player} ,subject) );
     
 
});var QuestGrowth = {};
var QuestTrade = {};
var QuestDaily = {};
var ALL_AVAIL_QUEST = {};
var QUESTS_LIST = {};
var Quest = {};
const QUEST_PACKAGE_NAME = {
    promotion: "الترقية",
    infrastructure: "البنية الاساسية",
    cityPlanning: "تخطيط المدينة",
    cityManagement: "ترتيب المدينة",
    resourceProduction: "انتاج الموارد",
    civilTechnology: "التكنولوجيا المدنية",
    militaryStudy: "الدراسات العسكرية",
    cityDefence: "تحصين المدينة",
    cityHero: "ابطال المدينة",
    religion: "المعتقدات الدينية",
    warPreparation: "التجهيزات الحربية",
    dailyQuest: "مهام يومية",
    system_quest: "مهام النظام",
    expMap: "خريطة التوسعة",
    armyPacks: "حزم الاسرى",
    mnawratQuest: "جوائز المناورات",
    rebelCity: "المدينة المتمردة",
    macedonHero: "البطل المقدونى",
    lionEquip: "معدات الاسد",
    loyEquip: "معدات الولاء",
    miliEquip: "معدات حربية",
    brightEquip: "معدات ضوئية",
    fearlessEquip: "معدات جسارة"

};

const  RESOURCE_AR_NAME = {
    coin: "سسترسس",
    food: "غذاء",
    wood: "خشب",
    stone: "حجارة",
    metal: "حديد",
    population: "سكان"
};


var PLAYER_QUEST_DONE = {};
















Quest = {

    dialogBoxcontent_qusets: function (section, package) {
        if (!section)
            section = "QuestGrowth";

        if (!package)
            package = "promotion";


        var counter = 0;

        var quest = this.completeQuestModel(ALL_AVAIL_QUEST[section][package][0]);

        var input = `<div class="box_content for_quest">
                        <div class="left-content">
                            <div class="top-left" id="quest_pack" data-id-section="${section}">
                                ${this.getPackageList(ALL_AVAIL_QUEST[section])}
                            </div>
                            <div class="bottom-left" id="sub_quest">
                                ${this.getQuestInPackageList(section, package)}
                            </div>
                        </div>
                        <div class="right-content" >
                            <div id="quest-page">
                                ${quest}
                            </div>
                            <div class="right-content-footer" rank_for="players">  
                                <div class="buttons">  
                                    <ul style=" margin-top: 8px;">  
                                        <li  style=" float: none; width: 100px; margin: auto;">  
                                            <button data-id-quest="${ALL_AVAIL_QUEST[section][package][0]}" class="full-btn full-btn-3x full" ${this.checkComplete(ALL_AVAIL_QUEST[section][package][0]) ? "" : "disabled='disabled'"}  id="accept_quest">
                                                ${Translate.Button.MenuList.AcceptReward[UserLag.language]}
                                            </button>
                                        </li>
                                    </ul>  
                                </div>  
                            </div>
                        </div>
                    </div>`;
        return input;
    },

    changeContent: function (section, package, quest) {

        var temp = null;
        var idQuest = null;
        if (!package) {
            for (var iii in ALL_AVAIL_QUEST[section]) {

                temp = temp === null ? iii : temp;

                if (this.checkForPackagePrize(ALL_AVAIL_QUEST[section][iii], ALL_AVAIL_QUEST[section])) {
                    package = iii;
                    break;
                }
            }
        }

        if (!package) {
            package = temp;
        }
        temp = null;
        if (!quest) {
            for (var iii in ALL_AVAIL_QUEST[section][package]) {

                temp = temp === null ? ALL_AVAIL_QUEST[section][package][iii] : temp;

                if (this.checkComplete(ALL_AVAIL_QUEST[section][package][iii])) {
                    quest = ALL_AVAIL_QUEST[section][package][iii];
                    break;
                }

            }
        }

        if (!quest) {
            quest = temp;
        }

        $("#quest_pack").attr("data-id-section", section);
        $("#quest_pack").html(this.getPackageList(ALL_AVAIL_QUEST[section], package));
        $("#quest-page").html(this.completeQuestModel(quest));
        $("#sub_quest").html(this.getQuestInPackageList(section, package, quest));
        $("#accept_quest").attr("data-id-quest", quest);

        this.checkComplete(quest) ? $("#accept_quest").removeAttr("disabled") : $("#accept_quest").attr("disabled", "disabled");
        $("#accept_quest").attr("data-id-quest", quest);

    },

    getPackageList: function (section, quest_pack) {

        var Qpackages = "";
        var packaCount = 0;

        for (var package in section) {

            if (Quest.getQuestNumberInBackage(section[package]) > 0) {
                packaCount++;

                if (!QUEST_PACKAGE_NAME[package]) {
                    console.error(package);
                }

                Qpackages += `  <div class="tr ellipsis ${ quest_pack === package ? "selected" : ""}" data-id-package="${package}">
                                    <span>${QUEST_PACKAGE_NAME[package]}</span>
                                   ${this.checkForPackagePrize(package, section) ? `<span class="right_mark"><lable class="img" src="images/btns/done.png" class="img-sml"></lable></span>` : `<span class="right_mark"></span>`}
                                </div>`;
            }

        }

        if (packaCount < 9) {

            for (var iii = 0; iii < 9 - packaCount; iii++) {
                Qpackages += `<div class="tr"></div>
                              `;
            }

        }
        return Qpackages;
    },
    getQuestInPackageList: function (section, package, questId) {
        var Qpackages = "";
        var packaCount = 0;

        for (var idQuest in ALL_AVAIL_QUEST[section][package]) {
            if (Quest.isShowYes(ALL_AVAIL_QUEST[section][package][idQuest]) && Number(PLAYER_QUEST_DONE[ALL_AVAIL_QUEST[section][package][idQuest]]) === 0) {

                packaCount++;
                Qpackages += `  <div class="tr ellipsis ${ questId === ALL_AVAIL_QUEST[section][package][idQuest] ? "selected" : ""}"  data-id-quest="${ALL_AVAIL_QUEST[section][package][idQuest]}" data-id-section="${section}" data-id-package="${package}">
                                    <span>${QUESTS_LIST[ALL_AVAIL_QUEST[section][package][idQuest]].title}</span>
                                    ${this.checkComplete(ALL_AVAIL_QUEST[section][package][idQuest]) ? `<span class="right_mark"><lable class="img" src="images/btns/done.png" class="img-sml"></lable></span>` : `<span class="right_mark"></span>`}
                                </div>`;
            }


        }
        if (packaCount < 5) {

            for (var iii = 0; iii < 5 - packaCount; iii++) {
                Qpackages += `<div class="tr"></div>
                              `;
            }

        }
        return Qpackages;
    },
    getQuestNumberInBackage(package) {

        var num = 0;

        for (var idQuest in  package) {

            if (Quest.isShowYes(package[idQuest]) && Number(PLAYER_QUEST_DONE[package[idQuest]]) === 0) {
                num++;
            }

        }
        return num;
    },
    isShowYes: function (idQuest) {
        var quest = QUESTS_LIST[idQuest];

        if (!quest) {
            console.error(idQuest + "=== not found");
            return false;
        }
        var show = true;
        for (var iii in quest.showCond) {
            if (quest.showCond[iii].type === "quest") {
                show = (Number(PLAYER_QUEST_DONE[quest.showCond[iii].id_quest]) >= 1);
            }
        }
        return show;
    },
    listOfNeed: function (idQuest) {

        var done = true;
        if (!QUESTS_LIST[idQuest])
            return {
                list: "",
                done: done
            };

        var list_of_need = QUESTS_LIST[idQuest].ListOfNeed;



        var list = ``;

        for (var jjj = 0; jjj < list_of_need.length; jjj++) {

            var unit_list = list_of_need[jjj];

            if (unit_list.type === "promotion") {
                console.log(list_of_need[jjj])
                list += `<li>
                            <span> تصنيف النبيل ${Elkaisar.BaseData.Promotion[list_of_need[jjj].promotion].Title}</span>
                            <span class=" state ${Elkaisar.DPlayer.Player.porm >= list_of_need[jjj].promotion ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                        </li>`;

                done = Elkaisar.DPlayer.Player.porm < list_of_need[jjj].promotion ? false : done;

            } else if (unit_list.type === "item") {

                done = Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? done : false;

                list += `<li class="${Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? 'done_all' : '' }">
                            <span> لديك ${(unit_list.amount)} ${Matrial.getMatrialName(unit_list.item)}</span>
                            <span class=" state ${Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)' }</span>
                            <span>تمتلك (${Matrial.getPlayerAmount(unit_list.item)}) وحدة</span>
                        </li>`;

            } else if (unit_list.type === 'building') {

                list += `  <li class="done_all">
                                <span> ${BuildingConstData[unit_list.buildingType].title} مستوى ${unit_list.lvl}</span>
                                <span class=" state ${Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                            </li>`;
                done = Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? done : false;

            } else if (unit_list.type === 'prestige') {

                /*   prestige of player */
                list += `<li class="done_all">
                        <span>نقاط البرستيج ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'resource') {
                /*   prestige of player */
                list += `<li class="done_all">
                        <span>  ${RESOURCE_AR_NAME[unit_list.resourceType]} ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? done : false;


            } else if (unit_list.type === "population") {

                list += `<li class="done_all">
                        <span>  عدد السكان وصل الى  ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.CurrentCity.City.pop >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.CurrentCity.City.pop >= unit_list.amount ? done : false;

            } else if (unit_list.type === "playerState") {

                list += `<li class="done_all">
                        <span>تفعيل ${Elkaisar.BaseData.PlayerStateData[unit_list.stateFor].title} </span>
                        <span class=" state ${Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? done : false;

            }

        }
        return list;

    },

    completeQuestModel: function (idQuest) {

        var title = "-----------";
        var header = "-----------";
        var listOfNeed = "-----------";
        var desc = "-----------";
        var reword = "-----------";

        if (QUESTS_LIST[idQuest]) {
            title = QUESTS_LIST[idQuest].title;
            header = QUESTS_LIST[idQuest].header;
            desc = QUESTS_LIST[idQuest].desc;
            listOfNeed = this.listOfNeed(idQuest);
            reword = this.rewordToString(idQuest);
        }

        var quest = `<div class="quest">
                        <div class="quest-header banner-red">
                            ${title}
                        </div>
                        <div class="quest-desc">
                            <p>
                                ${header}
                            </p>
                        </div>
                        <hr/>
                        <div class="quset-req">
                            <ol>
                                ${listOfNeed}

                            </ol>
                        </div>
                        <hr/>
                        <div class="quest-expl">
                            <div class="quest-expl-head ">
                                <img src="images/icons/quest.png">
                                <span>
                                    شرح المهمة
                                </span>
                            </div>
                            <p>
                                ${desc}
                            </p>
                        </div>
                        <hr/>
                        <div class="quest-reward">
                            <div class="quest-expl-head ">
                                <img src="images/style/matrial-box.png">
                                <span>
                                     مكافأة المهام
                                </span>
                            </div>
                            <p>
                                ${reword}
                            </p>
                        </div>
                    </div>
                `;
        return quest;
    },

    checkComplete: function (idQuest) {

        var done = true;
        if (!QUESTS_LIST[idQuest])
            return false;

        if (Number(PLAYER_QUEST_DONE[idQuest]) !== 0) {
            return false;
        }

        var list_of_need = QUESTS_LIST[idQuest].ListOfNeed;
        var list = ``;

        for (var jjj = 0; jjj < list_of_need.length; jjj++) {

            var unit_list = list_of_need[jjj];
            if (unit_list.type === "promotion") {
                done = Elkaisar.DPlayer.Player.porm < unit_list.promotion ? false : done;
            } else if (unit_list.type === "item") {

                done = Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'building') {

                done = Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? done : false;

            } else if (unit_list.type === 'prestige') {

                done = Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'resource') {
                /*   prestige of player */

                done = Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? done : false;


            } else if (unit_list.type === "population") {

                done = Elkaisar.CurrentCity.City.pop >= unit_list.amount ? done : false;

            } else if (unit_list.type === "playerState") {

                if (Elkaisar.DPlayer.PlayerState)
                    done = Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? done : false;

            }

        }

        return done;
    },

    checkForPackagePrize: function (package, Quest) {

        for (var iii in  Quest[package]) {
            /*  make sure quest has prize  and quest is not done*/
            if (this.checkComplete(Quest[package][iii])) {
                return true;
            }
        }
        return false;
    },

    getCompletedSections: function (sec) {
        var completeCount = 0;
        for (var backage in sec) {
            for (var quest in sec[backage]) {
                completeCount = Quest.checkComplete(sec[backage][quest]) && Quest.isShowYes(sec[backage][quest]) ? completeCount + 1 : completeCount;
            }
        }
        return completeCount;
    },
    refrehQuestNotif: function () {

        var c_1 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestGrowth);
        var c_2 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestDaily);
        var c_3 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestTrade);

        $("#Quests-ready-notif").html(c_1 + c_2 + c_3);
        $("#Quest-growth-notif").html(c_1 || '');
        $("#Quest-daily-notif").html(c_2 || '');
        $("#Quest-trade-notif").html(c_3 || '');

    },
    givePrize: function (reward) {

        for (var iii in reward) {

            if (reward[iii].type === "item") {

                Matrial.givePlayer(reward[iii].item, reward[iii].amount)

            } else if (reward[iii].type === "prestige") {

                Elkaisar.DPlayer.Player.prestige = Number(Elkaisar.DPlayer.Player.prestige)
                        +
                        Number(reward[iii].amount);
                Player_profile.refresh_view();
                Player_profile.refresh_player_data();

            } else if (reward[iii].type === "resource") {

                Elkaisar.CurrentCity.City[reward[iii].resourceType] =
                        Number(Elkaisar.CurrentCity.City[reward[iii].resourceType])
                        +
                        Number(reward[iii].amount);
                city_profile.refresh_resource_view();


            } else if (reward[iii].type === "population") {

                Elkaisar.CurrentCity.City.pop = Number(Elkaisar.CurrentCity.City.pop) + reward[iii].amount;
                city_profile.refresh_resource_view();

            } else if (reward[iii].type === "equip") {

                Elkaisar.Equip.getPlayerEquip();

            } else if (reward[iii].type === "jop") {

                Jop.addLabor(reward[iii].jop_for, reward[iii].amount);
                city_profile.refresh_resource_view();

            } else if (reward[iii].type === "promotion") {

                Player_profile.refresh_player_data();


            }


        }

    },
    takeNeeds: function (listOfNeed) {

        for (var jjj = 0; jjj < listOfNeed.length; jjj++) {

            var unit_list = listOfNeed[jjj];
            if (unit_list.type === "item") {

                Matrial.takeFrom(unit_list.item, unit_list.amount);

            } else if (unit_list.type === 'resource') {
                Elkaisar.CurrentCity.City[unit_list.resourceType] -= Number(unit_list.amount);

            }



        }
    },
    isPackageAvailable: function (Package) {
        var counter = 0;
        for (var one in Package) {
            if (Package[one].DB_name && Number(PLAYER_QUEST[Package[one].DB_name]) === 0) {
                return  true;
            }
        }

        return false;
    },

    rewordToString: function (idQuest) {

        if (!QUESTS_LIST[idQuest])
            return "";
        var questPrize = QUESTS_LIST[idQuest].Reword;


        return this.prizeArrayToString(questPrize);
    },

    prizeArrayToString: function (questPrize) {


        var prizeString = "";
        for (var iii in questPrize) {

            if (questPrize[iii].type === "item") {

                prizeString += ` ${questPrize[iii].amount} * ${Matrial.getMatrialName(questPrize[iii].item)}, `;

            } else if (questPrize[iii].type === "prestige") {

                prizeString += ` ${questPrize[iii].amount} * بريستيج, `;

            } else if (questPrize[iii].type === "resource") {

                prizeString += ` ${questPrize[iii].amount} * ${RESOURCE_AR_NAME[questPrize[iii].resourceType]}, `;

            } else if (questPrize[iii].type === "population") {

                prizeString += ` ${questPrize[iii].amount} * سكان, `;

            } else if (questPrize[iii].type === "equip") {

                prizeString += ` ${questPrize[iii].amount} * ${Equipment.getName(questPrize[iii].equip, questPrize[iii].part)}, `;

            } else if (questPrize[iii].type === "jop") {

                prizeString += ` ${questPrize[iii].amount} * ${CITY_JOP_REQ[questPrize[iii].jop_for.toUpperCase()].ar_title}, `;

            } else if (questPrize[iii].type === "promotion") {

                prizeString += ` ${Elkaisar.BaseData.Promotion[Math.min(Number(Elkaisar.DPlayer.Player.porm) + 1, 29)].Title} `;

            } else {
                console.log(questPrize)
                prizeString += "ERROR_NOT_FOUND";
            }
        }

        return prizeString.replace(/, +$/g, '');
    },

};



Quest.getPlayerQuestState = function ()
{
    
    return $.ajax({
        url: `${API_URL}/api/APlayerQuest/getPlayerQuest`,
        data:{
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            for(var iii in JsonObject)
            {
                PLAYER_QUEST_DONE[JsonObject[iii].id_quest] = JsonObject[iii].done
            }
        }
    });  
    
};








$(document).on("PlayerReady", "html", function () {
    $.getJSON(`${API_URL}/js${Elkaisar.Config.JsVersion}/json/questBase.json`, function (questList) {
        console.log(questList)
        QUESTS_LIST = questList;
        QuestGrowth.promotion = [
            "prom_1", "prom_2", "prom_3", "prom_4",
            "prom_5", "prom_6", "prom_7", "prom_8",
            "prom_9", "prom_10", "prom_11", "prom_12",
            "prom_13", "prom_14", "prom_15", "prom_16",
            "prom_17", "prom_18", "prom_19", "prom_20",
            "prom_21", "prom_22", "prom_23", "prom_24",
            "prom_25", "prom_26", "prom_27", "prom_28",
            "prom_29"
        ];

        QuestGrowth.infrastructure = [
            "cottage_1", "cottage_2", "cottage_3", "cottage_4", "cottage_5",
            "store_1", "store_2", "store_3", "store_4", "store_5",
            "palace_2", "palace_3", "palace_4", "palace_5"
        ];

        QuestGrowth.cityPlanning = [
            "pop_1", "pop_2", "pop_3", "pop_4"
        ];

        QuestGrowth.cityManagement = [
            "jop_1", "jop_2"
        ];

        QuestGrowth.resourceProduction = [
            "farm_2", "wood_2"
        ];

        QuestGrowth.civilTechnology = [
            "uni_1", "uni_2", "uni_3", "uni_4", "uni_5"
        ];

        QuestGrowth.militaryStudy = [
            "acad_1", "acad_2", "acad_3", "acad_4", "acad_5"
        ];

        QuestGrowth.cityDefence = [
            "wall_1", "wall_2", "wall_3", "wall_4", "wall_5"
        ];

        QuestGrowth.cityHero = [
            "theat_1", "theat_2", "theat_3", "theat_4", "theat_5"
        ];

        QuestGrowth.religion = [
            "worship_1", "worship_2", "worship_3", "worship_4", "worship_5"
        ];

        QuestGrowth.warPreparation = [
            "barracks_1", "barracks_2", "barracks_3", "barracks_4", "barracks_5",
            "stabl_1", "stabl_2", "stabl_3", "stabl_4", "stabl_5",
            "workshop_1", "workshop_2", "workshop_3", "workshop_4", "workshop_5"
        ];


        QuestDaily.dailyQuest = [
            "lucky", "t_map", "repel_trumpet", "copper_medal"
        ];

        QuestTrade.expMap = ["exp_map"];

        QuestTrade.armyPacks = [
            "army_s_1",
            "army_s_3",
            "army_m_1",
            "army_m_3",
            "army_l_1",
            "army_l_3"
        ];

        QuestTrade.mnawratQuest = [
            "m1_x20",
            "m2_x20",
            "m3_x20",
            "mr_x10",
            "mr_x2",
            "mr_x4",
            "mr_x300",
            "mb_x1"
        ];
        QuestTrade.rebelCity = [
            "pres_20k",
            "pres_80k",
            "union_era",
            "free_help",
            "motiv_60",
            "helper_chng"
        ];
        QuestTrade.macedonHero = [
            "pres_5k",
            "pres_50k",
            "pres_100k",
            "pres_400k",
            "pres_500k"
        ];
        QuestTrade.loyEquip = [
            "loy_boot",
            "loy_shield",
            "loy_helmet",
            "loy_armor",
            "loy_sword"
        ];

        QuestTrade.lionEquip = [
            "lion_boot",
            "lion_shield",
            "lion_helmet",
            "lion_armor",
            "lion_sword"
        ];
        QuestTrade.fearlessEquip = [
            "fearless_boot",
            "fearless_shield",
            "fearless_helmet",
            "fearless_armor",
            "fearless_sword"
        ];
        QuestTrade.miliEquip = [
            "mili_boot",
            "mili_shield",
            "mili_helmet",
            "mili_armor",
            "mili_sword"
        ];
        QuestTrade.brightEquip = [
            "bright_boot",
            "bright_shield",
            "bright_helmet",
            "bright_armor",
            "bright_sword"
        ];


        ALL_AVAIL_QUEST = {

            QuestTrade: QuestTrade,
            QuestDaily: QuestDaily,
            QuestGrowth: QuestGrowth

        };
        
        $.getJSON(`${API_URL}/js${Elkaisar.Config.JsVersion}/json/quest/${UserLag.language}.json`, function (QL) {
            for(var iii in QUESTS_LIST)
            {
                
               if(QL[iii]){
                   QUESTS_LIST[iii].title = QL[iii].title;
                   QUESTS_LIST[iii].header = QL[iii].header;
                   QUESTS_LIST[iii].desc = QL[iii].desc;
               }
                   
                
            }
        });
        
        Quest.getPlayerQuestState().done(function (){
            Fixed.refreshPlayerNotif();
        });
        

    });
});



$(document).on("click", "#sub_quest .tr", function () {

    var section = $(this).data("id-section");
    var package = $(this).data("id-package");
    var idQuest = $(this).data("id-quest");

    console.log(section, package, idQuest)

    Quest.changeContent(section, package, idQuest);

});



$(document).on("click", "#quest_pack .tr", function () {


    var sectionId = $("#quest_pack").attr("data-id-section");
    var package = $(this).attr("data-id-package");

    Quest.changeContent(sectionId, package);

});


$(document).on("click", "#accept_quest", function () {

    var idQuest = $(this).attr("data-id-quest");

    if (!Quest.checkComplete(idQuest)) {
        alert_box.confirmMessage("تأكد من تحقق شروط المهمة");
        return;
    }
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({

        url: `${API_URL}/api/APlayerQuest/acceptQuest`,
        data: {
            idCity: idCity,
            idQuest: idQuest,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer

        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
            $("#accept_quest").attr("disabled", "disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            $("#accept_quest").removeAttr("disabled");
            if (isJson(data)) {      /*           هنا  بقى مهمة الترقية لما تتم بنجاح**/

                var jsonData = JSON.parse(data);
                if (jsonData.state === "ok") {

                    
                    alert_box.succesMessage(Quest.prizeArrayToString(QUESTS_LIST[idQuest].Reword));
                    PLAYER_QUEST_DONE[idQuest] = 1;
                    $("#dialg_box .nav_bar .left-nav .selected").click();
                    Quest.givePrize(QUESTS_LIST[idQuest].Reword);

                } else if (jsonData.state === "error_1") {

                    alert_box.failMessage("لا توجد هذة المهمة فى الوقت الحالى ");

                } else if (jsonData.state === "error_2") {

                    alert_box.failMessage("لا يمكنك قبول المهمة مرتين فى يوم واحد");

                } else if (jsonData.state === "error_3") {

                    alert_box.failMessage("لم يتم التحقق من شروط المهمة");

                } else if (jsonData.state === "error_4") {
                    alert_box.failMessage("شروط المهمة غير مكتملة");
                }



            } else {

                alert(data);

            }
            Quest.refrehQuestNotif();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });



});





function isUpgradingNow(place)
{
    for(var obj in Elkaisar.TimedTask.TaskList.Building){
        
        if(Number(Elkaisar.TimedTask.TaskList.Building[obj].id_city ) === Number(Elkaisar.CurrentCity.City.id_city)){
            if(Elkaisar.TimedTask.TaskList.Building[obj].place === place){
                return Elkaisar.TimedTask.TaskList.Building[obj];
            }
        }
        
    }
    return false;
}





$("#UPDOWN-chat img").click(function (){
    
    if($(this).hasClass("smalled")){
        
        $(this).css("transform" , "rotateZ(180deg)" );
        $("#chat-box").css("bottom" , "0px");
        $(this).removeClass("smalled");
        
    }else{
        
        $(this).css("transform" ,"rotateZ(0deg)" );
        $("#chat-box").css("bottom" , "-220px");
        $(this).addClass("smalled");
    }
    Crafty.audio.play("close_sound");
});
$("#p-provile-slider img").click(function (){
    
    if($(this).hasClass("smalled")){
        
        $(this).css("transform" , "rotateZ(-90deg)" );
        $("#player-profile").css("left" , "0px");
        $("#luck-wheel-btn").css("left" , "310px");
        $(this).removeClass("smalled");
        
    }else{
        
        $(this).css("transform" ,"rotateZ(90deg)" );
        $("#player-profile").css("left" , "-380px");
        $("#luck-wheel-btn").css("left" , "-75px");
        $(this).addClass("smalled");
    }
    Crafty.audio.play("close_sound");
});

$("#city-profile-slider img").click(function (){
    
    if($(this).hasClass("smalled")){
        
        $(this).css("transform" , "rotateZ(90deg)" );
        $("#city-profile").css("right" , "4px");
        $(this).removeClass("smalled");
        
    }else{
        
        $(this).css("transform" ,"rotateZ(-90deg)" );
        $("#city-profile").css("right" , "-425px");
        $(this).addClass("smalled");
    }
    Crafty.audio.play("close_sound");
});


/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}

/**
 * document.exitFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.exitFullscreen) {
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

/**
 * document.fullscreenElement polyfill
 * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.fullscreenElement) {

	Object.defineProperty(document, 'fullscreenElement', {
		get: function() {
			return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
		}
	});

	Object.defineProperty(document, 'fullscreenEnabled', {
		get: function() {
			return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
		}
	});
}




document.getElementById('ToggelFullSrc').addEventListener('click', function () {
    if (document.fullscreenElement) {
            document.exitFullscreen().then(function (){
                Crafty.viewport.height = $(document).height();
                Crafty.viewport.width  = $(document).width();
                Crafty.viewport.reload();
            });
            if(isMobile){
                $('body').css("zoom" , "0.5");
                
            }
    } else {
            document.documentElement.requestFullscreen().then(function (){
                Crafty.viewport.height = $(document).height();
                Crafty.viewport.width  = $(document).width();
                Crafty.viewport.reload();
            });
            if(isMobile){
                /*$("body").css("zoom" , "0.5");
                $("#cr-stage *").css("zoom" , "1");*/
                //$('#cr-stage').css("zoom" , "1");
                //alert_box.confirmMessage($('#cr-stage').css("zoom"));
            }
            
    }
    
    
    Crafty.viewport.height = $(document).height();
    Crafty.viewport.width  = $(document).width();
    
    Crafty.viewport.reload();
});

$(document).on("click" , "#ToggelSound" , function (){
    if($(this).attr("data-state") === "on"){
        $(this).attr("data-state" , "off");
        Crafty.audio.mute();
        $(this).css({"background-image": "url(images/btns/withBg/buttonSoundOptions.png)"});
    }else{
        $(this).attr("data-state" , "on");
        Crafty.audio.unmute();
        $(this).css({"background-image": "url(images/btns/withBg/sound_on_off.png)"});
        
    }
    
});


$(document).on("click" , "#player_rank" , function (){
    
  
    $(".menu-list").each(function() {
      if ($(this).data("show") === "ranks") {
        $(this).trigger("click");
      }
    });

    
});


/*
 * show player editable data
 * 
 */
$(document).on("click" , ".avatar-name h1 , .avatar-img img" , function (){
    
    showEditablePlayerProfile();
    
});



function showEditablePlayerProfile()
{
    var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);
    
    if(!id_player){
        return ;
    }
    
    $.ajax({
        
        url: "api/player.php",
        data:{
            
            GET_PLAYER_DETAIL: true,
            id_player: id_player
            
        },
        type: 'GET',
        beforeSend: function (xhr) {
             var player_review = `<div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">ملف الملك</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review" class="player-review">
                                            <div class="upper">
                                                <div class="left pull-L">
                                                    <div class="player-avatar">
                                                        <div id="change-avatar-left" class="left-btn pull-L" style="margin-left: 5px;margin-top: 13px;"></div>
                                                        <img src="${Elkaisar.BaseData.HeroAvatar[1]}" id="A-A-P-image" data-index="${1}"/>
                                                        <div id="change-avatar-right" class="right-btn pull-R" style="margin-right: 5px;margin-top: 13px;"></div>
                                                        
                                                    </div>
                                                    <div id="confirm-player-new-img">
                                                        <img src="images/btns/done.png" class="img-sml"  >
                                                    </div>

                                                </div>
                                                <div class="right pull-R">
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.League[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-guild">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.NobleRank[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-promotion">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.Ranking[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-rank">
                                                       ----
                                                    </div>
                                                </div>
                                                <p style="clear: both"></p>
                                                <h1 class="player-name" id="A-A-P-name">----- 
                                                   
                                                </h1>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Info[UserLag.language]}</div>
                                                <div class="li" style="margin-top: 15px;">
                                                    <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/prestige.png"/>
                                                        </div>
                                                        <div class="title pull-R  " id="A-A-P-prestige">
                                                           ------
                                                        </div>
                                                    </div>
                                                    <div class="li-d pull-R bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/honor.png"/>
                                                        </div>
                                                        <div class="title pull-R " id="A-A-P-honor">
                                                            ----
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="li" style="margin-top: 5px; width: 125px; margin: auto">
                                                     <div id="change-player-password" class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/stat_login.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            تغير كلمة المرور
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="li buttons" style="margin-top: 15px; width: 95%">
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/message.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            مراسلة
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/chat.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            شات
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/friend.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            صديق
                                                        </div>
                                                    </div>

                                                </div>

                                                <span style="clear: both"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

            $("body").append(player_review);
        },
        success: function (data, textStatus, jqXHR) {
            
            var json_data = JSON.parse(data);
            
           $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[json_data.avatar] );
           $("#A-A-P-image").attr("data-index" , json_data.avatar );
           $("#A-A-P-guild").html(json_data.guild || "----");
           $("#A-A-P-promotion").html(Elkaisar.BaseData.Promotion[json_data.porm].Title);
           $("#A-A-P-rank").html(getArabicNumbers(json_data.rank));
           $("#A-A-P-name").html(json_data.name + ' <img src="images/btns/edit.png" class="img-sml" style="vertical-align: middle; margin-left: 15px" id="edit-player-name-btn">');
           $("#A-A-P-prestige").html(getArabicNumbers(json_data.prestige));
           $("#A-A-P-honor").html(getArabicNumbers(json_data.honor));

        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
    
    
    
}

$(document).on("click" , "#edit-player-name-btn" , function (){
    
    $("#A-A-P-name").html(`<input type="text" class="input" id="playe-new-name" style="text-align: center" value="${Elkaisar.DPlayer.Player.name}" data-pastable="true"/>
                            <img src="images/btns/done.png" class="img-sml" style="margin-left: 15px" id="save-player-name-btn">`);
    
    
});


$(document).on("click" , "#save-player-name-btn" , function (){
    
    var matrial = ["change_name"];
    BoxOfMatrialToUse(matrial , "change_player_name");
    
});


/*
 * change player Avatar
 */

$(document).on("click" , "#change-avatar-left" , function (){
    
    var image_index = parseInt($("#A-A-P-image").attr("data-index"));
    
    if(Elkaisar.BaseData.HeroAvatar[image_index -1]){
        
        $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[--image_index] );
        $("#A-A-P-image").attr("data-index" , image_index );
        
    }else{
        
        $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[Elkaisar.BaseData.HeroAvatar.length - 1] );
        $("#A-A-P-image").attr("data-index" , Elkaisar.BaseData.HeroAvatar.length - 1);
        
    }
    
});


$(document).on("click" , "#change-avatar-right" , function (){
    
    var image_index = parseInt($("#A-A-P-image").attr("data-index"));
    
    if(Elkaisar.BaseData.HeroAvatar[image_index + 1 ]){
        
        $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[++image_index] );
        $("#A-A-P-image").attr("data-index" , image_index );
        
    }else{
        
        $("#A-A-P-image").attr("src" , Elkaisar.BaseData.HeroAvatar[0] );
        $("#A-A-P-image").attr("data-index" , 0 );
        
    }
    
});


/*   save new avatar  */

$(document).on("click" , "#confirm-player-new-img" , function (){
    
    var image_index = parseInt($("#A-A-P-image").attr("data-index"));
    
    if(image_index === parseInt(Elkaisar.DPlayer.Player.avatar)){
        
        alert_box.confirmMessage("لتغير الصورة الشخصية عليك اختيار صورة اخرى");
        return ;
        
    }
    else {
        
        
         $.ajax({
                
                url: "api/player.php",
                data:{
                    
                    CHANGE_PLAYER_AVATAR: true,
                    image_index:image_index,
                    id_player:ID_PLAYER,
                    token:TOKEN
                    
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    
                },
                success: function (data, textStatus, jqXHR) {
                    
                    if(data === "done"){
                        
                       $(".avatar-img img").attr("src" , Elkaisar.BaseData.HeroAvatar[image_index]) ;
                       
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
                
            });
        
    }
    
    
    
});



/*
 * 
 * city profile add btns
 * 
 */
$(document).on("click" , "#increase-city-loy" , function (){
    
    var matrial = ["a_play"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
    
});


$(document).on("click" , "#increase-city-pop" , function (){
    
    var matrial = ["prot_pop"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});


$(document).on("click" , "#increase-city-coin" , function (){
    
    var matrial = ["coin_1" , "coin_7"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});


$(document).on("click" , "#increase-city-food" , function (){
    
    var matrial = ["wheat_1" , "wheat_7"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});


$(document).on("click" , "#increase-city-stone" , function (){
    
    var matrial = ["stone_1" , "stone_7"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});


$(document).on("click" , "#increase-city-wood" , function (){
    
    var matrial = ["wood_1" , "wood_7"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});


$(document).on("click" , "#increase-city-metal" , function (){
    
    var matrial = ["metal_1" , "metal_7"];
    BoxOfMatrialToUse(matrial , "increase-city-util");
    
});



/**______________________________WORLD chat ________________________________________*/





$(document).on("click" , "#chat-to" , function (){
   
    
    var chat_to = $(this).attr("data-chat-to");
    
    if(chat_to === "world"){
        
        $(this).attr("data-chat-to" , "guild");
        $(this).html(`<img src="images/icons/chat/guild.png"/>
                        <label>${Translate.Button.Chat.League[UserLag.language]}</label>`);
    }else{
        
        $(this).attr("data-chat-to" , "world");
        $(this).html(`<img src="images/icons/chat/world.png"/><label>${Translate.Button.Chat.World[UserLag.language]}</label>`);
        
    }
    
});



$(document).on("click" , ".msg-from .name" , function (){
    
    //showPlayerProfile($(this).parents(".msg-unit").attr("data-id-player"));
    var id_player  = $(this).parent(".msg-from").parent(".msg-unit").attr('data-id-player');
    var name       = $(this).parent(".msg-from").parent(".msg-unit").attr('data-name');
    var avatar     = $(this).parent(".msg-from").parent(".msg-unit").attr('data-avatar');
    var user_group = $(this).parent(".msg-from").parent(".msg-unit").attr('data-user-group');
    var id_msg     = $(this).parent(".msg-from").parent(".msg-unit").attr('data-id-msg');
    
    var pann_div = ``;
    if(Elkaisar.DPlayer.Player.user_group > 0){
        
        pann_div = `<div id="clear-world-chat-msg"> ازالة الرسالة</div>
                    <div id="chat-forbide">كتم شات</div>`;
        
    }
    
    var list = `<div class="drop-down-li  "  data-id-player="${id_player}" data-name="${name}" data-avatar="${avatar}" data-id-msg="${id_msg}">
                    <button></button>
                    <lable class="user-group-${user_group}">${name}</lable>
                    <div class="private-chat">انشاء دردشة خاصة</div>
                    <div class="show-player-from-chat">الملف الشخصى للملك</div>
                    <div>اضافة صديق</div>
                    ${pann_div}
                </div>`;
 
    $("#drop-down-list-wrapper").html(list);
});


$(document).on("click" , "#chat-icons ul li" , function (){
    
    $("#chat-icons ul li").removeClass("active");
    $(this).addClass("active");
    var data_show = $(this).attr("data-show");
    if(data_show === "anounce"){
        
        $("#msg-area .guild_msg").hide();
        $("#msg-area .world_chat").hide();
        
    }else if(data_show === "world"){
        
        $("#msg-area .guild_msg").show();
        $("#msg-area .world_chat").show();
        $("#msg-area .announce").show();
        
        
    }else if(data_show === "guild"){
        
         $("#msg-area .world_chat").hide();
         $("#msg-area .announce").hide();
         
    }else if(data_show === "private"){
        
        
        
    }
    
});

$(document).on("click" , "#expand-chat .expand" , function (){
    
    var width = $("#chat-area").attr("data-width");
    
    if(width === "x"){
        
        $("#chat-area").css({height: 350});
        $("#chat-area").attr("data-width" , "xx");
        
    }else if(width === "xx"){
        
        $("#chat-area").css({height: 580});
        $("#chat-area").attr("data-width" , "xxx");
    }else{
        
         $("#chat-area").css({height: 160});
         $("#chat-area").attr("data-width" , "x");
        
    }
    
    $("#msg-area").getNiceScroll(0).resize();
    
});


$(document).on("click" , ".show-player-from-chat" , function (){
    
    showPlayerProfile($(this).parents(".drop-down-li").attr("data-id-player"));
    
});


$(document).on("click" , ".private-chat" , function (){
    
    var id_player = $(this).parents(".drop-down-li").attr("data-id-player");
    var avatar    = $(this).parents(".drop-down-li").attr("data-avatar");
    var name    = $(this).parents(".drop-down-li").attr("data-name");
    creatChatRoom(id_player , name , avatar);
    
});


/*
 *    PRIVATE CHATE with player
 */

function creatChatRoom(id_player_with , name , avatar)
{
    var found = false;
    
   $(".chat-room").each(function (){
      
       if(parseInt($(this).attr("data-id-player") ) === parseInt(id_player_with)){
           
           
           found = true;
           
       }
       
   });
   
    
    
    if(found === false){
        
        chatRoomTemplate(id_player_with , name , avatar);
        
        $("#active-chat-rooms ul").append(`<li class="unit-chat-icon pull-R" 
                                            data-id-player = "${id_player_with}" 
                                            data-name= "${name}"
                                            data-avatar= "${avatar}"
                                            style="background-image: url(${Elkaisar.BaseData.HeroAvatar[avatar]})"></li>
                                        `);
        
        
    }
    
}

function chatRoomTemplate(id_player_with , name , avatar , visable){
    
    var style = "";
    if(visable === false){
        
        style = "style='display: none'";
        
    }
    var id = Math.random()*1000000;
    
        var chat_room = `<div class="chat-room" ${style} data-id-player="${id_player_with}">
                            <div class="head_bar">
                                <img src="images/panner/king_name.png" class="banner">
                                <div class="title">${name}</div>
                                <div class="window-icon">
                                    <img  src="images/btns/close_b.png" class="close-chat-room">
                                    <img  src="images/btns/close_b.png" class="minmize-chat-room">
                                </div>
                            </div>
                            <p style="clear: both"></p>
                            <div class="container">
                                <div class="upper">
                                    <div class="body">
                                        <div id="SMB-${id_player_with}" class="scrollable-msg-body">
                                          
                                        </div>
                                    </div>
                                    <div class="recieve-avatar">
                                        <div class="image">
                                            <img src="${Elkaisar.BaseData.HeroAvatar[avatar]}"/>
                                        </div>
                                        <div class="name">
                                            ${name}
                                        </div>
                                        <div class="btns">
                                            <button class="full-btn show-player-profile" data-id-player="${id_player_with}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="msg-input">
                                        <textarea class="private-chat-input" ></textarea>
                                    </div>
                                    <div class="your-avatar">
                                        <div class="image">
                                            <img src="images/hero/faceA1.jpg"/>
                                        </div>
                                    </div>
                                    <div class="btns">
                                        <button class="full-btn pull-R">تصغير</button>
                                        <button class="full-btn pull-R send-private-msg"  data-id-player="${id_player_with}">ارسال</button>
                                        <button class="full-btn pull-L">غلق</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        
        $("body").append( chat_room);
        $("#SMB-"+id_player_with).niceScroll(SCROLL_BAR_PROP);
        $(".chat-room").each(function (){
            
            if(parseInt($(this).attr("data-id-player")) === parseInt(id_player_with)){
                
                $(this).draggable();
                
                return ;
                
            }
            
        });
        
}

/*
 * 
 *  when chat icon is clicked 
 */
$(document).on("click" , "#active-chat-rooms ul li" , function (){
    
    var id_player = parseInt($(this).attr("data-id-player"));
    var found = false;
    
    $(".chat-room").each(function (){
        
        if(parseInt($(this).attr("data-id-player")) === id_player){
            
            found = true;
            if($(this).css("display") === "none")
            {
                $(this).show();
                $(this).animate({top: "130px" , left: "50%" , height: "400px" , width:"600px" } , "slow", function (){});
                
            }else{
                
                $(this).animate({top: "500px" , left: "60%" , height: "0px" , width:"0px" } , "slow", function (){
       
                        $(this).hide();

                });
                
            }
            
        }
        
    });
    
    if(found === false){
        
        chatRoomTemplate(id_player , $(this).attr("data-name") , $(this).attr("data-avatar"))
        
    }else{
        
        $(".chat-room").each(function (){
            
            if(parseInt($(this).attr("data-id-player")) === parseInt(id_player)){
                
                $(this).css({top: "150px" , left: "50%" , "margin-left" : "-300px"})
                return ;
                
            }
            
        });
        
    }
    
    
});



$(document).on("click" , ".close-chat-room" , function (){
    
    var id_player = parseInt($(this).parents(".chat-room").attr("data-id-player"));
    
    $("#active-chat-rooms ul li").each(function (){
       
        if(parseInt($(this).attr("data-id-player")) === id_player){
            
            $(this).remove();
            
        }
        
    });
    $(this).parents(".chat-room").remove();
    
});

    /* minimize chat*/
$(document).on("click" , ".minmize-chat-room" , function (){
    
    $(this).parents(".chat-room").animate({top: "500px" , left: "60%" , height: "0px" , width:"0px" } , "slow", function (){
       
        $(this).hide();
        
    });
    
});


/*
 *   TRIGGER CLICK  WHEN enter is preesed in private chat input 
 */
$(document).on("keydown" , ".private-chat-input" , function (e){
   
    if(e.keyCode === 13){
        e.preventDefault();
        
        $(this).parents(".bottom").children(".btns").children(".send-private-msg").click();
        
        
    }
    
});

/*  SEND message*/
$(document).on("click" , ".send-private-msg" , function (){

    var id_player = parseInt($(this).attr("data-id-player"));
    
    var msg = $(this).parents(".bottom").children(".msg-input").children(".private-chat-input").val();
    
    $(this).parents(".bottom").children(".msg-input").children(".private-chat-input").val("");
    
    
    var msg_container = `<div class="sender-msg">
                                <div class="content"><span>[${Elkaisar.DPlayer.Player.name}]:</span> ${msg}</div>
                            </div>`;
    
    $(this).parents(".container").children(".upper").children(".body").children(".scrollable-msg-body").append(msg_container);
    
     var json_obj = {
            url:"Chat/sendPrivate",
            data:{
               idPlayerTo: id_player, 
               chat_msg :msg
            }

        };
        
        ws.send(JSON.stringify(json_obj));
    
    
});



function showPrivateChatNotif(id_player_with , name , avatar){
    
    var found = false;
    
    $("#active-chat-rooms ul li").each(function (){
      
       if(parseInt($(this).attr("data-id-player") ) === parseInt(id_player_with)){
           
           
           found = true;
           
       }
       
   });
   
    if(found === false){
        
        $("#active-chat-rooms ul").append(`<li class="unit-chat-icon pull-R" 
                                            data-id-player = "${id_player_with}" 
                                            data-nam = "${name}" data-avatar="${avatar}"
                                            style="background-image: url(${Elkaisar.BaseData.HeroAvatar[avatar]})"></li>
                                        `);
        chatRoomTemplate(id_player_with , name  ,  avatar , false);
        
    }
    
    
}


$(document).on("click" , "#clear-world-chat-msg" ,  function (){
   
    var id_msg = $(this).parent(".drop-down-li").attr("data-id-msg");
    var id_player = $(this).parent(".drop-down-li").attr("data-id-player");
    var player_name = $(this).parent(".drop-down-li").attr("data-name");
    
    var msg =$.trim($(`#msg-area .msg-unit[data-id-msg=${id_msg}]`).children(".msg-body").children("p").html());
    
   ws.send(
            JSON.stringify({
                url:"Chat/delete",
                data:{
                    msg:msg,
                    id_msg:id_msg,
                    p_name_delete_for:player_name
                }
             })
            );
    
});



$(document).on("click" , "#chat-forbide" ,  function (){
   
   
   
   
    var id_msg = $(this).parent(".drop-down-li").attr("data-id-msg");
    var id_player = $(this).parent(".drop-down-li").attr("data-id-player");
    var player_name = $(this).parent(".drop-down-li").attr("data-name");
    
    var msg =$.trim($(`#msg-area .msg-unit[data-id-msg=${id_msg}]`).children(".msg-body").children("p").html());
    
    var alert_box_content = `
                            ادخل مدة الحظر 
                            <br/>
                            <br/>
                            <input type="text" placeholder="ادخل مدة الحظر بالثوانى" class="chat-forbid-duration only_num input" min="0"  max="99999999"/>
                        `;
    
    alert_box.confirmDialog(alert_box_content , function (){
        
        var duration_val = Number($('#alert_box .chat-forbid-duration').val()) || 3600;
        
       
        $.ajax({
            
            url: `${API_URL}/api/APlayer/chatPann`,
            type: 'POST',
            data:{
                token : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer,
                duration: duration_val,
                playerToPan: id_player
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                if(JsonObject.state === "ok")
                    alert_box.succesMessage("تم حظر اللاعب بنجاح");
                else if(JsonObject.state === "error_1")
                    alert_box.failMessage("لست مشرفا");
                else if(JsonObject.state === "error_2")
                    alert_box.failMessage("لا يمكنك حظر مشرف اعلى منك فى الرتبة");
                else if(JsonObject.state === "error_3")
                    alert_box.failMessage("لا تمتلك الرتبة المطلوبة");
            }
        });
        
    });
    
   
    
});





$(document).on("click" , "#chat-box .drop-down-li button" , function (){
    $("#chat-box .drop-down-li").fadeOut(250, function (){
        $(this).remove();
    });
});

Fixed = {};

Fixed.refresePlayerStateList = function (){
    if(!Elkaisar.DPlayer.PlayerState)
        return ;
    $("#player_stat_bar ul").html("");
    for( var key in Elkaisar.DPlayer.PlayerState){
        if(key !== "id_player"){

            if(parseInt(Elkaisar.DPlayer.PlayerState[key]) > Date.now()/1000){

                var list_i = `<li>
                                 <img src="${Elkaisar.BaseData.PlayerStateData[key].image}"/>
                                 <div class="duration stroke">${changeTimeFormat( Elkaisar.DPlayer.PlayerState[key] -(Date.now()/1000) )}</div>
                             </li> `;
                $("#player_stat_bar ul").append(list_i);
            }

        }

    }
    
    if(player.chat_panne > Date.now()/1000){
        var list_i = `<li>
                        <img src="${Elkaisar.BaseData.PlayerStateData.silance.image}"/>
                        <div class="duration stroke">${changeTimeFormat( playerElkaisar.DPlayer.Player.chat_panne  -(Date.now()/1000) )}</div>
                    </li> `;
       $("#player_stat_bar ul").append(list_i);
        
        
    }
    
};

Fixed.getArmyAmountColor = function (amount){
    return  amount >= 1e5 ? "army-over-100k" : (amount >= 1e4 ? "army-over-10k" : (amount>= 1e3 ? "army-over-1k"  : "" ) ) 
};





Fixed.refeshColorArmyHeroTrans =  function (){
    army.rightTrade(Elkaisar.NextHero);
    Hero.refreshCurrentHeroArmy().done(function (){
       army.refreshArmy_leftTrade(); 
    });
    
};

Fixed.refreshPlayerNotif =  function (){
    var green_msg = Number(PLAYER_NOTIF.msg_diff)+Number(PLAYER_NOTIF.msg_in);
    $("#green-msg-notif").html(green_msg > 0 ? green_msg : "");
    var red_msg = Number(PLAYER_NOTIF.msg_report) +  Number(PLAYER_NOTIF.spy_report);
    $("#red-msg-notif").html(red_msg > 0 ? red_msg : "");
    var green_report = Number(PLAYER_NOTIF.hero_in_battel) + Number(PLAYER_NOTIF.hero_back) + Number(PLAYER_NOTIF.spy_task);
    $("#hero-not-in-city").html(green_report > 0 ? green_report : "");
    $("#hero-attacking").html(PLAYER_NOTIF.battel_number > 0 ? PLAYER_NOTIF.battel_number : "");
    
    Quest.refrehQuestNotif();
};

$(document).on("PlayerReady", "html", function (){
   
    Player_profile.getPlayerStateData().done(function (data){
        Fixed.refreshPlayerNotif();
    });
    
});
var MATIAL_FOR_LUCK_WHEEL = [];

var LuckWheel = {};

for(var iii = 0; iii <  20; iii ++)
{
    MATIAL_FOR_LUCK_WHEEL.push({
        Prize: "motiv_60",
        amount: 0
    });
}

LuckWheel.holes = function () {

    return `<ul>
                <li class="cell corner" style="left: 50%; margin-top: 13px; margin-left: -32px;
                    background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[0]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[0]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[0]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 313px; top: 30.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[1]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[1]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[1]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 375px; top: 62.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[2]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[2]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[2]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 425px; top: 112.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[3]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[3]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[3]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 32px; top: 175.8px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[4]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[4]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[4]["amount"]}</h1>
                </li>
                <li class="cell corner" style="right: 13px; top: 237.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[5]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[5]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[5]["amount"]}</h1>
                </li>
                <li class="cell" style="right:32px; top: 312px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[6]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[6]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[6]["amount"]}</h1>
                </li>
                <li class="cell" style="left:425px; top: 375.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[7]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[7]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[7]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 375.5px; top: 425px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[8]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[8]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[8]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 313.5px; top: 457.2px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[9]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[9]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[9]["amount"]}</h1>
                </li>
                <li class="cell corner" style="left: 50%;bottom: 13.5px; margin-left: -32px ;background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[10]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[10]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[10]["amount"]}</h1>
                </li>

                <li class="cell" style="right: 313.5px; top: 457.2px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[11]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[11]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[11]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 375.5px; top: 425px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[12]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[12]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[12]["amount"]}</h1>
                </li>
                <li class="cell" style="right:425px; top: 375.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[13]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[13]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[13]["amount"]}</h1>
                </li>
                <li class="cell" style="left:32px; top: 312px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[14]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[14]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[14]["amount"]}</h1>
                </li>
                <li class="cell corner" style="left: 13px; top: 237.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[15]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[15]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[15]["amount"]}</h1>
                </li>


                <li class="cell" style="left: 31.5px; top: 175.7px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[16]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[16]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[16]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 425.5px; top: 112.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[17]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[17]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[17]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 375px; top: 62.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[18]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[18]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[18]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 313.5px; top: 30.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[19]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[19]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[19]["amount"]}</h1>
                </li>



            </ul>`;

};


LuckWheel.show = function () {



    var content = `  <div id="luck-wheel-over-lay">
                        <div id="luck-wheel" data-gate-open="false">
                            <div class="holes">
                                ${this.holes()}
                            </div>
                            <div class="control">
                                <button id="hide-luck-wheel"></button>
                                <div class="title font-2">
                                       خطبة تحفيزية 
                                </div>
                                <h1 id="playeLuckTitle"> دولاب الحظ:${Matrial.getPlayerAmount("luck_play")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; كمية الذهب: ${Elkaisar.DPlayer.Player.gold}</h1>

                                <div class="image-frame">
                                    <img src="images/items/item001.jpg"/>
                                </div>
                                <div class="input-number">
                                    <input class="only_num input"  type="text" max="${Matrial.getPlayerAmount("luck_play") + Math.floor(Elkaisar.DPlayer.Player.gold / 5)}" step="1" min="0" value="1"/>
                                </div>
                                <div id="start-wheel">
                                    <button class="font-2">
                                        بدء 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;

    $("body").append(content);
    $("#luck-wheel").animate({top: "80px"}, 150, "linear", function () {
        $(this).animate({top: "100px"}, 100, "linear");
    });
};


/*
 * 
 * hide luck wheel
 * 
 */
LuckWheel.hide = function () {

    $("#luck-wheel").animate({top: "70px"}, 200, "linear", function () {
        $(this).animate({top: "60%"}, 180, "linear", function () {
            $("#luck-wheel-btn").animate({bottom: "213px"}, 180, "linear");
            $(this).animate({top: "100%"}, 100, "linear", function () {
                $("#luck-wheel-over-lay").remove();
            });
        });
    });

};


/*
 * 
 *LucLuckWheel open gates 
 * 
 */
LuckWheel.openGates = function (call_back) {

    $('#luck-wheel').attr("data-gate-open", "true");

    $('#luck-wheel .cell .left-gate').animate({
        'background-position-x': '-32px'
    }, 500, 'linear');

    $.when.apply($, [$('#luck-wheel .cell .right-gate').animate({
            'background-position-x': '32px'
        }, 500, 'linear')]).then(function () {
        // all complete
        $('#luck-wheel ul li h1').show();
        call_back();
    });

};

/*
 * 
 *LucLuckWheel open gates 
 * 
 */
LuckWheel.closeGates = function () {

    $('#luck-wheel').attr("data-gate-open", "false");
    $('#luck-wheel .cell .left-gate').animate({
        'background-position-x': '0px'
    }, 500, 'linear');
    $('#luck-wheel .cell .right-gate').animate({
        'background-position-x': '0px'
    }, 500, 'linear', function () {
        $('#luck-wheel ul li h1').hide();
    });


};

$(document).on("click", "#hide-luck-wheel", function () {

    LuckWheel.hide();

});


$("#luck-wheel-btn").click(function () {
    $(this).animate({bottom: '180px'}, 250, 'linear', function () {
        LuckWheel.show();
    });

});


LuckWheel.playLuck = function () {

    return $.ajax({
        url:`${API_URL}/api/APlayer/playLuckWheel`,
        type: 'POST',
        data: {
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

};

LuckWheel.spinWheel = function () {

    LuckWheel.playLuck().done(function (data) {
        
        if(isJson(data)){
            var jsonData =  JSON.parse(data);
        }else{
            alert(data);
            return ;
        }
        
        
        MATIAL_FOR_LUCK_WHEEL = jsonData.Prize;
        $("#luck-wheel .holes").html(LuckWheel.holes());
        LuckWheel.openGates(function () {
            
            var all_pulses = $("#luck-wheel ul li .pulse");
            var cell = jsonData.winIndex;
            var element_to = $("#luck-wheel .control .image-frame img");
            var title_to = $("#luck-wheel .control .title");
            
            Matrial.takeFrom("luck_play", 1);
            Matrial.givePlayer(MATIAL_FOR_LUCK_WHEEL[jsonData.winIndex].Prize, MATIAL_FOR_LUCK_WHEEL[jsonData.winIndex].amount);
            $("#playeLuckTitle").replaceWith(`<h1 id="playeLuckTitle"> دولاب الحظ:${Matrial.getPlayerAmount("luck_play")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; كمية الذهب: ${Elkaisar.DPlayer.Player.gold}</h1>`)

            for (var iii = 0; iii <= 20 + cell; iii++) {

                LuckWheel.sequanceTimer(iii, all_pulses[iii % 20], 20 + cell, element_to, title_to);

            }

        });


    });


};

$(document).on("click", "#start-wheel", function () {


    if (Number(Matrial.getPlayerAmount("luck_play")) < 1) {

        alert_box.confirmDialog("لا يوجد لديك  عدد كافى من دولاب الحظ يمكنك شراء دولاب الحظ من مول المواد", function () {

            $('#hide-luck-wheel').click();
            setTimeout(function () {
                $(".menu-list[data-show='matrial']").click();
                $("#dialg_box .left-nav li[head_title='mall-box']").click();
            }, 500);

        });
        return;

    }



    $(this).prop("disabled", true);


    if ($("#luck-wheel").attr("data-gate-open") === "false") {

        LuckWheel.spinWheel();

    } else if ($("#luck-wheel").attr("data-gate-open") === "true") {

        $(".pulse").css({"-webkit-animation": "", animation: "", opacity: 0});
        LuckWheel.closeGates();
        LuckWheel.spinWheel();
       

    }



});

LuckWheel.sequanceTimer = function (index, element, last, element_to, title_to) {

    setTimeout(function () {
        if (index === last) {
            $(element).css({"-webkit-animation": "pulse 1s infinite linear",
                animation: "pulse 1s infinite linear", opacity: 1});

            var message = `لقد تحصلت على ${MATIAL_FOR_LUCK_WHEEL[last - 20].amount} &times; ${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[last - 20].Prize].name} من دولاب الحظ`;
            alert_box.systemChatMessage(message);
            /*  u  disable the button*/
            $("#start-wheel").prop("disabled", false);

        } else {
            $(element).css({opacity: 1}).animate({opacity: 0}, 1500, "linear");
        }


        var bg = $(element).parent("li").css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
        $(element_to).attr("src", bg);
        $(title_to).html(Elkaisar.BaseData.Items[$(element).parent("li").attr("data-matrial-name")].name);

    }, ((300 - Math.floor(200 * Math.exp(-(Math.pow((index - 20) / 20, 2))))) * index));

};

/* global Elkaisar.CurrentCity.City, BUILDING_TYPS, city_building */
var MY_MARKET_OFFERS_LIST = [];
var MY_MARKET_TRADING_LIST = [];
var MARKET_DEAL_LIST ;
var MARKET_TRANSPORTED_RESOURCE={"in":[],"out":[]};
const DATA_RESOURCES = {
    
    food:{
        icon:"images/style/food.png",
        title:"غذاء"
    },
    wood:{
        icon:"images/style/wood.png",
        title:"اخشاب"
    },
    stone:{
        icon:"images/style/stone.png",
        title:"حجارة"
    },
    metal:{
        icon:"images/style/iron.png",
        title:"حديد"
    }
    
};

var Market = {
    
    dialogBoxContent: function (resource){
        
        if(!resource){resource="food";}
        
        var box_content = ` <div class="box_content for_building_box for_market">
                            <div class="left-content ">
                                <div class="auction-list">
                                    <div class="th font-2">
                                        <div class="td_1">العرض</div>
                                        <div class="td_2">الكمية</div>
                                        <div class="td_3">السعر</div>
                                    </div>
                                    <div class="buy" id="buy-list-deals">
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                    </div>
                                    <div id="auction-buy-btn">
                                        <button class="full-btn full-btn-3x">${Translate.Button.MenuList.Buy[UserLag.language]}</button>
                                    </div>
                                    <div class="sell" id="sell-list-deals">
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                    </div>
                                    <div id="auction-sell-btn">
                                        <button class="full-btn full-btn-3x">${Translate.Button.Building.Sell[UserLag.language]}</button>
                                    </div>
                                </div>
                                <div class="resource-list">
                                    <ul>
                                        <li ${resource === "food" ? 'class="selected"' : ""} data-resoure-name="food">
                                            <img src="images/style/food.png"/>
                                            <h2>غذاء</h2>
                                        </li>
                                        <li ${resource === "wood" ? 'class="selected"' : ""} data-resoure-name="wood">
                                            <img src="images/style/wood.png" />
                                            <h2>اخشاب</h2>
                                        </li>
                                        <li ${resource === "stone" ? 'class="selected"' : ""} data-resoure-name="stone">
                                            <img src="images/style/stone.png"/>
                                            <h2>صخور</h2>
                                        </li>
                                        <li ${resource === "metal" ? 'class="selected"' : ""} data-resoure-name="metal">
                                            <img src="images/style/iron.png"/>
                                            <h2>حديد</h2>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right-content">
                                <div class="inner_nav" id="market-inner-nav">
                                    <div class="nav-title" data-inner-nav="market-my-offers">
                                         عروضى
                                    </div>
                                    <div class="nav-title" data-inner-nav="market-status-offer">
                                       وصول الطلبات
                                    </div>
                                    <div class="nav-title selected" data-inner-nav="marke-make-offers">
                                        انشاء عرض
                                    </div>
                                </div>
                                ${this.innerNav_creatOffer(resource)}
                            </div>
                        </div>`;
                this.dealsList(resource);
        return box_content;
    },
    
    getMarketMaxTransNum:function (){
        
        return Elkaisar.City.getCity().BuildingLvl[cityHasType(BUILDING_TYPS.MARKET)]*100000;
        
    },
    
    innerNav_creatOffer:function (offer_for){
      
        
        var content = ` <div id="under-inner-nav" data-for="creat-offer">
                            <div class="u-have">
                                <div class="resource">
                                    <span class="res">${DATA_RESOURCES[offer_for].title}</span>: <span class="amount">${Math.floor(Elkaisar.CurrentCity.City[offer_for])}</span>
                                </div>
                                <div class="coin">
                                    <span class="res">سسترسس</span>: <span class="amount">${Math.floor(Elkaisar.CurrentCity.City.coin)}</span>
                                </div>
                            </div>
                            <div class="sell-or-buy">
                                <div class="sell">
                                    <input id="trigger_1" type="radio" name="sell_or_buy" checked="" value="sell">
                                    <label for="trigger_1" class="checker"></label>
                                    <span> بيع</span>
                                </div>
                                <div class="buy">
                                    <input id="trigger_2" type="radio" name="sell_or_buy"  value="buy">
                                    <label for="trigger_2" class="checker"></label>
                                    <span> ${Translate.Button.MenuList.Buy[UserLag.language]}</span>
                                </div>
                            </div>

                            <div class="quantity">
                                <label>الكمية:</label>
                                <input type="text"  step="${Math.min(Math.floor(Elkaisar.CurrentCity.City[offer_for]), 2e8)}" class="only_num input" min="0" max="${Math.min(Math.floor(Elkaisar.CurrentCity.City[offer_for]) , 2e8)}"/>
                                <button class="full-btn full-btn-3x" id="maximum-limit-deal">${Translate.Button.Building.Maximize[UserLag.language]}</button>
                            </div>
                            <div class="unite-price">
                                <label>سعر الوحدة:</label>
                                <input type="text" fraction="true"  step="0.01" class="only_num input" min="0" max="1000" value="${MARKET_DEAL_LIST ? MARKET_DEAL_LIST.sell_list[0] ? MARKET_DEAL_LIST.sell_list[0].unit_price : 0 : 0}"/>
                            </div>

                            <div id="trans-fees">
                                <span>رسوم الصفقة:</span> <span class="amount">0</span> سسترسس
                            </div>
                            <div id="trans-total-price">
                                <span>السعر الكلى:</span> <span class="amount">0</span> سسترسس
                            </div>

                            <div id="confirm-deal">
                                سيتم خصم 0.75% من السعر الكلى للصفقة 
                                <button class="full-btn full-btn-3x">${Translate.Button.Building.Confirm[UserLag.language]}</button>
                            </div>
                        </div>`;
        return content;
        
    },
    
    innerNav_myOffers: function (){
        
        var content = `<div id="under-inner-nav">
                            <div class="th">
                                <div class="td_1 ellipsis">${Translate.Title.TH.Resources[UserLag.language]}</div>
                                <div class="td_2 ellipsis">${Translate.Title.TH.Quantity[UserLag.language]}</div>
                                <div class="td_3 ellipsis">${Translate.Title.TH.UnitePrice[UserLag.language]}</div>
                                <div class="td_4 ellipsis">${Translate.Title.TH.Done[UserLag.language]}</div>
                                <div class="td_5 ellipsis">${Translate.Title.TH.Resource[UserLag.language]}</div>
                                <div class="td_6 ellipsis">${Translate.Title.TH.Cancel[UserLag.language]}</div>
                            </div>
                            <div id="my-offers-full-list" >
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                            </div>   
                        </div>`;
        
        $.ajax({
            url: "api/market.php",
            data:{
                GET_MY_OFFER_LIST:true,
                id_city:Elkaisar.CurrentCity.City.id_city,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    MY_MARKET_OFFERS_LIST = json_data;
                }else{
                    
                    alert(data);
                    console.log(data);
                    return ;
                    
                }
                
                var list = "";
                var counter = 0;
                for(var index = 0; index < 10; index++){
                    if(json_data[index]){
                        list += `<div class="tr" data-id-deal="${json_data[index].id_deal}">
                                <div class="td_1">${DATA_RESOURCES[json_data[index].resource].title}</div>
                                <div class="td_2">${json_data[index].amount}</div>
                                <div class="td_3">${parseFloat(json_data[index].unit_price)}</div>
                                <div class="td_4">${json_data[index].done}</div>
                                <div class="td_5">${json_data[index].deal === "sell"? "بيع" : Translate.Button.MenuList.Buy[UserLag.language]}</div>
                                <div class="td_6">
                                    <button class="full-btn  full-btn-3x cansel-market-deal">الغاء</button>
                                </div>
                            </div>`;
                    }else{
                        list += `<div class="tr"></div>`;
                    }
                }
               
                $("#my-offers-full-list").html(list);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        return content;
    },
    innerNav_TradingStatus: function (){
        
        var content = `<div id="under-inner-nav">
                            <div class="th">
                                <div class="td_1 ellipsis">${Translate.Title.TH.Resource[UserLag.language]}</div>
                                <div class="td_2 ellipsis">${Translate.Title.TH.Quantity[UserLag.language]}</div>
                                <div class="td_3 ellipsis">${Translate.Title.TH.UnitePrice[UserLag.language]}</div>
                                <div class="td_4 ellipsis">${Translate.Title.TH.TotalPrice[UserLag.language]}</div>
                                <div class="td_5 ellipsis">${Translate.Title.TH.ArrivalTime[UserLag.language]}</div>
                                <div class="td_6 ellipsis">${Translate.Title.TH.Cancel[UserLag.language]}</div>
                            </div>
                            <div id="my-comming-offers" >
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                                <div class="tr"></div>
                            </div>   
                        </div>`;
        
        $.ajax({
            url: "api/market.php",
            data:{
                GET_MY_OFFERS_STATUS:true,
                id_city:Elkaisar.CurrentCity.City.id_city,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    MY_MARKET_TRADING_LIST = json_data;
                    
                }else{
                    
                    alert(data);
                    console.log(data);
                    return ;
                    
                }
                
                var list = "";
                var counter = 0;
                for(var index = 0; index < 10; index++){
                    if(json_data[index]){
                        list += `<div class="tr" data-id-deal="${json_data[index].id_deal}">
                                <div class="td_1">${DATA_RESOURCES[json_data[index].resource].title}</div>
                                <div class="td_2">${json_data[index].amount}</div>
                                <div class="td_3">${parseFloat(json_data[index].unit_price)}</div>
                                <div class="td_4">${Math.floor(json_data[index].unit_price * json_data[index].amount) }</div>
                                <div class="td_5 time_counter rtl" time-end="${json_data[index].time_arrive}">${changeTimeFormat(json_data[index].time_arrive - $.now()/1000)}</div>
                                <div class="td_6">
                                    <button class="acce-arrving-dael acce-small-btn"></button>
                                </div>
                            </div>`;
                        //                                                <h1 class="time_counter building_counter rtl" time-end="${json_data.time_end}">

                    }else{
                        list += `<div class="tr"></div>`;
                    }
                }
               
                $("#my-comming-offers").html(list);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        return content;
    },
    
    dealsList: function (dealFor){
        
        $.ajax({
            
            url: "api/market.php" ,
            data: {
                GET_MARKET_LIST:true,
                resource:dealFor,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                    MARKET_DEAL_LIST = json_data;
                }else{
                    alert(data);
                    return ;
                }
                
                var buy_list = "";
                var sell_list = "";
                
                for(var iii =0 ; iii < 5 ; iii++){
                    if(json_data.buy_list[iii]){
                        
                         buy_list +=`<div class="tr">
                                    <div class="td_1">${Translate.Button.MenuList.Buy[UserLag.language]}</div>
                                    <div class="td_2">${json_data.buy_list[iii].amount - json_data.buy_list[iii].done}</div>
                                    <div class="td_3">${parseFloat(json_data.buy_list[iii].unit_price)}</div>
                                </div>`;
                    
                        
                    }else{
                         buy_list +=`<div class="tr"></div>`;
                    }
                   
                    if(json_data.sell_list[iii]){
                        
                        sell_list +=`<div class="tr">
                                    <div class="td_1">بيع</div>
                                    <div class="td_2">${json_data.sell_list[iii].amount - json_data.sell_list[iii].done}</div>
                                    <div class="td_3">${parseFloat(json_data.sell_list[iii].unit_price)}</div>
                                </div>`;
                        
                    }else{
                         sell_list +=`<div class="tr"></div>`;
                    }
                    
                    
                }
                
                $("#buy-list-deals").html(buy_list);
                $("#sell-list-deals").html(sell_list);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    },
    
    transportResources: function (){
        
        var content = `<div class="box_content for_building_box for_market">
                            <div class="left-content ">
                                <div class="rightOfLeft" id="resource-input-list">
                                    <ul>
                                        <li>
                                            <div class="resource">
                                                <img src="images/style/food.png"/>
                                                <span>${Math.floor(Elkaisar.CurrentCity.City.food)}</span>
                                            </div>
                                            <div class="input-warpper">
                                                <input data-resource="food" 
                                                    type="text" class="only_num input" min="0"
                                                    step="${Math.min(Math.floor(Elkaisar.CurrentCity.City.food) , Market.getMarketMaxTransNum())}"   
                                                    max="${Math.min(Math.floor(Elkaisar.CurrentCity.City.food) , Market.getMarketMaxTransNum())}" value="0"/>
                                                <div class="number-arrow-wrapper pull-L">
                                                    <label class="number-arrow up"></label>
                                                    <label class="number-arrow down"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="resource">
                                                <img src="images/style/wood.png"/>
                                                <span>${Math.floor(Elkaisar.CurrentCity.City.wood)}</span>
                                            </div>
                                            <div class="input-warpper">
                                                <input data-resource="wood" 
                                                    type="text" class="only_num input" min="0"
                                                    step="${Math.min(Math.floor(Elkaisar.CurrentCity.City.wood), Market.getMarketMaxTransNum())}"   
                                                    max="${Math.min(Math.floor(Elkaisar.CurrentCity.City.wood) , Market.getMarketMaxTransNum())}" value="0"/>
                                                <div class="number-arrow-wrapper pull-L">
                                                    <label class="number-arrow up"></label>
                                                    <label class="number-arrow down"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="resource">
                                                <img src="images/style/stone.png"/>
                                                <span>${Math.floor(Elkaisar.CurrentCity.City.stone)}</span>
                                            </div>
                                            <div class="input-warpper">
                                               <input data-resource="stone" 
                                                    type="text" class="only_num input" min="0"
                                                    step="${Math.min(Math.floor(Elkaisar.CurrentCity.City.stone) , Market.getMarketMaxTransNum())}"   
                                                    max="${Math.min(Math.floor(Elkaisar.CurrentCity.City.stone) , Market.getMarketMaxTransNum())}" value="0"/>
                                                <div class="number-arrow-wrapper pull-L">
                                                    <label class="number-arrow up"></label>
                                                    <label class="number-arrow down"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="resource">
                                                <img src="images/style/iron.png"/>
                                                <span>${Math.floor(Elkaisar.CurrentCity.City.metal)}</span>
                                            </div>
                                            <div class="input-warpper">
                                                <input data-resource="metal" 
                                                    type="text" class="only_num input" min="0"
                                                    step="${Math.min(Math.floor(Elkaisar.CurrentCity.City.metal) , Market.getMarketMaxTransNum())}"   
                                                    max="${Math.min(Math.floor(Elkaisar.CurrentCity.City.metal) , Market.getMarketMaxTransNum())}" value="0"/>
                                                <div class="number-arrow-wrapper pull-L">
                                                    <label class="number-arrow up"></label>
                                                    <label class="number-arrow down"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="resource">
                                                <img src="images/style/coin.png"/>
                                                <span>${Math.floor(Elkaisar.CurrentCity.City.coin)}</span>
                                            </div>
                                            <div class="input-warpper">
                                                <input data-resource="coin" 
                                                    type="text" class="only_num input" min="0"
                                                    step="${Math.min(Math.floor(Elkaisar.CurrentCity.City.coin) , Market.getMarketMaxTransNum())}"   
                                                    max="${Math.min(Math.floor(Elkaisar.CurrentCity.City.coin) , Market.getMarketMaxTransNum())}" value="0"/>
                                                <div class="number-arrow-wrapper pull-L">
                                                    <label class="number-arrow up"></label>
                                                    <label class="number-arrow down"></label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="leftOfLeft">
                                    <div id="transport-distin">
                                        <label> جهة الوصول: </label>
                                        <span> x = </span>
                                        <input data-coord="x" class="only_num input" type="text" max='499' min="0">
                                        <span> y = </span>
                                        <input data-coord="y"  class="only_num input" type="text" max='499' min="0"/>
                                    </div>
                                    <div class="my-city-distin">
                                        <label>المدينة</label>
                                        <div class="select-input" id="select-city-trans-dis">
                                            <div class="value ellipsis"></div>
                                        </div>
                                        <div id="select_city_trans" class="select_option" >
                                            <ol></ol>
                                        </div>
                                    </div>
                                    <p>
                                        يتم الان نقل 0 من 20 عملية نقل بواسطة النقالين
                                        (يستطيع كل ناقل  حمل مقدار 20000 من الموارد)

                                    </p>
                                    <div class="transit-time">
                                        الوقت المقدر للوصول: <span>0</span>
                                    </div>


                                    <div id="statrt-transport-res">
                                        <button class="full-btn  full-btn-3x">${Translate.Button.Building.TransportResources[UserLag.language]}</button>
                                    </div>

                                </div>

                            </div>
                            <div class="right-content">
                                <div class="inner_nav" id="transport-res-inner-nav">
                                    <div class="nav-title selected" data-in-out="out">
                                         الموارد المرسلة
                                    </div>
                                    <div class="nav-title" data-in-out="in">
                                        الموارد القادمة
                                    </div>
                                </div>
                                <div id="under-inner-nav">
                                </div>
                            </div>
                        </div>`;
                this.transportedResourcesList("out");
        return content;
    },
    /*
     *   state  the state of transport
     *   in or out
     */
    transportedResourcesList: function (in_or_out){
        
        $.ajax({
            
            url: "api/market.php",
            data: {
                GET_TRANSPORTED_RESOURCES: true,
                id_city: Number(Elkaisar.CurrentCity.City.id_city),
                in_or_out:in_or_out,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            beforeSend: function (xhr) {
                
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    
                }else{
                    alert(data);
                    console.log(data);
                }
                var list = ' <ul>';
                
                for (var index in json_data[in_or_out]){
                    
                    list += `<li class="unit-trans-table" data-id-trans="${json_data[in_or_out][index].id_trans}">
                                <div class="row">
                                    <div class="td">
                                        <img src="images/style/food.png"/>
                                        <span>${json_data[in_or_out][index].food}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/wood.png"/>
                                        <span>${json_data[in_or_out][index].wood}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/stone.png"/>
                                        <span>${json_data[in_or_out][index].stone}</span>
                                    </div>
                                </div>
                                <div class="row">
                                     <div class="td">
                                         <img src="images/style/iron.png"/>
                                        <span>${json_data[in_or_out][index].metal}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/coin.png"/>
                                        <span>${json_data[in_or_out][index].coin}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/wait.png"/>
                                        <span class="rtl time_counter inner_market_nav" time-end="${json_data[in_or_out][index].time_arrive}">${changeTimeFormat(json_data[in_or_out][index].time_arrive - Date.now()/1000)}</span>
                                    </div>
                                </div>
                                <div class="footer">
                                    <label class="name-city">${Elkaisar.CurrentCity.City.name} &nbsp;&nbsp;[ ${Elkaisar.CurrentCity.City.x} ,  ${Elkaisar.CurrentCity.City.y}] </label>
                                    <label class="arrow"><img src="images/arrow/go-right.png"/></label>
                                    <label class="name-city">[ ${json_data[in_or_out][index].x} ,  ${json_data[in_or_out][index].y}] </label>
                                    <button data-id-trans=${json_data[in_or_out][index].id_trans} 
                                        class="speed-up speed-up-btn acce-transport-deal"
                                        ${Number(json_data[in_or_out][index].acce) !== 0 ? 'disabled="disabled"' : ""}><span>تسريع</span></button>
                                </div>
                            </li>`;
                    
                }
                if(in_or_out === "out"){
                    for (var index in json_data.back){
                    
                        list += `<li class="unit-trans-table" style="opacity:0.5" data-id-trans-back="${json_data.back[index].id_trans}">
                                    <div class="row">
                                        <div class="td">
                                            <img src="images/style/food.png"/>
                                            <span>0</span>
                                        </div>
                                        <div class="td">
                                            <img src="images/style/wood.png"/>
                                            <span>0</span>
                                        </div>
                                        <div class="td">
                                            <img src="images/style/stone.png"/>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                         <div class="td">
                                             <img src="images/style/iron.png"/>
                                            <span>0</span>
                                        </div>
                                        <div class="td">
                                            <img src="images/style/coin.png"/>
                                            <span>0</span>
                                        </div>
                                        <div class="td">
                                            <img src="images/style/wait.png"/>
                                            <span class="rtl time_counter inner_market_nav" time-end="${json_data.back[index].time_arrive}">${changeTimeFormat(Date.now()/1000 - json_data.back[index].time_arrive)}</span>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <label class="name-city">${Elkaisar.CurrentCity.City.name} &nbsp;&nbsp;[ ${Elkaisar.CurrentCity.City.x} ,  ${Elkaisar.CurrentCity.City.y}] </label>
                                        <label class="arrow"><img src="images/arrow/go-left.png"/></label>
                                        <label class="name-city">[ ${json_data.back[index].x} ,  ${json_data.back[index].y}] </label>
                                        <button class="speed-up speed-up-btn" disabled="disabled"><span>تسريع</span></button>
                                    </div>
                                </li>`;

                    }
                }
                
                list += "</ul>";
                
                $("#under-inner-nav").html(list);
                $("#under-inner-nav").niceScroll(SCROLL_BAR_PROP);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    }
    
    
    
    
};



/*  When player select a  resource*/
$(document).on("click" , ".resource-list ul li" , function (){
    
    $(".resource-list ul .selected").removeClass("selected");
    $(this).addClass("selected");
    
    var resource_name = $(this).attr("data-resoure-name");
    var resource_title = $(this).children('h2').html();
    Market.dealsList(resource_name);
    if($("#under-inner-nav").attr("data-for") === 'creat-offer'){
        $("#under-inner-nav").replaceWith(Market.innerNav_creatOffer(resource_name));
    }
    
    
});

$(document).on("change" , '.sell-or-buy input[name="sell_or_buy"]' , function (){
    
    var  resource     = $(".resource-list ul .selected").attr("data-resoure-name");
    var  sell_or_buy  = $('.sell-or-buy input[name="sell_or_buy"]:checked').val();
    var  unit_price   = $("#under-inner-nav .unite-price input").val();
    
    if(sell_or_buy === 'sell'){
        
        unit_price <= 0 ? MARKET_DEAL_LIST.sell_list[0].unit_price : unit_price;
        
        $("#under-inner-nav .quantity input").attr("max" , Math.min(Math.ceil(Math.min(Math.floor(Elkaisar.CurrentCity.City[resource]) , Elkaisar.CurrentCity.City.coin*100/(unit_price*0.75))) , 2e8));
        $("#under-inner-nav .quantity input").attr("step" , Math.min(Math.ceil(Math.min(Math.floor(Elkaisar.CurrentCity.City[resource]) , Elkaisar.CurrentCity.City.coin*100/(unit_price*0.75))) , 2e8));
        
        
    }else if(sell_or_buy === 'buy'){
        
        unit_price <= 0 ? MARKET_DEAL_LIST.buy_list[0].unit_price : unit_price;
        $("#under-inner-nav .quantity input").attr("max" , Math.min(Math.ceil(Elkaisar.CurrentCity.City.coin/unit_price) , 2e8));
        $("#under-inner-nav .quantity input").attr("step" , Math.min(Math.ceil(Elkaisar.CurrentCity.City.coin/unit_price) , 2e8));
        
    }
    
    $("#under-inner-nav .unite-price input").val(unit_price);
    
});


/* make adeal*/
$(document).on('click' , "#confirm-deal button"  , function (){
    
    var  sell_or_buy = $('.sell-or-buy input[name="sell_or_buy"]:checked').val();
    var  quantity    = $("#under-inner-nav .quantity input").val();
    var  unit_price  = $("#under-inner-nav .unite-price input").val();
    var  resource    = $(".resource-list ul .selected").attr("data-resoure-name");
    var  fees = unit_price*quantity*0.75/100;
    var self = $(this);
    
    if(Number(Elkaisar.City.getCity().BuildingLvl.market) <= MY_MARKET_OFFERS_LIST.length){
        alert_box.confirmMessage("مستوى السوق لا يسمح باضافة عروض اخرى يمكنك  الغاء احد عروضك لانشاء  هذا العرض");
        return ;
    }
    
    
    if(Number(quantity)  <= 0 || isNaN(quantity) ){
        
        alert_box.confirmMessage("عليك ادخال الكمية المراد ");
        return ;
    }else if(Number(unit_price)  <= 0 || isNaN(unit_price)){
        
        alert_box.confirmMessage("عليك ادخال السعر المطلوب  ");
        return ;
        
    }else if(!resource ){
        
        alert_box.confirmMessage("اختر نوع المورد المطلوب");
        return ;
        
    }
    
    
    
    
    if(sell_or_buy === "sell"){
        
        
        if(Number(quantity)   > Elkaisar.CurrentCity.City[resource]){
            
            alert_box.confirmMessage("لا يمكنك بيع  كمية مواد لا تملكها ");
            return;
            
        }else if(Number(Elkaisar.CurrentCity.City.coin) < fees){
        
            alert_box.confirmMessage("لا يوجد لديك سسترسس كافى لدفع الرسوم");
            return ;

        }
        
        $.ajax({
            
            url: "api/market.php",
            data:{
                
                PROPOSE_SELL_OFFER:true,
                id_city:Number(Elkaisar.CurrentCity.City.id_city),
                unit_price:Number(unit_price),
                resource:resource,
                quantity:quantity,
                id_player:ID_PLAYER,
                    token:TOKEN
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
                Elkaisar.CurrentCity.City[resource] -= quantity;
                Elkaisar.CurrentCity.City.coin = fees;
                
                
                
                self.attr("disabled" , "disabled");
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                self.removeAttr("disabled");
                
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                }else{
                    alert(data);
                }
                if(json_data.state === "ok"){
                    
                    
                    MY_MARKET_OFFERS_LIST = json_data.deal_list;
                    
                    Elkaisar.CurrentCity.City.food  = json_data.city_resource.food;
                    Elkaisar.CurrentCity.City.wood  = json_data.city_resource.wood;
                    Elkaisar.CurrentCity.City.stone = json_data.city_resource.stone;
                    Elkaisar.CurrentCity.City.metal = json_data.city_resource.metal;
                    Elkaisar.CurrentCity.City.coin  = json_data.city_resource.coin;
                    
                    PLAYER_NOTIF.msg_diff = Number(PLAYER_NOTIF.msg_diff) + Number(json_data.msg_num);
                    
                    city_profile.refresh_resource_view();
                    Fixed.refreshPlayerNotif();
                    /*refresh views */
                    $("#under-inner-nav .u-have .resource .amount").html(Math.floor(Elkaisar.CurrentCity.City[resource] ));
                    $("#under-inner-nav .u-have .coin .amount").html(Math.floor(Elkaisar.CurrentCity.City.coin));
                    $("#under-inner-nav .quantity input").val(0);
                    $('#trans-fees .amount').html(0);
                    $('#trans-total-price .amount').html(0);
                    $("#dialg_box .box_content  .left-content .resource-list ul .selected").click();
                    alert_box.succesMessage("تمت الصفقة بنجاح");
                    
                    
                    if($.isArray(json_data.buyers)  && json_data.buyers.length > 0){
                        ws.send(JSON.stringify({
                            url:"WS_Market/buyerDealDone",
                            data:{
                                traders:json_data.buyers,
                                idPlayer: ID_PLAYER,
                                token:TOKEN
                            }
                        }));
                    }
                    
                    
                }else{
                    
                    alert(data);                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
        
    }else if(sell_or_buy === "buy"){
        
        if(Number(Elkaisar.CurrentCity.City.coin) < Number(fees) + unit_price*quantity){
            alert_box.confirmMessage("عذرا  ليس لديك  سسترسس كافى!");
            return ;
        }
        
        $.ajax({
            
            url: "api/market.php",
            data:{
                
                PROPOSE_BUY_OFFER:true,
                id_city:Number(Elkaisar.CurrentCity.City.id_city),
                unit_price:Number(unit_price),
                resource:resource,
                quantity:quantity,
                id_player:ID_PLAYER,
                    token:TOKEN
                
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
                Elkaisar.CurrentCity.City.coin -= Number(fees) + unit_price*quantity;
                
                self.attr("disabled" , "disabled");
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                self.removeAttr("disabled");
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                if(json_data.state === "ok"){
                    
                    MY_MARKET_OFFERS_LIST = json_data.deal_list;
                    
                    Elkaisar.CurrentCity.City.food  = json_data.city_resource.food;
                    Elkaisar.CurrentCity.City.wood  = json_data.city_resource.wood;
                    Elkaisar.CurrentCity.City.stone = json_data.city_resource.stone;
                    Elkaisar.CurrentCity.City.metal = json_data.city_resource.metal;
                    Elkaisar.CurrentCity.City.coin  = json_data.city_resource.coin;
                    PLAYER_NOTIF.msg_diff = Number(PLAYER_NOTIF.msg_diff) + Number(json_data.msg_num);
                    city_profile.refresh_resource_view();
                    Fixed.refreshPlayerNotif();
                    /*refresh views */
                    $("#under-inner-nav .u-have .resource .amount").html(Math.floor(Elkaisar.CurrentCity.City[resource]));
                    $("#under-inner-nav .u-have .coin .amount").html(Math.floor(Elkaisar.CurrentCity.City.coin));
                    $("#under-inner-nav .quantity input").val(0);
                    $('#trans-fees .amount').html(0);
                    $('#trans-total-price .amount').html(0);
                    $("#dialg_box .box_content  .left-content .resource-list ul .selected").click();
                    alert_box.succesMessage("تمت الصفقة بنجاح");
                    
                    
                    if($.isArray(json_data.seller)  && json_data.seller.length > 0){
                        ws.send(JSON.stringify({
                            url:"WS_Market/sellerDealDone",
                            data:{
                                traders:json_data.seller,
                                idPlayer: ID_PLAYER,
                                token:TOKEN
                            }
                    
                        }));
                    }
                    
                    
                }else{
                    
                    alert_box.confirmMessage("حدث خطاء  اثناء عمل العرض")  ;         
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    }
    
    
}); 

/*   WHEN  INPUT CHANG*/
$(document).on("keyup  change" , "#under-inner-nav .quantity input" , function (){
    
    var unit_price = Number($("#under-inner-nav .unite-price input").val());
    if(!unit_price){
        
        return ;
        
    }
    
    $("#trans-fees .amount").html( Math.ceil($(this).val()*unit_price*0.75/100));
    $("#trans-total-price .amount").html(Math.ceil($(this).val()*unit_price));
    
    
    
});
/*   WHEN  INPUT CHANG*/
$(document).on("keyup  change" , "#under-inner-nav .unite-price  input" , function (){
    
    var quantity =Number($("#under-inner-nav .quantity input").val());
    if(!quantity){
        
        return ;
        
    }
    
    $("#trans-fees .amount").html(Math.round($(this).val()*quantity*0.75/100));
    $("#trans-total-price .amount").html(Math.round($(this).val()*quantity));
    
    
    
});


/*    maximum  limit click */
$(document).on('click' , "#maximum-limit-deal" , function (){
    
    var sell_or_buy = $('.sell-or-buy input[name="sell_or_buy"]:checked').val();
    var resource    = $(".resource-list ul .selected").attr("data-resoure-name");
    var unit_price  = $("#under-inner-nav .unite-price input").val();
    
    
     
    if(!unit_price){
        
        alert_box.confirmMessage("عليك اختيار السعر المطلوب");
        return ;
        
    } 
    
    if(sell_or_buy === 'sell'){
        
        $("#under-inner-nav .quantity input").val(Math.min(Math.ceil(Math.min(Math.floor(Elkaisar.CurrentCity.City[resource]) , Elkaisar.CurrentCity.City.coin*100/(unit_price*0.75))) , 2e8));
        
    }else if(sell_or_buy === 'buy'){
        
        $("#under-inner-nav .quantity input").val(Math.min(Math.ceil(Elkaisar.CurrentCity.City.coin/unit_price) , 2e8));
        
    }
    
    $("#under-inner-nav .unite-price input").trigger("keyup");
});




/*   market inner nav bar   */
$(document).on("click" ,  "#market-inner-nav .nav-title" , function (){
    
    $(this).parent("#market-inner-nav").children(".selected").removeClass("selected");
    $(this).addClass("selected");
    
    var nav_for = $(this).attr("data-inner-nav");
    
    if(nav_for === "market-my-offers"){
        
        $("#under-inner-nav").replaceWith(Market.innerNav_myOffers());
        
    }else if(nav_for === "market-status-offer"){
        
        $("#under-inner-nav").replaceWith(Market.innerNav_TradingStatus());
        
    }else if(nav_for === "marke-make-offers"){
        
        $("#under-inner-nav").replaceWith(Market.innerNav_creatOffer($(".for_market .resource-list ul .selected").attr("data-resoure-name")));
        
    }
    
});



/*    cancsel deal */

$(document).on("click" , ".cansel-market-deal" , function (){
    
    var id_deal = $(this).parents(".tr").attr("data-id-deal");
    var self_  = $(this).parents(".tr");
    
    
    $.ajax({
        
        url: "api/market.php",
        data:{
            CANSEL_MARKT_DEAL:true,
            id_deal:id_deal,
            id_player:ID_PLAYER,
            id_city: Elkaisar.CurrentCity.City.id_city,
                    token:TOKEN
        },
        type: 'POST',
        beforeSend: function (xhr) {
            self_.attr("disabled" , "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            self_.removeAttr("disabled");
            unwaitCursor();
            if(isJson(data)){
                var json_data = JSON.parse(data);
            }else{
                alert(data);
                return ;
            }
            if(json_data.state === "ok"){
                self_.remove();
                $('#my-offers-full-list').append('<div class="tr"></div>');
                
                Elkaisar.CurrentCity.City.food  = json_data.city_resource.food;
                Elkaisar.CurrentCity.City.wood  = json_data.city_resource.wood;
                Elkaisar.CurrentCity.City.stone = json_data.city_resource.stone;
                Elkaisar.CurrentCity.City.metal = json_data.city_resource.metal;
                Elkaisar.CurrentCity.City.coin  = json_data.city_resource.coin;
                
                for(var index in MY_MARKET_OFFERS_LIST){
                    if(Number(MY_MARKET_OFFERS_LIST[index].id_deal) === Number(id_deal)){
                        MY_MARKET_OFFERS_LIST.splice(index , 1);
                    }
                }
                
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم الغاء العرض بنجاح");
                $("#dialg_box .box_content  .left-content .resource-list ul .selected").click();
                
            }else{
               alert_box.confirmMessage("لا يمكنك حذف هذا العرض");
               $("#market-inner-nav .selected").trigger("click");
                
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});


/*  accelete market deal */

/*
 *   in this case the acceleration will be full 
 */
$(document).on("click" , ".acce-arrving-dael" , function (){
    
    var id_deal = Number($(this).parents(".tr").attr("data-id-deal"));
    var self_  = $(this).parents(".tr");
    
    

    var matrial = ["shopping_car"];
    BoxOfMatrialToUse(matrial, "acce-arriving-deal" , 1 , id_deal);

        
    
});



/*    
 * 
 * 
 *    NAV BAR TITLE   city Transport content
 * **/


$(document).on("click" , "#select-city-trans-dis" , function (){
    
    var list = ``;
    for (var index in FAVORIT_LIST){
        
        list +=`<li data-index="${index}" data-x-coord="${FAVORIT_LIST[index].x_coord}" data-y-coord="${FAVORIT_LIST[index].y_coord}">
                    ${FAVORIT_LIST[index].title} [${FAVORIT_LIST[index].x_coord} , ${FAVORIT_LIST[index].y_coord}]
                </li>`;
        
    }
    
    $("#select_city_trans ol").html(list);
    
    $("#select_city_trans").toggle();
    
});


$(document).on('click' , "#select_city_trans ol li" ,  function (){
    
    var index = $(this).attr("data-index");
    var x_coord = $(this).attr("data-x-coord");
    var y_coord = $(this).attr("data-y-coord");
    var title = $(this).html();
    
    $("#select-city-trans-dis .value").html(title);
    $("#select_city_trans").hide();
    $("#transport-distin input[data-coord='x']").val(x_coord);
    $("#transport-distin input[data-coord='y']").val(y_coord);
    
});


$(document).on('change keyup' , "#resource-input-list ul li .only_num" , function (){
    
   var value    = Math.floor($(this).val());
   var resource = $(this).attr("data-resource");
   
   var total_in = 0;
   $("#resource-input-list ul li .input-warpper input").each(function (){
       total_in += Math.floor($(this).val());
   });
   
    
    
    var remain = Math.floor(Math.max(Market.getMarketMaxTransNum() - total_in , 0));
    
    $("#resource-input-list ul li .input-warpper input").each(function (){
        $(this).attr("max" , Math.min(Math.floor(Elkaisar.CurrentCity.City[$(this).attr("data-resource")]) ,  remain));
        $(this).attr("step" , Math.min(Math.floor(Elkaisar.CurrentCity.City[$(this).attr("data-resource")]) ,  remain));
    });

    
    
   $(this).parent(".input-warpper").prev(".resource").children("span").html(Math.max(0, (Math.floor(Elkaisar.CurrentCity.City[resource]) - value)));
    
});



$(document).on('change keyup' , "#transport-distin  .only_num" , function (){
    
   var x_coord   = Number($("#transport-distin .only_num[data-coord=x]").val()) || 0;
   var y_coord   = Number($("#transport-distin .only_num[data-coord=y]").val()) || 0;
   
   
   if(x_coord + y_coord > 0){
       
       $("#dialg_box .for_market .leftOfLeft .transit-time span")
               .html(changeTimeFormat(Math.ceil((Math.sqrt(Math.pow((Elkaisar.CurrentCity.City.x - x_coord),2) + Math.pow((Elkaisar.CurrentCity.City.y - y_coord),2))))*20));
       
   }else{
       $("#dialg_box .for_market .leftOfLeft .transit-time span")
               .html(0);
   }
});


$(document).on("click" , "#transport-res-inner-nav .nav-title" , function() {
    
    $("#transport-res-inner-nav .nav-title").removeClass("selected");
    $(this).addClass("selected");
    
    Market.transportedResourcesList($(this).attr("data-in-out"));
    
    
});


$(document).on("click" , "#statrt-transport-res button" , function (){
    
    var x_coord = $("#transport-distin input[data-coord='x']").val();
    var y_coord = $("#transport-distin input[data-coord='y']").val();
    
    if(!x_coord || !y_coord){
        
        alert_box.failMessage("هذة الاحداثيات غير صحيحة تأكد من الاحداثيات");
        return ;
        
    }
    
    var self = $(this);
    
    var total_resource = 0;
    var resource_to_send = {
        food:0,
        wood:0,
        stone:0,
        metal:0,
        coin:0
    };
    $("#resource-input-list ul li .input-warpper input").each(function (){
       resource_to_send[$(this).attr("data-resource")] = Number($(this).val());
    });
    
    
    
    for (var obj in resource_to_send){
        total_resource +=  resource_to_send[obj];
    }
    
    
    
    if(total_resource <= 0){
        alert_box.failMessage("يجب عليك ادخال  الموارد المراد ارسالها"); 
        return ;
    }else if(total_resource > Market.getMarketMaxTransNum()){
        alert_box.confirmMessage("لا يستطيع الناقلون نقل كمية اكبر من استيعاب السوق لها");
        return ;
    }
    
    if(Number(Elkaisar.CurrentCity.City.food) < resource_to_send.food        || resource_to_send.food  < 0){
        alert_box.failMessage("لا يوجد غذاء كافى ");
        return ;
    }else if(Number(Elkaisar.CurrentCity.City.wood ) < resource_to_send.wood  || resource_to_send.wood  < 0){
        alert_box.failMessage("لا يوجد اخشاب كافى ");
        return ;
    }else if(Number(Elkaisar.CurrentCity.City.stone) < resource_to_send.stone || resource_to_send.stone  < 0){
        alert_box.failMessage("لا يوجد حجارة كافى ");
        return ;
    }else if(Number(Elkaisar.CurrentCity.City.metal) < resource_to_send.metal || resource_to_send.metal  < 0){
        alert_box.failMessage("لا يوجد حديد كافى ");
        return ;
    }else if(Number(Elkaisar.CurrentCity.City.coin) < resource_to_send.coin   || resource_to_send.coin  < 0){
        alert_box.failMessage("لا يوجد عملات كافى ");
        return ;
    } 
    
    
    $.ajax({
       
        url: "api/market.php",
        data:{
            TRANSMIT_RESOURCE_TO:true,
            x_coord:x_coord,
            y_coord:y_coord,
            food:resource_to_send.food,
            wood:resource_to_send.wood,
            stone:resource_to_send.stone,
            metal:resource_to_send.metal,
            coin:resource_to_send.coin,
            id_city:Elkaisar.CurrentCity.City.id_city,
            id_player:ID_PLAYER,
            x_from : Elkaisar.CurrentCity.City.x,
            y_from : Elkaisar.CurrentCity.City.y,
            market_lvl:Elkaisar.City.getCity().BuildingLvl.market,
            token:TOKEN
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
            Elkaisar.CurrentCity.City.food  -= resource_to_send.food;
            Elkaisar.CurrentCity.City.wood  -= resource_to_send.wood;
            Elkaisar.CurrentCity.City.stone -= resource_to_send.stone;
            Elkaisar.CurrentCity.City.metal -= resource_to_send.metal;
            Elkaisar.CurrentCity.City.coin  -= resource_to_send.coin;
            city_profile.refresh_resource_view();
            
            self.prop("disabled" , true);
            self.attr("disabled" , "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            
            self.prop("disabled" , false);
            self.removeAttr("disabled");
            unwaitCursor();
                
            if(isJson(data)){
                
                var json_data = JSON.parse(data);
                
                if(json_data.state === "error_1"){
                    alert_box.confirmMessage("لا يمكنك ارسال بعثات اخرى خارج المدينة جميع النقالين بالخارج"); 
                    return ;
                }else if(json_data.state === "error_city"){
                    
                    alert_box.confirmMessage("هذة الاحداثيات لا تخص  مدينة ");
                    return ;
                    
                }
                
                
                
                var list = `<li class="unit-trans-table">
                                <div class="row">
                                    <div class="td">
                                        <img src="images/style/food.png"/>
                                        <span>${resource_to_send.food}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/wood.png"/>
                                        <span>${resource_to_send.wood}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/stone.png"/>
                                        <span>${resource_to_send.stone}</span>
                                    </div>
                                </div>
                                <div class="row">
                                     <div class="td">
                                         <img src="images/style/iron.png"/>
                                        <span>${resource_to_send.metal}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/coin.png"/>
                                        <span>${resource_to_send.coin}</span>
                                    </div>
                                    <div class="td">
                                        <img src="images/style/wait.png"/>
                                        <span>${changeTimeFormat(json_data.time_arrive - Date.now()/1000)}</span>
                                    </div>
                                </div>
                                <div class="footer">
                                    <label class="name-city">${Elkaisar.CurrentCity.City.name} &nbsp;&nbsp;[${x_coord} , ${y_coord}] </label>

                                    <label class="arrow"><img src="images/arrow/go-right.png"/></label>
                                    <button data-id-trans="${json_data.id_trans}" class="speed-up speed-up-btn acce-transport-deal"><span>تسريع</span></button>
                                </div>
                            </li>`;
                    
                $("#under-inner-nav ul").append(list);
                $("#transport-res-inner-nav .nav-title:first").click();
                $("#under-inner-nav").niceScroll(SCROLL_BAR_PROP);
                
                Elkaisar.CurrentCity.City.food  = Number(json_data.city.food);
                Elkaisar.CurrentCity.City.wood  = Number(json_data.city.wood);
                Elkaisar.CurrentCity.City.stone = Number(json_data.city.stone);
                Elkaisar.CurrentCity.City.metal = Number(json_data.city.metal);
                Elkaisar.CurrentCity.City.coin  = Number(json_data.city.coin);
                
                
                city_profile.refresh_resource_view();
                
                alert_box.succesMessage("تم ارسال النقالين بنجاح");
              
            }else{
                alert(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            
        }
        
    });
    
    
    
});




$(document).on("click" , "#auction-buy-btn button" , function (){
    
    $("#under-inner-nav .sell-or-buy .buy input").prop("checked" , true);
    $("#under-inner-nav .unite-price input").val(MARKET_DEAL_LIST.buy_list[0] ? MARKET_DEAL_LIST.buy_list[0].unit_price : 0 );
    
});

$(document).on("click" , "#auction-sell-btn button" , function (){
    
    $("#under-inner-nav .sell-or-buy .sell input").prop("checked" , true);
    $("#under-inner-nav .unite-price input").val(MARKET_DEAL_LIST.sell_list[0] ? MARKET_DEAL_LIST.sell_list[0].unit_price : 0 );
    
});


$(document).on("click" , ".acce-transport-deal" , function (){
    
    var id_trans = $(this).attr("data-id-trans");
    var self = $(this);
    if(!id_trans){
        alert_box.failMessage("حدث خطاء");
    }
    if(Matrial.getPlayerAmount("shopping_car") < 1){
        alert_box.confirmMessage("لا يوجد لديك عربات تسوق للقيام بالعملية");
        return ;
    }
    
    alert_box.confirmDialog("تاكيد استعمال 1 عربة تسوق لتسريع  عملية النقل"  , function (){
        
        $.ajax({
            url: "api/market.php",
            data:{
                ACCE_TRANSPORT: true,
                id_trans: id_trans,
                id_player:ID_PLAYER,
                    token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                self.attr("disabled" , "disabled");
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                self.removeAttr("disabled");
                $("#transport-res-inner-nav .selected").click();    
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
        
    });
    
});



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Palace = {
    
    isExpanable: function (){
        
        
        if(Number(Elkaisar.City.getCity().BuildingLvl.palace ) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*4){
            return false;
        }else if (Matrial.getPlayerAmount("expan_plan") < Math.pow(2 , Elkaisar.CurrentCity.City.lvl) ){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.food) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000 ){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.wood) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.stone) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.coin) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.metal) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else {
            return true;
        }
    }
};

Palace.getBarrayEffect = function (){
    
    var food_bar_effect  = 0;
    var wood_bar_effect  = 0;
    var stone_bar_effect = 0;
    var metal_bar_effect = 0;
    
    
    
    for (var index in Elkaisar.CurrentCity.Barray){
        
        var Unit =  WorldUnit.getWorldUnit(Elkaisar.CurrentCity.Barray[index].x_coord, Elkaisar.CurrentCity.Barray[index].y_coord);
        
        if(WorldUnit.isRiver(Unit.ut)){
            food_bar_effect  += 0.03*Unit.l;
        }else if(WorldUnit.isWood(Unit.ut)){
            wood_bar_effect  += 0.03*Unit.l;
        }else if(WorldUnit.isDesert(Unit.ut)){
            stone_bar_effect += 0.03*Unit.l;
        }else if(WorldUnit.isMountain(Unit.ut)){
            metal_bar_effect += 0.03*Unit.l;
        }
    }
    
    return {
        food:food_bar_effect,
        wood:wood_bar_effect,
        stone:stone_bar_effect,
        metal:metal_bar_effect
    };
    
};

Palace.getTotalProduction = function (){
    var city_console = Elkaisar.Hero.getHero(Elkaisar.CurrentCity.City.console);
    
    var console_effect = 0;
    if(city_console){
        console_effect = (Number(city_console.Hero.point_a) + Number(city_console.Hero.point_a_plus))/200;
        console_effect = city_console.Medal.medal_ceasro > $.now()/1000 ? console_effect : console_effect*1.25;
    }
    
    var food_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.food*Elkaisar.City.getCity().Jop.food_rate/100)   , Elkaisar.CurrentCity.City.pop)*10;
    var wood_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.wood*Elkaisar.City.getCity().Jop.wood_rate/100)   , Elkaisar.CurrentCity.City.pop , Elkaisar.CurrentCity.City.pop - food_effective )*10;
    var stone_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.stone*Elkaisar.City.getCity().Jop.stone_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective , 0))*10;
    var metal_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.metal*Elkaisar.City.getCity().Jop.metal_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective - stone_effective, 0))*10;
    
    
    var BarrayEffect = Palace.getBarrayEffect();
    
    
    return {
        food :food_effective  + food_effective*console_effect +BarrayEffect.food*food_effective     + Elkaisar.DPlayer.PlayerEdu.farming*0.1*food_effective,
        wood :wood_effective  + wood_effective*console_effect +BarrayEffect.wood*wood_effective     + Elkaisar.DPlayer.PlayerEdu.wooding*0.1*wood_effective,
        stone:stone_effective + stone_effective*console_effect +BarrayEffect.stone*stone_effective  + Elkaisar.DPlayer.PlayerEdu.stoning*0.1*stone_effective,
        metal:metal_effective + metal_effective*console_effect +BarrayEffect.metal*metal_effective  + Elkaisar.DPlayer.PlayerEdu.mining*0.1*metal_effective
    };
    
};


Palace.productionReport =  function (){
        
    var food_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.food*Elkaisar.City.getCity().Jop.food_rate/100)   , Elkaisar.CurrentCity.City.pop);
    var wood_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.wood*Elkaisar.City.getCity().Jop.wood_rate/100)   , Elkaisar.CurrentCity.City.pop , Elkaisar.CurrentCity.City.pop - food_effective );
    var stone_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.stone*Elkaisar.City.getCity().Jop.stone_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective , 0));
    var metal_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.metal*Elkaisar.City.getCity().Jop.metal_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective - stone_effective, 0));
    
    var console_effect = 0;
    var city_console = Elkaisar.Hero.getHero(Elkaisar.CurrentCity.City.console);
    if(city_console){
        console_effect = (Number(city_console.Hero.point_a) + Number(city_console.Hero.point_a_plus))/200;
        console_effect = city_console.Medal.medal_ceasro > $.now()/1000 ? console_effect : console_effect*1.25;
    }
    
    
    
    var BarrayEffect = Palace.getBarrayEffect();
    
    var totalProduction = Palace.getTotalProduction();
        
    var left_content = `<div class="left-content full production-report"  style="background: url(images/icons/bg_patern.png);">
                            <div class="th">
                                <div class="td_1 ellipsis">${Translate.General.Iron[UserLag.language]}</div>
                                <div class="td_2 ellipsis">${Translate.General.Stone[UserLag.language]}</div>
                                <div class="td_3 ellipsis subject">${Translate.General.Lumber[UserLag.language]}</div>
                                <div class="td_5 ellipsis">${Translate.General.Crops[UserLag.language]}</div>
                                <div class="td_6 ellipsis"></div>
                                <div class="td_6 ellipsis"></div>
                            </div>
                            <div id="scroll-production-report" class="scroll">
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal*10}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone*10}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood*10}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food*10}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> القدرة الانتاجية من المواد</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الوظائف المتاحة</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal - metal_effective}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone - stone_effective}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood  - wood_effective}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food  - food_effective}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> عدد المطلوب من العمال</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${metal_effective}</div>
                                    <div class="td_2">${stone_effective}</div>
                                    <div class="td_3">${wood_effective}</div>
                                    <div class="td_5">${food_effective}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> عدد العاملين</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1"><input id="metal-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.metal_rate}"/></div>
                                    <div class="td_2"><input id="stone-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.stone_rate}"/></div>
                                    <div class="td_3"><input id="wood-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.wood_rate}"/></div>
                                    <div class="td_5"><input id="food-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.food_rate}"/></div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> <button id="change-city-pro-rate" class="full-btn-3x">تعديل النسب</button></div>
                                </div>

                                <div class="tr green">
                                    <div class="td_1">${metal_effective*10}</div>
                                    <div class="td_2">${stone_effective*10}</div>
                                    <div class="td_3">${wood_effective*10}</div>
                                    <div class="td_5">${food_effective*10}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الانتاج الاساسى</div>
                                </div>

                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*console_effect*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*console_effect*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*console_effect*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*console_effect*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم الابطال</div>
                                </div>

                                <div class="tr">
                                    <div class="td_1">${Math.floor(Elkaisar.DPlayer.PlayerEdu.mining*0.1*metal_effective*10)}</div>
                                    <div class="td_2">${Math.floor(Elkaisar.DPlayer.PlayerEdu.stoning*0.1*stone_effective*10)}</div>
                                    <div class="td_3">${Math.floor(Elkaisar.DPlayer.PlayerEdu.wooding*0.1*wood_effective*10)}</div>
                                    <div class="td_5">${Math.floor(Elkaisar.DPlayer.PlayerEdu.farming*0.1*food_effective*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم الدراسات</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*BarrayEffect.metal*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*BarrayEffect.stone*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*BarrayEffect.wood*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*BarrayEffect.food*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم البرارى</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*BarrayEffect.metal*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*BarrayEffect.stone*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*BarrayEffect.wood*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*BarrayEffect.food*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم البرارى</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*10* (Elkaisar.DPlayer.PlayerState.metal > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_2">${Math.floor(stone_effective*10* (Elkaisar.DPlayer.PlayerState.stone > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_3">${Math.floor(wood_effective*10 * (Elkaisar.DPlayer.PlayerState.wood > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_5">${Math.floor(food_effective*10 * (Elkaisar.DPlayer.PlayerState.food > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">مواد زيادة الانتاج</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.CurrentCity.City.metal_out}</div>
                                    <div class="td_2">${Elkaisar.CurrentCity.City.stone_out}</div>
                                    <div class="td_3">${Elkaisar.CurrentCity.City.wood_out}</div>
                                    <div class="td_5 red">-${Elkaisar.CurrentCity.City.food_out}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الاستهلاك</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.CurrentCity.City.metal_in - Elkaisar.CurrentCity.City.metal_out}</div>
                                    <div class="td_2">${Elkaisar.CurrentCity.City.stone_in - Elkaisar.CurrentCity.City.stone_out}</div>
                                    <div class="td_3">${Elkaisar.CurrentCity.City.wood_in  - Elkaisar.CurrentCity.City.wood_out}</div>
                                    <div class="td_5">${Elkaisar.CurrentCity.City.food_in  - Elkaisar.CurrentCity.City.food_out}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الناتج الاجمالى</div>
                                </div>
                            </div>
                        </div>`;


    return left_content;
};

Palace.cityGarrison = function (offset , id_hero){
    
    if(!offset)
        offset = 0;
    
    var heroList = '';
    
    var Garrison = Elkaisar.City.getCity().Garrison;
    
    for(var iii = 0 + offset ; iii < 7 + offset; iii ++){
        
        if(Garrison[iii]){
            
            heroList += `<li class="tr ${Number(id_hero) === Number(Garrison[iii].id_hero) ?  "selected" : ""}" data-offset="${iii}" data-id-hero="${Garrison[iii].id_hero}">
                            <div class="td_1" style="width: 24%; margin-left: 2%;">
                                <div class="image">
                                    <div class="wrapper">
                                        <div class="hero-avatar" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Garrison[iii].avatar]})">
                                        </div>
                                    </div>
                                </div>
                                <div class="name ellipsis">
                                    (${Garrison[iii].HeroName})
                                </div>
                            </div>
                            <div class="td_2" style="width: 24%;">${Garrison[iii].LordName}</div>
                            <div class="td_3" style="width: 24%;">
                                <div class="hero-lvl">
                                    ${Garrison[iii].lvl}
                                </div>
                            </div>
                            <div class="td_5" style="width: 24%;">
                                <button class="full-btn-3x remove-hero-city-garrison" data-hero-name="${Garrison[iii].HeroName}" data-id-hero="${Garrison[iii].id_hero}" style="width: 50%;float: left">ازالة البطل</button>
                                    <button class="full-btn-3x show-hero-detailed-review" data-id-hero="${Garrison[iii].id_hero}"  style="width: 45%; float: right"> عرض</button>
                            </div>
                        </li>`;
            
        }else{
            heroList += `<li class="tr"></li>`;
        }
        
    }
    
    var content = ` <div class="left-content ">
                        <h1> قائمة البرارى</h1>
                    <p>
                        من هنا تسطيع عرض البرارى المملوكة<br>
                        <br>
                        <br>

                    </p>
                    <h1>ملحوظة:</h1>
                    <p>
                          لا يمكنك امتلاك اكثر من 10 برارى
                    </p>
                    </div>
                    <div class="right-content">
                        <div class="th">
                            <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%;">${Translate.Title.TH.Hero[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width: 24%;">${Translate.Title.TH.Lord[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width: 24%;">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width: 24%;">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>
                        <ol id="city-garrison-list">
                            ${heroList}
                        </ol>
                        <div id="city-garrison-footer" class="right-content-footer">
                            <div class="right">
                                <div class="wrapper" id="change-garrison-order">
                                    <button data-direction="up" class="order-up pull-R"></button>
                                    <button data-direction="down" class="order-down pull-L"></button>
                                </div>
                            </div>
                            <div class="middle">
                                <div class="wrapper">
                                    <button class="GO_L_1" data-direction="dec"></button>
                                    <label>${Math.floor(offset/7) + 1}/${Math.floor((Garrison.length - 1)/7) + 1}</label>
                                    <button class="GO_R_1" data-direction="inc"></button>
                                </div>
                            </div>
                            <div class="left">
                                <button id="add-city-garrison" class="full-btn-3x">${Translate.Button.Building.AddHero[UserLag.language]}</button>
                            </div>
                        </div>
                    </div>`;
    
    return content;
};

Palace.cityGarrisonHeros = [];

Palace.getCityGarison =  function (){
  
    return Elkaisar.City.getCityGarrison();
    
};




$(document).on("click" , ".acce-building-from-palace" , function (){
   
   var idTask = $(this).attr("data-id-task");
   
    var matrial_to_use = [
        "archit_a",
        "archit_b",
        "archit_c",
        "archit_d"
    ];
    
    BoxOfMatrialToUse(matrial_to_use , "building_acce" , 1 , idTask);
    
});



$(document).on("click" , "#change-city-taxs" , function (){
    
    var new_val = Number($("#city-name-val").val());
    
    if(typeof new_val !== "number" || new_val > 100){
        
        alert_box.failMessage("لا يمكن ان تكون قيمة الضرائب اكثر من 100%");
        return ;
        
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
        url: `${API_URL}/api/ACityPalace/updateTaxs`,
        data:{
            idCity     : idCity,
            newTaxRate : new_val,
            token      : Elkaisar.Config.OuthToken,
            server     : Elkaisar.Config.idServer
        },
        
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var JsonObject = JSON.parse(data);
           
            if(JsonObject.state === "ok"){
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم تعديل قيمة الضرائب بنجاح");
                $("#dialg_box .left-nav ul .selected").click();
                
            }else{
                
                
                alert(data);
                
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});

$(document).on("click" , "#change-city-name" , function (){
    
    var new_name = $("#city-name-val").val();
    
    if(new_name.length < 1){
        alert_box.failMessage("لا يجب ان تكون اسم المدينة خالية");
        return ;
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
        url: `${API_URL}/api/ACityPalace/updateName`,
        data:{
            NewName : new_name,
            idCity  : Elkaisar.CurrentCity.City.id_city,
            token   : Elkaisar.Config.OuthToken,
            server  : Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var JsonObject = JSON.parse(data);
           
            if(JsonObject.state === "ok"){
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                alert_box.succesMessage("تم تعديل اسم الدينة بنجاح");
                $("#city-data .name").html(new_name);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});



$(document).on("click" , "#expan-city button" , function (){
    
    alert_box.confirmDialog("تاكيد توسيع المدينة" , function (){
        
     if(!Palace.isExpanable() || Elkaisar.CurrentCity.City.lvl > 2){
        alert_box.failMessage("لا يمكن توسيع المدينة");
        return ;
     }
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
            url: `${API_URL}/api/ACityPalace/expandCity`,
            data:{
                NewName : new_name,
                idCity  : Elkaisar.CurrentCity.City.id_city,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
                var JsonObject = JSON.parse(data);

                if(JsonObject.state === "ok"){
                    
                    Matrial.takeFrom("expan_plan", Math.pow(2 , Elkaisar.CurrentCity.City.lvl));
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    fillCityWithBuilding();
                    
                    $(".nav_bar .left-nav ul li").each( function (){
                        
                        if($(this).attr("head_title") === "expantion"){
                            $(this).trigger("click");
                        }
                        
                    });
                    
                   alert_box.succesMessage("تم توسيع المدينة بنجاح");   
                   
                    
                }else{
                    
                    alert(data);
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
            
        });
        
    
        
    });
    
});

$(document).on("click" ,  "#bar_list .abandon" , function (){
    
    var list_ = $(this).parents("li");
    var x_coord = list_.attr("data-x-coord");
    var y_coord = list_.attr("data-y-coord");
    var unite_type = list_.attr("data-unit-type");
    var unit_for  = null;
  
    if(WorldUnit.isDesert(unite_type)){
       unit_for = "stone";
    }else if(WorldUnit.isRiver(unite_type)){
       unit_for = "food";
    }else if(WorldUnit.isWood(unite_type)){
       unit_for = "wood";
    }else if(WorldUnit.isMountain(unite_type)){
       unit_for = "metal";
    }
    
    
    if(unit_for === null){
        alert_box.failMessage("in valid barray");
        return ;
    }
    
    alert_box.confirmDialog("تاكيد تخلى عن البرارى" , function (){
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        $.ajax({
            url:`${API_URL}/api/ACityPalace/barryAbandon`,
            data:{
                xCoord : x_coord,
                yCoord : y_coord,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    
                }else{
                    console.log(data);
                    alert(data);
                    return ;
                }
               
                alert_box.succesMessage("تم التخلى عن البرية بنجاح");  
                list_.remove();
                Elkaisar.City.getCityBase(idCity);
                Elkaisar.City.getCityBarray(idCity).done(function (){
                    $("#dialg_box .left-nav ul .selected").click();
                });
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
    
});



/*     chanege garrio  list*/
$(document).on("click" , "#city-garrison-footer .middle .wrapper button"  , function (){
    
    var direction = $(this).data("direction");
    
    
    if(direction === "inc"){
        
        var lastOffset = Number($("#city-garrison-list .tr:last-child").data("offset"));
        if(isNaN(lastOffset))
            return ;
        
        if(Number(lastOffset) >= Elkaisar.City.getCity().Garrison.length - 1)
            return ;
        
        $("#palace_content").html(Palace.cityGarrison(lastOffset + 1));
        
    }else if(direction === 'dec'){
        
        var firstOffset = Number($("#city-garrison-list .tr:first-child").data("offset"));
        if(isNaN(firstOffset))
            return ;
        
        if(Number(firstOffset) <= 0)
            return ;
        
        $("#palace_content").html(Palace.cityGarrison(firstOffset - 7));
        
    }
    
});
Elkaisar.Building.Palace.HeroGarrisonList = function ()
{
    var heroList = "";
    var counter = 0;
    
    var idCity = Number(Elkaisar.CurrentCity.City.id_city);
    
    for(var jjj in Elkaisar.DPlayer.Heros){
        
        var HeroIn = Elkaisar.DPlayer.Heros[jjj];
        var alreadyInGarr = false;
        if(Number(Elkaisar.DPlayer.Heros[jjj].Hero.id_city) !== idCity)
            continue;
        for(var iii in Elkaisar.CurrentCity.Garrison){
            if(Elkaisar.CurrentCity.Garrison[iii].id_hero === HeroIn.Hero.id_hero)
                alreadyInGarr = true;
        }
        if(alreadyInGarr)
            continue;
        
        if(Hero.readyForBattel(Elkaisar.DPlayer.Heros[jjj])){
            counter++;
            heroList += `<li class="tr">
                            <div class="td_1" style="width: 25%">
                                <div class="wrapper">
                                    <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Elkaisar.DPlayer.Heros[jjj].Hero.avatar]})">

                                    </div>
                                </div>
                            </div>
                            <div class="td_2" style="width: 30%">
                                <div class="name" style="width: 100%">(${Elkaisar.DPlayer.Heros[jjj].Hero.name})</div>
                            </div>
                            <div class="td_3" style="width: 20%">
                                <div class="lvl"> ${Elkaisar.DPlayer.Heros[jjj].Hero.lvl}</div>
                            </div>
                            <div class="td_4" style="width: 25%">
                                <button class="full-btn-3x add-city-hero-garrison" data-id-hero="${Elkaisar.DPlayer.Heros[jjj].Hero.id_hero}">اضافة</button>
                            </div>
                        </li>`;

        }

    }
    
    var loopEnd = Math.max(0 , 10 - counter);
    
    for(var iii = 0 ; iii < loopEnd ; iii++){
        
        heroList += "<li class='tr'></li>"
        
    }
    return  heroList ;
   
   
};


$(document).on("click" , "#add-city-garrison" , function (){
   
   
    var heroList =  Elkaisar.Building.Palace.HeroGarrisonList();
    
    
    
    var overLay = ` <div id="over_lay" class="select_over_lay">
                        <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">قائمة الابطال</div>
                                <img class="close close_select_menu" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div id="hero-select-list">
                                <ol>
                                    ${heroList}
                                </ol>
                            </div>
                        </div>
                    </div>`;
    
    
    $("body").append(overLay);
    $("#hero-select-list ol").niceScroll(SCROLL_BAR_PROP);
    
});


/*   add hero to city Garrison   */
$(document).on("click" , "#hero-select-list .add-city-hero-garrison" ,  function (e){
   
   e.stopPropagation();
    var id_hero = $(this).data("id-hero");
    
    if(!id_hero)
        return ;
    
    var self = $(this);
    
    for (var iii in Elkaisar.City.getCity().Garrison){
        if(Number(id_hero) === Elkaisar.City.getCity().Garrison[iii].id_hero){
            
            alert_box.failMessage("لا يمكنك اضافة هذا البطل </br>   ( هذا االبطل موجود بحراسة المدينة  بالفعل )");
            self.parents(".tr").remove();
            $("#hero-select-list ol").append("<li class='tr'></li>");
            return ;
            
        }
        
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    alert_box.confirmDialog(" تأكيد اضافة البطل الى حراسة المدينة"  , function (){
       
       
        $.ajax({
            url: `${API_URL}/api/ACityPalace/addCityGarrison`,
            data:{
                idHero : id_hero,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                self.attr("disabled" , "disabled");
                
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                
                if(JsonObject.state === "ok"){

                    self.parents(".tr").remove();
                    $("#hero-select-list ol").append("<li class='tr'></li>");
                    alert_box.succesMessage("تم اضافة البطل بنجاح");
                    Elkaisar.City.getCity(idCity).Garrison = JsonObject.Garrison;
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset")));
                    $("#hero-select-list ol").html(Elkaisar.Building.Palace.HeroGarrisonList());

                }else{

                    self.removeAttr("disabled");
                    alert_box.failMessage(" لا يمكن اضافة البطل");

                }
               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
    });
    
});





/*   remove hero from garrison  */
$(document).on("click" , ".remove-hero-city-garrison" , function (e){
    
    e.stopPropagation();
    
    var id_hero = $(this).data("id-hero");
    var h_name  = $(this).data("hero-name");
    var self    = $(this);
    var idCity = Elkaisar.CurrentCity.City.id_city;
    alert_box.confirmDialog(`تأكيد سحب البطل ${h_name} من حراسة المدينة (${Elkaisar.CurrentCity.City.name})` , function (){
        
        $.ajax({
            url: `${API_URL}/api/ACityPalace/removeHeroFromGarrison`,
            data:{
                idHero  : id_hero,
                idCity  : idCity,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            beforeSend: function (xhr) {
                self.attr("disabled" , "disabled");
                waitCursor();
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                
                if(JsonObject.state === "ok"){
                    
                    alert_box.succesMessage("تم سحب البطل بنجاح");
                    Elkaisar.City.getCity(idCity).Garrison  = JsonObject.Garrison;
                    Elkaisar.Hero.getHero(id_hero).Hero     = JsonObject.Hero;
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset")));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    });
    
    
});



/* select from current city garrison */
$(document).on("click" , "#city-garrison-list .tr" , function (e){
    e.stopPropagation();
    if($(this).data("id-hero") !== undefined){
        
        $("#city-garrison-list .selected").removeClass("selected");
        $(this).addClass("selected");  
        
    }
    
});




/*    change cityGarison- order*/
$(document).on("click" , "#city-garrison-footer button" , function (){
   
    var id_hero = Number($("#city-garrison-list .selected").data("id-hero"));
    
    var self = $(this);
    var offset = Number($("#city-garrison-list .selected").data("offset"));
    var direction = $(this).data("direction");
    
    var id_to_change = null;
    if(direction === "up"){
        
        if (offset === 0)
            return ;
        
        var temp = Elkaisar.City.getCity().Garrison[offset - 1];
        id_to_change = temp.id_hero;
        Elkaisar.City.getCity().Garrison[offset - 1] =   Elkaisar.City.getCity().Garrison[offset] ;
        Elkaisar.City.getCity().Garrison[offset] = temp;
        
    }else if(direction === "down"){
        
        if(offset === Elkaisar.City.getCity().Garrison.length)
            return ;
        
        var temp = Elkaisar.City.getCity().Garrison[offset + 1];
        id_to_change = temp.id_hero;
        Elkaisar.City.getCity().Garrison[offset + 1] =   Elkaisar.City.getCity().Garrison[offset] ;
        Elkaisar.City.getCity().Garrison[offset] = temp;
        
        
    }
    
    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset") , id_hero));
   
    if(id_to_change === null)
        return ;
   
    $.ajax({
        url: `${API_URL}/api/ACityPalace/reordCityGarrison`,
        data:{
            idHero    : id_hero,
            Direction : direction,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
            $("#city-garrison-footer button").attr("disabled" ,"disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            $("#city-garrison-footer button").removeAttr("disabled");
            
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                Palace.getCityGarison().done(function (){
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset") , id_hero));
                    $("#city-garrison-footer button").removeAttr("disabled");
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});
SPY = {

    onCity: function (x_coord, y_coord, id_player) {



    },
    sendSpy: function (x_coord, y_coord) {
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        if(isNaN(Elkaisar.CurrentCity.City.spies)){
            alert_box.failMessage("لا يوجد عدد كافى من الجواسيس");
            return ;
        }
        var msg = `تاكيد ارسال جواسيس الى <br/> [${x_coord} , ${y_coord}]`;
        var container = `<div class="spy-wrapper">
                                <div class="pull-L">
                                    <img src="images/items/item027.jpg" class="image">
                                </div>
                                <div class="pull-R">
                                    <div class="right pull-R">
                                        <input type="text" id="number-to-use" class="input only_num" step="${Elkaisar.CurrentCity.City.spies}" max="${Elkaisar.CurrentCity.City.spies}" min="0">
                                    </div>
                                    <div class="left pull-L">
                                        <div>استعمال</div>
                                        <div class="possess">
                                            تمتلك  ${Elkaisar.CurrentCity.City.spies}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        alert_box.confirmWithInput(msg, container, function () {
            
            var number_to_use = $("#number-to-use").val();
            if (!number_to_use || Number(number_to_use) <= 0) {
                 alert_box.failMessage("عدد الجواسيس غير كافى للقيام بعملية التجسس");
                return ;
            }else if(Number(number_to_use) > Number(Elkaisar.CurrentCity.City.spies) || isNaN(Elkaisar.CurrentCity.City.spies) ){
                alert_box.failMessage("لا يوجد عدد كافى من الجواسيس");
                return ;
            }
            else {
                $.ajax({
                    url: `${API_URL}/api/ASpy/start`,
                    data: {
                        xCoord     : x_coord,
                        yCoord     : y_coord,
                        spyNum     : number_to_use,
                        idCity     : idCity,
                        token      : Elkaisar.Config.OuthToken,
                        server     : Elkaisar.Config.idServer
                    },
                    type: 'POST',
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        
                        if(!Elkaisar.LBase.isJson(data))
                            return Elkaisar.LBase.Error(data);
                        var JsonObject = JSON.parse(data);
                        
                        if(JsonObject.state === "ok")
                        {
                            
                            Elkaisar.City.getCity(idCity).City = JsonObject.City;
                            PLAYER_NOTIF.spy_task = Number(PLAYER_NOTIF.spy_task) + 1;
                            Fixed.refreshPlayerNotif();
                            city_profile.refresh_army_view();  
                            alert_box.succesMessage("تم ارسال الجواسيس بنجاح");
                            $(".close_RB img").trigger("click");
                        }
                        
                        
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
            
        });
    }



};




$("#WorldCity").click(function (){
    
    afterChangeView();
    
    if($(this).attr("data-view") === "world"){
        
        
        Crafty.enterScene("city");
        
        
        if(!$.isEmptyObject(Animation.currentUnitArrow.arrow)){
            Animation.currentUnitArrow.arrow.destroy();
            delete(Animation.currentUnitArrow.arrow);   
        }
        
        
        Animation.FixedCityAnimation();
        $(this).attr("data-view" , "city") ;
        $(this).html(Translate.Button.Chat.World[UserLag.language]);
        $("#hide-show").hide();
        Crafty.audio.stop("bird_sound");
        $("#smallMap-icon").fadeOut();
        $(".nav-to-city").fadeOut();
        setTimeout(function (){
            var iii = 0;
            for (iii ; iii < 500*500 ; iii++){
                delete Elkaisar.worldAllUnits[iii].entite;
                delete Elkaisar.worldAllUnits[iii].floor;
                delete Elkaisar.worldAllUnits[iii].CityFlagEntite;
            }
        });
        
    }
    else if($(this).data("view") === "city"){
        
        Crafty("city_ani").each(function (){
            this.destroy();
        });
        
        Crafty.enterScene("world");
        Elkaisar.World.Map.Scroll(true);
        $(this).attr("data-view" , "world") ;
        $(this).html("المدينة");
        $("#hide-show").show();
        Crafty.audio.play("bird_sound" , -1);
        $("#smallMap-icon").fadeIn();
        $(".nav-to-city").fadeIn();
        setTimeout(function (){Elkaisar.World.Map.RefreshWorld();}, 1000);
    }
    
});



$(document).on("click" , "#player-city-list ul li" ,  function (){
    
    afterChangeView();
    
    var index   = Number($(this).attr("data-index"));
    var id_city = Number($(this).attr("data-id-city"));
    
    $("#player-city-list ul .selected").removeClass("selected");
    $(this).addClass("selected");
    
    var view = $("#WorldCity").attr("data-view");
    
    
    Elkaisar.City.getCityHero(id_city);
    Elkaisar.City.getCityBarray(id_city);
    Elkaisar.City.getCityHeroArmy(id_city);
    Elkaisar.City.getCityHeroEquip(id_city);
    Elkaisar.City.getCityHeroMedal(id_city);
    Elkaisar.City.getCityGarrison(id_city);
    Elkaisar.TimedTask.getCityBuildingTasks(id_city);
    Elkaisar.TimedTask.getCityJopTasks(id_city);
    Elkaisar.TimedTask.getCityStudyTasks(id_city);
    
    city_profile.refresh_resource_view();
    city_profile.refresh_hero_view();
    city_profile.refresh_army_view();
    Elkaisar.TimedTask.refreshListView();
    Elkaisar.City.refreshBtnList();
    
    Elkaisar.CurrentCity = Elkaisar.City.getCity(id_city);
     
    Elkaisar.City.getCityBuilding().done(function (data){
        
        if(view === "city"){
            fillCityWithBuilding();
        }
        
        Elkaisar.City.getCityBase();
        
        
    });
    
   
    
    $("#city-data .name").html(Elkaisar.CurrentCity.City.name);
    $("#city-data .coords").html(`[ ${Elkaisar.CurrentCity.City.y} , ${Elkaisar.CurrentCity.City.x} ]`);
    
    
    
    
    if( view === "world"){
        
        $("#x_coord-input input").val(Elkaisar.CurrentCity.City.x);    
        $("#y_coord-input input").val(Elkaisar.CurrentCity.City.y);    
        $("#nav-btn button").click();
        
    }
    
});



$(document).on("click", ".nav-to-city", function (){
   
    var xCoord = $(this).attr("data-x-coord");
    var yCoord = $(this).attr("data-y-coord");
    
    $("#x_coord-input input").val(xCoord);
    $("#y_coord-input input").val(yCoord);
    $("#nav-btn button").click();
    
});


$(document).on("click", ".copy-coord", function (){
    var coord = `[${$(this).attr("data-x-coord")},${$(this).attr("data-y-coord")}]`;
    var inputVal = $("#input-chat input").val();
    $("#input-chat input").val(inputVal +" "+ coord);
    $("#input-chat input").focus();
});



function afterChangeView(){
    $(".close_dialog").click();
    $(".close_select_menu").click();
}Animation = {};
Animation.RATES = [];
Animation.cityProductionRate = function () {
    return;
    for (var iii in Animation.RATES) {
        Animation.RATES[iii].destroy();
        Animation.RATES.splice(iii, 1);
    }
    /* resource  in city animation*/
    var coin_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.coin_in - Elkaisar.CurrentCity.City.coin_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${coin_in_ratio >= 0 ? 'OVER_ZERO' : "BELOW_ZERO"} , city_ani , Text`)
            .attr({x: BuildingOnFloor.palace._x + 0.6 * X_GRID, y: BuildingOnFloor.palace._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(coin_in_ratio >= 0 ? "+" + coin_in_ratio : '-' + coin_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "coin");
    Animation.RATES.push(temp);


    /* resource  in city animation*/
    var food_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.food_in - Elkaisar.CurrentCity.City.food_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${food_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.farm._x + 0.6 * X_GRID, y: BuildingOnFloor.farm._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(food_in_ratio > 0 ? "+" + food_in_ratio : '-' + food_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "food");
    Animation.RATES.push(temp);


    /* resource  in city animation*/
    var wood_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.wood_in - Elkaisar.CurrentCity.City.wood_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${wood_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.wood._x + 0.6 * X_GRID, y: BuildingOnFloor.wood._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.wood_in > 0 ? "+" + wood_in_ratio : '-' + wood_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "wood");
    Animation.RATES.push(temp);

    /* resource  in city animation*/
    var stone_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.stone_in / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${stone_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"} , city_ani , Text`)
            .attr({x: BuildingOnFloor.stone._x + 0.6 * X_GRID, y: BuildingOnFloor.stone._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.stone_in > 0 ? "+" + stone_in_ratio : '-' + stone_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "stone");
    Animation.RATES.push(temp);

    /* resource  in city animation*/
    var metal_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.metal_in / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${metal_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.mine._x + 1.6 * X_GRID, y: BuildingOnFloor.mine._y + 2.25 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.stone_in > 0 ? "+" + metal_in_ratio : '-' + metal_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "metal");
    Animation.RATES.push(temp);

};


Animation.FixedCityAnimation = function () {
    return;
    Crafty.e("2D, DOM, Image").image("images/animation/fountain.gif").attr({x: 1300, y: 710, z: 50});
    Crafty.e("2D, DOM, Image").image("images/animation/fountain.gif").attr({x: 1200, y: 660, z: 50});


    Crafty("city_ani").each(function () {
        this.destroy();
    });


    /* first fountain */
    Crafty.e('2D, DOM, fountain, SpriteAnimation, city_ani')
            .reel("walking", 800, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]
            ])
            .animate("walking", -1)
            .attr({x: 1300, y: 710, z: 50});
    Crafty.e('2D, DOM, fountain, SpriteAnimation, city_ani')
            .reel("walking", 800, [
                [2, 0], [3, 0], [4, 0], [5, 0], [0, 0], [1, 0]
            ])
            .animate("walking", -1)
            .attr({x: 1200, y: 660, z: 50});


    Crafty.e('2D, DOM, ani_wood_maker, SpriteAnimation, city_ani')
            .reel("walking", 3000, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
            ])
            .animate("walking", -1)
            .attr({x: 2.5 * X_GRID, y: 8 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, ani_wood_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 2 * X_GRID, y: 8.25 * Y_GRID, z: 50});
    Crafty.e('2D, DOM, ani_wood_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1], [0, 2]
            ])
            .animate("walking", -1)
            .attr({x: 3 * X_GRID, y: 8.25 * Y_GRID, z: 50}).flip("X");

    Crafty.e('2D, DOM, stone_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 12.3 * X_GRID, y: 7.15 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, stone_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1]
            ])
            .animate("walking", -1)
            .attr({x: 11.75 * X_GRID, y: 6.5 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, mine_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 10 * X_GRID, y: 4 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, mine_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1]
            ])
            .animate("walking", -1)
            .attr({x: 9 * X_GRID, y: 5 * Y_GRID, z: 50});

    Crafty.cityClouds = [];
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 150, y: 100, vx: 14, z: 5000, __offsetX: -150
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: -100, y: 250, vx: 10, z: 5000, __offsetX: -100
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 180, y: 350, vx: 10, z: 5000, __offsetX: -180
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 360, y: 600, vx: 14, z: 5000, __offsetX: -360
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 660, y: 750, vx: 14, z: 5000, __offsetX: -660
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 540, y: 250, vx: 14, z: 5000, __offsetX: -540
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 110, y: 750, vx: 14, z: 5000, __offsetX: -110
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1800, y: 750, vx: 14, z: 5000, __offsetX: -1800
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1250, y: 900, vx: 14, z: 5000, __offsetX: -1250
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1500, y: 430, vx: 14, z: 5000, __offsetX: -1500
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 830, y: 360, vx: 14, z: 5000, __offsetX: -830
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1140, y: 540, vx: 10, z: 5000, __offsetX: -1140
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 850, y: 350, vx: 10, z: 5000, __offsetX: -850
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 980, y: 250, vx: 14, z: 5000, __offsetX: -980
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1480, y: 750, vx: 14, z: 5000, __offsetX: -1480
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1600, y: 900, vx: 14, z: 5000, __offsetX: -1600
    }));


    /* 
     
     Crafty.e('2D, Canvas, stone_carry, SpriteAnimation, Motion , Collision    ,  WiredHitBox')
     .reel("walking", 1200, [
     [0, 0], [0,1], [0,2], [0,3], [0,4], [0,5],[0,6]
     ])
     .animate("walking", -1)
     .attr({x:12.5*X_GRID, y:8*Y_GRID, z:50 , vx:-18 , vy:9}).flip("X")
     .onHit('palace' , function (){
     
     var this_ = this;
     setTimeout(function (){
     
     this_.vx =0;
     this_.vy =0;
     //this_.attr({__image: "images/animation/stone_carry.png"})
     
     
     }, 3500);
     
     
     
     })
     .collision([37,17,19,19,20,47,41,47])
     .onHit("mine" , function (){
     
     console.log("teat")
     
     });
     */





};


//setTimeout(function (){Animation.FixedCityAnimation();} , 3000)
var CLOUD_RESET_TIMER = setInterval(function () {
    for (var cloud in Crafty.cityClouds) {

        if (Crafty.cityClouds[cloud]._x > 2500) {
            Crafty.cityClouds[cloud].x = Crafty.cityClouds[cloud].__offsetX;
        }

    }
}, 40 * 1000);



function building_hammer_animate(building_place)
{

    if (isUpgradingNow(building_place)) {

        var x = BuildingOnFloor[building_place]._x;
        var y = BuildingOnFloor[building_place]._y;

        var x_1 = x - 25;
        var x_2 = x + 20;
        var y_1 = y - 10;
        var y_2 = y;

        if (building_place === "palace") {
            x_1 = x + 25;
            x_2 = x + 80;
            y_1 = y + 5;
            y_2 = y;
        } else if (building_place === "wall") {


            var hammer_3 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: 1.5 * X_GRID, y: 3.25 * Y_GRID, z: 5000});

            var hammer_4 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 0], [1, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: 0.5 * X_GRID, y: 4.25 * Y_GRID, z: 5000});

            BuildingOnFloor[building_place].attach(hammer_3);
            BuildingOnFloor[building_place].attach(hammer_4);


            x_2 = 3.5 * X_GRID;
            y_2 = 1.25 * Y_GRID;


        } else if (building_place === "farm") {
            x_1 = x + 0.5 * X_GRID;
            x_2 = x + X_GRID;
            y_1 = y + Y_GRID;
            y_2 = y + 0.5 * Y_GRID;
        } else if (building_place === "mine") {
            x_1 = x - 25 + X_GRID;
            x_2 = x + 20 + X_GRID;
            y_1 = y - 10 + Y_GRID;
            y_2 = y + Y_GRID;
        } else if (building_place === "stone") {
            x_1 = x - 25 + 0.5 * X_GRID;
            x_2 = x + 20 + 0.5 * X_GRID;
            y_1 = y - 10 + 0.5 * Y_GRID;
            y_2 = y + 0.5 * Y_GRID;
        }


        if (building_place !== "wall") {
            var hammer_1 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: x_1, y: y_1, z: 5000}).flip("X");
            BuildingOnFloor[building_place].attach(hammer_1);
        }



        var hammer_2 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                .reel("walking", 650, [
                    [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 0], [1, 0]
                ])
                .animate("walking", -1)
                .attr({x: x_2, y: y_2, z: 5000});


        BuildingOnFloor[building_place].attach(hammer_2);


    }
}

function fire_attack_animation()
{

    Crafty.e('2D, Canvas, fire_start, SpriteAnimation, worldEnt')
            .reel("walking", 650, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]
            ])
            .animate("walking", -1)
            .attr({x: 800 + 100, y: 600 + 50, z: 50});


}
var WORLD_NUIT_ON_FIRE = [];
Animation.fireWorldUnit = function (fire_unit) {


    var world_unit = WorldUnit.getWorldUnit(fire_unit.x_coord, fire_unit.y_coord);
    if (!world_unit.entite || $.isEmptyObject(world_unit.entite)) {
        return;
    }

    var x = world_unit.entite._x;
    var y = world_unit.entite._y;
    var z = world_unit.entite._z;

    var lvl = world_unit.l;
    var type = world_unit.ut;

    if (WorldUnit.isRiver(type)) {
        return;
    }
    if (world_unit.entite.__has_fire) {
        return;
    }

    if (WorldUnit.isBarrary(type) && lvl < 4 || WorldUnit.isGangStar(type)) {
        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 24, z: z}));
    } else if (WorldUnit.isBarrary(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt , fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 32, y: y + 16, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 72, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 42, z: z}));


    } else if (WorldUnit.isCityLv1(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y + 12, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 75, y: y + 20, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 20, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 46, y: y + 42, z: z}));
    } else if (WorldUnit.isCityLv2(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 80, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 30, z: z}));
    } else if (WorldUnit.isCityLv3(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [5, 0], [6, 0], [7, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 48, y: y - 10, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt , fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 88, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, 0], [1, 0], [2, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 8, y: y + 8, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 60, y: y + 32, z: z}));
    } else {
        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 80, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 30, z: z}));
    }

    world_unit.entite.__has_fire = true;

};


Elkaisar.Animation.cityFlagProp = {

};


Animation.cityFlag = function () {

    Crafty("WorldUnit").each(function (index) {

        var world_unit = WorldUnit.getWorldUnit(this.coord_x, this.coord_y);

        if (!$.isEmptyObject(world_unit.CityFlagEntite)) {
            return;
        }

        var x = Elkaisar.World.Map.posX(this.coord_x, this.coord_y);
        var y = Elkaisar.World.Map.posY(this.coord_x, this.coord_y);
        var z = Elkaisar.World.Map.posZ(this.coord_x, this.coord_y);

        var lvl = world_unit.l;

        if (!WorldUnit.isCity(world_unit.ut)) {
            return;
        }




        var flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];
        
        if (world_unit.idPlayer === Elkaisar.DPlayer.Player.id_player) {
            flag_array = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]];
        } else if (!Elkaisar.Guild.GuildData || !world_unit.idGuild) {

            flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        } else if (Number(Elkaisar.DPlayer.Player.id_guild) === Number(world_unit.idGuild)) {
            console.log("SameGuild")
            flag_array = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
        } else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(world_unit.idGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        flag_array = [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]];

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        flag_array = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]];
                    }
                }
            }
        }





        if (Number(world_unit.ut) === WUT_CITY_LVL_0) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 38, w: 35, h: 20, avoidCss3dTransforms: true, z: 9 ** 9})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));


        } else if (Number(world_unit.ut) === WUT_CITY_LVL_1) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e15})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_2) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_3) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 30, y: y + 45, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke, worldEnt')
                            .attr({x: x + 34, y: y + 60, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("" + world_unit.CityFlag)
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else {
            console.log(world_unit)
        }
    });


};


Animation.cityColonizerFlag = function () {

    Crafty("WorldUnit").each(function (index) {

        var world_unit = WorldUnit.getWorldUnit(this.coord_x, this.coord_y);

        if (!$.isEmptyObject(world_unit.CityColonizerFlagEntite)) {
            return;
        }
        if (!WorldUnit.isCity(world_unit.ut) || !world_unit.CityColonized) {
            return;
        }

        console.log(world_unit);
        var x = Elkaisar.World.Map.posX(this.coord_x, this.coord_y);
        var y = Elkaisar.World.Map.posY(this.coord_x, this.coord_y);
        var z = Elkaisar.World.Map.posZ(this.coord_x, this.coord_y);

        var lvl = world_unit.l;






        var flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        if (world_unit.ColonizerIdPlayer === Elkaisar.DPlayer.Player.id_player) {
            flag_array = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]];
        } else if (!Elkaisar.Guild.GuildData || !world_unit.ColonizerIdGuild) {

            flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        } else if (Number(Elkaisar.DPlayer.Player.id_guild) === Number(world_unit.ColonizerIdGuild)) {
            flag_array = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
        } else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(world_unit.ColonizerIdGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        flag_array = [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]];

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        flag_array = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]];
                    }
                }
            }
        }


        if (Number(world_unit.ut) === WUT_CITY_LVL_0) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 38, w: 35, h: 20, avoidCss3dTransforms: true, z: 9 ** 9})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));


        } else if (Number(world_unit.ut) === WUT_CITY_LVL_1) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e15})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_2) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_3) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 30, y: y + 30, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke, worldEnt')
                            .attr({x: x + 34, y: y + 60, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("" + world_unit.CityFlag)
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else {
            console.log(world_unit)
        }
    });


};

Animation.currentUnitArrow = {};

Animation.currentUnitArrow.arrow = {};
Animation.currentUnitArrow.x = 0;
Animation.currentUnitArrow.y = 0;
Animation.currentUnitArrow.z = 0;

Animation.currentUnitArrow.put = function (x, y) {

    Animation.currentUnitArrow.x = Elkaisar.World.Map.posX(x, y) + 50;
    Animation.currentUnitArrow.y = Elkaisar.World.Map.posY(x, y) + 5;
    Animation.currentUnitArrow.z = Elkaisar.World.Map.posZ(x, y) + 1;
    var dir = 0;

    if (!$.isEmptyObject(Animation.currentUnitArrow.arrow)) {
        Animation.currentUnitArrow.arrow.attr({
            x: Animation.currentUnitArrow.x,
            y: Animation.currentUnitArrow.y,
            z: Animation.currentUnitArrow.z
        }).trigger("TweenEnd");
    } else {

        Animation.currentUnitArrow.arrow =
                Crafty.e("2D, Canvas, Tween, arrow")
                .attr({
                    x: Animation.currentUnitArrow.x,
                    y: Animation.currentUnitArrow.y,
                    z: Animation.currentUnitArrow.z
                })
                .tween({y: Animation.currentUnitArrow.y + 30}, 1000, "easeInOutQuad")
                .bind("TweenEnd", function () {
                    this.tween({y: Animation.currentUnitArrow.y + (dir ? 30 : 0)}, 1000, "easeInOutQuad");
                    dir = 1 - dir;
                });

    }


};


Elkaisar.Equip.getPlayerEquip  = function ()
{
  
    return $.ajax({
        
        url: `${API_URL}/api/APlayerEquip/getPlayerEquip`,
        data:{
            server: Elkaisar.Config.idServer,
            token : Elkaisar.Config.OuthToken
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);
            
            Elkaisar.DPlayer.Equip = JSON.parse(data);
            Elkaisar.Equip.distributeEquip();
        }
    });
    
    
};


Elkaisar.Equip.distributeEquip = function ()
{
  
    for(var iii in Elkaisar.DPlayer.Heros)
    {
        if(!Elkaisar.DPlayer.Heros[iii].Equip)
            Elkaisar.DPlayer.Heros[iii].Equip = {
               boot: null, armor: null, shield: null, helmet: null, 
               sword: null, belt: null, ring: null, steed: null
            };
        
        for(var ii in Elkaisar.DPlayer.Equip)
        {
            
            
            if(Number(Elkaisar.DPlayer.Equip[ii].id_hero) === Number(Elkaisar.DPlayer.Heros[iii].idHero))
            {
                
                
                if (Elkaisar.DPlayer.Equip[ii].part === "boot")
                    Elkaisar.DPlayer.Heros[iii].Equip.boot = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "armor")
			Elkaisar.DPlayer.Heros[iii].Equip.armor = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "shield")
			Elkaisar.DPlayer.Heros[iii].Equip.shield = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "helmet")
			Elkaisar.DPlayer.Heros[iii].Equip.helmet = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "sword")
			Elkaisar.DPlayer.Heros[iii].Equip.sword = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "belt")
			Elkaisar.DPlayer.Heros[iii].Equip.belt = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "necklace")
			Elkaisar.DPlayer.Heros[iii].Equip.necklace = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "pendant")
			Elkaisar.DPlayer.Heros[iii].Equip.pendant = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "ring")
			Elkaisar.DPlayer.Heros[iii].Equip.ring = Elkaisar.DPlayer.Equip[ii];
	        if (Elkaisar.DPlayer.Equip[ii].part === "steed")
			Elkaisar.DPlayer.Heros[iii].Equip.steed = Elkaisar.DPlayer.Equip[ii];
                
            }
            
        }
        
    }
    
};

Elkaisar.Equip.getEquipUnit = function(idEquip)
{
    for(var iii in Elkaisar.DPlayer.Equip)
        if(Number(Elkaisar.DPlayer.Equip[iii].id_equip) === Number(idEquip))
            return Elkaisar.DPlayer.Equip[iii];
    
    return {};
};

var Equipment = {
    
    secoundryList:["belt","necklace","pendant","ring","steed"],
    
    getName: function (equip , part, lvl){
        
        if(!EQUIP_DATA[equip])
            return ;
        
        if(this.secoundryList.indexOf(part) > -1)
            return EQUIP_DATA[equip]["sec"][part][lvl].name;
            
        return EQUIP_DATA[equip][part].name;
    },
    getEquipData: function (equip , part , lvl){
        
        if(!EQUIP_DATA[equip])
            return {
                anti_break: "0",
                attack: "0",
                break: "0",
                damage: "0",
                defence: "0",
                desc: "",
                image: "images/tech/no_army.png",
                immunity: "0",
                long_desc: "0",
                lvl_req: 4,
                name: "-- --",
                strike: "0",
                vit: 140,
                vitality: "140",
                lvl:0
            } ;
        
        if(this.secoundryList.indexOf(part) > -1)
            return EQUIP_DATA[equip]["sec"][part][Math.max(lvl - 1 , 0)];
        
        return EQUIP_DATA[equip][part];
    },
    getImage: function (equip , part , lvl){
        if(!EQUIP_DATA[equip])
            return ;
        
        if(this.secoundryList.indexOf(part) > -1)
            return EQUIP_DATA[equip]["sec"][part][Math.max(lvl - 1 , 0)].image;
        
        return EQUIP_DATA[equip][part].image;
    },
    
    getPlayerEquip :  function (){
         return $.ajax({
            url: "api/city.php",
            type: 'GET',
            data: {get_available_equip: true, id_player:ID_PLAYER,   token:TOKEN},
            dataType: 'JSON',
            success: function (data, textStatus, jqXHR) {
                available_Equip = data;

                if($("#equip-list-heroDia").length){

                    $("#equip-list-heroDia").html(army.getEquipList());

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }

        });
    },
    getPlayerAmount: function (equip , part, lvl){
        
        var count = 0;
        for (var iii in Elkaisar.DPlayer.Heros){
            
            for(var jjj in Elkaisar.DPlayer.Heros[iii]){
                
                for(var kkk in Elkaisar.DPlayer.Heros[iii][jjj].equip){
                    
                    if(Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk]
                            && Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk].type === equip 
                            && Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk].part === part){
                        count++;
                    }
                }
                
            }
            
        }
        
        for(var iii in Elkaisar.DPlayer.Equip){
            
            if(Elkaisar.DPlayer.Equip[iii]
                            && Elkaisar.DPlayer.Equip[iii] .type === equip 
                            && Elkaisar.DPlayer.Equip[iii].part === part){
                        count++;
                    }
            
        }
        
        return count;
        
    }
    
};




$.ajax({
    url: "js"+JS_VERSION+"/json/equipment/"+(UserLag.language)+".json",
    success: function (data, textStatus, jqXHR) {
        EQUIP_DATA = data;
        $.ajax({
            
            url: "api/equip.php",
            data:{GET_EQUIP_POWER: true },
            type: 'GET',
            beforeSend: function (xhr) {
                
            },
            success: function (equip_power, textStatus, jqXHR) {
         
                var jsonData = JSON.parse(equip_power);
                var secEquip = Equipment.secoundryList;
                var equip;
                
                for(var ii in jsonData){
                    
                    if($.inArray(jsonData[ii].part, secEquip) > -1){
                        
                        equip = EQUIP_DATA[jsonData[ii].equip]
                                .sec[jsonData[ii].part][jsonData[ii].lvl -1];
                    }else {
                        equip = EQUIP_DATA[jsonData[ii].equip]
                                [jsonData[ii].part];
                    }
                    
                    equip.attack     = jsonData[ii].attack;
                    equip.defence    = jsonData[ii].defence;
                    equip.damage     = jsonData[ii].damage;
                    equip.vitality   = jsonData[ii].vitality;
                    equip.break      = jsonData[ii].break;
                    equip.anti_break = jsonData[ii].anti_break;
                    equip.strike     = jsonData[ii].strike;
                    equip.immunity   = jsonData[ii].immunity;
                   }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    }
});
var TradeCenter = {};

TradeCenter.currentList   = [];
TradeCenter.forbiddenList = [];
TradeCenter.playerList    = [];

TradeCenter.getTradeList = function (offset){
    
    if(!offset)
        offset = 0;
    return $.ajax({
                    url: "api/tradeCenter.php",
                    data:{
                        GET_TRADE_LIST: true,
                        offset: offset
                    },
                    type: 'GET',
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {

                        if(isJson(data)){
                            TradeCenter.currentList = JSON.parse(data);
                        }else{
                            alert(data);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
    
};


TradeCenter.getListItemById =  function (id_item){
    
    for (var iii in  this.currentList){
        if(Number(this.currentList[iii].id_item) === Number(id_item)){
            return this.currentList[iii];
        }
    }  
    
};

TradeCenter.getTradeListTotalCount = function (){
    
    
    return $.ajax({
        url: "api/tradeCenter.php",
        data:{
            GET_TOTAL_COUNT: true
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                TradeCenter.totalCount = JSON.parse(data).item_count;
            }else{
                alert(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
};

TradeCenter.getTradeListForbidden = function (){
    
    
    return $.ajax({
        url: "api/tradeCenter.php",
        data:{
            GET_FORBIDDEN_ITEM: true
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                var jsonData = JSON.parse(data);
                for (var iii in jsonData){
                   TradeCenter.forbiddenList.push(jsonData[iii].item) ;
                }
            }else{
                alert(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
};


TradeCenter.getPlayerTradeList = function (){
    
    
    return $.ajax({
        url: "api/tradeCenter.php",
        data:{
            GET_PLAYER_TRADE_LIST: true,
            id_player : ID_PLAYER,
            token:TOKEN
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                
                var jsonData = JSON.parse(data);
                TradeCenter.playerList = jsonData;
                
            }else{
                alert(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
};




TradeCenter.getTradeList(0);
TradeCenter.getTradeListTotalCount();
TradeCenter.getTradeListForbidden();
TradeCenter.getPlayerTradeList();



TradeCenter.TradeListContent =  function (list , offset){
    
    if(!offset)
        offset = 0;
    
    var tradeList = "";
    
    for(var iii = 0 ; iii < 7 ; iii++){
        
        if(list[iii]){
            
            tradeList += `<li class="tr " data-offset="${Number(offset) + iii}" data-id-hero="25">
                            <div class="td_1" style="width: 24%; margin-left: 2%;">
                                <div class="image">
                                    <div class="wrapper">
                                        <div class="item-image" style="background-image: url(${Matrial.image(list[iii].item)})">
                                        </div>
                                    </div>
                                </div>
                                <div class="name ellipsis">
                                    ${Matrial.getMatrialName(list[iii].item)}
                                </div>
                            </div>
                            <div class="td_2" style="width: 20%;">${list[iii].p_name}</div>
                            <div class="td_3" style="width: 11%;">
                                <div class="amount">
                                    ${list[iii].amount}
                                </div>
                            </div>
                            <div class="td_4" style="width: 11%;">
                                <div class="amount">
                                    ${list[iii].price}
                                </div>
                            </div>
                            <div class="td_5" style="width: 14%;">
                                ${lastSeen(list[iii].time_stamp)}
                            </div>
                            <div class="td_6" style="width: 18%;">
                                ${ Number(ID_PLAYER) !== Number(list[iii].id_player) ? `<button class="full-btn-3x buy-item-trade-center"
                                        data-item="${list[iii].item}"
                                        data-price="${list[iii].price}" 
                                        data-id-item="${list[iii].id_item}" 
                                        style="width: 45%; margin: auto;"> ${Translate.Button.MenuList.Buy[UserLag.language]}</button>` 
                                    :
                                    `<button class="full-btn-3x cancel-buy-item-trade-center"
                                        data-item="${list[iii].item}"
                                        data-price="${list[iii].price}" 
                                        data-id-item="${list[iii].id_item}" 
                                        style="width: 45%; margin: auto;">الغاء العرض</button>`}
                            </div>
                        </li>
                       `;
            
        }else{
            tradeList += ` <li class="tr"></li>`;
        }
        
    }
    
    var content = `<div id="city-trade-center" class="box_content">
                
                    <div class="th">
                        <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%;">${Translate.General.Item[UserLag.language]}</div>
                        <div class="td_2 ellipsis" style="width: 20%;">${Translate.Title.TH.Lord[UserLag.language]}</div>
                        <div class="td_3 ellipsis" style="width: 11%;">${Translate.Title.TH.Quantity[UserLag.language]}</div>
                        <div class="td_3 ellipsis" style="width: 11%;">${Translate.Title.TH.UnitePrice[UserLag.language]}</div>
                        <div class="td_5 ellipsis" style="width: 14%;">${Translate.Title.TH.Time[UserLag.language]}</div>
                        <div class="td_6 ellipsis" style="width: 18%;">${Translate.Button.General.Action[UserLag.language]}</div>
                    </div>
                    <ol id="trade-list">
                        ${tradeList}
                    </ol>
                    <div  class="right-content-footer cell-3-footer">
                        <div class="right">
                           
                        </div>
                        <div class="middle">
                            <div id="navigate-trade-list" class="wrapper">
                                <button class="GO_L_1" data-direction="dec"></button>
                                <label>${Math.floor( offset/ 7) + 1}/${Math.floor(TradeCenter.totalCount/7) + 1}</label>
                                <button class="GO_R_1" data-direction="inc"></button>
                            </div>
                        </div>
                        <div class="left">
                            <button id="addMatrialToBuy" class="full-btn-3x">${Translate.Button.Building.AddItem[UserLag.language]}</button>
                        </div>
                    </div>
                
            </div>`;
    return content;
};




$(document).on("click" , ".buy-item-trade-center" , function (){
    
    var id_item =  $(this).data("id-item");
   
    var listItem = TradeCenter.getListItemById(id_item);
    
    
    var msg = `<p>تأكيد استعمال  ( قسائم شراء) لشراء ${Matrial.getMatrialName(listItem.item)} مقابل ${listItem.price} ذهبة للمادة  الواحدة  </p>
                <div><input id="get-amount-to-buy" type="text"  class="only_num input" placeholder="كمية الشراء" min="0"  step="1" max="${Math.min(listItem.amount , Math.floor(Elkaisar.DPlayer.Player.gold/listItem.price))}" ></div>`;
    
    
    alert_box.confirmDialog(msg , function (){
        
        var amount_to_buy = Math.abs(Number($("#get-amount-to-buy").val() || 0));
        
        
        if(!isInt(Number(amount_to_buy)) ){
            alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
            return ;
        }
        
        if(amount_to_buy <= 0 || amount_to_buy > listItem.amount){
            
            alert_box.failMessage("الكمية المطلوب شرائها غير صحيحة  برجاء  حاول مرة اخرى");
            return ;
            
        }else if(amount_to_buy > Math.floor(Elkaisar.DPlayer.Player.gold/listItem.price)){
            alert_box.failMessage("عذرا ليس لديك ذهب كافى");
            return ;
        }else if( Matrial.getPlayerAmount("buy_voucher") < amount_to_buy){
            
            alert_box.failMessage("لا يوجد لديك عقود شراء كافية");
            return ;
        }
        
        if(Number(Elkaisar.DPlayer.Player.porm) < 5){
            alert_box.failMessage(`لا يمكنك شراء اى صفقة  ورتبتك اقل من ${Elkaisar.BaseData.Promotion[5].Title}`);
            return ;
        }
        
        
        if( TradeCenter.forbiddenList.indexOf(listItem.item ) >= 0){
            
            alert_box.failMessage("غير مسموح بشراء او  بيع هذه المادة فى الوقت الحالى ");
            return ;
            
        }
        
        $.ajax({
            
            url: "api/tradeCenter.php",
            data:{
                
                BUY_ITEM: true,
                id_item: id_item,
                id_player: ID_PLAYER,
                item_table: Matrial.table(listItem.item),
                amount: amount_to_buy,
                token:TOKEN
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                $(".buy-item-trade-center").attr("disabled" , "disabled");
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                
                $(".buy-item-trade-center").removeAttr("disabled");
                unwaitCursor();
                
                if(isJson(data)){
                    var jsonData = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                
                if(jsonData.state === "ok"){
                    
                    Matrial.givePlayer(listItem.item , amount_to_buy);
                    alert_box.succesMessage("تمت عملية الشراء بنجاح");
                    
                }else if(jsonData.state === "error_1"){
                    
                     alert_box.failMessage("لم تعد هذة الصفقة موجودة فى الوقت الحالى ");
                    
                }else if(jsonData.state === "error_2"){
                    
                    alert_box.failMessage("اختر عدد صحيح من المواد لشرائة");
                   
                    
                }else if(jsonData.state === "error_3"){
                    
                    alert_box.failMessage("لا يوجد لديك ذهب كافى");
                    
                }else if(jsonData.state === "error_4"){
                    
                    alert_box.failMessage("لم يتم اضافة المواد");
                    
                }else if(jsonData.state === "error_5"){
                    
                    alert_box.failMessage("عدد المواد غير صحيح");
                    
                }else if(jsonData.state === "error_6"){
                    
                    alert_box.failMessage("لا يوجد لديك عقود شراء كافية");
                    
                }
                
                
                var firstOffset = $("#trade-list li:first-child").data("offset") || 0;
                
                TradeCenter.getTradeList(firstOffset).done(function (){
                    
                    $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));
                    
                });
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
    });
    
    
});



$(document).on("click" , "#addMatrialToBuy" , function (){
    $("#matrial-box button").click();
});




$(document).on("click" , ".sell-matrial" , function (e){
    
    e.stopPropagation();
    
    var matrial = $(this).data("matrial");
    
    var msg = `
        <p>تأكيد بيع ${Matrial.getMatrialName(matrial)} </p>
        <div>
            <input  id="amount-to-sell-trade-center" type="text" class="only_num input"  min="0"  max="${Math.min(Matrial.getPlayerAmount(matrial) , Matrial.getPlayerAmount("sell_voucher"))}" placeholder="الكمية"/>
        </div>
        <div>
            <input id="item-price"  type="text" class="only_num input"  min="0"  max="999" placeholder="السعر"/>
        </div>
`;
    
    alert_box.confirmDialog(msg , function (){
        
        var amountToSell = Number($("#amount-to-sell-trade-center").val());
        var itemPrice   = Number($("#item-price").val());
        
        if(!isInt(Number(amountToSell)) || !isInt(Number(itemPrice))){
            alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
            return ;
        }
        
        if(itemPrice <= 0){
            alert_box.failMessage(" لا يمكنك بيع المادة  بهذا السعر");
            return ;
        }
        
        if(amountToSell <= 0){
            
            alert_box.failMessage("لا يمكنك بيع هذة الكمية");
            return ;
            
        }
        if(amountToSell > Matrial.getPlayerAmount("sell_voucher")){
            
            alert_box.failMessage("لا يوجد لديك عقود بيع كافية");
            return ;
            
        }
        if(amountToSell > Matrial.getPlayerAmount(matrial)){
            alert_box.failMessage(`لا يوجد لديك عدد كافى من (${Matrial.getMatrialName(matrial)})`);
            return ;
        }
        
        
        if(TradeCenter.forbiddenList.indexOf(matrial) > -1){
            alert_box.failMessage("غير مسموح بشراء او  بيع هذه المادة فى الوقت الحالى ");
            return ;
        }
        
        if(Number(Elkaisar.DPlayer.Player.porm) < 7){
            alert_box.failMessage("لا يمكنك عرض المادة للبيع و رتبتك اقل من موفد");
            return ;
        }
        
        $.ajax({
            
            url: "api/tradeCenter.php",
            data:{
                SELL_ITEM: true,
                item:matrial,
                price: itemPrice,
                id_player: ID_PLAYER,
                mat_table: Matrial.table(matrial),
                amount: amountToSell,
                token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data))
                    var jsonData = JSON.parse(data);
                else{
                    alert(data);
                    return ;
                }
                
                
                if(jsonData.state === "ok"){
                    
                    Matrial.takeFrom(matrial , amountToSell);
                    Matrial.takeFrom("sell_voucher" , amountToSell);
                    TradeCenter.playerList.push({
                       id_item:  jsonData.id_item,
                       id_player: ID_PLAYER,
                       price: itemPrice,
                       item: matrial,
                       time_stamp: $.now()/1000
                       
                    });
                    $("#dialg_box .nav_bar .left-nav ul .selected").click();
                    alert_box.succesMessage(`تم  اضافة ${amountToSell} ${Matrial.getMatrialName(matrial)}  الى قائمة البيع بنجاح`);
                    
                    
                    
                }else  if(jsonData.state === "error_0"){
                    alert_box.failMessage("لا يمكنك بيع هذة الكمية");
                }else  if(jsonData.state === "error_1"){
                    alert_box.failMessage(" لا يوجد لديك عدد كافى من المواد");
                }else  if(jsonData.state === "error_2"){
                    alert_box.failMessage("");
                }else  if(jsonData.state === "error_3"){
                    alert_box.failMessage("لا يوجد لديك عقود بيع كافية");
                }else if(jsonData.state === "error"){
                    alert_box.failMessage("اقل رتبة للبيع  هى موفد");
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
    });
    
});



$(document).on("click" , "#navigate-trade-list button" ,function (){
   
   
    var direction = $(this).data("direction");
    
    if(direction === "inc"){
        
        var firstOffset = $("#trade-list .tr:first-child").data("offset");
        
        console.log(firstOffset);
        
        if(firstOffset >= TradeCenter.totalCount - 7){
            return ;
        }
        
        
        TradeCenter.getTradeList(Number(firstOffset) + 7).done(function (){
            
            $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList , Number(firstOffset) + 7));
            
        });
        
        
    }else if(direction === "dec"){
        var firstOffset = $("#trade-list .tr:first-child");
        
        if( firstOffset <=  0){
            return ;
        }
        
        
        TradeCenter.getTradeList(Number(firstOffset) - 7).done(function (){
            
            $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList , Number(firstOffset) - 7));
            
        });
        
    }
    
    
});



$(document).on("click" , ".cancel-buy-item-trade-center" , function (){
   
    var id_item = $(this).data("id-item");
    
    
    alert_box.confirmDialog("ـاكيد الغاء عرض  البيع" , function (){
       
        $.ajax({
            url: "api/tradeCenter.php",
            data:{
                CANCEL_SELL_ITEM_OFFFER: true,
                id_player: ID_PLAYER,
                id_item: id_item,
                mat_table: Matrial.table(TradeCenter.getListItemById(id_item).item),
                token:TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var jsonData =  JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                if(jsonData.state === "ok"){
                    
                    alert_box.succesMessage("تم سحب المادة من قائمة البيع بنجاح");
                    Matrial.givePlayer(jsonData.item , jsonData.amount);
                    TradeCenter.totalCount--;
                    
                }else if(jsonData.state === "error_0"){
                    
                    alert_box.failMessage(" لا يوجد هذا العرض");
                    
                }else if(jsonData.state === "error_1"){
                    
                    alert_box.failMessage("لست صاحب هذا العرض");
                    
                }else if(jsonData.state === "error_2"){
                    
                    alert_box.failMessage("حدث خطاء حاول مرة اخرى");
                    
                }
                
                var firstOffset = $("#trade-list li:first-child").data("offset") || 0;
                
                TradeCenter.getTradeList(firstOffset).done(function (){
                    
                    $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));
                    
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    });
    
});
var Jop = {
    
    addLabor: function( jopFor , amount){
        
        if(jopFor === "farm" || jopFor === "food"){
            
            Elkaisar.City.getCity().Jop.food  =  Number(Elkaisar.City.getCity().Jop.food) + Number(amount);
            
        }else if(jopFor === "wood"){
            
            Elkaisar.City.getCity().Jop.wood  =  Number(Elkaisar.City.getCity().Jop.wood) + Number(amount);
            
        } else if(jopFor === "stone"){
            
            Elkaisar.City.getCity().Jop.stone  =  Number(Elkaisar.City.getCity().Jop.stone) + Number(amount);
            
        } else if(jopFor === "metal"){
            
            Elkaisar.City.getCity().Jop.metal  =  Number(Elkaisar.City.getCity().Jop.metal) + Number(amount);
            
        } 
        
    },
    
    
    
    fireLabor: function (jopFor){
        
        var amount = Number($("#number-to-dismiss").val());
        
        if(amount <= 0){
            
            alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
            return ;
            
        }else if(amount > Number(Elkaisar.City.getCity().Jop[jopFor])){
            
            alert_box.confirmMessage("لا يمكن طرد  كمية لا تملكها");
            return ;
            
        }
        var idCity = Elkaisar.CurrentCity.idCity;
        
        $.ajax({
            
            url: `${API_URL}/api/ACityJop/fireLabor`,
            data:{
                idCity        : idCity,
                amountToFire  : amount,
                buildingPlace : $(".box_content").attr("data-building-place"),
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                Elkaisar.City.getCity().Jop[jopFor] -= amount;
                waitCursor();
                $("#dismiss-army-box .two-btn button").attr("disabled" , "disabled");
            },
            success: function (data, textStatus, jqXHR) {
                $("#dismiss-army-box .two-btn button").removeAttr("disabled");
                unwaitCursor();
                alert_box.close();
                
                if(!isJson(data)){
                    
                    alert(data);
                    return ;
                    
                }
                
                
                var jsonData = JSON.parse(data);
                
                if(jsonData.state === "ok"){
                    Elkaisar.City.getCity(idCity).Jop = jsonData.cityJop;
                    Elkaisar.City.getCity(idCity).city = jsonData.cityRes;
                    
                    city_profile.refresh_resource_view();
                    alert_box.succesMessage("تم طرد العمال بنجاح");
                    
                }else if(jsonData.state === "error_0"){
                    
                    alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
                    
                }else if(jsonData.state === "error_1"){
                    
                    alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
                    
                }
                
                buildingClick($(".box_content").attr("data-building-place") , true);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    }
    
};


Jop.jops = {
    
    farm :{
        require : {food:10 ,wood:20, stone:30, metal:15, time:31, pop:1}, 
        produce:"food",
        ar_title: "وظائف الحقل",
        fireBenfit: {food:5 ,wood:10, stone:15, metal:7},
        image:"images/building/building18.jpg"
    },
    wood :{
        require : {food:15 ,wood:10, stone:20, metal:30, time:31, pop:1}, 
        produce:"wood",
        ar_title: "وظائف الاخشاب",
        fireBenfit: {food:7 ,wood:5, stone:10, metal:15},
        image:"images/building/building19.jpg"
    },
    stone:{
        require : {food:30 ,wood:15, stone:10, metal:20, time:31, pop:1},
        produce:"stone",
        ar_title: "وظائف المحجر",
        fireBenfit: {food:15 ,wood:7, stone:5, metal:10},
        image:"images/building/building20.jpg"
    },
    mine :{
        require:{food:20 ,wood:30, stone:15, metal:10, time:31, pop:1},
        produce:"metal",
        ar_title: "وظائف المنجم",
        fireBenfit: {food:10 ,wood:15, stone:15, metal:5},
        image:"images/building/building21.jpg"
    }
    
};


$(document).on("click", "#hire-btn button", function () {

    var num_to_hire = Number($("#jop-num-input input").val()) || false;
    var building_type = Number($(".box_content").attr("data-building-type")) || false;
    var building_place = $(".box_content").attr("data-building-place") || false;
    
    if(num_to_hire < 1){
        alert_box.confirmMessage("لا يمكنك توظيف هذة الكمية ");
        return ;
    }
    
    for (var index in Elkaisar.TimedTask.TaskList.Jop) {
        
        if(Number(Elkaisar.TimedTask.TaskList.Jop[index].id_city) === Number(Elkaisar.CurrentCity.City.id_city)){
            
                    alert_box.confirmMessage("لا يمكنك توظيف اكثر من دفعة عمال فى نفس الوقت");
                    return ;
                    
                }
        
    }

    if(Max_of.city_jop(CITY_JOP_REQ[building_place.toUpperCase()] , building_place) < num_to_hire){
        
        alert_box.confirmMessage("عفوا لا توجد موارد كافية لتوظيف هذا العدد من العمال");
        return;
        
    }else if (!num_to_hire) {

        alert_box.confirmMessage("عفوا عليك اختيار عدد العمال المراد توظيفهم.");
        return;

    } else if (!building_type) {

        alert_box.confirmMessage("عفوا عليك اختيار نوع التوظيف .");
        return;

    } else if (!building_place) {

        alert_box.confirmMessage("عفوا عليك اختيار مكان التوظيف .");
        return;

    } else {

        var idCity = Elkaisar.CurrentCity.City.id_city;
        $.ajax({

            url: `${API_URL}/api/ACityJop/hire`,
            data: {
                amountToHire  : num_to_hire,
                buildingPlace : building_place,
                idCity        : idCity,
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer

            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data)

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    /* calculate the decrease in city resources*/
                    Elkaisar.City.getCity(idCity).City = JsonObject.cityRes;

                    for (var index in Elkaisar.TimedTask.TaskList.Jop) 
                        if(Number(Elkaisar.TimedTask.TaskList.Jop[index].id_city) === Number(idCity))
                            delete(Elkaisar.TimedTask.TaskList.Jop[index]);
                    for(var ii in JsonObject.JopTaskList)
                        Elkaisar.TimedTask.TaskList.Jop[JsonObject.JopTaskList[ii].id] = JsonObject.JopTaskList[ii];
                    city_profile.refresh_resource_view();
                    Elkaisar.TimedTask.refreshListView();
                    

                } else if(json_data.state === "error_1"){

                    alert_box.confirmMessage("لا يمكنك توظيف هذة الكمية ");

                } else if(json_data.state === "error_2"){

                    alert_box.confirmMessage("لا يمكنك توظيف اكثر من دفعة عمال فى نفس الوقت");

                }else if(json_data.state === "no_pop"){
                    alert_box.confirmMessage("لا يوجد سكان كافية للتوظيف");
                }else if(json_data.state === "no_food"){
                    alert_box.confirmMessage("لا يوجد غذاء كافى للتوظيف");
                }else if(json_data.state === "no_wood"){
                    alert_box.confirmMessage("لا يوجد اخشاب كافية للتوظيف");
                }else if(json_data.state === "no_stone"){
                    alert_box.confirmMessage("لا يوجد احجار كافية للتوظيف");
                }else if(json_data.state === "no_metal"){
                    alert_box.confirmMessage("لا يوجد حديد كافى للتوظيف");
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    }

});




$(document).on("click" ,"#FIRE-EMPLOYEE button"  , function (){
   
    var building_place = $(".box_content").attr("data-building-place") || false;
    alert_box.jopFireEmployee(building_place);
    
});


$(document).on("click" , "#change-city-pro-rate" , function (){
     
    var foodRate  = Number($("#food-rate-input").val());
    var woodRate  = Number($("#wood-rate-input").val());
    var stoneRate = Number($("#stone-rate-input").val());
    var metalRate = Number($("#metal-rate-input").val());
    
    
    if(foodRate > 100 || foodRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(woodRate > 100 || woodRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(stoneRate > 100 || stoneRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(metalRate > 100 || metalRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    
    var idCity = Elkaisar.CurrentCity.idCity;
    
    $.ajax({
        
        url: `${API_URL}/api/ACityPalace/updateProductionRate`,
        data:{
            foodRate  : foodRate,
            woodRate  : woodRate,
            stoneRate : stoneRate,
            metalRate : metalRate,
            idCity    : idCity,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        beforeSend: function (xhr) {
            $("#change-city-pro-rate").attr("disabled" , "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            
            $("#change-city-pro-rate").removeAttr("disabled");
            unwaitCursor();
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var jsonData = JSON.parse(data);
            
            if(jsonData.state === "ok")
            {
                
                Elkaisar.City.getCity(idCity).City = jsonData.City;
                Elkaisar.City.getCity(idCity).Jop  = jsonData.CityJop;
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم تعديل معدل التوظيف بنجاح");

                $("#dialg_box .left-nav ul .selected").click();
                
            }
            
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    })
    
});
$(document).on("click", "#JOIN_ATTACK", function () {

    var x_coord = Number($(this).attr("data-x-coord"));
    var y_coord = Number($(this).attr("data-y-coord"));


    $("#dialg_box").remove();

    BattelField.battelField({x_coord: x_coord, y_coord: y_coord, navBar: BattelFieldNavBar, totalBox: true});

});



$(document).on("click", "#REQUEST_ORDER", function () {

    var xCoord = Number($(this).attr("data-x-coord"));
    var yCoord = Number($(this).attr("data-y-coord"));


    alert_box.confirmDialog("تأكيد طلب الهجوم", function () {

        $.ajax({

            url: `${API_URL}/api/ABattel/applyForRoleInAttQue`,
            data: {
                xCoord: xCoord,
                yCoord: yCoord,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    Elkaisar.CurrentWorldUnit.AttackQueList = JsonObject.QueueList;
                    campDB.refreshQueAttackList(xCoord, yCoord);
                    alert_box.succesMessage("تم تفعيل الطلب بنجاح");
                    
                } else if (JsonObject.state === "error_0") {
                    alert_box.confirmMessage("تم حجز دور بالفعل");
                } else if (JsonObject.state === "error_1") {
                    alert_box.confirmMessage("لا يوجد مكان خالى لك اقصى عدد 10");
                } else if (JsonObject.state === "error_3") {
                    alert_box.confirmMessage("رتبتك فى الحلف لا تكفى");
                } else if (JsonObject.state === "error_4") {
                    alert_box.confirmMessage("ليس لديك مواد كافية");
                }

            }

        });

    });

});

$(document).on("click", "#PLUNDE_PRIZE", function () {

    var xCoord = Number($(this).attr("data-x-coord"));
    var yCoord = Number($(this).attr("data-y-coord"));


    $.ajax({

        url: `${API_URL}/api/AWorldUnit/plundePrize`,
        data: {
            xCoord: xCoord,
            yCoord: yCoord,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            console.log(data)
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            console.log(data)
            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok") {
                alert_box.succesMessage(Matrial.prizeToString(JsonObject.PrizeList));
            } else if (JsonObject.state === "error_1_0") {
                alert_box.confirmMessage("لست عضو فى الحلف المسيطر");
            } else if (JsonObject.state === "error_1_1") {
                alert_box.confirmMessage("لست عضوا فى اى حلف");
            } else if (JsonObject.state === "error_1_2") {
                alert_box.confirmMessage("لست عضو فى الحلف المسيطر");
            } else if (JsonObject.state === "error_1_3") {
                alert_box.confirmMessage("لقد حصلت على غنيمة بالفعل");
            } else if (JsonObject.state === "error_1_4") {
                alert_box.confirmMessage("عليك انتظار 72 ساعة داخل الحلف");
            }

        },
        error: function (data, textStatus, jqXHR) {
            console.log(textStatus);
        }

    });

});




$(document).on("click", "#JOIN_ATTACK_SIDE , #JOIN_DEFENCE_SIDE", function () {

    if ($(this).attr("id") === "JOIN_DEFENCE_SIDE") {

        battel_data = {
            x_coord: parseInt($(this).attr("data-x_coord")),
            y_coord: parseInt($(this).attr("data-y_coord")),
            ar_title: $(this).attr("data-title"),
            task: BATTEL_JOIN_DEFENCE,
            time: 0,
            task_title: "انضمام للدفاع مع",
            type: null,
            side: 0,
            id_battel: parseInt($(this).attr("data-id-battel")),
            city_name: "name"
        };

    } else {

        battel_data = {
            x_coord: parseInt($(this).attr("data-x_coord")),
            y_coord: parseInt($(this).attr("data-y_coord")),
            ar_title: $(this).attr("data-title"),
            task: BATTEL_JOIN_ATTACK,
            time: 0,
            task_title: "انضمام للهجوم مع",
            type: null,
            side: 1,
            id_battel: parseInt($(this).attr("data-id-battel")),
            city_name: "name"
        };


    }


    // get hero id 
    var hero_object;

    for (var iii in Elkaisar.DPlayer.Heros)
    {
        if (parseInt(Elkaisar.DPlayer.Heros[iii].Hero.in_city) === Elkaisar.Hero.HeroState.HERO_IN_CITY && parseInt(Elkaisar.DPlayer.Heros[iii].Hero.console) === 0) {
            Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
            break;
        }
    }

    $(".close_dialog").click();
    $("#dialg_box").remove();

    var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel_data);
    var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language], NavBar.Hero, content);

    dialogBoxShow(dialog_box, function () {

        army.getCurrentArmy(Elkaisar.CurrentHero);
        $(".left-nav ul li").each(function () {
            if ($(this).attr("head_title") === "camp") {
                $(this).addClass("selected");
            }
        });
        $("#dialg_box").attr("type", "hero");
        $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);

    });





});


const BattelFieldNavBar =[
    {
        "txt": "أرض المعركة",
        "title":"battelField"
    }
];

var BattelField = {};
BattelField.SIDE_ATTACK = 1;
BattelField.SIDE_DEFENCE = 0;

BattelField.battelList = [];

BattelField.battelField = function (battel , currentBattels){
    
    var list = BattelField.getBattelHeaders(BattelField.battelList, battel.id_battel, false);
    
    var selectedBattel;
    
    if(!currentBattels){
        
       BattelField
               .getBattelForWorldUnit(battel.x_coord , battel.y_coord)
               .done(function (data){
                   
                    if(!isJson(data)){
                        alert(data);
                        return ;
                    }
                        
                    console.log(BattelField.battelList)
                    
                    BattelField.addToWatchList(battel.x_coord , battel.y_coord);
                    
                    
                        
                    var stop = Math.max(13 , BattelField.battelList.length);
                    list = "";

                    
                    list = BattelField.getBattelHeaders(BattelField.battelList, 0, false);
                    
                    selectedBattel = BattelField.battelList.length > 0 ? BattelField.battelList[0] : undefined;
                    
                    BattelField.battelModel(selectedBattel , list);
                    
               });
        
    }else if($.isArray(currentBattels)){
    
        selectedBattel = currentBattels.length > 0 ? currentBattels[0] : undefined;
        
       
        
        list = "";
        list += this.getBattelHeaders(currentBattels, battel.id_battel, true);
        
    }
    
    
    
    
    
    if(battel.totalBox){
        
        var box = menu_bar.dialogBox(Translate.Title.MenuList.Report[UserLag.language], battel.navBar, `<div class="box_content"></div>`, 0 );
        
        dialogBoxShow(box , function (){
            
            $("#dialg_box").attr("data-box-for" , "battelField");
            $("#dialg_box").attr("data-x-coord" , battel.x_coord);
            $("#dialg_box").attr("data-y-coord" , battel.y_coord);
            BattelField.battelModel(selectedBattel , list);
            
        }); 
    }
    
    this.battelModel(selectedBattel , list);
   
    
};

BattelField.battelModel = function (battel , list){
    

    var leftTime     = "";  // الوقت المتبقى
    var startTime    = ""; //
    var defenceTitle = "";
    var attackTitle  = "";
    var idBattel     = "";
    var x_coord      = "";
    var y_coord      = "";
    var defenceNum   = "";
    var attackNum    = "";
    var hasBattel    = false;
    
    if(typeof battel === "object"){
        
        var d        = new Date(battel.time_start*1000);
        leftTime     = `<span  class="time_counter" time-end="${battel.time_end}"> ${changeTimeFormat(battel.time_end - (Date.now()/1000))} </span>`;  // الوقت المتبقى
        startTime    = `<span>${(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM")}</span>`; //
        defenceTitle = WorldUtil.tooltipHeader(x_coord , y_coord) ;
        attackTitle  = battel.CityName;
        idBattel     = battel.id_battel;
        x_coord      = battel.x_coord;
        y_coord      = battel.y_coord;
        attackNum    = battel.attackNum;
        defenceNum   = battel.defenceNum;
        hasBattel    = true;
    }
    
    
    var battelList = `<div class="box_content for_report">
                        <div class="left-content " id="reports_list">
                            <div class="th ellipsis">${Translate.Title.TH.Subject[UserLag.language]}</div>
                            <div id="AllBattelLists">
                                ${list}
                            </div>
                        </div>
                        <div class="right-content ">
                            <div class="rest-time">
                                <h6> الوقت المتبقى: </h6>
                                <span>
                                    ${leftTime}
                                </span>
                            </div>
                            <div class="report_state">
                                <div class="defense-side">
                                    <div class="banner-red">
                                        ${defenceTitle}
                                    </div>
                                    <div class="image">
                                        <div class="wrapper">
                                            <div class="bg-image" style="background-image:url(images/style/defense.png) ; "></div>
                                        </div>

                                        <div class="joined-num">${defenceNum}</div>
                                    </div>
                                    <button class="full-btn btn-green-2x" id="JOIN_DEFENCE_SIDE" 
                                        data-id-battel="${idBattel}" 
                                        data-x_coord="${x_coord}" data-y_coord="${y_coord}" 
                                        data-title="" ${!hasBattel ? 'disabled="disabled"' : ""}>
                                       ${Translate.Button.General.JoinDefence[UserLag.language]}
                                    </button>
                                </div>
                                <div class="attack-side">
                                    <div class="banner-red">
                                        ${attackTitle}
                                    </div>
                                    <div class="image">
                                        <div class="wrapper">
                                            <div class="bg-image" style="background-image:url(images/style/attack.png); "></div>
                                        </div>
                                        <div class="joined-num">${attackNum}</div>
                                    </div>
                                    <button class="full-btn btn-red-2x" id="JOIN_ATTACK_SIDE" data-id-battel="${idBattel}" 
                                        data-x_coord="${x_coord}" data-y_coord="${y_coord}" 
                                        data-title="" ${!hasBattel ? 'disabled="disabled"' : ""}>
                                        ${Translate.Button.General.JoinAttack[UserLag.language]}
                                    </button>
                                </div>
                            </div>
                            <div class="down_report">
                                <div class="reload">
                                    <button class="full-btn  btn-yellow-2x ellipsis">
                                        ${Translate.Button.MenuList.Intelligence[UserLag.language]}
                                    </button>
                                    <button class="full-btn  btn-yellow-2x ellipsis" id="REFRESH_BATTEL_DATA" data-id-battel="">
                                        ${Translate.Button.MenuList.RefreshHero[UserLag.language]} 
                                    </button>
                                </div>
                                <div class="time_start">
                                    وقت البداء: ${startTime}

                                </div>
                            </div>
                        </div>
                    </div>`;
    $(".box_content").replaceWith(battelList);
    
    if($("#reports_list .selected").length < 1){
        $("#reports_list .has_battel:first").addClass("selected");
    }
    
    $("#reports_list").niceScroll(SCROLL_BAR_PROP);
};



BattelField.getBattelHeaders = function (battels , selectedBattelId, myBattels){
    
    var stop = Math.max(13 , battels.length);
    var list = "";
    
    for(var iii =0; iii < stop; iii++){
        
        if(battels[iii]){
            list +=  `
                        <div class="tr has_battel ${Number(selectedBattelId) === Number(battels[iii].id_battel) ? "selected" : ""}" 
                            data-id-battel="${battels[iii].id_battel}" data-my-battel="${myBattels}" >
                                        قام الملك ${battels[iii].PlayerName} بانشاء  معركة على ( ${getArabicNumbers(battels[iii].y_coord)} , ${getArabicNumbers(battels[iii].x_coord)})  من المدينة  ${battels[iii].CityName}
                                    </div>`;  
        }else{
            list += `<div class="tr"></div>`;
        }
        
    }
    
    return list;
    
    
    
};



BattelField.getBattelForWorldUnit = function (x_coord, y_coord){
  
        return $.ajax({

                    url: `${API_URL}/api/ABattelRunning/getUnitBattel`,
                    data:{
                        xCoord:x_coord,
                        yCoord: y_coord,
                        token: Elkaisar.Config.OuthToken,
                        server: Elkaisar.Config.idServer
                    },
                    type: 'GET',
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        
                        if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                        var jsonData = JSON.parse(data);
                        
                        BattelField.battelList = jsonData;
                        
                        console.log(BattelField.battelList);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }

                });
    
};



$(document).on("click" , "#AllBattelLists .has_battel" , function (){
   
    
    var idBattel = Number($(this).attr("data-id-battel"));
    var myBattel = isJson($(this).attr("data-my-battel")) ? JSON.parse($(this).attr("data-my-battel")) : false;
    
    var battelList = [];
    
    if(myBattel)
        battelList = Elkaisar.Battel.Battels;
    else
        battelList = BattelField.battelList;
    
    var selectedBattel;
    
    
    
    for (var iii in battelList){
        
        if(Number(battelList[iii].id_battel) === idBattel){
            selectedBattel = battelList[iii];
        }
        
    }
    
    var list = BattelField.getBattelHeaders(battelList ,selectedBattel.id_battel ,myBattel );
    BattelField.battelModel(selectedBattel , list);
    
});



BattelField.addToWatchList = function (x_coord , y_coord){
    
    ws.send(
            JSON.stringify(
                {
                    url:"WS_BattelWatchList/addPlayer",
                    data:{
                        id_player:ID_PLAYER,
                        x_coord:x_coord,
                        y_coord:y_coord,
                        token:TOKEN
                    }
                    
                }
            )
        );
    
};

BattelField.removeFromWatchList = function (x_coord , y_coord){
    
    ws.send(
        JSON.stringify(
            {
                url:"WS_BattelWatchList/removePlayer",
                data:{
                    idPlayer: ID_PLAYER,
                    x_coord:x_coord,
                    y_coord:y_coord,
                    token:TOKEN
                }
                
            }
        )
    );
    
};

BattelField.getBattel = function (id_battel){
    
    
    
    for (var iii in Elkaisar.Battel.Battels){
        if(Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(id_battel)){
            
            return Elkaisar.Battel.Battels[iii];
            
        }
    }
    
    for (var iii in this.battelList){
        if(Number(this.battelList[iii].id_battel) === Number(id_battel)){
            
            return this.battelList[iii];
            
        }
    }
    return null;
};
var GodGate = {};

GodGate.pointTotxt = {
    
    "attack":"هجوم",
    "def":"دفاع",
    "dam":"انجراح",
    "vit":"حيوية"
    
};

GodGate.navBar =  [{
        "txt": "أمون رع",
        "title":"god-gate-1"
        },{
        "txt":"خنوم",
        "title":"god-gate-2"
        },{
        "txt": "انوبيس",
        "title":"god-gate-3"
        },{
        "txt": "حورس",
        "title":"god-gate-4"
        }
];


GodGate.playerGate = {};

GodGate.closed = 0;
GodGate.open   = 1;

GodGate.data = {
    
    point:{
        attack:{
            ar_title: "هجوم",
            max: 50
        },
        defence:{
            ar_title: "دفاع",
            max: 50
        },
        vit:{
            ar_title: "حيوية",
            max: 100
        },
        damage:{
            ar_title: "انجراح",
            max: 50
        }
    },
    godName: {
        gate_1: "أمون رع",
        gate_2: "خنوم",
        gate_3: "أنوبيس",
        gate_4: "حورس"
    }
    
};


GodGate.matrialUse = ["god_point_5","god_point_30","god_point_75","god_point_175","god_point_750", "god_point_1k", "god_point_2k", "god_point_5k", "god_point_10k", "god_point_50k"];
GodGate.gateRequireMents = 
{
    gate_1:{
        points:500,
        porm: 4,
        godName:"امون رع"
    },
    gate_2:{
        points:1500,
        porm: 10,
        godName:"خنوم"
    },
    gate_3:{
        points:2500,
        porm: 18,
        godName:"انوبيس"
    },
    gate_4:{
        points:4000,
        porm: 28,
        godName:"حورس"
    }
};


GodGate.getPlayerGates = function() {
    
    return  $.ajax({
        
        url: `${API_URL}/api/AGodGate/getGodGateData`,
        data:{
            token: Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
                GodGate.playerGate = JSON.parse(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
};

$(document).on("PlayerReady", "html", function (){
    GodGate.getPlayerGates();
});



GodGate.godGateContent = function (){
    
    
    var content = `  
                    <div id="god-gate" class="box_content">
                        <div class="content-wrapper">
                            <div id="godGate-rank">
                                <div class="text">
                                    الترتيب
                                </div>
                            </div>
                            <div id="godGate-help"></div>
                            <div  id="god-1" class="god-container ${GodGate.playerGate.GodGateData.gate_1 ? "" : "gray-filter"}" style="left: 50%; margin-left: -75px;" data-gate="1">
                                <div class="text-val stroke" style="top:112px; margin-left: -45px"> ${GodGate.playerGate.GodGateData.gate_1 ? GodGate.playerGate.GodGateData.gate_1 : "0"} </div>
                            </div>
                            <div id="god-2" class="god-container ${GodGate.playerGate.GodGateData.gate_2 ? "" : "gray-filter"}" style="right: 0px; top: 50%; margin-top: -80px  " data-gate="2">
                                <div class="text-val stroke" style="margin-left: -45px ; top: 108px"> ${GodGate.playerGate.GodGateData.gate_2 ? GodGate.playerGate.GodGateData.gate_2 : "0"} </div>
                            </div>
                            <div id="god-3" class="god-container  ${GodGate.playerGate.GodGateData.gate_3 ? "" : "gray-filter"}"  style="left: 50%; bottom: 0px;  margin-left: -75px;" data-gate="3">
                                <div class="text-val stroke" style="top: 108px; margin-left: -45px"> ${GodGate.playerGate.GodGateData.gate_3 ? GodGate.playerGate.GodGateData.gate_3 : "0"} </div>
                            </div>
                            <div id="god-4" class="god-container  ${GodGate.playerGate.GodGateData.gate_4 ? "" : "gray-filter"}" style="left: 0px; top: 50%; margin-top: -80px " data-gate="4">
                                <div class="text-val stroke" style="margin-left: -67px; top: 94px"> ${GodGate.playerGate.GodGateData.gate_4 ? GodGate.playerGate.GodGateData.gate_4 : "0"} </div>
                            </div>


                            <div class="player-points">
                                <label>${GodGate.playerGate.GodGateData.points}/4000</label>
                                <div class="wrapper">
                                    <button class="pluse add-god-points"></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    
    return content;
    
};



GodGate.askToOpenGate = function (gate){
  
    
    var Needs = GodGate.gateRequireMents["gate_" + gate];
    
    if(!Needs)
        return ;
    
    if(Number(Elkaisar.DPlayer.Player.porm) < Needs.porm){
        
        alert_box.failMessage(`لا يمكنك فتح البوابة و رتبتك اقل من ${Elkaisar.BaseData.Promotion[Needs.porm].Title}`);
        return ;
        
    }
    
    if(Number(GodGate.playerGate.GodGateData.points) < Needs.points){
        alert_box.failMessage(`ليس لديك (${Needs.points}) نقطة لفتح البوابة`);
        return ;
    }
    
    
    alert_box.confirmDialog(`تأكيد فتح بوبة التسليح ${GodGate.data.godName["gate_" +gate]}` , function (){
       
        
        $.ajax({
           
            url: `${API_URL}/api/AGodGate/openGate`,
            data:{
                gateIndex : gate,
                token     : Elkaisar.Config.OuthToken,
                server    : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var jsonData = JSON.parse(data);
                
                if(jsonData.state === "error_2"){
                    
                    alert_box.confirmMessage(`لا يمكنك فتح البوابة و رتبتك اقل من ${Elkaisar.BaseData.Promotion[Needs.porm].Title}`);
                    
                }else if(jsonData.state === "error_3"){
                    
                    alert_box.confirmMessage(`ليس لديك (${Needs.points}) نقطة لفتح البوابة`);
                    
                }else if(jsonData.state === "ok"){
                    
                    GodGate.playerGate.GodGateData = jsonData.PlayerGate;
                    GodGate.playerGate[("GodGate"+gate)] = jsonData.Gate;
                    
                    $("#god-gate").replaceWith(GodGate.godGateContent());
                    alert_box.succesMessage("تم فتح البوابة بنجاح");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
    
    
};



GodGate.BoxContent = function (gate){
    
    var godGate = this.playerGate[("GodGate"+gate)];
    if(!godGate)
    {
        console.log(gate)
        console.log(godGate)
        return ;
    }
        
    
    var totalLocks = 0;
    
    var listItem = "";
    
    for(var iii = 1 ; iii <= 3 ; iii++){
        
        var state = "c_"+iii+"_s";
        var score = "cell_"+iii+"_score";
        var type  = "cell_"+iii+"_type";
        
        listItem += `<li data-index="${iii}" data-score="${score}">
                        <div class="lock">
                            ${Number(godGate[state]) === 0 ? '<label class="chackable"></label>' : ""}
                        </div>
                        <div class="effect score-${GodGate.scoreColor(godGate[type] ,godGate[score] )}">
                            <div class="effct-type font-2 ">${GodGate.data.point[godGate[type]].ar_title}</div>
                            <div class="effct-renge font-2">(${Math.floor(Math.max(godGate[score] - godGate[score]*0.2 , 1))})</div>
                            <div class="effct-score font-2">(${Math.floor((godGate[score]/GodGate.data.point[godGate[type]].max)*100)}%)</div>
                        </div>
                        <div class="checkBox">
                            <input type="checkbox" checked="checked">
                            <button class="checkmark ${Number(godGate[state]) === 0 ? "checked" : ""} chackable"></button>
                        </div>
                        <div class="closeWord font-2 chackable">
                            ${Number(godGate[state]) === 0 ? "مغلق" : ""}
                        </div>
                    </li>`;
        
        totalLocks += Number(godGate[state]) === 0 ? 1 : 0;
        
    }
    
    var box = ` <div id="godGateBox" data-gate="${gate}">
                    <div class="content-wrapper">
                        <div class="close-godGateBox">
                            <button></button>
                        </div>
                        <div class="scoreBord">
                            <div class="font-2">
                                ${this.playerGate.GodGateData[("gate_" + gate)]} 
                            </div>
                        </div>
                        <div class="godName">
                            <div class="name font-2">${this.data.godName["gate_" + gate]}</div>
                        </div>
                        <ul>
                            ${listItem}
                            <li class="gray-filter">
                                <div class="lock">
                                    <label></label>
                                </div>
                                <div class="effect">
                                    <div class="effct-type font-2">قريبا</div>
                                    <div class="effct-renge font-2">(0-0)</div>
                                    <div class="effct-score font-2">(0)</div>
                                </div>
                                <div class="checkBox">
                                    <input type="checkbox" checked="checked">
                                    <span class="checkmark"></span>
                                </div>
                                <div class="closeWord font-2">
                                    قريبا
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-wrapper">
                        <div class="btns-group">
                            <button id="change-gate-cell" ${Number(this.playerGate.GodGateData.points) < 50 + totalLocks*50 ? 'disabled = "disabled"' : ""} class="btn-red-2x">تغير</button>
                            <button class="pluse add-god-points"></button>
                        </div>
                        <div class="text-group">
                            <label>التكلفة : <span >${50 + totalLocks*50}</span> نقطة</label>
                            <label>لدبك : <span >${this.playerGate.GodGateData.points}</span>  نقطة </label>
                        </div>
                    </div>
                </div>`;
    
    return box;
    
};



GodGate.changeGateCells = function (gate){
  
    return $.ajax({
                
                url: `${API_URL}/api/AGodGate/changeGateUnlockedCells`,
                data:{
                    gateIndex : gate,
                    token     : Elkaisar.Config.OuthToken,
                    server    : Elkaisar.Config.idServer
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    waitCursor();
                    $("#change-gate-cell").attr("disabled" ,'disabled');
                },
                success: function (data, textStatus, jqXHR) {
                    unwaitCursor();
                    
                    $("#change-gate-cell").removeAttr("disabled");
                    
                    if(isJson(data)){
                        
                        GodGate.getPlayerGates().done(function (data){
                            $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
                        });
                                

                    }else {
                        alert(data); 
                    }
                   
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            
            });
    
};

GodGate.useBoxPoint = function (box , amount){
    
    if(!amount){
        amount = 1;
    }
    
    $.ajax({
            
        url: `${API_URL}/api/AGodGate/addGatePoints`,
        data:{
            Item   : box,
            amount : amount,
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer

        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            
            if(!isJson(data)){
                alert(data);
                return ;
            }
            
            var jsonData = JSON.parse(data);
            
            GodGate.getPlayerGates().done(function (data){
                
                $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
                if($("#godGateBox").length > 0){
                    var gate = $("#godGateBox").attr("data-gate");
                    $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
                }

                alert_box.succesMessage(`تم اضافة ${jsonData.PointToAdd} نقطة بنجاح`);

                $("#god-gate").replaceWith(GodGate.godGateContent());
            });
            $(".close_select_menu").trigger("click");
            $("#alert_container .close-alert").trigger("click");
            
            Matrial.takeFrom(box , amount);
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
};



GodGate.scoreColor = function (pointFor, score){
    
    
    if(GodGate.data.point[pointFor]){
        return Math.floor((score/GodGate.data.point[pointFor].max)*5);
    }
};



GodGate.rank = function (gate, offset){
    
  offset = offset || 0;
  
  $.ajax({
     
        url: "api/godGate.php",
        data:{
            
            GET_RANK_GATE:true,
            gate: gate,
            offset: offset
            
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(!isJson(data)){
                alert(data);
                return ;
            }
            
            var jsonData = JSON.parse(data);
            
            var list = "";
            for(var iii = 0; iii < 10; iii ++){
                
                if(jsonData[iii]){
                    
                    list += `
                            <div class="tr" data-rank="1">
                                 <div class="td_1" style="width: 18%">${Number(offset)+iii+1}</div>
                                <div class="td_2" style="width: 28%">${jsonData[iii].name}</div>
                                <div class="td_3" style="width: 18%">${Number(jsonData[iii].score)}</div>
                                <div class="td_4" style="width: 18%">${GodGate.rankEffect[gate][Object.keys(GodGate.rankEffect[gate])[0]][(Number(jsonData[iii].score) === 300 ? 0 : offset + iii)] || 0}</div>
                                <div class="td_5" style="width: 18%">---</div>
                            </div>`;
                    
                }else{
                    
                    list += `<div class="tr" rank="1"></div>`;
                    
                }
                
            }
            
            var content = ` <div class="content rank-list">
                                <div class="th">
                                    <div class="td_1 ellipsis" style="width: 18%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                                    <div class="td_2 ellipsis" style="width: 28%">${Translate.Title.TH.Lord[UserLag.language]}</div>
                                    <div class="td_3 ellipsis" style="width: 18%">${Translate.Title.TH.TotalPoints[UserLag.language]}</div>
                                    <div class="td_4 ellipsis" style="width: 18%">+ ${GodGate.pointTotxt[Object.keys(GodGate.rankEffect[gate])[0]]}</div>
                                    <div class="td_5 ellipsis" style="width: 18%">${Translate.Button.General.Soon[UserLag.language]}</div>
                                </div>
                                ${list}
                            </div>
                            <div class="footer">
                                <div class="li"></div>
                                <div class="li"></div>
                                <div class="li">
                                    <div class="nav_icon" id="nav-gate-rank" data-gate="${gate}" data-offset="${offset}">
                                        <div data-move="most-left"  class="pull-L most-left-btn"></div>
                                        <div data-move="left"       class="pull-L left-btn"></div>
                                        <h1 class="pull-L">  
                                            <span>${Number(offset)/10 + 1}</span>/${Math.ceil(GodGate.globalData[(gate+"_count")]/10)}
                                        </h1>
                                        <div data-move="most-right" class="pull-R most-right-btn"></div>        
                                        <div data-move="right"      class="pull-R right-btn"></div>
            
                                  </div>
                                </div>
                                <div class="li">
                                    <button class="show-my-rank btn-yellow-2x font-2"> تصنيفى</button>
                                </div>
                            </div>`;
            
            $("#Box-mid .content-wrapper").html(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
  });
    
};


$.ajax({
     
    url: "api/godGate.php",
    data:{

        RANK_EFFECT:true

    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
        GodGate.rankEffect = JSON.parse(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

});
$.ajax({
     
    url: "api/godGate.php",
    data:{

        GLOBAL_GATE_DATA:true

    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
        GodGate.globalData = JSON.parse(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

});

/*  show gode gate*/
$(document).on("click" , "#godGateBtnWrapper button" , function (){
    
    
    var dialog= menu_bar.dialogBox(Translate.Title.MenuList.GodGate[UserLag.language] ,[],  GodGate.godGateContent() , 0 );
    
    dialogBoxShow(dialog);
    
});




$(document).on("click" , "#god-gate .content-wrapper .god-container" , function (){
    
    var gate = $(this).attr("data-gate");
    
    if(!GodGate.playerGate.GodGateData["gate_"+gate]){
        
        GodGate.askToOpenGate(gate);
        
    }else{
        
        var over_lay = `<div id="over_lay">${GodGate.BoxContent(gate)}</div>`;
        $("body").append(over_lay);
        
    }
    
    
    
    
    
});


$(document).on("click" , "#godGateBox  .content-wrapper .close-godGateBox", function (){
    
    $("#over_lay").remove();
    
});


$(document).on("click" ,"#godGateBox .content-wrapper ul li .chackable" , function (){
    
    var gate = $("#godGateBox").attr("data-gate");
    var index = $(this).parents("li").attr("data-index");
    
    var godGate =  GodGate.playerGate[("GodGate"+gate)];
    
    godGate[("c_"+index+"_s")] = 1 - godGate[("c_"+index+"_s")];
    
    $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
    
    
    $.ajax({
        url: `${API_URL}/api/AGodGate/changeGateCellState`,
        data:{
            cellIndex : index,
            gateIndex : gate,
            state     : godGate[("c_"+index+"_s")],
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok")
            {
                 GodGate.playerGate[("GodGate"+gate)] = JsonObject.Gate;
                
            }
            
            
           $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
});


$(document).on("click" , "#change-gate-cell" ,function (){
   
    var gate = $("#godGateBox").attr("data-gate");
    
    if(!gate)
        return ;
    
    var godGate =  GodGate.playerGate[("GodGate"+gate)];
    var itemHeigh = false;
    
    for(var iii = 1 ; iii <= 3 ; iii++){
        
        var state = "c_"+iii+"_s";
        var score = "cell_"+iii+"_score";
        var type  = "cell_"+iii+"_type";
        
        console.log(type)
        
        var score_precent = (godGate[score]/GodGate.data.point[godGate[type]].max) *100;
        
        if(Number(godGate[state]) === GodGate.open && score_precent >= 90){
           itemHeigh = true;
        }
        
    }
    
    if(itemHeigh){
        
        alert_box.confirmDialog("تأكيد تغير نقاط البوابة! <br>  (قد تكون بعض النقاط الحالية عالية ويصعب الحصول عليها مرة اخرى)", function (){
            GodGate.changeGateCells(gate);
        });
        
    }else{
        
        GodGate.changeGateCells(gate);
        
    }
    
    
    
    
});



$(document).on("click" , ".add-god-points" , function (){
    
   var matrial = GodGate.matrialUse;
    
    BoxOfMatrialToUse(matrial , "add-god-points");
    
});



$(document).on("click", "#godGate-rank", function (){
    BoxMid.box("تصنيف", GodGate.navBar, "");
    GodGate.rank("gate_1", 0);
    $("#Box-mid .nav-bar ul li:first").addClass("selected")
});


$(document).on("click" , "#nav-gate-rank div", function (){
    
    var direction = $(this).attr("data-move");
    var offset    = Number($(this).parents("#nav-gate-rank").attr("data-offset"));
    var gate      = $(this).parents("#nav-gate-rank").attr("data-gate");
    var newOffset = 0;
    
    var maxOffset = Number(GodGate.globalData[(gate+"_count")]);
    
    if(direction === "left"){
        
        if(offset <= 0)
            return ;
        
        newOffset = Math.max(0 , offset - 10);
        
    }else if(direction ===  "most-left"){
        
        newOffset = 0;
        
    }else if(direction === "right" ){
        
        newOffset = offset + 10;
        if(newOffset >= maxOffset)
            return ;
        
    }else if(direction === "most-right"){
        
        newOffset = Math.floor(maxOffset/10)*10;
        
    }
    
    
    GodGate.rank(gate , newOffset);
});



$(document).on("click" , "#change-player-password" , function (){
    
    var msg = ` <div>
                    تاكيد تغير كلمة المرور
                </div>
                <div id="change-pass-input-group">
                    <input class="current-pass" type="password" placeholder="كلمة المرور الحالية"/>
                    <input class="new-pass"     type="password" placeholder="كلمة المرور الجديدة"/>
                    <input class="new-pass-con" type="password" placeholder="تأكيد كلمة المرور الجديدة"/>
                </div>`;
    
    alert_box.confirmDialog(msg , function (){
        
        var currentPassword = $("#change-pass-input-group .current-pass").val();
        var newPassword     = $("#change-pass-input-group .new-pass").val();
        var conNewPassword  = $("#change-pass-input-group .new-pass-con").val();
        
        if(conNewPassword !== newPassword){
            alert_box.failMessage("كلمة السر غير متطابقة مع كلمة التاكيد");
            return ;
        }
        
        $.ajax({
            
            url: "api/setting.php",
            data:{
                
                CHANGE_PLAYER_PASSWORD: true,
                oldPassword: currentPassword,
                newPassword: newPassword,
                id_player:ID_PLAYER,
                token:TOKEN
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(!isJson(data)){
                    
                    alert(data);
                    return ;
                    
                }
                
                var jsonData = JSON.parse(data);
                
                if(jsonData.state === "ok"){
                    
                    alert("تم تغير كلمة المرور بنجاح");
                    location.reload();
                    
                }else{
                    
                    alert_box.failMessage("كلمة المرور غير صحيحة");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
});




$(document).on("click" , "#OpenSettingsBox" , function (){
    
    
    var box = ` <div id="over_lay">
                    <div id="select_from">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png" class="banner">
                            <div class="title">اعدادات</div>
                            <img class="close close_use_menu" src="images/btns/close_b.png">
                        </div>
                        <p style="clear: both"></p>
                        <div id="rank-review" class="player-review">
                            <div class="upper">
                                <div class="th ellipsis">${Translate.Title.TH.Language[UserLag.language]}</div>
                                <div>
                                    <ul id="game-lang-list" class="flex">
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_1" class="choose-lang" type="radio" name="choseLang"  ${UserLag.language === ArLang ? 'checked="true"' : ""} value="${ArLang}">
                                                <label for="trigger_1" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/ar.png)"></label>
                                                </div>
                                                <div class="text">
                                                    العربية
                                                </div>
                                            </div>

                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_2" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === EnLan ? 'checked="true"' : ""} value="${EnLan}">
                                                <label for="trigger_2" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/en.png)"></label>
                                                </div>
                                                <div class="text">
                                                    English
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_3" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === EsLang ? 'checked="true"' : ""} value="${EsLang}">
                                                <label for="trigger_3" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/es.png)"></label>
                                                </div>
                                                <div class="text">
                                                    español
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_4" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === PtLang ? 'checked="true"' : ""} value="${PtLang}">
                                                <label for="trigger_4" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/pt.png)"></label>
                                                </div>
                                                <div class="text">
                                                    Português
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_5" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === DeLang ? 'checked="true"' : ""} value="${DeLang}">
                                                <label for="trigger_5" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/de.png)"></label>
                                                </div>
                                                <div class="text">
                                                    Deutsch
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_6" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === CnLang ? 'checked="true"' : ""} value="${CnLang}">
                                                <label for="trigger_6" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/cn.png)"></label>
                                                </div>
                                                <div class="text">
                                                    中文(简体)
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="down">
                                <div class="th ellipsis"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
    
    $("#over_lay").remove();
    $("body").append(box);
    
});




$(document).on("change" , "#game-lang-list .choose-lang", function (){
    
    var lang = $(this).val();
    var oldLang = UserLag.language;
    UserLag.language = lang;  
    alert_box.confirmDialog(Translate.Msg.ConfirmChanegeLanguage[lang], function (){

        $.ajax({

            url: "api/language.php",
            data:{
                CHANGE_PLAYER_LANG: true,
                token: TOKEN,
                id_player: ID_PLAYER,
                newLang :  lang
            },
            type: 'POST',
            beforeSend: function (xhr) {
            },
            success: function (data, textStatus, jqXHR) {

                if(isJson(data)){
                    location.reload(); 
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
        UserLag.language = oldLang;

    });
        
   
    
    
    
});



if(UserLag.isDefault){
    $("#OpenSettingsBox").click();
}const Emjoi = {

    ":D": "iconfinder_01_EmoticonsHDcom_343133.png",
    ";)": "iconfinder_02_EmoticonsHDcom_343145.png",
    "o{|": "iconfinder_03_EmoticonsHDcom_343126.png",
    ":x)": "iconfinder_04_EmoticonsHDcom_343148.png",
    ":*": "iconfinder_11_EmoticonsHDcom_343153.png",
    ":|": "iconfinder_14_EmoticonsHDcom_343141.png",
    "8)": "iconfinder_18_EmoticonsHDcom_343124.png",
    "8>": "iconfinder_19_EmoticonsHDcom_343161.png",
    ":o": "iconfinder_20_EmoticonsHDcom_343139.png",
    "3:)": "iconfinder_22_EmoticonsHDcom_343170.png",
    "*_*": "iconfinder_26_EmoticonsHDcom_343122.png",
    "._.*": "iconfinder_28_EmoticonsHDcom_343128.png",
    "8o:": "iconfinder_30_EmoticonsHDcom_343169.png",
    "Dx:": "iconfinder_30_EmoticonsHDcom_343169.png",
    ":8*": "iconfinder_31_EmoticonsHDcom_343146.png",
    ":)": "iconfinder_32_EmoticonsHDcom_343171.png",
    "*,": "iconfinder_34_EmoticonsHDcom_343142.png",
    "8:D": "iconfinder_35_EmoticonsHDcom_343158.png",
    "*._.*": "iconfinder_36_EmoticonsHDcom_343143.png",
    "8o": "iconfinder_38_EmoticonsHDcom_343162.png",
    "^._.^": "iconfinder_39_EmoticonsHDcom_343137.png",
    ":/": "iconfinder_42_EmoticonsHDcom_343138.png",
    "^=^": "iconfinder_46_EmoticonsHDcom_343155.png",
    ":lol:": "iconfinder_49_EmoticonsHDcom_343130.png",
    ":'D": "iconfinder_49_EmoticonsHDcom_343130.png",
    ":')": "iconfinder_49_EmoticonsHDcom_343130.png",
    "xD": "iconfinder_49_EmoticonsHDcom_343130.png",
    "XD": "iconfinder_49_EmoticonsHDcom_343130.png",
    "*^_^*": "iconfinder_50_EmoticonsHDcom_343163.png",
    ".^_^.": "iconfinder_50_EmoticonsHDcom_343163.png",
    ":z": "iconfinder_51_EmoticonsHDcom_343165.png",
    ":}": "iconfinder_51_EmoticonsHDcom_343165.png",
    ":3": "iconfinder_51_EmoticonsHDcom_343165.png",
    ":<3": "iconfinder_56_EmoticonsHDcom_343159.png",
    "':D": "iconfinder_58_EmoticonsHDcom_343166.png",
    ":'o": "iconfinder_59_EmoticonsHDcom_343167.png",
    ":'(": "iconfinder_59_EmoticonsHDcom_343167.png",
    "'^o^'": "iconfinder_61_EmoticonsHDcom_343131.png",
    "(^_^)": "iconfinder_65_EmoticonsHDcom_343144.png",
    "^_^)": "iconfinder_69_EmoticonsHDcom_343154.png",
    "^_^": "iconfinder_69_EmoticonsHDcom_343154.png",
    ";):": "iconfinder_67_EmoticonsHDcom_343136.png",
    ">:(": "iconfinder_70_EmoticonsHDcom_343164.png",
    ">:/": "iconfinder_70_EmoticonsHDcom_343164.png",
    ">:@": "iconfinder_70_EmoticonsHDcom_343164.png",
    "<(": "iconfinder_71_EmoticonsHDcom_343132.png",
    "=_=": "iconfinder_79_EmoticonsHDcom_343140.png"

};

var Chat = {};
Chat.msgId = 0;

Chat.msgFrom = function (data){
  
   
    var name = `<div class="reply" data-msg="${data.chatMsg}" data-from="${data.fromName}">(رد)</div>
                <div class="name">[${data.fromName}]:</div> `;
    
    for(var iii in data.playerTitle){
     
        console.log(iii);
        name += `<div class="rank-title rank-${iii}">${data.playerTitle[iii]}</div>`;
    }
    return name;
};

Chat.worldMessage = function (data){
    
    var user_group_class = data.userGroup;
    var chatMsg = Extract.coords(extractEmjoi(extractUrl(data.chatMsg)));
    var idMsg = (++Chat.msgId);
    var msgContent = ``;
    if(data.quoted){
        
        msgContent = `  <div class="with-reply">
                            <p class="quote ellipsis">[${data.quoteFrom}]: ${data.quote}</p>
                            <p class="q-r msg-text" data-msg-org="${data.chatMsg}">${chatMsg}</p>
                        </div>`;
    }else{
        msgContent = `<p class="msg-text flex"  data-msg-org="${data.chatMsg}">
                        ${chatMsg}
                     </p>`;
    }
    
    var msg = `<div id="mg-id-${idMsg}" data-id-msg="${data.idFrom}-${data.idMsg}" 
                    class="msg-unit world_chat ${"user-group-"+user_group_class}" 
                    data-id-player="${data.idFrom}" data-avatar="${data.p_avatar}" 
                    data-name="${data.fromName}" data-user-group="${data.userGroup}">
                    <div class="msg-from flex">
                        ${Chat.msgFrom(data)}
                    </div>
                    <div class="msg-body flex">${msgContent}</div>
                </div>`;
    
    UserLag.TranslateChatMsg({id: idMsg, text: data.chatMsg});
    var htmlMsg = $($.parseHTML(msg));
    htmlMsg.children(".msg-from").children(".rank-title").css("width" , "60px");
    setTimeout(function (){
        htmlMsg.children(".msg-from").children(".rank-title").css("width" , "15px");
    },1000);
    
    $("#msg-area").append(htmlMsg);
  
};

Chat.guildMessage = function (data){
    
    var user_group_class = data.userGroup;
    var chatMsg = Extract.coords(extractEmjoi(extractUrl(data.chatMsg)));
    var idMsg = (++Chat.msgId);

    var msg = `<div id="mg-id-${idMsg}" class="msg-unit guild_msg" data-id-player="${data.idFrom}" data-avatar="${data.playerAvatar}" data-name="${data.fromName}">
                    <div class="msg-from flex">
                        ${Chat.msgFrom(data)}
                    </div>
                    <div class="msg-body flex">
                        <p class="msg-text flex" data-msg-org="${data.chatMsg}">
                           ${chatMsg}
                        </p>
                    </div>
                </div>`;
    
    UserLag.TranslateChatMsg({id: idMsg, text: data.chatMsg});
    var htmlMsg = $($.parseHTML(msg));
    htmlMsg.children(".msg-from").children(".rank-title").css("width" , "60px");
    setTimeout(function (){
        htmlMsg.children(".msg-from").children(".rank-title").css("width" , "15px");
    },1000);
    $("#msg-area").append(htmlMsg);
};

$(document).on("click", "#msg-area .msg-from  .rank-title", function () {
    
    if($(this).hasClass("active")){
        $(this).css({"width": "10px", "margin-left": "0px"});
        $(this).removeClass("active");
    }else{
        $(this).css({"width": "60px", "margin-left": "5px"});
        $(this).addClass("active");
    }
});




Chat.append =  function (message){
    
    console.log(message)
   
    var msg = `<div class="msg-unit"  >
                            <div class="msg-body">
                                <P>
                                   ${message}
                                </P>
                            </div>
                        </div>`;
            $("#msg-area").append(msg);
            
            if($("#msg-area").getNiceScroll(0).page.maxh - $("#msg-area").getNiceScroll(0).getScrollTop() < 5 ){
                setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
            }
            
    
};




var Announce = {};


Announce.queu = [];

Announce.global = function (text){
    
    Announce.queu.push(text);
    
    setTimeout(()=>{
        
        var duration = 6000;
        var dest     = -500;
        var container = $("#global-announce"); 
        
        
        $("#global-announce .wrapper .text").html(Announce.queu[0]);
        console.log(Announce.queu[0])
        container.css("transform", "rotateX(0deg)");


        setTimeout(()=>{

            container.attr("date-statge" , "1");
            $("#global-announce .text").animate({right: dest},{
                duration : duration, 

                complete: function (){

                    container.removeAttr("style");  
                    $("#global-announce .wrapper .text").removeAttr("style");  
                   // $("#global-announce .wrapper .text").html("");
                    Announce.queu.splice(0,1);
                },
                step: function (now , fx){

                    container.attr("data-now" , Math.floor((now * duration) / dest));
                        
                }

            });

        }, 1800 + duration - Number(container.attr("data-now")) , container);
        
        
    } , (Announce.queu.length-1)*9000);
    
    
    
};



$(document).on("click", "#msg-area .reply", function (){
    
    var msg  = $(this).attr("data-msg");
    var from = $(this).attr("data-from");
    
    var Quot =  `
                <button class="close-btn"></button>
                <div class="msg-to-reply ellipsis">
                    <bold>[${from}]: </bold>${msg}
                </div>`;
    
    $("#input-area .quote-wrapper").html(Quot);
    $("#input-area .quote-wrapper").attr("data-quote", msg);
    $("#input-area .quote-wrapper").attr("data-from", from);
    $("#input-area .quote-wrapper .msg-to-reply").width("100%");
    $("#input-area .quote-wrapper").attr("data-has-quote", "true");
    
});


$(document).on("click", "#input-area .quote-wrapper .close-btn", function (){
    $("#input-area .quote-wrapper").attr("data-has-quote", "false");
    $("#input-area .quote-wrapper").removeAttr("data-quote");
    $("#input-area .quote-wrapper").removeAttr("data-from");
    $("#input-area .quote-wrapper").html("");
});

$(document).on("keyup" , "#input-chat input" , function (e){
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.keyCode === 13) {
        
        $("#expand-chat .send").click();
        
    }
});


$(document).on("click" , "#expand-chat .send" , function (){
    
    
    var chat_to = $("#chat-to").attr("data-chat-to");
    
    if(!chat_to){
        
        chat_to = "world";
    }
    
    var msg = $("#input-chat input").val();
    
    if(msg.length < 1){
        
        return ;
        
    }
    
    if(Elkaisar.DPlayer.Player.porm < 2 && chat_to === "world"){
        alert_box.confirmMessage("لا يمكنك استعمال الشات ورتبتك اقل من رقيب\n يمكنك استعمال الخاص او شات الحلف وطلب تفعيل الشات من الادارة ");
        return ;
    }
    
    
    if(chat_to === "world" && player.chat_panne > Date.now()/1000){
        alert_box.confirmMessage("  لقد قام المراقب بحظرك من الشات  <br/>\n\
                                            اذا ان لديك اى شكوى يمكنك تقديمها فى صندوق الشكاوى <a href='http://forum.elkaisar.com/index.php?forums/14/' target='_blank'>هنا</a>");
        $("#input-chat input").val("");
        return ;
    }
    
    var quoteWrapper = $("#input-area .quote-wrapper");
    
    if(quoteWrapper.attr("data-has-quote") === "true"){
        
        var json_obj = {
            url: "Chat/sendMsg",
            data:{
                chat_to: chat_to,
                chat_msg:msg,
                p_name: player.name,
                idPlayer:ID_PLAYER,
                p_avatar: player.avatar,
                quoted:true,
                quote: quoteWrapper.attr("data-quote"),
                quoteFrom: quoteWrapper.attr("data-from")
            }
        };
       
    }else{
        
        var json_obj = {
        
            url: "Chat/sendMsg",
            data:{
                chat_to: chat_to,
                chat_msg:msg,
                p_avatar: player.avatar,
                id_guild:player.id_guild,
            }
        };
    }
    
    
        
    ws.send(JSON.stringify(json_obj));
    $("#input-chat input").val("");
    $("#input-area .quote-wrapper .close-btn").click();

    
});





$(document).on("click",".select-list", function (){
    
    var active = $(this).attr("data-active");
    
    if(active === "true"){
        
        $(this).attr("data-active", "false");
        $(this).children(".option").children("ul").hide();
        $(this).children(".option").animate({"height" :  0})
        
    }else{
        $(this).attr("data-active", "true");
        $(this).children(".option").animate({"height" :  "266px"}, function () {
            $(this).children("ul").show();
        });
    }
    
});




Elkaisar.Ui.Select.menuList = function (list, selectedIndex){
    
    var optionList = "";
    
    for(var iii in list){
        if(Number(iii) === Number(selectedIndex)){
            optionList += `<li class="unit-option selected-op" data-title="${list[iii].title}" data-value="${list[iii].value}">${list[iii].title}</li>`;
        }else{
            optionList += `<li class="unit-option" data-title="${list[iii].title}" data-value="${list[iii].value}" data-index="${iii}">${list[iii].title}</li>`;
        }
    }
    
    return `<ul>${optionList}</ul>`;
};


Elkaisar.Ui.Select.make = function (list , selectedIndex){
    
    selectedIndex = selectedIndex || 0;
    
    
    
    return `
            <div class="select-list" data-value="${list[selectedIndex].value}" data-active="false">
                <div class="select select-input">
                    <div class="value">${list[selectedIndex].title}</div>
                </div>
                <div class="option">${this.menuList(list, selectedIndex)}</div>
            </div>`;
    
};


$(document).on("click", ".select-list .unit-option", function (){
    
    var title = $(this).attr("data-title");
    var value = $(this).attr("data-value");
    
    $(".select-list .unit-option").removeClass("selected-op");
    $(this).addClass("selected-op");
    
   $(".select-list").attr("data-value", value);
   $(".select-list .value").html(title);
    
    
});