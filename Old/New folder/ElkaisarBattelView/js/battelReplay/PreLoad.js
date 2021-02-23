
Crafty.init();

Elkaisar.BattelReplay.ResToLoad = {
    "sprites": {
        "images/BattelReplay/field.jpg"          : {"tile": 1000, "tileh": 600, "map": {"BattelGroundSprite": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_triarii.png"  : {"tile": 100, "tileh": 100, "map": {"TroopArmyA": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_cavalry.png"  : {"tile": 100, "tileh": 100, "map": {"TroopArmyB": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_cohort.png"   : {"tile": 100, "tileh": 100, "map": {"TroopArmyC": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_archers.png"  : {"tile": 100, "tileh": 100, "map": {"TroopArmyD": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_ballistas.png": {"tile": 100, "tileh": 100, "map": {"TroopArmyE": [0, 0, 1, 1]}},
        "images/BattelReplay/troop_onagers.png"  : {"tile": 100, "tileh": 100, "map": {"TroopArmyF": [0, 0, 1, 1]}}
    }
};

Elkaisar.BattelReplay.ArmyTyps = {
    ArmyA: 1,
    ArmyB: 2,
    ArmyC: 3,
    ArmyD: 4,
    ArmyE: 5,
    ArmyF: 6
};


Elkaisar.BattelReplay.AttackSides = {
    Defence: 0,
    Attack :1
};


Elkaisar.BattelReplay.TroopsAnimation = {
    [Elkaisar.BattelReplay.ArmyTyps.ArmyA] : "TroopArmyA",
    [Elkaisar.BattelReplay.ArmyTyps.ArmyB] : "TroopArmyB",
    [Elkaisar.BattelReplay.ArmyTyps.ArmyC] : "TroopArmyC",
    [Elkaisar.BattelReplay.ArmyTyps.ArmyD] : "TroopArmyD",
    [Elkaisar.BattelReplay.ArmyTyps.ArmyE] : "TroopArmyE",
    [Elkaisar.BattelReplay.ArmyTyps.ArmyF] : "TroopArmyF"
};


Elkaisar.BattelReplay.TroopsFrams = {
   "Idle"   :{
       [Elkaisar.BattelReplay.AttackSides.Defence]: [[0, 0], [1, 0], [2, 0], [3, 0]],
       [Elkaisar.BattelReplay.AttackSides.Attack] : [[4, 0], [5, 0], [6, 0], [7, 0]]
   },
   "Walk"   : {
       [Elkaisar.BattelReplay.AttackSides.Defence]: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]],
       [Elkaisar.BattelReplay.AttackSides.Attack] : [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]]
   },
   
   "Melee"  : {
       [Elkaisar.BattelReplay.AttackSides.Defence]: [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3]],
       [Elkaisar.BattelReplay.AttackSides.Attack] : [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4]]
   }
};

Elkaisar.BattelReplay.Loading = function (){};

Elkaisar.BattelReplay.Loaded = function (){
    Crafty.enterScene("BattelGround");
};

Elkaisar.BattelReplay.LoadingErr = function (){};

Crafty.load(
        Elkaisar.BattelReplay.ResToLoad,
        Elkaisar.BattelReplay.Loaded,
        Elkaisar.BattelReplay.Loading,
        Elkaisar.BattelReplay.LoadingErr
);