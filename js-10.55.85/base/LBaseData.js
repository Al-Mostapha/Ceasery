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
        'images/world/seaCity_1.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_1': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/seaCity_2.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_2': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/seaCity_3.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_3': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/seaCity_4.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_4': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/seaCity_5.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_5': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/seaCity_6.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'seaCity_6': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/challangeFieldPlayer.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'challangeFieldPlayer': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/challangeFieldGuild.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'challangeFieldGuild': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/challangeFieldTeam.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'challangeFieldTeam': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/challangeFieldServer.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'challangeFieldServer': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/fightChallangePlayer.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'fightChallangePlayer': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/fightChallangeGuild.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'fightChallangeGuild': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/fightChallangeTeam.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'fightChallangeTeam': [0x0, 0x0, 0x1, 0x1]
            }
        },
        'images/world/fightChallangeServer.png': {
            'tile': 0x180,
            'tileh': 0x180,
            'map': {
                'fightChallangeServer': [0x0, 0x0, 0x1, 0x1]
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
    'images': [
        'images/style/matrail_bg.png',
        'images/style/head_bar.png',
        'images/background/profile_name.png',
        'images/world/smallMap.jpg',
        'images/background/bar_L.png',
        'images/icons/header_resources4.png',
        'images/background/bg_lvl.png',
        'images/style/attack.png',
        'images/style/defense.png',
        'images/style/sp.jpg', 'images/icon-menu/1_h.png',
        'images/icon-menu/1_n.png', 'images/icon-menu/2_h.png',
        'images/icon-menu/2_n.png', 'images/icon-menu/3_h.png',
        'images/icon-menu/3_n.png', 'images/icon-menu/4_h.png',
        'images/icon-menu/4_n.png', 'images/icon-menu/5_h.png',
        'images/icon-menu/5_n.png', 'images/icon-menu/6_h.png',
        'images/icon-menu/6_n.png', 'images/icon-menu/7_h.png',
        'images/icon-menu/7_n.png', 'images/background/alert_box.png',
        'images/background/frame.png', 'images/btns/building/upgrade.png',
        'images/btns/building/upgrade-a.png', 'images/btns/building/upgrade-h.png',
        'images/btns/global/full-btn-1x.png', 'images/btns/global/full-btn-1x-a.png',
        'images/btns/global/full-btn-1x-h.png', 'images/btns/global/full-btn-2x.png',
        'images/btns/global/full-btn-a-2x.png', 'images/btns/global/full-btn-h-2x.png',
        'images/btn-small/speed-up.png', 'images/btn-small/speed-up-active.png',
        'images/btn-small/speed-up-hover.png', 'images/skins/palace.png',
        'images/skins/desc-rect.png', 'images/skins/table-rect.png',
        'images/tools/luck_wheel.png', 'images/tools/image-frame.png',
        'images/tools/gete-left.png', 'images/tools/gate-right.png',
        'images/tools/gate-left-lion.png', 'images/tools/gate-right-lion.png',
        'images/tools/title-red.png', 'images/tools/title-background.png']


};

$(document).ready(function () {

    Crafty.load(THINGS_TO_LOAD, function () {


        $.ajax({

            url: API_URL + "/home/HLogIn/playerEnterServerWeb",
            type: 'POST',
            data: {
                server: SERVER_ID,
                outhToken: TOKEN
            },
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar['LBase']['isJson'](data)) {
                    alert(data), console['log'](data);
                    return;
                }
                var JsonData = JSON['parse'](data);
                JsonData['state'] !== 'ok' && console['log'](JsonData);
                Elkaisar['Config']['WsPort'] = JsonData['WsPort'];
                Elkaisar['Config']['WsHost'] = JsonData['WsHost'];
                Elkaisar['DPlayer']['Player'] = JsonData['Player'];
                Elkaisar['ServerData'] = JsonData['Server'];
                Elkaisar['Config']['OuthToken'] = TOKEN;
                Elkaisar['Config']['idServer'] = JsonData['idServer'];
                Elkaisar['Config']['idCities'] = JsonData['idCities'];
                Elkaisar['Config']['JsVersion'] = JsonData['JsVersion'];

                if (Elkaisar['DPlayer']['Player']['panned'] >= $['now']() / 1000) {
                    alert('هذا الحساب محظور');
                    return;
                }
                Crafty['audio']['play']('war_sound');
                $['ajaxSetup']({
                    'data': {
                        'idPlayerV': Elkaisar['DPlayer']['Player']['id_player']
                    }
                });
                $('html')['trigger']('PlayerReady');

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



$(document).on("PlayerReady", "html", function () {


    $.ajax({
        url: `${API_URL}/js${Elkaisar.Config.JsVersion}/json/ItemLang/${Elkaisar.Config.UserLang}.json`,
        success: function (Items, textStatus, jqXHR) {
            $.ajax({
                url: API_URL + "/js" + Elkaisar.Config.JsVersion + "/json/itemBase.json",
                success: function (data, textStatus, jqXHR) {

                    Elkaisar.BaseData.Items = Items;
                    Player_profile.refreshMatrialBox();

                    Elkaisar.Item.useItemFunc();
                    Elkaisar.Item.useItemBoxFunc();
                    Elkaisar.Item.useArmyBackFunc();

                }
            });

        }
    });


});

Elkaisar.BaseData.HeroToCity = {
    "0": 0,
    "1": "army_a",
    "2": "army_b",
    "3": "army_c",
    "4": "army_d",
    "5": "army_e",
    "6": "army_f"
};

Elkaisar.BaseData.ArmyPower = {
    0            : {"attack" : 0,  "def" : 0,  "vit" : 0,   "dam" : 0,  "break" : 0, "anti_break" : 0, "strike" : 0,  "immunity" : 0,  "res_cap" : 0},
    "army_a"     : {"attack" : 8,  "def" : 8,  "vit" : 60,  "dam" : 3,  "break" : 1, "anti_break" : 1, "strike" : 3,  "immunity" : 1,  "res_cap" : 100},
    "army_b"     : {"attack" : 30, "def" : 20, "vit" : 250, "dam" : 35, "break" : 5, "anti_break" : 2, "strike" : 2,  "immunity" : 2,  "res_cap" : 200},
    "army_c"     : {"attack" : 25, "def" : 30, "vit" : 400, "dam" : 40, "break" : 10,"anti_break" : 10,"strike" : 10, "immunity" : 10, "res_cap" : 220},
    "army_d"     : {"attack" : 9,  "def" : 5,  "vit" : 45,  "dam" : 3,  "break" : 1, "anti_break" : 1, "strike" : 4,  "immunity" : 1,  "res_cap" : 75},
    "army_e"     : {"attack" : 19, "def" : 25, "vit" : 100, "dam" : 19, "break" : 2, "anti_break" : 2, "strike" : 12, "immunity" : 2,  "res_cap" : 35},
    "army_f"     : {"attack" : 40, "def" : 20, "vit" : 600, "dam" : 70, "break" : 12,"anti_break" : 10,"strike" : 10, "immunity" : 10, "res_cap" : 75},
    "spies"      : {"attack" : 0,  "def" : 0,  "vit" : 0,   "dam" : 0,  "break" : 0, "anti_break" : 0, "strike" : 0,  "immunity" : 0,  "res_cap" : 75},
    "wall_a"     : {"attack" : 20, "def" : 10, "vit" : 300, "dam" : 10, "break" : 5, "anti_break" : 4, "strike" : 15, "immunity" : 5,  "res_cap" : 75},
    "wall_b"     : {"attack" : 19, "def" : 25, "vit" : 400, "dam" : 35, "break" : 5, "anti_break" : 4, "strike" : 15, "immunity" : 5,  "res_cap" : 75},
    "wall_c"     : {"attack" : 40, "def" : 20, "vit" : 600, "dam" : 70, "break" : 5, "anti_break" : 4, "strike" : 15, "immunity" : 5,  "res_cap" : 75}
};

Elkaisar.BaseData.Army = {
    "0": {
        food: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        coin: 0,
        people: 0,
        time: 0,
        condetion: [

        ],
        ar_title: "جواسيس",
        image: "images/tech/no_army.png",
        desc: `الفرسا اسرع الفرسان مش عارف اى 
                                    ليس على كل لاعب الالتذام بذالك `,
        vit: 0,
        attack: 0,
        defence: 0,
        damage: 0,
        "break": 0,
        anti_break: 0,
        strike: 0,
        immunity: 0,
        eating: 0,
        speed: 0,
        capacity: 0,
        dismess: {
            food: 0,
            wood: 0,
            stone: 0,
            metal: 0
        }
    },
    "spies": {// جواسيس
        food: 600,
        wood: 150,
        stone: 0,
        metal: 350,
        coin: 90,
        people: 1,
        time: 60,
        condetion: {
            place: BUILDING_TYPS.STABL,
            place_lvl: 1,
            study: "riding",
            lvl: 1
        },
        ar_title: "جواسيس",
        image: "images/items/item027.jpg",
        desc: `كانت الجواسيس هى سلاح الاستخبارت فى العصور الوسطى و كانت اهميتها تكمن فى جب الاخبار من المدن الاخرى 
            ولكن لا يمكنك الوثوق بهذه المعلومات بسسب قلة كفائة الجواسيس لديك`,
        vit: 80,
        attack: 10,
        defence: 12,
        damage: "6-9",
        "break": 0,
        anti_break: 0,
        strike: 0,
        immunity: 0,
        eating: 6,
        speed: 200,
        capacity: 1,
        dismess: {
            food: 180,
            wood: 45,
            stone: 0,
            metal: 105
        }
    },
    "army_a": {// مشاه
        food: 150,
        wood: 500,
        stone: 0,
        metal: 100,
        coin: 18,
        people: 1,
        time: 50,
        condetion: {
            place: BUILDING_TYPS.BARRACKS,
            place_lvl: 1,
            study: 'infantry',
            lvl: 1
        },
        ar_title: "مشاه",
        image: "images/tech/soldier01.jpg",
        desc: `اكثر انواع الجيوش استعمالا اثناء الامبراطورية الرومانية 
                وذلك بسسب سهولة تدريبها  وتسليحها وتكمن قوتها  فى  الاسرار الحربية لديها`,
        vit: 60,
        attack: 8,
        defence: 8,
        damage: "3-6",
        "break": 1,
        anti_break: 1,
        strike: 3,
        immunity: 2,
        eating: 4,
        speed: 300,
        capacity: 40,
        dismess: {
            food: 45,
            wood: 150,
            stone: 0,
            metal: 30
        }
    },
    "army_b": {// اسطبل
        food: 1500,
        wood: 800,
        stone: 0,
        metal: 750,
        coin: 500,
        people: 3,
        time: 300,
        condetion: {
            place: BUILDING_TYPS.STABL,
            place_lvl: 5,
            study: "riding",
            lvl: 3
        },
        ar_title: "فرسان",
        image: "images/tech/soldier02.jpg",
        desc: `سلاح الفرسان هو نموذج الفارس الممتاز في الجيش الروماني من حيث تسليحه عالي المستوى. يخيف هجوم سلاح الفرسان الخصم غير المستعدّ على الرغم من أنهم ليسوا أسرع القوات. مشكلتهم تكلفة صيانتهم لما يتوجب على من يدرّبهم من رصدٍ لطعام الفارس وفرسه.`,
        vit: 250,
        attack: 30,
        defence: 20,
        damage: "33-38",
        "break": 10,
        anti_break: 4,
        strike: 1,
        immunity: 2,
        eating: 18,
        speed: 900,
        capacity: 100,
        dismess: {
            food: 450,
            wood: 240,
            stone: 0,
            metal: 225
        }
    },
    "army_c": {// مدرعين
        food: 2000,
        wood: 500,
        stone: 0,
        metal: 2500,
        coin: 600,
        people: 6,
        time: 500,
        condetion: {
            place: BUILDING_TYPS.BARRACKS,
            place_lvl: 9,
            study: 'infantry',
            lvl: 6
        },
        ar_title: "مدرعين",
        image: "images/tech/soldier03.jpg",
        desc: `المدرعين هم اساس القوات الرومانية بتسليحهم المعقد وتدريباتهم المكثفة يمكن الاعتبار انها من اقوى انواع الجيوش
            يستغرق تدريب الابطال كمية كبيرة كدا من الوقت وذلك بسبب الالتزام لصنع اقوى الابطال`,
        vit: 400,
        attack: 25,
        defence: 30,
        damage: "40-60",
        "break": 10,
        anti_break: 5,
        strike: 10,
        immunity: 5,
        eating: 36,
        speed: 600,
        capacity: 120,
        dismess: {
            food: 600,
            wood: 150,
            stone: 0,
            metal: 750
        }
    },
    "army_d": {// رماه
        food: 300,
        wood: 350,
        stone: 0,
        metal: 300,
        coin: 30,
        people: 1,
        time: 120,
        condetion: {
            place: BUILDING_TYPS.BARRACKS,
            place_lvl: 2,
            study: 'infantry',
            lvl: 2
        },
        ar_title: "رماه",
        image: "images/tech/soldier04.jpg",
        desc: `رماة السهم او  النبالين كانوا زمرة الجيش الرومانى.
                يمكنك الاعتماد عليهم فى الهجوم اما  بالنسبة الى الى الدفاع فلا يمكن ابدا الاعتماد عليهم.
                بسبب ضعف البنية الجسمانية لديهم ولكن يمكن لهذة القوات تنفيذ العديد من الاصابات البالغة  للاعداء`,
        vit: 45,
        attack: 9,
        defence: 5,
        damage: "3-5",
        "break": 2,
        anti_break: 2,
        strike: 3,
        immunity: 2,
        eating: 5,
        speed: 250,
        capacity: 25,
        dismess: {
            food: 90,
            wood: 105,
            stone: 0,
            metal: 90
        }
    },
    "army_e": {// مقاليع
        food: 1000,
        wood: 1200,
        stone: 0,
        metal: 800,
        coin: 120,
        people: 4,
        time: 180,
        condetion: {
            place: BUILDING_TYPS.WORKSHOP,
            place_lvl: 3,
            study: 'army',
            lvl: 1
        },
        ar_title: "مقاليع",
        image: "images/tech/soldier05.jpg",
        desc: `كانت العصور الرومانية عصور ازدهار هندسى ومعمارى .
                احد الأدلة على ذلك هو  سلاح المقاليع لدى الجيوش الرمانية .
                يلحق هذا النوع ضرر كبير جدا  بالاعداء  مهما كانت قوتهم ويشتت جمعهم`,
        vit: 100,
        attack: 19,
        defence: 25,
        damage: "18-20",
        "break": 5,
        anti_break: 2,
        strike: 15,
        immunity: 8,
        eating: 20,
        speed: 150,
        capacity: 35,
        dismess: {
            food: 300,
            wood: 360,
            stone: 0,
            metal: 240
        }
    },
    "army_f": {// منجنيق
        food: 3000,
        wood: 3000,
        stone: 6000,
        metal: 1200,
        coin: 450,
        time: 1000,
        people: 8,
        condetion: {
            place: BUILDING_TYPS.WORKSHOP,
            place_lvl: 7,
            study: 'army',
            lvl: 6
        },
        ar_title: "منجنيق",
        image: "images/tech/soldier06.jpg",
        desc: `اقوى  انوع القوات على الاطلاق .
                لا شك فى ذلك حيث ان هذه القوات مسؤلة عن هدم الاسوار والمبانى الشاهقة.
                فليس من الصعب عليها سحق  الاعداء`,
        vit: 600,
        attack: 40,
        defence: 20,
        damage: "70-70",
        "break": 15,
        anti_break: 4,
        strike: 5,
        immunity: 15,
        eating: 150,
        speed: 100,
        capacity: 75,
        dismess: {
            food: 900,
            wood: 900,
            stone: 1800,
            metal: 360
        }
    },
    "wall_a": {//كمائن
        food: 50,
        wood: 500,
        stone: 100,
        metal: 50,
        coin: 0,
        time: 60,
        people: 0,
        condetion: {
            place: BUILDING_TYPS.WALL,
            place_lvl: 1,
            study: "safe",
            lvl: 1
        },
        ar_title: "كمائن",
        image: "images/tech/defense01.jpg",
        desc: `يتم دس الكمائن داخ السور لعرقلة الاعداء.
                ولكن لا يمكن الاعتماد عليها  فى صد الهجمات`,
        vit: 0,
        attack: 0,
        defence: 0,
        damage: "0-0",
        "break": 0,
        anti_break: 0,
        strike: 0,
        immunity: 0,
        eating: 0,
        speed: 0,
        capacity: 0,
        dismess: {
            food: 15,
            wood: 150,
            stone: 30,
            metal: 15
        },
        wall_space: 1

    },
    "wall_b": {// ابراج
        food: 200,
        wood: 2000,
        stone: 1000,
        metal: 500,
        coin: 0,
        people: 0,
        time: 180,
        condetion: {
            place: BUILDING_TYPS.WALL,
            place_lvl: 3,
            study: "safe",
            lvl: 2
        },
        ar_title: "ابراج",
        image: "images/tech/defense02.jpg",
        desc: `لا تنحصر وظيفة الابراج فى الرقابة على المدن, 
            ولكن تلعب دور هام فى الدفاع عن المدينة عند الهجوم عليها.
            تتميز الابراج بارتفاعتها الشاهقة مما يجعل منها افضلية هجومية ودفاعية ايضا`,
        vit: 200,
        attack: 18,
        defence: 15,
        damage: "12-15",
        "break": 0,
        anti_break: 0,
        strike: 0,
        immunity: 0,
        eating: 0,
        speed: 0,
        capacity: 0,
        dismess: {
            food: 60,
            wood: 600,
            stone: 300,
            metal: 150
        },
        wall_space: 3
    },
    "wall_c": {// احجار  متساقطة
        food: 600,
        wood: 0,
        stone: 8000,
        metal: 0,
        coin: 0,
        time: 600,
        people: 0,
        condetion: {
            place: BUILDING_TYPS.WALL,
            place_lvl: 5,
            study: "safe",
            lvl: 6
        },
        ar_title: "احجار متساقطة",
        image: "images/tech/defense03.jpg",
        desc: `الاحجار المتساقطة من اقوى الاسلحة الدفاعية للمدينة .
                يمكن الاعتماد عليها بالحاق الضرر الجسيم للمعتدى`,
        vit: 0,
        attack: 0,
        defence: 40,
        damage: "40-60",
        "break": 0,
        anti_break: 0,
        strike: 0,
        immunity: 0,
        eating: 0,
        speed: 0,
        capacity: 0,
        dismess: {
            food: 180,
            wood: 0,
            stone: 2400,
            metal: 0
        },
        wall_space: 5
    }

};


Elkaisar.BaseData.PlayerStateData = {

    motiv: {
        image: "images/icons/list/motiv.jpg",
        title: "خطبة تحفيزية",
        ar_title: "",
        en_title: ""
    },
    medical: {
        image: "images/icons/list/medical.png",
        title: "تمثال الشفاء",
        ar_title: "",
        en_title: ""
    },
    wheat: {
        image: "images/icons/list/wheat.png",
        title: "انتاح الغذاء",
        ar_title: "",
        en_title: ""
    },
    metal: {
        image: "images/icons/list/metal.png",
        title: "زبادة انتاج الحديد",
        ar_title: "",
        en_title: ""
    },
    stone: {
        image: "images/icons/list/stone.png",
        title: "زبادة انتاج الصخور",
        ar_title: "",
        en_title: ""
    },
    wood: {
        image: "images/icons/list/wood.png",
        title: "زبادة انتاج الاخشاب",
        ar_title: "",
        en_title: ""
    },
    attack_10: {
        image: "images/icons/list/attack.png",
        title: "زبادة نسبة الهجوم",
        ar_title: "",
        en_title: ""
    },
    defence_10: {
        image: "images/icons/list/deff.png",
        title: "زبادة نسبة الدفاع",
        ar_title: "",
        en_title: ""
    },
    peace: {
        image: "images/icons/list/peace.png",
        title: " الحماية",
        ar_title: "",
        en_title: ""
    },
    silance: {
        image: "images/icons/list/silance.png",
        title: "الصمت",
        ar_title: "",
        en_title: ""
    }

};

Elkaisar.BaseData.Edu = {
    "farming": {
        ar_title: "علم الزراعة",
        image: "images/tech/technology01.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الحقل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.FARM,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }


            return condtions;
        }
    },
    "wooding": {
        ar_title: "علم الاخشاب",
        image: "images/tech/technology02.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الغابات مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WOOD,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "stoning": {
        ar_title: " علم الاحجار",
        image: "images/tech/technology03.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المحجر مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STONE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "mining": {
        ar_title: "علم التعدين",
        image: "images/tech/technology04.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المنجم مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.MINE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "accounting": {
        ar_title: "المحاسبة",
        image: "images/tech/technology05.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "دار المساعدة مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WORSHIP,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "storing": {
        ar_title: "علم التخزين",
        image: "images/tech/technology06.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المخازن مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STORE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "building": {
        ar_title: "الهندسة المعمارية",
        image: "images/tech/technology07.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WALL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "scholership": {
        ar_title: "المنح الدراسية",
        image: "images/tech/technology08.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.THEATER,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "maintenace": {
        ar_title: "علم الصيانة",
        image: "images/tech/technology09.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WALL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "infantry": {
        ar_title: "المشاة",
        image: "images/tech/technology11.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الثكنات مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.BARRACKS,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "riding": {
        ar_title: "الفروسية",
        image: "images/tech/technology12.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STABL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "army": {
        ar_title: "الجيش",
        image: "images/tech/technology13.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "ورشة العمل  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WORKSHOP,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "spying": {
        ar_title: "الاستخبارات",
        image: "images/tech/technology14.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STABL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "leader": {
        ar_title: "القيادة",
        image: "images/tech/technology15.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.THEATER,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "safe": {
        ar_title: "الامن",
        image: "images/tech/technology16.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "medicine": {
        ar_title: "الطب",
        image: "images/tech/technology17.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "logistic": {
        ar_title: "الدعم اللوجستى",
        image: "images/tech/technology18.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "navigating": {
        ar_title: "الملاحة",
        image: "images/tech/technology19.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "supplying": {
        ar_title: "الامداد",
        image: "images/tech/technology20.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    }
};


Elkaisar.BaseData.HeroTheaterName = [
    "ماكسيموس",
    "اشرف",
    "مصطفى",
    "اليكس",
    "اليسا",
    "بطليموس",
    "كليوباترا",
    "هكس",
    "ماجد",
    "يويليوس",
    "مارس",
    "ماكس",
    "صلاح الدين",
    "سيورس",
    "سيزار",
    "اغسطس",
    "جلادياتور",
    "سما",
    "زين",
    "شادو",
    "الملك",
    "القاهر",
    "الاسد",
    "اليس",
    "حورس",
    "يورك"
];

Elkaisar.BaseData.BattelTasks = {
    BATTEL_TASK_CONQUER: 0,
    BATTEL_TASK_DOMINATE: 1,
    BATTEL_TASK_JOIN_ATT: 2,
    BATTEL_TASK_JOIN_DEF: 3,
    BATTEL_TASK_SPY: 4,
    BATTEL_TASK_SUPPORT: 5,
    BATTEL_TASK_HERO_TRANS: 6,
    BATTEL_TASK_SUPPLY: 7,
    BATTEL_TASK_ENTER_CITY: 8,
    BATTEL_TASK_CHALLANGE: 10
};


Elkaisar.BaseData.BattelTaskData = {
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_CONQUER']]: {
        'Title': 'غزو'
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_DOMINATE']]: {
        'Title': 'استيلاء'
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_ATT']]: {
        'Title': 'انضمام للهجوم '
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_DEF']]: {
        'Title': 'انضمام للدفاع'
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SPY']]: {
        'Title': 'تجسس'
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SUPPORT']]: {
        'Title': 'امداد'
    },
    [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_HERO_TRANS']]: {
        'Title': 'نقل'
    }
};
Elkaisar.BaseData.BattelSides = {
    'SideAttack': 1,
    'SideDefence': 0
};

Elkaisar.BaseData.Building.UpgradeBinfit = {};

Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE] = [
    8e4, 16e4, 32e4, 64e4, 128e4, 256e4, 512e4, 1024e4, 2048e4, 4096e4,
    49152e3, 51200e3, 53248e3, 55296e3, 57344e3, 59392e3, 6144e4, 63488e3, 65536e3, 67584e3,
    69632e3, 7168e4, 73728e3, 75776e3, 77824e3, 79872e3, 8192e4, 83968e3, 86016e3, 88064e3
];

Elkaisar['BaseData']['Building']['UpgradeBinfit'][BUILDING_TYPS['COTTAGE']] =
        [0x64, 0xfa, 0x1f4, 0x2ee, 0x3e8, 0x5dc, 0x7d0, 0xabe, 0xdac, 0x1194, 0x1518, 0x15f9, 0x16da, 0x17bb,
            0x189c, 0x197d, 0x1a5e, 0x1b3f, 0x1c20, 0x1d01, 0x1de2, 0x1ec3, 0x1fa4, 0x2085, 0x2166, 0x2247, 0x2328,
            0x2409, 0x24ea, 0x25cb],
        Elkaisar.BaseData.RankIcon = [
            'images/number/1st.png', 'images/number/2nd.png',
            'images/number/3rd.png', 'images/number/4th.png',
            'images/number/5th.png'];
Elkaisar.BaseData.GuildRelation = {
    'RelationAllay': 0,
    'RelationEnemy': 1,
    'RelationFriend': 2
};
Elkaisar.BaseData.GuildRelationTitle = {
    [Elkaisar.BaseData.GuildRelation.RelationAllay]: 'محايد',
    [Elkaisar.BaseData.GuildRelation.RelationEnemy]: 'عدو',
    [Elkaisar.BaseData.GuildRelation.RelationFriend]: 'صديق'
};
