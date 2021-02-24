<?php

class Battel
{
    private $x_from ;
    private $y_from;
    private $x_to;
    private $y_to;
    private $id_attacker;
    private $hero_lead;
    private $task;
    public $world_unit;
    public static $army_types = [
        "army_a"=>1,
        "army_b"=>2,
        "army_c"=>3,
        "army_d"=>4,
        "army_e"=>5,
        "army_f"=>6
    ];
    
    public static $speeds = array(
            100, //البطل  فاضى
            300, //مشاة
            900, //فرسان
            600, //مدرعين
            250, //رماة
            150, //مقاليع
            100 //منجنيق
        );
    
    public function __construct($coords , $id_attacker ,$hero_lead , $task) 
    {
        $this->x_from      = $coords["x_from"];
        $this->y_from      = $coords["y_from"];
        $this->x_to        = $coords["x_to"];
        $this->y_to        = $coords["y_to"];
        $this->id_attacker = $id_attacker;
        $this->hero_lead   = $hero_lead;
        $this->task        = $task;
        $this->world_unit  = Battel::getUnit($this->x_to, $this->y_to);
    }
    
    public static function calcDistance($x_from , $x_to , $y_from , $y_to)
    {
        return floor(sqrt( pow(($x_from - $x_to), 2)+ pow(($y_from - $y_to), 2))*6000);
    }

    public function CreateBattel($time_start , $time_end)
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT IGNORE INTO battel SET id_hero = :hl , "
                . "time_start = :ts , time_end = :te  , "
                . "x_coord = :xt , y_coord = :yt , id_player = :idp , "
                . "x_city = :xf , y_city = :yf , task = :tk");
        
        $sql->execute([
            "hl" => $this->hero_lead,
            "ts" => $time_start,
            "te" => $time_end,
            "xt" => $this->x_to,
            "yt" => $this->y_to,
            "idp"=> $this->id_attacker,
            "xf" => $this->x_from,
            "yf" => $this->y_from,
            "tk" => $this->task
            
        ]);
        
        $id_battel = $dbh->lastInsertId();
        if($id_battel > -1){
            Battel::joinBattel($id_battel, $this->hero_lead, $this->id_attacker, SIDE_ATTACK); 
        }
       
        return $id_battel;
    }
    
    private function getNeedList(){
        
        $unit_type = $this->world_unit["t"];
        if(WorldUnit::isAsianSquads($unit_type)){
            $matrial = "truce_pack";
            $table  = "matrial_flags";
        }else if(WorldUnit::isGangStar($unit_type)){
            $matrial = "t_map";
            $table  = "matrial_box_plus";
        }else if(WorldUnit::isCamp($unit_type) || WorldUnit::isMonawrat($unit_type)){
            $matrial = "necklace_4";
            $table  = "matrial_box";
        }else if(WorldUnit::isCarthasianGang($unit_type) || WorldUnit::isCarthageTeams($unit_type)){
            $matrial = "repel_trumpet_1";
            $table  = "matrial_main";
        }else if(WorldUnit::isCarthageForces($unit_type) || WorldUnit::isCarthageRebals($unit_type)){
            $matrial = "repel_trumpet_2";
            $table  = "matrial_main";
        }else if(WorldUnit::isCarthageCapital($unit_type)){
            $matrial = "repel_medal";
            $table  = "matrial_main";
        }else if(WorldUnit::isArmyCapital($unit_type)){
            $matrial = "warrior_medal";
            $table   = "matrial_main";
        }else if(WorldUnit::isQueenCityS($unit_type)){
            $matrial = "bronze_horn";
            $table   = "matrial_main";
        }else if(WorldUnit::isQueenCityM($unit_type)){
            $matrial = "silver_horn";
            $table   = "matrial_main";
        }else if(WorldUnit::isQueenCityH($unit_type)){
            $matrial = "gold_horn";
            $table   = "matrial_main";
        }else if(WorldUnit::isRepelCastleS($unit_type)){
            $matrial = "bronze_order";
            $table   = "matrial_main";
        }else if(WorldUnit::isRepelCastleM($unit_type)){
            $matrial = "silver_order";
            $table   = "matrial_main";
        }else if(WorldUnit::isRepelCastleH($unit_type)){
            $matrial = "gold_order";
            $table   = "matrial_main";
        }else if(WorldUnit::isStatueWar($unit_type)){
            $matrial = "evil_army_pass";
            $table   = "matrial_main";
        }else if(WorldUnit::isStatueWalf($unit_type)){
            $matrial = "evil_pass";
            $table   = "matrial_main";
        }else{
            return ["type"=>NULL,"table"=>NULL , "amount"=>"1"];
        }
        return ["type"=>$matrial,"table"=>$table , "amount"=>"1"]; 
    }
    
    public function checkNeed(){
        $need = $this->getNeedList();
        return Matrial::getAmount($need["table"], $need["type"], $this->id_attacker) >= 1;
    }

    public function takeNeedsFromAttaker(){
        
        $need = $this->getNeedList();
        $table = $need["table"];
        $matrial = $need["type"];
        if(!$table){ return true; }
        
        $row_count = Matrial::useMatrial($table, $matrial, 1, $this->id_attacker);
        
        return ($row_count > 0 ?  ["type"=>$matrial,"table"=>$table, "amount"=>"1"] : FALSE);
    }
    
    public static function takeNeedsFromJoiner($type, $id_player){
       
        
        if(WorldUnit::isCarthasianGang($type) || WorldUnit::isCarthageTeams($type)){
            $matrial = "repel_trumpet_1";
            $table  = "matrial_main";
        }else if(WorldUnit::isCarthageForces($type) || WorldUnit::isCarthageRebals($type)){
            $matrial = "repel_trumpet_2";
            $table  = "matrial_main";
        }else if(WorldUnit::isCarthageCapital($type)){
            $matrial = "repel_medal";
            $table  = "matrial_main";
        }else{
            return ["type"=>NULL,"table"=>NULL , "amount"=>"1"];
        }
        
        $row_count = Matrial::useMatrial($table, $matrial, 1, $id_player);
        
        return ($row_count > 0 ?  ["type"=>$matrial,"table"=>$table, "amount"=>"1"] : FALSE);
    }
    
    public function calAttackTime()
    {
        
        $type_unit = $this->world_unit["t"];
        
        
        if(
                WorldUnit::isAsianSquads($type_unit) 
                || WorldUnit::isGangStar($type_unit) 
                || WorldUnit::isCarthagianArmies($type_unit)
                || WorldUnit::isArenaChallange($type_unit)
                || WorldUnit::isArenaDeath($type_unit)
                || WorldUnit::isArmyCapital($type_unit)
                || WorldUnit::isMonawrat($type_unit)
                || WorldUnit::isStatueWar($type_unit)
                || WorldUnit::isStatueWalf($type_unit)
                ){
            return 120;
            
        }else if(WorldUnit::isArenaGuild($type_unit)){
            
            return 5*60;
            
        }
        
        
        $distance    =  Battel::calcDistance($this->x_from, $this->x_to, $this->y_from, $this->y_to);
        $hero        =  Hero::getHeroCellArmy($this->hero_lead);
        $slowestType =  Battel::getSlowestType($hero);
    
        
        if(WorldUnit::isCity($type_unit)){
            
       
            return max( ceil($distance/ Battel::$speeds[$slowestType]) , 15*60);
            
        }else  if(WorldUnit::isCamp($type_unit)){
            
            return max( ceil($distance/ Battel::$speeds[$slowestType]) , 120);
            
        }
        
        return ceil($distance/ Battel::$speeds[$slowestType]) ;
    }

    public function battelStartInfluenced(){
        
        if(WorldUnit::isArmyCapital($this->world_unit["t"])){
            
            $attacker = selectFromTable("name , guild", "player", "id_player = :ida", ["ida" => $this->id_attacker])[0];
            
            $con = "x = :xc AND y = :yc ORDER BY id_round DESC LIMIT 1";
            $dominant = selectFromTable("id_dominant", "world_unit_rank", $con, ["xc" => $this->x_to, "yc" => $this->y_to]);
            return [
                "attacker"=>$attacker,
                "players"=> array_column($dominant, "id_dominant")
            ];
        }
        
        return [
                "attacker"=>NULL,
                "players"=> NULL
            ];
        
    }
    
    
    public function getMinSpeed()
    {
        
        $hero = Hero::getHeroCellArmy($this->hero_lead);
        
        if($hero == FALSE){
            return FALSE;
        }else{
            
            $unite = Battel::getUnit($this->x_to, $this->y_to);
            
            return $this->getBattelTime(Battel::calcDistance($this->x_from, $this->x_to, $this->y_from, $this->y_to), 
                    Battel::getSlowestType($hero)  , $unite["t"]);
        }
        
        
    }
    
    public static  function getSlowestType($hero)
    {
        
        $slowest = 2;
        $get_in = FALSE;
        
        foreach ($hero as $one){
            
            if(Battel::$speeds[$one]  <= Battel::$speeds[$slowest] && $one != 0){
                
                $slowest = $one;
                $get_in = TRUE;
                
            }
            
        }
        
        
        if($get_in){
            
            return $slowest; /// hero have no army;
            
        }else{
            
            return 0;
            
        }
        
    }
    
    
    public function getBattelTime($dist , $type , $type_unit)
    {
        
        if($type_unit == 30 ){
            return 120 ;
        }else if($type_unit > 31 && $type_unit <= 48){
            return 120;
        }
            
        //echo $speeds[$type]."-----\n";    
        return ceil($dist/ Battel::$speeds[$type]);
    }
    
    public static function getBattelBackTime($id_battel , $id_hero, $id_city )
    {
        $battel_coord = Battel::getBattelCoordTo($id_battel);
        $city_coord   = City::getCityCoords($id_city);
        $type_unit    = WorldMap::getUnitData( $battel_coord["x_coord"],  $battel_coord["y_coord"]);
        
        if($battel_coord != FALSE){
            
            $dist = Battel::calcDistance($city_coord["x"], $battel_coord["x_coord"], $city_coord["y"], $battel_coord["y_coord"]);
            
        }
        
        $slowset = Battel::getSlowestType(Hero::getHeroCellArmy($id_hero));
        
        if($type_unit["t"] == 30 ){
            return  $battel_coord["time_end"] + 60*15 ;
        }
            
            
        return $battel_coord["time_end"] +  (int)($dist/Battel::$speeds[$slowset]);
    }
    
    public static function checkBattel($time)
    {
        
        $battels = selectFromTable("*", "battel", "time_end <= :ti AND done = 0", ["ti" => $time]);
        $last = end($battels);
        if(isset($last["id_battel"])){
            updateTable("done = 1", "battel", "time_end <= :id" ,  ["id" => $time]);
        }
        
        return $battels;
    }
    
   
    
    
    public static function getAllHeros($id_battel , $x_coord , $y_coord)
    {
        $heros = NULL;
        // get the army will defiend first   ىدى هنا  انا بجيب الجيش بتاع المكان دة
        $first_heros = Battel::getFirstHeros($x_coord, $y_coord);

        // loop on these heros
        $id_fake = count($first_heros)*-1;
        if(is_array($first_heros) && count($first_heros) > 0){
            foreach ($first_heros as $hero){
                
                $heros[] = array(
                            "id_hero"=>++$id_fake,
                            "id_player"=>0,
                            "side" => 0,
                            "ord"=>$hero["ord"],
                            "type"=>$hero["type"],
                            "post"=>array(
                                "f_1_post" => 50,
                                "f_2_post" => 50,
                                "f_3_post" => 50,
                                "b_1_post" => 50,
                                "b_2_post" => 50,
                                "b_3_post" => 50
                            ),
                            "pre"=>$hero["pre"]
                        );
            }
        }
        
        $tempHero = selectFromTable("id_hero , id_player ,ord , side", "battel_member", "id_battel = :idb ORDER BY ord ASC", ["idb" => $id_battel]);
        foreach ($tempHero as $key => $oneHero){
            
            $hero_army = Battel::getPreTypeArmy($tempHero[$key]["id_hero"]);
            $heros[] = array(
                "id_hero"=>$tempHero[$key]["id_hero"],
                "id_player"=>$tempHero[$key]["id_player"],
                "side" => $tempHero[$key]["side"],
                "ord"=>$tempHero[$key]["ord"],
                "type"=>$hero_army["type"],
                "post"=>array(
                    "f_1_post" => 50,
                    "f_2_post" => 50,
                    "f_3_post" => 50,
                    "b_1_post" => 50,
                    "b_2_post" => 50,
                    "b_3_post" => 50
                ),
                "pre"=>$hero_army["pre"]
            );
            
        }
       
        
        return $heros;
    }

    public static function joinBattel($id_battel , $id_hero , $id_player , $side )
    {
        $ord = time();
        return insertIntoTable("id_battel = :idb , id_player = :idp ,id_hero = :idh ,  side = :si , ord = :od", "battel_member", 
                ["idb" => $id_battel, "idp" => $id_player, "idh" => $id_hero, "si" => $side,  "od" => $ord]);
    }
    
    public static function takeJoinReq($type , $id_player)
    {
        
        
        if(WorldUnit::isCarthagianArmies($type)){
            $joinMarial = [
                52=>"repel_trumpet_1",
                53=>"repel_trumpet_1",
                54=>"repel_trumpet_2",
                55=>"repel_trumpet_2",
                56=>"repel_medal"
            ];
            return Matrial::useMatrial("matrial_main",$joinMarial[$type], 1, $id_player);
            
        }
    }
    
    public static function MaxJoinNum($type){
        
        if(WorldUnit::isCarthasianGang($type) 
                || WorldUnit::isCarthageTeams($type)
                || WorldUnit::isCarthageRebals($type)
                || WorldUnit::isArmyCapital($type)){
            return 3;

        }else if(WorldUnit::isCarthageForces($type) || WorldUnit::isCarthageCapital($type)){
            return 5;
        }else if(WorldUnit::isCity($type)){
            return 20;
        }
        
        return 750;
        
    }

    public static function canJoin($battel , $id_player, $side = SIDE_ATTACK)
    {
        
        
        if(WorldUnit::isCarthagianArmies($battel["t"])){
            
            $playerGuild   = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $id_player])[0];
            $attackerGuild = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $battel["id_player"]])[0];
            
            if($playerGuild["id_guild"] != $attackerGuild["id_guild"]):
                return FALSE;
            endif;
        }elseif (
                WorldUnit::isArmyCapital($battel["t"])
                || WorldUnit::isArenaDeath($battel["t"])
                || WorldUnit::isArenaChallange($battel["t"])
                ) {
            
            if($side == SIDE_ATTACK ){
                
                return ($id_player == $battel["id_player"]);
                
            }elseif ($side == SIDE_DEFANCE) {
                
                $lastPlayer = selectFromTable("id_dominant", "world_unit_rank", "x = :xc AND y = :yc ORDER BY id_round DESC LIMIT 1", ["xc" => $battel["x_coord"], "yc" => $battel["y_coord"]]);
                if(count($lastPlayer) == 0 ){
                    return TRUE;
                }else{
                    return ($id_player == $lastPlayer[0]["id_dominant"]);
                    
                }
            }
            
        }else if(WorldUnit::isArenaGuild($battel["t"])){
            
            if($side == SIDE_ATTACK ){
                
                $playerGuild   = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $id_player])[0];
                $attackerGuild = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $battel["id_player"]])[0];
                
                return ($playerGuild["id_guild"] == $attackerGuild["id_guild"]);
                
            }elseif ($side == SIDE_DEFANCE) {
                
                $playerGuild = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $id_player])[0];
                $lastGuild   = selectFromTable("id_dominant", "world_unit_rank", "x = :xc AND y = :yc ORDER BY id_round DESC LIMIT 1", ["xc" =>$battel["x_coord"], "yc" => $battel["y_coord"]]);
                if(count($lastGuild) == 0 ){
                    return TRUE;
                }else{
                    return ($playerGuild["id_guild"] == $lastGuild[0]["id_dominant"]);
                }
            }
            
        }
        
        return  TRUE;
    }
    
    public static function deleteBattel($id_battel)
    {
        deleteTable("battel_member", "id_battel = :idp", ["idp" =>$id_battel]);
        deleteTable("battel", "id_battel = :idp", ["idp" =>$id_battel]);
        
    }
    public static function getPreTypeArmy($id_hero)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero_army WHERE id_hero = '$id_hero'");
        $sql->execute();
        $army = $sql->fetch(PDO::FETCH_ASSOC); 
        if($army != FALSE){
            return [
                "pre"=>[
                    "f_1_pre" => $army["f_1_num"],
                    "f_2_pre" => $army["f_2_num"],
                    "f_3_pre" => $army["f_3_num"],
                    "b_1_pre" => $army["b_1_num"],
                    "b_2_pre" => $army["b_2_num"],
                    "b_3_pre" => $army["b_3_num"]
                ],
                "type"=>[
                    "f_1_type" => $army["f_1_type"],
                    "f_2_type" => $army["f_2_type"],
                    "f_3_type" => $army["f_3_type"],
                    "b_1_type" => $army["b_1_type"],
                    "b_2_type" => $army["b_2_type"],
                    "b_3_type" => $army["b_3_type"]
                ]
            ];
        }else{
            return FALSE;
        }
    }
    
    
   /*
    * $army_array
    */
    

   public static function fillHero($army_arr , $bar_lvl)
    {
        $heros = array();
        if($bar_lvl  < 4  ){
          $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_a"]/3),
                    "f_2_pre" => (int)($army_arr["army_a"]/3),
                    "f_3_pre" => (int)($army_arr["army_a"]/3),
                    "b_1_pre" => (int)($army_arr["army_d"]/3),
                    "b_2_pre" => (int)($army_arr["army_d"]/3),
                    "b_3_pre" => (int)($army_arr["army_d"]/3)
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4
                ],
                "ord"=>-1
            ];  
        }elseif($bar_lvl < 6){
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_a"]/6),
                    "f_2_pre" => (int)($army_arr["army_a"]/6),
                    "f_3_pre" => (int)($army_arr["army_a"]/6),
                    "b_1_pre" => (int)($army_arr["army_d"]/4),
                    "b_2_pre" => (int)($army_arr["army_e"]/2),
                    "b_3_pre" => (int)($army_arr["army_d"]/4)
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 5,
                    "b_3_type" => 4
                ],
              "ord"=>-2
            ]; 
            $heros[]= $heros[0];
            $heros[1]["ord"] = -1;
        }elseif($bar_lvl <8){   // brary lvl 6 7 8
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_a"]/6),
                    "f_2_pre" => (int)($army_arr["army_a"]/6),
                    "f_3_pre" => (int)($army_arr["army_a"]/6),
                    "b_1_pre" => (int)($army_arr["army_d"]/6),
                    "b_2_pre" => (int)($army_arr["army_d"]/6),
                    "b_3_pre" => (int)($army_arr["army_d"]/6)
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4
                ],
              "ord"=>-3
            ]; 
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_f"]/3),
                    "f_2_pre" => (int)($army_arr["army_f"]/3),
                    "f_3_pre" => (int)($army_arr["army_f"]/3),
                    "b_1_pre" => (int)(0),
                    "b_2_pre" => (int)(0),
                    "b_3_pre" => (int)(0)
                ],
                "type"=>[
                    "f_1_type" => 6,
                    "f_2_type" => 6,
                    "f_3_type" => 6,
                    "b_1_type" => 0,
                    "b_2_type" => 0,
                    "b_3_type" => 0
                ],
              "ord"=>-2
            ]; 
            $heros[]=$heros[0];
            $heros[2]["ord"]=-1;
        }elseif($bar_lvl  == 8){   // brary lvl 6 7 8
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_a"]/6),
                    "f_2_pre" => (int)($army_arr["army_a"]/6),
                    "f_3_pre" => (int)($army_arr["army_a"]/6),
                    "b_1_pre" => (int)($army_arr["army_d"]/6),
                    "b_2_pre" => (int)($army_arr["army_d"]/6),
                    "b_3_pre" => (int)($army_arr["army_d"]/6)
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4
                ],
              "ord"=>-5
            ]; 
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_f"]/3),
                    "f_2_pre" => (int)($army_arr["army_f"]/3),
                    "f_3_pre" => (int)($army_arr["army_f"]/3),
                    "b_1_pre" => (int)(0),
                    "b_2_pre" => (int)(0),
                    "b_3_pre" => (int)(0)
                ],
                "type"=>[
                    "f_1_type" => 6,
                    "f_2_type" => 6,
                    "f_3_type" => 6,
                    "b_1_type" => 0,
                    "b_2_type" => 0,
                    "b_3_type" => 0
                ],
              "ord"=>-4
            ]; 
            $heros[]=$heros[0];
            $heros[2]["ord"]=-3;
            $heros[]=$heros[1];
            $heros[3]["ord"]=-2;
            $heros[]=$heros[0];
            $heros[3]["ord"]=-1;
            
        }elseif($bar_lvl == 9 || $bar_lvl == 10){   // brary lvl 9  10
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_a"]/6),
                    "f_2_pre" => (int)($army_arr["army_a"]/6),
                    "f_3_pre" => (int)($army_arr["army_a"]/6),
                    "b_1_pre" => (int)($army_arr["army_d"]/6),
                    "b_2_pre" => (int)($army_arr["army_d"]/6),
                    "b_3_pre" => (int)($army_arr["army_d"]/6)
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4
                ],
              "ord"=>-4
            ]; 
            $heros[]= [
                "pre"=>[
                    "f_1_pre" => (int)($army_arr["army_b"]/6),
                    "f_2_pre" => (int)($army_arr["army_c"]/2),
                    "f_3_pre" => (int)($army_arr["army_b"]/6),
                    "b_1_pre" => 0,
                    "b_2_pre" => 0,
                    "b_3_pre" => 0
                ],
                "type"=>[
                    "f_1_type" => 2,
                    "f_2_type" => 3,
                    "f_3_type" => 2,
                    "b_1_type" => 0,
                    "b_2_type" => 0,
                    "b_3_type" => 0
                ],
              "ord"=>-3
            ]; 
            $heros[]=$heros[0];
            $heros[2]["ord"]=-2;
            $heros[]=$heros[1];
            $heros[3]["ord"] = -1;
        }
        return $heros;
    }

    public static function getBarryArmy($x , $y )
    {
        return selectFromTable("*", "army_bar", " x = :xc AND y = :yc", ["xc" => $x, "yc" => $y])[0]; 
    }

    public static function getUnit($x_coord , $y_coord)
    {
        return selectFromTable("t , l, lo", "world", "x = :xc AND y = :yc", ["xc" => $x_coord, "yc" => $y_coord])[0] ; 
    }
    public static function getFirstHeros($x_coord ,$y_coord , $unit)
    {
        
        /*
         * if the unit was brary
         */
        $heros = [];
        if(WorldUnit::isBarrary($unit["t"])){  // لأو كانت برارى
            
            $army_arr = Battel::getBarryArmy($x_coord ,$y_coord);
            $heros    = Battel::fillHero($army_arr, $unit["l"]);
            
        }elseif($unit["t"] == 30 || $unit["t"] == 31){ // لو كانت مناورات
            
            $heros = Battel::fillHeroForM_M($unit["t"], $unit["l"]);
            
        }elseif(WorldUnit::isAsianSquads($unit["t"])){
            
            $heros = Battel::fillHeroForAsianSqads($unit["t"]);
            
            
        }elseif(WorldUnit::isGangStar($unit["t"])){
            
            $heros = Battel::fillHeroForGangStar($unit["t"] , $unit["l"]);
            
        }elseif(WorldUnit::isCarthasianGang($unit["t"])){
            
            $heros = Battel::fillHeroForCartagianGang($unit["t"] , $unit["l"]);
            
        }elseif(WorldUnit::isCarthageTeams ($unit["t"])){
            
            $heros = Battel::fillHeroForCartagianTeams($unit["t"] , $unit["l"]);
            
        }elseif(WorldUnit::isCarthageRebals ($unit["t"])){
            
            $heros = Battel::fillHeroForCarthageRebals($unit["t"] , $unit["l"]);
            
        }elseif(WorldUnit::isCarthageForces($unit["t"]) || WorldUnit::isCarthageCapital($unit["t"])){
            
            $heros = Battel::fillHeroForCarthageForces($unit["t"] , $unit["l"]);
            
        }else if(WorldUnit::isArmyCapital($unit["t"])){
            $heros = Battel::fillHeroForCapitalArmy($x_coord, $y_coord, $unit["l"]);
        }else{
            $heros = WorldUnit::unitHeros($x_coord, $y_coord, $unit["l"]);
        }
        
        return $heros;
    }
    
    public static function returnBattelSideCount($id_battel , $side)
    {
        return selectFromTable("COUNT(*) as r_c", "battel_member", "id_battel = :idb AND side = :s", ["idb" => $id_battel, "s" => $side])[0]["r_c"];
    }
    
    
    public static function returnDefenceSideData($id_battel )
    {
        return selectFromTable("world.t , world.l", "world JOIN battel ON world.x = x_coord AND world.y = y_coord", "id_battel = :idb", ["idb" => $id_battel])[0];
    }
    
     

    public static function fillHeroForM_M ($type , $lvl)
    {
        $army_factor = 1;
        if($type == 30){
            
            $army_factor = 3;
            
        }
        
        $army_all = Battel::GetArmyFROMJSON($lvl);
        
        $hero_sample = [
                "pre"=>[
                    "f_1_pre" => (int)($army_all->amount_1*15*$army_factor/100) ,
                    "f_2_pre" => (int)($army_all->amount_1*70*$army_factor/100) ,
                    "f_3_pre" => (int)($army_all->amount_1*15*$army_factor/100) ,
                    "b_1_pre" => (int)($army_all->amount_2*15*$army_factor/100) ,
                    "b_2_pre" => (int)($army_all->amount_2*70*$army_factor/100) ,
                    "b_3_pre" => (int)($army_all->amount_2*15*$army_factor/100)
                ],
                "type"=>[
                    "f_1_type" => static::$army_types[$army_all->type_1],
                    "f_2_type" => static::$army_types[$army_all->type_1],
                    "f_3_type" => static::$army_types[$army_all->type_1],
                    "b_1_type" => static::$army_types[$army_all->type_2],
                    "b_2_type" => static::$army_types[$army_all->type_2],
                    "b_3_type" => static::$army_types[$army_all->type_2]
                ],
            ]; 
        
        if($lvl %10 == 0){  // دى كدة المستويات الى هيبقى فيها 3 ابطال
            
            $heros[0] = $hero_sample;
            $heros[0]["ord"]=-2;
            $heros[1] = $hero_sample;
            $heros[1]["ord"]=-1;
            $heros[2] = $hero_sample;
            $heros[2]["ord"]=0;
        }else {
            $heros[0] = $hero_sample;
            $heros[0]["ord"]=0;
        }
        
        return $heros;
    }
    
    public static function fillHeroForAsianSqads($type)
    {
        
        
        $army_all = Battel::GetAssianSqadsArmyFROMJSON($type);
        
        $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($army_all->amount_1*8/100) ,
                    "f_2_pre" => (int)($army_all->amount_1*20/100) ,
                    "f_3_pre" => (int)($army_all->amount_1*8/100) ,
                    "b_1_pre" => (int)($army_all->amount_2*8/100) ,
                    "b_2_pre" => (int)($army_all->amount_2*20/100) ,
                    "b_3_pre" => (int)($army_all->amount_2*8/100)
                ],
                "type"=>[
                    "f_1_type" => static::$army_types[$army_all->type_1],
                    "f_2_type" => static::$army_types[$army_all->type_1],
                    "f_3_type" => static::$army_types[$army_all->type_1],
                    "b_1_type" => static::$army_types[$army_all->type_2],
                    "b_2_type" => static::$army_types[$army_all->type_2],
                    "b_3_type" => static::$army_types[$army_all->type_2]
                ],
            ]; 
            $heros[0]["ord"]=-2;
            
            $heros[1] = [
                "pre"=>[
                    "f_1_pre" => (int)($army_all->amount_1*6/100) ,
                    "f_2_pre" => (int)($army_all->amount_1*20/100) ,
                    "f_3_pre" => (int)($army_all->amount_1*6/100) ,
                    "b_1_pre" => (int)($army_all->amount_2*6/100) ,
                    "b_2_pre" => (int)($army_all->amount_2*20/100) ,
                    "b_3_pre" => (int)($army_all->amount_2*6/100)
                ],
                "type"=>[
                    "f_1_type" => static::$army_types[$army_all->type_1],
                    "f_2_type" => static::$army_types[$army_all->type_1],
                    "f_3_type" => static::$army_types[$army_all->type_1],
                    "b_1_type" => static::$army_types[$army_all->type_2],
                    "b_2_type" => static::$army_types[$army_all->type_2],
                    "b_3_type" => static::$army_types[$army_all->type_2]
                ],
            ]; 
            $heros[1]["ord"]=-1;
            
            $heros[2] =  [
                "pre"=>[
                    "f_1_pre" => (int)($army_all->amount_1*6/100) ,
                    "f_2_pre" => (int)($army_all->amount_1*20/100) ,
                    "f_3_pre" => (int)($army_all->amount_1*6/100) ,
                    "b_1_pre" => (int)($army_all->amount_2*6/100) ,
                    "b_2_pre" => (int)($army_all->amount_2*20/100) ,
                    "b_3_pre" => (int)($army_all->amount_2*6/100)
                ],
                "type"=>[
                    "f_1_type" => static::$army_types[$army_all->type_1],
                    "f_2_type" => static::$army_types[$army_all->type_1],
                    "f_3_type" => static::$army_types[$army_all->type_1],
                    "b_1_type" => static::$army_types[$army_all->type_2],
                    "b_2_type" => static::$army_types[$army_all->type_2],
                    "b_3_type" => static::$army_types[$army_all->type_2]
                ],
            ]; 
            $heros[2]["ord"]=0;
       
        
        return $heros;
    }
    
    public static function fillHeroForGangStar($type , $lvl)
    {
        
        if(WorldUnit::isGang($type)){
            $amount=[100,286,100,100,192,100];
        }else if(WorldUnit::isMugger($type)){
            $amount=[84,154,84,54,98,54];
        }else if(WorldUnit::isThiefs($type)){
            $amount=[68,107,68,42,69,42];
        }
        
        $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($amount[0])*$lvl ,
                    "f_2_pre" => (int)($amount[1])*$lvl ,
                    "f_3_pre" => (int)($amount[2])*$lvl ,
                    "b_1_pre" => (int)($amount[3])*$lvl ,
                    "b_2_pre" => (int)($amount[4])*$lvl ,
                    "b_3_pre" => (int)($amount[5])*$lvl
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4 
                ],
            ]; 
            $heros[0]["ord"]=-2;
         
            
       
       
        
        return $heros;
    }
    
    public static function fillHeroForCartagianGang($type , $lvl)
    {
        
        $army = selectFromTable("*", "world_unit_army", "type = :t AND lvl = :l", ["t" => $type, "l" => $lvl])[0];
        
       $heros = [];
        if($lvl != 5 && $lvl != 10){
            $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($army["army_a"])*25/100 ,
                    "f_2_pre" => (int)($army["army_a"])*50/100 ,
                    "f_3_pre" => (int)($army["army_a"])*25/100 ,
                    "b_1_pre" => (int)($army["army_d"])*25/100 ,
                    "b_2_pre" => (int)($army["army_d"])*50/100 ,
                    "b_3_pre" => (int)($army["army_d"])*25/100
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4 
                ],
            ]; 
            $heros[0]["ord"]=0;
        }else if($lvl == 5){
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_a"])*16/100 ,
                        "f_2_pre" => (int)($army["army_b"])*33/100 ,
                        "f_3_pre" => (int)($army["army_a"])*16/100 ,
                        "b_1_pre" => (int)($army["army_d"])*6/100 ,
                        "b_2_pre" => (int)($army["army_d"])*20/100 ,
                        "b_3_pre" => (int)($army["army_d"])*6/100
                    ],
                    "type"=>[
                        "f_1_type" => 1,
                        "f_2_type" => 2,
                        "f_3_type" => 1,
                        "b_1_type" => 4,
                        "b_2_type" => 4,
                        "b_3_type" => 4 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }else{
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_a"])*16/100 ,
                        "f_2_pre" => (int)($army["army_b"])*33/100 ,
                        "f_3_pre" => (int)($army["army_a"])*16/100 ,
                        "b_1_pre" => (int)($army["army_d"])*16/100 ,
                        "b_2_pre" => (int)($army["army_e"])*33/100 ,
                        "b_3_pre" => (int)($army["army_d"])*16/100
                    ],
                    "type"=>[
                        "f_1_type" => 1,
                        "f_2_type" => 2,
                        "f_3_type" => 1,
                        "b_1_type" => 4,
                        "b_2_type" => 5,
                        "b_3_type" => 4 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }
        
        return $heros;
    }
    
    public static function fillHeroForCartagianTeams($type , $lvl)
    {
        
        $army = selectFromTable("*", "world_unit_army", "type = :t AND lvl = :l", ["t" => $type, "l" => $lvl])[0];
        
       $heros = [];
        if($lvl != 5 && $lvl != 10){
            $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($army["army_a"])*50/100 ,
                    "f_2_pre" => (int)($army["army_b"]) ,
                    "f_3_pre" => (int)($army["army_a"])*50/100 ,
                    "b_1_pre" => (int)($army["army_d"])*50/100 ,
                    "b_2_pre" => (int)($army["army_e"]) ,
                    "b_3_pre" => (int)($army["army_d"])*50/100
                ],
                "type"=>[
                    "f_1_type" => 1,
                    "f_2_type" => 1,
                    "f_3_type" => 1,
                    "b_1_type" => 4,
                    "b_2_type" => 4,
                    "b_3_type" => 4 
                ],
            ]; 
            $heros[0]["ord"]=0;
        }else if($lvl == 5){
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_a"])*16.5/100 ,
                        "f_2_pre" => (int)($army["army_b"])*33.3/100 ,
                        "f_3_pre" => (int)($army["army_a"])*16.5/100 ,
                        "b_1_pre" => (int)($army["army_d"])*16.5/100 ,
                        "b_2_pre" => (int)($army["army_e"])*33.3/100 ,
                        "b_3_pre" => (int)($army["army_d"])*16.5/100
                    ],
                    "type"=>[
                        "f_1_type" => 1,
                        "f_2_type" => 2,
                        "f_3_type" => 1,
                        "b_1_type" => 4,
                        "b_2_type" => 5,
                        "b_3_type" => 4 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }else{
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_b"])*16.5/100 ,
                        "f_2_pre" => (int)($army["army_c"])*33.3/100 ,
                        "f_3_pre" => (int)($army["army_b"])*16.5/100 ,
                        "b_1_pre" => (int)($army["army_e"])*16.5/100 ,
                        "b_2_pre" => (int)($army["army_f"])*33.3/100 ,
                        "b_3_pre" => (int)($army["army_e"])*16.5/100
                    ],
                    "type"=>[
                        "f_1_type" => 2,
                        "f_2_type" => 3,
                        "f_3_type" => 2,
                        "b_1_type" => 5,
                        "b_2_type" => 6,
                        "b_3_type" => 5 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }
        
        return $heros;
    }
    
    
    public static function fillHeroForCarthageRebals($type , $lvl)
    {
        
        $army = selectFromTable("*", "world_unit_army", "type = :t AND lvl = :l", ["t" => $type, "l" => $lvl])[0];
        
       $heros = [];
        if($lvl != 5 && $lvl != 10){
            $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($army["army_c"])*50/100 ,
                    "f_2_pre" => (int)($army["army_b"]) ,
                    "f_3_pre" => (int)($army["army_c"])*50/100 ,
                    "b_1_pre" => (int)($army["army_e"])*25/100 ,
                    "b_2_pre" => (int)($army["army_e"])*50/100 ,
                    "b_3_pre" => (int)($army["army_e"])*25/100
                ],
                "type"=>[
                    "f_1_type" => 3,
                    "f_2_type" => 2,
                    "f_3_type" => 3,
                    "b_1_type" => 5,
                    "b_2_type" => 5,
                    "b_3_type" => 5 
                ],
            ]; 
            $heros[0]["ord"]=0;
        }else if($lvl == 5){
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_c"])*16.5/100 ,
                        "f_2_pre" => (int)($army["army_b"])*33.3/100 ,
                        "f_3_pre" => (int)($army["army_c"])*16.5/100 ,
                        "b_1_pre" => (int)($army["army_e"])*6.5/100 ,
                        "b_2_pre" => (int)($army["army_e"])*20/100 ,
                        "b_3_pre" => (int)($army["army_e"])*6.5/100
                    ],
                    "type"=>[
                        "f_1_type" => 3,
                        "f_2_type" => 2,
                        "f_3_type" => 3,
                        "b_1_type" => 5,
                        "b_2_type" => 5,
                        "b_3_type" => 5 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }else{
            
            for($iii =0;$iii < 3 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_c"])*6.5/100 ,
                        "f_2_pre" => (int)($army["army_c"])*20/100 ,
                        "f_3_pre" => (int)($army["army_c"])*6.5/100 ,
                        "b_1_pre" => (int)($army["army_f"])*6.5/100 ,
                        "b_2_pre" => (int)($army["army_f"])*20/100 ,
                        "b_3_pre" => (int)($army["army_f"])*6.5/100
                    ],
                    "type"=>[
                        "f_1_type" => 3,
                        "f_2_type" => 3,
                        "f_3_type" => 3,
                        "b_1_type" => 6,
                        "b_2_type" => 6,
                        "b_3_type" => 6 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }
        
        return $heros;
    }
    
    
    
    public static function fillHeroForCarthageForces($type , $lvl)
    {
        
        $army = selectFromTable("*", "world_unit_army", "type = :t AND lvl = :l", ["t" => $type, "l" => $lvl])[0];
        
       $heros = [];
        if($lvl != 5 && $lvl != 10){
            $heros[0] = [
                "pre"=>[
                    "f_1_pre" => (int)($army["army_c"])*25/100 ,
                    "f_2_pre" => (int)($army["army_c"])*50/100 ,
                    "f_3_pre" => (int)($army["army_c"])*25/100 ,
                    "b_1_pre" => (int)($army["army_f"])*25/100 ,
                    "b_2_pre" => (int)($army["army_f"])*50/100 ,
                    "b_3_pre" => (int)($army["army_f"])*25/100
                ],
                "type"=>[
                    "f_1_type" => 3,
                    "f_2_type" => 3,
                    "f_3_type" => 3,
                    "b_1_type" => 6,
                    "b_2_type" => 6,
                    "b_3_type" => 6 
                ],
            ]; 
            $heros[0]["ord"]=0;
        }else{
            
            for($iii =0;$iii < 4 ; $iii++):
                
                $heros[$iii] = [
                    "pre"=>[
                        "f_1_pre" => (int)($army["army_c"])*3/100 ,
                        "f_2_pre" => (int)($army["army_b"])*19/100 ,
                        "f_3_pre" => (int)($army["army_c"])*3/100 ,
                        "b_1_pre" => (int)($army["army_e"])*3/100 ,
                        "b_2_pre" => (int)($army["army_e"])*19/100 ,
                        "b_3_pre" => (int)($army["army_e"])*3/100
                    ],
                    "type"=>[
                        "f_1_type" => 3,
                        "f_2_type" => 3,
                        "f_3_type" => 3,
                        "b_1_type" => 6,
                        "b_2_type" => 6,
                        "b_3_type" => 6 
                    ],
                ]; 
            
                $heros[$iii]["ord"]=-1*$iii;
                
            endfor;
            
        }
        
        return $heros;
    }
    
    public static function fillHeroForCapitalArmy($x, $y , $lvl)
    {
        return WorldUnit::unitHeros($x, $y, $lvl);
    }
    
    
    
    
    public static function GetArmyFROMJSON($lvl)
    {
        $data_json = file_get_contents(BASE_BATH."js".JS_VERSION."/json/armyForM&M.json");
        return(json_decode($data_json)->$lvl);
    }
    
    public static function GetAssianSqadsArmyFROMJSON($lvl)
    {
        $data_json = file_get_contents(BASE_BATH."js".JS_VERSION."/json/armyForAssianSquads.json");
        return(json_decode($data_json)->$lvl);
    }
    
    public static function GetCartianArmyFROMJSON($lvl)
    {
        $data_json = file_get_contents(BASE_BATH."js".JS_VERSION."/json/armyForAssianSquads.json");
        return(json_decode($data_json)->$lvl);
    }
    
    public static function heroReatret( $id_battel , $id_hero)
    {
        
        global $dbh;
        $sql = $dbh->prepare("DELETE FROM battel_member WHERE id_battel = $id_battel AND id_hero = $id_hero");
        $sql->execute();
    
        return deleteTable("battel_member", "id_battel = :idb AND id_hero = :idh", ["idb" => $id_battel, "idh" => $id_hero]);
        
    }
    
    public static function abortBattel( $hero , $battel)
    {
        $now = time();
        $in_duration = 2* $now - $battel["time_start"];
        
        insertIntoTable("id_hero = :idh, id_player = :idp , x_from = :xc ,  y_from = :yc , time_back = :tb , task = :t", "hero_back", ["idh" => $hero["id_hero"], "idp" => $hero["id_player"], "xc" => $battel["x_coord"], "yc" => $battel["y_coord"], "tb" => $in_duration, "t" => $battel["task"] ]);
        deleteTable("battel_member", "id_hero = :idh ", ["idh" => $hero["id_hero"]]);
       
        
    }
    
    public static function getBattelCoordTo($id_battel)
    {
        return selectFromTable("x_coord , y_coord , time_end", "battel", "id_battel = :idb", ["idb" => $id_battel])[0];
    }
    
    public static function powerNeededForUnit($type){
        
        if($type >= 30 && $type <= 48 ){
            return 40;
        }else if(WorldUnit::isGangStar($type) || WorldUnit::isCarthasianGang($type)){
            return 20;
        }else if( WorldUnit::isCarthageTeams($type)){
            return 30;
        }else if(WorldUnit::isCarthageRebals($type)){
            return 40;
        }else if(WorldUnit::isCarthageForces($type)){
            return 50;
        }else if(WorldUnit::isCarthageCapital($type)){
            return 60;
        }else{
            return 10;
        }
        
    }

    public function getPowerForUnit()
    {
        return static::powerNeededForUnit($this->world_unit["t"] );
    }
    
    public static function getPowerFor_Unit($type)
    {
        if($type >= 30 && $type <= 48 ){
            return 40;
        }else if(WorldUnit::isGangStar($type)){
            return 20;
        }else if(WorldUnit::isArmyCapital($type)){
            return 50;
        }else if(WorldUnit::isArena($type)){
            return 50;
        }else if(WorldUnit::isStatueWar($type)){
            return 100;
        }else if(WorldUnit::isStatueWalf($type)){
            return 100;
        }else{
            return 10;
        }
    }
    
    public static function battelFinish(&$players , &$heros , $x_coord , $y_coord , $side_win , $unit , $pram_arr)
    {
        
        $report = new BattelReport($x_coord, $y_coord, $pram_arr["attacker"] , $side_win , $pram_arr["round_num"], $pram_arr["task"]);
        
        $total_honor = 0;
        $defencePoints= 0;
        $player_ids = [];
        
        foreach ($heros as $hero_for_total){
            
            if($hero_for_total['side'] == SIDE_ATTACK){
                
                $total_honor += $hero_for_total["honor"];
                
            }else{
                
                $defencePoints += $hero_for_total["honor"];
                
            }
        }
        
        $xp_array = [];
        
        
       
        foreach ($heros as $hero){
            
            $xp_gain = 0;
            if($hero["id_hero"] > 0){
                $xp_gain = $total_honor > 0 ? $report->addHeroXp($unit["t"], $unit["l"] , $side_win)*$hero["honor"]/$total_honor : 0;
                
                Hero::increaseHeroXp($hero["id_hero"], $xp_gain);
                Hero::killHeroArmy($hero, $unit["t"]);
                
                $heros["xp_gain"] = $xp_gain;
                $xp_array[$hero["id_player"]] = [
                    "id_hero"=>$hero["id_hero"] ,
                    "xp_gain"=>$xp_gain
                ];
            }
            
            $report->addHero($hero["id_hero"], $hero["type"], $hero["pre"], $hero["post"] , $hero["id_player"] , $hero["side"] , $hero["ord"] , $xp_gain);
            
        }
        
        
        foreach ($players as &$player){
            
            if(in_array($player["id_player"], $player_ids)){
                continue;
            }
            
            $player_ids[] = $player["id_player"];
            $report->addPlayer($player["id_player"], $player["side"], $player["prize"]["honor"]);
            $report->addPrize($player["prize"], $player["id_player"]);
            $player["heros"][] = $xp_array[$player["id_player"]];
        }
        
     
        
        return ["honor"=>$total_honor];
        
    }
}

/*$battel  = new Battel(1, 2, 1, 2, 1, 4);
print_r($battel->getMinSpeed(1));*/
//print_r(Battel::getAllHeros(7, 145 , 163));
