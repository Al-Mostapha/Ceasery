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
       
        Elkaisar.DPlayer.Heros[iii].Equip = {
           boot: null, armor: null, shield: null, helmet: null, 
           sword: null, belt: null, ring: null, steed: null, 
           pendant: null, necklace: null
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

Elkaisar.Equip.EquipList = {},
Elkaisar.Equip.getEquipData = function () {
    $['ajax']({
        'url': API_URL + '/js' + Elkaisar['Config']['JsVersion'] + '/json/equipment/' + UserLag['language'] + '.json',
        'success': function (data, _0x18a598, _0x1ed6f5) {
            Elkaisar['Equip']['EquipList'] = data;
            $['ajax']({
                'url': API_URL + '/api/APlayerEquip/getEquipPower',
                'data': {
                    'token': Elkaisar['Config']['OuthToken'],
                    'server': Elkaisar['Config']['idServer']
                },
                'success': function (DataI, _0x23bbdc, _0x2945f2) {
                    if (!Elkaisar['LBase']['isJson'](DataI))
                        return Elkaisar['LBase']['Error'](DataI);
                    var JsonData = JSON['parse'](DataI);
                    for (var ii in JsonData) {
                        Elkaisar['Equip']['EquipList'][`${JsonData[ii]['equip']}_${JsonData[ii]['part']}_${JsonData[ii]['lvl']}`]['Power'] = JsonData[ii];
                    }
                }
            });
        }
    });
}

 Elkaisar.Equip.getPlayerAmount = function (EquipType, Part, Lvl = 1) {
     
    var Count = 0x0;
    for (var ii in Elkaisar['DPlayer']['Equip']) {
        if (Elkaisar['DPlayer']['Equip'][ii]['type'] == EquipType 
                && Elkaisar['DPlayer']['Equip'][ii]['part'] == Part 
                && Elkaisar['DPlayer']['Equip'][ii]['lvl'] == Lvl)
            Count++;
    }
    return Count;
};
$(document)['on']('PlayerReady', 'html', function () {
    Elkaisar.Equip.getEquipData();
});

Elkaisar.Equip.EquipFeature = {
  0 : {
      Title: "لا توجد"
  }  ,
  1 : {
      Title : "وابل السهام أمام"
  },
  2 : {
      Title : "وابل سهام خلف"
  },
  3 : {
      Title : "الدرع"
  }
};

var Equipment = {
    
    secoundryList:["belt","necklace","pendant","ring","steed"],
    
    getName: function (equip , part, lvl = 1){
        
        if(!EQUIP_DATA[equip])
            return ;
        
        if(this.secoundryList.indexOf(part) > -1)
            return EQUIP_DATA[equip]["sec"][part][lvl].name;
            
        return EQUIP_DATA[equip][part].name;
    },
    getEquipData: function (equip , part , lvl){
        
        if(!Elkaisar.Equip.EquipList[`${equip}_${part}_${lvl}`])
            return {
                Power :{ 
                    anti_break: 0,
                    attack: 0,
                    break: 0,
                    damage: 0,
                    defence: 0,
                    equip: "",
                    immunity: 0,
                    lvl: 1,
                    part: "",
                    sp_attr: 0,
                    strike: 0,
                    vitality: 140
                    },
                  Texture2D: "Texture2D'/Game/images/equip/equip228.equip228'",
                desc: "تزيد من الحيوية والهجوم لدى القوات.",
                image: "images/equip/equip228.jpg",
                long_desc: "من معدّات إحتفالية العامين للقيصر, المخلصين والشجعان فقط من يحصلون عليها. علامةُ فارقة بين المعدّات والأسلحة.",
                name: "مصفح الـڤيكنج",
                orid: 197  
            };
        
        
        return Elkaisar.Equip.EquipList[`${equip}_${part}_${lvl}`];
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
        
    },
    
    'getData': function (Equip, Part, Lvl) {
        return Elkaisar['Equip']['EquipList'][Equip + '_' + Part + '_' + (Lvl || 0x1)];
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