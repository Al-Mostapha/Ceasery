<?php

class AfterFight
{
    
    private $x_coord;
    private $y_coord;
    private $unit_type;
    private $unit_lvl;
    private $id_attacker = -1;
    private $task = -1;
    private $x_city ;
    private $y_city;
    private $MAX_UNIT_LVL=[
        30=>50,31=>50,
        32=>40,33=>40,34=>40,35=>40,
        36=>30,37=>30,38=>30,39=>30,
        40=>20,41=>20,42=>20,43=>20,
        44=>20,45=>20,46=>20,47=>20,
        48=>10,
        49=>2,50=>2,51=>2,
        52=>10,53=>10,54=>10,55=>10,56=>10,
        150=>75, 151=>50, 152=> 25,
        153=>10, 154=>10, 155=> 10
        
    ];

    public function __construct( $x_coord , $y_coord , $unit_type, $unit_lvl) 
    {
        $this->x_coord = $x_coord;
        $this->y_coord = $y_coord;
        $this->unit_lvl = $unit_lvl;
        $this->unit_type = $unit_type;
        
        
    }
    
    public function afterWin($id_attacker , $task , $x_city , $y_city)
    {
        
        $this->id_attacker = $id_attacker;
        $this->task        = $task;
        $this->x_city      = $x_city;
        $this->y_city      = $y_city;
        
        if(WorldUnit::isMonawrat($this->unit_type )
                || WorldUnit::isCamp($this->unit_type )
                || WorldUnit::isAsianSquads($this->unit_type) 
                || WorldUnit::isGangStar($this->unit_type)
                || WorldUnit::isCarthagianArmies($this->unit_type)
                || WorldUnit::isStatueWalf($this->unit_type)
                || WorldUnit::isStatueWar($this->unit_type))
        {
            updateTable("l = l + 1", "world", "x = :xc AND y = :yc AND l <= :lv ",  ["xc" => $this->x_coord, "yc" => $this->y_coord, "lv" => $this->MAX_UNIT_LVL[$this->unit_type]]);
        }
        else if(
                WorldUnit::isArmyCapital($this->unit_type)
                || WorldUnit::isArena($this->unit_type)
                ){
            
            $now = time();
            
            if(WorldUnit::isArenaGuild($this->unit_type)){
                $idGuild = selectFromTable("id_guild", "guild_member", "id_player = :idp", ["idp" => $id_attacker]);
                if(count($idGuild) == 0){
                    return;
                }
                $idDominant = $idGuild[0]["id_guild"];
            }else{
                $idDominant = $id_attacker;
            }
            
            updateTable("duration = :no - time_stamp", "world_unit_rank", "x = :xc AND y = :yc ORDER BY id_round DESC LIMIT 1", ["no" => $now, "xc"=> $this->x_coord, "yc" => $this->y_coord]);
            updateTable("time_end = time_end + 300", "battel", "x_coord = :xc AND y_coord = :yc", ["xc"=> $this->x_coord, "yc" => $this->y_coord]);
            insertIntoTable("x = :xc, y = :yc, id_dominant = :idd, time_stamp = :no", "world_unit_rank", ["xc" => $this->x_coord, "yc" => $this->y_coord, "idd" => $idDominant, "no" => $now]);
            
            
        }
        
        
        if($task == TASK_FIGHT_DOMINATE){
            
            $this->afterDominateWin();
            
        }
    }
    
    
    public function afterDominateWin()
    {
        
        /*
         *   check if the  unite fighted is barrary
         */
        
        if(WorldUnit::isBarrary($this->unit_type)){
            
          
            $id_player = selectFromTable("id_player", "city_bar", "x_coord = :xc AND y_coord = :yc", ["xc" => $this->x_coord, "yc" => $this->y_coord]);
            
            $idCity = selectFromTable("id_city", "city", "x = :xc AND y = :yc", ["xc" => $this->x_city, "yc" => $this->y_city])[0]["id_city"];
            $attackerBarCount = selectFromTable("COUNt(*)as count", "city_bar", "id_city = :idc", ["idc" => $idCity])[0]["count"];
            $palaceLvl = selectFromTable("palace", "city_building_lvl", "id_city = :idc", ["idc" => $idCity])[0]["palace"];
            
            if($palaceLvl <= $attackerBarCount || $attackerBarCount >= 10){
                return ;
            }
            
            if(count($id_player) > 0){
                
                updateTable("id_player = :idp ,id_city = :idc ", "city_bar", "x_coord = :xc AND y_coord = :yc", ["idp" => $this->id_attacker, "idc" => $idCity, "xc" => $this->x_coord, "yc" => $this->y_coord]);
                
            }else{
                
                insertIntoTable("id_player = $this->id_attacker , id_city = $idCity ,  x_coord = $this->x_coord , y_coord = $this->y_coord ", "city_bar");
            }
        
            
        }
        
    }
    
    

    public function getReturnTime($hero , $x_to , $y_to)
    {
       
        if($hero["type"] == FALSE){
            return FALSE;
        }else{
           
            
            
            
            return $this->getMinSpeed(Battel::calcDistance($this->x_coord, $x_to, $this->y_coord, $y_to), 
                Battel::getSlowestType($hero["type"]) );
            
        }
    }
    
    public function getMinSpeed($dist , $slowest)
    {
        $speeds = array(
            100, //البطل  فاضى
            300, //مشاة
            900, //فرسان
            600, //مدرعين
            250, //رماة
            150, //مقاليع
            100 //منجنيق
        );
        
      
        
        return (int) $dist/$speeds[$slowest];
    }

    public  function heroBattelBack($heros , $task  , $unit)
    {
         
        foreach ($heros as $one):
            
            if($one["id_hero"] > 0){
                
                
                $now = time();
                $retun_time = $this->getReturnTime( $one , $one["x_coord"], $one["y_coord"]);
                
                if($one["is_garrsion"]){
                    
                    foreach ($one["pre"] as $key => $val){
                        $key_post = str_replace("pre", "post", $key);
                        
                        if( $val - $one["post"][$key_post] > 0){
                            continue;
                        }
                    }
                    
                }
                
                
                if(WorldUnit::isMonawrat($unit["t"]) 
                        || WorldUnit::isAsianSquads($unit["t"]) 
                        || WorldUnit::isGangStar($unit["t"])
                        || WorldUnit::isCarthagianArmies($unit["t"])
                        || WorldUnit::isCamp($unit["t"])
                        || WorldUnit::isStatueWalf($unit["t"])
                        || WorldUnit::isStatueWar($unit["t"])
                        ){
                    
                    $time_back = $now + min($retun_time , 15*60) ;
                    
                }elseif (
                        WorldUnit::isArena($unit["t"])
                        || WorldUnit::isArmyCapital($unit["t"])
                        ) {
                    $time_back = $now + 60;
                    
                }else{
                    $time_back = $now + min($retun_time , 2*60*60) ;
                }
                
                
                
                
                
                insertIntoTable("id_hero = {$one["id_hero"]},"
                . " x_from  =$this->x_coord  , y_from = $this->y_coord ,"
                . " task = $task , x_to = {$one["x_coord"]} , y_to = {$one["y_coord"]} ,"
                . " time_back = $time_back , id_player = {$one["id_player"]}", "hero_back");
               
       
                
                
            } 
            
        endforeach;
    
        
    }
    
    public  function addToBackTable($id_hero , $time_back)
    {
       
        global $dbh;
        $sql = $dbh->prepare("UPDATE hero SET back_time = $time_back WHERE id_hero = $id_hero");
        
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    
    public  function X_Y_HeroFrom($id_hero)
    {
       
        global $dbh;
        $sql = $dbh->prepare("SELECT x , y FROM city WHERE id_city = "
                . " ( SELECT id_city FROM hero WHERE id_hero = $id_hero)");
        
        $sql->execute();
        
        return $sql->fetch(PDO::FETCH_ASSOC);
    
    }
    
    
    public function isLastLvl()
    {
        
        
        $unite_type = (int) $this->unit_type;
        $unite_lvl  =  (int) $this->unit_lvl;
        
        if(isset($this->MAX_UNIT_LVL[$unite_type])){
            
            return $unite_lvl >= $this->MAX_UNIT_LVL[$this->unit_type];
            
        }
        return FALSE;
        
    }
	public function overLastLvl()
    {
        
        
        $unite_type = (int) $this->unit_type;
        $unite_lvl  =  (int) $this->unit_lvl;
        
        if(isset($this->MAX_UNIT_LVL[$unite_type])){
            
            return $unite_lvl > $this->MAX_UNIT_LVL[$this->unit_type];
            
        }
        return FALSE;
        
    }
    

    public function lastLvlDone()
    {
        $all_battel  = selectFromTable("id_battel , time_start  , task", "battel", "x_coord = $this->x_coord AND y_coord = $this->y_coord");
        $all_player = array();
        
        foreach ($all_battel  as $one){
            
            $players = selectFromTable("id_hero ,  id_player", "battel_member", " id_battel = {$one["id_battel"]}");
            $time_back = 2*time() - $one["time_start"];
            
            foreach ($players  as $player){
                
                if(!array_key_exists($player["id_player"], $all_player)){
                    $all_player[$player['id_player']]["id_player"] = $player['id_player'];
                }
                
                $all_player[$player['id_player']]["heros"][] = $player['id_hero']; 
                
                insertIntoTable("x_from = $this->x_coord , id_hero = {$player["id_hero"]} ,"
                        . " y_from = $this->y_coord , task = {$one["task"]}, "
                        . "time_back = $time_back , id_player = {$player["id_player"]}", "hero_back");
                
            }
            Battel::deleteBattel($one["id_battel"]);
            
        }
        return $all_player;
    }
    
    
    public function afterWinAnnounce()
    {
        
        if(WorldUnit::afterWinAnnounce($this->unit_type) 
                && $this->unit_lvl%10 == 0){
            
        }
        
    }
    
   
    
    
}

