Elkaisar.CityWall = {};
Elkaisar.CityWall.WallPartType = {
    PartWall: 1, PartTower: 2, PartGate: 3
};
Elkaisar.CityWall.WallPostion = [
    
    {
        Pos: {x: 3929, y: 1632, z: 1},
        PartType: Elkaisar.CityWall.WallPartType.PartWall
    },{
        Pos: {x: 3811, y: 1636, z: 2},
        PartType: Elkaisar.CityWall.WallPartType.PartTower
    },{
        Pos: {x: 3627, y: 1780, z: 3},
        PartType: Elkaisar.CityWall.WallPartType.PartWall
    },{
        Pos: {x: 3435, y: 1829, z: 4},
        PartType: Elkaisar.CityWall.WallPartType.PartGate
    },{
        Pos: {x: 3160, y: 2016, z: 5},
        PartType: Elkaisar.CityWall.WallPartType.PartWall
    },{
        Pos: {x: 2983, y: 2052, z: 6},
        PartType: Elkaisar.CityWall.WallPartType.PartTower
    },{
        Pos: {x: 2797, y: 2194, z: 7},
        PartType: Elkaisar.CityWall.WallPartType.PartWall
    }
    
];


Elkaisar.CityWall.addWall = function (){
    
    for(let WallPart of Elkaisar.CityWall.WallPostion){
        if(WallPart.PartType == Elkaisar.CityWall.WallPartType.PartWall)
            Elkaisar.GE.CityScene.add.sprite(WallPart.Pos.x, WallPart.Pos.y, "chengqiang_lv4");
        if(WallPart.PartType == Elkaisar.CityWall.WallPartType.PartTower)
            Elkaisar.GE.CityScene.add.sprite(WallPart.Pos.x, WallPart.Pos.y, "jianta_lv4_base");
        if(WallPart.PartType == Elkaisar.CityWall.WallPartType.PartGate)
            Elkaisar.GE.CityScene.add.sprite(WallPart.Pos.x, WallPart.Pos.y, "chengmen_lv4");
    }
};


