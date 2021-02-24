<?php

class BattelReport
{
    private $id_report;
    private $id_player;
    private $x_coord;
    private $y_coord;
    
    public function __construct($x_coord , $y_coord , $attacker , $side_win , $round_num , $task) 
    {
        global $dbh;
        $time = time();
        $sql = $dbh->prepare("INSERT INTO report_battel SET x = :xc , y = :yc , time_stamp = :ts , side_win = :ws , "
                . " attacker = :at , round_num = :rn , task = :ts");
        $sql->execute([
            "xc" => $x_coord, "yc" => $y_coord, "ts" => $time, "ws" => $side_win, "at" => $attacker, "rn" => $round_num, "t"=> $task
        ]);
        $this->x_coord = $x_coord;
        $this->y_coord = $y_coord;
        $this->id_report = $dbh->lastInsertId();
        $this->id_player = $attacker;
    }
    
    public function addPlayer($id_player , $side, $honor)
    {
        $now = time();
        insertIntoTable("id_player='$id_player', id_report='$this->id_report' , side ='$side', honor = $honor, time_stamp = $now" 
                , 'report_player');
    }
    
    public function addHero($id_hero ,$type  , $pre , $post ,$id_player , $side , $ord , $xp){
        
        $q  = "id_hero = :idh , "
                . "id_player = :idp , id_report = :idr , "
                . " f_1_pre = '".$pre["f_1_pre"]."', f_2_pre = '".$pre["f_2_pre"]."', f_3_pre = '".$pre["f_3_pre"]."', "
                . " b_1_pre = '".$pre["b_1_pre"]."', b_2_pre = '".$pre["b_2_pre"]."', b_3_pre = '".$pre["b_3_pre"]."', "
                . " f_1_post = '".$post["f_1_post"]."', f_2_post = '".$post["f_2_post"]."', f_3_post = '".$post["f_3_post"]."', "
                . " b_1_post = '".$post["b_1_post"]."', b_2_post = '".$post["b_2_post"]."', b_3_post = '".$post["b_3_post"]."', "
                . " f_1_type = '".$type["f_1_type"]."', f_2_type = '".$type["f_2_type"]."', f_3_type = '".$type["f_3_type"]."', "
                . " b_1_type = '".$type["b_1_type"]."', b_2_type = '".$type["b_2_type"]."', b_3_type = '".$type["b_3_type"]."' , "
                . " side = '$side' , ord = '$ord' , xp = $xp";
        return insertIntoTable($q, "report_hero", ["idh" => $id_hero, "idp" => $id_player, "idr" => $this->id_report]);
       
    }
    
    public function addPrize($prize , $id_player)
    {
        
        
       // matrial prize
        if(isset($prize["matrial"]) && is_array($prize["matrial"])){
            
            foreach ($prize["matrial"] as $one){
                insertIntoTable("id_report = '$this->id_report' , "
                        . "id_player = $id_player, prize = '{$one["prize"]}',"
                        . " amount = {$one["amount"]}", "report_mat_prize");
            }
            
        }
        
        
        
        if(isset($prize["resource"]) && is_array($prize["resource"]) && array_sum($prize["resource"]) > 0){
            
            insertIntoTable("id_report = $this->id_report, id_player = $id_player, "
                    . "food  = {$prize["resource"]["food"]}, "
                    . "wood  = {$prize["resource"]["wood"]}, "
                    . "stone = {$prize["resource"]["stone"]}, "
                    . "metal = {$prize["resource"]["metal"]}, "
                    . "coin  = {$prize["resource"]["coin"]} ", "report_res_prize");
            
        }
       
       
    }
    
    public static function getPlayerReport($id_player , $offset)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT DISTINCT id_report , seen FROM report_player WHERE id_player  = '$id_player' ORDER BY id_report DESC LIMIT 10 OFFSET $offset");
        $sql->execute();
        return$sql->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public static function getReportHeader($id_report , $type="")
    {

        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM report_battel WHERE id_report  = '$id_report'");
        $sql->execute();
        $report =  $sql->fetch(PDO::FETCH_ASSOC);
        if(is_array($report)){
            $row = WorldMap::getUnitData($report["x"], $report["y"]);
            $row["x"]          = $report["x"];
            $row["y"]          = $report["y"];
            $row["time_stamp"] = date("j M y", ($report["time_stamp"]));
            $row["id_report"]  = $report["id_report"];
            $row["type"]       = "battel";
            $row["lvl"]        = $report["lvl"];
            return $row;
        }else{
            return FALSE;
        }
        
        
        
    }
   
    public static function getHeros($id_report)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT report_hero.* , player.name AS p_name , hero.name AS h_name , hero.avatar FROM "
                . " report_hero  LEFT JOIN player ON report_hero.id_player = player.id_player "
                . " LEFT JOIN hero ON hero.id_hero = report_hero.id_hero "
                . " WHERE report_hero.id_report = :idr ORDER BY ord ASC");
        $sql->execute(["idr" => $id_report]);
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function getPrize($id_report , $id_player)
    {
        
        $prize["matrial"] = selectFromTable("prize, amount", "report_mat_prize", "id_player = $id_player AND id_report = $id_report");
        $res = selectFromTable("*", "report_res_prize", "id_player = $id_player AND id_report = $id_report");
        if(count($res) > 0){
            
            $prize["resource"] = $res[0];
            
        }else{
            
           $prize["resource"]  = [
               
               "food"=>0,
               "wood"=>0,
               "stone"=>0,
               "metal"=>0,
               "coin"=>0
               
           ]; 
            
        }
        $prize["honor"] = selectFromTable("honor", "report_player", "id_player = $id_player AND id_report = $id_report")[0]["honor"];
        
        return $prize;
    }
    
    public function addHeroXp($type , $lvl , $side_win)
    {
        
        if($side_win != SIDE_ATTACK){
            return 0;
        }
        
        if(WorldUnit::isAsianSquads($type)){
            
            $arr_xp = [32=>rand(416500   ,426500),33=>rand(610256   ,620256),34=>rand(810256   ,820256),35=>rand(1010256  ,1020256),
                36=>rand(1320256  ,1420256),37=>rand(1510256  ,1610256),38=>rand(2150256  ,2250256),39=>rand(2250256  ,2350256),
                40=>rand(2250256  ,2450256),41=>rand(2350256  ,2650256),42=>rand(2400265  ,2800265),43=>rand(2950265  ,3050265),
                44=>rand(3050265  ,3450265),45=>rand(3550265  ,3750265),46=>rand(4000128  ,4100128),47=>rand(4200128  ,4400128),
                48=>rand(10400128  ,11000128)];
            
            return $arr_xp[$type];
            
        }else if(WorldUnit::isBarrary($type)){
            $arr_xp = [
                1=> rand(50, 100),
                2=> rand(80, 150),
                3=> rand(300, 400),
                4=> rand(400, 500),
                5=> rand(1300, 1400),
                6=> rand(3200, 3800),
                7=> rand(7000, 8500),
                8=> rand(32000, 48000),
                9=> rand(63522, 80000),
                10=> rand(120000, 180000),
            ];
            return $arr_xp[$lvl];
            
        }else if(WorldUnit::isCamp($type) || WorldUnit::isMonawrat($type)){
            
            $factor = 1;
            if($lvl%10){
                $factor = 3;
            }
            
            return rand((pow($lvl, 2)*100), (pow($lvl, 2)*110));
            
        }else if(WorldUnit::isGangStar($type)){
            return rand(500, 650) * $lvl;
        }else if (WorldUnit::isCarthagianArmies($type)) {
            
           $arr_xp = [
                52=>[rand(9000, 10000)     , rand(65000, 70000)    , rand(12000, 14000)    , rand(85000, 90000)],
                53=>[rand(28000, 30000)    , rand(180000, 190000)  , rand(42000, 44000)    , rand(350000, 360000)],
                54=>[rand(650000, 660000)  , rand(1900000, 2000000), rand(950000, 1000000) , rand(2800000, 2900000)],
                55=>[rand(9500000, 1000000), rand(2800000, 3000000), rand(9500000, 1000000), rand(3000000, 3200000)],
                56=>[rand(2800000, 3000000), rand(8200000, 8500000), rand(4100000, 4300000), rand(16200000, 16500000)]
               ]; 
           
           
               return $arr_xp[$type][$lvl < 5 ? 0 : ($lvl == 5 ? 1 : ($lvl == 10 ? 3 : 2))];
           
        }
        return 10000;
        
    }
    public static function getGeneralData($id_report)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT round_num , side_win , name AS p_name , x, y, time_stamp, task, lvl FROM report_battel JOIN player ON "
                . " report_battel.id_report = :idr AND player.id_player = report_battel.attacker ");
        $sql->execute(["idr" => $id_report]);
        
        return $fetch = $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    public static function updateReportSeen($id_report, $id_player)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE report_player SET seen = 1 WHERE id_report = $id_report AND id_player = $id_player");
        $sql->execute();
        
        
    }
    
}
/*$battel = new BattelReport(100, 100);
$battel->id_report = 1;
$battel->id_player = 1;*/
/*$pre  = array(
    "f_1_pre" => 150,
    "f_2_pre" => 150,
    "f_3_pre" => 150,
    "b_1_pre" => 150,
    "b_2_pre" => 150,
    "b_3_pre" => 150
);
$post  = array(
    "f_1_post" => 50,
    "f_2_post" => 50,
    "f_3_post" => 50,
    "b_1_post" => 50,
    "b_2_post" => 50,
    "b_3_post" => 50
);*/
/*$prize  = array(
    "p1t" => "archit_a",
    "p1n"=> 1,
    "p2t" => null,
    "p2n"=> NULL,
    "p3t" => null,
    "p3n"=> NULL,
    "p4t" => null,
    "p4n"=> NULL,
    "p5t" => null,
    "p5n"=> NULL
);*/
//print_r(BattelReport::getPrize(1 , 1));
