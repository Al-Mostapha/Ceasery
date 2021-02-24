<?php

Class BeforeFight
{
    
    
    private $x_coord;
    private $y_coord;
    private $id_battel;
    private $unite ;


    public function __construct($x_coord , $y_xoord) 
    {
        
        $this->x_coord = $x_coord;
        $this->y_coord = $y_xoord;
        
    }
    
    public function isLastLvl()
    {
        
        $unite = selectFromTable("t , l", "world", "x = $this->x_coord , y = $this->y_coord");
        $this->unite = $unite[0];
        $unite_type = (int) $this->unite["t"];
        $unite_lvl = (int) $this->unite["l"];
        
        if(WorldUnit::isOneFRONT($unite_type) && $unite_lvl == FRONT_SQUADS_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isOneLight($unite_type) && $unite_lvl == LIGHT_SQUADS_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isOneHeavy($unite_type) && $unite_lvl == HEAVY_SQUADS_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isOneGuard($unite_type) && $unite_lvl == GUARD_SQUADS_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isBraveThunder($unite_type) && $unite_lvl == BRAVE_THUNDER_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isMonawrat($unite_type) && $unite_lvl == MONAWRAT_MAX_LVL ){
            return TRUE;
        }
        
        if(WorldUnit::isCamp($unite_type) && $unite_lvl == CAMP_MAX_LVL ){
            return TRUE;
        }
        
        
        return FALSE;
        
    }
    
    
    public function lastLvlDone()
    {
        $all_battel  = selectFromTable("id_battel", "battel", "x_coord = $this->x_coord AND y = $this->y_coord");
        $all_player = array();
        foreach ($all_battel  as $one){
            
            $players = selectFromTable("DISTINCT  id_player", "battel_member", "WHERE id_battel = {$one["id_battel"]}");
            foreach ($players  as $player){
                $all_player[] = $player["id_player"];
            }
            
            deleteTable("battel", "id_battel = {$one["id_battel"]}");
        }
    }
    
}

