



Elkaisar.LBase.Error = function (data)
{

    alert(data);
    console.log(data);
};

Elkaisar.LBase.isJson = function (str)
{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;

};


const  THINGS_TO_LOAD = {
    "sprites": {

        "images/world/city_0.png": {"tile": 128, "tileh": 128, "map": {"city_0": [0, 0, 1, 1]}},
        "images/world/city_1.png": {"tile": 128, "tileh": 128, "map": {"city_1": [0, 0, 1, 1]}},
        "images/world/city_2.png": {"tile": 128, "tileh": 128, "map": {"city_2": [0, 0, 1, 1]}},
        "images/world/city_3.png": {"tile": 128, "tileh": 128, "map": {"city_3": [0, 0, 1, 1]}},
        "images/world/city_4.png": {"tile": 128, "tileh": 128, "map": {"city_4": [0, 0, 1, 1]}},

        "images/world/wild/d_1.png": {"tile": 128, "tileh": 128, "map": {"d_1": [0, 0, 1, 1]}},
        "images/world/wild/d_2.png": {"tile": 128, "tileh": 128, "map": {"d_2": [0, 0, 1, 1]}},
        "images/world/wild/d_3.png": {"tile": 128, "tileh": 128, "map": {"d_3": [0, 0, 1, 1]}},
        "images/world/wild/d_4.png": {"tile": 128, "tileh": 128, "map": {"d_4": [0, 0, 1, 1]}},
        "images/world/wild/d_5.png": {"tile": 128, "tileh": 128, "map": {"d_5": [0, 0, 1, 1]}},
        "images/world/wild/d_6.png": {"tile": 128, "tileh": 128, "map": {"d_6": [0, 0, 1, 1]}},
        "images/world/wild/d_7.png": {"tile": 128, "tileh": 128, "map": {"d_7": [0, 0, 1, 1]}},
        "images/world/wild/d_8.png": {"tile": 128, "tileh": 128, "map": {"d_8": [0, 0, 1, 1]}},
        "images/world/wild/d_9.png": {"tile": 128, "tileh": 128, "map": {"d_9": [0, 0, 1, 1]}},
        "images/world/wild/d_10.png": {"tile": 128, "tileh": 128, "map": {"d_10": [0, 0, 1, 1]}},

        "images/world/wild/m_1.png": {"tile": 128, "tileh": 128, "map": {"m_1": [0, 0, 1, 1]}},
        "images/world/wild/m_2.png": {"tile": 128, "tileh": 128, "map": {"m_2": [0, 0, 1, 1]}},
        "images/world/wild/m_3.png": {"tile": 128, "tileh": 128, "map": {"m_3": [0, 0, 1, 1]}},
        "images/world/wild/m_4.png": {"tile": 128, "tileh": 128, "map": {"m_4": [0, 0, 1, 1]}},
        "images/world/wild/m_5.png": {"tile": 128, "tileh": 128, "map": {"m_5": [0, 0, 1, 1]}},
        "images/world/wild/m_6.png": {"tile": 128, "tileh": 128, "map": {"m_6": [0, 0, 1, 1]}},
        "images/world/wild/m_7.png": {"tile": 128, "tileh": 128, "map": {"m_7": [0, 0, 1, 1]}},
        "images/world/wild/m_8.png": {"tile": 128, "tileh": 128, "map": {"m_8": [0, 0, 1, 1]}},
        "images/world/wild/m_9.png": {"tile": 128, "tileh": 128, "map": {"m_9": [0, 0, 1, 1]}},
        "images/world/wild/m_10.png": {"tile": 128, "tileh": 128, "map": {"m_10": [0, 0, 1, 1]}},

        "images/world/wild/w_1.png": {"tile": 128, "tileh": 128, "map": {"w_1": [0, 0, 1, 1]}},
        "images/world/wild/w_2.png": {"tile": 128, "tileh": 128, "map": {"w_2": [0, 0, 1, 1]}},
        "images/world/wild/w_3.png": {"tile": 128, "tileh": 128, "map": {"w_3": [0, 0, 1, 1]}},
        "images/world/wild/w_4.png": {"tile": 128, "tileh": 128, "map": {"w_4": [0, 0, 1, 1]}},
        "images/world/wild/w_5.png": {"tile": 128, "tileh": 128, "map": {"w_5": [0, 0, 1, 1]}},
        "images/world/wild/w_6.png": {"tile": 128, "tileh": 128, "map": {"w_6": [0, 0, 1, 1]}},
        "images/world/wild/w_7.png": {"tile": 128, "tileh": 128, "map": {"w_7": [0, 0, 1, 1]}},
        "images/world/wild/w_8.png": {"tile": 128, "tileh": 128, "map": {"w_8": [0, 0, 1, 1]}},
        "images/world/wild/w_9.png": {"tile": 128, "tileh": 128, "map": {"w_9": [0, 0, 1, 1]}},
        "images/world/wild/w_10.png": {"tile": 128, "tileh": 128, "map": {"w_10": [0, 0, 1, 1]}},

        "images/animation/currentUnit.png": {"tile": 18, "tileh": 21, "map": {"arrow": [0, 0, 1, 1]}},
        "images/godGate/godGate.png": {"tile": 62, "tileh": 65, "map": {"godGateBtn": [0, 0, 1, 1]}},
        "images/animation/fireBtn.png": {"tile": 64, "tileh": 54, "map": {"fireBtn": [0, 1]}},

        "images/world/30.png": {"tile": 128, "tileh": 128, "map": {"mnawrat": [0, 0, 1, 1]}},
        "images/world/front_squad.png": {"tile": 128, "tileh": 128, "map": {"front_squad": [0, 0, 1, 1]}},
        "images/world/front_band.png": {"tile": 128, "tileh": 128, "map": {"front_band": [0, 0, 1, 1]}},
        "images/world/front_squadron.png": {"tile": 128, "tileh": 128, "map": {"front_squadron": [0, 0, 1, 1]}},
        "images/world/front_division.png": {"tile": 128, "tileh": 128, "map": {"front_division": [0, 0, 1, 1]}},
        "images/world/armed_light_squad.png": {"tile": 128,
            "tileh": 128,
            "map": {
                "armed_light_squad": [0, 0, 1, 1]
            }
        },
        "images/world/armed_light_band.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_light_band": [0, 0, 1, 1]
            }
        },
        "images/world/armed_light_squadron.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_light_squadron": [0, 0, 1, 1]
            }
        },
        "images/world/armed_light_division.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_light_division": [0, 0, 1, 1]
            }
        },
        "images/world/armed_heavy_squad.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_heavy_squad": [0, 0, 1, 1]
            }
        },
        "images/world/armed_heavy_band.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_heavy_band": [0, 0, 1, 1]
            }
        },
        "images/world/armed_heavy_squadron.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_heavy_squadron": [0, 0, 1, 1]
            }
        },
        "images/world/armed_heavy_division.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "armed_heavy_division": [0, 0, 1, 1]
            }
        },
        "images/world/guard_squad.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "guard_squad": [0, 0, 1, 1]
            }
        },
        "images/world/guard_band.png": {"tile": 128, "tileh": 128, "map": {"guard_band": [0, 0, 1, 1]}},
        "images/world/guard_squadron.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "guard_squadron": [0, 0, 1, 1]
            }
        },
        "images/world/guard_division.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "guard_division": [0, 0, 1, 1]
            }
        },
        "images/world/brave_thunder.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "brave_thunder": [0, 0, 1, 1]
            }
        },
        "images/world/gang.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "gang": [0, 0, 1, 1]
            }
        },
        "images/world/mugger.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "mugger": [0, 0, 1, 1]
            }
        },
        "images/world/thief.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "thief": [0, 0, 1, 1]
            }
        },
        "images/world/carthage/gang.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "carthage_gang": [0, 0, 1, 1]
            }
        },
        "images/world/carthage/teams.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "carthage_teams": [0, 0, 1, 1]
            }
        },
        "images/world/carthage/rebels.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "carthage_rebels": [0, 0, 1, 1]
            }
        },
        "images/world/carthage/forces.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "carthage_forces": [0, 0, 1, 1]
            }
        },
        "images/world/carthage/capital.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "carthage_capital": [0, 0, 1, 1]
            }
        },
        "images/world/army-capital.png": {"tile": 128, "tileh": 128, "map": {"army_capital": [0, 0, 1, 1]}},
        "images/world/queenCity_1.png": {"tile": 128, "tileh": 128, "map": {"queenCity_1": [0, 0, 1, 1]}},
        "images/world/queenCity_2.png": {"tile": 128, "tileh": 128, "map": {"queenCity_2": [0, 0, 1, 1]}},
        "images/world/queenCity_3.png": {"tile": 128, "tileh": 128, "map": {"queenCity_3": [0, 0, 1, 1]}},

        "images/world/repleCastle_1.png": {"tile": 128, "tileh": 128, "map": {"repleCastle_1": [0, 0, 1, 1]}},
        "images/world/repleCastle_2.png": {"tile": 128, "tileh": 128, "map": {"repleCastle_2": [0, 0, 1, 1]}},
        "images/world/repleCastle_3.png": {"tile": 128, "tileh": 128, "map": {"repleCastle_3": [0, 0, 1, 1]}},
        "images/world/wolf.png": {"tile": 128, "tileh": 128, "map": {"wolfStatue": [0, 0, 1, 1]}},

        "images/world/arena.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "arena": [0, 0, 1, 1]
            }
        },
        "images/world/city_shield.png": {
            "tile": 128,
            "tileh": 128,
            "map": {
                "city_shield": [0, 0, 1, 1]
            }
        },
        "images/city/palace.png": {
            "tile": 256,
            "tileh": 162,
            "map": {
                "palace": [0, 0, 1, 1]
            }
        },
        "images/city/wall_0_.png": {
            "tile": 680,
            "tileh": 394,
            "map": {
                "wall_0": [0, 0, 1, 1]
            }
        },
        "images/city/wall_1_.png": {
            "tile": 680,
            "tileh": 394,
            "map": {
                "wall_1": [0, 0, 1, 1]
            }
        },
        "images/city/wall_2_.png": {
            "tile": 680,
            "tileh": 394,
            "map": {
                "wall_2": [0, 0, 1, 1]
            }
        },
        "images/city/wall_3_.png": {
            "tile": 680,
            "tileh": 394,
            "map": {
                "wall_3": [0, 0, 1, 1]
            }
        },
        "images/city/wall_4_.png": {
            "tile": 680,
            "tileh": 394,
            "map": {
                "wall_4": [0, 0, 1, 1]
            }
        },
        "images/city/_seaport.png": {"tile": 518, "tileh": 285, "map": {"seaport": [0, 0, 1, 1]}},
        "images/city/_market.png": {
            "tile": 256,
            "tileh": 256,
            "map": {
                "market": [0, 0, 1, 1]
            }
        },
        "images/city/_farm.png": {
            "tile": 350,
            "tileh": 206,
            "map": {
                "farm": [0, 0, 1, 1]
            }
        },
        "images/city/_mine.png": {
            "tile": 412,
            "tileh": 243,
            "map": {
                "mine": [0, 0, 1, 1]
            }
        },
        "images/city/_mahger.png": {
            "tile": 412,
            "tileh": 243,
            "map": {
                "mahger": [0, 0, 1, 1]
            }
        },
        "images/city/_wood_maker.png": {
            "tile": 192,
            "tileh": 128,
            "map": {
                "wood_maker": [0, 0, 1, 1]
            }
        },
        "images/city/_lighthouse.png": {
            "tile": 160,
            "tileh": 353,
            "map": {
                "lighthouse": [0, 0, 1, 1]
            }
        },
        "images/city/_B1.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B1": [0, 0, 1, 1]
            }
        },
        "images/city/_B2.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B2": [0, 0, 1, 1]
            }
        },
        "images/city/_B3.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B3": [0, 0, 1, 1]
            }
        },
        "images/city/_B4.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B4": [0, 0, 1, 1]
            }
        },
        "images/city/_B5.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B5": [0, 0, 1, 1]
            }
        },
        "images/city/_B6.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B6": [0, 0, 1, 1]
            }
        },
        "images/city/_B7.png": {// 
            "tile": 192,
            "tileh": 192,
            "map": {
                "B7": [0, 0, 1, 1]
            }
        },
        "images/city/_B8.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B8": [0, 0, 1, 1]
            }
        },
        "images/city/_B9.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B9": [0, 0, 1, 1]
            }
        },
        "images/city/_B10.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B10": [0, 0, 1, 1]
            }
        },
        "images/city/_B11.png": {// 
            "tile": 160,
            "tileh": 120,
            "map": {
                "B11": [0, 0, 1, 1]
            }
        },
        "images/city/no_building.png": {
            "tile": 160,
            "tileh": 120,
            "map": {
                "no_building": [0, 0, 1, 1]
            }
        },

        "images/city/city_floor.jpg": {
            "tile": 2500,
            "tileh": 1400,
            "map": {
                "city_floor": [0, 0, 1, 1]
            }
        },
        "images/animation/upgrading_hammer.png": {
            // This is the width of each image in pixels
            tile: 161.3,
            // The height of each image
            tileh: 120,
            // We give names to three individual images
            map: {
                hammer_start: [0, 0],
                hammer_end: [8, 0]
            }
        },
        "images/animation/fountain.png": {
            // This is the width of each image in pixels
            tile: 40,
            // The height of each image
            tileh: 32,
            // We give names to three individual images
            map: {
                fountain: [0, 0]
            }
        },
        "images/animation/wood_maker.png": {
            // This is the width of each image in pixels
            tile: 90.35,
            // The height of each image
            tileh: 64,
            // We give names to three individual images
            map: {
                ani_wood_maker: [0, 0]
            }
        },
        "images/animation/wood_man.png": {
            // This is the width of each image in pixels
            tile: 58,
            // The height of each image
            tileh: 58,
            // We give names to three individual images
            map: {
                ani_wood_man: [0, 0]
            }
        },
        "images/animation/mine_man.png": {
            // This is the width of each image in pixels
            tile: 58,
            // The height of each image
            tileh: 58,
            // We give names to three individual images
            map: {
                mine_man: [0, 0]
            }
        },
        "images/animation/stone_man.png": {
            // This is the width of each image in pixels
            tile: 58,
            // The height of each image
            tileh: 58,
            // We give names to three individual images
            map: {
                stone_man: [0, 0]
            }
        },
        "images/animation/stone_carry.png": {
            // This is the width of each image in pixels
            tile: 58,
            // The height of each image
            tileh: 58,
            // We give names to three individual images
            map: {
                stone_carry: [0, 0]
            }
        },
        "images/animation/no_carry.png": {
            // This is the width of each image in pixels
            tile: 58,
            // The height of each image
            tileh: 58,
            // We give names to three individual images
            map: {
                no_carry: [0, 0]
            }
        },
        "images/animation/attack_fire.png": {
            // This is the width of each image in pixels
            tile: 42,
            // The height of each image
            tileh: 63,
            // We give names to three individual images
            map: {
                fire_start: [0, 0],
                fire_end: [7, 0]
            }
        },
        "images/animation/flags.png": {
            // This is the width of each image in pixels
            tile: 34,
            // The height of each image
            tileh: 24,
            // We give names to three individual images
            map: {
                flag_over_city: [0, 0]
            }
        },
        "images/animation/cloud.png": {
            // This is the width of each image in pixels
            tile: 150,
            // The height of each image
            tileh: 150,
            // We give names to three individual images
            map: {
                cloud: [0, 0]
            }
        },
        "images/world/unit_floor.png": {
            // This is the width of each image in pixels
            tile: 128,
            // The height of each image
            tileh: 96,
            // We give names to three individual images
            map: {
                unit_floor: [0, 0],
            }

        }

    },
    "audio": {
        "war_sound": "sounds/war_sound.mp3",
        "upgrade_done": "sounds/upgrade_done.mp3",
        "bird_sound": "sounds/bird_sound.mp3",
        "click_sound": "sounds/click_sound.mp3",
        "close_sound": "sounds/door_close.mp3"
    },
    "images": [

        "images/style/matrail_bg.png",
        "images/style/head_bar.png",
        "images/background/profile_name.png",
        "images/world/smallMap.jpg",
        "images/background/bar_L.png",
        "images/icons/header_resources4.png",
        "images/background/bg_lvl.png",
        "images/style/attack.png",
        "images/style/defense.png",
        "images/style/sp.jpg",
        "images/icon-menu/1_h.png",
        "images/icon-menu/1_n.png",
        "images/icon-menu/2_h.png",
        "images/icon-menu/2_n.png",
        "images/icon-menu/3_h.png",
        "images/icon-menu/3_n.png",
        "images/icon-menu/4_h.png",
        "images/icon-menu/4_n.png",
        "images/icon-menu/5_h.png",
        "images/icon-menu/5_n.png",
        "images/icon-menu/6_h.png",
        "images/icon-menu/6_n.png",
        "images/icon-menu/7_h.png",
        "images/icon-menu/7_n.png",
        "images/background/alert_box.png",
        "images/background/frame.png",
        "images/btns/building/upgrade.png",
        "images/btns/building/upgrade-a.png",
        "images/btns/building/upgrade-h.png",
        "images/btns/global/full-btn-1x.png",
        "images/btns/global/full-btn-1x-a.png",
        "images/btns/global/full-btn-1x-h.png",
        "images/btns/global/full-btn-2x.png",
        "images/btns/global/full-btn-a-2x.png",
        "images/btns/global/full-btn-h-2x.png",
        "images/btn-small/speed-up.png",
        "images/btn-small/speed-up-active.png",
        "images/btn-small/speed-up-hover.png",
        "images/skins/palace.png",
        "images/skins/desc-rect.png",
        "images/skins/table-rect.png",
        "images/tools/luck_wheel.png",
        "images/tools/image-frame.png",
        "images/tools/gete-left.png",
        "images/tools/gate-right.png",
        "images/tools/gate-left-lion.png",
        "images/tools/gate-right-lion.png",
        "images/tools/title-red.png",
        "images/tools/title-background.png"

    ]

};

$(document).ready(function () {

    Crafty.load(THINGS_TO_LOAD, function () {


        $.ajax({

            url: API_URL + "/home/HLogIn/playerEnterServerWeb",
            type: 'POST',
            data:{
                server    : SERVER_ID,
                outhToken : TOKEN
            },
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                {
                    alert(data);
                    console.log(data);

                }


                var jsonObj = JSON.parse(data);

                if (jsonObj.state !== "ok")
                {
                    console.log(jsonObj);
                    //window.location.replace("http://www.elkaisar.com");
                }


                Elkaisar.Config.WsPort = jsonObj.WsPort;
                Elkaisar.Config.WsHost = jsonObj.WsHost;
                Elkaisar.DPlayer.Player = jsonObj.Player;
                Elkaisar.ServerData = jsonObj.Server;
                Elkaisar.Config.OuthToken = jsonObj.OuthToken;
                Elkaisar.Config.idServer = jsonObj.idServer;
                Elkaisar.Config.idCities = jsonObj.idCities;

                TOKEN = jsonObj.OuthToken;

                Crafty.audio.play("war_sound");






                $("html").trigger("PlayerReady");

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });


        },
                function (e) {
                    loading(e.percent);
                }, function (e) {
            console.log(e);
        }
    );

});


Elkaisar.BaseData.Promotion = [
    {
        Title: "مواطن"
    },
    {
        Title: "عريف"
    },
    {
        Title: "رقيب"
    },
    {
        Title: "قسطور"
    },
    {
        Title: "قسطور اعلى"
    },
    {
        Title: "نائب"
    },
    {
        Title: "قاضى"
    },
    {
        Title: "موفد"
    },
    {
        Title: "ديكتاتور"
    },
    {
        Title: "قائد الفيلق الخامس"
    },
    {
        Title: "قائد الفيلق الرابع"
    },
    {
        Title: "قائد الفيلق الثالث"
    },
    {
        Title: "قائد الفيلق الثانى"
    },
    {
        Title: "قائد الفيلق الاول"
    },
    {
        Title: "لواء"
    },
    {
        Title: "فريق"
    },
    {
        Title: "فريق درجة 1"
    },
    {
        Title: "فريق درجة 2"
    },
    {
        Title: "فريق درجة 3"
    },
    {
        Title: "مارشال"
    },
    {
        Title: "رقيب درجة 9"
    },
    {
        Title: "رقيب درجة 8"
    },
    {
        Title: "رقيب درجة 7"
    },
    {
        Title: "رقيب درجة 6"
    },
    {
        Title: "رقيب درجة 5"
    },
    {
        Title: "رقيب درجة 4"
    },
    {
        Title: "رقيب درجة 3"
    },
    {
        Title: "رقيب درجة 2"
    },
    {
        Title: "رقيب درجة 1"
    },
    {
        Title: "قيصر"
    }
];


Elkaisar.BaseData.Building = {};


Elkaisar.BaseData.HeroAvatar = [
    "images/hero/faceA1.jpg",
    "images/hero/faceA2.jpg",
    "images/hero/faceA3.jpg",
    "images/hero/faceA4.jpg",
    "images/hero/faceA5.jpg",
    "images/hero/faceA6.jpg",
    "images/hero/faceA7.jpg",
    "images/hero/faceA8.jpg",
    "images/hero/faceA9.jpg",
    "images/hero/faceA10.jpg",
    "images/hero/faceB1.jpg",
    "images/hero/faceB2.jpg",
    "images/hero/faceB3.jpg",
    "images/hero/faceB4.jpg",
    "images/hero/faceB5.jpg",
    "images/hero/faceB6.jpg",
    "images/hero/faceB7.jpg",
    "images/hero/faceB8.jpg",
    "images/hero/faceB9.jpg",
    "images/hero/faceB9.jpg"
];


const BUILDING_TYPS = {
    SPACE: 0, // 
    COTTAGE: 1, //
    STORE: 2, //
    BARRACKS: 3, //
    STABL: 4, //
    WORKSHOP: 5, //
    THEATER: 6, //
    STATION: 7, //
    UNIVERSITY: 8, //
    ACADEMY: 9, //
    WORSHIP: 10, //
    HOSPITAL: 11, //
    PALACE: 12, //
    WALL: 13, //
    MARKET: 14, //
    WOOD: 15, //
    FARM: 16, //
    MINE: 17, //
    STONE: 18, //
    SEAPORT: 19, //
    LIGHTHOUSE: 20  //
};

Elkaisar.BaseData.Items = {};