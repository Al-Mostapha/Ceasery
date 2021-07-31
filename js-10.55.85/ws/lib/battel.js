Elkaisar.WsLib.Battel = {};



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
    
    Animation.fireWorldUnit(data.x_to ,  data.y_to);
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