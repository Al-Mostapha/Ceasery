Elkaisar.WsLib.ServerAnnounce = {};

Elkaisar.WsLib.ServerAnnounce.capitalUnLock = function (data){
    
    var WorldUnit = WorldUnit.getWorldUnit(data.WorldUnit.x, data.WorldUnit.y);
    
    var msg = `<div class="msg-unit ann-red announce">تم فتح ${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title} ${Extract.coords(`[${WorldUnit.x},${WorldUnit.y}]`)} وسيتم اغلاقها بعد ساعتين من الان للمساعدة اضغط <a class="safe-url" href="commingsoon.php" target="_blank">هنا </a></div>`;
    Chat.append(msg);
};



Elkaisar.WsLib.ServerAnnounce.capitalLock = function (data){
    
    var playerName = "لا احد";
    if($.isArray(data.players) && data.players.length > 0)
        playerName = data.players[0].name;
    
    var WorldUnit = WorldUnit.getWorldUnit(data.WorldUnit.x, data.WorldUnit.y);
    
    var msg = `<div class="msg-unit announce user-group-5">تم اغلاق ${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title} ${Extract.coords(`[${WorldUnit.x},${WorldUnit.y}]`)} و كان الفوز بالمركز الاول من  نصيب&nbsp;<span class="ann-red"> ${playerName} </span> </div>`;
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
    
};