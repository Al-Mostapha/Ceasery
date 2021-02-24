Elkaisar.WsLib.Hero = {};

Elkaisar.WsLib.Hero.Power = {};

Elkaisar.WsLib.Hero.Power.Added = function (data)
{
    
    for(var iii in data.Heros)
    {
        if(Elkaisar.Hero.getHero(data.Heros[iii].idHero))
            if(Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero)
                Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero.power = data.Heros[iii].power;
        
        if(Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(data.Heros[iii].idHero)){
            if($("#dialg_box[type=hero]").length > 0){
                $("#dialg_box .middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
            }
        }
    }
    
};


Elkaisar.WsLib.Hero.Back = function (data){
    
    var hero  = Elkaisar.Hero.getHero(data.idHero);
    var msg = ` تم عودة البطل ${data.HeroName} من ${BATTAL_TASKS[data.Task].ar_title}  [${data.xTo},${data.yTo}] الى المدينة ${data.CityName} `;
    PLAYER_NOTIF.hero_in_battel -= 1;


    if(Number(data.Task) === BATTEL_TYPES_CONST.GARRISON){
        msg = ` تم ارسال البطل ${hero.Hero.name}  بنجاح الى [${data.xTo},${data.yTo}] لبدء عملية الامداد`;
    }

    hero.Hero.in_city = data.inCity; 
    if(Number(data.Task) === BATTEL_TYPES_CONST.SUPPLY){
        
        var idCity = Number(Elkaisar.CurrentCity.City.id_city);
        var cityTo = Elkaisar.City.getCityByCoord(data.xTo, data.yTo);
       
        Elkaisar.City.getCityHero(cityTo.City.id_city);
        Elkaisar.City.getCityHeroArmy(cityTo.City.id_city);
        Elkaisar.City.getCityHeroMedal(cityTo.City.id_city);
        Elkaisar.City.getCityHeroEquip(cityTo.City.id_city);
        
    }



    alert_box.systemChatMessage(msg);
    Fixed.refreshPlayerNotif();
    city_profile.refresh_hero_view();
};