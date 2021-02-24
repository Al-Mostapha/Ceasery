<?php

class Hero
{
    private $id_hero ;
    
     public  static  $army =[
         0=>[ // مشاة
                "attack"=>0,
                "def"=>0,
                "vit"=>0,
                "dam"=>0,
                "break"=>0,
                "anti_break"=>0,
                "strike"=>0,
                "immunity"=>0,
                "res_cap"=>0,
                "in_city"=>""
            ],
         1=>[ // مشاة
                "attack"=>8,
                "def"=>8,
                "vit"=>60,
                "dam"=>3,
                "break"=>5,
                "anti_break"=>4,
                "strike"=>3,
                "immunity"=>1,
                "res_cap"=>100,
                "in_city"=>"army_a"
            ],
         2=>[  // فرسان
                "attack"=>30,
                "def"=>20,
                "vit"=>250,
                "dam"=>35,
                "break"=>10,
                "anti_break"=>4,
                "strike"=>1,
                "immunity"=>2,
                "res_cap"=>200,
                "in_city"=>"army_b"
            ],
         3=>[ // مدرعين
                "attack"=>25,
                "def"=>30,
                "vit"=>400,
                "dam"=>40,
                "break"=>1,
                "anti_break"=>5,
                "strike"=>10,
                "immunity"=>10,
                "res_cap"=>220,
                "in_city"=>"army_c"
            ],
         4=>[  // رماة
                "attack"=>9,
                "def"=>5,
                "vit"=>45,
                "dam"=>3,
                "break"=>6,
                "anti_break"=>2,
                "strike"=>2,
                "immunity"=>2,
                "res_cap"=>75,
                "in_city"=>"army_d"
            ],
         5=>[  // مقاليع
                "attack"=>19,
                "def"=>25,
                "vit"=>100,
                "dam"=>19,
                "break"=>5,
                "anti_break"=>2,
                "strike"=>12,
                "immunity"=>2,
                "res_cap"=>35,
                "in_city"=>"army_e"
            ],
         6=>[ //  منجنيق
                "attack"=>40,
                "def"=>20,
                "vit"=>600,
                "dam"=>70,
                "break"=>2,
                "anti_break"=>4,
                "strike"=>15,
                "immunity"=>5,
                "res_cap"=>75,
                "in_city"=>"army_f"
            ],
     ];
     
     public static $SOLIDIAR_CAP =[ 0, // مكان خالى
                                    1, //  مشاة
                                    3, //  فرسان
                                    6, //  مدرعين
                                    1, //  رماة
                                    4, //   مقاليع
                                    8]; //  منجنيق

    public function __construct($id_hero)
    {
        $this->id_hero = $id_hero;
    }

    
    
    public static function addHero($name , $lvl , $id_player , $id_city , $avatar ,  $ultra_p = "")
    {
       if($lvl > 255)
        return ;
        global $dbh;
        
        if($ultra_p == ""){
            $ultra_p =0;
        }
        
        
        if($lvl >= 100){
            $power = 150;
        }else{
            $power = 50 + $lvl;
        }
        $pba     = rand(0, 25);
        $pbb     = rand(0, 25);
        $points  = rand(50, 60);
        $pbc     = $points  - $pba -$pbb;
        $point_a = $pba  + ($lvl*2);
        $point_b = $pbb ;
        $point_c = $pbc  ;
        $cap     = 30000 + $point_a*500;
        $lastOrder =  selectFromTable("ord", "hero", "id_city = $id_city ORDER BY ord DESC LIMIT 1");
        
        $ord = count($lastOrder) > 0 ? $lastOrder[0]["ord"] + 1  :  0;
        
        $heroCount = selectFromTable("COUNT(*) AS c", "hero", "id_player = :idp", ["idp" => $id_player])[0]["c"];
        $idHero = ($id_player - 1 ) *1000 + $heroCount + 1;
        
        
        if($heroCount > 0) 
            $idHero = max($idHero, selectFromTable("id_hero", "hero", "id_player = :idp ORDER BY id_hero DESC LIMIT 1", ["idp" => $id_player])[0]["id_hero"] + 1);
        
        
        $sql = $dbh->prepare("INSERT INTO hero SET id_hero = $idHero, name = '$name' , lvl = '$lvl' ,  avatar = '$avatar' , "
                . "power = '$power' , id_city = '$id_city' , id_player = '$id_player' , "
                . "point_a = '$point_a' , point_b = '$point_b' , point_c = '$point_c',"
                . "cap = '$cap' , ultra_p = '$ultra_p' , ord = $ord , p_b_a = '$pba', p_b_b = '$pbb', p_b_c = '$pbc', b_lvl = $lvl");
        if($sql->execute()){
            
            $id_hero = $idHero;
            Hero::addHeroTOEquiTable($id_hero , $id_player);
            Hero::addHeroToArmyTable($id_hero ,$id_player);
            updateTable("hero_num  = hero_num  + 1", "server_data", "id = 1");
            Hero::addHeroMedal($id_hero);
            return array(
                "id_hero"=>$id_hero,
                "lvl"=>$lvl,
                "name"=>$name ,
                "point_a"=>$point_a,
                "point_b"=>$point_b,
                "point_c"=>$point_c,
                "avatar"=>$avatar,
                "ultra_p"=>$ultra_p,
                "cap"=>$cap
            );
            
        }else{
            return -1;
        }
    }
     public static function addHeroTOEquiTable($id_hero ,$id_player)
    {
         global $dbh;
         $sql = $dbh->prepare("INSERT INTO hero_equip SET id_hero = '$id_hero' ,"
                 . "  id_player = '$id_player'");
         $sql->execute();
    }
     public static function addHeroToArmyTable($id_hero , $id_player)
    {
         global $dbh;
         $sql = $dbh->prepare("INSERT INTO hero_army SET id_hero = '$id_hero' ,"
                 . "  id_player = '$id_player'");
         $sql->execute();
    }
    public function getHeroArmy($id_player)
    {
        global $dbh;
         $sql = $dbh->prepare("SELECT * FROM hero_army WHERE id_hero = '$this->id_hero'"
                 . "  AND id_player = '$id_player'");
         $sql->execute();
         
         $data = $sql->fetch(PDO::FETCH_ASSOC);
         return $data;
    }
    public function getHeroArmyByCELL($cell , $id_player)
    {
        global $dbh;
         $sql = $dbh->prepare("SELECT  `".$cell."_type` , `".$cell."_num` FROM hero_army "
                 . " WHERE id_hero = '$this->id_hero' AND id_player = '$id_player'");
         $sql->execute();
         
         $data = $sql->fetch(PDO::FETCH_ASSOC);
        
         return array_values($data);
    }
    public function updateHeroAmyByCell($cell , $type , $amount ,$id_player) 
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero_army SET ".$cell."_type = '$type' , ".$cell."_num = '$amount'"
                . " WHERE id_hero = '$this->id_hero' AND id_player = '$id_player'");
        $sql->execute();
        return $sql->rowCount();
    }
    
    public static function updateValue($value , $col , $id_player , $id_hero)
    {
        global  $dbh;
        $sql = $dbh->prepare("UPDATE hero_army SET $col = '$value' "
                . " WHERE id_player ='$id_player' AND id_hero = '$id_hero'");
        return $sql->execute();
    }
    
    public static function updateValue_heroTable($value , $col , $id_player , $id_hero)
    {
        global  $dbh;
        $sql = $dbh->prepare("UPDATE hero SET $col = '$value' "
                . " WHERE id_player ='$id_player' AND id_hero = '$id_hero' AND in_city = 1");
        $sql->execute();
        return $sql->rowCount();
    }

    public static function addTHeaterHero($id_city , $id_player , $name , $lvl )
    {
        global $dbh;
        $hero_image = (int) rand(0, 9);
        $sql = $dbh->prepare("INSERT INTO hero_theater SET id_city = '$id_city' , "
                . " id_player = '$id_player' , hero_name = '$name' , "
                . " hero_lvl = '$lvl' ,  "
                . " hero_image = '$hero_image'");
        return $sql->execute();
   
    }
    
    public static function getTheaterHero($id_city )
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero_theater WHERE id_city = '$id_city'");
        $sql->execute();
        $data = NULL;
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $data[] = $fetch;
        }
        return $data;
    }
    public static function toggelHeroState($id_player , $id_hero )
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero SET attack = 1 - attack , in_city = 1- in_city WHERE id_hero = '$id_hero' "
                . " AND id_player = '$id_player' AND console = 0");
        $sql->execute();
        
        return$sql->rowCount();
    }
    
    

    public static function heroBackHome($id_player , $id_hero )
    {
    }
    
    public static function heroLeaveHome($id_player , $id_hero)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero SET  in_city = 0  WHERE id_hero = '$id_hero' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        
        return$sql->rowCount();
    }
    
    public static function decreasePower($id_player , $id_hero , $power)
    {
        $now = time();
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero SET power = power - '$power' , power_ls = $now WHERE id_hero = '$id_hero' "
                . " AND id_player = '$id_player' AND console = 0");
        $sql->execute();
        
        return$sql->rowCount();
    }
    
    public static function calPowerTOAdd( $hero )
    {
        
        $now = time();
        
        $powerToAdd = ($now - $hero["power_ls"]) / (60*6);
        $maxPower = min( 150  , $hero["lvl"] + 50);
        
        if($maxPower <= $powerToAdd + $hero["power"]){
            
            updateTable("power = :mp , power_ls = :pls", "hero", "id_hero = :idh", ["idh" => $hero["id_hero"], "mp" => $maxPower, "pls" => $now]);
            return ["power"=> $maxPower , "power_ls" => $now];
            
        } 
        
        if($powerToAdd  >= 1){
            
            $remqinder  = $powerToAdd % (floor($powerToAdd));
            $time_ls = $now - $remqinder*60*6;
            
            updateTable("power = power + :mp , power_ls = :pls", "hero", "id_hero = :idh", ["idh" => $hero["id_hero"], "mp" => $powerToAdd, "pls" => $time_ls]);
            return ["power"=> $hero["power"] + floor($powerToAdd) , "power_ls" => $time_ls];
        }
        
        return ["power"=> $hero["power"]  , "power_ls" => $hero["power_ls"]];
        
    }
    public static function increasePower($id_player , $id_hero , $power)
    {
        global $dbh;
        $now = time();
        $sql = $dbh->prepare("UPDATE hero SET power = power +'$power' ,power_ls = $now WHERE id_hero = '$id_hero' "
                . " AND id_player = '$id_player' AND in_city = 1");
        $sql->execute();
        
        return $sql->rowCount();
        
    }
    public static  function addHeroMedal($id_hero)
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO hero_medal SET id_hero = '$id_hero'");
        $sql->execute();
        
        return$sql->rowCount();
    }
    
    public static  function getHeroMedal($id_hero)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero_medal WHERE id_hero = '$id_hero'");
        $sql->execute();
        
        return$sql->fetch(PDO::FETCH_ASSOC);
    }
    public static function calReqXp($lvl , $id_player)
    {
        
        $study_lvl = selectFromTable("scholership", "edu_uni", "id_player = $id_player")[0]["scholership"];
        $base = floor(exp(log($lvl , 2)))*3.5*floor(exp($lvl/100))* pow(10, floor(255/100));
        $study_effect = ($study_lvl) > 10 ? 0.3 + (($study_lvl) - 10)*0.01  : ($study_lvl)*0.03;
    
        return $base * ( 1 - $study_effect);
    }
    public static function studyEffectOnForces($type, $stud_array)
    {
        if($type == 1 ||$type == 3 ||$type == 4){
            return 0.03*$stud_array["infantry"];
        }
        if($type == 2){
            return 0.03*$stud_array["riding"];
        }
        if($type == 5 ||$type == 6 ){
            return 0.03*$stud_array["army"];
        }
        
        return 0;
    }


    /*
    *  this function modify hero and add all force for each hero cell
    */
    public function getHeroArmyForces(&$hero_army)
    {
        
        $all_cell_type = array_keys($hero_army["type"]);
        $all_cell_amount = array_keys($hero_army["pre"]);
        
        $hero_effects = array();
        $total_res_cap  = 0;
        for ($index = 0 ; $index < count($all_cell_amount) ; $index++):
            
            if($hero_army["type"][$all_cell_type[$index]] != 0){
                
                $hero_effects[$index + 1] = [
                
                    "attack"      => static::$army[$hero_army["type"][$all_cell_type[$index]]]["attack"]  + $hero_army["point_atk"], // attack of unite in this cell
                    "def"         => static::$army[$hero_army["type"][$all_cell_type[$index]]]["def"]     + $hero_army["point_def"], // defence of unite in this cell
                    "vit"         => static::$army[$hero_army["type"][$all_cell_type[$index]]]["vit"]    , // vitality of unite in this cell
                    "dam"         => static::$army[$hero_army["type"][$all_cell_type[$index]]]["dam"] ,    // damage of unite in this cell
                    "break"       => static::$army[$hero_army["type"][$all_cell_type[$index]]]["break"] ,    // damage of unite in this cell
                    "anti_break"  => static::$army[$hero_army["type"][$all_cell_type[$index]]]["anti_break"] ,    // damage of unite in this cell
                    "strike"      => static::$army[$hero_army["type"][$all_cell_type[$index]]]["strike"] ,    // damage of unite in this cell
                    "immunity"    => static::$army[$hero_army["type"][$all_cell_type[$index]]]["immunity"] ,    // damage of unite in this cell
                    
                    "sp_attack"      => 0, // attack of unite in this cell
                    "sp_defence"     => 0, // defence of unite in this cell
                    "sp_vit"         => 0, // vitality of unite in this cell
                    "sp_damage"      => 0,    // damage of unite in this cell
                    "sp_break"       => 0,    // damage of unite in this cell
                    "sp_anti_break"  => 0,    // damage of unite in this cell
                    "sp_strike"      => 0,    // damage of unite in this cell
                    "sp_immunity"    => 0,    // damage of unite in this cell
                    
                    "unit"     => $hero_army["pre"][$all_cell_amount[$index]],   // the number of untie in this cell
                    "fight"    => FALSE,
                    "defenced" => FALSE,
                    "dead_unit"=>0,
                    "honor"    =>0,
                    "points"   =>0,
                    "army_type"=>$hero_army["type"][$all_cell_type[$index]]
                    
                ];
                
                $total_res_cap +=  static::$army[$hero_army["type"][$all_cell_type[$index]]]["res_cap"]*$hero_army["pre"][$all_cell_amount[$index]];
            } 
            
        endfor;
        
        /* push array to the orginal one */
        $hero_army["real_eff"] = $hero_effects;
        $hero_army["resource_capacity"] = $total_res_cap;
        
        
    }
    
    
    public static function increaseHeroXp($id_hero , $amount)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero SET exp = exp + $amount WHERE 
                id_hero = '$id_hero' AND lvl < 255");
        $sql->execute();
        return $sql->rowCount();
    }
    
    public static function resetArmyBuild($id_player , $id_work)
    {
        $time = time() + 10;
        
        global $dbh;
        $sql = $dbh->prepare("DELETE FROM build_army WHERE id_player = '$id_player' AND id = $id_work");
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    
    public static function isHeroArmies($heroArmy, $type){
        
        if($heroArmy["f_1_type"] != 0 && $heroArmy["f_1_type"] != $type ){
            
            return FALSE;
        }elseif($heroArmy["f_2_type"] != 0 && $heroArmy["f_2_type"] != $type ){
            
            return FALSE;
        }elseif($heroArmy["f_3_type"] != 0 && $heroArmy["f_3_type"] != $type ){
             
            return FALSE;
        }elseif($heroArmy["b_1_type"] != 0 && $heroArmy["b_1_type"] != $type ){
             
            return FALSE;
        }elseif($heroArmy["b_2_type"] != 0 && $heroArmy["b_2_type"] != $type ){
            
            return FALSE;
        }elseif($heroArmy["b_3_type"] != 0 && $heroArmy["b_3_type"] != $type ){
             
            return FALSE;
        }
        
        return TRUE;
        
    }

    public static function getHeroCellArmy($id_hero)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT f_1_type , f_2_type , f_3_type , b_1_type , b_2_type , b_3_type  FROM  hero_army "
                . " WHERE id_hero = '$id_hero'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    public static function getCityTheater($id_city)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT lvl , last_update  FROM  city_theater "
                . " WHERE id_city = '$id_city'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    
    public static function refreshTeater($id_city , $with_mat = false)
    {
        global $dbh;
        $cityTheater = selectFromTable("lvl , last_update", "city_theater", "id_city = $id_city");
        
        if(!isset($cityTheater[0])){
            return(json_encode(["heros"=>[] , "last_update" =>0, "refresh_time"=>0]));
        }
        
        $city_theater = $cityTheater[0];
        $heros = selectFromTable("*", "hero_theater", "id_city = $id_city");

        

        // time take the teater to make update for theater  in(secoundes)
        $refresh_time = max(120 - 4*$city_theater["lvl"] , 6)*60;

        if((time() < $city_theater["last_update"] + $refresh_time) && !$with_mat ){
            
            return(json_encode(["heros"=>$heros , "last_update" =>$city_theater["last_update"] , "refresh_time"=>$refresh_time]));

        }

        // maximum number of new heros  in theater
        $max_num_heros = min($city_theater["lvl"] , 10);

        $number_of_new_heros = min(floor((time() - $city_theater["last_update"] + 120)/$refresh_time) , $max_num_heros); 

        if($with_mat){$number_of_new_heros = $max_num_heros;}


        
        $num_to_insert = $max_num_heros - count($heros) ;
        $num_to_update = $number_of_new_heros - $num_to_insert;
        
        
        if($num_to_update > 0){

            $sql = $dbh->prepare("UPDATE hero_theater SET hero_name = FLOOR(RAND()*25) , hero_lvl = "
                . " LEAST(GREATEST(FLOOR(RAND() * 5 *". min($city_theater["lvl"], 30)."), 1), 150)  , hero_image = FLOOR( RAND()*19), "
                . " ultra_p = FLOOR( GREATEST( CEIL( 1 + RAND()*-90) , 0) * (3 + RAND()*4)) WHERE "
                . " id_city = $id_city ORDER BY time_stamp ASC LIMIT $num_to_update");

            $sql->execute();


        }

        for($index = 0 ;  $index < $num_to_insert ; $index++):

            $sql = $dbh->prepare("INSERT INTO hero_theater SET hero_name = FLOOR(RAND()*25) , hero_lvl ="
                . " LEAST(GREATEST(FLOOR(RAND() * 5 *".min($city_theater["lvl"], 30)."), 1), 150)  , hero_image = FLOOR( RAND()*19),"
                . " ultra_p = FLOOR( GREATEST( CEIL( 1 + RAND()*-90) , 0) * (3 + RAND()*4)) , "
                . " id_city = $id_city");

            $sql->execute();

        endfor;
        
        
        if($num_to_update + $num_to_insert >= 1){
            updateTable("last_update = ".time(), "city_theater", "id_city = '$id_city'");
        }
        




    $heros_new = selectFromTable("*", "hero_theater", "id_city = $id_city");

    return json_encode(["heros"=>$heros_new  , "last_update"=> time() , "refresh_time"=>$refresh_time]);
    
        
    }
    
    public static function deleteHeroTheaterById ($id_here_theater)
    {
        
        global $dbh;
        $sql = $dbh->prepare("DELETE FROM hero_theater WHERE id_hero = $id_here_theater");
        $sql->execute();
        return $sql->rowCount();
        
    }
    public static function killHeroArmy($hero , $unit_attack_type){
        
        if(
            WorldUnit::isBarrary($unit_attack_type)
            || WorldUnit::isArenaDeath($unit_attack_type)){
            $factor = 1;
        }else if(WorldUnit::isArmyCapital($unit_attack_type)){
            return;
        }elseif(
                WorldUnit::isAsianSquads($unit_attack_type)
                || WorldUnit::isCarthagianArmies($unit_attack_type)){
            $factor = 0.2;
        }elseif(WorldUnit::isCamp($unit_attack_type) || WorldUnit::isStatueWar($unit_attack_type)){
            $factor = 0.4;
        }elseif(WorldUnit::isMonawrat($unit_attack_type) 
                || WorldUnit::isGangStar($unit_attack_type)
                || WorldUnit::isArenaChallange($unit_attack_type)
                || WorldUnit::isArenaGuild($unit_attack_type)
                ){
            return;
        }else{
            $factor = 1;
        }
        
        $f_1_n =   max(ceil($hero["pre"]['f_1_pre'] - $hero["post"]["f_1_post"]*$factor) , 0);
        $f_1_t = $f_1_n > 0? $hero["type"]["f_1_type"] : 0;
        $f_2_n =   max(ceil($hero["pre"]['f_2_pre'] - $hero["post"]["f_2_post"]*$factor) , 0);
        $f_2_t = $f_2_n > 0? $hero["type"]["f_2_type"] : 0;
        $f_3_n =   max(ceil($hero["pre"]['f_3_pre'] - $hero["post"]["f_3_post"]*$factor) , 0);
        $f_3_t = $f_3_n > 0? $hero["type"]["f_3_type"] : 0;
        $b_1_n =   max(ceil($hero["pre"]['b_1_pre'] - $hero["post"]["b_1_post"]*$factor) , 0);
        $b_1_t = $b_1_n > 0? $hero["type"]["b_1_type"] : 0;
        $b_2_n =   max(ceil($hero["pre"]['b_2_pre'] - $hero["post"]["b_2_post"]*$factor) , 0);
        $b_2_t = $b_2_n > 0? $hero["type"]["b_2_type"] : 0;
        $b_3_n =   max(ceil($hero["pre"]['b_3_pre'] - $hero["post"]["b_3_post"]*$factor) , 0);
        $b_3_t = $b_3_n > 0? $hero["type"]["b_3_type"] : 0;
        
        $quary = "f_1_num = $f_1_n , f_1_type = $f_1_t , f_2_num = $f_2_n , f_2_type = $f_2_t , "
                . "f_3_num = $f_3_n , f_3_type = $f_3_t , b_1_num = $b_1_n , b_1_type = $b_1_t , "
                . "b_2_num = $b_2_n , b_2_type = $b_2_t , b_3_num = $b_3_n , b_3_type = $b_3_t ";
        updateTable($quary, "hero_army", "id_hero = {$hero["id_hero"]}");
        
        $medical_status_effect = selectFromTable("medical", "player_stat", "id_player = {$hero["id_player"]}")[0]["medical"];
        $ratio = $medical_status_effect > time() ? 0.6 : 0.1;
        
        $city_wound = [0,0,0,0,0,0,0];
        $city_wound[$hero["type"]["f_1_type"]] += floor($hero["post"]["f_1_post"]*$factor*$ratio);
        $city_wound[$hero["type"]["f_2_type"]] += floor($hero["post"]["f_2_post"]*$factor*$ratio);
        $city_wound[$hero["type"]["f_3_type"]] += floor($hero["post"]["f_3_post"]*$factor*$ratio);
        $city_wound[$hero["type"]["b_1_type"]] += floor($hero["post"]["b_1_post"]*$factor*$ratio);
        $city_wound[$hero["type"]["b_2_type"]] += floor($hero["post"]["b_2_post"]*$factor*$ratio);
        $city_wound[$hero["type"]["b_3_type"]] += floor($hero["post"]["b_3_post"]*$factor*$ratio);
        
        $quary = " army_a = army_a + {$city_wound[1]} ,army_b = army_b + {$city_wound[2]} ,"
        . "army_c = army_c + {$city_wound[3]} ,army_d = army_d + {$city_wound[4]} ,"
        . "army_e = army_e + {$city_wound[5]} ,army_f = army_f + {$city_wound[6]} ";
        
        updateTable($quary, "city_wounded", "id_city = {$hero["id_city"]}");
    }
    
    
    
    public static function heroMaxCap($id_player , $id_hero)
    {
        $study_lvl = selectFromTable("leader", "edu_acad", "id_player = $id_player")[0];
        $hero_cap  = selectFromTable("hero.point_a , hero.point_a_plus , "
                . "hero_medal.medal_ceasro , hero_medal.ceaser_eagle", 
                "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero",
                "hero.id_hero = $id_hero")[0];
        $now = time();
        
        $base_cap        = ceil((30000 + ($hero_cap["point_a"]+$hero_cap["point_a_plus"])*500));
        $after_study     = ceil($base_cap*($study_lvl["leader"])*3/100);
        $after_medal_cap = $hero_cap['medal_ceasro'] > $now ? ($hero_cap["point_a"]+$hero_cap["point_a_plus"])*500*25/100 : 0;
        $after_eagle     = $hero_cap['ceaser_eagle'] > $now ? ($hero_cap["point_a"]+$hero_cap["point_a_plus"])*500*25/100 : 0;
        
        return $base_cap + $after_medal_cap + $after_eagle +$after_study;
    }
    public static function heroCap($id_hero)
    {
        $hero_army = selectFromTable("*", "hero_army", "id_hero = $id_hero")[0];
        
        
        $hero_cap = Hero::$SOLIDIAR_CAP[$hero_army["f_1_type"]]*$hero_army["f_1_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["f_2_type"]]*$hero_army["f_2_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["f_3_type"]]*$hero_army["f_3_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_1_type"]]*$hero_army["b_1_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_2_type"]]*$hero_army["b_2_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_3_type"]]*$hero_army["b_3_num"];
        return $hero_cap;
        
    }

    public static function heroAvailableCap($id_player , $id_hero)
    {
        $hero_army = selectFromTable("*", "hero_army", "id_hero = $id_hero")[0];
        $hero_max_cap = Hero::heroMaxCap($id_player, $id_hero);
        
        
        $hero_cap = Hero::$SOLIDIAR_CAP[$hero_army["f_1_type"]]*$hero_army["f_1_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["f_2_type"]]*$hero_army["f_2_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["f_3_type"]]*$hero_army["f_3_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_1_type"]]*$hero_army["b_1_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_2_type"]]*$hero_army["b_2_num"]
                + Hero::$SOLIDIAR_CAP[$hero_army["b_3_type"]]*$hero_army["b_3_num"];
        
        return $hero_max_cap - $hero_cap;
    }
    
}
//$hero = new Hero(1);
//$army = $hero->getHeroArmy(1);
//unset($army["id_hero"]);
//print_r(Hero::getTheaterHero(1, 1));
//print_r(Hero::getHeroMedal(2));
//print_r(Hero::addHero(132, 50, 1, 1, 1));

