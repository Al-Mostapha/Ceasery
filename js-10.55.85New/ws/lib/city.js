Elkaisar.WsLib.City = {};
Elkaisar.WsLib.Market = {};

Elkaisar.WsLib.City.Pop = {}

Elkaisar.WsLib.City.Pop.Update = function (data){
    
    Elkaisar.City.getCityBase(data.idCity);
    
};

Elkaisar.WsLib.City.Pop.UpdateLoy = function (data){
    
    Elkaisar.City.getCityBase(data.idCity);
    
};


Elkaisar.WsLib.City.WorldCity = function (data){
    
    
    
};

Elkaisar.WsLib.Market.Trans = {};
Elkaisar.WsLib.Market.Buy = {};


Elkaisar.WsLib.Market.Trans.Arrived = function (){

    if($("#transport-res-inner-nav .nav-title").length)
        Market.transportedResourcesList($("#transport-res-inner-nav .nav-title").attr("data-in-out"));
    
    PLAYER_NOTIF.msg_diff = Number(PLAYER_NOTIF.msg_diff) + 1;
    Fixed.refreshPlayerNotif();
    alert_box.succesMessage("تم وصول الموارد");
};


Elkaisar.WsLib.Market.Buy.TransmitDone = function (){
    $("#market-inner-nav .selected").click();
    PLAYER_NOTIF.msg_diff = Number(PLAYER_NOTIF.msg_diff) + 1;
    Fixed.refreshPlayerNotif();
    alert_box.succesMessage("تم وصول الموارد");
};