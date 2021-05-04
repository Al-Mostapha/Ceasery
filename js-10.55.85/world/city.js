var city_building;


Elkaisar.City.getCity = function (idCity)
{

    if (!idCity)
        return Elkaisar.CurrentCity;

    for (var id in Elkaisar.DPlayer.City)
        if (Number(id) === Number(idCity))
            return Elkaisar.DPlayer.City[id];

    return Elkaisar.CurrentCity;
};


Elkaisar.City.getCityBase = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;


    return $.ajax({
        url: `${API_URL}/api/ACity/refreshCityBase`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            var City = JSON.parse(data);


            Elkaisar.City.getCity(idCity).City = JSON.parse(data);
            city_profile.refresh_resource_view();
            city_profile.refresh_army_view();
            city_profile.refresh_hero_view();
            city_profile.refresh_wild_view();
            Elkaisar.City.refreshBtnList();

        }
    });

};

Elkaisar.City.getCityBuilding = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;

    return $.ajax({
        url: `${API_URL}/api/ACityBuilding/getCityBuilding`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var City = JSON.parse(data);

            Elkaisar.City.getCity(idCity).BuildingLvl = City.lvl;
            Elkaisar.City.getCity(idCity).BuildingType = City.type;


        }
    });

};


Elkaisar.City.getCityJop = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityJop/getCityJop`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);


            Elkaisar.City.getCity(idCity).Jop = JSON.parse(data);


        }
    });

};

Elkaisar.City.getCityWounded = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityWounded/getCityWounded`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            Elkaisar.City.getCity(idCity).Wounded = JSON.parse(data);


        }
    });

};

Elkaisar.City.getCityStorage = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityStorage/getCityStorage`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            Elkaisar.City.getCity(idCity).Storage = JSON.parse(data);


        }
    });

};


Elkaisar.City.getCityBarray = function (idCity)
{

    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;

    return $.ajax({
        url: `${API_URL}/api/ACityBarrary/getCityBarray`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            Elkaisar.City.getCity(idCity).Barray = JSON.parse(data);
            city_profile.refresh_wild_view();
            $(".for_building .left-nav .selected").click();

        }
    });

};


Elkaisar.City.getCityGarrison = function (idCity)
{

    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;


    return $.ajax({
        url: `${API_URL}/api/ACityPalace/getCityGarrison`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity,
            xCoord: Elkaisar.City.getCity(idCity).City.x,
            yCoord: Elkaisar.City.getCity(idCity).City.y
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            Elkaisar.City.getCity(idCity).Garrison = JSON.parse(data);

        }
    });

};

Elkaisar.City.getCityHeroTheater = function (idCity)
{
    if (!idCity)
        idCity = Elkaisar.CurrentCity.idCity;


    return $.ajax({
        url: `${API_URL}/api/ACityHero/refreshHeroTheater`,
        type: 'POST',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            Elkaisar.City.getCity(idCity).HeroTheater = JSON.parse(data);

        }
    });
};

Elkaisar.City.getCityHero = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityHero/getCityHero`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            var HeroList = JSON.parse(data);

            for (var iii in HeroList) {

                if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
                    Elkaisar.DPlayer.Heros.push({idHero: HeroList[iii].id_hero});

                var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);

                Hero.Hero = HeroList[iii];
                Hero.idHero = HeroList[iii].id_hero;


            }

            Elkaisar.Hero.orderHeors();
            if (!Elkaisar.CurrentHero.Hero && Elkaisar.DPlayer.Heros[0])
                Elkaisar.CurrentHero = Elkaisar.Hero.getHero(Elkaisar.DPlayer.Heros[0].idHero);

            Elkaisar.City.getCityHeroEquip(idCity);
            city_profile.refresh_hero_view();
        }
    });

};

Elkaisar.City.getCityHeroArmy = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityHero/getCityHeroArmy`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            var HeroList = JSON.parse(data);

            for (var iii in HeroList) {

                if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
                    Elkaisar.DPlayer.Heros.push({idHero: HeroList[iii].id_hero});


                var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);
                Hero.Army = HeroList[iii];
                Hero.idHero = HeroList[iii].id_hero;

            }


        }
    });

};

Elkaisar.City.getCityHeroMedal = function (idCity)
{


    if (!idCity)
        idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({
        url: `${API_URL}/api/ACityHero/getCityHeroMedal`,
        type: 'GET',
        data: {
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idCity: idCity
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);

            var HeroList = JSON.parse(data);

            for (var iii in HeroList) {

                if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
                    Elkaisar.DPlayer.Heros.push({idHero: HeroList[iii].id_hero});


                var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);
                Hero.Medal = HeroList[iii];
                Hero.idHero = HeroList[iii].id_hero;
            }


        }
    });

};


Elkaisar.City.getCityHeroEquip = function (idCity)
{

    Elkaisar.Equip.distributeEquip();

};


Elkaisar.City.getCityByCoord = function (xCoord, yCoord) {

    for (var iii in Elkaisar.DPlayer.City) {

        if (Number(Elkaisar.DPlayer.City[iii].City.x) !== Number(xCoord))
            continue;
        if (Number(Elkaisar.DPlayer.City[iii].City.y) !== Number(yCoord))
            continue;

        return Elkaisar.DPlayer.City[iii];
    }

    return Elkaisar.CurrentCity;
};


Elkaisar.City.RefreshCityHeros = function (idCity) {

    Elkaisar.City.getCityHero(idCity);
    Elkaisar.City.getCityHeroArmy(idCity);
    Elkaisar.City.getCityHeroMedal(idCity);
    Elkaisar.City.getCityHeroEquip(idCity);

};





Elkaisar.City.refreshBtnList = function ()
{
    var BtnList = "";
    var idCity = Number(Elkaisar.CurrentCity.idCity);
    for (var iii = Object.keys(Elkaisar.DPlayer.City).length - 1; iii >= 0; iii--) {

        var CCity = Elkaisar.DPlayer.City[Object.keys(Elkaisar.DPlayer.City)[iii]];

        if (!CCity.City)
        {
            continue;
        }

        var console_hero = Elkaisar.Hero.getHero(CCity.City.console);
        BtnList += `<li data-index="${iii}" data-id-city="${CCity.City.id_city}" ${idCity === Number(CCity.City.id_city) ? `class="selected"` : ""}>
                                 <div class="console pull-R" style="background-image: url(${console_hero ? Elkaisar.BaseData.HeroAvatar[console_hero.Hero.avatar] : "images/world/city-list/no-console.png"})">
                                        <label class="stroke">${CCity.City.name}</label>
                                 </div>
                                <button class="nav-to-city pull-L" data-x-coord="${CCity.City.x}" data-y-coord="${CCity.City.y}"></button>
                             </li>`;

    }

    $("#player-city-list ul").html(BtnList);
    if ($("#player-city-list ul .selected").length <= 0)
        $("#player-city-list ul li:last-child").addClass("selected");
};


Elkaisar.City.prepareCity = function (idCity)
{
    Elkaisar.DPlayer.City[idCity] = {idCity: idCity};

    if(Number(idCity) === Number(Elkaisar.Config.idCities[0]))
        Elkaisar.CurrentCity = Elkaisar.City.getCity(idCity);

    Elkaisar.City.getCityJop(idCity).done(function (data) {

        Elkaisar.City.getCityBase(idCity).done(function () {

            setInterval(function () {
                resourcesRefresh();
                refreshTime();

            }, 3500);
            Elkaisar.City.getCityBuilding(idCity).done(function () {
                Elkaisar.City.getCityGarrison(idCity);
                Elkaisar.Building.getJsonData().done(function () {
                    if(Number(idCity) === Number(Elkaisar.Config.idCities[0])){
                        Crafty.enterScene("city");
                        $("#loader-layer").remove();
                    }
                });

            });

        });


        Elkaisar.TimedTask.getCityBuildingTasks(idCity);
        Elkaisar.TimedTask.getCityStudyTasks(idCity);
        Elkaisar.TimedTask.getCityJopTasks(idCity);
        Elkaisar.TimedTask.getCityArmyTasks(idCity);


        Elkaisar.City.getCityBarray(idCity);
        Elkaisar.City.getCityWounded(idCity);

        Elkaisar.City.getCityStorage(idCity);

        Elkaisar.City.getCityHero(idCity).done(function () {
            Elkaisar.City.getCityHeroArmy(idCity);
            Elkaisar.City.getCityHeroEquip(idCity);
            Elkaisar.City.getCityHeroMedal(idCity);
            Elkaisar.City.refreshBtnList();
        });




    });



}
$(document).on("PlayerReady", "html", function () {


    for (var ii in Elkaisar.Config.idCities)
    {
        Elkaisar.City.prepareCity(Elkaisar.Config.idCities[ii]);
    }





});



var city_heros = [];
var city_floor;
var interv = false;
var BuildingConstData = [
    {
        image: "images/city/no_building.png", // مكان خالى0
        icon: "images/building/building01.jpg",
        nav_bar: [],
        sprit_name: "no_building",
        hitArea: [83, 46, 4, 84, 83, 120, 155, 85]
    },
    {
        image: "images/city/_B1.png", // كوخ1
        icon: "images/building/building01.jpg",
        nav_bar: NavBar.Building.Cottage,
        getCondetion: function (lvl) {

            var condtions = [];
            var palace_lvl = Math.max(lvl - 1, 1);

            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: palace_lvl,
                txt: "القصر مستوى " + getArabicNumbers(palace_lvl)
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B1",
        hitArea: [138, 66, 79, 40, 23, 70, 83, 112, 138, 96]

    },
    {
        image: "images/city/_B2.png", //2 مخزن 
        icon: "images/building/building02.jpg",
        nav_bar: NavBar.Building.Warehouse,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.COTTAGE,
                lvl: lvl_array[lvl - 1],
                txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B2",
        hitArea: [119, 87, 79, 106, 40, 89, 41, 60, 72, 25, 103, 36, 120, 56]
    },
    {
        image: "images/city/_B3.png", //3 ثكنات
        icon: "images/building/building03.jpg",
        nav_bar: NavBar.Building.Barracks,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                lvl: lvl_array[lvl - 1],
                txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B3",
        hitArea: [131, 89, 82, 116, 27, 88, 27, 59, 85, 30, 126, 50]
    },
    {
        image: "images/city/_B4.png", //4 اسطبل
        icon: "images/building/building04.jpg",
        nav_bar: NavBar.Building.Stable,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                lvl: lvl_array[lvl - 1],
                txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B4",
        hitArea: [129, 92, 76, 118, 22, 92, 63, 30, 120, 48]
    },
    {
        image: "images/city/_B5.png", //5 ورشة عمل
        icon: "images/building/building05.jpg",
        nav_bar: NavBar.Building.Workshop,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                lvl: lvl_array[lvl - 1],
                txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B5",
        hitArea: [79, 28, 135, 60, 137, 90, 88, 112, 24, 90, 23, 55]
    },
    {
        image: "images/city/_B6.png", // 6 مسرح
        icon: "images/building/building06.jpg",
        nav_bar: NavBar.Building.Amphitheatre,
        getCondetion: function (lvl) {
            var lvl_array = [2, 2, 2, 2, 5, 5, 5, 5, 9, 9, 12, 12, 12, 12, 15, 15, 15, 15, 19, 19, 22, 22, 22, 22, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.COTTAGE,
                lvl: lvl_array[lvl - 1],
                txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B6",
        hitArea: [123, 36, 38, 37, 32, 92, 75, 106, 127, 93, 139, 67]
    },
    {
        image: "images/city/_B7.png", //7 مركز  
        icon: "images/building/building08.jpg",
        nav_bar: NavBar.Building.BarterCenter,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.COTTAGE,
                lvl: lvl_array[lvl - 1],
                txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B7",
        hitArea: [133, 84, 82, 112, 31, 95, 37, 68, 56, 57, 55, 36, 82, 27, 119, 44]
    },
    {
        image: "images/city/_B8.png", //8  جامعة
        icon: "images/building/building09.jpg",
        nav_bar: NavBar.Building.University,
        getCondetion: function (lvl) {
            var lvl_array = [2, 2, 2, 2, 5, 5, 5, 5, 9, 9, 12, 12, 12, 12, 15, 15, 15, 15, 19, 19, 22, 22, 22, 22, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array[lvl - 1],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B8",
        hitArea: [75, 24, 138, 56, 140, 85, 79, 117, 20, 88, 24, 60]
    },
    {
        image: "images/city/_B9.png", // 9  اكاديمية
        icon: "images/building/building10.jpg",
        nav_bar: NavBar.Building.Academy,
        getCondetion: function (lvl) {
            var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var lvl_array_uni = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                lvl: lvl_array_uni[lvl - 1],
                txt: "الجامعة مستوى " + getArabicNumbers(lvl_array_uni[lvl - 1])
            };
            condtions[1] = {
                type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                lvl: lvl_array_hos[lvl - 1],
                txt: "البلازا  مستوى " + getArabicNumbers(lvl_array_hos[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B9",
        hitArea: [75, 24, 138, 56, 140, 85, 79, 117, 20, 88, 24, 60]
    },
    {
        image: "images/city/_B10.png", //10 دار المساعدة
        icon: "images/building/building11.jpg",
        nav_bar: NavBar.Building.Temple,
        getCondetion: function (lvl) {
            var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_hos[lvl - 1],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_hos[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        helpers: [
            {
                title: "المساعد الاول ",
                ar_title: "المساعد الاول ",
                en_title: "Jupiter",
                image: "images/city/Jupiter.jpg",
                desc: " يقصر المدة الزمية اللازمة للباء وتطوير المبانى فى المدينة"
            },
            {
                title: "المساعد الثانى ",
                ar_title: "المساعد الثانى ",
                en_title: "Juno",
                image: "images/city/Junon.jpg",
                desc: "يساعد هذا المساعد على زيادة واكثار السكان فى المدينة"
            },
            {
                title: "المساعد الثالث ",
                ar_title: "المساعد الثالث ",
                en_title: "Minerva",
                image: "images/city/Minerva.jpg",
                desc: "يقصر المدة الزمية اللازمة لبناء وتطوير القوات"
            }
        ],
        sprit_name: "B10",
        hitArea: [143, 88, 85, 118, 19, 80, 52, 58, 59, 20, 102, 25, 114, 68]
    },
    {
        image: "images/city/_B11.png", //بلازة11 
        icon: "images/building/building12.jpg",
        nav_bar: NavBar.Building.Plaza,
        getCondetion: function (lvl) {
            var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array[lvl - 1],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        sprit_name: "B11",
        hitArea: [147, 82, 78, 112, 17, 77, 23, 51, 84, 24, 138, 47]
    },

    {
        image: "images/city/palace.png", //palace 12 القصر 
        icon: "images/building/building13.jpg",
        nav_bar: NavBar.Building.Palace,
        getCondetion: function (lvl) {
            var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.WALL,
                lvl: Math.max(1, lvl - 2),
                txt: "السور مستوى " + getArabicNumbers(Math.max(1, lvl - 2))
            };
            if (lvl < 10) {
                condtions[1] = {
                    type: "people",
                    amount: Math.ceil(Math.min(Math.pow(1.8, lvl - 1) * 100, 45 * 1000)),
                    txt: " عدد السكان " + Math.ceil(Math.min(Math.pow(1.8, lvl - 1) * 100, 45 * 1000))
                };
            } else if (lvl < 20) {
                var require = [5, 5, 5, 8, 8, 8, 10, 10, 10, 10]
                condtions[1] = {
                    type: "matrial",
                    amount: require[lvl - 10],
                    mat_type: "law_1",
                    txt: " قانون دراكو " + getArabicNumbers(require[lvl - 10])
                };
            } else if (lvl < 25) {
                condtions[1] = {
                    type: "matrial",
                    amount: 5,
                    mat_type: "law_2",
                    txt: "  قانون الجداول " + getArabicNumbers(5)
                };
            } else {
                condtions[1] = {
                    type: "matrial",
                    amount: 5,
                    mat_type: "law_3",
                    txt: "  قانون الرومانى " + getArabicNumbers(5)
                };
            }
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [147, 10, 133, 48, 100, 53, 67, 125, 139, 157, 229, 125, 221, 76]
    },
    {
        image: "images/stabl_1.png", //wall 13 السور 
        icon: "images/building/building16.jpg",
        getIcon: function () {
            if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
                return "images/building/building17.jpg";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
                return "images/building/building16.jpg";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
                return "images/building/building15.jpg";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
                return "images/building/building14.jpg";
            } else {
                return "images/building/building14.jpg";
            }
        },
        nav_bar: NavBar.Building.Wall,
        getCondetion: function (lvl) {
            var lvl_array_stone = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22];
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.STONE,
                lvl: lvl_array_stone[Math.max(lvl - 1, 1)],
                txt: "المحجر مستوى " + getArabicNumbers(lvl_array_stone[Math.max(lvl - 1, 1)])
            };
            condtions[1] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[Math.max(lvl - 1, 1)],
                txt: "القصر  مستوى " + getArabicNumbers(lvl_array_palace[Math.max(lvl - 1, 1)])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [701, 35, 7, 439, 93, 459, 703, 117],
        getHitArea: function () {
            if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
                return [625, 7, 580, 106, 542, 101, 404, 176, 365, 222, 337, 207, 312, 226, 300, 261, 255, 247, 7, 386, 7, 288, 231, 175, 223, 159, 328, 105, 351, 110, 522, 25, 509, 13, 525, 3];
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
                return [598, 11, 588, 92, 9, 391, 7, 299, 267, 161, 259, 150, 295, 130, 323, 133, 560, 12];
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
                return [559, 37, 4, 328, 26, 391, 565, 136, 577, 53];
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
                return [5, 342, 564, 51, 579, 39, 596, 51, 560, 122, 41, 392];
            } else {
                return [564, 92, 1, 369, 22, 389, 565, 120];
            }
        },
        sprit_name: "wall_1",
        getSpriteName: function () {
            if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
                return "wall_4";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
                return "wall_3";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
                return "wall_2";
            } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
                return "wall_1";
            } else {
                return "wall_0";
            }
        }
    },
    {
        image: "images/stabl_1.png", //market 14 السوق 
        icon: "images/building/building07.jpg",
        nav_bar: NavBar.Building.Market,
        getCondetion: function (lvl) {
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[lvl],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
            };
            if (lvl < 10) {
                condtions[1] = {
                    type: "people",
                    amount: Math.pow(2, lvl - 1) * 100,
                    txt: " عدد السكان " + getArabicNumbers(Math.max(1, lvl - 2))
                };
            }
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [160, 90, 87, 124, 17, 87, 18, 52, 97, 28, 155, 48]

    },

    {
        image: "images/stabl_1.png", //wood 15 غايات 
        icon: "images/building/building19.jpg",
        nav_bar: NavBar.Building.Sawmill,
        res_for_jop: {
            food: "15",
            wood: "10",
            stone: "20",
            metal: "30",
            coin: "0",
            time: 30
        },
        getCondetion: function (lvl) {
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[lvl],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1]) + "</li>"
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [173, 97, 97, 124, 30, 84, 59, 56, 108, 8, 158, 40]
    },
    {
        image: "images/stabl_1.png", // farm 16 مزارع 
        icon: "images/building/building18.jpg",
        nav_bar: NavBar.Building.Farm,
        res_for_jop: {
            food: "10",
            wood: "20",
            stone: "30",
            metal: "15",
            coin: "0",
            time: 30
        },
        getCondetion: function (lvl) {
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[lvl],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [333, 116, 164, 204, 7, 134, 152, 12, 244, 55]
    },
    {
        image: "images/stabl_1.png", //mine 17 مناجم 
        icon: "images/building/building21.jpg",
        nav_bar: NavBar.Building.IronMine,
        res_for_jop: {
            food: "20",
            wood: "30",
            stone: "15",
            metal: "10",
            coin: "0",
            time: 30
        },
        getCondetion: function (lvl) {
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[lvl],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [349, 130, 178, 236, 4, 145, 173, 16, 287, 43]
    },
    {
        image: "images/stabl_1.png", //stone 18 محاجر  
        icon: "images/building/building20.jpg",
        nav_bar: NavBar.Building.Quarry,
        res_for_jop: {
            food: "30",
            wood: "15",
            stone: "10",
            metal: "20",
            coin: "0",
            time: 30
        },
        getCondetion: function (lvl) {
            var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
            var condtions = [];
            condtions[0] = {
                type: "building",
                building_type: BUILDING_TYPS.PALACE,
                lvl: lvl_array_palace[lvl],
                txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1]) + "</li>"
            };
            return condtions;
        },
        getTime: function (lvl) {
            return lvl * 3 * 60;
        },
        hitArea: [297, 114, 200, 194, 94, 190, 16, 101, 51, 21, 206, 15]
    },
    {
        image: "images/stabl_1.png", //seaport 19 الميناء  
        title: "الميناء",
        ar_title: "الميناء",
        en_title: "Seaport",
        icon: "images/building/building20.jpg",
        nav_bar: NavBar.Building.SeaPort,
        func: "",
        paragraph: " المبنى المسؤل عن انشاء وادارة القوات البحرية فى المدينة ",
        getCondetion: function (lvl) {
            var condtions = [];
            return condtions;
        },
        getTime: function (lvl) {
            return 0;
        },
        hitArea: [129, 3, 41, 59, 2, 163, 60, 191, 110, 176, 201, 178, 290, 135, 257, 55]
    },
    {
        image: "images/stabl_1.png", //lighthouse 20 المنارة  
        title: "المنارة",
        ar_title: "المنارة",
        en_title: "Lighthouse",
        icon: "images/building/building20.jpg",
        nav_bar: NavBar.Building.Lighthouse,
        food: "1800",
        wood: "2500",
        stone: "350",
        metal: "850",
        coin: "0",
        func: "",
        paragraph: " المبنى المسؤل عن ارسال البعثات البحرية",
        getCondetion: function (lvl) {
            var condtions = [];
            return condtions;
        },
        getTime: function (lvl) {
            return 0;
        },
        hitArea: [109, 283, 1, 280, 3, 235, 19, 226, 22, 136, 33, 139, 34, 8, 73, 8, 82, 137, 95, 174, 106, 217]
    }

];

Elkaisar.Building.getJsonData = function () {
    return $.getJSON(`js${JS_VERSION}/json/building/${UserLag.language}.json`, function (BuildingText) {
        BuildingConstData[BUILDING_TYPS.SPACE].title = BuildingText[BUILDING_TYPS.SPACE].name;

        BuildingConstData[BUILDING_TYPS.COTTAGE].title = BuildingText[BUILDING_TYPS.COTTAGE].name;
        BuildingConstData[BUILDING_TYPS.COTTAGE].func = BuildingText[BUILDING_TYPS.COTTAGE].func;
        BuildingConstData[BUILDING_TYPS.COTTAGE].functionDesc = BuildingText[BUILDING_TYPS.COTTAGE].functionDesc;

        BuildingConstData[BUILDING_TYPS.STORE].title = BuildingText[BUILDING_TYPS.STORE].name;
        BuildingConstData[BUILDING_TYPS.STORE].func = BuildingText[BUILDING_TYPS.STORE].func;
        BuildingConstData[BUILDING_TYPS.STORE].functionDesc = BuildingText[BUILDING_TYPS.STORE].functionDesc;

        BuildingConstData[BUILDING_TYPS.BARRACKS].title = BuildingText[BUILDING_TYPS.BARRACKS].name;
        BuildingConstData[BUILDING_TYPS.BARRACKS].func = BuildingText[BUILDING_TYPS.BARRACKS].func;
        BuildingConstData[BUILDING_TYPS.BARRACKS].functionDesc = BuildingText[BUILDING_TYPS.BARRACKS].functionDesc;

        BuildingConstData[BUILDING_TYPS.STABL].title = BuildingText[BUILDING_TYPS.STABL].name;
        BuildingConstData[BUILDING_TYPS.STABL].func = BuildingText[BUILDING_TYPS.STABL].func;
        BuildingConstData[BUILDING_TYPS.STABL].functionDesc = BuildingText[BUILDING_TYPS.STABL].functionDesc;

        BuildingConstData[BUILDING_TYPS.WORKSHOP].title = BuildingText[BUILDING_TYPS.WORKSHOP].name;
        BuildingConstData[BUILDING_TYPS.WORKSHOP].func = BuildingText[BUILDING_TYPS.WORKSHOP].func;
        BuildingConstData[BUILDING_TYPS.WORKSHOP].functionDesc = BuildingText[BUILDING_TYPS.WORKSHOP].functionDesc;

        BuildingConstData[BUILDING_TYPS.THEATER].title = BuildingText[BUILDING_TYPS.THEATER].name;
        BuildingConstData[BUILDING_TYPS.THEATER].func = BuildingText[BUILDING_TYPS.THEATER].func;
        BuildingConstData[BUILDING_TYPS.THEATER].functionDesc = BuildingText[BUILDING_TYPS.THEATER].functionDesc;

        BuildingConstData[BUILDING_TYPS.STATION].title = BuildingText[BUILDING_TYPS.STATION].name;
        BuildingConstData[BUILDING_TYPS.STATION].func = BuildingText[BUILDING_TYPS.STATION].func;
        BuildingConstData[BUILDING_TYPS.STATION].functionDesc = BuildingText[BUILDING_TYPS.STATION].functionDesc;

        BuildingConstData[BUILDING_TYPS.UNIVERSITY].title = BuildingText[BUILDING_TYPS.UNIVERSITY].name;
        BuildingConstData[BUILDING_TYPS.UNIVERSITY].func = BuildingText[BUILDING_TYPS.UNIVERSITY].func;
        BuildingConstData[BUILDING_TYPS.UNIVERSITY].functionDesc = BuildingText[BUILDING_TYPS.UNIVERSITY].functionDesc;

        BuildingConstData[BUILDING_TYPS.ACADEMY].title = BuildingText[BUILDING_TYPS.ACADEMY].name;
        BuildingConstData[BUILDING_TYPS.ACADEMY].func = BuildingText[BUILDING_TYPS.ACADEMY].func;
        BuildingConstData[BUILDING_TYPS.ACADEMY].functionDesc = BuildingText[BUILDING_TYPS.ACADEMY].functionDesc;

        BuildingConstData[BUILDING_TYPS.WORSHIP].title = BuildingText[BUILDING_TYPS.WORSHIP].name;
        BuildingConstData[BUILDING_TYPS.WORSHIP].func = BuildingText[BUILDING_TYPS.WORSHIP].func;
        BuildingConstData[BUILDING_TYPS.WORSHIP].functionDesc = BuildingText[BUILDING_TYPS.WORSHIP].functionDesc;

        BuildingConstData[BUILDING_TYPS.HOSPITAL].title = BuildingText[BUILDING_TYPS.HOSPITAL].name;
        BuildingConstData[BUILDING_TYPS.HOSPITAL].func = BuildingText[BUILDING_TYPS.HOSPITAL].func;
        BuildingConstData[BUILDING_TYPS.HOSPITAL].functionDesc = BuildingText[BUILDING_TYPS.HOSPITAL].functionDesc;

        BuildingConstData[BUILDING_TYPS.PALACE].title = BuildingText[BUILDING_TYPS.PALACE].name;
        BuildingConstData[BUILDING_TYPS.PALACE].func = BuildingText[BUILDING_TYPS.PALACE].func;
        BuildingConstData[BUILDING_TYPS.PALACE].functionDesc = BuildingText[BUILDING_TYPS.PALACE].functionDesc;

        BuildingConstData[BUILDING_TYPS.WALL].title = BuildingText[BUILDING_TYPS.WALL].name;
        BuildingConstData[BUILDING_TYPS.WALL].func = BuildingText[BUILDING_TYPS.WALL].func;
        BuildingConstData[BUILDING_TYPS.WALL].functionDesc = BuildingText[BUILDING_TYPS.WALL].functionDesc;

        BuildingConstData[BUILDING_TYPS.MARKET].title = BuildingText[BUILDING_TYPS.MARKET].name;
        BuildingConstData[BUILDING_TYPS.MARKET].func = BuildingText[BUILDING_TYPS.MARKET].func;
        BuildingConstData[BUILDING_TYPS.MARKET].functionDesc = BuildingText[BUILDING_TYPS.MARKET].functionDesc;

        BuildingConstData[BUILDING_TYPS.WOOD].title = BuildingText[BUILDING_TYPS.WOOD].name;
        BuildingConstData[BUILDING_TYPS.WOOD].func = BuildingText[BUILDING_TYPS.WOOD].func;
        BuildingConstData[BUILDING_TYPS.WOOD].functionDesc = BuildingText[BUILDING_TYPS.WOOD].functionDesc;

        BuildingConstData[BUILDING_TYPS.FARM].title = BuildingText[BUILDING_TYPS.FARM].name;
        BuildingConstData[BUILDING_TYPS.FARM].func = BuildingText[BUILDING_TYPS.FARM].func;
        BuildingConstData[BUILDING_TYPS.FARM].functionDesc = BuildingText[BUILDING_TYPS.FARM].functionDesc;

        BuildingConstData[BUILDING_TYPS.MINE].title = BuildingText[BUILDING_TYPS.MINE].name;
        BuildingConstData[BUILDING_TYPS.MINE].func = BuildingText[BUILDING_TYPS.MINE].func;
        BuildingConstData[BUILDING_TYPS.MINE].functionDesc = BuildingText[BUILDING_TYPS.MINE].functionDesc;

        BuildingConstData[BUILDING_TYPS.STONE].title = BuildingText[BUILDING_TYPS.STONE].name;
        BuildingConstData[BUILDING_TYPS.STONE].func = BuildingText[BUILDING_TYPS.STONE].func;
        BuildingConstData[BUILDING_TYPS.STONE].functionDesc = BuildingText[BUILDING_TYPS.STONE].functionDesc;


        Elkaisar.TimedTask.refreshListView();


    });
};



Crafty.defineScene("city", function () {

    var floor_width = 2500;
    var floor_height = 1400;


    Crafty._floor = "city";
    Crafty.onDragClickable = true;

    // Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:floor_width - window.innerWidth, y:floor_height - window.innerHeight}};


    city_floor = Crafty.e("2D, Canvas, city_floor").attr({w: floor_width, h: floor_height, z: -1});



    /*start draginig map*/
    Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function (e) {

        if (e.button > 1)
            return;

        if (Crafty._floor !== "city")
            return;


        var base = {x: e.clientX, y: e.clientY};

        Crafty.viewport.mouselook(true);

        function scroll(e) {

            Crafty("iso_text_left").each(function () {

                this.attr({alpha: 1.0});

            });

        }
        ;

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function () {
            Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
            setTimeout(function () {
                Crafty.onDragClickable = true;
            }, 500);
            Crafty("iso_text_left").each(function () {
                // hide building lable
                this.attr({alpha: 0.0});

            });
        });
    });



    Crafty.viewport.bounds = {min: {x: 0, y: 0}, max: {x: floor_width, y: floor_height}};


    Crafty.bind('UpdateFrame', function () {

        if (Crafty.s('Keyboard').isKeyDown(Crafty.keys.LEFT_ARROW)) {
            Crafty.viewport.x += 20;
            Crafty.viewport._clamp();
        } else if (Crafty.s('Keyboard').isKeyDown(Crafty.keys.RIGHT_ARROW)) {
            Crafty.viewport.x -= 20;
            Crafty.viewport._clamp();
        } else if (Crafty.s('Keyboard').isKeyDown(Crafty.keys.UP_ARROW)) {
            Crafty.viewport.y += 20;
            Crafty.viewport._clamp();
        } else if (Crafty.s('Keyboard').isKeyDown(Crafty.keys.DOWN_ARROW)) {
            Crafty.viewport.y -= 20;
            Crafty.viewport._clamp();
        }
    });





    fillCityWithBuilding();
    Crafty.viewport.centerOn(BuildingOnFloor.palace, 1);


});



/*
 * 
 *   Variable holds all  building on floor
 */

var BuildingOnFloor = {
};

const X_GRID = 128;
const Y_GRID = 64;

function MouseOverBuilding()
{

    this.attr({alpha: 0.8});
    if (this._children[1]) {

        this._children[1].attr({alpha: 1.0});

    }

}
function MouseOutBuilding()
{

    this.attr({alpha: 1.0});
    if (this._children[1]) {

        this._children[1].attr({alpha: 0.0});

    }

}


function building_title(x, y, place)
{


    return Crafty.e("2D, DOM , iso_text_left , Text")
            .attr({x: x + 90, y: y + 1.5 * Y_GRID, w: 60, h: 20, avoidCss3dTransforms: true, z: 100, alpha: 0.0})
            .css({'direction': 'rtl'})
            .text(BuildingConstData[Elkaisar.City.getCity().BuildingType[place]].title)
            .textColor('white')
            .textFont({size: '12px', weight: 'bold', lineHeight: "20px"})
            .textAlign("center");


}
function building_lvl_lable(x, y, place)
{

    var lvl = Number(Elkaisar.City.getCity().BuildingLvl[place]);
    var alpha_ = lvl === 0 ? 0.0 : 1.0;

    var lable = "building_lvl_lable_1";

    if (Elkaisar.City.getCity().BuildingLvl[place] > 20) {
        lable = "building_lvl_lable_5";
    } else if (Elkaisar.City.getCity().BuildingLvl[place] > 15) {
        lable = "building_lvl_lable_4";
    } else if (Elkaisar.City.getCity().BuildingLvl[place] > 10) {
        lable = "building_lvl_lable_3";
    } else if (Elkaisar.City.getCity().BuildingLvl[place] > 5) {
        lable = "building_lvl_lable_2";
    }


    return Crafty.e("2D, DOM , " + lable + " , " + place + "_b_l , Text")
            .attr({x: x + 0.5 * X_GRID, y: y + 1 * Y_GRID, w: 30, h: 30, avoidCss3dTransforms: true, z: 100, alpha: alpha_})
            .text(lvl)
            .textColor('white')
            .textFont({size: '12px', weight: 'bold'})
            .textAlign("center");


}

var Check = true;

function fillCityWithBuilding()
{
    for (var prop in BuildingOnFloor) {
        BuildingOnFloor[prop].destroy();
    }
    Crafty("hammer_start").each(function () {
        this.destroy();
    });
    
    if(!Elkaisar.City.getCity().BuildingType)
    {
        if(Check)
            Elkaisar.City.getCityBuilding().done(function (){
                fillCityWithBuilding();
            });
        Check = false;
        return ;
    }
    /*
     *    PALACE building
     */
    BuildingOnFloor.palace = Crafty.e("2D, Canvas, palace , Mouse")
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["palace"]].hitArea)
            .attr({x: 1190, y: 545, z: 1})
            .bind("Click", function () {
                buildingClick("palace");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(
                    Crafty.e("2D, DOM , iso_text_left  , Text")
                    .attr({x: 1350, y: 680, w: 90, h: 30, avoidCss3dTransforms: true, alpha: 0.0})
                    .text(BuildingConstData[Elkaisar.City.getCity().BuildingType["palace"]].title)
                    .textColor('white')
                    .textFont({size: '14px', weight: 'bold', lineHeight: "30px"})
                    .textAlign("center")

                    )
            .attach(building_lvl_lable(1260, 580, "palace"));
    building_hammer_animate("palace");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_1"]].hitArea)
            .attr({x: 1780, y: 461, z: 5})
            .bind("Click", function () {
                buildingClick("light_house_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1780, 461, "light_house_1"))
            .attach(building_lvl_lable(1780, 461, "light_house_1"));
    building_hammer_animate("light_house_1");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_2"]].hitArea)
            .attr({x: 1685, y: 506, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1685, 506, "light_house_2"))
            .attach(building_lvl_lable(1685, 506, "light_house_2"));
    building_hammer_animate("light_house_2");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_3"]].hitArea)
            .attr({x: 1587, y: 556, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1587, 556, "light_house_3"))
            .attach(building_lvl_lable(1587, 556, "light_house_3"));
    building_hammer_animate("light_house_3");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_4 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_4"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_4"]].hitArea)
            .attr({x: 1487, y: 603, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_4");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1487, 603, "light_house_4"))
            .attach(building_lvl_lable(1487, 603, "light_house_4"));
    building_hammer_animate("light_house_4");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_5 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_5"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_5"]].hitArea)
            .attr({x: 1792, y: 557, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_5");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1792, 557, "light_house_5"))
            .attach(building_lvl_lable(1792, 557, "light_house_5"));
    building_hammer_animate("light_house_5");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_6 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_6"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_6"]].hitArea)
            .attr({x: 1695, y: 609, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_6");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1695, 609, "light_house_6"))
            .attach(building_lvl_lable(1695, 609, "light_house_6"));
    building_hammer_animate("light_house_6");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_7 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_7"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_7"]].hitArea)
            .attr({x: 1595, y: 659, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_7");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1595, 659, "light_house_7"))
            .attach(building_lvl_lable(1595, 659, "light_house_7"));
    building_hammer_animate("light_house_7");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_8 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_8"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_8"]].hitArea)
            .attr({x: 1807, y: 663, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_8");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1807, 663, "light_house_8"))
            .attach(building_lvl_lable(1807, 663, "light_house_8"));
    building_hammer_animate("light_house_8");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_9 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_9"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_9"]].hitArea)
            .attr({x: 1702, y: 714, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_9");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1702, 714, "light_house_9"))
            .attach(building_lvl_lable(1702, 714, "light_house_9"));
    building_hammer_animate("light_house_9");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.light_house_10 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_10"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["light_house_10"]].hitArea)
            .attr({x: 1802, y: 775, z: 4})
            .bind("Click", function () {
                buildingClick("light_house_10");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1802, 775, "light_house_10"))
            .attach(building_lvl_lable(1802, 775, "light_house_10"));
    building_hammer_animate("light_house_10");



    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_1"]].hitArea)
            .attr({x: 1353, y: 673, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1353, 673, "under_palace_1"))
            .attach(building_lvl_lable(1353, 673, "under_palace_1"));
    building_hammer_animate("light_house_1");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_2"]].hitArea)
            .attr({x: 1249, y: 715, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1249, 715, "under_palace_2"))
            .attach(building_lvl_lable(1249, 715, "under_palace_2"));
    building_hammer_animate("under_palace_2");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_3"]].hitArea)
            .attr({x: 1145, y: 763, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1145, 763, "under_palace_3"))
            .attach(building_lvl_lable(1145, 763, "under_palace_3"));
    building_hammer_animate("under_palace_3");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_4 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_4"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_4"]].hitArea)
            .attr({x: 1458, y: 724, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_4");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1458, 724, "under_palace_4"))
            .attach(building_lvl_lable(1458, 724, "under_palace_4"));
    building_hammer_animate("under_palace_4");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_5 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_5"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_5"]].hitArea)
            .attr({x: 1353, y: 769, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_5");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1353, 769, "under_palace_5"))
            .attach(building_lvl_lable(1353, 769, "under_palace_5"));
    building_hammer_animate("under_palace_5");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_6 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_6"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_6"]].hitArea)
            .attr({x: 1246, y: 813, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_6");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1246, 813, "under_palace_6"))
            .attach(building_lvl_lable(1246, 813, "under_palace_6"));
    building_hammer_animate("under_palace_6");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_7 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_7"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_7"]].hitArea)
            .attr({x: 1568, y: 779, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_7");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1568, 779, "under_palace_7"))
            .attach(building_lvl_lable(1568, 779, "under_palace_7"));
    building_hammer_animate("under_palace_7");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_8 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_8"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_8"]].hitArea)
            .attr({x: 1464, y: 822, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_8");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1464, 822, "under_palace_8"))
            .attach(building_lvl_lable(1464, 822, "under_palace_8"));
    building_hammer_animate("under_palace_8");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_9 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_9"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_9"]].hitArea)
            .attr({x: 1352, y: 876, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_9");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1352, 876, "under_palace_9"))
            .attach(building_lvl_lable(1352, 876, "under_palace_9"));
    building_hammer_animate("under_palace_9");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_10 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_10"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_10"]].hitArea)
            .attr({x: 1674, y: 829, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_10");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1674, 829, "under_palace_10"))
            .attach(building_lvl_lable(1674, 829, "under_palace_10"));
    building_hammer_animate("under_palace_10");
    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_11 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_11"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_11"]].hitArea)
            .attr({x: 1565, y: 880, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_11");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1565, 880, "under_palace_11"))
            .attach(building_lvl_lable(1565, 880, "under_palace_11"));
    building_hammer_animate("under_palace_11");
    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_palace_12 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_12"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_palace_12"]].hitArea)
            .attr({x: 1457, y: 923, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_palace_12");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1457, 923, "under_palace_12"))
            .attach(building_lvl_lable(1457, 923, "under_palace_12"));
    building_hammer_animate("under_palace_12");






    BuildingOnFloor.wall = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["wall"]].getSpriteName() + " , Mouse")
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["wall"]].getHitArea())
            .attr({x: 0, y: 0, z: 3})
            .bind("Click", function () {
                buildingClick("wall");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(2 * X_GRID, 2.25 * Y_GRID, "wall"))
            .attach(building_lvl_lable(1.75 * X_GRID, 2.5 * Y_GRID, "wall"));
    building_hammer_animate("wall");



    BuildingOnFloor.market = Crafty.e("2D, Canvas, market , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["market"]].hitArea)
            .attr({x: 14 * X_GRID, y: 3.25 * Y_GRID, z: 3})
            .bind("Click", function () {
                buildingClick("market");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(14 * X_GRID, 3.25 * Y_GRID, "market"))
            .attach(building_lvl_lable(14 * X_GRID, 3.25 * Y_GRID, "market"));
    building_hammer_animate("market");





    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.seaport = Crafty.e("2D, Canvas, seaport , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["seaport"]].hitArea)
            .attr({x: 16 * X_GRID, y: 9.75 * Y_GRID, z: 1000})
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("seaport");
            })
            .attach(building_title(17.75 * X_GRID, 10.25 * Y_GRID, "seaport"))
            .attach(building_lvl_lable(14 * X_GRID, 3.25 * Y_GRID, "market"));
    building_hammer_animate("seaport");
    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.lighthouse = Crafty.e("2D, Canvas, lighthouse , Mouse")

            .attr({x: 15.5 * X_GRID, y: 5 * Y_GRID, z: 1})
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["lighthouse"]].hitArea)
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("lighthouse");
            })
            .attach(building_title(15.4 * X_GRID, 7.25 * Y_GRID, "lighthouse"))
            .attach(building_lvl_lable(14 * X_GRID, 3.25 * Y_GRID, "market"));
    building_hammer_animate("lighthouse");

    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.farm = Crafty.e("2D, Canvas, farm , Mouse")

            .attr({x: 12.75 * X_GRID, y: 14.75 * Y_GRID, z: 1000})
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["farm"]].hitArea)
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("farm");
            })
            .attach(building_title(13.75 * X_GRID, 15.75 * Y_GRID, "farm"))
            .attach(building_lvl_lable(13.5 * X_GRID, 14.75 * Y_GRID, "farm"));
    building_hammer_animate("farm");

    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.mine = Crafty.e("2D, Canvas, mine , Mouse")

            .attr({x: 7.75 * X_GRID, y: 2.25 * Y_GRID, z: 0})
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["mine"]].hitArea)
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("mine");
            })
            .attach(building_title(9 * X_GRID, 3.25 * Y_GRID, "mine"))
            .attach(building_lvl_lable(8.5 * X_GRID, 3.25 * Y_GRID, "mine"));
    building_hammer_animate("mine");

    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.stone = Crafty.e("2D, Canvas, mahger , Mouse")

            .attr({x: 11.5 * X_GRID, y: 5.5 * Y_GRID, z: 0})
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["stone"]].hitArea)
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("stone");
            })
            .attach(building_title(12.25 * X_GRID, 5.75 * Y_GRID, "stone"))
            .attach(building_lvl_lable(12.25 * X_GRID, 5.5 * Y_GRID, "stone"));
    building_hammer_animate("stone");

    /*
     *    PUT FIXED PLACES 
     */

    BuildingOnFloor.wood = Crafty.e("2D, Canvas, wood_maker , Mouse")

            .attr({x: 2 * X_GRID, y: 6.5 * Y_GRID, z: 0})
            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["wood"]].hitArea)
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .bind("Click", function () {
                buildingClick("wood");
            })
            .attach(building_title(2.25 * X_GRID, 6.25 * Y_GRID, "wood"))
            .attach(building_lvl_lable(2.25 * X_GRID, 6.25 * Y_GRID, "wood"));
    building_hammer_animate("wood");


    //start_animation() 




    if (Number(Elkaisar.CurrentCity.City.lvl) > 0) {
        fillCityLvl_1();
    }






    if (Number(Elkaisar.CurrentCity.City.lvl) > 1) {
        fillCityLvl_2();
    }






    if (Number(Elkaisar.CurrentCity.City.lvl) > 2) {
        fillCityLvl_3();
    }

    Animation.FixedCityAnimation();
    if (Elkaisar.CurrentCity.City.food) {
        Animation.cityProductionRate();
    }
}




function fillCityLvl_3() {


    BuildingOnFloor.above_palace_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_1"]].hitArea)
            .attr({x: 1172, y: 368, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1172, 368, "above_palace_1"))
            .attach(building_lvl_lable(1172, 368, "above_palace_1"));
    building_hammer_animate("above_palace_1");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.above_palace_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_2"]].hitArea)
            .attr({x: 1070, y: 417, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1070, 417, "above_palace_2"))
            .attach(building_lvl_lable(1070, 417, "above_palace_2"));
    building_hammer_animate("above_palace_2");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.above_palace_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_3"]].hitArea)
            .attr({x: 1278, y: 420, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1278, 420, "above_palace_3"))
            .attach(building_lvl_lable(1278, 420, "above_palace_3"));
    building_hammer_animate("above_palace_3");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.above_palace_4 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_4"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_4"]].hitArea)
            .attr({x: 1173, y: 469, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_4");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1173, 469, "above_palace_4"))
            .attach(building_lvl_lable(1173, 469, "above_palace_4"));
    building_hammer_animate("above_palace_4");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.above_palace_5 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_5"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_5"]].hitArea)
            .attr({x: 1012, y: 554, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_5");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(1012, 554, "above_palace_5"))
            .attach(building_lvl_lable(1012, 554, "above_palace_5"));
    building_hammer_animate("above_palace_5");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.above_palace_6 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_6"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["above_palace_6"]].hitArea)
            .attr({x: 904, y: 606, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("above_palace_6");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(904, 606, "above_palace_6"))
            .attach(building_lvl_lable(904, 606, "above_palace_6"));
    building_hammer_animate("above_palace_6");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.around_wood_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_1"]].hitArea)
            .attr({x: 471, y: 413, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("around_wood_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(471, 413, "around_wood_1"))
            .attach(building_lvl_lable(471, 413, "around_wood_1"));
    building_hammer_animate("around_wood_1");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.around_wood_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_2"]].hitArea)
            .attr({x: 580, y: 464, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("around_wood_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(580, 464, "around_wood_2"))
            .attach(building_lvl_lable(580, 464, "around_wood_2"));
    building_hammer_animate("around_wood_2");



    /*
     *    top_right_1 building
     */
    BuildingOnFloor.around_wood_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["around_wood_3"]].hitArea)
            .attr({x: 479, y: 516, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("around_wood_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(479, 516, "around_wood_3"))
            .attach(building_lvl_lable(479, 516, "around_wood_3"));
    building_hammer_animate("around_wood_3");

}



function fillCityLvl_2() {

    BuildingOnFloor.under_wall_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_1"]].hitArea)
            .attr({x: 628, y: 139, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(628, 139, "under_wall_1"))
            .attach(building_lvl_lable(628, 139, "under_wall_1"));
    building_hammer_animate("under_wall_1");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_2"]].hitArea)
            .attr({x: 525, y: 185, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(525, 185, "under_wall_2"))
            .attach(building_lvl_lable(525, 185, "under_wall_2"));
    building_hammer_animate("under_wall_2");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_3"]].hitArea)
            .attr({x: 423, y: 229, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(423, 229, "under_wall_3"))
            .attach(building_lvl_lable(423, 229, "under_wall_3"));
    building_hammer_animate("under_wall_3");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_4 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_4"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_4"]].hitArea)
            .attr({x: 728, y: 187, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_4");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(728, 187, "under_wall_4"))
            .attach(building_lvl_lable(728, 187, "under_wall_4"));
    building_hammer_animate("under_wall_4");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_5 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_5"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_5"]].hitArea)
            .attr({x: 628, y: 233, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_5");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(628, 233, "under_wall_5"))
            .attach(building_lvl_lable(628, 233, "under_wall_5"));
    building_hammer_animate("under_wall_5");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_6 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_6"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_6"]].hitArea)
            .attr({x: 526, y: 279, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_6");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(526, 279, "under_wall_6"))
            .attach(building_lvl_lable(526, 279, "under_wall_6"));
    building_hammer_animate("under_wall_6");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_7 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_7"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_7"]].hitArea)
            .attr({x: 823, y: 239, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_7");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(823, 239, "under_wall_7"))
            .attach(building_lvl_lable(823, 239, "under_wall_7"));
    building_hammer_animate("under_wall_7");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_8 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_8"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_8"]].hitArea)
            .attr({x: 725, y: 284, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_8");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(725, 284, "under_wall_8"))
            .attach(building_lvl_lable(725, 284, "under_wall_8"));
    building_hammer_animate("under_wall_8");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_9 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_9"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_9"]].hitArea)
            .attr({x: 627, y: 333, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_9");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(627, 333, "under_wall_9"))
            .attach(building_lvl_lable(627, 333, "under_wall_9"));
    building_hammer_animate("under_wall_9");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_10 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_10"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_10"]].hitArea)
            .attr({x: 930, y: 287, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_10");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(930, 287, "under_wall_10"))
            .attach(building_lvl_lable(930, 287, "under_wall_10"));
    building_hammer_animate("under_wall_10");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_11 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_11"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_11"]].hitArea)
            .attr({x: 836, y: 337, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_11");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(836, 337, "under_wall_11"))
            .attach(building_lvl_lable(836, 337, "under_wall_11"));
    building_hammer_animate("under_wall_11");
    /*
     *    top_right_1 building
     */
    BuildingOnFloor.under_wall_12 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_12"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["under_wall_12"]].hitArea)
            .attr({x: 737, y: 383, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("under_wall_12");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(737, 383, "under_wall_12"))
            .attach(building_lvl_lable(737, 383, "under_wall_12"));
    building_hammer_animate("under_wall_12");



}


function fillCityLvl_1() {


    BuildingOnFloor.hill_1 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_1"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_1"]].hitArea)
            .attr({x: 625, y: 918, z: 5})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_1");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(625, 918, "hill_1"))
            .attach(building_lvl_lable(625, 918, "hill_1"));
    building_hammer_animate("hill_1");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_2 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_2"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_2"]].hitArea)
            .attr({x: 732, y: 864, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_2");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(732, 864, "hill_2"))
            .attach(building_lvl_lable(732, 864, "hill_2"));
    building_hammer_animate("hill_2");





    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_3 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_3"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_3"]].hitArea)
            .attr({x: 832, y: 814, z: 4})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_3");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(832, 814, "hill_3"))
            .attach(building_lvl_lable(832, 814, "hill_3"));
    building_hammer_animate("hill_3");


    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_4 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_4"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_4"]].hitArea)
            .attr({x: 517, y: 867, z: 3})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_4");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(517, 867, "hill_4"))
            .attach(building_lvl_lable(517, 867, "hill_4"));
    building_hammer_animate("hill_4");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_5 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_5"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_5"]].hitArea)
            .attr({x: 628, y: 810, z: 2})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_5");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(628, 810, "hill_5"))
            .attach(building_lvl_lable(628, 810, "hill_5"));
    building_hammer_animate("hill_5");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_6 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_6"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_6"]].hitArea)
            .attr({x: 729, y: 759, z: 2})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_6");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(729, 759, "hill_6"))
            .attach(building_lvl_lable(729, 759, "hill_6"));
    building_hammer_animate("hill_6");




    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_7 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_7"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_7"]].hitArea)
            .attr({x: 820, y: 712, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_7");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(820, 712, "hill_7"))
            .attach(building_lvl_lable(820, 712, "hill_7"));
    building_hammer_animate("hill_7");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_8 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_8"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_8"]].hitArea)
            .attr({x: 478, y: 785, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_8");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(478, 785, "hill_8"))
            .attach(building_lvl_lable(478, 785, "hill_8"));
    building_hammer_animate("hill_8");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_9 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_9"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_9"]].hitArea)
            .attr({x: 575, y: 733, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_9");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(575, 733, "hill_9"))
            .attach(building_lvl_lable(575, 733, "hill_9"));
    building_hammer_animate("hill_9");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_10 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_10"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_10"]].hitArea)
            .attr({x: 672, y: 685, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_10");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(672, 685, "hill_10"))
            .attach(building_lvl_lable(672, 685, "hill_10"));
    building_hammer_animate("hill_10");

    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_11 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_11"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_11"]].hitArea)
            .attr({x: 374, y: 732, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_11");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(374, 732, "hill_11"))
            .attach(building_lvl_lable(374, 732, "hill_11"));
    building_hammer_animate("hill_11");
    /*
     *    top_right_1 building
     */
    BuildingOnFloor.hill_12 = Crafty.e("2D, Canvas, " + BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_12"]].sprit_name + " , Mouse")

            .areaMap(BuildingConstData[Elkaisar.City.getCity().BuildingType["hill_12"]].hitArea)
            .attr({x: 478, y: 680, z: 1})
            .flip("X")
            .bind("Click", function () {
                buildingClick("hill_12");
            })
            .bind("MouseOver", MouseOverBuilding)
            .bind("MouseOut", MouseOutBuilding)
            .attach(building_title(478, 680, "hill_12"))
            .attach(building_lvl_lable(478, 680, "hill_12"));
    building_hammer_animate("hill_12");
}