

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
}