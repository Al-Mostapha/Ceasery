<?php

class Building
{
    // city where the  building exist
    private $id_city;
    // id_ owner of city
    private $id_player;
    // current lvl  of building
    private $lvl;
    // type of building
    private $type;
    private $place;
    
    public static $STORE_AMOUNT = [
        80000   , 160000  , 320000  , 640000  , 1280000 ,
        2560000 , 5120000 , 10240000, 20480000, 40960000,
        49152000, 51200000, 53248000, 55296000, 57344000,
        59392000, 61440000, 63488000, 65536000, 67584000,
        69632000, 71680000, 73728000, 75776000, 77824000,
        79872000, 81920000, 83968000, 86016000, 88064000
        
    ]; 
    public static $COIN_CAP_FOR_PALACE = [
        20000   , 50000   , 100000  , 300000  , 700000  ,
        1500000 , 3500000 , 8000000 , 18000000, 37000000,
        37800000, 38600000, 39400000, 40200000, 41000000,
        41800000, 42600000, 43400000, 44200000, 45000000,
        45800000, 46600000, 47400000, 48200000, 49000000,
        49800000, 50600000, 51400000, 52200000, 53000000, 
        53000000
        
    ]; 
    
    public static $BUILDINg_TYPE_FOR_ARMY = [
        "army_a"=>3,
        "army_b"=>4,
        "army_c"=>3,
        "army_d"=>3,
        "army_e"=>5,
        "army_f"=>5,
        "spies"=>4
    ];
    
    public static  $BUILDING = array(
        [         // مكان خالى 
            "food"=>500,
            "wood"=>3210,
            "stone"=>30000,
            "metal"=>6520,
            "time"=>200,
            "time_factor"=>120,
            "ar_title"=>"مكان خالى "
        ],
        [  //   كوخ
            "food"=>5000,
            "wood"=>5220,
            "stone"=>5600,
            "metal"=>36520,
            "time"=>600,
            "time_factor"=>120,
            "ar_title"=>"كوخ"
        ],
        [         // مخزن 
            "food"=>6000,
            "wood"=>6000,
            "stone"=>5000,
            "metal"=>5000,
            "time"=>200,
            "time_factor"=>120,
            "ar_title"=>"مخزن"
        ],
        [          //   ثكنات
            "food"=>400,
            "wood"=>2000,
            "stone"=>650,
            "metal"=>550,
            "time"=>150,
            "time_factor"=>120,
            "ar_title"=>"ثكنات"
        ],
        [       // اسطبل
            "food"=>500,
            "wood"=>600,
            "stone"=>200,
            "metal"=>100,
            "time"=>250,
            "time_factor"=>120,
            "ar_title"=>"اسطبل"
        ],
        [       //  ورشة عمل
            "food"=>1000,
            "wood"=>800,
            "stone"=>1500,
            "metal"=>700,
            "time"=>280,
            "time_factor"=>120,
            "ar_title"=>"ورشة عمل"
        ],
        [      // مسرح
            "food"=>250,
            "wood"=>360,
            "stone"=>280,
            "metal"=>640,
            "time"=>240,
            "time_factor"=>120,
            "ar_title"=>"مسرح"
        ],
        [      // مركز
            "food"=>680,
            "wood"=>920,
            "stone"=>40,
            "metal"=>580,
            "time"=>360,
            "time_factor"=>120,
            "ar_title"=>"مركز"
        ],
        [     //       جامعة
            "food"=>850,
            "wood"=>890,
            "stone"=>1200,
            "metal"=>1000,
            "time"=>360,
            "time_factor"=>120,
            "ar_title"=>"جامعة"
        ],
        [     //         اكاديمية
            "food"=>850,
            "wood"=>890,
            "stone"=>1200,
            "metal"=>1000,
            "time"=>360,
            "time_factor"=>120,
            "ar_title"=>"اكاديمية"
        ],
        [      //  دار مساعدة
            "food"=>1000,
            "wood"=>1000,
            "stone"=>2500,
            "metal"=>2500,
            "time"=>380,
            "time_factor"=>120,
            "ar_title"=>"دار المساعدة"
        ],
        [      // بلازة
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"بلازة"
        ],
        [      //12 قصر
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"القصر"
        ],
        [      //13 السور
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"السور"
        ],
        [      // 14 السوق
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"السوق"
        ],
        [      // 15 الغابات
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"الغابات"
        ],
        [      // 16 مزارع
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"مزارع"
        ],
        [      // 17 منجم
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"المناجم"
        ],
        [      // 18 محجر
            "food"=>800,
            "wood"=>600,
            "stone"=>600,
            "metal"=>1200,
            "time"=>260,
            "time_factor"=>120,
            "ar_title"=>"المحاجر"
        ]
         
    );
    


    public function __construct($id_player , $id_city , $lvl , $type , $place = "")
    {
        $this->id_player = $id_player;
        $this->id_city = $id_city;
        $this->lvl = $lvl;
        $this->type = $type;
        $this->place = $place;
    }
    
    
    
    public function upgradeBuilding($time_end)
    {
        $now = time();
        $total = $now + $time_end;
        $lvl_to = $this->lvl+1;
        
        
        // first get worker number
        $row_count = selectFromTable("COUNT(*) as num", "city_worker", "id_city = $this->id_city AND id_player = $this->id_player");
        
        
        $motive = selectFromTable("motiv", "player_stat", "id_player = $this->id_player");
        
        if( $row_count[0]["num"] == 0 || ($row_count[0]["num"] < 3  && $motive[0]["motiv"] >= $now) ):
            
           
            return insertIntoTable("id_city = :idc ,  id_player = :idp , place = :pl ,  time_start = :ts , lvl_to = :lt , time_end = :te,  type = :ty , state= 'up', time_end_org = :tor", "city_worker",
                    ["idc"=> $this->id_city, "idp" => $this->id_player, "pl" => $this->place, "ts" => $now, "lt"=>$lvl_to, "te"=> $total, "ty" => $this->type, "tor"=> $total]) > 0;
            
        endif;
        
        return FALSE;
       
    }
    
    
    public function downgradeBuilding($time_end)
    {
        global $dbh;
        $now    = time();
        $total  = $now + $time_end;
        $lvl_to = $this->lvl-1;
        
        
        // first get worker number
        $row_count = selectFromTable("COUNT(*) as num", "city_worker", "id_city = $this->id_city AND id_player = $this->id_player");
        
        
        $motive = selectFromTable("motiv", "player_stat", "id_player = $this->id_player");
        
        if( $row_count[0]["num"] == 0 || ($row_count[0]["num"] < 3  && $motive[0]["motiv"] >= time()) ):
            
            $sql = $dbh->prepare("INSERT IGNORE INTO city_worker SET id_city = $this->id_city , "
                . " id_player = $this->id_player , place = '$this->place' , "
                . " time_start = $now , lvl_to = $lvl_to , time_end = $total,"
                . " type = $this->type, state= 'down' , time_end_org = $total");
            return $sql->execute();
            
        endif;
        
        return FALSE;
       
    }
    
    
    
    public function deleteWorker()
    {
        
        $time_end = time() + 120;
        return deleteTable("city_worker",
                "id_city = :idc AND id_player = :idp AND place = :pl AND time_end <= :te",
                ["idc" => $this->id_city, "idp"=> $this->id_player, "pl"=> $this->place, "te" =>$time_end ]);
        
    }
    
    public function cancelWorker()
    {
        
        return deleteTable("city_worker", "id_city = :idc  AND id_player = :idp AND place = :pl ",
                ["idc" => $this->id_city, "idp" => $this->id_player, "pl" => $this->place]);
        
    }
    
    public  function buildingLvlUp()
    {
        $rowCount = updateTable("`$this->place` = `$this->place` + 1", "city_building_lvl", 
                "id_city = :idc AND id_player = :idp AND `$this->place` < 30",
                ["idc" => $this->id_city, "idp" => $this->id_player]);
        $this->afterBuildingLvlUp();
        return $rowCount;
    }
    
    public function afterBuildingLvlUp()
    {
        $prestige = new Prestige($this->id_player);
        $val = $prestige->getGainPrestige(["gain_from"=>"BUILDING_UPGRADE" , 
            "building_type"=> $this->type,
            "lvl_to"=> $this->lvl
            ]);
        $prestige->adddPrestige($val);
        City::addEXPConsole($this->id_city, $val*2);
        
        global $dbh;
        if($this->type == COTTAGE){
            
            
           $tot = City::calPopCap($this->id_city);
            updateTable("pop_cap = $tot", "city" ,"id_city = $this->id_city" );
          
            echo json_encode(["state"=>"ok" ,"prestige"=>$val]);
            
        }elseif($this->type == STORE){
            
            $save_state = new SaveState($this->id_player);
            $save_state->saveCityState($this->id_city);
            $amount_added = Building::$STORE_AMOUNT[$this->lvl];
            updateTable("total_cap = total_cap + $amount_added", "city_storage", "id_city = $this->id_city");
            SaveState::storeRatio($this->id_city);
            echo json_encode(["state"=>"ok" , "city_storage"=> selectFromTable("*", "city_storage", "id_city = $this->id_city")[0],
                "city"=> selectFromTable("food,wood,stone,coin,metal", "city", "id_city = $this->id_city")[0]
                ,"prestige"=>$val]);
            
        }elseif($this->type == THEATER){
            
           $sql = $dbh->prepare("UPDATE city_theater SET lvl = lvl + 1 WHERE id_city = $this->id_city");
           $sql->execute();
           echo json_encode(["state"=>"ok"]);
            
        }elseif($this->type == WORSHIP){
            $now = time();
            echo json_encode(["state"=>"ok","prestige"=>$val]); 
            
        }elseif($this->type == PALACE){
            
            $coin_cap = Building::$COIN_CAP_FOR_PALACE[$this->lvl];
            $save_state = new SaveState($this->id_player);
            $save_state->saveCityState($this->id_city);
            
            updateTable("coin_cap = {$coin_cap}", "city", "id_city = $this->id_city");
            echo json_encode([
                "state"=>"ok" ,
                "coin_cap"=>$coin_cap,
                "city"=> selectFromTable("food,wood,stone,coin,metal", "city", "id_city = $this->id_city")[0],
                "prestige"=>$val
                    ]);
            
        }elseif($this->type == WALL){
            
            $wall_cap = 10000* ($this->lvl + 1);
            updateTable("wall_cap = $wall_cap", "city", "id_city = $this->id_city");
            echo json_encode(["state"=>"ok" , "wall_cap"=>$wall_cap]);
            
        }else{
            echo json_encode(["state"=>"ok","prestige"=>$val]);
        }
        
        
        
        
    }
    
    public function afterBuildingLvlDown()
    {
        
        $prestige = new Prestige($this->id_player);
        $val = $prestige->getGainPrestige(["gain_from"=>"BUILDING_UPGRADE" ,   "building_type"=> $this->type, "lvl_to"=> $this->lvl]);
        $prestige->remPrestige($val);
        City::takeEXPConsole($this->id_city, $val*2);
        
        $resource_gain = $this->getResource("down");
        $food  = $resource_gain["food"]/2;
        $wood  = $resource_gain["wood"]/2;
        $metal = $resource_gain["metal"]/2;
        $stone = $resource_gain["stone"]/2;
        
        
        
        if($this->lvl >= 1){
            
            updateTable("`$this->place` = `$this->place` - 1", "city_building_lvl", "id_city = $this->id_city"); 
            $srting = "food  = food + {$food} ,"
            . " wood = wood + $wood ,stone = stone + $stone , metal = metal + $metal";
            updateTable($srting, 'city', "id_city = $this->id_city");
            deleteTable("build_army", "id_city = :idc AND place = :pl", ["idc" => $this->id_city, "pl" => $this->place]);
            $send_data = ["state" => "ok"];
            
            
        }else{
            
            if($this->type < 12){
                
                updateTable("`$this->place` = 0", "city_building", "id_city = $this->id_city");
                updateTable("`$this->place` = 0", "city_building_lvl", "id_city = $this->id_city"); 
                $this->afterBuildingExploaded($this->id_city, $this->type, $this->lvl);
                $send_data = ["state" => "ok"];
                
            }else{
                
                $send_data = ["state" => "error"];

            } 
            
        }
        global $dbh;
        
        if($this->type == COTTAGE){
            
           $tot = City::calPopCap($this->id_city);
            updateTable("pop_cap = $tot" , "city" ,"id_city = $this->id_city" );
            
        }elseif($this->type == STORE){
            $save_state = new SaveState($this->id_player);
            $save_state->saveCityState($this->id_city);
            $amount_added = Building::$STORE_AMOUNT[$this->lvl];
            updateTable("total_cap = total_cap + $amount_added", "city_storage", "id_city = $this->id_city");
            SaveState::storeRatio($this->id_city);
            $send_data["city_storage"] = selectFromTable("*", "city_storage", "id_city = $this->id_city")[0];
        }elseif($this->type == THEATER){
            
           $sql = $dbh->prepare("UPDATE city_theater SET lvl = lvl - 1 WHERE id_city = $this->id_city");
           $sql->execute();
            
        }elseif($this->type == WORSHIP){
           
            if($this->lvl == 1){
                updateTable("helper = 0", "city", "id_city = $this->id_city");
            }
            $now = time();
            
            
        }elseif($this->type == PALACE){
            
            $coin_cap = Building::$COIN_CAP_FOR_PALACE[$this->lvl];
            updateTable("coin_cap = {$coin_cap}", "city", "id_city = $this->id_city");
            
            $send_data["coin_cap"] = $coin_cap;
        }
        
        
        
        $save_state = new SaveState($this->id_player);
        $save_state->saveCityState($this->id_city);
        
        $send_data["city"] = selectFromTable('food,wood,stone,metal,coin', "city", "id_city = $this->id_city")[0];
        echo json_encode($send_data);
        
        
       
        
    }
    
    
    
    
    public function afterBuildingLvlConstructed()
    {
        global $dbh;
        if($this->type == COTTAGE){
            
            $tot = City::calPopCap($this->id_city);
            updateTable("pop_cap = $tot" , "city" ,"id_city = $this->id_city" );
            
        }elseif($this->type == STORE){
            
            updateTable("total_cap = total_cap + 80000", "city_storage", "id_city = $this->id_city");
            SaveState::storeRatio($this->id_city);
            
        }elseif($this->type == THEATER){
            
            $now = time() - 10000;
            $sql = $dbh->prepare("INSERT INTO  city_theater SET lvl = 1 , id_city = $this->id_city , id_player = $this->id_player , last_update = $now");
            $sql->execute();
            
        }elseif($this->type == WORSHIP){
            
            
            
        }
        
        
        /* add prstige to player*/
        $prestige = new Prestige($this->id_player);
        $val = $prestige->getGainPrestige(["gain_from"=>"BUILDING_UPGRADE" , 
            "building_type"=> $this->type,
            "lvl_to"=> 1
            ]);
        $prestige->adddPrestige($val);
    }
    
    
    public static function afterBuildingExploaded( $id_city , $building_type , $lvl)
    {
        
       
        if($building_type == COTTAGE){
            
            
            updateTable("pop_cap = ".(City::calPopCap($id_city)) , "city" ,"id_city = $id_city" );
            
        }elseif($building_type == STORE){
            
            $total_store = array_sum(array_slice(Building::$STORE_AMOUNT, 0, $lvl));
            
            updateTable("total_cap = total_cap - $total_store", "city_storage", "id_city = $id_city");
            SaveState::storeRatio($id_city);
            
        }elseif($building_type == THEATER){
            
            deleteTable("city_theater", "id_city = $id_city");
            
        }elseif($building_type == WORSHIP){
            
            $helper = selectFromTable("helper", "city", "id_city = $id_city")[0]["helper"];
            
            if($helper == HELPER_POP){
                
                $total_cap = City::calPopCap($id_city);
                updateTable("pop_cap = $total_cap ", "city", "id_city = $id_city");
                
            }
            updateTable("helper =  0", "city", "id_city = $id_city");
        }
        
    }

    public function cottagePopPlus()
    {
        
        return 250;
        
    }

        public function isUpgradeable($resources)
    {
        $city = new City($this->id_city);
        $city_res = $city->getCityResource($this->id_player);
        
        if($city_res["wood"] + 1000 < $resources["wood"]){
           
            return FALSE;
        }elseif($city_res["food"] + 1000 < $resources["food"]){
           
            return FALSE;
        }elseif($city_res["stone"] + 1000 < $resources["stone"]){
            
            return FALSE;
        }elseif($city_res["metal"] + 1000< $resources["metal"]){
            
            return FALSE;
        }elseif($city_res["coin"] + 1000 < $resources["coin"]){
            
            return FALSE;
        }elseif($city_res["pop"] + 150 < $resources["pop"]){
            
            return FALSE;
        }else{
           
            return TRUE;
        }
    }
    
    
    
    public  function getResource($state = "up")
    {
        
        
        $building_json = file_get_contents(BASE_BATH."js".JS_VERSION."/json/building.json");
        $building_data = json_decode($building_json , TRUE);
        
        $building_res = $building_data[$this->type]["lvl_req"][$this->lvl];
        $time_up = $building_data[$this->type]["time_req"][$this->lvl];
        
        return
        array(
            "food" =>$building_res["food"],
            "wood" =>$building_res["wood"],
            "stone"=>$building_res["stone"],
            "metal"=>$building_res["metal"],
            "coin"=>0,
            "pop"=>($this->lvl*4)*0,
            "time" =>$time_up
            );
    }
    
    
    public static function acceBuildingUp($id_city , $id_player , $matrial , $place)
    {
        
        global  $dbh;
        $now = time();
        
        if($matrial == "archit_a"){
            
            $equation = "time_end - 15*60";
            
        }elseif($matrial == "archit_b"){
            
            $equation = "time_end - 60*60";
            
        }elseif($matrial == "archit_c"){
            
            $equation = "time_end - 3*60*60";
            
        }elseif($matrial == "archit_d"){
            
            $equation = "time_end - (time_end - $now)*0.9";
            
        }else{
            catchHack();
           $equation = "time_end - 0"; 
        }
        
        
        return updateTable(" time_end = $equation", "city_worker", "id_city = :idc AND id_player = :idp  AND place = :pl", ["idc" => $id_city, "idp" => $id_player, "pl" => $place]);
    
    }
    
    public static function buildingForArmy($idCity , $armyType) 
    {
        
        $allBuildingType = selectFromTable("*", "city_building", "id_city =  $idCity")[0];
        $buldingForArmy = static::$BUILDINg_TYPE_FOR_ARMY[$armyType];
        
        $arrayOfPlaces = [];
        
        foreach ($allBuildingType as $key => $val):
            
            if($val == $buldingForArmy && $key != "id_city" && $key != "id_player"){
                $arrayOfPlaces[] = $key;
                
            }
        endforeach;
        
        $stringOfPlaces = implode(", ", $arrayOfPlaces);
        $arrayOfLvls = selectFromTable($stringOfPlaces, "city_building_lvl", "id_city = $idCity")[0];
        
        $arrayReturn = [];
        
        foreach ($arrayOfPlaces as $place){
            
            $count = selectFromTable("COUNT(*) as count", "build_army", "id_city = $idCity AND place = '$place'")[0]["count"];
            if($count < $arrayOfLvls[$place]){
                
                $arrayReturn[$place] = $arrayOfLvls[$place];
                
            }
            
            
            
        }
        
        
        return $arrayReturn;
    }
    
    
}

/*$building = new Building(1, 1, 9, 8, 0);
$building->upgradeBuilding(time()+356546);*/

/*require_once '../config.php';

print_r(selectFromTable("COUNT(*) as num", "city_worker", "id_city = '1' AND id_player = '2'"));*/
/*$building = file_get_contents(BASE_BATH."js/json/building.json");

print_r(json_decode($building, TRUE));*/
