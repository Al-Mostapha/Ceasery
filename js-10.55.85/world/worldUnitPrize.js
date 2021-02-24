WorldUnit.prize = {};

WorldUnit.prize.prizes = {};

WorldUnit.prize.getAllPrize = function (){
    
    $.ajax({
       
       url:"api/worldUnit.php",
       data:{
           GET_ALL_PRIZES: true
       },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(isJson(data)){
                WorldUnit.prize.prizes = JSON.parse(data);
                for(var iii in WorldUnit.prize.prizes){
                    
                    WorldUnit.prize.prizes[iii].lvl  = Number(WorldUnit.prize.prizes[iii].lvl);
                    WorldUnit.prize.prizes[iii].type = Number(WorldUnit.prize.prizes[iii].unitType);
                  
                }
            }else{
                
                alert(data);
                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
};





WorldUnit.prize.getUnitPrize = function (type , lvl){
    
    type = Number(type);
    lvl = Number(lvl);
    var result = [];
    for(var iii in WorldUnit.prize.prizes){
        
        if( WorldUnit.prize.prizes[iii].type === type && WorldUnit.prize.prizes[iii].lvl === lvl ){
            result.push(WorldUnit.prize.prizes[iii]);
        }
        
    }
    return result;
    
};

WorldUnit.prize.getUnitAllLvlsPrize = function (type){
    
    type = Number(type);
    var result = [];
    for(var iii in WorldUnit.prize.prizes){
        
        if( WorldUnit.prize.prizes[iii].type === type){
            result.push(WorldUnit.prize.prizes[iii]);
        }
        
    }
    return result;
    
};


WorldUnit.prize.prizeList = function (x_coord , y_coord){

    if(!WorldUnit.getWorldUnit(x_coord , y_coord))
         return ;

    var lvl  = Number(WorldUnit.getWorldUnit(x_coord , y_coord).l);
    var type = Number(WorldUnit.getWorldUnit(x_coord , y_coord).ut);
    
    var prize = this.getUnitPrize(type , lvl);
    var list  = "";
    for(var iii in prize){
        list += `   <li>
                        <div class="golden-border">
                            <div class="unit-image" style="background-image: url(${Matrial.image(prize[iii].prize)})">
                                <div class="amount stroke">(${prize[iii].amount_min}-${prize[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
    }
   
    return list;
};


WorldUnit.prize.prizeAllLvlsList = function (x_coord , y_coord){
   
   if(!WorldUnit.getWorldUnit(x_coord , y_coord))
         return ;

    var lvl  = Number(WorldUnit.getWorldUnit(x_coord , y_coord).l);
    var type = Number(WorldUnit.getWorldUnit(x_coord , y_coord).ut);
   
    var prize = WorldUnit.prize.getUnitAllLvlsPrize (type);
   
    
    var prizeList = [];
    
    var list  = "";
    for(var iii in prize){
        
        if(prizeList.indexOf(prize[iii].prize) === -1){
            prizeList.push(prize[iii].prize);
        }else {
            continue;
        }
        if(prizeList.length > 16){
            break;
        }
        
        list += `   <li>
                        <div class="golden-border">
                            <div class="unit-image ${prize[iii].lvl !== lvl ? "gray-filter" : ""}" style="background-image: url(${Matrial.image(prize[iii].prize)})">
                                <div class="amount stroke">(${prize[iii].amount_min}-${prize[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
        
        
    }
   
    return list;
};






WorldUnit.prize.getAllPrize ();