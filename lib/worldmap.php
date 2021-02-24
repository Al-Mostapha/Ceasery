<?php

class WorldMap 
{
    private $x;
    private $y;
    private $type;
     
    public function __construct($x , $y , $type = "")
    {
        $this->x = $x;
        $this->y = $y;
        $this->type = $type;
    }
    
    public static function getMapFromTo($x1 , $x2 , $y1 , $y2)
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT x , y , t , l , s FROM `world` WHERE (x BETWEEN $x1 AND $x2) AND (y BETWEEN $y1 AND $y2)");
        $sql->execute();
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function getUnitData($x , $y)
    {
        return selectFromTable("*", "world", "x = :xc AND y = :yc", ["xc"=>$x, "yc"=>$y])[0];
    }
    
    public static function getCityBar($id_city)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT world.* FROM world JOIN city_bar ON "
                . " city_bar.x_coord = world.x AND city_bar.y_coord = world.y AND "
                . " city_bar.id_city = $id_city");
        $sql->execute();
        
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    
    }
    
    public  function addCityBar($id_city , $id_player )
    {
        
        
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO city_bar SET x_coord = $this->x , "
                . " y_coord = $this->y  , id_city = $id_city , id_player = $id_player");
        $sql->execute();
        
        return $sql->rowCount();
        
    }
    
    public static function getEmptyPlace($province = 1)
    {
        
        $row_num = selectFromTable("COUNT(*) as row_num ", "world", "t = 0 AND p = $province")[0];
        
        $offset = rand(0, $row_num["row_num"]-1);
        return selectFromTable("*", "world", "t = 0 AND p = $province LIMIT 1 OFFSET $offset")[0];
    
    }
    
   
    public static function updateUniteState($x_coord , $y_coord , $state)
    {
        updateTable("s = $state", "world", "x = $x_coord AND y = $y_coord");
    }
    
    public static function fireOffOnWorldUnit($x_coord , $y_coord){
         global $dbh;
        $sql = $dbh->prepare("SELECT EXISTS(SELECT 1 FROM battel WHERE x_coord = $x_coord AND y_coord = $y_coord)");
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        if($data){
            updateTable("s = 0", "world", "x = $x_coord AND y = $y_coord");
            return TRUE;
        }
        return FALSE;
    }
    
    
}

