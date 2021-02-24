<?php

class Quest
{
    public $quest;
    
    public function __construct($quest) {
        $this->quest = $quest;
    }
    
    public function  checkNeeds($idPlayer){
        
        
        $listOfNeed = json_decode($this->quest["quest_req"]);
        
        $player = selectFromTable("porm , prestige ", "player", "id_player = $idPlayer")[0];
       
        
        
        
        foreach ($listOfNeed as $one):
            
            if($one->type == "promotion"){
                
                
                if($player["porm"] < $one->promotion):
                    return FALSE;
                endif;
            }
            
            else if($one->type  == "matrial"){
                
                $matAmmount = selectFromTable($one->matrial, $one->mat_tab, "id_player = $idPlayer")[0][$one->matrial];
                if($matAmmount < $one->amount ){
                    return FALSE;
                }
                    
                
                
            }
            
            else if($one->type  == 'prestige'){

                if($player["prestige"] < $one->amount):
                    return FALSE;
                endif;

            }

        endforeach;
        
        return TRUE;
        
    }
    

    public function takeNeed($idPlayer , $idCity){
        
        $listOfNeed = json_decode($this->quest["quest_req"]);
        
        $LastSaveState = 0;
        
        
        
        foreach ($listOfNeed as $one):
            
         if($one->type  == "matrial"){
                
                if(Matrial::useMatrial($one->mat_tab, $one->matrial, $one->amount, $idPlayer) < 1){
                    return FALSE;
                }
                
            }
            else if($one->type  == 'resource'){
                
                if($LastSaveState  === 0){
                    
                    $saveState = new SaveState($idPlayer);
                    $saveState->saveCityState($idCity);
                    $LastSaveState = 1;
                    
                }
                
                updateTable("`$one->resource_type` = GREATEST( 0 , `$one->resource_type` - $one->amount )",
                        "city", 
                        "id_city = $idCity AND `$one->resource_type` >= $one->amount - 1000");

            }

        endforeach;
        
        return TRUE;
    }
    
    
    public function giveReword($idPlayer , $idCity){
        
        $reword = json_decode($this->quest["quest_prize"]);
        $LastSaveState = 0;
        $doneReword = [];
        
        foreach ($reword as $one){
            
            if($one->type == "matrial"){
                
                $doneReword[] = Matrial::addMatrial($one->mat_tab, $one->matrial, $one->amount, $idPlayer) > 0 ?
                        $one : ["type"=>"error"];
               
            }else if($one->type == "prestige"){
                
                $doneReword[] = updateTable("prestige = prestige + $one->amount", "player", "id_player = $idPlayer") > 0 ?
                        $one : ["type"=>"error"];
                
            }else if($one->type == "resource"){
                
                if($LastSaveState  === 0){
                    
                    $saveState = new SaveState($idPlayer);
                    $saveState->saveCityState($idCity);
                    $LastSaveState = 1;
                    
                }
                
                $doneReword[] = updateTable("$one->resource_type =  $one->resource_type + $one->amount ",
                        "city", 
                        "id_city = $idCity ")> 0 ?
                        $one : ["type"=>"error"];
                
            }else if($one->type == "population"){
                
                $doneReword[] = updateTable("pop = pop + $one->amount", "city", "id_city = $idCity")> 0 ?
                        $one : ["type"=>"error"];
                
            }else if($one->type == "equip"){
                
                $doneReword[] = Equipment::addEquipment($idPlayer, 0, $one->equip, $one->part)> 0 ?
                        $one : ["type"=>"error"];
                
            }else if($one->type == "jop"){
                
                $doneReword[] = updateTable("$one->jop_for = $one->jop_for + $one->amount", "city_jop", "id_city = $idCity") ?
                        $one : ["type"=>"error"];
                
            }else if($one->type == "promotion"){
                
                $doneReword[] = updateTable("porm =  porm + 1", "player", "id_player = $idPlayer AND porm < 30") ?
                        $one : ["type"=>"error"];
                
            }else{
                 $doneReword[] = ["type"=>"error"];
            }
            
        }
        
        
        return $doneReword;
    }
    
}

