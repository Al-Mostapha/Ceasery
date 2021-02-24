<?php


Class SaveState
{
    
    private $id_player;
    private $console_effect = 0;


    public function __construct($id_player) {
        
        $this->id_player = $id_player;
        $this->console_effect = 0;
        
    }
    
    
    public function getTimedTasks()
    {
        
        global $dbh;
        $list1 = selectFromTable("*", "city_worker", "id_player = :idp", ["idp" => $this->id_player]);
        $TASKS = array();
        foreach ($list1 as &$one){
            $one["task"] = "building";
            $TASKS[] = $one;
        }
        
        $list2 = selectFromTable("*", "study_acad", "id_player = :idp", ["idp" => $this->id_player]);
        foreach ($list2 as &$one){
            $one["task"] = "study";
            $TASKS[] = $one;
        }
        
        $list3 = selectFromTable("*", "study_uni", "id_player = :idp", ["idp" => $this->id_player]);
        foreach ($list3 as &$one){
            $one["task"] = "study";
            $TASKS[] = $one;
        }
        
        $list4 = selectFromTable("*", "build_army", "id_player = :idp", ["idp" => $this->id_player]);
        foreach ($list4 as &$one){
            $one["task"] = "army_build";
            $TASKS[] = $one;
        }
        
        $list5 = selectFromTable("*", "city_jop_hiring", "id_player = :idp", ["idp" => $this->id_player]);
        foreach ($list5 as &$one){
            $one["task"] = "city_jop";
            $TASKS[] = $one;
        }
        
    
        return $TASKS;
    }
    
    
    
    
    public function saveCityState($id_city)
    {
         if(!is_numeric($id_city)){
            return;
        }
        
        $now = time();
        
        return updateTable(
                "coin = GREATEST( LEAST( coin   + (CAST(coin_in   AS SIGNED) - CAST(coin_out   AS SIGNED))*($now - LS)/3600 , GREATEST( coin_cap , coin )  ) , 0)," 
                . " food  = GREATEST( LEAST( food   + (CAST(food_in   AS SIGNED) - CAST(food_out   AS SIGNED))*($now - LS)/3600 , GREATEST( food_cap  , food  )  ) , 0) , "
                . " wood  = GREATEST( LEAST( wood   + (CAST(wood_in   AS SIGNED) - CAST(wood_out   AS SIGNED))*($now - LS)/3600 , GREATEST( wood_cap  , wood  )  ) , 0) , "
                . " stone = GREATEST( LEAST( stone  + (CAST(stone_in  AS SIGNED) - CAST(stone_out  AS SIGNED))*($now - LS)/3600 , GREATEST( stone_cap , stone )  ) , 0) , "
                . " metal = GREATEST( LEAST( metal  + (CAST(metal_in  AS SIGNED) - CAST(metal_out  AS SIGNED))*($now - LS)/3600 , GREATEST( metal_cap , metal )  ) , 0) , " 
                . " LS = $now" , "city", "id_city = :idc", ["idc" => $id_city]);
        
    }
    
   
    
    
   
    
    public function saveCityState_onR($id_city , $res)
    {
         if(!is_numeric($id_city) || !in_array($res, ["food", "wood", "stone", "metal", "coin"])){
            return;
        }
        global $dbh;
        
        $now = time();
        $statment = " UPDATE city SET $res = GREATEST( LEAST( $res   + (CAST(".$res."_in   AS SIGNED) - CAST(".$res."_out   AS SIGNED))*($now - LS)/3600 , ".$res."_cap  ) , 0)"
                . "  WHERE id_city =  $id_city";
        
        $sql = $dbh->prepare($statment);
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    
    
    public function coin_outState($id_city)
    {
         if(!is_numeric($id_city)){
            return;
        }
        $total_lvls = selectFromTable(" SUM(lvl) as count", "hero", "id_city = $id_city")[0];
        $coin_out = 0;
        if(count($total_lvls) > 0){
            $coin_out = $total_lvls["count"]*10;
        }
        return updateTable("coin_out = LEAST(coin_in, $coin_out)", "city", "id_city = $id_city");
       
    
    }
    
    public function coin_inState($id_city)
    {
        if(!is_numeric($id_city)){
            return;
        }
        $matrial_effect = selectFromTable("coin", "player_stat", "id_player = $this->id_player")[0];
        
        $ratio_pro_mat = $matrial_effect["coin"] > time() ? 0.25 : 0 ;
        $statment = " coin_in = ("
                . "(SELECT accounting FROM edu_uni WHERE id_player = $this->id_player)*10/100) * (taxs/100)*pop "
                . " + (taxs/100)*pop + $this->console_effect*(taxs/100)*pop "
                . " + (taxs/100)*pop*$ratio_pro_mat";
        updateTable($statment, "city", "id_city = $id_city ");
    
    }
    
    public function food_OutState($id_city)
    {
         if(!is_numeric($id_city)){
            return;
        }
        $army_food = [
            0,  // خالى
            4,  // مشاة
            18, //  فرسان
            36, // مدرعين
            5,  // رماة 
            20, // مقاليع
            150 // منجنيق
        ];
        
        global $dbh;
        
        $sql_2 = $dbh->prepare("SELECT hero_army.* FROM hero_army JOIN hero ON "
                . " hero.id_hero = hero_army.id_hero AND hero.id_city = $id_city ");
        $sql_2->execute();
        $all_heros = $sql_2->fetchAll(PDO::FETCH_ASSOC);
        
        $hero_food = 0;
        foreach ($all_heros as $one){
            
            $hero_food += $army_food[$one["f_1_type"]]*$one["f_1_num"];
            $hero_food += $army_food[$one["f_2_type"]]*$one["f_2_num"];
            $hero_food += $army_food[$one["f_3_type"]]*$one["f_3_num"];
            $hero_food += $army_food[$one["b_1_type"]]*$one["b_1_num"];
            $hero_food += $army_food[$one["b_2_type"]]*$one["b_2_num"];
            $hero_food += $army_food[$one["b_3_type"]]*$one["b_3_num"];
            
            
        }
        
        $statement = " UPDATE city SET food_out = "
                . "LEAST((  army_a * 4 + army_b * 18 + army_c * 36 +  army_d * 5 + army_e * 20 + army_f * 150 + $hero_food) * ( 1 - (SELECT  supplying FROM  edu_acad WHERE id_player = $this->id_player)*3/100 ), food_in)   WHERE id_city = {$id_city}";
        $sql = $dbh->prepare($statement);
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    public function getConsoleEffect($id_city)
    {
        if(!is_numeric($id_city)):
            $this->console_effect = 0;
            return;
        endif;
        
        $console_effect = selectFromTable("point_a, point_a_plus, medal_ceasro", "hero JOIN city ON city.console = hero.id_hero JOIN hero_medal ON hero_medal.id_hero = city.console", "city.id_city = $id_city");
        if(count($console_effect) > 0){
            if($console_effect[0]["medal_ceasro"] > time()){
                $this->console_effect = ($console_effect[0]["point_a"] + $console_effect[0]["point_a_plus"])*1.25/200 ;
            }else{
                $this->console_effect = ($console_effect[0]["point_a"] + $console_effect[0]["point_a_plus"])/200;
            }

        }  
        
    }

    public function food_inState($id_city)
    {
        if(!is_numeric($id_city) && $id_city > 0){
            return;
        }
        
        $barray_effect = selectFromTable(" SUM(world.l) as sum_bar", " world JOIN city_bar ON world.x = city_bar.x_coord AND world.y = y_coord", "id_city = $id_city AND world.t BETWEEN 1 AND 16 ")[0];
        
        $edu_effect = selectFromTable("farming", "edu_uni", "id_player = $this->id_player")[0];
        
        $jops = selectFromTable("LEAST( pop ,( SELECT food FROM city_jop WHERE id_city = $id_city ) ) AS jops_num", "city", "id_city = $id_city")[0];
        
        $matrial_effect = selectFromTable("wheat", "player_stat", "id_player = $this->id_player")[0];
        
        $ratio_pro_mat = $matrial_effect["wheat"] > time() ? 0.25 : 0 ;
        
        $totat_food_in = ($jops["jops_num"]*10)*(1 + ($edu_effect["farming"]*0.1) + $barray_effect["sum_bar"]*0.03 + $this->console_effect + $ratio_pro_mat) ;
        
        updateTable("food_in = $totat_food_in", "city", "id_city = $id_city");
        
    }
    
    public function res_inState($id_city , $res)
    {
        
        if(!is_numeric($id_city) || !in_array($res, ["food", "wood", "stone", "metal", "coin"])){
            catchHack();
            return;
        }
        $cityJops       = selectFromTable("*", "city_jop", "id_city = $id_city")[0];
        $realJopNum = [];
        
        $takenPop = 0;
        
        $realJopNum["food"]  = $cityJops["food"]*$cityJops["food_rate"]/100;
        $realJopNum["wood"]  = $cityJops["wood"]*$cityJops["wood_rate"]/100;
        $realJopNum["stone"] = $cityJops["stone"]*$cityJops["stone_rate"]/100;
        $realJopNum["metal"] = $cityJops["metal"]*$cityJops["metal_rate"]/100;
        
        
        if($res == "food"){
            
            $res_in = "food_in";
            $res_study = "farming";
            $res_bar = BAR_FOOD_TYPE_START."  AND  ".BAR_FOOD_TYPE_END;
            $player_stat = "wheat";
            $takenPop = 0 ;
            $laborCap = 50;
            
        }elseif( $res == "wood"){
            
            $res_in = "wood_in";
            $res_study = "wooding";
            $res_bar = BAR_WOOD_TYPE_START." AND ".BAR_WOOD_TYPE_END;
            $player_stat = "wood";
            
            $takenPop = $realJopNum["food"] ;
            $laborCap = 10;
            
            
        }else if($res == "stone"){
            
            $res_in = "stone_in";
            $res_study = "stoning";
            $res_bar = BAR_STONE_TYPE_START."  AND  ".BAR_STONE_TYPE_END;
            $player_stat = "stone";
            $takenPop = $realJopNum["food"] + $realJopNum["wood"] ;
            $laborCap = 10;
            
        }else if($res == "metal"){
            
            $res_in = "metal_in";
            $res_study = "mining";
            $res_bar = BAR_METAL_TYPE_START."  AND ".BAR_STONE_TYPE_END;
            $player_stat = "metal";
            
            $takenPop = $realJopNum["food"] + $realJopNum["wood"] + $realJopNum["stone"] ;
            $laborCap = 10;
             
        }
        
        $matrial_effect = selectFromTable("$player_stat", "player_stat", "id_player = $this->id_player")[0];
        
        $ratio_pro_mat = $matrial_effect[$player_stat] > time() ? 0.25 : 0 ;
        $barEffect     = selectFromTable("IFNULL(SUM(world.l),0 ) as lvlsum", "world JOIN city_bar ON world.x = city_bar.x_coord AND  world.y = city_bar.y_coord", "city_bar.id_city = $id_city AND world.t BETWEEN $res_bar ")[0]["lvlsum"]*0.03;
        $studyEffect   = selectFromTable($res_study, "edu_uni", " id_player = $this->id_player")[0][$res_study]*0.1;
        
        
        $quary = "$res_in = (LEAST( GREATEST(pop - $takenPop , 0) , {$realJopNum[$res]} ) + 15)"
        . "  *$laborCap*"
                . "( 1 + $this->console_effect + $ratio_pro_mat + $barEffect + $studyEffect ) ";
        
        
    
        return updateTable( $quary, "city", "id_city = '$id_city'");
    }
    
    
    
    public static function storeRatio($id_city){
         if(!is_numeric($id_city)){
            return;
        }
        $storage = selectFromTable("*", "city_storage", "id_city = $id_city");
         
        $food_cap  = $storage[0]["total_cap"]*$storage[0]["food_storage_ratio"]/100;
        $wood_cap  = $storage[0]["total_cap"]*$storage[0]["wood_storage_ratio"]/100;
        $stone_cap = $storage[0]["total_cap"]*$storage[0]["stone_storage_ratio"]/100;
        $metal_cap = $storage[0]["total_cap"]*$storage[0]["metal_storage_ratio"]/100;
        
        $quary = "food_cap = {$food_cap} , wood_cap = $wood_cap , metal_cap = $metal_cap ,"
                . " stone_cap = $stone_cap";
        
        updateTable($quary, "city", "id_city = $id_city");
        
    }
    
    
}


/*$start = microtime( TRUE);
$state = new SaveState(1);
print_r($state->food_inState(1));
$end = microtime( TRUE);

$difference = $end - $start;
 
//Format the time so that it only shows 10 decimal places.
$queryTime = number_format($difference, 10);
echo '<br>';
echo $queryTime;
*//*

require_once '../config.php';



$sql_2 = $dbh->prepare("SELECT hero_army.* FROM hero_army JOIN hero ON "
                . " hero.id_hero = hero_army.id_hero AND hero.id_city = 1 ");
        $sql_2->execute();
        $all_heros = $sql_2->fetchAll(PDO::FETCH_ASSOC);
        print_r($all_heros);*/

