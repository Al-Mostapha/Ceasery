<?php


if(file_exists("matrial.php")){
    require_once './matrial.php';
}
class Prize
{
    
    private $x_coord;
    private $y_coord;
    public  $unite;
    public  $heros;
    public  $totalHonorAttackSide = 0;
    public  $totalHonorDefenceSide = 0;
    public  $totalPointsAttackSide = 0;
    public  $totalPointsDefenceSide = 0;
    
    public $takenResourcesCapacity = 0;
    
    public $playersCanTake = [];


    public $totalResources = [
        "food"=>0,
        "wood"=>0,
        "stone"=>0,
        "metal"=>0,
        "coin"=>0,
    ];
    
    public $cityAvailResources;
    public $totalResCap = 0;

    public static $CITY_RES_TAKE_RATE = [
        "food" => 0.4,
        "wood" => 0.3,
        "stone"=> 0.15,
        "metal"=> 0.1,
        "coin" => 0.05
    ];
    
    public static $prize_rate_mean = 0.03;
    
    public static $necklace = array(
        "necklace_1","necklace_1","necklace_1","necklace_1",
        "necklace_2", "necklace_2", "necklace_2",
        "necklace_3", "necklace_3", "necklace_3"
    );
    
    public static $FLAG_WIN_RATE = [
        250, 250, 250, 250, 250, 250, 250, 250, 250, 350,
        280, 280, 280, 280, 280, 280, 280, 280, 280, 380,
        310, 310, 310, 310, 310, 310, 310, 310, 310, 380,
        350, 350, 350, 350, 350, 350, 350, 350, 350, 390,
        370, 370, 370, 370, 370, 370, 370, 370, 370, 400
    ];
    public static $necklace_red = array(
        
    );
    
    public function __construct($x_coord , $y_coord , $unit , $heros)
    {
        
        $this->y_coord = $y_coord;
        $this->x_coord = $x_coord;
        $this->unite   = $unit;
        $this->heros   = $heros;
        foreach ($heros as $one){
            if($one["side"] == SIDE_ATTACK){
                
                $this->totalHonorAttackSide  += $one["honor"];
                $this->totalPointsAttackSide += $one["points"];
                $this->heroShare($one);
                
            }else{
                
                $this->totalHonorDefenceSide  += $one["honor"];
                $this->totalPointsDefenceSide += $one["points"];
                
            }
            
        }
        if(WorldUnit::isCity($this->unite["t"])){
           $this->getCityAvailRes();
           $this->takeCityRes();
        }
        
        
    }
    
    private function getCityAvailRes()
    {
        
        $this->cityAvailResources = selectFromTable("id_city,food,wood,stone,metal,coin, id_player,id_city,food_cap,wood_cap, stone_cap,metal_cap,coin_cap", "city", "x = $this->x_coord AND y = $this->y_coord")[0];
       
    }
    private function takeCityRes()
    {
        $food  = max($this->cityAvailResources["food"]  - $this->totalResCap* static::$CITY_RES_TAKE_RATE["food"], 0);
        $wood  = max($this->cityAvailResources["wood"]  - $this->totalResCap* static::$CITY_RES_TAKE_RATE["wood"], 0);
        $stone = max($this->cityAvailResources["stone"] - $this->totalResCap* static::$CITY_RES_TAKE_RATE["stone"], 0);
        $metal = max($this->cityAvailResources["metal"] - $this->totalResCap* static::$CITY_RES_TAKE_RATE["metal"], 0);
        $coin  = max($this->cityAvailResources["coin"]  - $this->totalResCap* static::$CITY_RES_TAKE_RATE["coin"], 0);
        updateTable("food = :f, wood = :w, stone = :s, metal = :m, coin = :c", "city", "id_city = :idc", ["f"=>$food, "w"=>$wood,"s"=>$stone, "m"=>$metal,"c"=>$coin, "idc"=>$this->cityAvailResources["id_city"]]);
    }
    

    public function getFlagForMo3ser()
    {
        $flag = "";
        
        if($this->x_coord == 136 && $this->y_coord == 160){
                $flag = "flag_france";
            }else  if($this->x_coord == 407 && $this->y_coord == 66){
                $flag = "flag_magul";
            }else  if($this->x_coord == 106 && $this->y_coord == 19){
                $flag = "flag_england";
            }else  if($this->x_coord == 392 && $this->y_coord == 213){
                $flag = "flag_macdoni";
            }else  if($this->x_coord == 266 && $this->y_coord == 245){
                $flag = "flag_roma";
            }else  if($this->x_coord == 78 && $this->y_coord == 300){
                $flag = "flag_spain";
            }else  if($this->x_coord == 427 && $this->y_coord == 337){
                  $flag = "flag_greek";
            }else  if($this->x_coord == 316 && $this->y_coord == 450){
                $flag = "flag_egypt";
            }else  if($this->x_coord == 88 && $this->y_coord == 444){
                $flag = "flag_cartaga";
            }else  if($this->x_coord == 246 && $this->y_coord == 111){
                $flag = "flag_germany";
            } 
            
            return $flag;
    }
    
    public function getFlagAmountMo3ser()
    {
        if($this->unite["l"] == 50 || $this->unite["l"] == 40){
            return 5;
        }else if($this->unite["l"]  > 40){
            return 3;
        }else if($this->unite["l"]  > 30){
            return 2;
        }
        return 1;
        
    }

    
    private function heroShare($hero)
    {
       
        $idPlayer = $hero["id_player"];
        $idCity   = $hero["id_city"];
        
        if(array_key_exists($idPlayer, $this->playersCanTake)){
            
            if(array_key_exists($idCity, $this->playersCanTake[$idPlayer])){
                $this->playersCanTake[$idPlayer][$idCity]["cap"] += $hero["resource_capacity"] ;
            }else{
                
                $this->playersCanTake[$idPlayer][$idCity] =  [ "cap"=>$hero["resource_capacity"]];
                 
            }
            
            
        }else{
            
            $this->playersCanTake[$idPlayer] = [
                $idCity =>[
                    "cap"=>$hero["resource_capacity"]
                ]
            ];
            
        }
        $this->totalResCap += $hero["resource_capacity"];
        
        
    }
    


    
    public function cityPrize($id_player)    /// دى جوايز المناورات
    {
        
        $p_prize = ["food"=>0,"wood"=>0,"stone"=>0,"metal"=>0,"coin"=>0];
        $share = min($this->totalResCap/($this->cityAvailResources["food"] +$this->cityAvailResources["wood"] +$this->cityAvailResources["stone"] +$this->cityAvailResources["metal"] +$this->cityAvailResources["coin"]) , 1);
        
        foreach ($this->playersCanTake[$id_player] as $idCity => $city){
            
            $cityShareRate = $city["cap"]/$this->totalResCap;
           
            $save_state = new SaveState(0);
            $save_state->saveCityState($idCity);
            
            $food  = $this->cityAvailResources["food"] *static::$CITY_RES_TAKE_RATE["food"] *$cityShareRate*$share;
            $wood  = $this->cityAvailResources["wood"] *static::$CITY_RES_TAKE_RATE["wood"] *$cityShareRate*$share;
            $stone = $this->cityAvailResources["stone"]*static::$CITY_RES_TAKE_RATE["stone"]*$cityShareRate*$share;
            $metal = $this->cityAvailResources["metal"]*static::$CITY_RES_TAKE_RATE["metal"]*$cityShareRate*$share;
            $coin  = $this->cityAvailResources["coin"] *static::$CITY_RES_TAKE_RATE["coin"] *$cityShareRate*$share;
           
            updateTable("food = food + $food, wood = wood + $wood, stone = stone + $stone, metal = metal + $metal , coin = coin + $coin", "city", "id_city =  $idCity");
            
            $p_prize["food"]  += $food;  $p_prize["wood"] += $wood; 
            $p_prize["stone"] += $stone; $p_prize["metal"] += $metal;
            $p_prize["coin"]  += $coin; 
        }
        
        return ["food"=>$p_prize["food"], "wood"=>$p_prize["wood"],"stone"=>$p_prize["stone"],"metal"=>$p_prize["metal"],"coin"=>$p_prize["coin"]];
        
       
    }
    
    
    private function cityItemsPrize($idPlayer)
    {
        if($this->totalResCap < 5e6){ return []; }
        
        $items = selectFromTable("*", "world_unit_prize", "type = :t ORDER BY RAND() LIMIT ".ITEM_MAX_TAKE, ["t"=> $this->unite["t"]]);
        $playerTotal = 0;
        foreach ($this->playersCanTake[$idPlayer] as $oneCity){
                $playerTotal += $oneCity["cap"];
        }
        $playerShare = $playerTotal/$this->totalResCap;
        
        foreach ($items as $key => $oneItem){
            
            $canTakeAmount = floor(rand($oneItem["amount_min"], $oneItem["amount_max"])*$playerShare);
            $playerAmount  = Matrial::getAmount( $oneItem["mat_tab"], $oneItem["prize"], $this->cityAvailResources["id_player"]);
            
            $amount = min($playerAmount, $canTakeAmount);
            if($amount < 1){
                continue;
            }
            Matrial::useMatrial($oneItem["mat_tab"], $oneItem["prize"], $amount, $this->cityAvailResources["id_player"]);
            Matrial::addMatrial($oneItem["mat_tab"], $oneItem["prize"], $amount, $idPlayer);
            $items[$key]["amount_min"] = $amount;
            $items[$key]["amount_max"] = $amount;
            
        }
        
        return $items;
        
    }




    /* this fuction arrange call inside*/
    
    public function givePrize($id_player , $honor)
    {
        
       $prizes = [
           "matrial"=>[],
           "resource"=>["food"=>0,"wood"=>0,"stone"=>0, "metal"=>0,"coin"=>0, ]
       ];
        
       if(WorldUnit::isArmyCapital($this->unite["t"])){
           return $this->addPrizeToDB($prizes , $id_player , $honor);
       }
        $this->unite = selectFromTable("*", "world", "x = {$this->unite["x"]} AND y = {$this->unite["y"]}")[0];
        $prizes["matrial"] = selectFromTable( "prize, amount_max, amount_min, win_rate, mat_tab", "world_unit_prize", "type = {$this->unite["t"]} AND lvl = {$this->unite["l"]}");
        
                
        if(WorldUnit::isCamp($this->unite["t"])){ //  كدة انا هجيب جوايز للبرارى
            
            $prizes["matrial"][] = [
                "amount_min"=>1,
                "amount_max"=> $this->getFlagAmountMo3ser(),
                "prize"=>$this->getFlagForMo3ser(),
                "win_rate"=> static::$FLAG_WIN_RATE[$this->unite["l"]],
                "mat_tab"=> "matrial_flags"
            ];
            
        }else if(WorldUnit::isCity($this->unite["t"])){
            
            $res               = $this->cityPrize($id_player);
            $prizes["matrial"] = $this->cityItemsPrize($id_player);
            $prizes["resource"] = [
                "food"=>$res["food"], "wood"=>$res["wood"],
                "stone"=>$res["stone"], "metal"=>$res["metal"], 
                "coin"=>$res["coin"]
                
            ];
            
        }
        
        
          
        return $this->addPrizeToDB($prizes , $id_player , $honor);
    }
   
    public function addPrizeToDB($prizes , $id_player , $honor)
    {
        $return_prize = [
            "matrial"=>[],
            "resource"=>$prizes["resource"],
            "honor"=>$honor
        ];
        
        foreach ($prizes["matrial"] as $one){
            
            $luck = rand(0, 1000);
            
            if($luck <=  $one["win_rate"]){
                
                $amount = rand($one["amount_min"], $one["amount_max"]);
                Matrial::addMatrial("{$one["mat_tab"]}", $one["prize"], $amount, $id_player); 
                $return_prize["matrial"][] = [
                    "prize"=>$one["prize"],
                    "amount"=>$amount
                ];
                
            }
            
        }
       
       Player::increasePlayerHonor($id_player, $honor);
       
    
       
        
       return $return_prize;
    }
    
    
    
    
}

/*$n = new Prize(145, 164);
 print_r($n->givePrize(1));*/
/*for ($index = 1 ; $index<=50 ; $index++){
   
}*/



