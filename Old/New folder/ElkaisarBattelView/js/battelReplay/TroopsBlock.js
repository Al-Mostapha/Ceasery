Elkaisar.BattelReplay.TroopsBlock = {};



Elkaisar.BattelReplay.TroopsBlock.Blocks = {
    [Elkaisar.BattelReplay.AttackSides.Defence]: [],
    [Elkaisar.BattelReplay.AttackSides.Attack]: []
};

(function () {
    var XOffset;
    var Side = Elkaisar.BattelReplay.AttackSides.Defence;

    for (var yCoord = 0; yCoord < 2; yCoord++) {
        XOffset = 0;
        for (var xCoord = 0; xCoord < 9; xCoord++) {
            if ((xCoord) % 3 === 0)
                XOffset += 15;
            
            
            if (!Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord])
                Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord] = [];
            if (!Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord][yCoord])
                Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord][yCoord] = {
                    Pos: {x: 0, y: 0},
                    Block: null
                };
            
            
            Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord][yCoord].Pos.x = Crafty.stage.elem.getBoundingClientRect().width / 3 + xCoord * 90 + yCoord * 90 + 2 * XOffset;
            Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xCoord][yCoord].Pos.y = xCoord * 45 + 150 - yCoord * 45 + XOffset;
        }
    }


    Side = Elkaisar.BattelReplay.AttackSides.Attack;


    for (var yyCoord = 0; yyCoord < 2; yyCoord++) {
        XOffset = 0;
        for (var xxCoord = 0; xxCoord < 9; xxCoord++) {
            if ((xxCoord) % 3 === 0)
                XOffset += 15;
            
            if (!Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord])
                Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord] = [];
            if (!Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord][yyCoord])
                Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord][yyCoord] = {
                    Pos: {x: 0, y: 0},
                    Block: null
                };

            Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord][yyCoord].Pos.x = xxCoord * 90 + yyCoord * 90 + 100 + 2 * XOffset;
            Elkaisar.BattelReplay.TroopsBlock.Blocks[Side][xxCoord][yyCoord].Pos.y = xxCoord * 45 + 400 - yyCoord * 45 + XOffset;
        }

    }


})();


Elkaisar.BattelReplay.TroopsBlock.Block = function (ArmyType, ArmyCount, ArmySide) {




};



Elkaisar.BattelReplay.TroopsBlock.BlockSmall = function () {
    var RootComp = Crafty.e("2D, DOM, Text").text("15552").textAlign("center");
    for (var xCoord = 0; xCoord < 3; xCoord++) {
        for (var yCoord = 0; yCoord < 2; yCoord++) {


            RootComp.attach(Crafty.e('2D, Canvas, SpriteAnimation, TroopArmyA')
                    .reel("walking", 1200, [
                        [0, 3], [1, 3], [2, 3], [3, 3], [3, 3], [4, 3], [4, 3], [5, 3], [5, 3], [6, 3], [6, 3], [7, 3], [8, 3], [9, 3]
                    ])
                    .animate("walking", -1)
                    .attr({x: xCoord * 16 + yCoord * 16, y: xCoord * 8 - yCoord * 8, z: 100}));

        }

    }

    return RootComp;
};


Elkaisar.BattelReplay.TroopsBlock.BlockMeduim = function () {

    var RootComp = Crafty.e("2D, DOM, Text").text("15552").textAlign("center");
    for (var xCoord = 0; xCoord < 4; xCoord++) {
        for (var yCoord = 0; yCoord < 3; yCoord++) {


            RootComp.attach(Crafty.e('2D, Canvas, SpriteAnimation, TroopArmyB')
                    .reel("walking", 1200, [
                        [0, 3], [1, 3], [2, 3], [3, 3], [3, 3], [4, 3], [4, 3], [5, 3], [5, 3], [6, 3], [6, 3], [7, 3], [8, 3], [9, 3]
                    ])
                    .animate("walking", -1)
                    .attr({x: xCoord * 32 + yCoord * 32, y: xCoord * 16 - yCoord * 16, z: 100}));

        }

    }

    RootComp.x = 500;
    RootComp.y = 500;
    return RootComp;
};


Elkaisar.BattelReplay.TroopsBlock.BlockLarge = function (ArmyType, Side) {

    var RootComp = Crafty.e("2D, Canvas, Text, Tween").text("15552").textAlign("center");





    for (var xCoord = 0; xCoord < 5; xCoord++) {
        for (var yCoord = 0; yCoord < 4; yCoord++) {


            RootComp.attach(Crafty.e(`2D, Canvas, SpriteAnimation, ${Elkaisar.BattelReplay.TroopsAnimation[ArmyType]}`)
                    .reel("walking", 1200, Elkaisar.BattelReplay.TroopsFrams.Melee[Side])
                    .animate("walking", -1)
                    .attr({x: xCoord * 16 + yCoord * 16, y: xCoord * 8 - yCoord * 8, z: 100, w: 60, h: 60}));

        }

    }

    RootComp.x = Crafty.stage.elem.getBoundingClientRect().width / 2;
    RootComp.y = Crafty.stage.elem.getBoundingClientRect().height;
    return RootComp;
};

//var RootComp = Elkaisar.BattelReplay.TroopsBlock.BlockSmall()