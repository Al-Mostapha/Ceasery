Elkaisar.Item.useItemFunc = function ()
{
    
    Elkaisar.BaseData.Items[`motiv_60`][`UseFunc`]       = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMotivSpeech`,
            type: 'POST',  
            data:{
                Item: "motiv_60",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                    Elkaisar.Building.refreshView();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`motiv_7`][`UseFunc`]        = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMotivSpeech`,
            type: 'POST',  
            data:{
                Item: "motiv_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Fixed.refresePlayerStateList();
                    Elkaisar.Building.refreshView();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`prot_pop`][`UseFunc`]       = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useProtPop`,
            type: 'POST',  
            data:{
                Item: "prot_pop",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.CurrentCity.City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`peace`][`UseFunc`]          = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useCeaseFire`,
            type: 'POST',  
            data:{
                Item: "peace",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    Elkaisar.BaseData.Items[`a_play`][`UseFunc`]         = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useTheatrics`,
            type: 'POST',  
            data:{
                Item: "a_play",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.CurrentCity.City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`medical_moun`][`UseFunc`]   = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMedicalStatue`,
            type: 'POST',  
            data:{
                Item: "medical_moun",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`mediacl_statue`][`UseFunc`] = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMedicalStatue`,
            type: 'POST',  
            data:{
                Item: "mediacl_statue",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`sparta_stab`][`UseFunc`]    = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useAttackAdvancer`,
            type: 'POST',  
            data:{
                Item: "sparta_stab",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`qulinds_shaft`][`UseFunc`]  = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useAttackAdvancer`,
            type: 'POST',  
            data:{
                Item: "qulinds_shaft",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`marmlo_helmet`][`UseFunc`]  = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useDefenceAdvancer`,
            type: 'POST',  
            data:{
                Item: "marmlo_helmet",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`march_prot`][`UseFunc`]     = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useDefenceAdvancer`,
            type: 'POST',  
            data:{
                Item: "march_prot",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`certain_move`][`UseFunc`]   = function (amount)
    {
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useCertainMove`,
            type: 'POST',  
            data:{
                Item   : "certain_move",
                amount : amount,
                idCity : Elkaisar.CurrentCity.City.id_city,
                newX   : Number($("#new-city-x-coord").val()),
                newY   : Number($("#new-city-y-coord").val()),
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
               
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    alert_box.succesMessage("قد تم نقل مدينتك بنجاح الى الاحداثيات الاتية <br/>"+"[ "+Elkaisar.CurrentCity.City.x+" , "+Elkaisar.CurrentCity.City.y+" ]");
                    Elkaisar.City.getCityBase().done(function (data){
                        
                        $("#city-data .coords").html("[ "+Elkaisar.CurrentCity.City.y+" , "+Elkaisar.CurrentCity.City.x+" ]");
                     
                        if($("#WorldCity").attr("data-view") === "world"){
                            $("#x_coord-input input").val(Elkaisar.CurrentCity.City.x);
                            $("#y_coord-input input").val(Elkaisar.CurrentCity.City.y);
                            $("#nav-btn button").click();
                        }
                        
                    });
                    
                }else if(JsonObject.state === "error_no_place_empty"){
                    setTimeout(function (){alert_box.confirmMessage("للاسف لا يمكنك نقل المدينة فى هذ المكان حيث ان المكان ليس خالى :]");}, 500)
                }else {
                    alert(data);
                    console.log(data)
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`wheat_1`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useWheat`,
            type: 'POST',  
            data:{
                Item: "wheat_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`wheat_7`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useWheat`,
            type: 'POST',  
            data:{
                Item: "wheat_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`stone_1`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useStone`,
            type: 'POST',  
            data:{
                Item: "stone_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`stone_7`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useStone`,
            type: 'POST',  
            data:{
                Item: "stone_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`wood_1`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useWood`,
            type: 'POST',  
            data:{
                Item: "wood_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`wood_7`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useWood`,
            type: 'POST',  
            data:{
                Item: "wood_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`metal_1`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMetal`,
            type: 'POST',  
            data:{
                Item: "metal_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`metal_7`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useMetal`,
            type: 'POST',  
            data:{
                Item: "metal_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`coin_1`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useCoin`,
            type: 'POST',  
            data:{
                Item: "coin_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    
    Elkaisar.BaseData.Items[`coin_7`][`UseFunc`]     = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemUse/useCoin`,
            type: 'POST',  
            data:{
                Item: "coin_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });
        
    };
    

    
};




Elkaisar.Item.useItemBoxFunc = function (){
    
    
    Elkaisar.BaseData.Items[`gift_box`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useGiftBox`,
            type: 'POST', 
            data:{
                Item: "gift_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`wood_box`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useWoodBox`,
            type: 'POST', 
            data:{
                Item: "wood_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`golden_box`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useGoldenBox`,
            type: 'POST',  
            data:{
                Item: "golden_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`beginner_back_1`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_2`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_2",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_3`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_3",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_4`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_4",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_5`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_5",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_6`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_6",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_7`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_8`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_8",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_9`][`UseFunc`]  = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_9",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`beginner_back_10`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',  
            data:{
                Item: "beginner_back_10",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    showMatrialGiftList(JsonObject.Item);
                    for(var iii in JsonObject.Item){
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_box`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useArmyBox`,
            type: 'POST',  
            data:{
                Item: "army_box",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_army_view();
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_3p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_3p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_4p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_4p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_5p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_5p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_6p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_6p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityBase(idCity);
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_7p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_7p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`tagned_8p`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',  
            data:{
                Item: "tagned_8p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`coin_a`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "coin_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`coin_b`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "coin_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`coin_c`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "coin_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
        
    Elkaisar.BaseData.Items[`coin_d`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "coin_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
        
    Elkaisar.BaseData.Items[`food_a`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST', 
            data:{
                Item: "food_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
        
    Elkaisar.BaseData.Items[`food_b`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "food_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
        
    Elkaisar.BaseData.Items[`food_c`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "food_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`food_d`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "food_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`wood_a`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "wood_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`wood_b`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "wood_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`wood_c`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "wood_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`wood_d`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "wood_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`stone_a`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "stone_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`stone_b`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "stone_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`stone_c`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "stone_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`stone_d`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "stone_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`metal_a`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "metal_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    

    
    Elkaisar.BaseData.Items[`metal_b`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "metal_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`metal_c`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "metal_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`metal_d`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',  
            data:{
                Item: "metal_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
};

Elkaisar.Item.useArmyBackFunc = function ()
{
    Elkaisar.BaseData.Items[`army_all_1`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackMini`,
            type: 'POST',  
            data:{
                Item: "army_all_1",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_all_2`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackMedium`,
            type: 'POST',  
            data:{
                Item: "army_all_2",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_all_3`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackLarge`,
            type: 'POST',  
            data:{
                Item: "army_all_3",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_a_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackA100`,
            type: 'POST',  
            data:{
                Item: "army_a_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`army_b_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackB100`,
            type: 'POST',  
            data:{
                Item: "army_b_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_c_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackC100`,
            type: 'POST',  
            data:{
                Item: "army_c_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_d_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackD100`,
            type: 'POST',  
            data:{
                Item: "army_d_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_e_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackE100`,
            type: 'POST',  
            data:{
                Item: "army_e_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_f_100`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackF100`,
            type: 'POST',  
            data:{
                Item: "army_f_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_a_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackA1000`,
            type: 'POST',  
            data:{
                Item: "army_a_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`army_b_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackB1000`,
            type: 'POST',  
            data:{
                Item: "army_b_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_c_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackC1000`,
            type: 'POST',  
            data:{
                Item: "army_c_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_d_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackD1000`,
            type: 'POST',  
            data:{
                Item: "army_d_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_e_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackE1000`,
            type: 'POST',  
            data:{
                Item: "army_e_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`army_f_1000`][`UseFunc`] = function (amount)
    {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        return $.ajax({
            url: `${API_URL}/api/AItemArmyPack/useArmyPackF1000`,
            type: 'POST',  
            data:{
                Item: "army_f_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
};