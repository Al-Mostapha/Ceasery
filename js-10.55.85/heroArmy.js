Elkaisar.HeroArmy = {};



Elkaisar.HeroArmy.dragArmy = function (e, el) {

    var ev = e.originalEvent;
    var dragPlace = $(el);
    var Amount = 0;
    var armyPlace = dragPlace.attr("data-army-place");
    ev.dataTransfer.setData("text", ev.target.id);
    if (dragPlace.attr("data-drag-place") == "hero") {
        var idHero = dragPlace.attr("data-id-hero");
        if (!Elkaisar.Hero.getHero(idHero))
            return ev.preventDefault();
        Amount = Elkaisar.Hero.getHero(idHero).Army[`${armyPlace}_num`];
    } else if (dragPlace.attr("data-drag-place") == "city") {
        Amount = Elkaisar.CurrentCity.City[armyPlace];
    } else {
        alert("Unnkown drag place");
    }

    if (Amount <= 0)
        return  ev.preventDefault();


    var hold_type = dragPlace.attr("army-type");

    $(".sol").each(function () {
        if ($(this).attr("army-type") === hold_type || $(this).attr("army-type") === "sol-0") {
            $(this).children(".permit-layer").hide();
            $(this).attr("canDropOver", "false");

        } else {
            $(this).children(".permit-layer").show();
            $(this).attr("canDropOver", "true");
        }
    });


};

Elkaisar.HeroArmy.dragArmyEnd = function (e, el) {

    $(".sol").each(function () {
        $(this).children(".permit-layer").hide();
        $(this).attr("canDropOver", "true");
    });


};




Elkaisar.HeroArmy.dropArmy = function (e, el_to) {

    var ev = e.originalEvent;
    ev.preventDefault();

    var DropPlace = $(el_to);
    var DragPlaceId = ev.dataTransfer.getData("text", ev.target.id);
    var DragPlace = $(`#${DragPlaceId}`);
    // attribute
    var DragFrom = DragPlace.attr("data-drag-place");
    var DropTo = $(el_to).attr("data-drop-place");
    var DragArmyFrom = DragPlace.attr("data-army-place");
    var DropArmyTo = $(el_to).attr("data-army-place");
    var solCap = 0;



    var solCap = soldier_cap[DragPlace.attr("army-type").split("-")[1]];
    var available_place = 0;

    if (solCap <= 0) {
        alert_box.failMessage("خطاء نوع الجيش");
        $("#dialg_box .left-nav .selected").click();
        return;
    }

    if (DropTo == "hero") {
        Elkaisar.HeroArmy.dropArmyToHero(DragPlace, DropPlace);

    } else if (DropTo == "city") {

        Elkaisar.HeroArmy.dropArmyToCity(DragPlace, DropPlace);

    } else {
        alert("cannot Drop From This Place");
    }

};


Elkaisar.HeroArmy.dropArmyToHero = function (DragPlace, DropPlace) {

    var max = 0;
    var maxAmount = 0;
    var idHero = DropPlace.attr("data-id-hero");
    var DropHero = Elkaisar.Hero.getHero(idHero);
    var availablePlace = getAvailPlaces(idHero);
    var solCap = soldier_cap[DragPlace.attr("army-type").split("-")[1]];

    if (!heroAvailableForTask(idHero)) {
        alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة");
        return false;
    }

    if (DragPlace.attr("data-drag-place") == "hero") {
        maxAmount = Elkaisar.Hero.getHero(DragPlace.attr("data-id-hero")).Army[`${DragPlace.attr("data-army-place")}_num`];
    } else if (DragPlace.attr("data-drag-place") == "city") {
        maxAmount = Elkaisar.CurrentCity.City[`${DragPlace.attr("data-army-place")}`];
    } else {
        alert("Unknown Drag Place");
    }

    max = Math.min(maxAmount, Math.floor(availablePlace / solCap));


    if (Math.floor(availablePlace / solCap) < 1) {
        alert_box.failMessage("لا توجد امكان خالية للقوات");
        return false;
    } else if (maxAmount < 1) {
        alert_box.failMessage("لا توجد قوات لنقلها");
        return false;
    }

    Elkaisar.HeroArmy.StartDialogBox(DragPlace, DropPlace, max);
};


Elkaisar.HeroArmy.dropArmyToCity = function (DragPlace, DropPlace) {

    var maxAmount = 0;

    if (DragPlace.attr("data-drag-place") == "hero") {
        maxAmount = Elkaisar.Hero.getHero(DragPlace.attr("data-id-hero")).Army[`${DragPlace.attr("data-army-place")}_num`];
    } else if (DragPlace.attr("data-drag-place") == "city") {
        maxAmount = Elkaisar.CurrentCity.City[`${DragPlace.attr("data-army-place")}`];
    } else {
        alert("Unknown Drag Place");
    }
    Elkaisar.HeroArmy.StartDialogBox(DragPlace, DropPlace, maxAmount);

};

Elkaisar.HeroArmy.StartDialogBox = function (DragPlace, DropPlace, MaxNum) {



    var army_content = ` <div id="alert_box" class="alert_for_hero_trade">
                                <div class="row-1"> 
                                    <label class="remin">
                                        0
                                    </label>
                                    <input type="range" min="1" max="${MaxNum}" id="range_input" value="1"/>
                                    <label class="avail">
                                        ${MaxNum}
                                    </label>
                                </div>
                                <div class="row-2">
                                    <input type="text" max="${MaxNum}" min="1" step="${(MaxNum - 1)}" id="input-army-move"  class="amount-input only_num input numeric pull-L" value="${(MaxNum > 0 ? 1 : 0)}"/> 
                                    <div class="number-arrow-wrapper pull-L" style="margin-left: -31px; margin-top: 4.5px;">
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                    <label style="line-height: 38px;"> / ${MaxNum}</label>
                                    
                                </div>
                                <div  class="row-3">
                                    <div class="confim-btn">
                                        <button id="confirmTransArmy" 
                                                data-drag-place="${DragPlace.attr("data-drag-place")}" data-drag-army-place="${DragPlace.attr("data-army-place")}" data-drag-id-hero="${DragPlace.attr("data-id-hero")}"
                                                data-drop-place="${DropPlace.attr("data-drop-place")}" data-drop-army-place="${DropPlace.attr("data-army-place")}" data-drop-id-hero="${DropPlace.attr("data-id-hero")}"
                                                data-max-num="${MaxNum}" class="full-btn full-btn-3x trans-con enter ellipsis">${Translate.Button.General.Confirm[UserLag.language]}</button>
                                    </div>
                                </div>
                            </div>`;

    $("body").append(alert_box.alert("نقل القوات", army_content));
};

Elkaisar.HeroArmy.TransArmyFromHeroToHero = function () {

    var idHeroFrom = $("#confirmTransArmy").attr("data-drag-id-hero");
    var idHeroTo = $("#confirmTransArmy").attr("data-drop-id-hero");
    var ArmyPlaceFrom = $("#confirmTransArmy").attr("data-drag-army-place");
    var ArmyPlaceTo = $("#confirmTransArmy").attr("data-drop-army-place");

    var amount = Math.floor($("#input-army-move").val());
    $("#confirmTransArmy").attr("disabled", "disabled");
    $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/AHeroArmy/transArmyFromHeroToHero`,
        data: {
            amount: amount,
            idCity: Elkaisar.CurrentCity.City.id_city,
            idHeroFrom: idHeroFrom,
            idHeroTo: idHeroTo,
            ArmyPlaceFrom: ArmyPlaceFrom,
            ArmyPlaceTo: ArmyPlaceTo,
            token: Elkaisar.Config.OuthToken,
            idPlayer: Elkaisar.DPlayer.Player.id_player
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            $("#over_lay_alert").remove();
            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
                alert(data);
                return;
            }

            if (json_data.state == "SysBusy")
                return alert_box.confirmMessage("النظام مشغول الان حاول فى وقت لاحق");
            if (json_data.state === "ok") {

                Elkaisar.Hero.getHero(idHeroFrom).Army = json_data.HeroArmyFrom;
                Elkaisar.Hero.getHero(idHeroTo).Army = json_data.HeroArmyTo;

                army.refreshArmy_leftTrade();
                army.refreshArmy_rightTrade();


            } else if (json_data.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (json_data.state === "error_3") {
                alert_box.failMessage("لا توجد قوات كافية");
            } else if (json_data.state === "error_4") {
                alert_box.failMessage("سعة البطل غير كافية");
            } else if (json_data.state === "error_5") {
                alert_box.failMessage("الابطال ليست بالمدينة");
            } else if (json_data.state === "error_6") {
                alert_box.failMessage("الابطال ليست بمدينة واحدة");
            } else {
                alert(data);
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });

};


Elkaisar.HeroArmy.TransArmyFromHeroToCity = function () {

    var amount = Math.floor($("#input-army-move").val());
    var ArmyPlace = $("#confirmTransArmy").attr("data-drag-army-place");
    var idHero = $("#confirmTransArmy").attr("data-drag-id-hero");
    $(document).off("click", ".trans-con");
    $("#confirmTransArmy").attr("disabled", "disabled");
    var idCity = Elkaisar.CurrentCity.City.id_city;

    $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/AHeroArmy/transArmyFromHeroToCity`,
        data: {
            amount: amount,
            idHero: idHero,
            idCity: Elkaisar.CurrentCity.City.id_city,
            ArmyPlace: ArmyPlace,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer,
            idPlayer: Elkaisar.DPlayer.Player.id_player

        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            $("#over_lay_alert").remove();
            $("#confirmTransArmy").removeAttr("disabled");

            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
                alert(data);
                return;
            }

            if (json_data.state == "SysBusy")
                return alert_box.confirmMessage("النظام مشغول الان حاول فى وقت لاحق");


            if (json_data.state === "ok") {

                Elkaisar.City.getCity(idCity).City = json_data.City;
                Elkaisar.Hero.getHero(idHero).Army = json_data.HeroArmy;
                army.refreshArmy_leftTrade();
                army.refreshArmy_rightTrade();
                $("#down-trade-army").html(army.downTradeArmy());

            } else if (json_data.state === "error_0") {
                alert_box.failMessage("لا تمتلك هذا البطل");
            } else if (json_data.state === "error_1") {
                alert_box.failMessage("البطل لا يمتلك هذه الخانة");
            } else if (json_data.state === "error_2") {
                alert_box.failMessage("نوع القوات غير صحيح");
            } else if (json_data.state === "error_3") {
                alert_box.failMessage("القيمة اقل من صفر");
            } else if (json_data.state === "error_4") {
                alert_box.failMessage("لا توجد قوات كافية بالبطل");
            } else if (json_data.state === "error_5") {
                alert_box.failMessage("البطل ليس بالمدينة");
            } else {

                alert(data);

            }

            city_profile.refresh_army_view();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};


Elkaisar.HeroArmy.TransArmyFromCityToHero = function () {

    var amount = Math.floor($("#input-army-move").val());
    var idHero = $("#confirmTransArmy").attr("data-drop-id-hero");
    var ArmyHeroPlace = $("#confirmTransArmy").attr("data-drop-army-place");
    var ArmyCityPlace = $("#confirmTransArmy").attr("data-drag-army-place");
    $("#confirmTransArmy").attr("disabled", "disabled");
    
    $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/AHeroArmy/transArmyFromCityToHero`,
        data: {
            idHero: idHero,
            amount: amount,
            idCity: Elkaisar.CurrentCity.City.id_city,
            ArmyPlace: ArmyHeroPlace,
            ArmyType: ArmyCityPlace,
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken,
            idPlayer: Elkaisar.DPlayer.Player.id_player

        },
        type: 'GET',
        beforeSend: function (xhr) {
        },
        success: function (data, textStatus, jqXHR) {
            
            $("#confirmTransArmy").removeAttr("disabled");
            $("#over_lay_alert").remove();
            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
                alert(data);
                return;
            }

            if (json_data.state == "SysBusy")
                return alert_box.confirmMessage("النظام مشغول الان حاول فى وقت لاحق");
            if (json_data.state === "ok") {

                Elkaisar.CurrentCity.City = json_data.City;
                Elkaisar.Hero.getHero(idHero).Army = json_data.HeroArmy;


                army.refreshArmy_rightTrade();
                army.refreshArmy_leftTrade();

                city_profile.refresh_army_view();

                $("#down-trade-army").html(army.downTradeArmy());

            } else if (json_data.state === "error_3") {
                alert_box.failMessage("لا يمكن نقل هذه الكمية");
            } else if (json_data.state === "error_4") {
                alert_box.failMessage("سعة البطل لا تكفى");
                console.log(json_data);
                console.log(getHeroCapById(Number(id_hero)) - getHeroMaxCap(Elkaisar.Hero.getHero(id_hero)));
            } else if (json_data.state === "error_5") {
                alert_box.failMessage("البطل ليس فى المدينة");
            } else if (json_data.state === "error_6") {
                alert_box.failMessage("لا يوجد جيش يكفى فى المدينة");

                Elkaisar.City.getCityBase().done(function (data) {
                    $("#down-trade-army").html(army.downTradeArmy());
                });

            } else {

                alert(data);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

$(document).on("click", "#confirmTransArmy", function () {

    var amount = Math.floor($("#input-army-move").val()) || 0; // amount in  input
    var maxAmount = $(this).attr("data-max-num");
    var DragPlace = $(this).attr("data-drag-place");
    var DropPlace = $(this).attr("data-drop-place");
    $("#confirmTransArmy").attr("disabled", "disabled");
    $("#confirmTransArmy").prop("disabled", true);
    if (amount < 1) {
        $("#over_lay_alert").remove();
        alert_box.failMessage("عدد القوات غير كافى");
        return;
    }


    if (DragPlace == "hero") {

        if (DropPlace == "hero") {
            Elkaisar.HeroArmy.TransArmyFromHeroToHero();
        } else if (DropPlace == "city") {
            Elkaisar.HeroArmy.TransArmyFromHeroToCity();
        } else {

            alert("unknown Drop Name")

        }



    } else if (DragPlace == "city") {

        if (DropPlace == "hero") {
            Elkaisar.HeroArmy.TransArmyFromCityToHero();
        } else {
            alert("unknown Drop Name 2")
        }


    } else {
        alert("Droplace Error");
    }

});