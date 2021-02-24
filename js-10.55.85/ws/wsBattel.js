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
    
    if(WorldUnit.isArmyCapital(unit.ut)){
        
        alert_box.systemChatMessage(`<p class="round-announce">بداء <span class="red">${battel.attackerName} </span>بالهجوم على  <span class="red">${Elkaisar.World.UnitTypeData[unit.ut].Title}</span> 
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
});