var army_icon = {
    "0": "",
    "1": '<img src="images/tech/soldier_1.jpg"/>',
    "2": '<img src="images/tech/soldier_2.jpg"/>',
    "3": '<img src="images/tech/soldier_3.jpg"/>',
    "4": '<img src="images/tech/soldier_4.jpg"/>',
    "5": '<img src="images/tech/soldier_5.jpg"/>',
    "6": '<img src="images/tech/soldier_6.jpg"/>',
    "10": '<img src="images/tech/defense01.jpg"/>',
    "11": '<img src="images/tech/defense02.jpg"/>',
    "12": '<img src="images/tech/defense03.jpg"/>'
};


const BATTEL_TYPES_CONST = {
    ATTACK: 0,
    DOMINATE: 1,
    JOIN_ATTACK: 2,
    JOIN_DEFENCE: 3,
    SPY: 4,
    SUPPLY: 5,
    GARRISON: 6,
    resourceSupply: 7,
    enterCity: 8

};

speeds = [
    100, //البطل  فاضى
    300, //مشاة
    900, //فرسان
    600, //مدرعين
    250, //رماة
    150, //مقاليع
    100 //منجنيق
];

const BATTEL_JOIN_ATTACK = 2;
const BATTEL_JOIN_DEFENCE = 3;

$(document).on("click", "#footer_bar li", function () {

    var x_coord = parseInt($("#unit_review").attr("x_coord"));
    var y_coord = parseInt($("#unit_review").attr("y_coord"));
    var type = parseInt($("#unit_review").attr("type"));
    var lvl = parseInt($("#unit_review").attr("lvl"));
    var battel_task = $(this).attr("data-type");
    var world_unit = WorldUnit.getWorldUnit(x_coord, y_coord).entite;

    if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY) {

        buildingClick("market");
        $(".nav_bar .left-nav li[head_title=transport_resources]").click();
        $("#transport-distin input[data-coord=x]").val(WorldCurrentUnit.coord_x);
        $("#transport-distin input[data-coord=y]").val(WorldCurrentUnit.coord_y);
        $(".close_RB img").trigger("click");

        return;
    }

    if (Number(Elkaisar.DPlayer.PlayerState.peace) - 12 * 60 * 60 > ($.now() / 1000)) {
        alert_box.failMessage("لا  يمكنك الهجوم و انت  فى حالة هدنة");
        return;
    } else if (world_unit.__peace && world_unit.__peace > $.now() / 1000) {
        alert_box.succesMessage("لا يمكنك الهجوم على هذه المدينة  </br> ( ملك المدينة قام بتفعيل هدنة)");

        return;
    }


    if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY) {

        SPY.sendSpy(x_coord, y_coord);

        return;

    } else if (Number(battel_task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY) {

        $("#WorldCity").trigger("click");
        $(".close_RB img").trigger("click");

        return;

    }

    // get hero id 
    var hero_object;

    for (var iii in Elkaisar.DPlayer.Heros)
    {
        if (Elkaisar.DPlayer.Heros[iii].Hero.id_city != Elkaisar.CurrentCity.City.id_city)
            continue;
        if (Elkaisar.DPlayer.Heros[iii].Hero.in_city != 1)
            continue;
        if (Elkaisar.DPlayer.Heros[iii].Hero.console != 0)
            continue;
        Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
        break;
    }

    if (typeof Elkaisar.CurrentHero !== "object") {

        if (!cityHasType(BUILDING_TYPS.THEATER)) {
            alert_box.confirmMessage("لا يوجد ابطال او مسارح لتجنيد ابطال داخل المدينة");
            return;
        }

        buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
        return;

    }

    var battel = {
        x_coord: x_coord,
        y_coord: y_coord,
        ar_title: WorldUtil.tooltipHeader(x_coord, y_coord),
        task: battel_task,
        task_title: "غزو",
        time: 60,
        type: type,
        lvl: lvl
    };

    var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel);
    var dialog_box = army.dialogBox("الابطال", NavBar.Hero, content);


    dialogBoxShow(dialog_box, function () {
        army.getCurrentArmy(Elkaisar.CurrentHero);
        getHeroEquip(Elkaisar.CurrentHero.Hero.id_hero);
        $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
    });

    /*     HEILIGHT   THE CAMP TAB */
    $(".left-nav ul li").each(function () {
        if ($(this).attr("head_title") === "camp") {
            $(this).addClass("selected");
        }
    });

    // close  samll box
    $(".close_RB img").trigger("click");

});



function getUnitTitle(type)
{
    if (Elkaisar.World.UnitTypeData[type])
        return Elkaisar.World.UnitTypeData[type].Title;
    return "---";
}


//                              START BATTEL BUTTON
$(document).on("click", "#start_battel", function () {

    if (battel_data.x_coord === null || battel_data.y_coord == null) {

        $("body").append(alert_box.confirmMessage("برجاء اختيار واجهة الهجوم"));
        return;

    }

    if (Number(Elkaisar.CurrentHero.Hero.power) < Hero.getPowerRequired(battel_data.x_coord, battel_data.y_coord)) {
        alert_box.confirmMessage("لا توجد لياقة بدنية كافية للبطل");
        return;
    }

    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero))
        return alert_box.confirmMessage("لا يمكنك ارسال البطل الى المعركة وهو فى مهمة ");



    $(this).attr("disabled", "disabled");
    var coords = `[${getArabicNumbers(battel_data.x_coord)},${getArabicNumbers(battel_data.y_coord)}]`;
    var task = `تاكيد ${BATTAL_TASKS[battel_data.task].ar_title} ${battel_data.ar_title}`;
    alert_box.confirmDialog(`${task}</br> ${coords}`, function () {

        battelStart();
        $(this).removeAttr("disabled");
    });

});



function battelStart() {

    if (Number(Elkaisar.CurrentHero.Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بطل الى بعثة و هو فى ليس داخل المدينة");
        return;
    }
    if (Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(Elkaisar.CurrentCity.City.console)) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بطل الى بعثة و هو قنصل");
        return;
    }

    var _wu = WorldUnit.getWorldUnit(battel_data.x_coord, battel_data.y_coord);

    if (!Elkaisar.World.UnitData.isPromLvlOk(_wu.ut)) {
        alert_box.failMessage("لا يمكنك الهجو..م تحقق من توافق الشروط");
        return;
    }

    var out_hero = 0;


    var idCity = Number(Elkaisar.CurrentHero.Hero.id_city);

    for (var ii in Elkaisar.DPlayer.Heros) {

        if (Number(Elkaisar.DPlayer.Heros[ii].Hero.id_city) !== idCity)
            continue;
        if (Number(Elkaisar.DPlayer.Heros[ii].Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
            out_hero++;
        }

    }


    var blaza_place = cityHasType(BUILDING_TYPS.HOSPITAL);

    if (!blaza_place) {
        $(".close-alert").click();
        alert_box.failMessage("لا يمكنك ارسال بعثات خارج المدينة حيث لا يوجد بلازا داخل المدينة");
        return;
    }

    var blaza_lvl = Math.min(Number(Elkaisar.City.getCity().BuildingLvl[blaza_place]), 20);

    if (out_hero >= blaza_lvl) {
        $(".close-alert").click();
        alert_box.failMessage("وصل عدد الابطال بالخارج الى الحد الاقصى لا يمكنك ارسال قوات اخرى</br> (يمكنك الانتظار حتى عودة الابطال من الخارج)");
        return;
    }


    if (!Battel.isAttackable(Elkaisar.CurrentHero.Hero.id_hero, _wu.ut)) {

        alert_box.failMessage("لا يمكنك الهجوم بالبطل الحالى! ");
        return;

    }

    if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY) {

        Battel.millertySupply(battel_data.x_coord, battel_data.y_coord);
        Elkaisar.CurrentHero.Hero.in_city = 1;
        city_profile.refresh_hero_view();
        return;

    }

    if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_JOIN_ATT
            || Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_JOIN_DEF) {


        if (!Battel.checkJoinReq(battel_data.x_coord, battel_data.y_coord)) {

            alert_box.failMessage(`لا يوجد لديك مواد كافية للانضمام`);
            return;
        }

        $.ajax({

            url: `${API_URL}/api/ABattelRunning/joinBattel`,
            data: {
                idBattel: battel_data.id_battel,
                idHero: Elkaisar.CurrentHero.Hero.id_hero,
                side: battel_data.side,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer

            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {

                if (isJson(data)) {
                    var jsonData = JSON.parse(data);
                } else {
                    alert(data);
                }


                if (jsonData.state === "ok") {

                    $(".close_dialog").trigger("click");
                    Elkaisar.CurrentHero.Hero.in_city = 0;
                    $(".close-alert").trigger("click");

                    battel_data.type = jsonData.unit_type;
                    battel_data.lvl = jsonData.unit_lvl;
                    Hero.heroAttackProc();

                    PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                    city_profile.refresh_hero_view();


                    var battel = jsonData.Battel;

                    var found = false;
                    for (var iii in Elkaisar.Battel.Battels) {

                        if (Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(battel_data.id_battel)) {
                            found = true;
                            Elkaisar.Battel.Battels[iii] = battel;
                        }

                    }

                    if (!found) {
                        PLAYER_NOTIF.battel_number = Number(PLAYER_NOTIF.battel_number) + 1;


                        if (!Elkaisar.Battel.Battels) {
                            Elkaisar.Battel.Battels = [battel];
                        } else {
                            Elkaisar.Battel.Battels.push(battel);
                        }
                    }
                    Fixed.refreshPlayerNotif();
                    Battel.afterJoin(battel_data.x_coord, battel_data.y_coord);

                } else if (jsonData.state === "error_1") {
                    alert_box.confirmMessage("البطل ليس فى المدينة");

                } else if (jsonData.state === "error_2") {
                    alert_box.confirmMessage("انتهت المعركة لا يمكنك الانضمام");

                } else if (jsonData.state === "error_3") {

                    alert_box.confirmMessage("لا يمكنك الانضمام للدفاع </br> (وصل عدد المنضمين الى الحد الاقصى)");

                } else if (jsonData.state === "error_5") {

                    alert_box.confirmMessage("لا يمكنك الدفاع ضد هذا الحلف");

                } else if (jsonData.state === "error_6") {

                    alert_box.confirmMessage("المواد غير كافية");

                } else {
                    alert_box.confirmMessage("لا يمكنك الانضمام");

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });


    } else if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT) {
        Elkaisar.Battel.supportByHero();
    } else if (Number(battel_data.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_HERO_TRANS) {
        Elkaisar.Battel.TransHero();
    } else {

        ws.send(
                JSON.stringify({
                    url: "Battel/start",
                    data: {
                        xCoord: battel_data.x_coord,
                        yCoord: battel_data.y_coord,
                        idHero: Elkaisar.CurrentHero.Hero.id_hero,
                        attackTask: battel_data.task
                    }
                })
                );


    }

}



function getReportTitle(type, lvl, x_coord, y_coord)
{

    var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
    if (WorldUnit.isArmyCapital(Unit.ut) || WorldUnit.isArena(Unit.ut)) {
        return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord) } ,${getArabicNumbers(x_coord)}] `;
    } else {
        return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord) } ,${getArabicNumbers(x_coord)}] مستوى ${lvl}`;
    }

}
function getSpyReportTitle(type, lvl, x_coord, y_coord)
{
    var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
    return  `تقرير التجسس على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${(y_coord) } ,${(x_coord)}] مستوى ${(lvl)}`;
}

$(document).on("click", ".battel-con", function () {
    $("#confirm_battel").trigger("click");
});



var Back_heros = new Array();

function playerBattels() {

    return $.ajax({

        url: `${API_URL}/api/ABattelRunning/getBattels`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {


            Elkaisar.Battel.Battels = JSON.parse(data);

            if ($("#dialg_box").attr("type") === "reports" && Elkaisar.Battel.Battels && Elkaisar.Battel.Battels.length > 0) { // if opened menu is for reports

                if ($("#reports_list .selected").length > 0) {   // if there selected  battel

                    $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, $("#reports_list .selected").attr("id_battel"), true));
                    BattelField.battelField({navBar: NavBar.Report, totalBox: false, id_battel: $("#reports_list .selected").attr("id_battel")}, Elkaisar.Battel.Battels);
                    //$(".box_content").replaceWith(Reports.dialogBoxcontent_reports($("#reports_list .selected").attr("id_battel")));


                } else if ($("#reports_list").length > 0) {   // no battels

                    $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, 0, true));

                }

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

}

$(document).on("PlayerReady", "html", function () {
    playerBattels();
});



Elkaisar.Battel.supportByHero = function (idHero)
{
    if (!idHero)
        idHero = Elkaisar.CurrentHero.Hero.id_hero;

    return $.ajax({
        url: `${API_URL}/api/AWorldUnit/supportByHero`,
        type: 'POST',
        data: {

            xTo: battel_data.x_coord,
            yTo: battel_data.y_coord,
            idHero: idHero,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        success: function (data, textStatus, jqXHR) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok")
            {
                Elkaisar.Hero.getHero(idHero);
                alert_box.succesMessage("تم ارسال البطل الى البعثة");
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();
                city_profile.refresh_hero_view();
                $(".nav_icon .close_dialog").click();

            } else if (JsonObject.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (JsonObject.state === "error_1") {
                alert_box.failMessage("لا توجد هذة الوحدة");
            } else if (JsonObject.state === "error_2") {
                alert_box.failMessage("البطل ليس فى المدينة");
            } else if (JsonObject.state === "error_3") {
                alert_box.failMessage("لا يمكنك ارسال البطل");
            }


        }
    });

};

Elkaisar.Battel.TransHero = function (idHero)
{

    if (!idHero)
        idHero = Elkaisar.CurrentHero.Hero.id_hero;

    return $.ajax({
        url: `${API_URL}/api/AWorldUnit/transHero`,
        type: 'POST',
        data: {

            xTo: battel_data.x_coord,
            yTo: battel_data.y_coord,
            idHero: idHero,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok")
            {
                Elkaisar.Hero.getHero(idHero).in_city = Elkaisar.Hero.HeroState.HERO_IN_BATTEL;
                alert_box.succesMessage("تم ارسال البطل الى البعثة");
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();
                city_profile.refresh_hero_view();
                $(".nav_icon .close_dialog").click();

            } else if (JsonObject.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (JsonObject.state === "error_1") {
                alert_box.failMessage("لا توجد هذة الوحدة");
            } else if (JsonObject.state === "error_2") {
                alert_box.failMessage("البطل ليس فى المدينة");
            } else if (JsonObject.state === "error_3") {
                alert_box.failMessage("لا يمكنك ارسال البطل");
            }
        }
    });
};








/*
 *   REFRESH BATTEL DATA 
 */
$(document).on("click", "#REFRESH_BATTEL_DATA", function () {

    var id_battel = parseInt($(this).attr("data-id-battel"));

    if (!id_battel) {

        alert_box.confirmMessage("برجاء اختيار المعركة");

    } else {

        $.ajax({

            url: "api/battel.php",
            data: {

                REFRESH_BATTEL_DATA: true,
                id_battel: id_battel,
                id_player: ID_PLAYER,
                token: TOKEN

            },
            type: 'GET',
            beforeSend: function (xhr) {
                console.log(this.data)
            },
            success: function (data, textStatus, jqXHR) {

                var json_data = JSON.parse(data);
                // refresh attack num
                $(".attack-side .joined-num").html(getArabicNumbers(json_data.attack_num));
                $(".defense-side .joined-num").html(getArabicNumbers(json_data.defence_num)); // refresh defence num

            },
            error: function (jqXHR, textStatus, errorThrown) {



            }

        });


    }

});

Battel = {

    millertySupply: function (x_coord, y_coord) {


        $.ajax({
            url: "api/battel.php",
            data: {
                SUPPLY_WORLD_UNIT_HERO: true,
                x_to: x_coord,
                y_to: y_coord,
                x_from: Elkaisar.CurrentCity.City.x,
                y_from: Elkaisar.CurrentCity.City.y,
                id_hero: Elkaisar.CurrentHero.Hero.id_hero,
                id_player: ID_PLAYER,
                token: TOKEN
            },
            type: 'POST',
            beforeSend: function (xhr) {
                console.log(this.data)
            },
            success: function (data, textStatus, jqXHR) {
                if (isJson(data)) {

                } else {
                    alert(data);
                }
                $(".close_dialog").click();
                PLAYER_NOTIF.hero_in_battel = Number(PLAYER_NOTIF.hero_in_battel) + 1;
                Fixed.refreshPlayerNotif();

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },

    afterFininsh: function (Battel) {



        var hero_dialog = $("#dialg_box[type='hero'] .hero-profile");




        if (hero_dialog.length > 0) {
            hero_dialog.replaceWith(army.middle_content(Elkaisar.CurrentHero));
        }

        for (var iii in Battel.ItemPrize) {

            Matrial.givePlayer(Battel.ItemPrize[iii].Item, Battel.ItemPrize[iii].amount);

        }
        Elkaisar.DPlayer.Player.honor = Number(Elkaisar.DPlayer.Player.honor) + Number(Battel.Player.Honor);


        if (Number(Battel.Battel.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE)
        {
            Elkaisar.City.getCityBarray();
        }

    }
};

Battel.checkJoinReq = function (x_coord, y_coord) {

    var unit = WorldUnit.getWorldUnit(x_coord, y_coord);


    for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

        if (Matrial.getPlayerAmount(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item) < Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount) {
            return false;
        }

    }



    return true;

};



Battel.afterJoin = function (x_coord, y_coord) {

    var unit = WorldUnit.getWorldUnit(x_coord, y_coord);



    for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

        Matrial.takeFrom(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item, Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount);

    }
    return true;

};

Battel.isAttackable = function (idHero, type) {


    if (WorldUnit.isArmyCapital(type)) {
        return Battel.heroArmiesAre(idHero, Elkaisar.World.UnitTypeData[type].ArmyReq);
    }


    return true;
};

Battel.heroArmiesAre = function (idHero, armyType) {

    var hero = getHeroById(idHero);

    armyType = Number(armyType);

    if (Number(hero.army.f_1_type) > 0 && Number(hero.army.f_1_type) !== armyType)
        return false;
    if (Number(hero.army.f_2_type) > 0 && Number(hero.army.f_2_type) !== armyType)
        return false;
    if (Number(hero.army.f_3_type) > 0 && Number(hero.army.f_3_type) !== armyType)
        return false;

    if (Number(hero.army.b_1_type) > 0 && Number(hero.army.b_1_type) !== armyType)
        return false;
    if (Number(hero.army.b_2_type) > 0 && Number(hero.army.b_2_type) !== armyType)
        return false;
    if (Number(hero.army.b_3_type) > 0 && Number(hero.army.b_3_type) !== armyType)
        return false;


    return true;
};