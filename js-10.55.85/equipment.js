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