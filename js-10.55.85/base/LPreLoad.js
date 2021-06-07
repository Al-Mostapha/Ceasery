$.ajaxSetup({
    crossDomain: true
});
var FIXED_WORLD_UNIT = [];
var ALL_WORLD_CITY = [];
var WORLD_ALL_UNIT = [];
var Elkaisar = {};
Elkaisar.MAX_SCREEN_WIDTH = $(document).width();
Elkaisar.MAX_SCREEN_HEIGHT = $(document).height();
Elkaisar.worldAllUnits = new Array(500 * 500);
Elkaisar.Player = {};
Elkaisar.DPlayer = {
    Player: {},
    GuildData: {},
    PlayerState: {},
    PlayerEdu: {},
    Items: {},
    City: {},
    Heros: [],
    Equip: []
};
Elkaisar.World = {};
Elkaisar.Ui = {};
Elkaisar.Ui.Select = {};
Elkaisar.World.Province = {};
Elkaisar.World.Map = {};
Elkaisar.MenuList = {};
Elkaisar.Building = {};
Elkaisar.Building.Palace = {};
Elkaisar.Building.Theater = {};
Elkaisar.Animation = {};
Elkaisar.WsLib = {};
Elkaisar.Contribute = {};
Elkaisar.Hero = {};
Elkaisar.CurrentHero = {};
Elkaisar.NextHero = {};
Elkaisar.Army = {};
Elkaisar.Equip = {};
Elkaisar.Item = {};
Elkaisar.Guild = {
    GuildData: {},
    LeaderName: "",
    prizeShare: 0,
    Allay: [],
    Invetaions: [],
    Requests: [],
    MemberList: []
};

Elkaisar.CurrentWorldUnit = {
    AttackQueList: [],
    Army: {
        army_a: 0, army_b: 0, army_c: 0,
        army_d: 0, army_e: 0, army_f: 0
    },
    EQuip: {
        boot: {}, armor: {}, shield: {}, helmet: {}, sword: {},
        belt: {}, necklace: {}, pendant: {}, ring: {}, steed: {}
    },
    xCoord: 0,
    yCoord: 0
};

Elkaisar.TimedTask = {
    TaskList: {
        Building: {},
        Study: {},
        Army: {},
        Jop: {}
    }

};


Elkaisar.Battel = {
    Battels: [],
    LeavinHeros: [],
    HeroBack: [],
    HeroGarrison: [],
    SpyingList: [],
    CurrentBattel: {}
};

Elkaisar.ServerData = {};

Elkaisar.LBase = {};
Elkaisar.Config = {
    WsPort: 0,
    WsHost: "",
    JsVersion: "",
    OuthToken: "",
    idServer: 0,
    UserLang: "ar",
    idCities: []
};


Elkaisar.City = {};
Elkaisar.CurrentCity = {};



Elkaisar.BaseData = {};
Elkaisar.GE = {}

Elkaisar.GE.LoadingScene = {};
Elkaisar.GE.CityScene = {};
Elkaisar.GE.WorldScene = {};



Elkaisar.GE.LPreLoad = function () {
    Elkaisar.GE.CityScene.load.image('city_0', BASE_ASSET_BATH + 'images/world/city_0.png');
    Elkaisar.GE.CityScene.load.image('city_1', BASE_ASSET_BATH + 'images/world/city_1.png');
    Elkaisar.GE.CityScene.load.image('city_2', BASE_ASSET_BATH + 'images/world/city_2.png');
    Elkaisar.GE.CityScene.load.image('city_3', BASE_ASSET_BATH + 'images/world/city_3.png');
    Elkaisar.GE.CityScene.load.image('city_4', BASE_ASSET_BATH + 'images/world/city_4.png');
    Elkaisar.GE.CityScene.load.image('d_1', BASE_ASSET_BATH + 'images/world/wild/d_1.png');
    Elkaisar.GE.CityScene.load.image('d_2', BASE_ASSET_BATH + 'images/world/wild/d_2.png');
    Elkaisar.GE.CityScene.load.image('d_3', BASE_ASSET_BATH + 'images/world/wild/d_3.png');
    Elkaisar.GE.CityScene.load.image('d_4', BASE_ASSET_BATH + 'images/world/wild/d_4.png');
    Elkaisar.GE.CityScene.load.image('d_5', BASE_ASSET_BATH + 'images/world/wild/d_5.png');
    Elkaisar.GE.CityScene.load.image('d_6', BASE_ASSET_BATH + 'images/world/wild/d_6.png');
    Elkaisar.GE.CityScene.load.image('d_7', BASE_ASSET_BATH + 'images/world/wild/d_7.png');
    Elkaisar.GE.CityScene.load.image('d_8', BASE_ASSET_BATH + 'images/world/wild/d_8.png');
    Elkaisar.GE.CityScene.load.image('d_9', BASE_ASSET_BATH + 'images/world/wild/d_9.png');
    Elkaisar.GE.CityScene.load.image('d_10', BASE_ASSET_BATH + 'images/world/wild/d_10.png');
    Elkaisar.GE.CityScene.load.image('m_1', BASE_ASSET_BATH + 'images/world/wild/m_1.png');
    Elkaisar.GE.CityScene.load.image('m_2', BASE_ASSET_BATH + 'images/world/wild/m_2.png');
    Elkaisar.GE.CityScene.load.image('m_3', BASE_ASSET_BATH + 'images/world/wild/m_3.png');
    Elkaisar.GE.CityScene.load.image('m_4', BASE_ASSET_BATH + 'images/world/wild/m_4.png');
    Elkaisar.GE.CityScene.load.image('m_5', BASE_ASSET_BATH + 'images/world/wild/m_5.png');
    Elkaisar.GE.CityScene.load.image('m_6', BASE_ASSET_BATH + 'images/world/wild/m_6.png');
    Elkaisar.GE.CityScene.load.image('m_7', BASE_ASSET_BATH + 'images/world/wild/m_7.png');
    Elkaisar.GE.CityScene.load.image('m_8', BASE_ASSET_BATH + 'images/world/wild/m_8.png');
    Elkaisar.GE.CityScene.load.image('m_9', BASE_ASSET_BATH + 'images/world/wild/m_9.png');
    Elkaisar.GE.CityScene.load.image('m_10', BASE_ASSET_BATH + 'images/world/wild/m_10.png');
    Elkaisar.GE.CityScene.load.image('w_1', BASE_ASSET_BATH + 'images/world/wild/w_1.png');
    Elkaisar.GE.CityScene.load.image('w_2', BASE_ASSET_BATH + 'images/world/wild/w_2.png');
    Elkaisar.GE.CityScene.load.image('w_3', BASE_ASSET_BATH + 'images/world/wild/w_3.png');
    Elkaisar.GE.CityScene.load.image('w_4', BASE_ASSET_BATH + 'images/world/wild/w_4.png');
    Elkaisar.GE.CityScene.load.image('w_5', BASE_ASSET_BATH + 'images/world/wild/w_5.png');
    Elkaisar.GE.CityScene.load.image('w_6', BASE_ASSET_BATH + 'images/world/wild/w_6.png');
    Elkaisar.GE.CityScene.load.image('w_7', BASE_ASSET_BATH + 'images/world/wild/w_7.png');
    Elkaisar.GE.CityScene.load.image('w_8', BASE_ASSET_BATH + 'images/world/wild/w_8.png');
    Elkaisar.GE.CityScene.load.image('w_9', BASE_ASSET_BATH + 'images/world/wild/w_9.png');
    Elkaisar.GE.CityScene.load.image('w_10', BASE_ASSET_BATH + 'images/world/wild/w_10.png');
    Elkaisar.GE.CityScene.load.image('arrow', BASE_ASSET_BATH + 'images/animation/currentUnit.png');
    Elkaisar.GE.CityScene.load.image('godGateBtn', BASE_ASSET_BATH + 'images/godGate/godGate.png');
    Elkaisar.GE.CityScene.load.image('fireBtn', BASE_ASSET_BATH + 'images/animation/fireBtn.png');
    Elkaisar.GE.CityScene.load.image('mnawrat', BASE_ASSET_BATH + 'images/world/30.png');
    Elkaisar.GE.CityScene.load.image('front_squad', BASE_ASSET_BATH + 'images/world/front_squad.png');
    Elkaisar.GE.CityScene.load.image('front_band', BASE_ASSET_BATH + 'images/world/front_band.png');
    Elkaisar.GE.CityScene.load.image('front_squadron', BASE_ASSET_BATH + 'images/world/front_squadron.png');
    Elkaisar.GE.CityScene.load.image('front_division', BASE_ASSET_BATH + 'images/world/front_division.png');
    Elkaisar.GE.CityScene.load.image('armed_light_squad', BASE_ASSET_BATH + 'images/world/armed_light_squad.png');
    Elkaisar.GE.CityScene.load.image('armed_light_band', BASE_ASSET_BATH + 'images/world/armed_light_band.png');
    Elkaisar.GE.CityScene.load.image('armed_light_squadron', BASE_ASSET_BATH + 'images/world/armed_light_squadron.png');
    Elkaisar.GE.CityScene.load.image('armed_light_division', BASE_ASSET_BATH + 'images/world/armed_light_division.png');
    Elkaisar.GE.CityScene.load.image('armed_heavy_squad', BASE_ASSET_BATH + 'images/world/armed_heavy_squad.png');
    Elkaisar.GE.CityScene.load.image('armed_heavy_band', BASE_ASSET_BATH + 'images/world/armed_heavy_band.png');
    Elkaisar.GE.CityScene.load.image('armed_heavy_squadron', BASE_ASSET_BATH + 'images/world/armed_heavy_squadron.png');
    Elkaisar.GE.CityScene.load.image('armed_heavy_division', BASE_ASSET_BATH + 'images/world/armed_heavy_division.png');
    Elkaisar.GE.CityScene.load.image('guard_squad', BASE_ASSET_BATH + 'images/world/guard_squad.png');
    Elkaisar.GE.CityScene.load.image('guard_band', BASE_ASSET_BATH + 'images/world/guard_band.png');
    Elkaisar.GE.CityScene.load.image('guard_squadron', BASE_ASSET_BATH + 'images/world/guard_squadron.png');
    Elkaisar.GE.CityScene.load.image('guard_division', BASE_ASSET_BATH + 'images/world/guard_division.png');
    Elkaisar.GE.CityScene.load.image('brave_thunder', BASE_ASSET_BATH + 'images/world/brave_thunder.png');
    Elkaisar.GE.CityScene.load.image('gang', BASE_ASSET_BATH + 'images/world/gang.png');
    Elkaisar.GE.CityScene.load.image('mugger', BASE_ASSET_BATH + 'images/world/mugger.png');
    Elkaisar.GE.CityScene.load.image('thief', BASE_ASSET_BATH + 'images/world/thief.png');
    Elkaisar.GE.CityScene.load.image('carthage_gang', BASE_ASSET_BATH + 'images/world/carthage/gang.png');
    Elkaisar.GE.CityScene.load.image('carthage_teams', BASE_ASSET_BATH + 'images/world/carthage/teams.png');
    Elkaisar.GE.CityScene.load.image('carthage_rebels', BASE_ASSET_BATH + 'images/world/carthage/rebels.png');
    Elkaisar.GE.CityScene.load.image('carthage_forces', BASE_ASSET_BATH + 'images/world/carthage/forces.png');
    Elkaisar.GE.CityScene.load.image('carthage_capital', BASE_ASSET_BATH + 'images/world/carthage/capital.png');
    Elkaisar.GE.CityScene.load.image('army_capital', BASE_ASSET_BATH + 'images/world/army-capital.png');
    Elkaisar.GE.CityScene.load.image('queenCity_1', BASE_ASSET_BATH + 'images/world/queenCity_1.png');
    Elkaisar.GE.CityScene.load.image('queenCity_2', BASE_ASSET_BATH + 'images/world/queenCity_2.png');
    Elkaisar.GE.CityScene.load.image('queenCity_3', BASE_ASSET_BATH + 'images/world/queenCity_3.png');
    Elkaisar.GE.CityScene.load.image('repleCastle_1', BASE_ASSET_BATH + 'images/world/repleCastle_1.png');
    Elkaisar.GE.CityScene.load.image('repleCastle_2', BASE_ASSET_BATH + 'images/world/repleCastle_2.png');
    Elkaisar.GE.CityScene.load.image('repleCastle_3', BASE_ASSET_BATH + 'images/world/repleCastle_3.png');
    Elkaisar.GE.CityScene.load.image('wolfStatue', BASE_ASSET_BATH + 'images/world/wolf.png');
    Elkaisar.GE.CityScene.load.image('arena', BASE_ASSET_BATH + 'images/world/arena.png');
    Elkaisar.GE.CityScene.load.image('seaCity_1', BASE_ASSET_BATH + 'images/world/seaCity_1.png');
    Elkaisar.GE.CityScene.load.image('seaCity_2', BASE_ASSET_BATH + 'images/world/seaCity_2.png');
    Elkaisar.GE.CityScene.load.image('seaCity_3', BASE_ASSET_BATH + 'images/world/seaCity_3.png');
    Elkaisar.GE.CityScene.load.image('seaCity_4', BASE_ASSET_BATH + 'images/world/seaCity_4.png');
    Elkaisar.GE.CityScene.load.image('seaCity_5', BASE_ASSET_BATH + 'images/world/seaCity_5.png');
    Elkaisar.GE.CityScene.load.image('seaCity_6', BASE_ASSET_BATH + 'images/world/seaCity_6.png');
    Elkaisar.GE.CityScene.load.image('challangeFieldPlayer', BASE_ASSET_BATH + 'images/world/challangeFieldPlayer.png');
    Elkaisar.GE.CityScene.load.image('challangeFieldGuild', BASE_ASSET_BATH + 'images/world/challangeFieldGuild.png');
    Elkaisar.GE.CityScene.load.image('challangeFieldTeam', BASE_ASSET_BATH + 'images/world/challangeFieldTeam.png');
    Elkaisar.GE.CityScene.load.image('challangeFieldServer', BASE_ASSET_BATH + 'images/world/challangeFieldServer.png');
    Elkaisar.GE.CityScene.load.image('fightChallangePlayer', BASE_ASSET_BATH + 'images/world/fightChallangePlayer.png');
    Elkaisar.GE.CityScene.load.image('fightChallangeGuild', BASE_ASSET_BATH + 'images/world/fightChallangeGuild.png');
    Elkaisar.GE.CityScene.load.image('fightChallangeTeam', BASE_ASSET_BATH + 'images/world/fightChallangeTeam.png');
    Elkaisar.GE.CityScene.load.image('fightChallangeServer', BASE_ASSET_BATH + 'images/world/fightChallangeServer.png');
    Elkaisar.GE.CityScene.load.image('city_shield', BASE_ASSET_BATH + 'images/world/city_shield.png');
    Elkaisar.GE.CityScene.load.image('palace', BASE_ASSET_BATH + 'images/city/palace.png');
    Elkaisar.GE.CityScene.load.image('wall_0', BASE_ASSET_BATH + 'images/city/wall_0_.png');
    Elkaisar.GE.CityScene.load.image('wall_1', BASE_ASSET_BATH + 'images/city/wall_1_.png');
    Elkaisar.GE.CityScene.load.image('wall_2', BASE_ASSET_BATH + 'images/city/wall_2_.png');
    Elkaisar.GE.CityScene.load.image('wall_3', BASE_ASSET_BATH + 'images/city/wall_3_.png');
    Elkaisar.GE.CityScene.load.image('wall_4', BASE_ASSET_BATH + 'images/city/wall_4_.png');
    Elkaisar.GE.CityScene.load.image('seaport', BASE_ASSET_BATH + 'images/city/_seaport.png');
    Elkaisar.GE.CityScene.load.image('market', BASE_ASSET_BATH + 'images/city/_market.png');
    Elkaisar.GE.CityScene.load.image('farm', BASE_ASSET_BATH + 'images/city/_farm.png');
    Elkaisar.GE.CityScene.load.image('mine', BASE_ASSET_BATH + 'images/city/_mine.png');
    Elkaisar.GE.CityScene.load.image('mahger', BASE_ASSET_BATH + 'images/city/_mahger.png');
    Elkaisar.GE.CityScene.load.image('wood_maker', BASE_ASSET_BATH + 'images/city/_wood_maker.png');
    Elkaisar.GE.CityScene.load.image('lighthouse', BASE_ASSET_BATH + 'images/city/_lighthouse.png');
    Elkaisar.GE.CityScene.load.image('B1', BASE_ASSET_BATH + 'images/city/_B1.png');
    Elkaisar.GE.CityScene.load.image('B2', BASE_ASSET_BATH + 'images/city/_B2.png');
    Elkaisar.GE.CityScene.load.image('B3', BASE_ASSET_BATH + 'images/city/_B3.png');
    Elkaisar.GE.CityScene.load.image('B4', BASE_ASSET_BATH + 'images/city/_B4.png');
    Elkaisar.GE.CityScene.load.image('B5', BASE_ASSET_BATH + 'images/city/_B5.png');
    Elkaisar.GE.CityScene.load.image('B6', BASE_ASSET_BATH + 'images/city/_B6.png');
    Elkaisar.GE.CityScene.load.image('B7', BASE_ASSET_BATH + 'images/city/_B7.png');
    Elkaisar.GE.CityScene.load.image('B8', BASE_ASSET_BATH + 'images/city/_B8.png');
    Elkaisar.GE.CityScene.load.image('B9', BASE_ASSET_BATH + 'images/city/_B9.png');
    Elkaisar.GE.CityScene.load.image('B10', BASE_ASSET_BATH + 'images/city/_B10.png');
    Elkaisar.GE.CityScene.load.image('B11', BASE_ASSET_BATH + 'images/city/_B11.png');
    Elkaisar.GE.CityScene.load.image('no_building', BASE_ASSET_BATH + 'images/city/no_building.png');
    Elkaisar.GE.CityScene.load.image('city_floor', BASE_ASSET_BATH + 'images/city/city_floor.jpg');
    Elkaisar.GE.CityScene.load.image('hammer_start', BASE_ASSET_BATH + 'images/animation/upgrading_hammer.png');
    Elkaisar.GE.CityScene.load.image('fountain', BASE_ASSET_BATH + 'images/animation/fountain.png');
    Elkaisar.GE.CityScene.load.image('ani_wood_maker', BASE_ASSET_BATH + 'images/animation/wood_maker.png');
    Elkaisar.GE.CityScene.load.image('ani_wood_man', BASE_ASSET_BATH + 'images/animation/wood_man.png');
    Elkaisar.GE.CityScene.load.image('mine_man', BASE_ASSET_BATH + 'images/animation/mine_man.png');
    Elkaisar.GE.CityScene.load.image('stone_man', BASE_ASSET_BATH + 'images/animation/stone_man.png');
    Elkaisar.GE.CityScene.load.image('stone_carry', BASE_ASSET_BATH + 'images/animation/stone_carry.png');
    Elkaisar.GE.CityScene.load.image('no_carry', BASE_ASSET_BATH + 'images/animation/no_carry.png');
    Elkaisar.GE.CityScene.load.image('fire_start', BASE_ASSET_BATH + 'images/animation/attack_fire.png');
    Elkaisar.GE.CityScene.load.image('flag_over_city', BASE_ASSET_BATH + 'images/animation/flags.png');
    Elkaisar.GE.CityScene.load.image('cloud', BASE_ASSET_BATH + 'images/animation/cloud.png');
    Elkaisar.GE.CityScene.load.image('unit_floor', BASE_ASSET_BATH + 'images/world/unit_floor.png');
};



Elkaisar.GE.LoadingScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "LoadingScene" });
    },
    init: function() {},
    preload: function() {
        Elkaisar.GE.LPreLoad();
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('complete', function () {
            percentText.destroy();
            ImageBg.destroy();
            Elkaisar.BattelReplay.drawControllPanel();
            This.configAnims();
            (new BattelReplay(BattelReplayData)).startBattelShow();
        });
    },
    create: function() {},
    update: function() {}
});

Elkaisar.GE.CityScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "City" });
    },
    init: function() {},
    preload: function() {},
    create: function() {},
    update: function() {}
});


Elkaisar.GE.WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "World" });
    },
    init: function() {},
    preload: function() {},
    create: function() {},
    update: function() {}
});