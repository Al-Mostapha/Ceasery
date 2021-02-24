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