Elkaisar.WsLib.Battel = {};

Elkaisar.WsLib.World = {};
Elkaisar.WsLib.World.Fire = {};
Elkaisar.WsLib.World.Battel = {};

Elkaisar.WsLib.World.ResetLvl = function (data){
    for (var ii in Elkaisar['worldAllUnits']) {
        if (Elkaisar['worldAllUnits'][ii]['ut'] === 0x0) continue;
        if (Elkaisar['worldAllUnits'][ii]['ut'] < WUT_MONAWRAT) continue;
        if (!data['UnitList']['includes'](Elkaisar['worldAllUnits'][ii]['ut'])) continue;
        Elkaisar['worldAllUnits'][ii]['l'] = 0x1;
    }
    alert_box['systemChatMessage']('تم اعادة التعين');
}



Elkaisar.WsLib.World.Battel.Started = function (data)
{
    var world_unit = WorldUnit.getWorldUnit(data.xCoord , data.yCoord);
    world_unit.s = 1;
    Animation.fireWorldUnit(data.xCoord, data.yCoord);
    Elkaisar.World.MapBattel.newBattel(data);
    
}


Elkaisar.WsLib.World.Battel.Ended = function (data)
{
    var world_unit = WorldUnit.getWorldUnit(data.xCoord , data.yCoord);
    Elkaisar.World.MapBattel.removeBattel(data);
    
}

Elkaisar.WsLib.World.Fire.On = function (data)
{
    var world_unit = WorldUnit.getWorldUnit(data.xCoord , data.yCoord);
    world_unit.s = 1;
    Animation.fireWorldUnit(data.xCoord, data.yCoord);
    
}

Elkaisar.WsLib.World.Fire.Off = function (data)
{
    var Unit = WorldUnit['getWorldUnit'](data['xCoord'], data['yCoord']);
    Unit['s'] = 0;
    WorldUnit.refreshUnitView(data.xCoord , data.yCoord);
}

Elkaisar.WsLib.World.RefereshWorldUnit = function (data){
    var WorldUnits = data['WorldUnits'];
    for (var ii in WorldUnits) {
        var Unit   = Elkaisar['worldAllUnits'][WorldUnits[ii]['x'] * 500 + WorldUnits[ii]['y']];
        Unit['t']  = WorldUnits[ii]['t'];
        Unit['ut'] = WorldUnits[ii]['ut'];
        Unit['l']  = WorldUnits[ii]['l'];
        WorldUnit.refreshUnitView(WorldUnits[ii]['x'], WorldUnits[ii]['y']);
    }
    Elkaisar.World.Map.getWorldCityColonized();
    Elkaisar.World.Map.getWorldCity();
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