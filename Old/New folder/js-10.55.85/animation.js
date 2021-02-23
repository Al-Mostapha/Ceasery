Animation = {};
Animation.RATES = [];
Animation.cityProductionRate = function () {
    return;
    for (var iii in Animation.RATES) {
        Animation.RATES[iii].destroy();
        Animation.RATES.splice(iii, 1);
    }
    /* resource  in city animation*/
    var coin_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.coin_in - Elkaisar.CurrentCity.City.coin_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${coin_in_ratio >= 0 ? 'OVER_ZERO' : "BELOW_ZERO"} , city_ani , Text`)
            .attr({x: BuildingOnFloor.palace._x + 0.6 * X_GRID, y: BuildingOnFloor.palace._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(coin_in_ratio >= 0 ? "+" + coin_in_ratio : '-' + coin_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "coin");
    Animation.RATES.push(temp);


    /* resource  in city animation*/
    var food_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.food_in - Elkaisar.CurrentCity.City.food_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${food_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.farm._x + 0.6 * X_GRID, y: BuildingOnFloor.farm._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(food_in_ratio > 0 ? "+" + food_in_ratio : '-' + food_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "food");
    Animation.RATES.push(temp);


    /* resource  in city animation*/
    var wood_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.wood_in - Elkaisar.CurrentCity.City.wood_out) / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${wood_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.wood._x + 0.6 * X_GRID, y: BuildingOnFloor.wood._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.wood_in > 0 ? "+" + wood_in_ratio : '-' + wood_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "wood");
    Animation.RATES.push(temp);

    /* resource  in city animation*/
    var stone_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.stone_in / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${stone_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"} , city_ani , Text`)
            .attr({x: BuildingOnFloor.stone._x + 0.6 * X_GRID, y: BuildingOnFloor.stone._y + 1.85 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.stone_in > 0 ? "+" + stone_in_ratio : '-' + stone_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "stone");
    Animation.RATES.push(temp);

    /* resource  in city animation*/
    var metal_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.metal_in / (30 * 60)) * 100) / 100);
    var temp;
    temp = Crafty.e(`2D, DOM , stroke , iso_text_right , UPFADE ${metal_in_ratio > 0 ? 'OVER_ZERO' : "BELOW_ZERO"}, city_ani , Text`)
            .attr({x: BuildingOnFloor.mine._x + 1.6 * X_GRID, y: BuildingOnFloor.mine._y + 2.25 * Y_GRID - 30, h: 30, w: 30, avoidCss3dTransforms: true, z: 100})
            .text(Elkaisar.CurrentCity.City.stone_in > 0 ? "+" + metal_in_ratio : '-' + metal_in_ratio)
            .textFont({size: '12px', weight: 'bold', lineHeight: "32px"})
            .textAlign("center");

    $(temp._element).attr("data-ratio-for", "metal");
    Animation.RATES.push(temp);

};


Animation.FixedCityAnimation = function () {
    return;
    Crafty.e("2D, DOM, Image").image("images/animation/fountain.gif").attr({x: 1300, y: 710, z: 50});
    Crafty.e("2D, DOM, Image").image("images/animation/fountain.gif").attr({x: 1200, y: 660, z: 50});


    Crafty("city_ani").each(function () {
        this.destroy();
    });


    /* first fountain */
    Crafty.e('2D, DOM, fountain, SpriteAnimation, city_ani')
            .reel("walking", 800, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]
            ])
            .animate("walking", -1)
            .attr({x: 1300, y: 710, z: 50});
    Crafty.e('2D, DOM, fountain, SpriteAnimation, city_ani')
            .reel("walking", 800, [
                [2, 0], [3, 0], [4, 0], [5, 0], [0, 0], [1, 0]
            ])
            .animate("walking", -1)
            .attr({x: 1200, y: 660, z: 50});


    Crafty.e('2D, DOM, ani_wood_maker, SpriteAnimation, city_ani')
            .reel("walking", 3000, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
            ])
            .animate("walking", -1)
            .attr({x: 2.5 * X_GRID, y: 8 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, ani_wood_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 2 * X_GRID, y: 8.25 * Y_GRID, z: 50});
    Crafty.e('2D, DOM, ani_wood_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1], [0, 2]
            ])
            .animate("walking", -1)
            .attr({x: 3 * X_GRID, y: 8.25 * Y_GRID, z: 50}).flip("X");

    Crafty.e('2D, DOM, stone_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 12.3 * X_GRID, y: 7.15 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, stone_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1]
            ])
            .animate("walking", -1)
            .attr({x: 11.75 * X_GRID, y: 6.5 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, mine_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
            ])
            .animate("walking", -1)
            .attr({x: 10 * X_GRID, y: 4 * Y_GRID, z: 50});

    Crafty.e('2D, DOM, mine_man, SpriteAnimation, city_ani')
            .reel("walking", 1000, [
                [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 0], [0, 1]
            ])
            .animate("walking", -1)
            .attr({x: 9 * X_GRID, y: 5 * Y_GRID, z: 50});

    Crafty.cityClouds = [];
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 150, y: 100, vx: 14, z: 5000, __offsetX: -150
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: -100, y: 250, vx: 10, z: 5000, __offsetX: -100
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 180, y: 350, vx: 10, z: 5000, __offsetX: -180
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 360, y: 600, vx: 14, z: 5000, __offsetX: -360
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 660, y: 750, vx: 14, z: 5000, __offsetX: -660
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 540, y: 250, vx: 14, z: 5000, __offsetX: -540
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 110, y: 750, vx: 14, z: 5000, __offsetX: -110
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1800, y: 750, vx: 14, z: 5000, __offsetX: -1800
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1250, y: 900, vx: 14, z: 5000, __offsetX: -1250
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1500, y: 430, vx: 14, z: 5000, __offsetX: -1500
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 830, y: 360, vx: 14, z: 5000, __offsetX: -830
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1140, y: 540, vx: 10, z: 5000, __offsetX: -1140
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 850, y: 350, vx: 10, z: 5000, __offsetX: -850
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 980, y: 250, vx: 14, z: 5000, __offsetX: -980
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1480, y: 750, vx: 14, z: 5000, __offsetX: -1480
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1600, y: 900, vx: 14, z: 5000, __offsetX: -1600
    }));


    /* 
     
     Crafty.e('2D, Canvas, stone_carry, SpriteAnimation, Motion , Collision    ,  WiredHitBox')
     .reel("walking", 1200, [
     [0, 0], [0,1], [0,2], [0,3], [0,4], [0,5],[0,6]
     ])
     .animate("walking", -1)
     .attr({x:12.5*X_GRID, y:8*Y_GRID, z:50 , vx:-18 , vy:9}).flip("X")
     .onHit('palace' , function (){
     
     var this_ = this;
     setTimeout(function (){
     
     this_.vx =0;
     this_.vy =0;
     //this_.attr({__image: "images/animation/stone_carry.png"})
     
     
     }, 3500);
     
     
     
     })
     .collision([37,17,19,19,20,47,41,47])
     .onHit("mine" , function (){
     
     console.log("teat")
     
     });
     */





};


//setTimeout(function (){Animation.FixedCityAnimation();} , 3000)
var CLOUD_RESET_TIMER = setInterval(function () {
    for (var cloud in Crafty.cityClouds) {

        if (Crafty.cityClouds[cloud]._x > 2500) {
            Crafty.cityClouds[cloud].x = Crafty.cityClouds[cloud].__offsetX;
        }

    }
}, 40 * 1000);



function building_hammer_animate(building_place)
{

    if (isUpgradingNow(building_place)) {

        var x = BuildingOnFloor[building_place]._x;
        var y = BuildingOnFloor[building_place]._y;

        var x_1 = x - 25;
        var x_2 = x + 20;
        var y_1 = y - 10;
        var y_2 = y;

        if (building_place === "palace") {
            x_1 = x + 25;
            x_2 = x + 80;
            y_1 = y + 5;
            y_2 = y;
        } else if (building_place === "wall") {


            var hammer_3 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: 1.5 * X_GRID, y: 3.25 * Y_GRID, z: 5000});

            var hammer_4 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 0], [1, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: 0.5 * X_GRID, y: 4.25 * Y_GRID, z: 5000});

            BuildingOnFloor[building_place].attach(hammer_3);
            BuildingOnFloor[building_place].attach(hammer_4);


            x_2 = 3.5 * X_GRID;
            y_2 = 1.25 * Y_GRID;


        } else if (building_place === "farm") {
            x_1 = x + 0.5 * X_GRID;
            x_2 = x + X_GRID;
            y_1 = y + Y_GRID;
            y_2 = y + 0.5 * Y_GRID;
        } else if (building_place === "mine") {
            x_1 = x - 25 + X_GRID;
            x_2 = x + 20 + X_GRID;
            y_1 = y - 10 + Y_GRID;
            y_2 = y + Y_GRID;
        } else if (building_place === "stone") {
            x_1 = x - 25 + 0.5 * X_GRID;
            x_2 = x + 20 + 0.5 * X_GRID;
            y_1 = y - 10 + 0.5 * Y_GRID;
            y_2 = y + 0.5 * Y_GRID;
        }


        if (building_place !== "wall") {
            var hammer_1 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                    .reel("walking", 650, [
                        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                    ])
                    .animate("walking", -1)
                    .attr({x: x_1, y: y_1, z: 5000}).flip("X");
            BuildingOnFloor[building_place].attach(hammer_1);
        }



        var hammer_2 = Crafty.e('2D, Canvas, hammer_start, SpriteAnimation,' + building_place + "_ani_up")
                .reel("walking", 650, [
                    [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 0], [1, 0]
                ])
                .animate("walking", -1)
                .attr({x: x_2, y: y_2, z: 5000});


        BuildingOnFloor[building_place].attach(hammer_2);


    }
}

function fire_attack_animation()
{

    Crafty.e('2D, Canvas, fire_start, SpriteAnimation, worldEnt')
            .reel("walking", 650, [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]
            ])
            .animate("walking", -1)
            .attr({x: 800 + 100, y: 600 + 50, z: 50});


}
var WORLD_NUIT_ON_FIRE = [];
Animation.fireWorldUnit = function (fire_unit) {


    var world_unit = WorldUnit.getWorldUnit(fire_unit.x_coord, fire_unit.y_coord);
    if (!world_unit.entite || $.isEmptyObject(world_unit.entite)) {
        return;
    }

    var x = world_unit.entite._x;
    var y = world_unit.entite._y;
    var z = world_unit.entite._z;

    var lvl = world_unit.l;
    var type = world_unit.ut;

    if (WorldUnit.isRiver(type)) {
        return;
    }
    if (world_unit.entite.__has_fire) {
        return;
    }

    if (WorldUnit.isBarrary(type) && lvl < 4 || WorldUnit.isGangStar(type)) {
        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 24, z: z}));
    } else if (WorldUnit.isBarrary(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt , fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 32, y: y + 16, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 72, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 42, z: z}));


    } else if (WorldUnit.isCityLv1(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y + 12, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 75, y: y + 20, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 20, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 46, y: y + 42, z: z}));
    } else if (WorldUnit.isCityLv2(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 80, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 30, z: z}));
    } else if (WorldUnit.isCityLv3(type)) {

        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [5, 0], [6, 0], [7, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 48, y: y - 10, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt , fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 88, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, 0], [1, 0], [2, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 8, y: y + 8, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 60, y: y + 32, z: z}));
    } else {
        world_unit.entite
                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL , worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 42, y: y, z: z - 1}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 80, y: y + 16, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 12, y: y + 12, z: z}))

                .attach(Crafty.e('2D, DOM, FIRE_OF_HILL, worldEnt, fire_start, SpriteAnimation')
                        .reel("fire_unit", 650, [
                            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
                        ])
                        .animate("fire_unit", -1)
                        .attr({x: x + 52, y: y + 30, z: z}));
    }

    world_unit.entite.__has_fire = true;

};


Elkaisar.Animation.cityFlagProp = {

};


Animation.cityFlag = function () {

    Crafty("WorldUnit").each(function (index) {

        var world_unit = WorldUnit.getWorldUnit(this.coord_x, this.coord_y);

        if (!$.isEmptyObject(world_unit.CityFlagEntite)) {
            return;
        }

        var x = Elkaisar.World.Map.posX(this.coord_x, this.coord_y);
        var y = Elkaisar.World.Map.posY(this.coord_x, this.coord_y);
        var z = Elkaisar.World.Map.posZ(this.coord_x, this.coord_y);

        var lvl = world_unit.l;

        if (!WorldUnit.isCity(world_unit.ut)) {
            return;
        }




        var flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];
        
        if (world_unit.idPlayer === Elkaisar.DPlayer.Player.id_player) {
            flag_array = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]];
        } else if (!Elkaisar.Guild.GuildData || !world_unit.idGuild) {

            flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        } else if (Number(Elkaisar.DPlayer.Player.id_guild) === Number(world_unit.idGuild)) {
            console.log("SameGuild")
            flag_array = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
        } else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(world_unit.idGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        flag_array = [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]];

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        flag_array = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]];
                    }
                }
            }
        }





        if (Number(world_unit.ut) === WUT_CITY_LVL_0) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 38, w: 35, h: 20, avoidCss3dTransforms: true, z: 9 ** 9})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));


        } else if (Number(world_unit.ut) === WUT_CITY_LVL_1) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e15})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_2) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 50, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_3) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 30, y: y + 45, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke, worldEnt')
                            .attr({x: x + 34, y: y + 60, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("" + world_unit.CityFlag)
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else {
            console.log(world_unit)
        }
    });


};


Animation.cityColonizerFlag = function () {

    Crafty("WorldUnit").each(function (index) {

        var world_unit = WorldUnit.getWorldUnit(this.coord_x, this.coord_y);

        if (!$.isEmptyObject(world_unit.CityColonizerFlagEntite)) {
            return;
        }
        if (!WorldUnit.isCity(world_unit.ut) || !world_unit.CityColonized) {
            return;
        }

        console.log(world_unit);
        var x = Elkaisar.World.Map.posX(this.coord_x, this.coord_y);
        var y = Elkaisar.World.Map.posY(this.coord_x, this.coord_y);
        var z = Elkaisar.World.Map.posZ(this.coord_x, this.coord_y);

        var lvl = world_unit.l;






        var flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        if (world_unit.ColonizerIdPlayer === Elkaisar.DPlayer.Player.id_player) {
            flag_array = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]];
        } else if (!Elkaisar.Guild.GuildData || !world_unit.ColonizerIdGuild) {

            flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        } else if (Number(Elkaisar.DPlayer.Player.id_guild) === Number(world_unit.ColonizerIdGuild)) {
            flag_array = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
        } else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(world_unit.ColonizerIdGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        flag_array = [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]];

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        flag_array = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]];
                    }
                }
            }
        }


        if (Number(world_unit.ut) === WUT_CITY_LVL_0) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 38, w: 35, h: 20, avoidCss3dTransforms: true, z: 9 ** 9})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));


        } else if (Number(world_unit.ut) === WUT_CITY_LVL_1) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e15})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_2) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                            .attr({x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("")
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_3) {

            world_unit.CityFlagEntite =
                    Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({x: x + 30, y: y + 30, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y})
                    .attach(Crafty.e('2D, Canvas, Text, stroke, worldEnt')
                            .attr({x: x + 34, y: y + 60, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29})
                            .text("" + world_unit.CityFlag)
                            .textColor('white')
                            .textFont({size: '12px', lineHeight: "20px"})
                            .textAlign("center"));

        } else {
            console.log(world_unit)
        }
    });


};

Animation.currentUnitArrow = {};

Animation.currentUnitArrow.arrow = {};
Animation.currentUnitArrow.x = 0;
Animation.currentUnitArrow.y = 0;
Animation.currentUnitArrow.z = 0;

Animation.currentUnitArrow.put = function (x, y) {

    Animation.currentUnitArrow.x = Elkaisar.World.Map.posX(x, y) + 50;
    Animation.currentUnitArrow.y = Elkaisar.World.Map.posY(x, y) + 5;
    Animation.currentUnitArrow.z = Elkaisar.World.Map.posZ(x, y) + 1;
    var dir = 0;

    if (!$.isEmptyObject(Animation.currentUnitArrow.arrow)) {
        Animation.currentUnitArrow.arrow.attr({
            x: Animation.currentUnitArrow.x,
            y: Animation.currentUnitArrow.y,
            z: Animation.currentUnitArrow.z
        }).trigger("TweenEnd");
    } else {

        Animation.currentUnitArrow.arrow =
                Crafty.e("2D, Canvas, Tween, arrow")
                .attr({
                    x: Animation.currentUnitArrow.x,
                    y: Animation.currentUnitArrow.y,
                    z: Animation.currentUnitArrow.z
                })
                .tween({y: Animation.currentUnitArrow.y + 30}, 1000, "easeInOutQuad")
                .bind("TweenEnd", function () {
                    this.tween({y: Animation.currentUnitArrow.y + (dir ? 30 : 0)}, 1000, "easeInOutQuad");
                    dir = 1 - dir;
                });

    }


};