var WorldCurrentUnit = {};


Elkaisar.World.unitWidth  = 128;
Elkaisar.World.unitHeight = 128;

MAX_SCREEN_WIDTH  = $(document).width();
MAX_SCREEN_HEIGHT = $(document).height();




const TILE_SIZE = 128;






    

Crafty.WORLD_MOVES = 0;

Crafty.defineScene("world" , function (){
    
    Crafty._floor = "world";
        Crafty.onDragClickable = true;
       
       // Crafty.bind("ViewportScroll", Elkaisar.World.Map.Scroll);
        
        Crafty.widthInTile = 35;
        Crafty.heightIntile =35;
        
    
         
                
                
                
        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", Elkaisar.World.Map.mouseDownFn);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup",   Elkaisar.World.Map.mouseUpFn );
        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", Elkaisar.World.Map.mouseMoveFn);
	
        
        
        Crafty.viewport.x  = -Elkaisar.World.Map.posX(Elkaisar.CurrentCity.City.x, Elkaisar.CurrentCity.City.y) + Elkaisar.MAX_SCREEN_WIDTH/2 - 64; // 56 is displacement to center the view port 
        Crafty.viewport.y  = -Elkaisar.World.Map.posY(Number(Elkaisar.CurrentCity.City.x), Number(Elkaisar.CurrentCity.City.y)) + Elkaisar.MAX_SCREEN_HEIGHT/2 - 128;
        

    
    
    UnitFloor = Crafty.e("2D, DOM, unit_floor")
                .attr({w: TILE_SIZE, h: 96 });
    
}, function () {
    Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", Elkaisar.World.Map.mouseDownFn);
    Crafty.removeEvent(this, Crafty.stage.elem, "mouseup"  ,   Elkaisar.World.Map.mouseUpFn );
    Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", Elkaisar.World.Map.mouseMoveFn);
    //Crafty.unbind("ViewportScroll", Elkaisar.World.Map.Scroll);
});


function loading(percent)
{
    
    $("#load-percent").html(Math.floor(percent)+"%");
    $("#load-bar div").css({width: percent+"%"});
    
}





Crafty.sprite("images/world/worldFloor.jpg", {worldFloor:[0,0,640,640]});






function  addMapUnite(el){
    
    
                
       setTimeout(function (){
                    
                    var unit = Elkaisar
                            .worldAllUnits
                            [Elkaisar.World.Map.realCoord(el.x)*500+Number(Elkaisar.World.Map.realCoord(el.y))];
                    
                     if( !$.isEmptyObject(unit.entite)){
                         
                         unit.entite.attr({
                            x: Elkaisar.World.Map.posX(el.x, el.y),
                            y: Elkaisar.World.Map.posY(el.x, el.y),
                            z: Elkaisar.World.Map.posZ(el.x , el.y)
                         });
                        return ;
                        
                     }




                    var tile = Elkaisar.World.Map.getEntity(unit.x , unit.y);
                    
                   
                    
                    tile
                            .bind("Click", function(e) {
                                if(Crafty.onDragClickable){

                                    WorldCurrentUnit = this;
                                    uniteMapClick(unit.x , unit.y);


                                }
                            })
                            .bind("MouseOver", function() {

                            
                                UnitFloor.x = this.x;
                                UnitFloor.y = this.y + TILE_SIZE/2;
                                WorldUtil.showMapTooltip(unit.x , unit.y);


                            })
                            .bind("MouseOut", function() {

                                //Crafty("UnitToolTip").each(function (){this.destroy();});

                            })
                            .areaMap(Elkaisar.World.UnitData[unit.t].hitArea)
                            .attr({
                                x: Elkaisar.World.Map.posX(el.x, el.y),
                                y: Elkaisar.World.Map.posY(el.x, el.y),
                                z: Elkaisar.World.Map.posZ(el.x , el.y),
                                coord_x: parseInt(unit.x),
                                coord_y: parseInt(unit.y)
                            });

                    unit.entite = tile;
                    Crafty.__end ++;
                        
                });
       
   
   
 
                      
}

function addMapWorldFloor(el){
    
    var realX = Elkaisar.World.Map.realCoord(el.x);
    var realY = Elkaisar.World.Map.realCoord(el.y);
    
    var unit = WorldUnit.getWorldUnit(realX , realY);
   
    
    if(typeof unit.floor === "object" && !$.isEmptyObject(unit.floor)){
        
        unit.floor.attr({
            x:Elkaisar.World.Map.posX(el.x, el.y),
            y:Elkaisar.World.Map.posY(el.x, el.y)
        });
        return ; 
    }
   
  
    unit.floor =  Crafty
           .e("2D, Canvas, worldFloor ,  Sprite")
           .attr({
                x: Elkaisar.World.Map.posX(el.x, el.y),
                y: Elkaisar.World.Map.posY(el.x, el.y),
                z: -1,
                coord_x: parseInt(unit.x),
                coord_y: parseInt(unit.y)
            });
    
    return unit;
}




Elkaisar.World.navigateTo = function (x, y){
    
};

Elkaisar.World.Map.clear = function(){
    
   if(Crafty("*").length < 500)
        return ;
    
   var rect = Crafty.viewport.rect();
   rect._x -= Elkaisar.World.unitWidth*3;
   rect._y -= Elkaisar.World.unitHeight*3;
   rect._h += Elkaisar.World.unitHeight*6;
   rect._w += Elkaisar.World.unitWidth*6;
   
   setTimeout(function (){
        Crafty("2D").each(function (){
           
            if(!this.intersect(rect) && $.isFunction(this.destroy)){
                
                    this.destroy();
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).entite;
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).floor;
                    delete WorldUnit.getWorldUnit(this.coord_x , this.coord_y).CityFlagEntite;
                
            }
        });
    }, 0, rect);
   
};


/*____________________________________________________________________________*/
/*__________________________NAVIGET IN WORLD MAP______________________________*/
$("#nav-btn .full-btn").click(function (){
    
    var x_coord = parseInt($("#x_coord-input input").val())||0;
    var y_coord = parseInt($("#y_coord-input input").val())||0;
    
    Crafty.viewport.x = - Elkaisar.World.Map.posX(Number(x_coord) , Number(y_coord))+ Math.floor( MAX_SCREEN_WIDTH/2 - 128);
    Crafty.viewport.y = - Elkaisar.World.Map.posY(Number(x_coord) , Number(y_coord)) + Math.floor( MAX_SCREEN_HEIGHT/2 - 128) ;
    Animation.currentUnitArrow.put(x_coord, y_coord);
    
    
    Elkaisar.World.Map.Scroll();
    setTimeout(Elkaisar.World.Map.RefreshWorld , 250);
    Elkaisar.World.Map.clear();
});






$(document).on("mousemove" , "#smallMap .overMap" , function (evt){
    
    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);
    
    CURRENT_CURSOR_COORDS.css({left:x + 25 , top:y + 25});
    CURRENT_CURSOR_COORDS.html(`[${x} , ${y}]`);
    
    
});
$(document).on("mouseout" , "#smallMap .overMap" , function (){
    CURRENT_CURSOR_COORDS.html("");
    
});

$(document).on("click" , "#smallMap .overMap" , function (evt){
    
    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);
    
    $("#x_coord-input input").val(x);
    $("#y_coord-input input").val(y);
    
    
    $("#nav-btn button").trigger("click");
    
});







/*+___________________________________________________________________________*/
/*___________________________________CHAT BOX_________________________________*/

/*$(document).on("keydown", "#input-chat input", function (e){
    if(e.keyCode ===13 && !e.shiftKey){
        var msg = `<div class="msg-unit">
                        <div class="msg-from">
                            [Mustapha]:
                        </div>
                        <div class="msg-body">
                            <P>
                               ${$("#input-chat input").val()}
                            </P>
                        </div>
                    </div>`;
        $("#msg-area").append(msg);
        $("#input-chat input").val("");
        setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
    }
});
*/