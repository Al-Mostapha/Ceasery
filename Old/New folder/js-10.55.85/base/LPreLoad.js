

$.ajaxSetup({
    crossDomain:true
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
    AttackQueList : [],
    Army          :{
        army_a : 0, army_b : 0, army_c : 0,
        army_d : 0, army_e : 0, army_f : 0 
    },
    EQuip         :{
        boot : {}, armor : {}, shield : {}, helmet : {}, sword : {},
        belt :{}, necklace: {}, pendant: {}, ring : {}, steed : {}
    },
    xCoord : 0,
    yCoord : 0
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
    Battels       : [],
    LeavinHeros   : [],
    HeroBack      : [],
    HeroGarrison  : [],
    SpyingList    : [],
    CurrentBattel : {}
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