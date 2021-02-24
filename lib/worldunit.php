<?php

define("MONAWRAT_MAX_LVL", 50);
define("CAMP_MAX_LVL", 50);
define("GANGSTAR_MAX_LVL", 2);
define("FRONT_SQUADS_MAX_LVL", 40);
define("LIGHT_SQUADS_MAX_LVL", 30);
define("HEAVY_SQUADS_MAX_LVL", 20);
define("GUARD_SQUADS_MAX_LVL", 20);
define("BRAVE_THUNDER_MAX_LVL", 10);

class WorldUnit
{
    
    public static function isBarrary($type){
        
        if(($type <= 16 || ($type >= 21 && $type <= 29)) && $type != 0  ){
            return true;
        }
        return false;
        
    }
    public static function isRiver ($type){
        
        if($type <= 16  && $type != 0  ){
            return true;
        }
        return false;
        
    }
    public static function isEmpty($type){
        
        if($type == 0 ){
            return true;
        }
        return false;
        
    }
    public static function isCity($type){
        
        if($type >=17 && $type <=20 && $type != 0){
            
            return true;
            
        }
        return false;
        
    }
    public static function isMountain($type){
        
       if($type >=21 && $type <=23 && $type != 0){
            
            return true;
            
        }
        return false; 
        
    }
    public static function isDesert($type){
        
       if($type >=24 && $type <=26 && $type != 0){
            
            return true;
            
        }
        return false; 
        
    }
    public static function isWood($type){
        
       if($type >=27 && $type <=29 &&  $type != 0){
            
            return true;
            
        }
        return false; 
        
    }
    public static function isMonawrat($type){
        
         if($type  == 30 && $type != 0){
            
            return true;
            
        }
        return false; 
        
    }
    public static function isCamp($type){
        
         if($type  == 31 && $type != 0){
            
            return true;
            
        }
        return false;
        
    }
    public static function isOneFRONT($type){
        if($type  >= 32 && $type <= 35){
            
            return true;
            
        }
        return false;
    }

    public static function isFrontSquad($type){
        if($type  == 32 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isFrontBand($type){
        if($type  == 33 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isFrontSquadron($type){
        if($type  == 34 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isFrontDivision($type){
        if($type  == 35 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isOneLight($type){
        if($type  >= 36 && $type <= 39){
            
            return true;
            
        }
        return false;
    }
    public static function isLightSquad($type){
        if($type  == 36 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isLightBand($type){
        if($type  == 37 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isLightSquadron($type){
        if($type  == 38 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isLightDivision($type){
        if($type  == 39 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isOneHeavy($type){
        if($type  >= 40 && $type <= 43){
            
            return true;
            
        }
        return false;
    }
    public static function isHeavySquad($type){
        if($type  == 40 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isHeavyBand($type){
        if($type  == 41 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isHeavySquadron($type){
        if($type  == 42 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isHeavyDivision($type){
        if($type  == 43 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isOneGuard($type){
        if($type  >= 44 && $type <= 47){
            
            return true;
            
        }
        return false;
    }
    public static function isGuardSquad($type){
        if($type  == 44 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isGuardBand($type){
        if($type  == 45 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isGuardSquadron($type){
        if($type  == 46 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isGuardDivision($type){
        if($type  == 47 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isBraveThunder($type){
        if($type  == 48 && $type != 0){
            
            return true;
            
        }
        return false;
    }
    public static function isAsianSquads($type){
        if($type >= 32 && $type <= 48){
            return true;
        }
        return false;
    }
    public static function isGangStar($type){
        return($type >= 49 && $type <= 51);
    }
    public static function isGang($type){
        return ($type == 49);
    }
    public static function isMugger($type){
        return ($type == 50);
    }
    public static function isThiefs($type){
        return ($type == 51);
    }
    
    public static function isCarthasianGang($type){
        return ($type == 52);
    }
    public static function isCarthageTeams($type){
        return ($type == 53);
    }
    public static function isCarthageRebals($type){
        return ($type == 54);
    }
    public static function isCarthageForces($type){
        return ($type == 55);
    }
    public static function isCarthageCapital($type){
        return ($type == 56);
    }
    public static function isCarthagianArmies($type){
        return (($type >= 52 && $type <= 56));
    }
    
    public static function isArmyCapital($type){  return (($type >= 100) && ($type <= 105));}
    public static function isArmyCapitalA($type){ return ($type == 100); }
    public static function isArmyCapitalB($type){ return ($type == 101); }
    public static function isArmyCapitalC($type){ return ($type == 102); }
    public static function isArmyCapitalD($type){ return ($type == 103); }
    public static function isArmyCapitalE($type){ return ($type == 104); }
    public static function isArmyCapitalF($type){ return ($type == 105); }
    
    public static function isQueenCity ($type){
        return (($type) == 130 || ($type) == 131 || ($type) == 132 );
    }
    public static function isQueenCityS ($type){
        return (($type) == 130);
    }
    public static function isQueenCityM ($type){
        return (($type) == 131);
    }
    public static function isQueenCityH ($type){
        return (($type) == 132);
    }
    public static function isRepelCastle ($type){
        return (($type) == 134 || ($type) == 135 || ($type) == 136 );
    }
    public static function isRepelCastleS ($type){
        return (($type) == 134);
    }
    public static function isRepelCastleM ($type){
        return ( ($type) == 135 );
    }
    public static function isRepelCastleH ($type){
        return ( ($type) == 136 );
    }
    
    public static function isStatueWar ($type){
        return (($type) == 150 || ($type) == 151 || ($type) == 152 );
    }
    public static function isStatueWarS ($type){
        return (($type) == 150);
    }
    public static function isStatueWarM ($type){
        return ( ($type) == 151 );
    }
    public static function isStatueWarH ($type){
        return ( ($type) == 152 );
    }
    public static function isStatueWalf ($type){
        return (($type) == 153 || ($type) == 154 || ($type) == 155 );
    }
    public static function isStatueWalfS ($type){
        return (($type) == 153);
    }
    public static function isStatueWalfM ($type){
        return ( ($type) == 154 );
    }
    public static function isStatueWalfH ($type){
        return ( ($type) == 155 );
    }
    
    
    public static function canHasGarrison($type){ return (static::isCity($type) || static::isBarrary($type)); }
    
    
    public static function isArena($type){
        return (($type >= 125) && ($type <= 127));
    }
    public static function isArenaChallange($type){
        return (($type == 125));
    }
    public static function isArenaDeath($type){
        return (($type == 126));
    }
    public static function isArenaGuild($type){
        return (($type == 127));
    }

    public static function isSharablePrize($type){
        return WorldUnit::isCarthagianArmies($type) || WorldUnit::isCity($type);
    }
    
    public static function isEquipEfeective($type){
        return !static::isArmyCapital($type);
    }
    public static function heroSysHasEquip($type){
        return (static::isStatueWalf($type) || static::isStatueWar($type));
    }

    public static function isGodGateEffective($type){
        return !(static::isArmyCapital($type) || static::isArenaDeath($type));
    }

    public static function limitedHero($type){
        
        return (
                static::isArmyCapital($type)
                || static::isCarthagianArmies($type)
                || static::isCity($type)
                );
        
    }

    public static function afterWinAnnounceable($type)
    {
        return ( 
                static::isMonawrat($type) ||
                static::isCamp($type)||
                static::isArena($type)||
                static::isArmyCapital($type)||
                static::isStatueWalf($type)||
                static::isStatueWar($type)
                );
    }
    
    public static function unitHeros($x, $y , $lvl){
        
        $heros = selectFromTable("*", "world_unit_hero", "x = $x AND y= $y AND lvl = $lvl ORDER BY ord ASC");
        $herosToSend = [];
       
        foreach ($heros as $one){
            $herosToSend[] = [
                "name"=>$one["name"],
                "ord"=>$one["ord"],
                "pre"=>[
                    "f_1_pre" => $one["f_1_num"] ,
                    "f_2_pre" => $one["f_2_num"] ,
                    "f_3_pre" => $one["f_3_num"],
                    "b_1_pre" => $one["b_1_num"],
                    "b_2_pre" => $one["b_2_num"],
                    "b_3_pre" => $one["b_3_num"]
                ],
                "type"=>[
                    "f_1_type" => $one["f_1_type"],
                    "f_2_type" => $one["f_2_type"],
                    "f_3_type" => $one["f_3_type"],
                    "b_1_type" => $one["b_1_type"],
                    "b_2_type" => $one["b_2_type"],
                    "b_3_type" => $one["b_3_type"] 
                ]
            ];
        }
        
        return $herosToSend;
    }

    public static function hasGarrison($x , $y){
        return selectFromTable("id_player", "world_unit_garrison", "x_coord = $x AND y_coord = $y");
    }
    
    public static function heroCanAttack($idHero, $unitType){
        
        if(WorldUnit::isArmyCapital($unitType)){
            
            $capitalArmy = [
                100=>ARMY_A,
                101=>ARMY_B,
                102=>ARMY_C,
                103=>ARMY_D,
                104=>ARMY_E,
                105=>ARMY_F
            ];
            $heroArmy = Hero::getHeroCellArmy($idHero);
            return Hero::isHeroArmies($heroArmy, $capitalArmy[$unitType]);
            
        }
        
        return TRUE;
        
    }
    public static function isAttackable($id_player, $unit){
        $type = $unit["t"];
        if(static::isArenaGuild($unit["t"]) || static::isStatueWar($unit["t"])){
            return (existInTable("guild_member", "id_player = $id_player") == 1);
        }else if(static::isEmpty($unit["t"])){
            return FALSE;
        }
        
        return TRUE;
        
    }
}
