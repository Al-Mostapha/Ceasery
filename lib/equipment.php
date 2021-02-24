<?php
    

class Equipment
{
    private $id_equipment;
    
    public static $equip = [
        "loy"=>[
            "boot"=>[
                "attack"=>1,
                "def"=>1,
                "vit"=>4,
                "dam"=>0
            ],
            "shield"=>[
                "attack"=>1,
                "def"=>2,
                "vit"=>14,
                "dam"=>0
            ],
            "armor"=>[
                "attack"=>0,
                "def"=>1,
                "vit"=>10,
                "dam"=>1
            ],
            "helmet"=>[
                "attack"=>0,
                "def"=>1,
                "vit"=>13,
                "dam"=>1
            ],
            "sword"=>[
                "attack"=>3,
                "def"=>0,
                "vit"=>0,
                "dam"=>4
            ]
        ],
        "lion"=>[
            "boot"=>[
                "attack"=>4,
                "def"=>4,
                "vit"=>0,
                "dam"=>4
            ],
            "shield"=>[
                "attack"=>0,
                "def"=>16,
                "vit"=>48,
                "dam"=>0
            ],
            "armor"=>[
                "attack"=>0,
                "def"=>12,
                "vit"=>32,
                "dam"=>0
            ],
            "helmet"=>[
                "attack"=>8,
                "def"=>0,
                "vit"=>48,
                "dam"=>4
            ],
            "sword"=>[
                "attack"=>32,
                "def"=>0,
                "vit"=>0,
                "dam"=>16
            ]
        ],
        "lion"=>[
            "boot"=>[
                "vit"=>0,
                "attack"=>8,
                "defence"=>8,
                "damage"=>8
            ],
            "shield"=>[
                "vit"=>90,
                "attack"=>0,
                "defence"=>30,
                "damage"=>0
            ],
            "armor"=>[
                "vit"=>60,
                "attack"=>0,
                "defence"=>20,
                "damage"=>0
            ],
            "helmet"=>[
                "vit"=>60,
                "attack"=>10,
                "defence"=>0,
                "damage"=>5
            ],
            "sword"=>[
                "vit"=>0,
                "attack"=>60,
                "defence"=>0,
                "damage"=>30
            ]
        ],
    ];

    

    public static function addEquipment($id_player ,
            $sp_attr,
            $type,
            $part)
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO equip  SET  sp_attr = '$sp_attr' , type = '$type' , id_player = '$id_player' , part = '$part'");
        if($sql->execute()){
            return $dbh->lastInsertId();
        }else{
            return -1;
        }
    }
    public static function updateOnHero($id_equip , $id_player , $state)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE  equip  SET on_hero = ".$state." WHERE "
                   . "id_equip = '$id_equip' AND id_player = '$id_player' AND "
                . "on_hero != '$state'");
         $sql->execute();
         if($sql->rowCount() >0){
             return TRUE;
         }
         else{
             return FALSE;
         }
    }

    public static function addToHero($id_hero , $id_equip , $part , $id_player)
    {
        if(!is_numeric($id_equip)){
            return;
        }
        updateTable("on_hero = 1", "equip", "id_equip = :idq AND id_player = :idp", ["idq" => $id_equip, "idp" => $id_player]);
        updateTable("`id_$part` = :idq", "hero_equip", "id_hero = :idh AND  id_player = :idp", ["idq" => $id_equip, "idh" => $id_hero, "idp" => $id_player]);
      
    }
       
    public static function removeFromHero($id_hero , $id_equip , $part , $id_player)
    {
        if(!is_numeric($id_equip)){
            return;
        }
        updateTable("on_hero = 0", "equip", "id_equip = :ide AND id_player = :idp", ["ide"=>$id_equip, "idp"=>$id_player]);
        updateTable("`id_$part` = NULL", "hero_equip", "id_hero = :idh AND id_player = :idp", ["idh"=>$id_hero, "idp"=>$id_player]);
        
       
    }
    public static function retriveEquipByIdPlayer($id_player)
    {
        
        return selectFromTable("*", "equip", " id_player = '$id_player' AND on_hero = 0");
    }
    public static function retriveEquipByIdHero($id_hero , $id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero_equip WHERE id_hero = '$id_hero' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        $equip = $sql->fetch(PDO::FETCH_ASSOC);
        
        return $equip;
    }
    public static function retriveEquipByItsId($id_equip)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * from equip WHERE id_equip = '$id_equip'");
        $sql->execute();
        $equip = null;
        while( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
           $equip = $fetch;
        }
       return $equip;
    }
    public static function getHeroEquiPart($id_hero  , $id_player , $part)
    {
       
       
        return selectFromTable("`id_$part`", "hero_equip", " id_hero = :idh AND id_player = :idp", ["idh" => $id_hero, "idp" => $id_player])[0]["id_$part"];
       
    }
    
    public static function getHeroEquipEffect($id_hero, $unit)
    {
        
        if(($id_hero < 1 && !WorldUnit::heroSysHasEquip($unit["t"]) )){
            return NULL;
        }
        
        if(!WorldUnit::isEquipEfeective($unit["t"])){
            return array(
            "attack"=>0,
            "def"=>0,
            "vit"=>0,
            "dam"=>0,
            "break"=>0,
            "anti_break"=>0,
            "strike"=>0,
            "immunity"=>0
        );
        }
        if($id_hero < 1){
            $equip = selectFromTable("part, equip AS type, lvl ", "world_unit_equip", "x = :xc AND y = :yc AND l = :l", ["xc"=>$unit["x"], "yc"=>$unit["y"], "l"=>$unit["l"]]);
        }else{
            $equip = selectFromTable("equip.part , equip.type ,equip.lvl", "equip JOIN hero_equip ON (equip.id_equip = hero_equip.id_boot OR equip.id_equip = hero_equip.id_shield OR equip.id_equip = hero_equip.id_sword OR equip.id_equip = hero_equip.id_helmet OR equip.id_equip = hero_equip.id_armor )", "hero_equip.id_hero = $id_hero");
        }
        
        $attack =0 ; $def = 0; $vitel =0 ; $dam=0; $break = 0; $anti_break = 0; $strike = 0; $immunity = 0;
        
        foreach ($equip as $one){
            
            $equipEffect  = selectFromTable("*", "equip_power", "equip = '{$one["type"]}' AND part = '{$one["part"]}' AND lvl = {$one["lvl"]}")[0];
            $attack      += $equipEffect["attack"];
            $def         += $equipEffect["defence"];
            $vitel       += $equipEffect["vitality"];
            $dam         += $equipEffect["damage"];
            $break       += $equipEffect["break"];
            $anti_break  += $equipEffect["anti_break"];
            $strike      += $equipEffect["strike"];
            $immunity    += $equipEffect["immunity"];
            
        }
        
        
        return array(
            "attack"=>$attack,
            "def"=>$def,
            "vit"=>$vitel,
            "dam"=>$dam,
            "break"=>$break,
            "anti_break"=>$anti_break,
            "strike"=>$strike,
            "immunity"=>$immunity,
        );
    
    }
}
//echo Equipment::addEquipment(1, 14, 18, 43, 21, 50, "lion", "sheild");
//Equipment::updateOnHero(1, 1, 1);
//Equipment::addToHero(1, 4, "sheild", 1);
//print_r(Equipment::getHeroEquipEffect(1));
//echo Equipment::getHeroEquiPart(1, 1, "helmet");
