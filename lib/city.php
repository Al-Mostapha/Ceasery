<?php

class City
{
    private $id_city;
    public $army_data = array(
        "army_a"=>[  // مشاه
            "food"=>150,
            "wood"=>500,
            "stone"=>0,
            "metal"=>100,
            "coin"=>18,
            "time"=>50,
            "pop"=>1
        ],"army_b"=>[   // خيول
            "food"=> 1500,
            "wood"=>800,
            "stone"=>0,
            "metal"=>750,
            "coin"=>500,
            "time"=>300,
            "pop"=>3
        ],"army_c"=>[  // مدرعين
            "food"=> 2000,
            "wood"=>500,
            "stone"=>0,
            "metal"=>2500,
            "coin"=>600,
            "time"=>500,
            "pop"=>6
        ],"army_d"=>[  // رماة السهام
            "food"=> 300,
            "wood"=>350,
            "stone"=>0,
            "metal"=>300,
            "coin"=>30,
            "time"=>120,
            "pop"=>1
        ],"army_e"=>[   // مقاليع
            "food"=> 1000,
            "wood"=>1200,
            "stone"=>0,
            "metal"=>800,
            "coin"=>120,
            "time"=>180,
            "pop"=>4
        ],"army_f"=>[  // منجنيق
            "food"=> 3000,
            "wood"=>3000,
            "stone"=>6000,
            "metal"=>1200,
            "coin"=>450,
            "time"=>1000,
            "pop"=>8
        ],"spies"=>[  // منجنيق
            "food"=> 600,
            "wood"=>150,
            "stone"=>0,
            "metal"=>350,
            "coin"=>90,
            "time"=>60,
            "pop"=>1
        ],"wall_a"=>[   //  كمائن
            "food"=> 50,
            "wood"=>500,
            "stone"=>100,
            "metal"=>50,
            "coin"=>0,
            "time"=>60,
            "pop"=>0
        ],"wall_b"=>[    //   ابراج
            "food"=> 200,
            "wood"=>2000,
            "stone"=>1000,
            "metal"=>500,
            "coin"=>0,
            "time"=>180,
            "pop"=>0
        ],"wall_c"=>[   // احجار متساقطة
            "food"=> 600,
            "wood"=>0,
            "stone"=>8000,
            "metal"=>0,
            "coin"=>0,
            "time"=>600,
            "pop"=>0
        ]
        
    );
    
    public function __construct($id_city = "") 
    {
        $this->id_city = $id_city ; 
    }
    
    public function addCity($id_player , $x , $y , $name = "1" )
    {
        $cityCount = selectFromTable("COUNT(*) AS c", "city", "id_player = :idp", ["idp" => $id_player])[0]["c"];
        
        $idCity = ($id_player - 1)*10 + $cityCount + 1;
        
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO city SET id_city = $idCity , id_player  = :idp ,x = :xc , y = :yc  , name = :nam ");
        if($sql->execute(["idp" => $id_player, "xc" => $x, "yc" => $y, "nam" => $name])){
            $this->id_city = $idCity;
            if($this->constructCity($id_player)){
                $this->constructCityLvl($id_player);
                $this->constructCity_wounded($id_player);
                $this->constructCityJop($id_player);
                $this->constructCityStorage();
                $this->changeWorldType($x , $y);
            } else {
                return -1;
            }
            return $this->id_city;
        }else{
            return -1;
        }
    }
    private function constructCity($id_player)
    {
        global $dbh;
        $sql =$dbh->prepare("INSERT INTO city_building SET id_city = '$this->id_city' ,"
                . " id_player = '$id_player'");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    public function constructCityStorage()
    {
        global $dbh;
        $sql =$dbh->prepare("INSERT INTO city_storage SET id_city = '$this->id_city' ");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    
    public function changeWorldType($x , $y)
    {
        global $dbh;
        $sql =$dbh->prepare("UPDATE world SET t = 17 WHERE x= $x AND y = $y");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    
    private function constructCityJop($id_player)
    {
        global $dbh;
        $sql =$dbh->prepare("INSERT INTO city_jop SET id_city = '$this->id_city' ,"
                . " id_player = '$id_player'");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    public function constructCity_wounded($id_player)
    {
        global $dbh;
        $sql =$dbh->prepare("INSERT INTO city_wounded SET id_city = '$this->id_city' ,"
                . " id_player = '$id_player'");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    private function constructCityLvl($id_player)
    {
        global $dbh;
        $sql =$dbh->prepare("INSERT INTO city_building_lvl SET id_city = '$this->id_city' , "
                . " id_player = '$id_player'");
        if($sql->execute()){
            return true;
        } else {
            return FALSE;
        }
    }
    public function getCityHeros($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero WHERE id_city = '$this->id_city'  AND id_player = '$id_player' ORDER BY ord ASC");
        $sql->execute();
        $data = array();
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $hero_power                 = Hero::calPowerTOAdd($fetch);
            $fetch["power"]             = $hero_power["power"];
            $fetch["power_ls"]          = $hero_power["power_ls"];
            $fetch["medal"]             = Hero::getHeroMedal($fetch["id_hero"]);
            
            $fetch["army"]              = selectFromTable("*", "hero_army", "id_hero = {$fetch["id_hero"]}")[0];
            $hero_equip                 = Equipment::retriveEquipByIdHero($fetch["id_hero"], $id_player);
            $fetch["equip"]["boot"]     = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
            $fetch["equip"]["armor"]    = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
            $fetch["equip"]["shield"]   = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
            $fetch["equip"]["helmet"]   = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
            $fetch["equip"]["sword"]    = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
            $fetch["equip"]["belt"]     = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
            $fetch["equip"]["necklace"] = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
            $fetch["equip"]["pendant"]  = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
            $fetch["equip"]["ring"]     = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
            $fetch["equip"]["steed"]    = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);
            
            $data[] = $fetch;
        }
        
        return $data;
    }
    public static function getCityResources($id_city)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT food , wood , stone , metal , coin , pop  FROM city WHERE id_city = '$id_city'");
        $sql->execute();
        
        return $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    public function getCityHeros_ws($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM hero WHERE id_city = '$this->id_city'"
                . " AND id_player = '$id_player'");
        $sql->execute();
        $data = NULL;
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $fetch_1["data"] = $fetch;
            $hero = new Hero($fetch["id_hero"]);
            $fetch_1["army"] = $hero->getHeroArmy($id_player);
            $fetch_1["equip"] = Equipment::retriveEquipByIdHero($fetch["id_hero"], $id_player);
            $data[] = $fetch_1;
        }
        
        return $data;
    }
    public function armyCityChange($id_player , $army_type , $army_amount ,$sign)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET $army_type = $army_type $sign $army_amount "
                . " WHERE id_city = '$this->id_city'  AND id_player = '$id_player'");
        $sql->execute();
        return $sql->rowCount();
    }
    public function armyCityAdd($id_player , $army_type , $army_amount ,$sign)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET `$army_type` = `$army_type` + $army_amount "
                . " WHERE id_city = '$this->id_city'  AND id_player = '$id_player' ");
        $sql->execute();
        return $sql->rowCount();
    }
    public function getArmyCountByType($id_player , $type)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT ".$type." FROM city "
                . " WHERE id_city = '$this->id_city' AND id_player = '$id_player'");
        $sql->execute();
        $army_count = $sql->fetch(PDO::FETCH_ASSOC);
        return $army_count[$type];
    }
    public function getCityBuiling($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_building WHERE id_city = '$this->id_city' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        $buildings = $sql->fetch(PDO::FETCH_ASSOC);
        
            
        return $buildings;
       
    }
    public function getCityJop($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_jop WHERE id_city = '$this->id_city' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        $jops = $sql->fetch(PDO::FETCH_ASSOC);
        
            
            return $jops;
       
    }
    public function getCityBuildingLvl($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_building_lvl  WHERE id_city = '$this->id_city' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        $buildings_lvl = $sql->fetch(PDO::FETCH_ASSOC);
        return $buildings_lvl;
    }
    public function getRemainCity($id_player)
    {
        
        $buildings    = $this->getCityBuiling($id_player);
        $building_lvl = $this->getCityBuildingLvl($id_player);
        $jops         = $this->getCityJop($id_player);

        $all["building"] = $buildings;
        $all["lvl"] = $building_lvl;
        $all["jop"] = $jops;
        
        return  $all;
    }

    public function addCityTheater($id_player)
    {
         global $dbh;
        $sql = $dbh->prepare("INSERT INTO city_theater SET id_city = '$this->id_city' , "
                . " id_player = '$id_player'");
        return $sql->execute();
    }
    public function getCityWorker($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_worker  WHERE id_city = '$this->id_city' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        $workers = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $workers;
    }
    public function getCityJopHiring($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_jop_hiring  WHERE id_city = '$this->id_city' "
                . " AND id_player = '$id_player'");
        $sql->execute();
        
        return  $sql->fetch(PDO::FETCH_ASSOC);
    }
    public function updateResources($id_player , $sign , $resource)
    {
        global $dbh;
        $addetionCheck = "";
        
        if($sign == "-"){
            $addetionCheck =  " AND "
                    . "food  >= {$resource["food"]} - 10000"
                    . " AND wood  >= {$resource["wood"]} - 10000"
                    . " AND stone >= {$resource["stone"]} - 10000"
                    . " AND metal >= {$resource["metal"]} - 10000"
                    . " AND coin  >= {$resource["coin"]} - 10000";
        }
        
        $sql = $dbh->prepare("UPDATE city SET "
                . " wood  = GREATEST( wood  $sign {$resource["wood"]} ,0) , "
                . " food  = GREATEST( food  $sign {$resource["food"]} ,0), "
                . " stone = GREATEST( stone $sign {$resource["stone"]},0) , "
                . " metal = GREATEST( metal $sign {$resource["metal"]},0) , "
                . " coin  = GREATEST( coin  $sign {$resource["coin"]} ,0) ,"
                . " pop   = GREATEST( pop   $sign {$resource["pop"]}  ,0)"
                . " WHERE id_player = '$id_player' AND id_city = '$this->id_city' $addetionCheck");
        $sql->execute();
        if($sql->rowCount() > 0){
            
            return TRUE;
        }
        return FALSE;
    }
    public function updateCityColumns($id_player  , $columns)
    {
        global $dbh;
        $string = implode(", ", $columns);
        $sql = $dbh->prepare("UPDATE city SET $string "
                . " WHERE id_player = '$id_player' AND id_city = '$this->id_city' ");
        $sql->execute();
        //print_r($sql);
        if($sql->rowCount() > 0){
            return TRUE;
        }
        return FALSE;
    }
    public function getCityColumns($id_player  , $columns)
    {
        global $dbh;
        $string = implode(", ", $columns);
        $sql = $dbh->prepare("SELECT $string FROM city   "
                . " WHERE id_player = '$id_player' AND id_city = '$this->id_city' ");
        $sql->execute();
        
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    
    public function addResource($id_player , $sign , $resource , $amount)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET "
                . " $resource  = $resource  $sign $amount  "
                . " WHERE id_player = '$id_player' AND id_city = '$this->id_city' ");
         $sql->execute();
         
         return $sql->rowCount();
    }
    public function getOneBuildingLvl($id_player , $place)
    {
        $data = selectFromTable("`$place`", "city_building_lvl", "id_player = :idp  AND id_city = :idc", ["idp" => $id_player, "idc" => $this->id_city])[0];
        if(isset($data[$place])){
            return $data[$place];
        }
        return 0;
    }
    public function addArmyBuild($id_player , $place , $army_type,
            $time_start , $time_end  , $amount)
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO build_army SET id_city = :idc ,   id_player = :idp , place = :pl ,   army_type  = :at , time_start = :ts , time_end = :te , amount = :am");
        if($sql->execute([ "idc" => $this->id_city,  "idp" => $id_player,  "pl" => $place, "at" => $army_type, "ts" => $time_start, "te" => $time_end, "am" => $amount])){
            return $dbh->lastInsertId();
        }else{
            return -1;
        }
    }
    
    public static function updateArmyBuild($time_end , $time_start , $id)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE build_army SET time_end = $time_end , acce = 1 , "
                . " time_start = $time_start  WHERE  id = $id");
        
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    
    public function getCurrentProArmy($id_player , $place)
    {
        return selectFromTable("*", "build_army", "id_player = :idp AND  place = :pl  AND id_city = :idc",  ["idp" =>$id_player, "pl" => $place, "idc" => $this->id_city]);
    }
    public function getLastWorkingArmyBuilding($id_player , $place)
    {
        
        return selectFromTable("time_end", "build_army", "id_player = :idp AND  place = :pl AND id_city = :idc ORDER BY time_end DESC LIMIT 1", ["idp" =>$id_player, "pl" => $place, "idc" => $this->id_city]);
    }
    
    public static function getDataByCoords($x , $y)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT city.id_player , city.name , city.id_city , player.name AS p_name, "
                . " player.prestige ,player.guild  , player.avatar , player.id_guild FROM player "
                . " JOIN city ON city.x = '$x' AND city.y = '$y' "
                . "AND city.id_player = player.id_player");
        $sql->execute();
        return$sql->fetch(PDO::FETCH_ASSOC);
    }
    
    public static function getCityNameByCoords($x , $y)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT  city.name , player.name AS p_name FROM player "
                . " JOIN city ON city.id_player = player.id_player "
                . " WHERE city.x = '$x' AND city.y = '$y'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getCityResource($id_player)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT wood , food, stone, coin, metal , pop FROM city WHERE "
                . " id_city = $this->id_city AND id_player = $id_player");
        $sql->execute();
        return$sql->fetch(PDO::FETCH_ASSOC);
        
    }
    public function setCityHelper($id_player , $helper)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET helper = $helper WHERE id_player = $id_player AND "
                . "id_city = $this->id_city AND helper = 0");
        $sql->execute();
        return$sql->rowCount();
        
    }
    
    public function resetCityHelper($id_player )
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET helper = 0 WHERE id_player = $id_player AND "
                . "id_city = $this->id_city ");
        $sql->execute();
        return$sql->rowCount();
        
    }
    
    public function UPDATE($id_player  , $col , $val)
    {
        
        return updateTable("`$col` = :va", "city", " id_player = :idp AND id_city = :idc", ["va" => $val, "idp" => $id_player, "idc" => $this->id_city]);
        
    }
    
    public function expandCity($id_player  ,  $lvl)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE city SET lvl = $lvl+1 WHERE id_player = $id_player AND "
                . "id_city = $this->id_city  AND lvl= $lvl ");
        $sql->execute();
        return$sql->rowCount();
        
    }
    public function getCityWounded($id_player)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city_wounded WHERE "
                . " id_city = $this->id_city AND id_player = $id_player");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    
    public static function getCityCoords($id_city)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT x , y FROM city WHERE  id_city = $id_city");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
        
        
    }
    
    public function build_A_Building($building_place ,$building_to_build , $id_player )
    {
        
        $quary = " UPDATE city_building SET  `$building_place` = $building_to_build WHERE "
                . " id_city = $this->id_city  AND id_player = $id_player AND  `$building_place` = 0 ";
            
            global $dbh;
            
            $sql = $dbh->prepare($quary);
            $sql->execute();
            
            if($sql->rowCount() > 0){
                
                $quary = " UPDATE city_building_lvl SET  `$building_place` = 1 WHERE "
                . " id_city = $this->id_city  AND id_player = $id_player ";
                
                $sql_2 = $dbh->prepare($quary);
                $sql_2->execute();
                
                $building = new Building($id_player, $this->id_city, 1, $building_to_build);
                $building->afterBuildingLvlConstructed();
                
                return $sql_2->rowCount();
                
            }else{
                
                return FALSE;
                
            }
        
    }
    
    public static function deleteFromCityHiring($id_city)
    {
        
        global $dbh;
        
        $sql = $dbh->prepare("DELETE FROM city_jop_hiring WHERE id_city =$id_city");
        $sql->execute();
        
        return $sql->rowCount();
    
    }
   
    public static function calPopCap($id_city){
        
        $city_building = selectFromTable("*", "city_building", "id_city = $id_city")[0];
        $city_building_lvl = selectFromTable("*", "city_building_lvl", "id_city = $id_city")[0];

        $total_cap = 300;
        foreach ($city_building  as $key => $value){
            if($key != "id_player" && $key != "id_city" && $value == COTTAGE){
                $total_cap += $city_building_lvl[$key]*250;
            }
        }
        return $total_cap;
    }
    
    public static function addEXPConsole($id_city , $xp){
        
        return updateTable("hero.exp = hero.exp + $xp", "hero", "id_hero = (SELECT console FROM city WHERE id_city = $id_city) AND lvl < 255");
        
    }
    public static function takeEXPConsole($id_city , $xp){
        
        return updateTable("hero.exp = hero.exp - $xp", "hero", "id_hero = (SELECT console FROM city WHERE id_city = $id_city) AND lvl < 255");
        
    }
    
    public static function buildingLvlByType($id_city , $type) 
    {
        $allBuildingType = selectFromTable("*", "city_building", "id_city =  $id_city")[0];
        foreach ($allBuildingType as $key => $val):
            if($val == $type && $key != "id_city" && $key != "id_player"){
                return selectFromTable("$key", "city_building_lvl",  "id_city =  $id_city")[0][$key];
            }
        endforeach;
        return 0;
    }
    
    
}
/*require_once '../config.php';
$city = new City(1);
$resource = [
    "coin"=>100000000,
    "wood"=>100000000,
    "food"=>100000000,
    "metal"=>100000000,
    "pop"=>100000000,
    "stone"=>100000000
];*/

