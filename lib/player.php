<?php


class Player 
{
    private $id_player ;
    
    public function __construct( $id_player ="")
    {
        $this->id_player = $id_player;
    }
    public  function addPlayer( $userName )
    {
        global $dbh ;
       
        $avatar = rand(0, 19);
        $sql = $dbh->prepare("INSERT INTO player SET name = '$userName' , "
                . "  avatar = $avatar , id_player = $this->id_player, p_token = '". cryptUserId($this->id_player)."'");
        $sql->execute();
        
       
        $this->addPlayerEdu();
        $this->addPlayer_stat();
        $this->addPlayerQuest();
        $this->updateServerPNUM();
        $this->addPlayerExchange();
        insertIntoTable("id_player = $this->id_player", "god_gate");
        $city = new City();
        $coord = WorldMap::getEmptyPlace();
        if($city->addCity($this->id_player , $coord["x"], $coord["y"]) > -1){

            $matria = new Matrial($this->id_player);
            if($matria->creatMatrial() === TRUE)
            {return $this->id_player;}
            
        }else{
            return -1;
        }
       
    }
    
    public function checkPlayerOnServer($playerId)
    {
        
        global $dbh;
        
        $sql = $dbh->prepare("SELECT id_player FROM player WHERE id_player = :idp");
        $sql->execute(["idp" => $this->id_player]);
        
        $this->id_player = $playerId;
        if($sql->fetch(PDO::FETCH_ASSOC)  == FALSE){
            
            
            return $this->addPlayer("user-".$playerId);
            
        }
        
        return TRUE;
        
    }

    public function getPlayer()
    {
       
        $data = selectFromTable("*", "(SELECT player.*, @row:=@row+1 as 'rank' FROM player,(SELECT @row:=0) r ORDER BY player.prestige DESC ) AS col ", "col.id_player = :idp", ["idp" => $this->id_player])[0];
        
        $data["guild_data"] = Guild::getPlayerGuildData($this->id_player);
        
        return $data;
    }

    public  function addPlayer_stat()
    {   
        insertIntoTable("id_player = :idp", "player_stat", ["idp" => $this->id_player]);
        insertIntoTable("id_player = :idp", "player_title", ["idp" => $this->id_player]);
        
    }
    public function retriveMatrial_all()
    {
        $Matrial_all = NULL;
        $Matrial = new Matrial($this->id_player);
        
        $Matrial_all["matrial_main"] = $Matrial->retriveMatrial_main()[0];
        $Matrial_all["matrial_acce"] = $Matrial->retriveMatrial_acce()[0];
        $Matrial_all["matrial_product"] = $Matrial->retriveMatrial_product()[0];
        $Matrial_all["matrial_box"] = $Matrial->retriveMatrial_box()[0];
        $Matrial_all["matrial_luxury"] = $Matrial->retriveMatrial_luxury()[0];
        $Matrial_all["matrial_flags"] = $Matrial->retriveMatrial_flags()[0];
        return $Matrial_all;
    }
    public function getCityAll()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city WHERE id_player = $this->id_player");
        $sql->execute();
        $data = null;
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $id_city = $fetch["id_city"];
            $city_storage = selectFromTable("*", "city_storage", "id_city = $id_city");
            $fetch["city_storage"] = $city_storage[0];
            $fetch["wild"] = WorldMap::getCityBar($id_city);
            $data[] = $fetch;
           
        }
        return  $data;
    }
    public static function getCityById($id_city)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM city WHERE id_city = $id_city");
        $sql->execute();
        $data = null;
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $id_city = $fetch["id_city"];
            $city_storage = selectFromTable("*", "city_storage", "id_city = $id_city");
            $fetch["city_storage"] = $city_storage[0];
            $data = $fetch;
           
        }
        return  $data;
    }

    public function getAllavailableEqui($piece ) 
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM equip_$piece WHERE  "
                . "  id_player = '$this->id_player'  AND on_hero = 1 ");
        $sql->execute();
        
        $data = null;
        
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            $data[] = $fetch;
        }
        return $data;
    }
    public function addPlayerEdu()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO edu_acad SET id_player = '$this->id_player' ; "
                . " INSERT INTO edu_uni SET id_player = '$this->id_player'");
        insertIntoTable("id_player = :idp", "player_edu", ["idp" => $this->id_player]);
        return $sql->execute();
    }
    public function getPlayerStdLvl()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM edu_uni JOIN edu_acad  ON edu_uni.id_player = '$this->id_player'  "
                . " AND edu_acad.id_player = '$this->id_player'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    
    public function addStudy($id_city , $study_lvl , $study_type , $category , $time_start , $time_end)
    {
        
        
        $quray = "  INSERT INTO `$category` SET id_player = $this->id_player , "
            . " id_city = '$id_city' , study = '$study_type' , "
            . " lvl_to = $study_lvl , time_start = $time_start , "
            . " time_end = $time_end, time_end_org = $time_end";
        
        return queryExe($quray)["suc"];
       
    }
    public function getCurrentUniStudy()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM study_uni WHERE id_player = '$this->id_player'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
     public function getCurrentAcadStudy()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM study_acad WHERE id_player = '$this->id_player'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    public function incrementUniStudy($tech)
    {
        global $dbh;
        $sql =$dbh->prepare("UPDATE edu_uni SET `$tech` = `$tech` +1   WHERE id_player = $this->id_player AND `$tech` < 30");
        $sql->execute();
        return $sql->rowCount() ;
    }
    public function incrementStudyLvl($place , $tech)
    {
        if($place == "study_uni"){
            $table = "edu_uni";
        }else if($place == "study_acad"){
            $table = "edu_acad";
        }else{
            return FALSE;
        }
        updateTable("`$tech` = `$tech` + 1", "player_edu", "id_player = :idp AND `$tech` < 30", ["idp" => $this->id_player]);
        return
            updateTable("`$tech` = `$tech` + 1", "`$table`", "id_player = :idp AND `$tech` < 30", ["idp" => $this->id_player])
        ;
       
    }
    public function incrementAcadStudy($tech)
    {
        global $dbh;
        $sql =$dbh->prepare("UPDATE edu_acad  SET `$tech` = `$tech` +1  WHERE id_player = $this->id_player AND `$tech` < 30");
        $sql->execute();
        return $sql->rowCount() ;
    }
    public function deleteStudy($place , $id_city )
    {
        $time = time() + 60;
        return deleteTable("`$place`", "id_player = :idp AND id_city = :idc AND time_end < :ti", ["idp" => $this->id_player, "idc" => $id_city, "ti" => $time]);
    }
    public static function getPlayerName($id_player)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT name FROM player WHERE id_player = '$id_player'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    public function getGuildId()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT id_guild FROM player WHERE id_player = '$this->id_player'");
        $sql->execute();
        return $sql->fetch(PDO::FETCH_ASSOC);
    }
    public function addGuildPlayer($id_guild , $guild_name)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE player SET  id_guild = '$id_guild' , guild ='$guild_name'  WHERE id_player = '$this->id_player'");
        $sql->execute();
        return $sql->rowCount();
    }
    public function addPlayerQuest (){
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO quest_player(id_quest , id_player , done)   SELECT "
                . "quest.id_quest , $this->id_player , 0 FROM quest WHERE 1");
        $sql->execute();
        
        return  $sql->rowCount() ;
    }
    
    public function addPlayerExchange(){
        
        global $dbh;
         $sql = $dbh->prepare("INSERT INTO exchange_player(id_trade , id_player , take_times)   SELECT "
                . "exchange.id_ex , $this->id_player , 0 FROM exchange WHERE 1");
        $sql->execute();
        
        return  $sql->rowCount() ;
        
    }

    public function updateServerPNUM (){
        global $dbh;
        $sql = $dbh->prepare("UPDATE server_data SET player_num = player_num + 1");
        $sql->execute();
        return  $sql->rowCount() ;
    }
    public function getPlayerQuest (){
        global $dbh;
        $sql = $dbh->prepare("SELECT id_quest , done FROM quest_player WHERE id_player = $this->id_player");
        $sql->execute();
        return  $sql->fetchALL(PDO::FETCH_ASSOC) ;
    }
    public static function addPrestige($id_player ,$amount ,$porm)
    {
        global $dbh;
        $sql = $dbh->prepare("UPDATE player SET  prestige  = prestige + $amount  WHERE id_player = '$id_player' AND porm >=  $porm");
        $sql->execute();
        return $sql->rowCount();
    }
    public static function promotPlayer($id_player , $current_prom , $prestige_need ,$prestige_gain ){
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE player SET  prestige  = prestige + $prestige_gain , porm = porm + 1  "
                . " WHERE id_player = '$id_player' AND porm =  $current_prom  AND  prestige >= $prestige_need");
        $sql->execute();
        return $sql->rowCount();
        
    }
    
    
    public static function increasePlayerHonor($id_player , $honor)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE player SET  honor  = honor + $honor   WHERE id_player = '$id_player' ");
        $sql->execute();
        return $sql->rowCount();
        
    }
    
    
    public static function acceStudyUp($id_city , $id_player , $matrial , $place)
    {
        
        global  $dbh;
        
        
        if($matrial == "archim_a"){
            
            $equation = "time_end - 15*60";
            
        }elseif($matrial == "archim_b"){
            
            $equation = "time_end - 60*60";
            
        }elseif($matrial == "archim_c"){
            
            $equation = "time_end - 3*60*60";
            
        }elseif($matrial == "archim_d"){
            $now = time();
            $equation = "time_end - (time_end - $now)*0.3";
            
        }else{
           $equation = "time_end - 0"; 
        }
        
        
        $sql = $dbh->prepare("UPDATE `$place` SET time_end = $equation  WHERE  id_city = $id_city AND id_player = $id_player");
        $sql->execute();
        
        
        return $sql->rowCount();
    
    }
    
    
    public function getPlayerNotif()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT
                                (SELECT COUNT(msg_income.id_msg) FROM msg_income WHERE msg_income.id_to = $this->id_player AND seen = 0) AS msg_in,
                                (SELECT COUNT(msg_diff.id_msg) FROM msg_diff WHERE msg_diff.id_to = $this->id_player AND seen = 0) AS msg_diff,
                                (SELECT COUNT( report_player.id_report) FROM report_player WHERE report_player.id_player = $this->id_player AND seen = 0) AS msg_report,
                                (SELECT COUNT( spy_report.id_report) FROM spy_report WHERE spy_report.id_player = $this->id_player AND seen = 0) AS spy_report,
                                (SELECT COUNT( DISTINCT battel.id_battel) FROM battel WHERE id_player = $this->id_player) AS battel_number ,
                                (SELECT COUNT( battel_member.id_hero) FROM battel_member WHERE id_player = $this->id_player) AS hero_in_battel, 
                                (SELECT COUNT( id_hero) FROM hero_back WHERE id_player = $this->id_player) AS hero_back ,
                                (SELECT COUNT( id_spy) FROM spy  WHERE id_player = $this->id_player) AS spy_task 
                                ");
        $sql->execute();
        $notif = $sql->fetch(PDO::FETCH_ASSOC);
        $quary = "battel JOIN world_unit_garrison ON battel.x_coord = world_unit_garrison.x_coord AND battel.y_coord = world_unit_garrison.y_coord";
        $notif ["battel_number"] += selectFromTable("COUNT(DISTINCT battel.id_battel) AS count", $quary, "world_unit_garrison.id_player = $this->id_player")[0]["count"];
        
        $notif ["battel_number"] += selectFromTable("COUNT(DISTINCT battel.id_battel) AS count",
                "battel JOIN city ON city.x = battel.x_coord AND city.y = battel.y_coord",
                "city.id_player = $this->id_player")[0]["count"];
        return $notif;
    }
    
    public static function refreshPlayerId_guild($id_player){
        
        $guild = selectFromTable("guild_member.id_guild , guild.name", "guild_member JOIN guild ON guild.id_guild = guild_member.id_guild", "guild_member.id_player = $id_player");
        
        if(count($guild) < 1){
            
            $guild[0]["id_guild"] = "NULL";
            $guild[0]["name"] = "----";
            
        }
        global $dbh;
        $sql = $dbh->prepare("UPDATE player SET id_guild = {$guild[0]["id_guild"]} , guild = '{$guild[0]["name"]}' WHERE id_player = $id_player");
       
        $sql->execute();
        
        return $sql->rowCount();
        
    }
    
}
