Elkaisar.Castle = {};
Elkaisar.Castle.FloorPartPos;


$("#city_col").hide();

Elkaisar.Castle.getFloorPostion = function (){
    
   return $.getJSON(`js${JS_VERSION}/json/Castle/CastleFloorPos.json`, function (data){
       Elkaisar.Castle.FloorPartPos = data;
   });
    
};

var Tttt = "";

Elkaisar.Castle.addFloor = function (){
    
    var x= 0;
   
    for(let OnePart of Elkaisar.Castle.FloorPartPos ){
        let Sprite = Elkaisar.GE.CityScene.add.sprite(OnePart.Pos.x, OnePart.Pos.y, OnePart.Image);
        if(OnePart.Image == "BG_hall_far_1")
            Tttt = Sprite;
        Sprite.setRotation(((OnePart.Rot || 0) /180) *Math.PI);
        Sprite.depth  = OnePart.Pos.z || 0;
        
        
    }
    
     Elkaisar.GE.CityScene.add.sprite(1963,  848,   "zhucheng");
     Elkaisar.GE.CityScene.add.sprite(2521,  981,   "bubingying_war");
     Elkaisar.GE.CityScene.add.sprite(2715,  1157,  "bubingying");
     Elkaisar.GE.CityScene.add.sprite(2888,  995,   "cangku");
     Elkaisar.GE.CityScene.add.sprite(625,   1893,  "chebingying");
     Elkaisar.GE.CityScene.add.sprite(302,   1737,  "chongwuguan");
     Elkaisar.GE.CityScene.add.sprite(877,   1625,  "dashiguan");
     Elkaisar.GE.CityScene.add.sprite(949,   1379,  "gongbingying");
     Elkaisar.GE.CityScene.add.sprite(1432,  1944,  "gongbingying_war");
     Elkaisar.GE.CityScene.add.sprite(2221,  1828,  "jiaochang");
     Elkaisar.GE.CityScene.add.sprite(2031,  1550,  "map_build_history");
     Elkaisar.GE.CityScene.add.sprite(2268,  1427,  "prison");
     Elkaisar.GE.CityScene.add.sprite(2525,  1751,  "qibingying");
     Elkaisar.GE.CityScene.add.sprite(2841,  1946,  "qibingying_war");
     Elkaisar.GE.CityScene.add.sprite(2570,  2051,  "shichang");
     Elkaisar.GE.CityScene.add.sprite(3600,  1508,  "tiejiangpu");
     Elkaisar.GE.CityScene.add.sprite(3154,  1425,  "train");
     Elkaisar.GE.CityScene.add.sprite(3375,  1283,  "xiangbingying_war");
     Elkaisar.GE.CityScene.add.sprite(2489,  688,   "xueyuan");
     Elkaisar.GE.CityScene.add.sprite(1675,  1557,   "zhanzhengbaolei");
     Elkaisar.GE.CityScene.add.sprite(3399,  1608,   "zhanzhengdating");
     Elkaisar.GE.CityScene.add.sprite(2812,  1322,   "BG_statue");
    /*Elkaisar.GE.CityScene.add.image(x, y, BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].sprit_name).setInteractive({
        hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].hitArea),
        hitAreaCallback: Phaser.Geom.Polygon.Contains
    }).setOrigin(0, 0).setDepth(2)
            .on("click", function () {
                buildingClick(BuildingPlace);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
            .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
    BuildingOnFloor[BuildingPlace].Lable = building_lvl_lable(x, y, BuildingPlace);
    building_hammer_animate(BuildingPlace);
    return BuildingOnFloor[BuildingPlace];*/
};
