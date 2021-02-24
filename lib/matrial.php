<?php

 
 class Matrial
 {
    private $id_player ;
     
    public function __construct($id_player) 
    {
         $this->id_player = $id_player ;
    }
    public function creatMatrial()
    {
        if($this->newMatrial_main() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_box() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_box_plus() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_luxury() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_product() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_acce() === FALSE){
            file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }
        if($this->newMatrial_flags() === FALSE){
             file_put_contents("SERVER_INDEX_18888.txt", "ma", FILE_APPEND);
        }else{
            return TRUE;
        }
        
        queryExe("INSERT IGNORE INTO player_item SELECT $this->id_player, id_item FROM item WHERE 1");
       
    }

    private function newMatrial_main()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_main SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_acce()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_acce SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_product()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_product SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_box()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_box SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_box_plus()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_box_plus SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_luxury()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_luxury SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    private function newMatrial_flags()
    {
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO matrial_flags SET "
                . " id_player = '$this->id_player'");
        if($sql->execute()){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    public function retriveMatrial_main()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM matrial_main WHERE "
                . " id_player = '$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    public function retriveMatrial_acce()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM matrial_acce WHERE "
                . " id_player = '$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    public function retriveMatrial_product()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM matrial_product WHERE "
                . " id_player = '$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    public function retriveMatrial_box()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM  matrial_box JOIN  matrial_box_plus WHERE "
                . " matrial_box_plus.id_player = '$this->id_player' AND matrial_box.id_player ='$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    
    public function retriveMatrial_luxury()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM matrial_luxury WHERE "
                . " id_player = '$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    public function retriveMatrial_flags()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM matrial_flags WHERE "
                . " id_player = '$this->id_player'");
        $sql->execute();
        $data = NULL;
        while ( $fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            unset($fetch["id_player"]);
            $data[] = $fetch ;
        }
        return $data;
    }
    
    public static function useMatrial($table , $matrial , $amount , $id_player)
    {
        updateTable("amount = amount - :a", "player_item", "id_player = :idp AND id_item = '$matrial'", ["a" => $amount,"idp"=> $id_player]);
        return updateTable("`$matrial` = `$matrial` - :a", "`$table`", "id_player = :idp AND `$matrial` >= :am ", ["a" => $amount,"idp"=> $id_player, "am"=>$amount ]);
       
    }
    
    public static function getAmount ($table , $matrial , $id_player)
    {
       
        return selectFromTable("`$matrial`", "`$table`", "id_player = :idp", ["idp" =>$id_player])[0][$matrial];
    }

    public static function addMatrial($table , $matrial , $amount , $id_player)
    {
        updateTable("amount = amount + :a", "player_item", "id_player = :idp AND id_item = '$matrial'", ["a" => $amount,"idp"=> $id_player]);
        
        return updateTable("`$matrial` = `$matrial` + :a","`$table`" , "id_player = :idp", ["idp"=>$id_player, "a"=>$amount]);
    }
    
    
    
    
}

 //echo Matrial::useMatrial("matrial_acce", "bread", 1, 1);
//$matrial =new Matrial(1);
//print_r($matrial->retriveMatrial_box());
/*$rowCount = Matrial::useMatrial("matrial_box_plus", "army_a_100", 5 , 1);
print_r($rowCount);*/